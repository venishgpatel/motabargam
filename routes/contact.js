var express = require('express');
var router = express.Router();

/* GET contact-us page. */
router.get('/', function (req, res, next) {
    res.render('contact', { title: 'contact us', css: 'contact' });
});

module.exports = router;