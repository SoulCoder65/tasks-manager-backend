const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.user._id;

    const task = new Task({ title, description, status, userId });
    await task.save();

    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ error: "Error creating task" });
  }
};

// Get all tasks of user
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const { search, sort, status } = req.query;

    let filter = { userId };
    if (status && ["todo", "in-progress", "done"].includes(status)) {
      filter.status = status;
    }

    let searchCriteria = {};
    if (search) {
      searchCriteria.title = { $regex: search, $options: "i" };
    }

    // Combine filter and search criteria
    const criteria = { ...filter, ...searchCriteria };

    let sortOption = { createdAt: 1 };
    if (sort === "desc") {
      sortOption = { createdAt: -1 };
    }

    const tasks = await Task.find(criteria).sort(sortOption);

    res.status(200).json({ tasks });
  } catch (err) {
    console.log("Error-", err);
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const task = await Task.findOne({ _id: id, userId });
    if (!task) {
      res.status(400).json({ error: "Task not found" });
    }

    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ error: "Error fetching task" });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user._id;

    const task = await Task.findOneAndUpdate({ _id: id, userId }, updates, {
      new: true,
    });
    if (!task) {
      res.status(400).json({ error: "Task not found" });
    }

    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ error: "Error updating task" });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const task = await Task.findOneAndDelete({ _id: id, userId });
    if (!task) {
      res.status(400).json({ error: "Task not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
