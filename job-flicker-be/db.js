const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://skatkuri:root@adtcluster.2eqijxx.mongodb.net/adtProject?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
