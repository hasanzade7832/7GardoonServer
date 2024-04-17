const express = require("express");
const router = express();
const { check } = require("express-validator");
const PostCtrl = require("../controllers/postCtrl");

router.get("/post", PostCtrl.getAllPosts);
router.get("/postRel", PostCtrl.getRelPosts);
router.post(
  "/newPost",
  [
    check(
      "title",
      "تعداد کاراکتر عنوان باید بیشتر از4 کاراکتر باشد ..."
    ).isLength({ min: 4 }),
    check("published", "فرمت بخش انتشار اشتباه است ").isBoolean(),
    check("relatedPosts", "خطایی رخ داد").isArray(),
    check("tags", "خطایی رخ داد ").isArray(),
  ],
  PostCtrl.newPost
);
router.post(
  "/updatePost/:id",
  [
    check(
      "title",
      "تعداد کاراکتر آلت تصویر باید بیشتر از4 کاراکتر باشد ..."
    ).isLength({ min: 4 }),
    check("published", "فرمت بخش انتشار اشتباه است ").isBoolean(),
    check("relatedPosts", "خطایی رخ داد").isArray(),
    check("tags", "خطایی رخ داد ").isArray(),
  ],
  PostCtrl.updatePost
);
router.post("/deletePost/:id", PostCtrl.deletePost);
router.get("/post/:slug", PostCtrl.getOnePost);
router.get("/postById/:id", PostCtrl.getOnePostById);
router.get("/activePost", PostCtrl.getActivePsot);
router.get("/postPage", PostCtrl.getPostPage);
router.get("/mostViewPage", PostCtrl.getMostViewPage);
router.post("/relatedPosts", PostCtrl.getRelatedPosts);
module.exports = router;
