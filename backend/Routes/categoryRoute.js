const express = require("express");

const {
  getAllCategories,
  getCategory,
  postCategory,
} = require("../controllers/CategoryController");
// const protect = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.post("/", postCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategory);

module.exports = router;
