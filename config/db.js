const mongoose = require("mongoose");

const dbConnection = () => {
  console.log("DB_URL:", process.env.MONGODB_URL);

  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error in DB Connection:", error);
      process.exit(1);
    });
};

module.exports = dbConnection;
