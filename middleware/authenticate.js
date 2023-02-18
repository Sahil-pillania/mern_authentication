const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

const SECRET_KEY =
  process.env.SECRET_KEY || "MYNAMEISSAHILPILLANIASAHILPILLANIA";

const authenticate = async (req, res, next) => {
  try {
    //console.log("secret key " + SECRET_KEY);
    const token = req.cookies.jwtoken;
    //console.log("token is :" + token);
    const verifyToken = jwt.verify(token, SECRET_KEY);

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (error) {
    res.status(401).send("Unauthorized access");
    console.log(error);
  }
};
module.exports = authenticate;
