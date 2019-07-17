import * as Yup from 'yup';
import { starOffhour, parseISO, isBefore, startOfHour, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Appointments from '../model/appointments';
import User from '../model/User';
import File from '../model/file';
import { start } from 'repl';
import Notification from '../schemas/Notification';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';


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

    const user  = await User.findByPk(req.userId);
    const formattedDate = format(hourStart, "'dias' dd 'de' MMMM', as' H:mm'h'",{locale:pt});

    await Notification.create({
        content: `Novo agndamento de ${ user.nome} para o dia ${formattedDate}`,
        user: provider_id,
      },
    );

    return res.json(appointment);
  }

  async delete(req, res){
    const appointments = await Appointments.findByPk(req.params.id, {
      include:[
        {
          model: User,
          as: 'provider',
          attributes: ['nome', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes:['nome'],
        },
      ],
    });


    console.log(req.userId);
    console.log(appointments.user_id);

    if (appointments.user_id != req.userId) {
      return res.status(401).json({error: 'usuario não pode excluir'})
    }

    const dateWithSub = subHours(appointments.date, 2);

    if(isBefore(dateWithSub, new Date())){
      return res.status(401).json({ error: 'vc não pode  deletar antes de 2 horas de atencedencia'});
    }

    appointments.canceled_at = new Date();

    await appointments.save();

    await Queue.add(CancellationMail.Key, {
       appointment,
      });

    return res.json(appointments);
  }
}
export default new AppointmentsController();
