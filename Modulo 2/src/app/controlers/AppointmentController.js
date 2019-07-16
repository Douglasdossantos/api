import * as Yup from 'yup';
import { starOffhour, parseISO, isBefore, startOfHour } from 'date-fns';
import Appointments from '../model/appointments';
import User from '../model/User';
import File from '../model/file';
import { start } from 'repl';

class AppointmentsController {
  async index(req, res){
    const { page = 1 } = req.query;
    const appointments = await Appointments.findAll({
      where:{user_id: req.userId, canceled_at: null },
      order: ['date'],
      limit: 20,
      attributes:['id','date'],
      offset: (page - 1) * 20,
      include:[
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'nome'],
          include: [
            {
              model: File,
              as:'avatar',
              attributes: ['id','path','url'],
            }
          ],
        },
      ],
    });
    return res.json(appointments);
  }

  async store(req, res){
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'validação falsa'});
    }

    const {provider_id, date} = req.body;


    const isProvider = await User.findOne({
      where: {id: provider_id, provider: true},
    });


    if (!isProvider) {
      return res.status(401).json({error: 'you can only create appointments with providers'});
    }

    const  hourStart = startOfHour(parseISO(date));


    if(isBefore(hourStart, new Date())){
      return res.status(400).json({error: 'data permitida ja foi utrapassada'})
    }

    const checarViabilidade = await Appointments.findOne({
      where:{
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if(checarViabilidade){
      return res.status(400).json({error: 'data e hora  para o agendamento não compativel'});
    }

    const appointment = await Appointments.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    return res.json(appointment);
  }
}
export default new AppointmentsController();
