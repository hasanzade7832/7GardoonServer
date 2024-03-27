   const express = require("express");
   const router = express();

   const BannerCtrl = require("../controllers/bannerCtrl");

   router.get("/banners",BannerCtrl.getAllBanner);
   router.post("/newBanners",BannerCtrl.newBanner);

   module.exports = router;