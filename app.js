require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 6002;
const cors = require("cors");
require("./db/conn");
const router = require("./Routes/router");

app.use(cors());
app.use(express.json());
app.use(router);

app.get("/", function (req, res) {
  res.status(200).json("server started");
});

app.listen(port, function () {
  console.log("server started on port " + port);
});
