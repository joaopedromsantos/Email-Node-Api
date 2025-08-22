import express from "express";
import rateLimit from "express-rate-limit";
import { handleSendEmail } from './controller.js';

const router = express.Router();

const emailLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5,
  message: { error: 'Muitas tentativas de envio de email. Tente novamente em 1 minuto.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (process.env.API_KEY && apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'API key inválida ou ausente' });
  }
  next();
};

const validateEmailData = (req, res, next) => {
  const { subject, body } = req.body;
  if (!subject || !body) {
    return res.status(400).json({ error: 'Campos obrigatórios: subject e body' });
  }
  req.body.subject = subject.trim();
  req.body.body = body.trim();
  next();
};

router.get("/", (req, res) => {
  res.json({ status: 'online', message: 'Email API funcionando' });
});

router.post("/send-email", 
  emailLimiter,
  authenticate,
  validateEmailData,
  handleSendEmail
);

export default router;