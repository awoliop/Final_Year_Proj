const express = require("express");
const router = express.Router();
const errorHandler = require("../Middlewares/errorMiddleware");
const authTokenHandler = require("../Middlewares/checkAuthToken");

// Middleware to check if the user is authenticated (using your existing middleware)
router.use(authTokenHandler);

router.post("/extract-user-id-part", async (req, res, next) => {
  try {
    const userId = req.userId; // Assuming the userId is added to the request by the authTokenHandler middleware

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not found in request",
      });
    }

    // Cut the userId in half
    const userIdPart = userId.substring(0, userId.length / 2);

    res.status(200).json({
      success: true,
      message: "User ID part extracted successfully",
      userIdPart: userIdPart,
    });
  } catch (err) {
    next(err);
  }
});

// Error handler middleware (if not already used globally)
router.use(errorHandler);

module.exports = router;
