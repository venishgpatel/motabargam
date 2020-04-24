var express = require('express');
var router = express.Router();

let db = require('../bin/db_connection.js');

/* GET member page. */
router.get('/', function (req, res, next) {
    res.render('authenticate', {title: 'Authentication', css: 'authenticate'});
});

router.post('/', function (req, res, next) {
    const email = req.body.email;
    let phone = req.body.phone;
    
    if(!email && !phone) {
        res.render('authenticate', {
            title: 'Authentication', 
            css: 'authenticate',
            unauthenticate: 'Please contact one of the admins from the contact-us page.'
        });
    }
    else {
        let queryString, input;

        if(phone) {
            phone = phone.replace(/\D/g, '').match(/^(1|)(\d{3})(\d{3})(\d{4})$/);
            if(phone) {
                phone = `${phone[2]}-${phone[3]}-${phone[4]}`;
            }
            else {
                phone = null;
            }
        }

        if(email && phone) {
            queryString = 'SELECT email, phone FROM members WHERE email = ? OR phone = ?';
            input = [email, phone];
        }
        else if(email) {
            queryString = 'SELECT email FROM members WHERE email = ?';
            input = [email];
        }
        else {
            queryString = 'SELECT phone FROM members WHERE phone = ?';
            input = [phone];
        }

        db.query(queryString, input, (err, results) => {
            if(err) {
                res.render('authenticate', {title: 'Authentication', css: 'authenticate'});
            }
            else {
                if(!results[0]) {
                    res.render('authenticate', {
                        title: 'Authentication', 
                        css: 'authenticate',
                        unauthenticate: 'Please contact one of the admins from the contact-us page.'
                    });
                }
                else {
                    let sqlQuery = 'SELECT * FROM members WHERE Relationship = "head";';
                    sqlQuery += 'SELECT * FROM members;';
                    sqlQuery += 'SELECT DISTINCT State FROM members;';
                    sqlQuery += 'SELECT DISTINCT Native FROM members;';
                    db.query(sqlQuery, function (err, result) {
                        if (err) throw err;
                        let head = result[0];
                        let person = result[1];
                        let state = result[2];
                        let native = result[3];
                        res.render('member', {
                            title: 'Member',
                            css: 'member',
                            head: head,
                            person: person,
                            state: state,
                            native: native,
                            defaultState: 'All',
                            defaultNative: 'All'
                        });
                    });
                }
            }
        });
    }
});

router.post('/search', function (req, res, next) {
    let enteredState = req.body.state;
    let enteredNative = req.body.native;
    console.log(enteredState, enteredNative);
    if(enteredState === '') {
        enteredState = 'All';
    }

    if(enteredNative === '') {
        enteredNative = 'All';
    }

    let sqlQuery;
    let queryInput = [];
    
    sqlQuery = 'SELECT * FROM members WHERE Relationship = "head"';
    if(enteredState != 'All') {
        sqlQuery += ' AND state = ?';
        queryInput.push(enteredState);
    }
    if(enteredNative != 'All') {
        sqlQuery += ' AND native = ?';
        queryInput.push(enteredNative);
    }

    sqlQuery += ';';

    sqlQuery += 'SELECT * FROM members';
    if(enteredState != 'All') {
        sqlQuery += ' WHERE state = ?';
        queryInput.push(enteredState);
    }

    if(enteredNative != 'All') {
        if(enteredState != 'All') {
            sqlQuery += ' AND native = ?';
        }
        else {
            sqlQuery += ' WHERE native = ?';
        }
        queryInput.push(enteredNative);
    }
    sqlQuery += ';';
    
    sqlQuery += 'SELECT DISTINCT State FROM members;';
    sqlQuery += 'SELECT DISTINCT Native FROM members;';

    db.query(sqlQuery, queryInput, (err, results) => {
        if (err) throw err;
        let head = results[0];
        let person = results[1];
        let state = results[2];
        let native = results[3];
        res.render('member', {
            title: 'Member',
            css: 'member',
            head: head,
            person: person,
            state: state,
            native: native,
            defaultState: enteredState,
            defaultNative: enteredNative
        });
    });
});

module.exports = router;