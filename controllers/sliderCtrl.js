const Slider = require("../models/slider");
const { updateOne, deleteOne } = require("mongoose");
const { validationResult } = require("express-validator");

const getAllSliders = async (req, res) => {
  try {
    let sliders;
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      sliders = await Slider.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          image: 1,
          imageAlt: 1,
          date: 1,
          situation: 1,
          sorter:1
        });
    } else {
      sliders = await Slider.find().sort({ _id: -1 });
    }
    const allSliderNum = await Slider.countDocuments();
    res.status(200).json({ sliders, allSliderNum }); // ارسال لیست بنرها به همراه تعداد آن‌ها
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const newSlider = async (req, res) => {
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
        await Slider.create(req.body);
        res.status(200).json({ msg: "اسلایدر با موفقیت ذخیره شد" });
      } else {
        res.status(422).json({ msg: "فرمت عکس اشتباه هست." });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const updateSlider = async (req, res) => {
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
        await Slider.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        res.status(200).json({ msg: "اسلایدر با موفقیت بروز رسانی شد" });
      } else {
        res.status(422).json({ msg: "فرمت عکس اشتباه هست." });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const deleteSlider = async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "اسلایدر با موفقیت حذف شد" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const getOneSlider = async (req, res) => {
  try {
    const GoalSlider = await Slider.findById(req.params.id);
    res.status(200).json(GoalSlider);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const getActiveSlider = async (req, res) => {
  try {
    const activeSliders = await Slider.find({ situation: true }).sort({sorter:1}).select({
      image: 1,
      imageAlt: 1,
      link: 1,
      sorter:1 
    });

    res.status(200).json(activeSliders);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

module.exports = {
  getAllSliders,
  newSlider,
  updateSlider,
  deleteSlider,
  getOneSlider,
  getActiveSlider,
};
