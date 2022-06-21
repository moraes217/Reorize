const db = require("../models");
const flash = require("connect-flash")
const userService = require("../services/userService");
const bcrypt = require('bcryptjs');
const Json2csvParser = require('json2csv').Parser;
const {Sequelize, Op } = require('sequelize');
const nodemailer = require('nodemailer');

let ControllerRegister = async(req, res) => {
    try {
        let user = {
            nm_user: req.body.name,
            email_user: req.body.email,
            pwd_user: req.body.password
        };
        let message = await userService.createNewUser(user);
        console.log(message);
        if(message==="Email já existe"){
            req.flash('errors', message)
            return res.redirect("/register?=error_email")
        }
        return res.redirect("/?=sucess")
    } catch (e) {
        console.log(e);
        req.flash('errors', e.message)
        return res.redirect("/register?=error")
    }
}

let ControllerAccount = async(req, res) => {
    try {
        var limit_account = await db.tb_account.findAll({
            raw: true,
            nest: true,
            include: [{
                model: db.tb_user,
                as: 'tb_user',
                where: {
                    id: req.user.id
                }
            }]
        })
        if(limit_account.length > 4 ){
            req.flash("errors", "Limite de contas atingido")
            res.redirect("/dashboard?=limit_reached")
        }else{
            await db.tb_account.create({
                id_user:req.body.user,
                nm_account:req.body.name_account,
                balance_account:req.body.balance_account
            }).then(subAccount => res.redirect("/dashboard?=account_success"));
        }
    } catch (e) {
        console.log(e);
        req.flash("errors", "Erro na conta: "+ e.message)
        return res.redirect("/dashboard?=account_error");
    }
}

let ControllerRegistry = async(req, res) => {
    try {
        await db.tb_registry.create({
            id_account:req.body.account,
            desc_registry:req.body.desc_item,
            id_category:req.body.category,
            vl_registry:req.body.value,
            dt_registry:req.body.date,
            type_registry:req.body.type
        }).then(subRegistry => res.redirect("/dashboard?=registry_success"));
    } catch (e) {
        console.log(e);
        req.flash("errors", "Erro na registro: "+ e.message)
        return res.redirect("/dashboard?=registry_error");
    }
}

let ControllerEdit = async(req, res) => {
    try {
        await db.tb_registry.update({
            id_account:req.body.account,
            desc_registry:req.body.desc_item,
            id_category:req.body.category,
            vl_registry:req.body.value,
            dt_registry:req.body.date,
            type_registry:req.body.type
        },{
            where: {
                id: req.body.id 
            }
        }).then(edit => res.redirect("/moves?=edit_success"))
    } catch (e) {
        console.log(e)
        req.flash("errors", "Erro ao editar: "+ e.message)
        return res.redirect("/moves?=error_edit")
    }
}

let ControllerCategory = async(req, res) => {
    try {
        await db.tb_category.create({
            id_user: req.body.user,
            nm_category: req.body.category
        }).then(subCategory => res.redirect("/dashboard?=category_success"));
    } catch (e) {
        console.log(e);
        req.flash("errors", "Erro na categoria: "+ e.message)
        return res.redirect("/dashboard?=category_error");
    }
}

let ControllerTarget = async(req, res) => {
    try {
        await db.tb_goal.create({
            id_account:req.body.account,
            id_category:req.body.category,
            vl_goal:req.body.value
        }).then(subTarget => res.redirect("/dashboard?=target_success"));
    } catch (e) {
        console.log(e);
        req.flash("errors", "Erro na meta: "+ e.message)
        return res.redirect("/dashboard?=target_error");
    }
}

let ControllerContact = async(req, res) => {    
    try {

        let email  = await db.tb_user.findOne({attributes: ['email_user'] , where: {id: req.body.user}})

        const transporter = nodemailer.createTransport({
            host: "smtp.mailgun.org",
            port: 587,
            secure: false,
            auth: {
                user: "",
                pass: ""
            },
            tls: {
                rejectUnauthorized: false
            }
        });
       
        console.log(await transporter.sendMail({
            text: req.body.text,
            subject: req.body.subject,
            from: email.email_user,
            to: ''
        }).then(message => {
            console.log(message)
        }).catch(err => {
            console.log(err)
        }))

        await db.tb_contact.create({
            id_user:req.body.user,
            subject_contact:req.body.subject,
            desc_contact:req.body.text
        }).then(subContact => res.redirect("/dashboard?=contact_success"));
    } catch (e) {
        console.log(e);
        req.flash("errors", "Erro no contato: "+ e.message)
        return res.redirect("/dashboard?=contact_error");
    }
}

