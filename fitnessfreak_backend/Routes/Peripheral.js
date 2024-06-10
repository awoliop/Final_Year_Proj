const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/authenticate", async (req, res, next) => {
  const { username } = req.body;

  try {
    const response = await axios.put(
      "https://api.chatengine.io/users/",
      {
        username: username,
        secret: username,
        first_name: username,
      },
      {
        headers: {
          "private-key": "f7d2720d-3368-4f5b-98c7-fbb3ccd10da9",
        },
      }
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
});

module.exports = router;
