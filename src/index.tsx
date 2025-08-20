import { Resend } from 'resend';
import { EmailTemplate } from './emails/email-template';

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const resend = new Resend(env.RESEND_API_KEY);

    const from = `Acme <${env.FROM_EMAIL || 'onboarding@resend.dev'}>`
    const to = [env.TO_EMAIL || 'delivered@resend.dev']

    const data = await resend.emails.send({
      from,
      to,
      subject: 'hello world',
      react: <EmailTemplate firstName="John" />,
    });

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
