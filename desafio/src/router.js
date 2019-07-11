import  { Router} from 'express';
import  User from './app/models/usuarios';

const routes = new Router();

routes.get('/',  async (req, res) => {
     const usuario = await User.create({
          nome: 'Desafio ',
          email: 'desafio@delta.com',
          password_hash: '123456789',
     });
     return res.json(usuario)
})
export default  routes;