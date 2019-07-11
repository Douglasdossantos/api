import User from '../models/usuarios';

class UsuarioController {
    async store(req, res){
        const usuarioExistente = await User.findOne({ where: { email: req.body.email } });
        
        if (usuarioExistente) {
            res.status(400).json({error: 'usuario ja existe'});            
        }
        const {id, nome,email, provider}  = await User.create(req.body);

        return res.json({id, nome,email, provider});
    }
}
export default new UsuarioController();