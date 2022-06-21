let checkLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        console.log(req.isAuthenticated());
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


module.exports = {
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    postLogout: postLogout
}