const db = require('../bin/db_connection.js');

exports.register = (req, res) => {
  res.render('register', {
    title: 'Register',
    css: 'register',
  });
};

exports.addFamilyForm = (req, res) => {
  res.render('addFamilyForm', {
    title: 'Add Family',
    css: 'familyForm',
  });
}

exports.addFamily = (req, res) => {
    const input = [
    req.body.familyNo,
    req.body.name,
    req.body.relationShip,
    req.body.gender,
    req.body.age,
    req.body.native,
    req.body.mosal,
    req.body.address,
    req.body.city,
    req.body.state,
    req.body.occupation,
    req.body.phone,
    req.body.email,
    req.body.status];
  
  const query = 'INSERT INTO members (Family_No, Name, relationShip, gender, age, native, mosal, address, city, state, occupation, phone, email, USA_Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(query, input, (err, result) => {
    if (err) throw err;
    else {
      console.log(result);
      req.session.message = {
        type: 'success',
        title: 'Family Added.',
        message: `Family Successfully added to the database.`,
      };
      res.redirect('back');
    }
  });
};