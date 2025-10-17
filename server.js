import express from "express";
import bodyParser from "body-parser";
import { getYinYangAnalysis } from "./data/yinYangModel.js";

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

// Configuration des headers
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  // Éviter la mise en cache pour les API
  if (req.url.startsWith('/api/')) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
  }
  next();
});

// Route API pour l'analyse
app.post("/api/analyse", (req, res) => {
  const { birthDate, birthTime, birthPlace, targetDate } = req.body;

  const analysis = getYinYangAnalysis(birthDate, birthTime, birthPlace, targetDate);

  res.end(JSON.stringify(analysis));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
