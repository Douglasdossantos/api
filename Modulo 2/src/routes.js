import { Router } from 'express';
import User from './app/model/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  try {
    const  user = await User.create({
      nome: 'Douglas',
      email:'douglas@testeemail',
      password_hash: '1234567890',
      provider: 0
    });
    return res.json(user);
  } catch (error) {
    res.status(400).send(error.message)
    console.log(error)
  }
});
export default routes;
