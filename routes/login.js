const express = require('express');
const passport = require('passport');
var User = require("../models/user");
// var user = 
var router = express.Router();


router.get("/", (req, res) =>{
    res.render("login");
});
// router.post("/", passport.authenticate("login", {
//     successRedirect: "/register",
//     failureRedirect: "/",
//     failureFlash: true
//   }));

router.post("/", passport.authenticate("login"
), async (req, res, next)=> {
    if(req.isAuthenticated()) {
        res.status(200).json({
            message: { mesBody: "login successfully" },
            isAuthenticated: true,
            status: 200
          });
          next();
    }else{
        res.status(401).json({
            message: { mesBody: "Unauthenticated" },
            mesError: true,
            isAuthenticated: false,
            status: 401
          });
    }
}
// , {
//     successRedirect: "/register",
//     failureRedirect: "/login",
//     failureFlash: true
//   }
// )
);



module.exports = router;