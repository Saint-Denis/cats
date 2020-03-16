const mongoose = require("mongoose");
const db = require("./default").mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log("mongo connected");
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = connectDB;
