const express = require("express");
const router = express.Router();
const path = require("path");
const checkAuth = require("../controllers/checkAuth");
const controllerSite = require("../controllers/ControllerSite");
const initPassportLocal = require("../controllers/passport/passportLocal");
const passport = require("passport");

initPassportLocal();

router.get("/", checkAuth.checkLoggedOut, function(req,res){
    res.sendFile(path.resolve(__dirname + "/../../frontend/views/index.html"));
});

router.get("/register", function(req,res){
    res.sendFile(path.resolve(__dirname + "/../../frontend/views/register.html"));
});

router.get("/dashboard", checkAuth.checkLoggedIn, function(req,res){
    res.sendFile(path.resolve(__dirname + "/../../frontend/views/dashboard.html"));
});

router.get("/moves", checkAuth.checkLoggedIn, function(req,res){
    res.sendFile(path.resolve(__dirname + "/../../frontend/views/moves.html"));
});

router.get("/target", checkAuth.checkLoggedIn, function(req,res){
    res.sendFile(path.resolve(__dirname + "/../../frontend/views/target.html"));
});

router.get("/calculator", checkAuth.checkLoggedIn, function(req,res){
    res.sendFile(path.resolve(__dirname + "/../../frontend/views/calculator.html"));
});

router.get("/profile", checkAuth.checkLoggedIn, function(req,res){
    res.sendFile(path.resolve(__dirname + "/../../frontend/views/profile.html"));
});

router.get("/export", checkAuth.checkLoggedIn, function(req,res){
    res.sendFile(path.resolve(__dirname + "/../../frontend/views/export.html"));
});


router.post("/register", controllerSite.ControllerRegister);
router.post("/login", passport.authenticate("local",{
    successRedirect: "/dashboard?=success",
    failureRedirect: "/?=fail"
}));
router.post("/logout", checkAuth.postLogout);

module.exports = router;