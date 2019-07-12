import User from '../models/usuarios';
import { async } from '../../../../../../AppData/Local/Microsoft/TypeScript/3.5/node_modules/rxjs/internal/scheduler/async';
import { updateLocale } from 'moment';

class UsuarioController {
    async store(req, res){
        const usuarioExistente = await User.findOne({ where: { email: req.body.email } });
        
        if (usuarioExistente) {
            res.status(400).json({error: 'usuario ja existe'});            
        }
        const {id, nome,email, provider}  = await User.create(req.body);

        return res.json({id, nome,email, provider});
    }
    async update(req, res){
        const {email, oldPassword } = req.body;

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
        console.log(id, nome, provider);
        return res.json({
            id,
            nome,
            email, 
            provider,
        });
    }
}
export default new UsuarioController();