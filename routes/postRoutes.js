const express = require("express");
const router = express();

const PostCtrl = require("../controllers/postCtrl");

router.get("/post", PostCtrl.getAllPosts);
router.get("/postRel", PostCtrl.getRelPosts);
router.post("/newPost", PostCtrl.newPost);
router.post("/updatePost/:id", PostCtrl.updatePost);
router.post("/deletePost/:id", PostCtrl.deletePost);
router.get("/post/:slug", PostCtrl.getOnePost);
router.get("/activePost", PostCtrl.getActivePsot);
module.exports = router;
