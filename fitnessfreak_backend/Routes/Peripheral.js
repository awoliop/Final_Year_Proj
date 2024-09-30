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
          "private-key": "d5a003b8-b297-4beb-ab6d-b87e992afd3f",
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
