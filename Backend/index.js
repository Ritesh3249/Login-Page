const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./db");
const port = process.env.PORT || 5000;
db();
const app = express();
require("dotenv").config();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
// app.use(express.cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api", require("./routes/auth"));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
