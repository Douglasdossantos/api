import  { Router} from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import  User from './app/models/usuarios';
import  FileController from './app/controllers/FileController';
import  UsuarioCotroller from './app/controllers/usuariosController';
import  SessionsCotroller from './app/controllers/SessionControler';
import MeetupController from './app/controllers/MeetupController';
import ScheduleMeetupController from './app/controllers/ScheduleMeetupController';
import authMiddleware from './app/middleware/auth'

const routes = new Router();
const uploads = multer(multerConfig);

routes.post('/usuario', UsuarioCotroller.store);
routes.post('/sessions', SessionsCotroller.store); 
 
routes.use(authMiddleware);
routes.put('/usuario',  UsuarioCotroller.update);

routes.post('/meetup', MeetupController.store);
routes.put('/file', uploads.single('file'),FileController.store);

routes.get('/listameetup', ScheduleMeetupController.index);

export default  routes;