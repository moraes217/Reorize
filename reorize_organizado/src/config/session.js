const Sequelize = require("sequelize");
const session = require("express-session");
const config = require("./config.json");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const database = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        logging: false,
        dialect: "mysql",
        storage: "./session.mysql"
});

const sessionStore =  new SequelizeStore({
    db: database
});

const configSession = (app) => {
    app.use(
        session({
            key: "express.sid",
            secret: "secret",
            store: sessionStore,
            resave: true,
            saveUninitialized: false,
            cookie: {httpOnly: false, secure: false, maxAge: (24 * 60 * 60 * 1000)/* <-- 1 Dia */}
    }));
};

//cria a tabela "sessão" no banco de dados
sessionStore.sync(); 

module.exports = configSession;