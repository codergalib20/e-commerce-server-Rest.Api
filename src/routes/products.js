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
// Single Product Load
product.get("/:id", async (req, res) => {
  try {
    const data = await Product.find({ _id: req.params.id });
    res.status(200).json({
      data,
      message: "Single product load!!",
    });
  } catch (err) {
    res.status(403).json({
      error: err.message,
    });
  }
});

module.exports = product;
