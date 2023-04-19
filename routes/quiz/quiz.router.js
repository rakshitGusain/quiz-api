const express = require("express");
const {
  httpCreateQuiz,
  httpGetActiveQuizzes,
  httpGetQuizResults,
  httpGetAllQuizzes,
} = require("./quiz.controller");

const quizzesRouter = express.Router();

quizzesRouter.post("/", httpCreateQuiz);

quizzesRouter.get("/active", httpGetActiveQuizzes);

quizzesRouter.get("/:id/result", httpGetQuizResults);

quizzesRouter.get("/all", httpGetAllQuizzes);

module.exports = quizzesRouter;
