const express = require("express");
const router = express.Router();
const Admin = require("../Models/AdminSchema"); // Import the Admin model
const bcrypt = require("bcrypt");
const errorHandler = require("../Middlewares/errorMiddleware");
const adminTokenHandler = require("../Middlewares/checkAdminToken");
const User = require("../Models/UserSchema");
const Workout = require("../Models/WorkoutSchema");

const jwt = require("jsonwebtoken");

function createResponse(ok, message, data) {
  return {
    ok,
    message,
    data,
  };
}

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if the admin with the same email already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json(createResponse(false, "Admin with this email already exists"));
    }

    // Hash the admin's password before saving it to the database

    const newAdmin = new Admin({
      name,
      email,
      password,
    });

    await newAdmin.save(); // Await the save operation

    res.status(201).json(createResponse(true, "Admin registered successfully"));
  } catch (err) {
    // Pass the error to the error middleware
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json(createResponse(false, "Invalid admin credentials"));
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json(createResponse(false, "Invalid admin credentials"));
    }

    // Generate an authentication token for the admin
    const adminAuthToken = jwt.sign({ adminId: admin._id }, process.env.JWT_ADMIN_SECRET_KEY, {
      expiresIn: "10m",
    });

    res.cookie("adminAuthToken", adminAuthToken, { httpOnly: true });
    res.status(200).json(createResponse(true, "Admin login successful", { adminAuthToken }));
  } catch (err) {
    next(err);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    // Clear the admin authentication token cookie
    res.clearCookie("adminAuthToken");
    res.status(200).json(createResponse(true, "Admin logout successful"));
  } catch (err) {
    next(err);
  }
});

router.get("/checklogin", adminTokenHandler, async (req, res) => {
  res.json({
    adminId: req.adminId,
    ok: true,
    message: "Admin authenticated successfully",
  });
});

router.get("/users", adminTokenHandler, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(createResponse(true, "Users fetched successfully", users));
  } catch (err) {
    res.json(createResponse(false, err.message));
  }
});

router.delete("/users/:id", adminTokenHandler, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json(createResponse(false, "User not found"));
    }
    res.json(createResponse(true, "User deleted successfully"));
  } catch (err) {
    res.status(500).json(createResponse(false, err.message));
  }
});

router.delete("/workouts/:id", adminTokenHandler, async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json(createResponse(false, "User not found"));
    }
    res.json(createResponse(true, "User deleted successfully"));
  } catch (err) {
    res.status(500).json(createResponse(false, err.message));
  }
});

router.get("/workouts", adminTokenHandler, async (req, res) => {
  try {
    const workouts = await Workout.find({}); // Assuming there is a Workout model imported
    res.json(createResponse(true, "Workouts fetched successfully", workouts));
  } catch (err) {
    res.json(createResponse(false, err.message));
  }
});

router.use(errorHandler);

module.exports = router;
