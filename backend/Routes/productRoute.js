const express = require("express");
const {
  postProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/ProductsController");
// const protect = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.post("/", postProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.get("/:id", deleteProduct);
router.get("/:id", updateProduct);
module.exports = router;
