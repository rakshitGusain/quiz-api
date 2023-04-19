const Quiz = require("../../models/quiz.model");

async function httpCreateQuiz(req, res) {
  try {
    const content = req.body;
    content.startDate = new Date(content.startDate);
    content.endDate = new Date(content.endDate);
    const curDate = new Date(Date.now());

    if (content.startDate <= curDate) {
      return res.status(400).json({
        error: "Invalid startDate!!",
      });
    }
    if (content.startDate >= content.endDate) {
      return res.status(400).json({
        error: "Invalid endDate!!",
      });
    }

    console.log(curDate);

    if (
      !content.question ||
      !content.options ||
      !content.rightAnswer ||
      !content.startDate ||
      !content.endDate
    ) {
      return res.status(400).json({
        error: "Missing required property",
      });
    }

    if (isNaN(content.startDate) || isNaN(content.endDate)) {
      return res.status(400).json({
        error: "Invalid date!!",
      });
    }

    if (
      isNaN(content.rightAnswer) ||
      content.options.length <= Number(content.rightAnswer) ||
      Number(content.rightAnswer) < 0
    ) {
      return res.status(400).json({
        error: "Invalid rightAnswer!!",
      });
    }

    const quiz = new Quiz(req.body);
    quiz.startDate = new Date(req.body.startDate);
    quiz.endDate = new Date(req.body.endDate);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create quiz" });
  }
}

async function httpGetActiveQuizzes(req, res) {
  try {
    const now = new Date();
    const quiz = await Quiz.find({
      status: "active",
    });
    if (!quiz) {
      res.status(404).json({ error: "No active quiz found" });
    } else {
      res.status(200).json(quiz);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve active quiz" });
  }
}

async function httpGetQuizResults(req, res) {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      res.status(404).json({ error: "Quiz not found" });
    } else {
      res.status(200).json({ rightAnswer: quiz.rightAnswer });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve quiz result" });
  }
}

async function httpGetAllQuizzes(req, res) {
  try {
    const quizzes = await Quiz.find({});
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve quizzes" });
  }
}

module.exports = {
  httpCreateQuiz,
  httpGetActiveQuizzes,
  httpGetQuizResults,
  httpGetAllQuizzes,
};
