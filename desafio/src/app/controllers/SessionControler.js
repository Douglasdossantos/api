import Jwt from 'jsonwebtoken';
import User from '../models/usuarios';
import authConfig from '../../config/auth';


class SessionController {
    async store(req, res){
        const { email,  password } = req.body;
        const user = await User.findOne({ where: { email }});
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
            token: Jwt.sign({id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();