const Property = require("../models/Property");

exports.getProperties = async (req, res) => {
  try {
    const [properties] = await Property.getAll();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
