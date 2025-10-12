import express from "express";
import bodyParser from "body-parser";
import { getYinYangAnalysis } from "./data/yinYangModel.js";

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

// Forcer UTF-8 pour les réponses JSON
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

// Route API pour l'analyse
app.post("/api/analyse", (req, res) => {
  const { birthDate, birthTime, birthPlace, targetDate } = req.body;

  const analysis = getYinYangAnalysis(birthDate, birthTime, birthPlace, targetDate);

  res.end(JSON.stringify(analysis));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`?? Serveur lancé sur http://localhost:${PORT}`);
});
