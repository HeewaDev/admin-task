const express = require("express");
const pool = require("../Databases/db");
const asyncHandler = require("../middlewares/asyncHandler");
const app = express();
app.use(express.json());

const createStore = asyncHandler(async (req, res) => {
  try {
    const { name, logo, description } = req.body;

    const storeCreated = await pool.query(
      `INSERT INTO stores ( name, logo, description) VALUES ($1, $2, $3)`,
      [name, logo, description]
    );

    res.status(201).json({ message: "Successfully created", storeCreated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const getStores = asyncHandler(async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM stores`);

    const storeData = result.rows;
    res.status(200).json(storeData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
});

const getSingleStore = asyncHandler(async (req, res) => {
  try {
    const { storeID } = req.params;
    const result = await pool.query(`SELECT * FROM stores WHERE id = $1`, [
      storeID,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Store not found" });
    }

    const store = result.rows[0];
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const updateStore = asyncHandler(async (req, res) => {
  try {
    const { name, logo } = req.body;
    const id = req.params.id;

    if (!name || !logo) {
      return res.status(400).json({ message: "Name and logo are required" });
    }

    console.log(name, logo, id);
    res.status(200).send("Updated store");

    const storeCreated = await pool.query(
      `INSERT INTO stores ( name, logo) VALUES ($1, $2) where id=${id}`,
      [name, logo]
    );

    res.status(201).json({ message: "Successfully created", storeCreated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const deleteStore = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    res.status(200).send("Deleted store");

    const query = "SELECT * FROM stores WHERE id = $1";
    const values = [id];
    const { rows } = await pool.query(query, values);
    const storeDeleted = rows[0];

    // Perform the delete operation using PostgreSQL
    const deleteQuery = "DELETE FROM stores WHERE id = $1";
    await pool.query(deleteQuery, values);

    // Return the deleted store information if needed
    res.status(200).json({ message: "Successfully deleted", storeDeleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  createStore,
  getStores,
  getSingleStore,
  updateStore,
  deleteStore,
};