let ControllerProfile = async(req, res) => {
    let verify_name  = await db.tb_user.findOne({attributes: ['nm_user'] , where: {id: req.body.user}})
    let verify_email  = await db.tb_user.findOne({attributes: ['email_user'] , where: {id: req.body.user}})
    let verify_password  = await db.tb_user.findOne({attributes: ['pwd_user'] , where: {id: req.body.user}})
    try {
        if(req.body.password === req.body.new_password || req.body.password === req.body.re_new_password){
            console.log("Nova senha não pode ser igual a senha atual");
            req.flash("errors", "Nova senha não pode ser igual a senha atual")
            return res.redirect("/profile?=error_pass");
        }else if(req.body.new_password !== req.body.re_new_password){
            console.log("Nova Senha e Repetir Nova Senha devem ser iguais");
            req.flash("errors", "Nova Senha e Repetir Nova Senha devem ser iguais")
            return res.redirect("/profile?=error_new_pass");
        }else if(req.body.name !== verify_name.nm_user || req.body.email !== verify_email.email_user || !bcrypt.compareSync(req.body.password, verify_password.pwd_user)){
            console.log("Dados inválidos");
            req.flash("errors", "Dados inválidos")
            return res.redirect("profile?=error");
        }else{
            await db.tb_user.update({
                    pwd_user: bcrypt.hashSync(req.body.new_password, 10)
                }, 
                {
                    where: {
                        id: req.body.user
                    }
                }).then(() => res.redirect("/dashboard?=success"));
        }
    } catch (e) {
        console.log(e);
        req.flash("errors", "Erro encontrado: "+ e.message)
        return res.redirect("/profile?=error");
    }
}

let ControllerExport = async(req, res) => {
    try {
        await db.tb_registry.findAll({
            include: [{
                model: db.tb_category,
                as: 'tb_category',
                attributes: []
            },{
                model: db.tb_account,
                as: 'tb_account',
                attributes: [],
                where: {
                    id: req.body.account,
                }
            }],
            attributes: [[Sequelize.col('tb_category.nm_category'), 'Categoria'],['vl_registry', 'Valor'], ['desc_registry', 'Descricao'], ['type_registry', 'Tipo'], [Sequelize.fn('date_format', Sequelize.col('dt_registry'), '%d-%m-%Y'), 'Data']],
            where: {
                [Op.or]: [{
                    dt_registry: {
                        [Op.between]: [req.body.from, req.body.until]
                    }
                }]
            },
            order: [['dt_registry', 'asc']],
            limit: null
        }).then(objects => {
            const jsonObjects = JSON.parse(JSON.stringify(objects));
            const csvFields = ['Categoria','Valor', 'Descricao', 'Tipo', 'Data'];
            const json2csvParser = new Json2csvParser({ csvFields });
            const csvData = json2csvParser.parse(jsonObjects);
            console.log(csvData)
    
            res.setHeader('Content-disposition', 'attachment; filename=Registros.csv');
            res.set('Content-Type', 'text/csv');
            res.status(200).end(csvData);
        });
    } catch (e) {
        console.log(e);
        req.flash('errors', 'Conta selecionada não há registro entre '+ req.body.from + ' e '+ req.body.until)
        return res.redirect("/export?=error");
    }
    
}

let ControllerDelRegistry = async(req, res) => {
    try {
        await db.tb_registry.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => res.redirect("/moves?=success_delete"));
    } catch (e) {
        console.log(e)
        req.flash("errors", "Erro ao deletar registro: "+ e.message)
        return res.redirect("/moves?=error");
    }
}

let ControllerDelTarget = async(req, res) => {
    try {
        await db.tb_goal.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => res.redirect("/target?=success_delete"));
    } catch (e) {
        console.log(e)
        req.flash("errors", "Erro ao deletar meta: "+ e.message)
        return res.redirect("/target?=error");
    }
}

let ControllerDelReset = async(req, res) => {
    try {
        var account = await db.tb_account.findAll({
            raw: true,
            attributes: ['id'],
            where: {
                id_user: req.params.id
            }
        })
        account.forEach(function(account) {
            db.tb_goal.destroy({
                where: {
                    id_account: account.id,
                }
            })
            db.tb_registry.destroy({
                where: {
                    id_account: account.id,
                } 
            })
        })
        await db.tb_contact.destroy({ where: { id_user: req.params.id}})
        await db.tb_account.destroy({ where: { id_user: req.params.id}})
        await db.tb_category.destroy({ where: { id_user: req.params.id}})

        res.redirect("/dashboard?=success_reset")

    } catch (e) {
        console.log(e)
        req.flash("errors", "Erro ao resetar dados: "+ e.message)
        return res.redirect("/dashboard?=error");
    }
}


module.exports = {
    ControllerRegister: ControllerRegister,
    ControllerAccount: ControllerAccount,
    ControllerRegistry: ControllerRegistry,
    ControllerCategory: ControllerCategory,
    ControllerTarget: ControllerTarget,
    ControllerContact: ControllerContact,
    ControllerProfile: ControllerProfile,
    ControllerExport: ControllerExport,
    ControllerDelReset: ControllerDelReset,
    ControllerDelRegistry: ControllerDelRegistry,
    ControllerDelTarget: ControllerDelTarget,
    ControllerEdit:ControllerEdit
}