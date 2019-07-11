import  { Router} from 'express';
import  User from './app/models/usuarios';
import  UsuarioCotroller from './app/controllers/usuariosController';
import  SessionsCotroller from './app/controllers/SessionControler';

const routes = new Router();

routes.post('/usuario', UsuarioCotroller.store);
routes.post('/sessions', SessionsCotroller.store);

export default  routes;