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
        console.log(req.userId);
        return res.json({ok: true});
    }
}
export default new UsuarioController();