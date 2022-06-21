// const db = require("../models");
let checkLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        console.log(!req.isAuthenticated());
        if("true"){
            return res.redirect("/dashboard?=Logged");
        }
        return res.redirect("/");
    }
    next();
}

let checkLoggedOut = (req, res, next) =>{
    if(req.isAuthenticated()){
        return res.redirect("/dashboard");
    }
    next();
}

let postLogout = (req, res) => {
    req.session.destroy( function(error) {
        return res.redirect("/");
    });
}

let userSession = (req, res, next) => {
    res.locals.user = req.user;
    next();
}

module.exports = {
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    postLogout: postLogout,
    userSession: userSession
}