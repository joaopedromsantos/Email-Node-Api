import { sendEmail } from './service.js';

export const handleSendEmail = async (req, res) => {
  try {
    const { subject, body } = req.body;
    
    const data = await sendEmail(subject, body);

    console.log('Email enviado com sucesso:', data?.id);
    res.status(200).json({ 
      message: 'Email enviado com sucesso!',
      id: data?.id 
    });
    
  } catch (e) {
    console.error('Erro no controlador:', e.message);
    const statusCode = e.message.includes('Configuração') ? 500 : 400;
    res.status(statusCode).json({ error: e.message });
  }
};