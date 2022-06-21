// Apps Imsomnia e Postman Foram testados para vizualição de dados
const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcryptjs');


/*********************************VER*********************************************/
//ver todas contas
router.get("/account/all", (req,res) =>{
    db.tb_account.findAll().then(tb_accounts => res.send(tb_accounts));

});
//ver todas categorias
router.get("/category/all", (req,res) =>{
    db.tb_category.findAll().then(tb_categories => res.send(tb_categories));

});
//ver todos contatos
router.get("/contact/all", (req,res) =>{
    db.tb_contact.findAll().then(tb_contacts => res.send(tb_contacts));

});
//ver todas metas
router.get("/goal/all", (req,res) =>{
    db.tb_goal.findAll().then(tb_goals => res.send(tb_goals));

});
//ver todos registros
router.get("/registry/all", (req,res) =>{
    db.tb_registry.findAll().then(tb_registries => res.send(tb_registries)); 

});
//ver todos usuarios
router.get("/user/all", (req,res) =>{
    db.tb_user.findAll().then(tb_users => res.send(tb_users));
});
/*********************************VER*********************************************/


/*********************************LER*********************************************/
//ler contas
router.get('/account/find/:id', (req,res) => {
    db.tb_account.findAll({
        where: {
            id: req.params.id
        }
    }).then(tb_account => res.send(tb_account));
})
//ler categorias
router.get('/category/find/:id', (req,res) => {
    db.tb_category.findAll({
        where: {
            id: req.params.id
        }
    }).then(tb_category => res.send(tb_category));
})
//ler contatos
router.get('/contact/find/:id', (req,res) => {
    db.tb_contact.findAll({
        where: {
            id: req.params.id
        }
    }).then(tb_contact => res.send(tb_contact));
})
//ler metas
router.get('/goal/find/:id', (req,res) => {
    db.tb_goal.findAll({
        where: {
            id: req.params.id
        }
    }).then(tb_goal => res.send(tb_goal));
})
//ler registros
router.get('/registry/find/:id', (req,res) => {
    db.tb_registry.findAll({
        where: {
            id: req.params.id
        }
    }).then(tb_registry => res.send(tb_registry));
})
//ler usuario
router.get('/user/find/:id', (req,res) => {
    db.tb_user.findAll({
        where: {
            id: req.params.id
        }
    }).then(tb_user => res.send(tb_user));
})
/*********************************LER*********************************************/

/*********************************CRIAR*********************************************/
// criar contas
router.post('/acconut/new', (req,res) => {
    db.tb_account.create({
        id_user: req.body.id_user,
        nm_account: req.body.nm_account,
        balance_account: req.body.balance_account
    }).then( submittedAccount => res.send(submittedAccount));
});
// criar categorias
router.post('/category/new', (req,res) => {
    db.tb_category.create({
        id_user: req.body.id_user,
        nm_category: req.body.nm_category
    }).then( submittedCategory => res.send(submittedCategory));
});
// criar contatos
router.post('/contact/new', (req,res) => {
    db.tb_contact.create({
        id_user: req.body.id_user,
        subject_contact: req.body.subject_contact,
        desc_contact: req.body.desc_contact
    }).then( submittedContact => res.send(submittedContact));
});
// criar metas
router.post('/goal/new', (req,res) => {
    db.tb_goal.create({
        id_account: req.body.id_account,
        id_category: req.body.id_category,
        vl_goal: req.body.vl_goal
    }).then( submittedGoal => res.send(submittedGoal));
});
// criar registros
router.post('/registry/new', (req,res) => {
    db.tb_registry.create({
        id_account: req.body.id_account,
        desc_registry: req.body.desc_registry,
        id_category: req.body.id_category,
        vl_registry: req.body.vl_registry,
        dt_registry: req.body.dt_registry,
        type_registry: req.body.type_registry
    }).then( submittedRegistry => res.send(submittedRegistry));
});
// criar usuario
router.post('/user/new', (req,res) => {
    db.tb_user.create({
        nm_user: req.body.nm_user,
        email_user: req.body.email_user,
        pwd_user: bcrypt.hashSync(req.body.pwd_user, 10)
    }).then( submittedUser => res.send(submittedUser));
});
/*********************************CRIAR*********************************************/

/*********************************DELETAR*********************************************/
//deletar contas
router.delete('/acconut/delete/:id', (req,res) => {
    db.tb_account.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send("Conta deletada"));
})
//deletar categorias
router.delete('/category/delete/:id', (req,res) => {
    db.tb_category.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send("Categoria deletada"));
})
//deletar contatos
router.delete('/contact/delete/:id', (req,res) => {
    db.tb_contact.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send("Contato deletada"));
})
//deletar metas
router.delete('/goal/delete/:id', (req,res) => {
    db.tb_goal.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send("Meta deletada"));
})
//deletar registros
router.delete('/registry/delete/:id', (req,res) => {
    db.tb_registry.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send("Registro deletado"));
})
//deletar usuario
router.delete('/user/delete/:id', (req,res) => {
    db.tb_user.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.send("Usuario deletado"));
})
/*********************************DELETAR*********************************************/

/*********************************EDITAR*********************************************/
//editar contas
router.put('/account/edit', (req,res) => {
    db.tb_account.update({
        id_user: req.body.id_user,
        nm_account: req.body.nm_account,
        balance_account: req.body.balance_account
    }, 
    {
        where: {
            id: req.body.id
        }
    }).then(() => res.send("Conta editada"))
})
//editar categorias
router.put('/category/edit', (req,res) => {
    db.tb_category.update({
        id_user: req.body.id_user,
        nm_category: req.body.nm_category
    }, 
    {
        where: {
            id: req.body.id
        }
    }).then(() => res.send("Categoria editada"))
})
//editar contatos
router.put('/contact/edit', (req,res) => {
    db.tb_contact.update({
        id_user: req.body.id_user,
        subject_contact: req.body.subject_contact,
        desc_contact: req.body.desc_contact
    }, 
    {
        where: {
            id: req.body.id
        }
    }).then(() => res.send("Contato editado"))
})
//editar metas
router.put('/goal/edit', (req,res) => {
    db.tb_goal.update({
        id_account: req.body.id_account,
        id_category: req.body.id_category,
        vl_goal: req.body.vl_goal
    }, 
    {
        where: {
            id: req.body.id
        }
    }).then(() => res.send("Meta editada"))
})
//editar registros
router.put('/registry/edit', (req,res) => {
    db.tb_registry.update({
        id_account: req.body.id_account,
        desc_registry: req.body.desc_registry,
        id_category: req.body.id_category,
        vl_registry: req.body.vl_registry,
        dt_registry: req.body.dt_registry,
        type_registry: req.body.type_registry
    }, 
    {
        where: {
            id: req.body.id
        }
    }).then(() => res.send("Registro editado"))
})
//editar usuario
router.put('/user/edit', (req,res) => {
    db.tb_user.update({
        nm_user: req.body.nm_user,
        email_user: req.body.email_user,
        pwd_user: req.body.pwd_user
    }, 
    {
        where: {
            id: req.body.id
        }
    }).then(() => res.send("Usuario editado"))
})
/*********************************EDITAR*********************************************/

module.exports = router;