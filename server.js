const express = require("express");
const quizzesRouter = require("./routes/quiz/quiz.router");
const updateStatus = require("./services/updateStatus");
const app = express();

const { mongoConnect } = require("./services/mongo");

require("dotenv").config();

const config = {
  PORT: process.env.PORT,
};

app.use(express.json());

app.use("/quizzes", quizzesRouter);

updateStatus();

const interval = setInterval(updateStatus, 60000);

app.listen(config.PORT, () => {
  console.log(`Listening to port ${config.PORT}`);
  mongoConnect();
});
