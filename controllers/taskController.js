const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch tasks' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, column } = req.body;
    if (!title || !column) {
      return res.status(400).send({ error: 'Title and column are required' });
    }
    const task = new Task({ title, description, column, userId: req.user._id });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, column } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, description, column },
      { new: true }
    );
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete task' });
  }
};
