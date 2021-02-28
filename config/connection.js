const mongoose = require("mongoose");
const config = require("config");
// const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://harshit123:harshit123@ptdb.6ypxy.mongodb.net/ptdb?retryWrites=true&w=majority",
      {
        useNewUrlParser: true, useUnifiedTopology: true
      });
    console.log("DB Connected..");
  } catch (err) {
    console.error(err.message);
    //Exit prossess with failure
    process.exit(1);
  }
};

module.exports = connectDB;
