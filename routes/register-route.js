const {createUser} = require('../models/user');
const {getErrorMessage} = require('../public/js/utils');
const router = require('express').Router();


router.post('/register', async (req, res, done) => {
    const {name, username, email, password} = req.body; 

    // Validate Form
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email provided is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirm-password', 'Confirm Password is required').notEmpty();
    req.checkBody('confirm-password', 'Password and Confirm Password don\'t match').equals(password);

    const errors = req.validationErrors();
    if(errors) return res.render('index', {message: errors});

    try {
        // Creates and Adds the newly Registered User to the DB
        await createUser({name, username, email, password});
    }
    catch(err) {
        console.error(`"POST ${req.originalUrl}" HTTP Error:\n${err.stack}`);
        done(err);
    }

    req.flash('success_msg', "You've successfully registered and can now login");
    res.redirect('/login');
})

module.exports = router;