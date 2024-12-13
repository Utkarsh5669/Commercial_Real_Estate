const axios = require("axios");
const express = require("express");
const router = express.Router();

router.post("/recommendations", async (req, res) => {
  try {
    const userTags = req.body.tags; 
    const response = await axios.post("http://localhost:5001/recommend", { tags: userTags });
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching recommendations:", err);
    res.status(500).send("Error fetching recommendations");
  }
});

module.exports = router;
