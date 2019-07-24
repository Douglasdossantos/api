import Meetup from '../models/Meetup';
import * as Yup from 'yup';
import { starOffhour, parseISO, isBefore, startOfHour, format, subHours } from 'date-fns';  


class MeetupController {
    async store(req, res){

        const schema = Yup.object().shape({
            user_id: Yup.number().required(),
            data_hora: Yup.date().required(),
            user_id: Yup.number().required(),
            file_id: Yup.number().required(),
            localizacao: Yup.string().required(),

        });
        
        const {user_id, data_hora} = req.body;

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: 'requisição invalida'})            
        }

        const  hourStart = startOfHour(parseISO(data_hora));

        if(isBefore(hourStart, new Date())){
            return res.status(400).json({error: 'data permitida ja foi utrapassada'})
        }

        const meetup = await Meetup.create(req.body);          
        return res.json(meetup);
    }    
}
export default new MeetupController();