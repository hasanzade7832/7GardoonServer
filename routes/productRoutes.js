const express = require("express");
const router = express();
const { check } = require("express-validator");
const PostCtrl = require("../controllers/productCtrl");

router.get("/products", PostCtrl.getAllProducts);
router.get("/productRel", PostCtrl.getRelProducts);
router.get("/categoryRel", PostCtrl.getRelCategories);
router.post(
  "/newProduct",
  [
    check(
      "title",
      "تعداد کاراکتر عنوان محصول باید بیشتر از4 کاراکتر باشد ..."
    ).isLength({ min: 4 }),
    check("published", "فرمت بخش انتشار اشتباه است ").isBoolean(),
    check("relatedProducts", "فرمت بخش های مرتبط اشتباه است").isArray(),
    check("typeOfProduct", "تعداد کاراکتر بخش تایپ محصول اشتباه است ").isLength(
      { min: 4 }
    ),
  ],
  PostCtrl.newProducts
);
router.post(
  "/updateProduct/:id",
  [
    check(
      "title",
      "تعداد کاراکتر عنوان محصول باید از 4 حرف بیشتر باشد..."
    ).isLength({ min: 4 }),
    check("published", "فرمت بخش انتشار اشتباه است ").isBoolean(),
    check("relatedProducts", "فرمت بخش های مرتبط اشتباه است").isArray(),
    check("typeOfProduct", "تعداد کاراکتر بخش تایپ محصول اشتباه است ").isLength(
      { min: 4 }
    ),
  ],
  PostCtrl.updateProducts
);
router.post("/deleteProduct/:id", PostCtrl.deleteProducts);
router.get("/product/:slug", PostCtrl.getOneProduct);
router.get("/productById/:id", PostCtrl.getOneProductById);
router.get("/activeProduct", PostCtrl.getActiveProduct);
router.get("/productPage", PostCtrl.getPostPage);
router.get("/mostViewProduct", PostCtrl.getMostViewProduct);
router.post("/relatedProducts", PostCtrl.getRelatedProducts);
module.exports = router;
