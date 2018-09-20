const router = require('express').Router();

router.get('/account-delete', (req, res) => {
    res.render('account-delete');
})

router.delete('/account-delete', async (req, res) => {

})

module.exports = router;