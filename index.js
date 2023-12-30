const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const dbConnection = require("./config/db"); // Assuming dbConnection is exported from "./config/db"

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dbConnection();
const Routes = require("./routes/index");
app.use("/api", Routes);
const port = process.env.PORT || 8080; // Use correct case for PORT
app.listen(port, () => {
  console.log(`Application Running on port ${port}`);
});
