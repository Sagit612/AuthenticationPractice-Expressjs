const express = require('express');
var User = require("../models/user");
var router = express.Router();



router.get("/", (req, res) => {
    res.render("register");
});

router.post("/", async (req, res, next) => {
    var {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({
            mesError: true,
            isCreated: false,
            message: {mesBody: "Missing username or password"}
        });
    }

    try{
        var user = await User.findOne({ username: username});
        if(user){
            return res.status(400).json({
                status: 400,
                mesError: true,
                isCreated: false,
                message: {mesBody: "Username already exists!"}
            })
        }else{
            var newUser = new User({
                username: username,
                password: password
            })
            await newUser.save();
            res.status(201).json({
                status: 201,
                message: "Register successfully",
                user: newUser,
                isCreated: true,
                mesError: false
            })
        }
    }catch(error) {
        res.status(500).json({message: {mesBody: "Error"}, mesError: true});
        next(error);
    }
}
);



module.exports = router;