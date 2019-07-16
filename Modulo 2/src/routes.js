import { Router } from 'express';
import UserController from  './app/controlers/UserController';
import SessionController from './app/controlers/SessionControlle';
import authMiddleware from './app/middlewares/auth';
import multer from 'multer';
import multerConfig from './config/multer';
import fileController from './app/controlers/fileController';
import ProvidersController from './app/controlers/ProviderController';
import AppointmentController from './app/controlers/AppointmentController';
import ScheduleController from './app/controlers/ScheduleController';
import NotificationController from './app/controlers/NotificationController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), fileController.store);
routes.get('/providers', ProvidersController.index);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.get('/notifications/:id', NotificationController.update);



export default routes;
