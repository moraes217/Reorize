const express = require("express");
const favicon = require("serve-favicon");
const app = express();
const configSession = require('./config/session');
const path = require("path");
const db = require("./models");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const PORT = process.env.PORT || 3000;

app.use(cookieParser('secret'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static(path.resolve(__dirname + "/../frontend/")));
app.use(favicon(path.join(__dirname, './img', 'reorize.ico')));

configSession(app);

app.use(passport.initialize());
app.use(passport.session());

const Route = require("./routes/web");
app.use("/", Route);

const Routes = require('./test_adm/adm');
app.use("/api", Routes);


db.sequelize.sync().then(() => {
    app.listen(PORT, ()=>{
        console.log(`Rodando em http://localhost:${PORT}`);
    });
});
