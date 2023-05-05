require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

// Inicializando a aplicação, chamando o express
const app = express();

// config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Resolvendo CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Diretório de upload
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// DB connections
require("./config/db.js");

// Routes
const router = require("./routes/Router.js");
app.use(router);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
