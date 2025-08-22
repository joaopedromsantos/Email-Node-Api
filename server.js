import 'dotenv/config';
import express from "express";
import cors from "cors";
import emailRoutes from './src/routes.js';

const app = express();

app.use(express.json({ limit: '10mb' }));

app.use(cors({
  origin: 'https://mss-landing-page-one.vercel.app',
}));

app.use('/', emailRoutes);

app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
