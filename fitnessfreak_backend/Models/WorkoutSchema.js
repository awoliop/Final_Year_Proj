const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  exercise: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  primaryMuscle: {
    type: String,
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
});

const workoutSchema = new mongoose.Schema(
  {
    routineID: {
      type: String,
      required: true,
    },
    exercises: [exerciseSchema],
    suggestions: {
      type: [String],
      required: true,
    },
    cautions: {
      type: [String],
      required: true,
    },
    restrictions: {
      type: [String],
      required: true,
    },
    mandatoriesPriorToWorkout: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
