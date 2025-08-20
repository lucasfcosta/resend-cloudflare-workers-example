import { Resend } from 'resend';
import { EmailTemplate } from './emails/email-template';

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const resend = new Resend(env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: 'Acme <test@resendrocks.com>',
      to: ['lucas+resendtest@lucasfcosta.com'],
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
