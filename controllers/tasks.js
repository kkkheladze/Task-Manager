const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      res.status(404).json({ message: `no task with id ${taskID}` });
      return;
    }
    res.status(200).json({ task });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (task) res.status(200).send();
    else res.status(404).json({ message: `no task with id ${taskID}` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (task) res.status(200).json({ task });
    else res.status(404).json({ message: `no task with id ${taskID}` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask, getTask };
