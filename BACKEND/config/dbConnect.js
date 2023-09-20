const mongoose = require("mongoose");

const dbConnect =async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL
    );
    console.log("db connection successful");
  } catch (error) {
    console.log("db connection failed", error.message);
  }
};

dbConnect();
