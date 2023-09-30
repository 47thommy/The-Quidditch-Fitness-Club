const mongoose = require("mongoose");
const workoutSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestapms: true }
);

module.exports = mongoose.model("workout", workoutSchema);
