import { Router } from 'express';
import UserController from  './app/controlers/UserController';
import SessionController from './app/controlers/SessionControlle';
import authMiddleware from './app/middlewares/auth';
import multer from 'multer';
import multerConfig from './config/multer';
import fileController from './app/controlers/fileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', authMiddleware, UserController.update);

routes.post('/files', upload.single('file'), fileController.store);

export default routes;
