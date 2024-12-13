const express = require("express");
const { getProperties } = require("../controllers/propertyController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getProperties);

module.exports = router;
