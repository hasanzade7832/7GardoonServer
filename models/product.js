const mongoose = require("mongoose");
const Product = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleDateString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  updatedAT: {
    type: String,
    default: new Date().toLocaleDateString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  slug: {
    required: true,
    type: String,
    unique: true,
  },
  image: {
    required: true,
    type: String,
  },
  mainFile: {
    required: true,
    type: String,
  },
  imageAlt: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: String,
  },
  shortDesc: {
    required: true,
    type: String,
  },
  longDesc: {
    required: true,
    type: String,
  },
  tags: {
    required: true,
    type: Array,
    default: [],
  },
  relatedProducts: {
    required: true,
    type: Array,
    default: [],
  },
  categories: {
    required: true,
    type: Array,
    default: [],
  },
  features: {
    required: true,
    type: Array,
    default: [],
  },
  comments: {
    required: true,
    type: Array,
    default: [],
  },
  typeOfProduct: {
    required: true,
    type: String,
    enum: ["graphic", "app", "book"],
  },
  buyNumber: {
    required: true,
    type: Number,
    default: 0,
  },
  pageView: {
    required: true,
    type: Number,
    default: 0,
  },
  published: {
    required: true,
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Product", Product);
