const express = require("express");
const router = express();
const { check } = require("express-validator");

const BannerCtrl = require("../controllers/bannerCtrl");

router.get("/banners", BannerCtrl.getAllBanner); // تغییر در مسیر برای دریافت همه‌ی بنرها
router.post(
  "/newBanners",
  [
    check(
      "imageAlt",
      "تعداد کاراکتر آلت تصویر باید بیشتر از 4 کاراکتر باشد ..."
    ).isLength({ min: 4 }),
    check("situation", "فرمت بخش انتشار اشتباه است ").isBoolean(),
  ],
  BannerCtrl.newBanner
);
router.post(
  "/updateBanners/:id",
  [
    check(
      "imageAlt",
      "تعداد کاراکتر آلت تصویر باید بیشتر از 4 کاراکتر باشد ..."
    ).isLength({ min: 4 }),
    check("situation", "فرمت بخش انتشار اشتباه است ").isBoolean(),
  ],
  BannerCtrl.updateBanner
);
router.post("/deleteBanners/:id", BannerCtrl.deleteBanner);
router.get("/banners/:id", BannerCtrl.getOneBanner);
router.get("/activeBanners", BannerCtrl.getActiveBanner);
module.exports = router;
