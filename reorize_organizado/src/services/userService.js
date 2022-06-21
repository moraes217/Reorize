const db = require("../models");
const bcrypt = require("bcryptjs");

let createNewUser = (user) => {
    return new Promise(async(resolve,reject)=>{
        try {
            let isEmailExist = await checkEmailUser(user);
            if(isEmailExist){
                resolve("Email já existe")
            }else{
               user.pwd_user = await bcrypt.hashSync(user.pwd_user, 10);
            //    console.log(user.pwd_user);

                
                await db.tb_user.create(user);
                resolve("Usuário adicionado.");
            }
        } catch (e) {
            reject(e);
        }
    });
}

let checkEmailUser = (userCheck) => {
    return new Promise(async(resolve, reject)=> {
        try {
            let currentUser = await db.tb_user.findOne({
                where: {
                    email_user: userCheck.email_user
                }
            });
            if(currentUser) resolve(true);
            resolve(false);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    createNewUser: createNewUser,
    
}