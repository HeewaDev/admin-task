const express = require("express");
// const protect = require("../middlewares/AuthMiddleware.js");
const {
  createStore,
  getSingleStore,
  getStores,
  updateStore,
  deleteStore,
} = require("../controllers/storeController.js");

const router = express.Router();

router.post("/", createStore);
router.get("/", getStores);
router.put("/:id", updateStore);
router.get("/:id", getSingleStore);
router.delete("/:id", deleteStore);

module.exports = router;
