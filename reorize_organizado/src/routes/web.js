const express = require("express");
const router = express.Router();
const path = require("path");
const checkAuth = require("../controllers/checkAuth");
const controllerSite = require("../controllers/ControllerSite");
const initPassportLocal = require("../controllers/passport/passportLocal");
const passport = require("passport");
const ControllerWeb = require("../controllers/ControllerWeb");

initPassportLocal();

router.get("/", checkAuth.checkLoggedOut, function(req,res){
    res.render(path.resolve("views/pages/index")  , {errors: req.flash("errors")});
});

router.get("/register", function(req,res){
    res.render(path.resolve("views/pages/register") , {errors: req.flash("errors")});
});

router.get("/dashboard", checkAuth.checkLoggedIn, checkAuth.userSession, ControllerWeb.ControllerWebDashboard);
router.get("/moves", checkAuth.checkLoggedIn, checkAuth.userSession, ControllerWeb.ControllerWebMoves);
router.get("/target", checkAuth.checkLoggedIn, checkAuth.userSession, ControllerWeb.ControllerWebTarget);
router.get("/calculator", checkAuth.checkLoggedIn, checkAuth.userSession, ControllerWeb.ControllerWebCalculator);
router.get("/profile", checkAuth.checkLoggedIn, checkAuth.userSession, ControllerWeb.ControllerWebProfile);
router.get("/export", checkAuth.checkLoggedIn, checkAuth.userSession, ControllerWeb.ControllerWebExport);


router.post("/register", controllerSite.ControllerRegister);
router.post("/login", passport.authenticate("local",{
    successRedirect: "/dashboard?=success",
    failureRedirect: "/?=fail",
    successFlash: true,
    failureFlash: true
}));
router.post("/logout", checkAuth.postLogout);

router.post("/account", controllerSite.ControllerAccount);
router.post("/registry", controllerSite.ControllerRegistry);
router.post("/category", controllerSite.ControllerCategory);
router.post("/target", controllerSite.ControllerTarget);
router.post("/contact", controllerSite.ControllerContact);
router.post("/profile", controllerSite.ControllerProfile);
router.post("/export", controllerSite.ControllerExport);
router.post("/edit", controllerSite.ControllerEdit);

router.get("/reset/:id", controllerSite.ControllerDelReset)
router.get("/del-moves/:id", controllerSite.ControllerDelRegistry)
router.get("/del-target/:id", controllerSite.ControllerDelTarget)


module.exports = router;