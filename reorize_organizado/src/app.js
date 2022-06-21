const express = require("express");
const favicon = require("serve-favicon");
const app = express();
const configSession = require('./config/session');
const path = require("path");
const db = require("./models");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectFlash = require("connect-flash")
const passport = require("passport");
const expressLayouts = require("express-ejs-layouts")
const PORT = process.env.PORT || 3000;

app.use(cookieParser('secret'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));

app.use('/public/', express.static(path.join(__dirname, 'public')))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // visual do front-end
app.use('/css', express.static(__dirname + '/node_modules/bootstrap-datepicker-1.9.0/css')); // visual do calendário
app.use('/js', express.static(__dirname + '/node_modules/bootstrap-datepicker-1.9.0/js')); // script do calendário
app.use('/js', express.static(__dirname + '/node_modules/bootstrap-datepicker-1.9.0/locales')); // escrita do calendário
app.use('/js', express.static(__dirname + '/node_modules/chart.js/dist')); // exibição dos gráficos
app.use(favicon(path.join(__dirname, './public/img', 'reorize.ico')));

configSession(app);

app.use(passport.initialize());
app.use(passport.session());

app.use(connectFlash())

const Route = require("./routes/web");
app.use("/", Route);

const Routes = require('./test_adm/adm');
app.use("/api", Routes);

db.sequelize.sync().then(() => {
    app.listen(PORT, ()=>{
        console.log(`Rodando em http://localhost:${PORT}`);
    });
});

