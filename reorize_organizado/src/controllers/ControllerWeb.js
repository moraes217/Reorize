const path = require("path");
const db = require("../models");
const moment = require("moment");
const { Sequelize } = require("sequelize");


var session_calendar_month = moment(new Date()).format('MM')
var session_calendar_year = moment(new Date()).format('YYYY')



let ControllerWebDashboard = async(req, res) =>{
    try {
 
        var table_account = await db.tb_account.findOne({
            raw: true,
            nest: true,
            include: [{
                model: db.tb_user,
                as: 'tb_user',
                attributes: [],
                where: {
                    id: req.user.id
                }
            }],
            attributes: ['id']
        })
        if(table_account === null) {
            await db.tb_account.create({
            id_user:req.user.id,
            nm_account:"Conta Primaria",
            balance_account:0
            })
        }
        
        var split_calendar = req.query.calendar == undefined ? ['0','0'] : req.query.calendar.split("/")
        var acc = req.query.account == undefined ? table_account.id : req.query.account
        var date_registry = Sequelize.and(Sequelize.where(Sequelize.fn('month', Sequelize.col('dt_registry')), session_calendar_month),Sequelize.where(Sequelize.fn('year', Sequelize.col('dt_registry')), session_calendar_year))
        var date_registry_2 = Sequelize.and(Sequelize.where(Sequelize.fn('month', Sequelize.col('dt_registry')), split_calendar[0]),Sequelize.where(Sequelize.fn('year', Sequelize.col('dt_registry')), split_calendar[1]))
        var cal = req.query.calendar == undefined ? date_registry : date_registry_2
        
        res.render(path.resolve("views/pages/dashboard"), {data: {
            errors: req.flash("errors"),
            data_account: await db.tb_account.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_user,
                    as: 'tb_user',
                    attributes: [],
                    where: {
                        id: req.user.id
                    }
                }],
                attributes: ['id','nm_account']
            }), 
            data_category: await db.tb_category.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_user,
                    as: 'tb_user',
                    attributes: [],
                    where: {
                        id: req.user.id
                    }
                }],
                attributes: ['id','nm_category']
            }),
            data_balance_ger: await db.tb_account.sum('balance_account',{
                raw: true,
                nest: true,
                attributes: [],
                where: {
                    id_user: req.user.id,
                    id: acc
                }
            }),
            data_balance_p: await db.tb_registry.sum('vl_registry',{
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_account,
                    as: 'tb_account',
                    attributes: [],
                    where: {
                        id_user: req.user.id,
                        id: acc
                    }
                }],
                where: {
                    type_registry: 'Receita',
                    dt_registry: cal
                }
            }),
            data_balance_l: await db.tb_registry.sum('vl_registry',{
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_account,
                    as: 'tb_account',
                    attributes: [],
                    where: {
                        id_user: req.user.id,
                        id: acc
                    }
                }],
                where: {
                    type_registry: 'Despesa',
                    dt_registry: cal
                }
            }),
            data_recent_records: await db.tb_registry.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_category,
                    as: 'tb_category',
                    attributes: [],
                    where: {
                        id_user: req.user.id
                    }
                }],
                where: {
                    id_account: acc,
                    dt_registry: cal
                },
                attributes: ['vl_registry', [Sequelize.col('tb_category.nm_category'), 'nm_category']],
                order: [['updatedAt', 'desc']],
                limit: 6
            }),
            chart_expense_records: await db.tb_registry.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_category,
                    as: 'tb_category',
                    attributes: [],
                    where: {
                        id_user: req.user.id
                    }
                }],
                where: {
                    id_account: acc,
                    type_registry: 'Despesa',
                    dt_registry: cal
                },
                attributes: [[Sequelize.fn('sum', Sequelize.col('vl_registry')),'vl_registry'], [Sequelize.col('tb_category.nm_category'), 'nm_category'], [Sequelize.col('tb_category.id'), 'id_category']],
                order: [['updatedAt', 'desc']],
                group: ['id_category']
            }),
            chart_income_records: await db.tb_registry.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_category,
                    as: 'tb_category',
                    attributes: [],
                    where: {
                        id_user: req.user.id
                    }
                }],
                where: {
                    id_account: acc,
                    type_registry: 'Receita',
                    dt_registry: cal
                },
                attributes: ['vl_registry', 'desc_registry'],
                order: [['updatedAt', 'desc']],
            })
        }, moment: moment
    })
    } catch (error) {
        console.log(error)
        return res.redirect("/dashboard?account=0")
    }

}

