export class EmailService {
    async sendNotification(to: string, subject: string, body: string) {
      // TODO: Integrate with real email service (e.g., SendGrid, SMTP)
      console.log(`Sending email to ${to}: ${subject}\n${body}`);
      return true;
    }
  }