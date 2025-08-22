import 'dotenv/config';
import express from "express";
import cors from "cors";
import emailRoutes from './src/routes.js';

const app = express();

app.use(express.json({ limit: '10mb' }));

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://mss-landing-page-one.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key'], 
  credentials: true
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use('/', emailRoutes);

app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