let ControllerWebMoves = async(req, res) =>{
    try {

        var table_account = await db.tb_account.findOne({
            raw: true,
            nest: true,
            include: [{
                model: db.tb_user,
                as: 'tb_user',
                attributes: [],
                where: {
                    id: req.user.id
                }
            }],
            attributes: ['id']
        })
        var split_calendar = req.query.calendar == undefined ? ['0','0'] : req.query.calendar.split("/")
        var acc = req.query.account == undefined ? table_account.id : req.query.account
        var date_registry = Sequelize.and(Sequelize.where(Sequelize.fn('month', Sequelize.col('dt_registry')), session_calendar_month),Sequelize.where(Sequelize.fn('year', Sequelize.col('dt_registry')), session_calendar_year))
        var date_registry_2 = Sequelize.and(Sequelize.where(Sequelize.fn('month', Sequelize.col('dt_registry')), split_calendar[0]),Sequelize.where(Sequelize.fn('year', Sequelize.col('dt_registry')), split_calendar[1]))
        var cal = req.query.calendar == undefined ? date_registry : date_registry_2

        res.render(path.resolve("views/pages/moves"), {data: {
            errors: req.flash("errors"),
            data_account: await db.tb_account.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_user,
                    as: 'tb_user',
                    attributes: [],
                    where: {
                        id: req.user.id
                    }
                }],
                attributes: ['id','nm_account']
            }), 
            data_category: await db.tb_category.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_user,
                    as: 'tb_user',
                    attributes: [],
                    where: {
                        id: req.user.id
                    }
                }],
                attributes: ['id','nm_category']
            }),
            data_balance_p: await db.tb_registry.sum('vl_registry',{
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_account,
                    as: 'tb_account',
                    attributes: [],
                    where: {
                        id_user: req.user.id,
                        id: acc
                    }
                }],
                where: {
                    type_registry: 'Receita',
                    dt_registry: cal
                }
            }),
            data_balance_l: await db.tb_registry.sum('vl_registry',{
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_account,
                    as: 'tb_account',
                    attributes: [],
                    where: {
                        id_user: req.user.id,
                        id: acc
                    }
                }],
                where: {
                    type_registry: 'Despesa',
                    dt_registry: cal
                }
            }),
            data_registry_p: await db.tb_registry.findAll({         
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_account,
                    as: 'tb_account',
                    attributes: [],
                    where: {
                        id_user: req.user.id,
                        id: acc
                    }
                    
                },{ 
                    model: db.tb_category,
                    as: 'tb_category',
                    attributes: []
                }],
                attributes: ['id','desc_registry','dt_registry', 'vl_registry','type_registry', [Sequelize.col('tb_account.id'), 'id_account'], [Sequelize.col('tb_category.id'), 'id_category'], [Sequelize.col('tb_category.nm_category'), 'nm_category']],
                where: {
                    type_registry: 'Receita',
                    dt_registry: cal
                }
            }),
            data_registry_l: await db.tb_registry.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_account,
                    as: 'tb_account',
                    attributes: [],
                    where: {
                        id_user: req.user.id,
                        id: acc
                    }
                },{ 
                    model: db.tb_category,
                    as: 'tb_category',
                    attributes: []
                }],
                attributes: ['id','desc_registry','dt_registry', 'vl_registry','type_registry', [Sequelize.col('tb_account.id'), 'id_account'], [Sequelize.col('tb_category.id'), 'id_category'], [Sequelize.col('tb_category.nm_category'), 'nm_category']],
                where: {
                    type_registry: 'Despesa',
                    dt_registry: cal
                }
            })
        }, moment: moment
        });
    } catch (error) {
        console.log(error)
        return res.redirect("/moves?account=0")
    }

}

