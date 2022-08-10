const mongoose = require("mongoose");
const connectToMongoose = () => {
  mongoose
    .connect(
      "mongodb+srv://justnest:12345@cluster0.to5ohc7.mongodb.net/cliffex",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("connected to mongo");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectToMongoose;
