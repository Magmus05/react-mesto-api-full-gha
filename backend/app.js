require('dotenv').config();
const cors = require('cors')
const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3000, DB_URL = "mongodb://127.0.0.1:27017/mestodb" } = process.env;
const app = express();
const routesUsers = require("./routes/users");
const routesCards = require("./routes/cards");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");
const { errors } = require("celebrate");
const NOT_FOUND_ERROR = require("./errors/NotFoundError");
const handleErrors = require("./middlewares/handleErrors");
const { requestLogger, errorLogger } = require('./middlewares/logger');
app.use(cors({origin:['http://localhost:3000'], credentials: true, maxAge: 30})); //
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger); // логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use("/", routesUsers);
app.use("/cards", routesCards);
app.use("/", auth, (req, res, next) => {
  next(new NOT_FOUND_ERROR("Не верный адрес"));
});

app.use(errorLogger); // логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(handleErrors); // централизованный обработчик ошибок

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});
app.listen(PORT, () => {
  console.log(`слушаем порт: ${PORT}`);
});
