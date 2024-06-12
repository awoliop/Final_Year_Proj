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
          // Private Key
          "private-key": "a7ee0de4-6dfd-4211-86d5-ead9d31096bf",
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
