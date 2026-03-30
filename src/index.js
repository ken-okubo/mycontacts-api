const express = require("express");
require("express-async-errors");

const routes = require("./routes");

const app = express();
app.use(express.json());

const cors = require("./app/middlewares/cors");
const errorHandler = require("./app/middlewares/errorHandler");

// cors precisa ser configurado para permitir que o frontend acesse a API antes de usar o app.use(routes);
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(3001, () =>
  console.log("🔥 Server started on at http://localhost:3001"),
);
