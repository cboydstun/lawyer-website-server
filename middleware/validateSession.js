const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const validateSession = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    console.log("Current header provided with request", auth);

    if (!auth) throw new Error("Unauthorized");

    const token = auth.split(" ")[1]; // ["sdjfahdsghajghd"]

    if (!token) throw new Error("Unauthorized");
    //? 2. Check the status of our toker (expired)
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    console.log("User making request", user);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json(err.message);
  }
};

module.exports = validateSession;
