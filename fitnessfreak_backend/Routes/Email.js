// const express = require("express");
// const router = express.Router();
// const errorHandler = require("../Middlewares/errorMiddleware");
// const authTokenHandler = require("../Middlewares/checkAuthToken");

// // Middleware to check if the user is authenticated (using your existing middleware)
// router.use(authTokenHandler);

// router.post("/extract-user-id-part", async (req, res, next) => {
//   try {
//     const userId = req.userId; // Assuming the userId is added to the request by the authTokenHandler middleware

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: "User ID not found in request",
//       });
//     }

//     // Cut the userId in half
//     const userIdPart = userId.substring(0, userId.length / 2);

//     res.status(200).json({
//       success: true,
//       message: "User ID part extracted successfully",
//       userIdPart: userIdPart,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// // Error handler middleware (if not already used globally)
// router.use(errorHandler);

// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../Models/UserSchema"); // Import the User model
const jwt = require("jsonwebtoken");

function createResponse(ok, message, data) {
  return {
    ok,
    message,
    data,
  };
}

// Middleware to check authentication token and get user info
router.use((req, res, next) => {
  const authToken = req.cookies.authToken;

  if (!authToken) {
    return res.status(401).json(createResponse(false, "No authentication token provided"));
  }

  jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json(createResponse(false, "Invalid or expired authentication token"));
    }

    req.userId = decoded.userId;
    next();
  });
});

// Route to get user email
router.get("/get-email", async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json(createResponse(false, "User not found"));
    }

    res
      .status(200)
      .json(createResponse(true, "User email retrieved successfully", { email: user.email }));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
