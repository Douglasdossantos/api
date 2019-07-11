import  { Router} from 'express';
import  User from './app/models/usuarios';
import  UsuarioCotroller from './app/controllers/usuariosController';

const routes = new Router();

routes.post('/usuario', UsuarioCotroller.store);

export default  routes;