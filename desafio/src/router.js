import  { Router} from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import  User from './app/models/usuarios';
import  FileController from './app/controllers/FileController';
import  UsuarioCotroller from './app/controllers/usuariosController';
import  SessionsCotroller from './app/controllers/SessionControler';
import authMiddleware from './app/middleware/auth'

const routes = new Router();
const uploads = multer(multerConfig);

routes.post('/usuario', UsuarioCotroller.store);
routes.post('/sessions', SessionsCotroller.store); 
 
routes.use(authMiddleware);
routes.put('/usuario',  UsuarioCotroller.update);

routes.put('/file', uploads.single('file'),FileController.store);

export default  routes;