let ControllerWebTarget = async(req, res) =>{
    try {
        var table_account = await db.tb_account.findOne({
            raw: true,
            nest: true,
            include: [{
                model: db.tb_user,
                as: 'tb_user',
                attributes: [],
                where: {
                    id: req.user.id
                }
            }],
            attributes: ['id']
        })
        var split_calendar = req.query.calendar == undefined ? ['0','0'] : req.query.calendar.split("/")
        var acc = req.query.account == undefined ? table_account.id : req.query.account
        var date_registry = Sequelize.and(Sequelize.where(Sequelize.fn('month', Sequelize.col('dt_registry')), session_calendar_month),Sequelize.where(Sequelize.fn('year', Sequelize.col('dt_registry')), session_calendar_year))
        var date_registry_2 = Sequelize.and(Sequelize.where(Sequelize.fn('month', Sequelize.col('dt_registry')), split_calendar[0]),Sequelize.where(Sequelize.fn('year', Sequelize.col('dt_registry')), split_calendar[1]))
        var cal = req.query.calendar == undefined ? date_registry : date_registry_2
        var month = [null,"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho","Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        var calendar_month = split_calendar.toString() == [ 0,0 ] ? parseInt(session_calendar_month) : split_calendar[0]
        var calendar_year = split_calendar.toString() == [ 0,0 ] ? session_calendar_year : split_calendar[1]

        res.render(path.resolve("views/pages/target"), {data: {
            errors: req.flash("errors"),
            data_account: await db.tb_account.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_user,
                    as: 'tb_user',
                    attributes: [],
                    where: {
                        id: req.user.id
                    }
                }],
                attributes: ['id','nm_account']
            }), 
            data_category: await db.tb_category.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_user,
                    as: 'tb_user',
                    attributes: [],
                    where: {
                        id: req.user.id
                    }
                }],
                attributes: ['id','nm_category']
            }), 
            data_target: await db.tb_goal.findAll({
                raw: true, 
                nest: true,
                include: [{
                    model: db.tb_category,
                    as:'tb_category',
                    attributes: []
                },{
                    model: db.tb_account,
                    as: 'tb_account',
                    attributes: [],
                    where: {
                        id_user: req.user.id,
                        id: acc
                    }
                }],
                attributes: ['id','vl_goal','createdAt',[Sequelize.col('tb_account.nm_account'), 'nm_account'],[Sequelize.col('tb_category.nm_category'), 'nm_category'],[Sequelize.col('tb_category.id'), 'id_category']],
                where: {
                    createdAt: Sequelize.and(Sequelize.where(Sequelize.fn('month', Sequelize.col('tb_goal.createdAt')), calendar_month),Sequelize.where(Sequelize.fn('year', Sequelize.col('tb_goal.createdAt')), calendar_year))
                }
            }),
            data_sum: await db.tb_registry.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_category,
                    as: 'tb_category',
                    attributes: [],
                    where: {
                        id_user: req.user.id
                    }
                },{
                    model: db.tb_account,
                    as: 'tb_account',
                    attributes: [],
                    where: {
                        id_user: req.user.id,
                        id: acc
                    }
                }],
                where: {
                    type_registry: 'Despesa',
                    dt_registry: cal
                },
                attributes: [[Sequelize.fn('sum', Sequelize.col('vl_registry')),'vl_registry'],[Sequelize.col('tb_category.nm_category'), 'nm_category'],[Sequelize.col('tb_category.id'), 'id_category'],[Sequelize.col('tb_account.id'), 'id_account']],
                group: ['id_category']
            }) 
        },moment: moment, month: month[parseInt(calendar_month)], year: calendar_year
        });
    } catch (error) {
        console.log(error)
        return res.redirect("/target?account=0")
    }
}

let ControllerWebCalculator = async(req, res) =>{
    try {
        res.render(path.resolve("views/pages/calculator"), {data: {
            data_account: await db.tb_account.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_user,
                    as: 'tb_user',
                    attributes: [],
                    where: {
                        id: req.user.id
                    }
                }],
                attributes: ['id','nm_account']
            }), 
            data_category: await db.tb_category.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_user,
                    as: 'tb_user',
                    attributes: [],
                    where: {
                        id: req.user.id
                    }
                }],
                attributes: ['id','nm_category']
            }),
        }})
    } catch (error) {
        console.log(error)
        return res.render(path.resolve("views/pages/calculator?null_error"))
    }
}

let ControllerWebProfile = async(req, res) =>{
    try {
        res.render(path.resolve("views/pages/profile"), {data: {
            errors: req.flash("errors"),
            data_account: await db.tb_account.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_user,
                    as: 'tb_user',
                    attributes: [],
                    where: {
                        id: req.user.id
                    }
                }],
                attributes: ['id','nm_account']
            }), 
            data_category: await db.tb_category.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_user,
                    as: 'tb_user',
                    attributes: [],
                    where: {
                        id: req.user.id
                    }
                }],
                attributes: ['id','nm_category']
            })}, moment: moment
    })
    } catch (error) {
        console.log(error)
        return res.render(path.resolve("views/pages/profile?null_error"))
    }
}

let ControllerWebExport = async(req, res) =>{
    try {
        res.render(path.resolve("views/pages/export"), {data: {
            errors: req.flash('errors'),
            data_account: await db.tb_account.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_user,
                    as: 'tb_user',
                    attributes: [],
                    where: {
                        id: req.user.id
                    }
                }],
                attributes: ['id','nm_account']
            }), 
            data_category: await db.tb_category.findAll({
                raw: true,
                nest: true,
                include: [{
                    model: db.tb_user,
                    as: 'tb_user',
                    attributes: [],
                    where: {
                        id: req.user.id
                    }
                }],
                attributes: ['id','nm_category']
            })
        }})
    } catch (error) {
        console.log(error)
        req.flash('e_export', 'Erro desconhecido')
        return res.render(path.resolve("views/pages/export?null_error"))
    }
}

module.exports = {
    ControllerWebDashboard:ControllerWebDashboard,
    ControllerWebMoves:ControllerWebMoves,
    ControllerWebTarget:ControllerWebTarget,
    ControllerWebCalculator:ControllerWebCalculator,
    ControllerWebProfile:ControllerWebProfile,
    ControllerWebExport:ControllerWebExport
}