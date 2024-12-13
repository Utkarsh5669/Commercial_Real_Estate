
const axios = require("axios");

exports.getRecommendations = async (req, res) => {
  try {
    const response = await axios.post(process.env.AI_API_URL, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recommendations", error });
  }
};
