const express = require("express");
const router = express();

const BannerCtrl = require("../controllers/bannerCtrl");

router.get("/banners", BannerCtrl.getAllBanner); // تغییر در مسیر برای دریافت همه‌ی بنرها
router.post("/newBanners", BannerCtrl.newBanner);
router.post("/updateBanners", BannerCtrl.updateBanner);
router.post("/deleteBanners", BannerCtrl.deleteBanner);
router.get("/banners/:id", BannerCtrl.getOneBanner); // تغییر در مسیر برای دریافت بنر با آیدی مشخص

module.exports = router;
