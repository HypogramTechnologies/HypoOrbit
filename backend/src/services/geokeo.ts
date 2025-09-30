import express from "express";
import cors from "cors";
import https from "https";

const app = express();
app.use(cors());

const API_KEY = ""; // coloque sua chave aqui

app.get("/geocode", async (req, res) => {
    const q = req.query.q as string; // força string
    console.log(q);
    if (!q) {
        return res.status(400).json({ error: "Parâmetro 'q' é obrigatório" });
    }

    const url:string = `https://geokeo.com/geocode/v1/search.php?q=${encodeURIComponent(q)}&api=${API_KEY}`

    try {
        console.log(url)
        const response = await fetch(url);
        console.log(response);
        const data = await response.json();
        console.log(data);
        res.json(data);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Erro ao consultar Geokeo" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
