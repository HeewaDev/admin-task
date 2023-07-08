const pool = require("../Databases/db");
const asyncHandler = require("../middlewares/asyncHandler");

const postCategory = asyncHandler(async (req, res) => {
  try {
    const { name, image, store_id } = req.body;

    const result = await pool.query(
      "INSERT INTO categories (name, image, storeID) VALUES ($1, $2, $3) RETURNING *",
      [name, image, store_id]
    );

    res.status(201).json({
      message: "Category added successfully",
      category: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while creating category" });
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while retrieving categories from server" });
  }
});

const getCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryID } = req.params;
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
      categoryID,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    const category = result.rows[0];
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while retrieving a category from server" });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryID } = req.params;

    const result = await pool.query("DELETE FROM categories WHERE id = $1", [
      categoryID,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while deleting the category from server" });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryID } = req.params;
    const { name, image, store_id } = req.body;

    const result = await pool.query(
      "UPDATE categories SET name = $1, image = $2, storeID = $3 WHERE id = $4 RETURNING *",
      [name, image, store_id, categoryID]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updatedCategory = result.rows[0];
    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while updating the category on the server" });
  }
});
module.exports = {
  postCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
