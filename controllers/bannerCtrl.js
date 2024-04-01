const Banners = require("../models/banner");
const { updateOne, deleteOne } = require("mongoose"); // اضافه کردن متدهای مورد نیاز از mongoose

const getAllBanner = async (req, res) => {
  try {
    let banners;
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      banners = await Banners.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate);
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
    await Banners.create(req.body);
    res.status(200).json({ msg: "بنر با موفقیت ذخیره شد" });

    // const newBanner = new Banners({
    //   image: req.body.image,
    //   imageAlt: req.body.imageAlt,
    //   situation: req.body.situation,
    //   link: req.body.link,
    //   date: new Date().toLocaleDateString("fa-IR", {
    //     hour: "2-digit",
    //     minute: "2-digit",
    //   }),
    // });
    // newBanner
    //   .save()
    //   .then((d) => {
    //     res.status(200).json({ msg: "بنر با موفقیت ذخیره شد" });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.status(400).json({ msg: "هنگام ذخیره بنر مشکلی پیش آمد" });
    //   });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const updateBanner = async (req, res) => {
  try {
    await Banners.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "بنر با موفقیت بروز رسانی شد" });
    // await Banners.updateOne(
    //   // استفاده از updateOne برای بروزرسانی بنر
    //   { _id: req.body.goalId },
    //   {
    //     $set: {
    //       image: req.body.image,
    //       imageAlt: req.body.imageAlt,
    //       situation: req.body.situation,
    //       link: req.body.link,
    //       date: new Date().toLocaleDateString("fa-IR", {
    //         hour: "2-digit",
    //         minute: "2-digit",
    //       }),
    //     },
    //   }
    // );
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
};

const deleteBanner = async (req, res) => {
  try {
    await Banners.findByIdAndDelete(req.params.id, req.body, {
      new: true,
    });
    // await Banners.deleteOne({ _id: req.body.goalId }); // استفاده از deleteOne برای حذف بنر
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
