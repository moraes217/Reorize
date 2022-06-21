const db = require("../models");
const bcrypt = require("bcryptjs");

let findUserByEmail = (emailInput) => {
    return new Promise(async(resolve, reject) =>{
        try {
            let user = await db.tb_user.findOne({
                where: {
                    email_user: emailInput
                }
            });
            if(!user){
                reject("Email inválido.")
            }
            resolve(user);
        } catch (e) {
            reject(e);
        }
    });
}

let comparePassword = (password, userObject) => {
    return new Promise(async(resolve, reject) =>{
        try {
            let isMatch = await bcrypt.compare(password, userObject.pwd_user);
            if(isMatch) 
                resolve(true);
            else{
                resolve("Senha incorreta.")
            }
        } catch (e) {
            reject(e);
        };
    });
}

let findUserById = (idInput) => {
    return new Promise(async(resolve, reject)=> {
        try {
            let user = await db.tb_user.findOne({
                where: {
                    id: idInput
                }
            });
            if(!user) reject("Usuário não encontrado");
            resolve(user);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    findUserByEmail: findUserByEmail,
    comparePassword: comparePassword,
    findUserById: findUserById
}