const db = require("../models");
const userService = require("../services/userService");

let ControllerRegister = async(req, res) => {
    try {
        let user = {
            nm_user: req.body.name,
            email_user: req.body.email,
            pwd_user: req.body.password
        };
        let message = await userService.createNewUser(user);
        console.log(message);
        return res.redirect("/?=sucess")
    } catch (e) {
        console.log(e);
        return res.redirect("/register?=error")
    }
}

module.exports = {
    ControllerRegister: ControllerRegister
}