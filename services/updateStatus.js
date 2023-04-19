const Quiz = require("../models/quiz.model");

async function updateStatus() {
  console.log("update");
  const activeQuizzes = await Quiz.find({
    status: "active",
  });
  const inActiveQuizzes = await Quiz.find({
    status: "inactive",
  });

  const curDate = Date.now();
  for (const quiz of activeQuizzes) {
    if (quiz.endDate < curDate) {
      quiz.status = "finished";
      const update = { $set: { status: quiz.status } };
      await Quiz.findOneAndUpdate(
        {
          _id: quiz.id,
        },
        update,
        {
          upsert: true,
        }
      );
    }
  }

  for (const quiz of inActiveQuizzes) {
    if (quiz.startDate < curDate) {
      quiz.status = "active";
      const update = { $set: { status: quiz.status } };
      await Quiz.findOneAndUpdate(
        {
          _id: quiz.id,
        },
        update,
        {
          upsert: true,
        }
      );
    }
  }
}

module.exports = updateStatus;
