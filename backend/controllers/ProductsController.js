const express = require("express");
const pool = require("../Databases/db");

const app = express();
app.use(express.json());

const postProduct = async (req, res) => {
  try {
    const { name, image, price, categoryID } = req.body;

    await pool.query(
      "INSERT INTO products (name, image, price, categoryID) VALUES ($1, $2, $3, $4)",
      [name, image, price, categoryID]
    );

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    const products = result.rows;
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There was an error within the server" });
  }
};

const getProduct = async (req, res) => {
  try {
    const { productID } = req.params;
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      productID,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found!" });
    }
    const product = result.rows[0];
    res.status(200).json(product); // one row retrieved, so the first index chosen
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There was an error within the server" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productID } = req.params;

    const result = await pool.query("DELETE FROM products WHERE id = $1", [
      productID,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while deleting the product from server" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productID } = req.params;
    const { name, image, price, categoryID } = req.body;

    const result = await pool.query(
      "UPDATE products SET name = $1, image = $2, price = $3, categoryID = $4 WHERE id = $5",
      [name, image, price, categoryID, productID]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while updating the product on the server" });
  }
};

module.exports = {
  postProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
};
