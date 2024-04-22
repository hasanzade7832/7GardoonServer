const Categories = require("../models/category");
const { updateOne, deleteOne } = require("mongoose");
const { validationResult } = require("express-validator");

const getAllCategory = async (req, res) => {
    try {
        let categories;
        if (req.query.pn && req.query.pgn) {
            const paginate = req.query.pgn;
            const pageNumber = req.query.pn;
            categories = await Categories.find()
                .sort({ _id: -1 })
                .skip((pageNumber - 1) * paginate)
                .limit(paginate)
                .select({
                    image: 1,
                    imageAlt: 1,
                    title: 1,
                    situation: 1,
                });
        } else {
            categories = await Categories.find().sort({ _id: -1 });
        }
        const allCtegoriesNum = await Categories.countDocuments();
        res.status(200).json({ categories, allCtegoriesNum }); // ارسال لیست بنرها به همراه تعداد آن‌ها
    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "error" });
    }
};

const newCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ msg: errors.errors[0].msg });
        } else {
            if (
                req.body.image.endsWith(".jpg") ||
                req.body.image.endsWith(".png") ||
                req.body.image.endsWith(".jpeg") ||
                req.body.image.endsWith(".webp")
            ) {
                await Categories.create(req.body);
                res.status(200).json({ msg: "دسته بندی با موفقیت ذخیره شد" });
            } else {
                res.status(422).json({ msg: "فرمت عکس اشتباه هست." });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};

const updateCategory = async (req, res) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            res.status(422).json({ msg: errors.errors[0].msg });
        } else {
            if (
                req.body.image.endsWith(".jpg") ||
                req.body.image.endsWith(".png") ||
                req.body.image.endsWith(".jpeg") ||
                req.body.image.endsWith(".webp")
            ) {
                await Categories.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                });
                res.status(200).json({ msg: "دسته بندی با موفقیت بروز رسانی شد" });
            } else {
                res.status(422).json({ msg: "فرمت عکس اشتباه هست." });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};

const deleteCategory = async (req, res) => {
    try {
        await Categories.findByIdAndDelete(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({ msg: "دسته بندی با موفقیت حذف شد" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "error" });
    }
};

const getOneCategory = async (req, res) => {
    try {
        const GoalCategory = await Categories.findById(req.params.id);
        res.status(200).json(GoalCategory);
    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "error" });
    }
};

const getActiveCategory = async (req, res) => {
    try {
        const activeCategories = await Categories.find({ situation: true }).select({
            image: 1,
            imageAlt: 1,
            title: 1,
            slug: 1
        });

        res.status(200).json(activeCategories);
    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "error" });
    }
};

const getOnePost = async (req, res) => {
    try {
        const GoalPosts = await Post.findOne({ slug: req.params.slug });
        if (GoalPosts.situation == true) {

            res.status(200).json(GoalPosts);
        } else {
            res.status(400).json({ msg: "دسته هنوز منتشر نشده است" });

        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "error" });
    }
};

module.exports = {
    getAllCategory,
    newCategory,
    updateCategory,
    deleteCategory,
    getOneCategory,
    getActiveCategory,
    getOnePost
};
