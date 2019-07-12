import * as Yup from 'yup';
import User from '../models/usuarios';
import { updateLocale } from 'moment';

class UsuarioController {
    async store(req, res){
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });
        if(!( await schema.isValid(req.body))){
            return res.status(400).json({error: 'Não validado'})
        }

        const usuarioExistente = await User.findOne({ where: { email: req.body.email } });
        
        if (usuarioExistente) {
            res.status(400).json({error: 'usuario ja existe'});            
        }
        const {id, nome,email, provider}  = await User.create(req.body);

        return res.json({id, nome,email, provider});
    }
    async update(req, res){
        const {email, oldPassword } = req.body;
        const schema = Yup.object().shape({
            nome: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => 
            oldPassword ? field.required() : field
            ),
            confirmePassword : Yup.string().when('password', (password, field) => 
            oldPassword ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });
        if(!( await schema.isValid(req.body))){
            return res.status(400).json({error: 'Não validado'})
        }

        const user = await User.findByPk(req.userId);

        if (email != user.email) {
            const userExists = await User.findOne({ where: { email }});
            
            if (userExists) {
                return res.status(400).json({error: 'Usuario já existe'});                
            }            
        }       
        if(oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({error: 'senha não coresponde'});
        }
        const {id, nome, provider} = await user.update(req.body);
        return res.json({
            id,
            nome,
            email, 
            provider,
        });
    }
}
export default new UsuarioController();