import Joi from 'joi';
import { sendEmail } from '../services/email.service.js';

const emailSchema = Joi.object({
  subject: Joi.string().min(3).required(),
  body: Joi.string().min(10).required(),
});

export const handleSendEmail = async (req, res) => {
  try {
    const { error, value } = emailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Invalid input.', details: error.details });
    }

    const { to, subject, body } = value;

    await sendEmail({
      to,
      subject,
      html: `<h1>${subject}</h1><p>${body}</p>`,
    });

    return res.status(200).json({ message: 'Email sent successfully!' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};