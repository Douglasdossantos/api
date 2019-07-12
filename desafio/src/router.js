import  { Router} from 'express';
import  User from './app/models/usuarios';
import  UsuarioCotroller from './app/controllers/usuariosController';
import  SessionsCotroller from './app/controllers/SessionControler';
import authMiddleware from './app/middleware/auth'

const routes = new Router();

routes.post('/usuario', UsuarioCotroller.store);
routes.post('/sessions', SessionsCotroller.store);
 
routes.use(authMiddleware);
routes.put('/usuario',  UsuarioCotroller.update);

export default  routes;