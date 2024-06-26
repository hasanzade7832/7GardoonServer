const express = require("express");
const router = express();
const { check } = require("express-validator");

const CategoryCtrl = require("../controllers/categoryCtrl");

router.get("/categories", CategoryCtrl.getAllCategory); // تغییر در مسیر برای دریافت همه‌ی بنرها
router.post(
  "/newCategories",
  [
    check(
      "imageAlt",
      "تعداد کاراکتر آلت تصویر باید بیشتر از 4 کاراکتر باشد ..."
    ).isLength({min:4}),
    check(
      "title",
      "تعداد کاراکتر عنوان باید 4 تا 24 کاراکتر باشد ..."
    ).isLength({min:4, max:24}),
    check(
      "shortDesc",
      "تعداد کاراکتر توضیحات کوتاه باید 4 تا 40 کاراکتر باشد ..."
    ).isLength({min:4, max:40}),
    check("situation", "فرمت بخش انتشار اشتباه است ").isBoolean(),
  ],
  CategoryCtrl.newCategory
);
router.post(
  "/updateCategories/:id",
  [
    check(
      "imageAlt",
      "تعداد کاراکتر آلت تصویر باید بیشتر از 4 کاراکتر باشد ..."
    ).isLength({min:4}),
    check(
      "title",
      "تعداد کاراکتر عنوان باید 4 تا 24 کاراکتر باشد ..."
    ).isLength({min:4, max:24}),
    check(
      "shortDesc",
      "تعداد کاراکتر  توضیحات کوتاه باید 4 تا 40 کاراکتر باشد ..."
    ).isLength({min:4, max:40}),
    check("situation", "فرمت بخش انتشار اشتباه است ").isBoolean(),
  ],
  CategoryCtrl.updateCategory
);
router.post("/deleteCategories/:id", CategoryCtrl.deleteCategory);
router.get("/get-category/:slug", CategoryCtrl.getOnePost);
router.get("/get-categoryById/:id", CategoryCtrl.getOneCategory);
router.get("/activeCategories", CategoryCtrl.getActiveCategory);
module.exports = router;
