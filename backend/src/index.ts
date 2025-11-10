import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import satelliteRoutes from './routes/satellite';
import stacRoutes from './routes/stac'
import geocodeRoutes from './routes/geocode'
import syncSatelliteRoutes from './routes/syncSatellite'
import wtssRouter from './routes/wtss';
import searchesRouter from './routes/searches';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hypoorbit';

// Middleware
app.use(cors());
app.use(express.json());


// Rotas
app.use('/api/satellites', satelliteRoutes);
app.use('/api/sync', syncSatelliteRoutes);
app.use('/api/stac', stacRoutes);
app.use('/api/geocode', geocodeRoutes);
app.use('/api/wtss', wtssRouter);
app.use('/api/searches', searchesRouter);


//Conectar ao MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.log('Erro ao conectar ao MongoDB: ', err));


//Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em:  http://localhost:${PORT}`);
});
