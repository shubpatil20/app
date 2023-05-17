const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// router.get("/",(req,res)=>{
//     console.log("connect");
// });

// register user

router.post("/register", async (req, res) => {

  try {
    let data = req.body;
    const { email, password } = data;

    if (!email || !password) {
      res.status(422).json("plz fill the data");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    data.password = hashedPassword;
    let user = await users.create(data);
    res.status(201).send({message:"user created"});
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await users.findOne({
      email: req.body.email,
    });

    if (!user) {
      return { status: "error", error: "Invalid login" };
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "secret123"
      );

      return res.json({ status: "ok", user: token });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
});

// get userdata

router.get("/getdata", async (req, res) => {
  try {
    const userData = await users.find();
    res.status(201).json({data:userData});
    console.log(userData);
  } catch (error) {
    res.status(422).json(error);
  }
});

// app.get("/api/quote", async (req, res) => {
//   const token = req.headers["x-access-token"];

//   try {
//     const decoded = jwt.verify(token, "secret123");
//     const email = decoded.email;
//     const user = await User.findOne({ email: email });

//     return res.json({ status: "ok", quote: user.quote });
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "error", error: "invalid token" });
//   }
// });

// get individual user

router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await users.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json({suserindividual});
  } catch (error) {
    res.status(422).json(error);
  }
});

// update user data

router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateduser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updateduser);
    res.status(201).json(updateduser);
  } catch (error) {
    res.status(422).json(error);
  }
});

// delete user
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletuser = await users.findByIdAndDelete({ _id: id });
    console.log(deletuser);
    res.status(201).json(deletuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
