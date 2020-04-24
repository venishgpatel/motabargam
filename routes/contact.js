var express = require('express');
var router = express.Router();


let db = require('../bin/db_connection.js');

/* GET contact-us page. */
router.get('/', function (req, res, next) {
    //res.render('contact', { title: 'contact us', css: 'contact' });
    db.query("SELECT * FROM admins", function (err, result, fields) {
        if (err) throw err;
        let admin = result;

        res.render('contact', {
            title: 'contact us',
            css: 'contact',
            admin: admin
        });
    });
});

module.exports = router;