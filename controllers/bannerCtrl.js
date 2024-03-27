const Banners = require('../models/banner');

const getAllBanner = async (req , res) => {
    try{
        const AllBanners = await Banners.find();
        res.status(200).json(AllBanners);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({msg:"error"})
    }
}
module.exports.getAllBanner = getAllBanner


const newBanner = async (req , res) => {
    try{
        const newBanner= new Banners({
            image:req.body.image,
            imageAlt:req.body.imageAlt,
            situation:req.body.situation,
            link:req.body.link,
            date:new Date().toLocaleDateString('fa-IR',{hour:"2-digit",minute:"2-digit"}),
        });
        newBanner.save()
        .then(d=>{
            res.status(200).json({msg:"بنر با موفقیت ذخیره شد"})
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({msg:"هنگام ذخیره بنر مشکلی پیش آمد"})
        })

    }
    catch (err) {
        console.log(err);
        res.status(400).json({msg:"error"})
    }
}
module.exports.newBanner = newBanner