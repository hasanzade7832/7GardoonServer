const Post = require("../models/post");
const { updateOne, deleteOne } = require("mongoose");
const { validationResult } = require("express-validator");

const getAllPosts = async (req, res) => {
  try {
    let posts;
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      posts = await Post.find()
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
        });
    } else {
      posts = await Post.find().sort({ _id: -1 });
    }
    const allPostsNum = await Post.countDocuments();
    res.status(200).json({ posts, allPostsNum });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const newPost = async (req, res) => {
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
        await Post.create(req.body);
        res.status(200).json({ msg: "مقاله با موفقیت ذخیره شد" });
      } else {
        res.status(422).json({ msg: "خطایی رخ داد" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const updatePost = async (req, res) => {
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

        await Post.findByIdAndUpdate(req.params.id, data, {
          new: true,
        });
        res.status(200).json({ msg: "مقاله با موفقیت بروز رسانی شد" });
      } else {
        res.status(422).json({ msg: "خطایی رخ داد" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "مقاله با موفقیت حذف شد" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const getOnePost = async (req, res) => {
  try {
    const GoalPosts = await Post.findOne({ slug: req.params.slug });

    //Add one Post TO Page view
    const newPost = {
      pageView: GoalPosts.pageView + 1,
    };
    await Post.findByIdAndUpdate(GoalPosts._id, newPost, {
      new: true,
    });
    res.status(200).json(GoalPosts);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const getOnePostById = async (req, res) => {
  try {
    const GoalPosts = await Post.findById(req.params.id);
    res.status(200).json(GoalPosts);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const getActivePsot = async (req, res) => {
  try {
    const activePost = await Post.find({ published: true })
      .limit(4)
      .sort({ _id: -1 })
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

    res.status(200).json(activePost);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

//this related posts is for add or update for blog
const getRelPosts = async (req, res) => {
  try {
    const allPosts = await Post.find().select({ title: 1 });
    res.status(200).json(allPosts);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const getPostPage = async (req, res) => {
  try {
    let posts;
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      posts = await Post.find({ published: true })
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
      posts = await Post.find({ published: true }).sort({ _id: -1 });
    }
    // const allPostsNum = await Post.countDocuments();
    const allPostsNum = await (await Post.find({ published: true })).length;
    res.status(200).json({ posts, allPostsNum });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const getMostViewPage = async (req, res) => {
  try {
    let posts;
    posts = await Post.find({ published: true })
      .sort({ pageView: -1 })
      .limit(3)
      .select({
        title: 1,
        slug: 1,
        pageView: 1,
      });

    res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

//this related posts is for single blog page
const getRelatedPosts = async (req, res) => {
  try {
    const goalIds = req.body.goalIds;
    let posts;
    posts = await Post.find({ _id: goalIds }).select({
      title: 1,
      updatedAT: 1,
      slug: 1,
      image: 1,
      imageAlt: 1,
      shortDesc: 1,
      type: 1,
      pageView: 1,
    });
    res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

module.exports = {
  getAllPosts,
  newPost,
  updatePost,
  deletePost,
  getOnePost,
  getActivePsot,
  getRelPosts,
  getOnePostById,
  getPostPage,
  getMostViewPage,
  getRelatedPosts,
};
