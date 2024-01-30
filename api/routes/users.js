const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");


//UPDATE
router.put("/:id", verify, async(req, res)=>{
    if(req.user.id===req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password, 
                process.env.SECRET_KEY
            ).toString();
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, 
                {
                     $set:req.body 
                },
                { new:true }        //it will return new user in json o/p after updating
                );

            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else{
        res.status(403).json("You can update only your account!!");
    }
});

//DELETE
router.delete("/:id", verify, async(req, res)=>{
    if(req.user.id===req.params.id || req.user.isAdmin){       
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted...");
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else{
        res.status(403).json("You can delete only your account!!");
    }
});

//GET
router.get("/find/:id", async(req, res)=>{
        try {
            const user=await User.findByIdAndDelete(req.params.id);
            const { password, ...info } = user._doc; 
            res.status(200).json(info);
        } catch (err) {
            res.status(500).json(err);
        }
});

//GET ALL
router.get("/", verify, async(req, res)=>{          //=>"/?new=true"=>it will return last 10 new users
    const query = req.query.new;
    if(req.user.isAdmin){               //see all users only if we are admin
        try {
            //it will give latesttwo
            const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else{
        res.status(403).json("You are not allowed to see all users !!");
    }
});

//GET USER STATS
router.get("/stats", async (req, res)=>{
    const today = new Date();
    const lastYr = today.setFullYear(today.setFullYear() - 1);

    try{            //finding total users per month
        const data = await User.aggregate([
            {
                $project: {
                    //"$year function will return year they are mongodb functs"
                    month: {$month: "$createdAt"}           //it will give month numberwise like Jan its 1
                    }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum:1}     //return total users per month
                }
            }
        ]);
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
});


module.exports=router;