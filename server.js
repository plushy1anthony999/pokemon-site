const routes = require('./routes');
const {getErrorMessage} = require('./public/js/utils');

const path = require('path');
const crypto = require('crypto');
const helmet = require('helmet');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const express = require('express');
const expressHandleBars = require('express-handlebars');
const expressValidator = require('express-validator');
const expressMessages = require('express-messages');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectFlash = require('connect-flash');
const mongoose = require('mongoose');
const mongoDB = require('mongodb');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();

const PROTOCOL = 'http';
app.set('port', process.env.PORT || 3000);

// Setup Handlebars as View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.engine('handlebars', expressHandleBars({defaultLayout: 'main-layout.handlebars'}));

app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(helmet({
    dnsPrefetchControl: true, 
    permittedCrossDomainPolicies: false, 
    expectCt: {enforce: false, maxAge: 60 * 60 * 24, reportUri: `${PROTOCOL}://localhost:${app.get('port')}/report-expect-ct`}
}));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(connectFlash());

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Express Session
app.use(expressSession({
    name: "crypto.randomBytes(20).toString('ascii')",
    secret: "crypto.randomBytes(4096).toString('base64')", // TODO: replace w/ Environment Variable
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: true,
        httpOnly: true,
        domain: `${PROTOCOL}://localhost:${app.get('port')}`
    }
}));

// Express Validator
app.use(expressValidator({
    errorFormatter(param, msg, value) {
        const namespace = param.split('.');
        const formParam = namespace.shift();

        while(namespace.length > 0) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {param: formParam, msg, value};
    }
}));

// Flash Messages for the current Req/Res
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');      // error message set by Passport
    res.locals.success = req.flash('success');  // success message set by Passport
    // res.locals.user = req.user || null;
    next();
});

// Connect to DB. If it doesn't exist, create DB and connect to it.
mongoose.connect('mongodb://localhost/nodejs-login-system-with-passport', {useNewUrlParser: true}); 

app.use(...routes);

const server = app.listen(app.get('port'), () => {
    console.log(`Listening on Port ${app.get('port')}`);
});