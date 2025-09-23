import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import satelliteRoutes from './routes/satelliteRoutes';
import stacRoutes from './routes/stac'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hypoorbit';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/stac', stacRoutes);

// Rotas
app.use('/api/satellites', satelliteRoutes);

//Conectar ao MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.log('Erro ao conectar ao MongoDB: ', err));


//Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em:  http://localhost:${PORT}`);
});
