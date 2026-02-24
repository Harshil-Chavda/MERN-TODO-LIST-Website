const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// CREATE a new Todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
      priority: req.body.priority || "Medium",
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ (Get all Todos)
router.get("/", async (req, res) => {
  try {
    // Finds all todos in the database, sort by newest first
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a Todo (e.g., mark as completed, or edit text, or restore)
router.put("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Automatically set completedAt date if completed status is changing
    if (updateData.completed === true) {
      updateData.completedAt = new Date();
    } else if (updateData.completed === false) {
      updateData.completedAt = null;
    }

    // Automatically set deletedAt to null if restoring
    if (updateData.deleted === false) {
      updateData.deletedAt = null;
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true },
    );
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a Todo (Soft Delete)
router.delete("/:id", async (req, res) => {
  try {
    // We do a SOFT delete so we can view it in the "Deleted" column
    const deletedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: { deleted: true, deletedAt: new Date() } },
      { new: true },
    );
    res.status(200).json(deletedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
