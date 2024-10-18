require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userController = require("./controllers/UserController");

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewURLParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("We're connected!");
});
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
app.use("/user", userController);
// app.post(
//   "/register",
//   async(req, (res) => {
//     const { username, password } = req.body;
//   })
// );

// try {
//   const user = await User.findOne({ username });
//   if (!user) return res.status(400).json({ message: "User Not Found" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ message: "Invalid credentails" });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: "1h",
//   });
//   res.json({ token });
// } catch (err) {
//   res.status(500).json({ error: err.message });
// }

// const authToken = (req, res, next) => {
//   const token = req.headers["authorization"]?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Access Denied" });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: "Invalid Token" });
//     req.user = user;
//     next();
//   });
// };
