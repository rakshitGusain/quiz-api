const mongoose = require("mongoose");

require("dotenv").config();

const config = {
  MONGO_URL: process.env.MONGO_URL,
};

mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function mongoConnect() {
  //   console.log(config.MONGO_URL);
  await mongoose.connect(config.MONGO_URL);
  console.log("Mongoose is Connected");
}

module.exports = {
  mongoConnect,
};
