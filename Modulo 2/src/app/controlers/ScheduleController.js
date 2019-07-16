import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Appointments from '../model/appointments';
import User from  '../model/User';
import appointments from '../model/appointments';

class SchaduleController{
  async index(req, res){
    const checkUserProvider = await User.findOne({
      where: {id: req.userId, provider: true},
    });

    if(!checkUserProvider){
      return res.status(401).json({error: 'usuario não possui provider'});
    }
    const { date } = req.query;
    const parsedDate = parseISO(date);



    const { appointments } = await Appointments.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
    });

    return res.json(appointments);

  }
}
export default new SchaduleController();
