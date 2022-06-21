const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const productModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  descriptions: [
    {
      description: {
        type: String,
        required: true,
      },
    },
  ],
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
  features: [
    {
      title: {
        type: String,
      },
      feature: {
        type: String,
      },
    },
  ],
  price: {
    type: String,
    required: true,
  },
  favorites: [
    {
      type: String,
      required: true,
    },
  ],
  comments: [
    {
      userId: {
        type: ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
      },
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = new mongoose.model("Product", productModel);
module.exports = Product;
