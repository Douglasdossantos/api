import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';
import pt from 'date-fns/locale/pt';

class CancellationMail{
  get Key(){
    return 'CancellationMail';
  }
  async handle({ data }){
    const { appointments} = data;

    console.log('a fila executou');
    Mail.sendMail({
      to:`${appointments.provider.nome} < ${appointments.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context:{
        provider:appointments.provider.nome,
        user: appointments.user.nome,
        date: format(appointments.date, "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }

}
export default new CancellationMail();
