const {User} = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = require('express').Router();

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({username});
		if(!user) return done(null, false, {message: 'Incorrect Username'});
		
		const passwordMatches = await user.validatePassword(password);
        if(!passwordMatches) return done(null, false, {message: 'Incorrect Password'});

		// Successful Login
        return done(null, user);
    }
    catch(err) { done(err); }
}));

passport.serializeUser((user, done) => {
	done(null, user.id);
})
passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	}
	catch(err) { done(err); }
})

// Form POST Authenticates by passing the Request Body to Middleware
// - On Success, redirects to /dashboard
// - On Failure, stays on same page and displays an Error Flash Message
router.post('/login', passport.authenticate('local', {successRedirect: '/dashboard', failureFlash: true, successFlash: true}), (req, res) => {
    const {username, password} = req.body;

    // Validate Form
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    const errors = req.validationErrors();
    if(errors) {
        console.log(errors);
        return;
    }

    // Successful Login
    console.log('Successful Login')
    res.redirect('/dashboard');
});

module.exports = router;