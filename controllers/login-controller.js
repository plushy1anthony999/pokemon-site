module.exports = {
    post(req, res) {
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
    }
};