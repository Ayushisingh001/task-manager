// middleware/adminMiddleware.js

// Admin-only middleware
const adminMiddleware = (req, res, next) => {
  try {
    // req.user is added by authMiddleware
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }

    next(); // user is admin, allow access
  } catch (err) {
    console.error("Admin middleware error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = adminMiddleware;
