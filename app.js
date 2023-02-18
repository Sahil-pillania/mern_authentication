const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./db/conn");

const app = express();
const PORT = process.env.PORT || "5000";

dotenv.config({ path: "./config.env" });
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// const User = require("./model/userSchema");

// app.use((req, res, next) => {
//   if (req.method === "OPTIONS") {
//     //res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

console.log("port using env is :" + PORT);
connectDB();

app.use(require("./router/auth")); // router file to make our links

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Backend App is running in port no ${PORT}.`);
});
