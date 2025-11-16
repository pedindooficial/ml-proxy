import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Bypass de headers para evitar bloqueio do Mercado Livre
const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Accept": "application/json",
    "Accept-Language": "pt-BR,pt;q=0.9",
    "X-Requested-With": "XMLHttpRequest"
};

app.get("/mlb/categories", async (req, res) => {
    try {
        const url = "https://api.mercadolibre.com/sites/MLB/categories";

        const response = await fetch(url, { headers });
        const data = await response.json();

        res.json(data);

    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
});

// Proxy para subcategorias
app.get("/mlb/category/:id", async (req, res) => {
    try {
        const url = `https://api.mercadolibre.com/categories/${req.params.id}`;
        const response = await fetch(url, { headers });
        const data = await response.json();

        res.json(data);

    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
});

app.listen(PORT, () => {
    console.log("Proxy ML rodando na porta", PORT);
});
