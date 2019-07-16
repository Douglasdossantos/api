import * as Yup from 'yup';
import User from '../model/User';

class UserController {
  async store(req, res){
    const schema = Yup.object().shape({
      nome : Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      confirmePassword: Yup.string().when('password',(password, field) =>
      password ? field.required().oneOf([Yup.ref('password')]) :field
      ),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'Validation false'});
    }
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if(userExists){
      return res.status(400).json({error: 'Usuario ja existente.'});
    }
    const {id, nome, email, provider} = await User.create(req.body);
    return res.json({
      id,
      nome,
      email,
      provider,
    });
  }

  async update(req, res){
    const schema = Yup.object().shape({
      nome : Yup.string().required(),
      email: Yup.string().required().email(),
      oldPassword: Yup.string().required().min(6),
      password: Yup.string().min(6).when('oldPassword', (oldPassword, field) =>
         oldPassword ? field.required() : field
        ),
    });
    const userExists = await User.findOne({ where: { email: req.body.email } });
    console.log(userExists);

    if(userExists){
      return res.status(400).json( {error: 'Preencha os campos minimos.'} );
    }

    const {email, oldPassword} = req.body;
    const user = await User.findByPk(req.userId);

    if(email != user.email){
      const userExists =await User.findOne({where: {email}});

      if (userExists) {
        return res.status(400).json({error: 'User already exists'});
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword  ))) {
      return res.status(401).json({error: 'password does not math'});
    }

    const u = await user.update(req.body);


    return res.json({
      u
    });
  }
}
export default new UserController();
