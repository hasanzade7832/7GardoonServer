const express = require("express");
const router = express();
const { check } = require("express-validator");

const SliderCtrl = require("../controllers/sliderCtrl");

router.get("/sliders", SliderCtrl.getAllSliders); // تغییر در مسیر برای دریافت همه‌ی بنرها
router.post(
  "/newSliders",
  [
    check(
      "imageAlt",
      "تعداد کاراکتر آلت تصویر باید بیشتر از 4 کاراکتر باشد ..."
    ).isLength({ min: 4 }),
    check("situation", "فرمت بخش انتشار اشتباه است ").isBoolean(),
    check("sorter", "فرمت بخش سورتر اشتباه است ").isNumeric()
  ],
  SliderCtrl.newSlider
);
router.post(
  "/updateSliders/:id",
  [
    check(
      "imageAlt",
      "تعداد کاراکتر آلت تصویر باید بیشتر از 4 کاراکتر باشد ..."
    ).isLength({ min: 4 }),
    check("situation", "فرمت بخش انتشار اشتباه است ").isBoolean(),
    check("sorter", "فرمت بخش سورتر اشتباه است ").isNumeric()
  ],
  SliderCtrl.updateSlider
);
router.post("/deleteSlider/:id", SliderCtrl.deleteSlider);
router.get("/slider/:id", SliderCtrl.getOneSlider);
router.get("/activeSliders", SliderCtrl.getActiveSlider);
module.exports = router;
