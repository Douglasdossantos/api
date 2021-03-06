import jwt from 'jsonwebtoken'
import User from '../model/User';
import AuthConfig from '../../config/auth';

class SessionController{
  async store(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    console.log(user);

    if (!user)
    {
      return res.status(401).json({error: 'user not found'});
    }
    if(!await user.checkPassword(password)){
      return res.status(401).json({error: 'Senha incorreta!'});
    }
    const {id, nome, } = user;
    return res.json({
      user:{
        id,
        nome,
        email,
      },
      token: jwt.sign( { id }, AuthConfig.secret, {
        expiresIn: AuthConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
