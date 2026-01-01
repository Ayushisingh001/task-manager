const Task = require("../models/Task");

// Get tasks (ROLE BASED)
const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "ADMIN") {
      // ADMIN → see all tasks
      tasks = await Task.findAll();
    } else {
      // USER → see only own tasks
      tasks = await Task.findAll({
        where: { userId: req.user.id }
      });
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({
      title,
      description,
      userId: req.user.id
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update task (only owner can update)
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, userId: req.user.id }
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const { title, description, status } = req.body;
    await task.update({ title, description, status });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete task (only owner can delete)
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, userId: req.user.id }
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.destroy();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
