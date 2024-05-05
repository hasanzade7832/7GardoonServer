const Product = require("../models/product");
const Category = require("../models/category")
const { updateOne, deleteOne } = require("mongoose");
const { validationResult } = require("express-validator");

const getAllProducts = async (req, res) => {
  try {
    let products;
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      products = await Product.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          title: 1,
          updatedAT: 1,
          image: 1,
          imageAlt: 1,
          published: 1,
          pageView: 1,
          price: 1,
          typeOfProduct: 1,
          buyNumber: 1,
        });
    } else {
      products = await Product.find()
        .sort({ _id: -1 })
        .select({ mainFile: false });
    }
    const allPostsProducts = await Product.countDocuments();
    res.status(200).json({ products, allPostsProducts });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const newProducts = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      if (
        req.body.image.endsWith(".jpg") ||
        req.body.image.endsWith(".png") ||
        req.body.image.endsWith(".jpeg") ||
        req.body.image.endsWith(".webp")
      ) {
        const data = req.body;
        data.slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
        await Product.create(req.body);
        res.status(200).json({ msg: "محصول با موفقیت ذخیره شد" });
      } else {
        res.status(422).json({ msg: "فرمت عکس اشتباه هست." });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const updateProducts = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      if (
        req.body.image.endsWith(".jpg") ||
        req.body.image.endsWith(".png") ||
        req.body.image.endsWith(".jpeg") ||
        req.body.image.endsWith(".webp")
      ) {
        const data = req.body;
        data.slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();

        await Product.findByIdAndUpdate(req.params.id, data, {
          new: true,
        });
        res.status(200).json({ msg: "محصول با موفقیت بروز رسانی شد" });
      } else {
        res.status(422).json({ msg: "فرمت عکس اشتباه هست." });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const deleteProducts = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "محصول با موفقیت حذف شد" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const GoalProducts = await Product.findOne({
      slug: req.params.slug,
    }).select({ mainFile: false });
    if (GoalProducts.published == true) {
      //Add one Product TO Page view
      const newProducts = {
        pageView: GoalProducts.pageView + 1,
      };
      await Product.findByIdAndUpdate(GoalProducts._id, newProducts, {
        new: true,
      });
      res.status(200).json(GoalProducts);
    } else {
      res.status(400).json({ msg: "پست هنوز منتشر نشده است ...." });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const getOneProductById = async (req, res) => {
  try {
    const GoalProducts = await Product.findById(req.params.id);
    res.status(200).json(GoalProducts);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const getActiveProduct = async (req, res) => {
  try {
    const activeApp = await Product.find({
      published: true,
      typeOfProduct: "app",
    })
      .limit(8)
      .sort({ _id: -1 })
      .select({
        title: 1,
        slug: 1,
        image: 1,
        imageAlt: 1,
        price: 1,
        typeOfProduct: 1,
        features: 1,
        buyNumber: 1,
        pageView: 1,
        categories: 1,
      });
    const activeBook = await Product.find({
      published: true,
      typeOfProduct: "book",
    })
      .limit(8)
      .sort({ _id: -1 })
      .select({
        title: 1,
        slug: 1,
        image: 1,
        imageAlt: 1,
        price: 1,
        typeOfProduct: 1,
        features: 1,
        buyNumber: 1,
        pageView: 1,
        categories: 1,
      });
    const activeGraphic = await Product.find({
      published: true,
      typeOfProduct: "graphic",
    })
      .limit(8)
      .sort({ _id: -1 })
      .select({
        title: 1,
        slug: 1,
        image: 1,
        imageAlt: 1,
        price: 1,
        typeOfProduct: 1,
        features: 1,
        buyNumber: 1,
        pageView: 1,
        categories: 1,
      });

    res.status(200).json({
      activeApp,
      activeBook,
      activeGraphic,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

//this related products is for add or update for blog
const getRelProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({ published: true }).select({
      title: 1,
    });
    res.status(200).json(allProducts);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const getRelCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({ situation: true }).select({
      title: 1,
    });
    res.status(200).json(allCategories);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const getPostPage = async (req, res) => {
  try {
    let products;
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      products = await Product.find({ published: true })
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          title: 1,
          updatedAT: 1,
          slug: 1,
          image: 1,
          imageAlt: 1,
          shortDesc: 1,
          type: 1,
          pageView: 1,
        });
    } else {
      products = await Product.find({ published: true }).sort({ _id: -1 });
    }
    // const allProductsNum = await Product.countDocuments();
    const allProductsNum = await (
      await Product.find({ published: true })
    ).length;
    res.status(200).json({ products, allProductsNum });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const getMostViewProduct = async (req, res) => {
  try {
    let products;
    products = await Product.find({ published: true })
      .sort({ buyNumber: -1 })
      .limit(3)
      .select({
        title: 1,
        slug: 1,
        pageView: 1,
      });

    res.status(200).json({ products });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

//this related products is for single blog page
const getRelatedProducts = async (req, res) => {
  try {
    const goalIds = req.body.goalIds;
    let products;
    products = await Product.find({ _id: goalIds }).select({
      title: 1,
      slug: 1,
      image: 1,
      imageAlt: 1,
      price: 1,
      typeOfProduct: 1,
      features: 1,
      buyNumber: 1,
      pageView: 1,
    });
    res.status(200).json({ products });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

module.exports = {
  getAllProducts,
  newProducts,
  updateProducts,
  deleteProducts,
  getOneProduct,
  getActiveProduct,
  getRelProducts,
  getRelCategories,
  getOneProductById,
  getPostPage,
  getMostViewProduct,
  getRelatedProducts,
};
