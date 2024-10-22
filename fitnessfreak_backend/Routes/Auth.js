const express = require("express");
const router = express.Router();
const User = require("../Models/UserSchema");
const errorHandler = require("../Middlewares/errorMiddleware");
const authTokenHandler = require("../Middlewares/checkAuthToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//"nkhsrrtnzwpnixoh"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "awoliioop@gmail.com",
    pass: "nkhsrrtnzwpnixoh",
  },
});

router.get("/test", async (req, res) => {
  res.json({
    message: "Auth api is working",
  });
});

function createResponse(ok, message, data) {
  return {
    ok,
    message,
    data,
  };
}

function createResponse(ok, message, data) {
  return {
    ok,
    message,
    data,
  };
}

router.post("/register", async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, email, password, weightInKg, heightInCm, gender, dob, goal, activityLevel } =
      req.body;
    const existingUser = await User.findOne({ email: email });

    if (
      !name ||
      !email ||
      !password ||
      !weightInKg ||
      !heightInCm ||
      !gender ||
      !dob ||
      !goal ||
      !activityLevel
    ) {
      return res.status(400).json(createResponse(false, "Fill all input fields"));
    }
    if (heightInCm > 280) {
      return res.status(400).json(createResponse(false, "height can't exceed 280cm"));
    }
    if (heightInCm < 10) {
      return res.status(400).json(createResponse(false, "height can't be smaller than 10cm"));
    }

    if (existingUser) {
      return res.status(409).json(createResponse(false, "Email already exists"));
    }
    const newUser = new User({
      name,
      password,
      email,
      weight: [
        {
          weight: weightInKg,
          unit: "kg",
          date: Date.now(),
        },
      ],
      height: [
        {
          height: heightInCm,
          date: Date.now(),
          unit: "cm",
        },
      ],
      gender,
      dob,
      goal,
      activityLevel,
    });
    await newUser.save(); // Await the save operation

    res.status(201).json(createResponse(true, "User registered successfully"));
  } catch (err) {
    next(err);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!email || !password) {
      return res.status(400).json(createResponse(false, "All feild are Required"));
    }
    if (!user) {
      return res.status(400).json(createResponse(false, "Invalid credentials"));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(createResponse(false, "Invalid credentials"));
    }

    const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "50m",
    });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET_KEY, {
      expiresIn: "100m",
    });

    res.cookie("authToken", authToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res.status(200).json(
      createResponse(true, "Login successful", {
        authToken,
        refreshToken,
      })
    );
  } catch (err) {
    next(err);
  }
});

router.post("/extract-email-part", authTokenHandler, async (req, res, next) => {
  try {
    console.log("hi");
    const user = req.user; // Assuming authTokenHandler adds the user object to req
    console.log(user);

    if (!user || !user.email) {
      return res.status(400).json(createResponse(false, "User is not authenticated"));
    }

    const emailPart = user.email.split("@")[0];
    console.log(emailPart);

    res.status(200).json(createResponse(true, "Email part extracted successfully", { emailPart }));
  } catch (err) {
    next(err);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    // Clear authentication cookies
    res.clearCookie("authToken");
    res.clearCookie("refreshToken");
    res.status(200).json(createResponse(true, "Logout successful"));
  } catch (err) {
    next(err);
  }
});

router.post("/sendotp", async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
      from: "awoliioop@gmail.com",
      to: email,
      subject: "OTP for verification",
      text: `Your OTP is ${otp}`,
    };

    transporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        console.log(err);
        res.status(500).json(createResponse(false, err.message));
      } else {
        res.json(createResponse(true, "OTP sent successfully", { otp }));
      }
    });
  } catch (err) {
    next(err);
  }
});

router.post("/checklogin", authTokenHandler, async (req, res, next) => {
  res.json({
    ok: true,
    message: "User authenticated successfully",
  });
});

router.use(errorHandler);

module.exports = router;
