const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../db/conn");
const User = require("../model/userSchema");
const authenticate = require("../middleware/authenticate");

// router.get("/", (req, res) => {
//   res.send("Hello world from router ");
// });

// // saving user using promises
// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res
//       .status(422)
//       .json({ error: "please fill all the fields properly" });
//   }

//   User.findOne({ email: email })
//     .then((exists) => {
//       if (exists) {
//         return res.status(422).json({ error: "Email already exists." });
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });

//       user
//         .save()
//         .then(() => {
//           return res
//             .status(201)
//             .json({ message: "User registered succesfully." });
//         })
//         .catch((err) => {
//           return res.status(500).json({ error: "Failed to be registered." });
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// saving user using Async await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res
      .status(422)
      .json({ error: "please fill all the fields properly" });
  }

  try {
    const exists = await User.findOne({ email: email });

    if (exists) {
      return res.status(422).json({ error: "Email already exists." });
    }
    if (password == !cpassword) {
      return res.status(422).json({ error: "Passwords are not matching." });
    }
    const user = new User({
      name,
      email,
      phone,
      work,
      password,
      cpassword,
    });

    const userReg = await user.save();
    if (userReg) {
      return res.status(201).json({ message: "User registered succesfully." });
    } else {
      return res.status(500).json({ error: "Failed to be registered." });
    }
  } catch (error) {
    console.log(error);
  }
});

// Login route
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill the data properly." });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      // password hash matching
      const isMatch = await bcrypt.compare(password, userLogin.password);

      // jwt token
      token = await userLogin.generateAuthToken();
      console.log("token is : " + token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.json({ error: "Invalid Credentials - password." });
      } else {
        res.json({ message: "user sign successfully" });
      }
    } else {
      res.json({ error: "Invalid Credentials - Email." });
    }
  } catch (error) {
    console.log(error);
  }
});

// user data for about page
router.get("/aboutpage", authenticate, (req, res) => {
  //console.log("hello about");
  res.send(req.rootUser);
});
// user data for home and contact page
router.get("/getdata", authenticate, (req, res) => {
  //console.log("hello getData");
  res.send(req.rootUser);
});

/// user form data send to database from contact page
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.json({ error: "please fill all the fields" });
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      await userMessage.save();

      res.status(201).json({ message: "user message saved" });
    }
  } catch (error) {
    console.log(error);
  }
});

// user logout functionality
router.get("/logoutpage", (req, res) => {
  console.log("hello Logout");

  res.clearCookie("jwtoken");

  res.status(200).send("User Logout");
});

module.exports = router;
