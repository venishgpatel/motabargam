var express = require('express');
var router = express.Router();

let db = require('../bin/db_connection.js');

/* GET member page. */
router.get('/', function (req, res, next) {
    res.render('authenticate', {title: 'Authentication', css: 'authenticate'});
});

module.exports = router;