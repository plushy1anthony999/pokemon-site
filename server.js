const indexRoute = require('./routes/indexRoute');
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');
const logoutRoute = require('./routes/logoutRoute');
const {http404ErrorRoute, httpErrorRoute} = require('./routes/errorRoute');
const dashboardRoute = require('./routes/dashboardRoute');
const {getErrorMessage} = require('./public/js/utils');

const path = require('path');
const helmet = require('helmet');
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


// Setup Handlebars as View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.engine('handlebars', expressHandleBars({defaultLayout: 'main.layout.handlebars'}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet({dnsPrefetchControl: true, permittedCrossDomainPolicies: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(connectFlash());

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Express Session
app.use(expressSession({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
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
    res.locals.user = req.user || null;
    next();
});

// Middleware for redirecting to the previous page
app.use((req, res, next) => {
    
})

// Connect to DB. If it doesn't exist, create DB and connect to it.
mongoose.connect('mongodb://localhost/nodejs-login-system-with-passport', {useNewUrlParser: true}); 

// Set up Routes
app.use(indexRoute, loginRoute, registerRoute, logoutRoute, dashboardRoute);

// Error Routes (for handling unknown pages and other HTTP Errors)
app.use(http404ErrorRoute, httpErrorRoute)

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`Listening on Port ${app.get('port')}`);
})