import { Router } from 'express';
import { handleSendEmail } from '../controllers/email.controller.js';

const router = Router();

router.post('/send', handleSendEmail);

export default router;