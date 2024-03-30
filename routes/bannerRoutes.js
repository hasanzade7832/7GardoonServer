const express = require("express");
const router = express();

const BannerCtrl = require("../controllers/bannerCtrl");

router.get("/banners", BannerCtrl.getAllBanner); // تغییر در مسیر برای دریافت همه‌ی بنرها
router.post("/newBanners", BannerCtrl.newBanner);
router.post("/updateBanners/:id", BannerCtrl.updateBanner);
router.post("/deleteBanners/:id", BannerCtrl.deleteBanner);
router.get("/banners/:id", BannerCtrl.getOneBanner);
router.get("/activeBanners", BannerCtrl.getActiveBanner);
module.exports = router;
