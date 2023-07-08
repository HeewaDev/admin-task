const express = require("express");
const bodyParser = require("body-parser");
const storeRoute = require("./Routes/storeRoute");
const productRoute = require("./Routes/productRoute");
const categoryRoute = require("./Routes/categoryRoute");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddleware");
const app = express();

const pool = require("./Databases/db");

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors()); // initializing cross origin resource sharing for linking both client and server side without interuption

pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL server and DB");
  })
  .catch((err) => {
    console.error("error connecting to PostgreSQL server");
  });

// Routes
app.use("/api/stores", storeRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);

app.use(errorHandler);
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
