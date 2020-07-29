const db = require('../bin/db_connection.js');

exports.register = (req, res) => {
  res.render('register', {
    title: 'Register',
    css: 'register',
  });
};