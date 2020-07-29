const db = require('../bin/db_connection.js');

// Home Page
exports.homePage = (req, res) => {
  res.render('index', {
    title: 'Mota Bar Gam Kadva Patidar',
    css: 'index',
  });
};

exports.contactUs = (req, res) => {
  db.query("SELECT * FROM admins", (err, result) => {
    if (err) throw err;
    let admin = result;
    res.render('contact', {
      title: 'Contact us',
      css: 'contact',
      admin: admin,
    });
  });
};

exports.getMembers = (req, res) => {
  let sqlQuery = 'SELECT * FROM members WHERE Relationship = "head";';
  sqlQuery += 'SELECT * FROM members;';
  sqlQuery += 'SELECT DISTINCT State FROM members;';
  sqlQuery += 'SELECT DISTINCT Native FROM members;';
  db.query(sqlQuery, (err, result) => {
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
      defaultNative: 'All',
    });
  });
};

exports.getMembersByStateAndNative = (req, res) => {
  let enteredState = req.query.state;
  let enteredNative = req.query.native;
  console.log(enteredNative, enteredState);
/*   if (enteredState === '') {
    enteredState = 'All';
  }

  if (enteredNative === '') {
    enteredNative = 'All';
  } */

  let sqlQuery;
  let queryInput = [];
  
  sqlQuery = 'SELECT * FROM members WHERE Relationship = "head"';

  if (enteredState != 'All') {
    sqlQuery += ' AND state = ?';
    queryInput.push(enteredState);
  }
  if (enteredNative != 'All') {
    sqlQuery += ' AND native = ?';
    queryInput.push(enteredNative);
  }

  sqlQuery += ';';

  sqlQuery += 'SELECT * FROM members';

  if (enteredState != 'All') {
    sqlQuery += ' WHERE state = ?';
    queryInput.push(enteredState);
  }

  if (enteredNative != 'All') {
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
      defaultNative: enteredNative,
    });
  });
};

exports.matrimony = (req, res) => {
  res.render('matrimony', {
    title: 'Matrimony',
    css: 'matrimony',
  });
};