// src/service.js

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const formatHtmlBody = (body) => {
  const htmlBody = body.replace(/\n/g, '<br>');
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Nova mensagem do site</h2>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
        ${htmlBody}
      </div>
      <hr>
      <p style="color: #666; font-size: 12px;">
        Enviado em: ${new Date().toLocaleString('pt-BR')}
      </p>
    </div>
  `;
};

export const sendEmail = async (subject, body) => {
  if (!process.env.RESEND_API_KEY || !process.env.RECIPIENT_EMAIL) {
    console.error('Variáveis de ambiente do email não configuradas');
    throw new Error('Configuração do servidor incompleta.');
  }

  const { data, error } = await resend.emails.send({
    from: process.env.SENDER_EMAIL || "Contato <onboarding@resend.dev>",
    to: [process.env.RECIPIENT_EMAIL],
    subject: subject,
    html: formatHtmlBody(body),
    text: body
  });

  if (error) {
    console.error('Erro do Resend:', error);
    throw new Error('Erro ao enviar email. Tente novamente.');
  }

  return data;
};