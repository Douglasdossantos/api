import * as Yup from 'yup';
import Jwt from 'jsonwebtoken';
import User from '../models/usuarios';
import authConfig from '../../config/auth';


class SessionController {
    async store(req, res){

        const schema = Yup.object().shape({            
            email: Yup.string().required().email(),            
            password: Yup.string().min(6).required(),
        });
        if(!( await schema.isValid(req.body))){
            return res.status(400).json({error: 'Não validado'})
        }

        const { email,  password } = req.body;
        const user = await User.findOne({ where: { email }});
        console.log(email);
        if(!user){
            return res.status(401).json({error:'usuario não encontrado'});
        }

        if(!(await user.checkPassword(password))){
            return res.status(401).json({error:'senha não confere'});

        }

        const {id, nome,} = user;

        return res.json(
            {
            user:{
                id, 
                nome,
                email, 
            },
            token: Jwt.sign({ id} , authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();