const express = require("express");
const router = express.Router();
const PopularRoutine = require("../Models/PopularRoutine");

router.post("/popularroutines", async (req, res) => {
  try {
    const popularRoutines = await PopularRoutine.find({});
    res.status(200).json(popularRoutines);
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

module.exports = router;
