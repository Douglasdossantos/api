import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail{
  constructor(){
    const { host, port, secure, auth } =  mailConfig;

    this.transporte = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth: null,
    });
  }
  sendMail(message) {
    return this.transporte.sendMail({
      ... mailConfig.defualt,
      ... message,
   });
  }
}
export default new Mail();
