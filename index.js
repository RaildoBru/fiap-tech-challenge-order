import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db-config.js";
import orderRoutes from "./src/routes/order.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/docs/swagger.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/orders", orderRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});



/*require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API está rodando...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

*/