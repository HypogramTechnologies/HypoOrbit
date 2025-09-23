import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import stacRoutes from './routes/stac'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/stac', stacRoutes);

//Rotas

//Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em:  http://localhost:${PORT}`);
});
