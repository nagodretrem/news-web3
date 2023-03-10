const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "newsblog",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
