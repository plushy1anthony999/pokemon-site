const router = require('express').Router();

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', "You've successfully been logged out");
    res.redirect('/');
})

module.exports = router;