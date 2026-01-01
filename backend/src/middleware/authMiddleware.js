const jwt = require("jsonwebtoken");
const User = require("../models/User");


const authMiddleware = async (req, res, next) => {
  console.log("AUTH HEADER:", req.headers.authorization);
  const authHeader = req.headers.authorization;
  console.log("AUTH HEADER:", authHeader); // <--- debug

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    req.user = user; // attach user
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message); // <--- debug
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;

