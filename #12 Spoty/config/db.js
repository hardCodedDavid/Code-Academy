const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MONGODB CONNECTED SUCCESSFULLY!");
      })
      .catch((error) => console.log(error + "MONGODB DISCONNECTED !!!!"));
    const connection = mongoose.connection;
  } catch (error) {
    res.render('Errors/404');
    console.log(error);
    return error;
  }
};

module.exports = connectDB;
