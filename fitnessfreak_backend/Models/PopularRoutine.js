const mongoose = require("mongoose");

const popularRoutineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: Array,
    default: [],
  },
});

const PopularRoutine = mongoose.model("PopularRoutine", popularRoutineSchema);

module.exports = PopularRoutine;
