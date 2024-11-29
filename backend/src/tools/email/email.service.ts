import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

type TransporterOptions = {
  sendMail: (arg0: {
    from: string;
    to: string;
    subject: any;
    html: string;
  }) => any;
};

@Injectable()
export class EmailService {
  private transporter: TransporterOptions;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendMail(to: string, subject, htmlContent: string) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html: htmlContent,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      return { message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email.');
    }
  }
}
