const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./db");
const port = process.env.PORT || 5000;
db();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
