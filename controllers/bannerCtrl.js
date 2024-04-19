const Banners = require("../models/banner");
const { updateOne, deleteOne } = require("mongoose");
const { validationResult } = require("express-validator");

const getAllBanner = async (req, res) => {
  try {
    let banners;
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      banners = await Banners.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          image: 1,
          imageAlt: 1,
          date: 1,
          situation: 1,
        });
    } else {
      banners = await Banners.find().sort({ _id: -1 });
    }
    const allBannersNum = await Banners.countDocuments();
    res.status(200).json({ banners, allBannersNum }); // ارسال لیست بنرها به همراه تعداد آن‌ها
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const newBanner = async (req, res) => {
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
        await Banners.create(req.body);
        res.status(200).json({ msg: "بنر با موفقیت ذخیره شد" });
      } else {
        res.status(422).json({ msg: "فرمت عکس اشتباه هست." });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const updateBanner = async (req, res) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      if (
        req.body.image.endsWith(".jpg") ||
        req.body.image.endsWith(".png") ||
        req.body.image.endsWith(".jpeg") ||
        req.body.image.endsWith(".webp")
      ) {
        await Banners.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        res.status(200).json({ msg: "بنر با موفقیت بروز رسانی شد" });
      } else {
        res.status(422).json({ msg: "فرمت عکس اشتباه هست." });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const deleteBanner = async (req, res) => {
  try {
    await Banners.findByIdAndDelete(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "بنر با موفقیت حذف شد" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const getOneBanner = async (req, res) => {
  try {
    const GoalBanners = await Banners.findById(req.params.id);
    res.status(200).json(GoalBanners);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const getActiveBanner = async (req, res) => {
  try {
    const activeBanners = await Banners.find({ situation: true }).select({
      image: 1,
      imageAlt: 1,
      link: 1,
    });

    res.status(200).json(activeBanners);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

module.exports = {
  getAllBanner,
  newBanner,
  updateBanner,
  deleteBanner,
  getOneBanner,
  getActiveBanner,
};
