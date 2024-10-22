const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const authRoutes = require("./Routes/Auth");
const routines = require("./Routes/Routines");
const EmailRoutes = require("./Routes/Email");
const peripheralRoutes = require("./Routes/Peripheral");
const calorieIntakeRoutes = require("./Routes/CalorieIntake");
const adminRoutes = require("./Routes/Admin");
const imageUploadRoutes = require("./Routes/imageUploadRoutes");
const sleepTrackRoutes = require("./Routes/SleepTrack");
const stepTrackRoutes = require("./Routes/StepTrack");
const weightTrackRoutes = require("./Routes/WeightTrack");
const waterTrackRoutes = require("./Routes/WaterTrack");
const workoutTrackRoutes = require("./Routes/WorkoutTrack");
const workoutRoutes = require("./Routes/WorkoutPlans");
const reportRoutes = require("./Routes/Report");

const PORT = process.env.PORT || 8000;
require("dotenv").config();
require("./db");

app.use(bodyParser.json());
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials
  })
);
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/peripheral", peripheralRoutes);
app.use("/routines", routines);
app.use("/email", EmailRoutes);
app.use("/calorieintake", calorieIntakeRoutes);
app.use("/admin", adminRoutes);
app.use("/imageuploadroutes", imageUploadRoutes);
app.use("/sleeptrack", sleepTrackRoutes);
app.use("/steptrack", stepTrackRoutes);
app.use("/weighttrack", weightTrackRoutes);
app.use("/watertrack", waterTrackRoutes);
app.use("/workouttrack", workoutTrackRoutes);
app.use("/workoutplans", workoutRoutes);
app.use("/report", reportRoutes);

app.get("/", (req, res) => {
  res.json({ message: "The API is working" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
