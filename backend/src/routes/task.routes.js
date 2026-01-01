const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/task.controller");

const router = express.Router();

// protect all task routes
router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
