const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateSession = require("../middleware/validateSession");

router.post("/signup", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.user,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: bcrypt.hashSync(req.body.pass, 12),
      isAdmin: true,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7 days",
    });

    res.status(200).json({
      Created: newUser,
      Msg: "Success, User Created!",
      Token: token,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/all", validateSession, async (req, res) => {
  try {
    if (req.user.isAdmin === "true") {
      const allUsers = await User.find();
      res.status(200).json({
        Results: allUsers,
      });
    } else {
      res.status(401).json("Not Allowed!");
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    let { email, pass } = req.body;

    const user = await User.find({ email: email });

    if (user.length === 0) {
      throw new Error("Incorrect email or password");
    }

    let passwordMatch = await bcrypt.compare(pass, user[0].password);

    if (!passwordMatch) throw new Error("Incorrect email or password");

    const token = jwt.sign({ id: user[0]._id }, process.env.JWT_SECRET, {
      expiresIn: "2 days",
    });

    res.status(200).json({
      Msg: "User signed In!",
      User: user[0],
      Token: token,
    });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
});

router.get("/api/users", validateSession, async (req, res) => {
  try {
    const users = await User.find();
    console.log(req.user);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

module.exports = router;
