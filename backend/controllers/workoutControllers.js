const mongoose = require("mongoose");
const WorkoutModel = require("../models/workoutModel");

const createWorkout = async (req, res) => {
  const { title, reps, load, sets } = req.body;

  const emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!sets) {
    emptyFields.push("sets");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ message: "Please fill all the fields", emptyFields });
  }
  try {
    const user_id = req.user._id;
    console.log(user_id);
    const newWorkout = await WorkoutModel.create({
      title,
      reps,
      load,
      sets,
      user_id,
    });
    res.status(200).json(newWorkout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getWorkouts = async (req, res) => {
  try {
    const user_id = req.user._id;
    const workouts = await WorkoutModel.find({ user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No such workout found" });
    }
    const workout = await WorkoutModel.findById(id);
    res.status(200).json(workout);
  } catch (error) {
    res.status(404).json({ message: "No such workout found" });
  }
};
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "No such workout found" });
    }
    const updateWorkout = await WorkoutModel.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!updateWorkout) {
      res.status(404).json({ message: "No such workout found" });
    }
    res.status(200).json(updateWorkout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No such workout found" });
    }

    const deleteWorkout = await WorkoutModel.findOneAndDelete({ _id: id });
    if (!deleteWorkout) {
      res.status(404).json({ message: "No such workout found" });
    }

    res.status(200).json(deleteWorkout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  createWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkouts,
};
