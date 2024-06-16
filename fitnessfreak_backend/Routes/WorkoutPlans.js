const express = require("express");
const router = express.Router();
const errorHandler = require("../Middlewares/errorMiddleware");
const adminTokenHandler = require("../Middlewares/checkAdminToken");
const Workout = require("../Models/WorkoutSchema");

function createResponse(ok, message, data) {
  return {
    ok,
    message,
    data,
  };
}

router.post("/workouts", adminTokenHandler, async (req, res) => {
  try {
    const { routineID, exercises, suggestions, cautions, restrictions, mandatoriesPriorToWorkout } =
      req.body;
    const workout = new Workout({
      routineID,
      exercises,
      suggestions,
      cautions,
      restrictions,
      mandatoriesPriorToWorkout,
    });

    await workout.save();
    res.json(createResponse(true, "Workout created successfully", workout));
  } catch (err) {
    res.json(createResponse(false, err.message));
  }
});

router.get("/workouts", async (req, res) => {
  try {
    const workouts = await Workout.find({});
    res.json(createResponse(true, "Workouts fetched successfully", workouts));
  } catch (err) {
    res.json(createResponse(false, err.message));
  }
});

router.get("/workouts/:id", async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    res.json(createResponse(true, "Workout fetched successfully", workout));
  } catch (err) {
    res.json(createResponse(false, err.message));
  }
});

router.put("/workouts/:id", adminTokenHandler, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    const { routineID, exercises, suggestions, cautions, restrictions, mandatoriesPriorToWorkout } =
      req.body;
    workout.routineID = routineID;
    workout.exercises = exercises;
    workout.suggestions = suggestions;
    workout.cautions = cautions;
    workout.restrictions = restrictions;
    workout.mandatoriesPriorToWorkout = mandatoriesPriorToWorkout;
    await workout.save();
    res.json(createResponse(true, "Workout updated successfully", workout));
  } catch (err) {
    res.json(createResponse(false, err.message));
  }
});

router.delete("/workouts/:id", adminTokenHandler, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    await workout.remove();
    res.json(createResponse(true, "Workout deleted successfully"));
  } catch (err) {
    res.json(createResponse(false, err.message));
  }
});

router.use(errorHandler);

module.exports = router;
