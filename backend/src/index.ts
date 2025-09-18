import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//Rotas

//Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em:  http://localhost:${PORT}`);
});

console.log("Teste de PR automático!");
console.log("Teste de PR automático.");