import {injectable} from '@loopback/core';
import {createTransport, Transporter} from 'nodemailer';

@injectable()
export class MailService {
  transporter: Transporter;
  constructor() {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async send(email: string, token: string) {
    const invitationLink = `${process.env.FRONTEND_URL}/invite/verify/${token}`;
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Invitation to join',
      html: `<h1> Confirm invintation </h1> <p>Click <a href="${invitationLink}">here</a> to join.</p>`,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
