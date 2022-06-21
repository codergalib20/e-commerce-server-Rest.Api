const express = require("express");
const Product = require("../models/products");

const product = express.Router();

product.get("/products", async (req, res) => {
  try {
    const data = await Product.find({});
    await res.status(201).json({
      data,
      message: "Product data loaded!",
    });
  } catch (error) {
    res.status(403).json({
      error: error.message,
    });
  }
});

module.exports = product;
