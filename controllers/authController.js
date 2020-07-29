const db = require('../bin/db_connection.js');

exports.userAuthForm = (req, res) => {
  res.render('authenticate', {
    title: 'Authentication',
    css: 'authenticate',
  });
};

exports.userAuth = (req, res) => {
  const email = req.body.email;
  let phone = req.body.phone;

  if (!email && !phone) {
    req.session.message = {
      type: 'error',
      title: 'Need Inputs',
      message: 'Please enter an Email Id or a Phone Number.',
    };
    res.redirect('back');
  } else {
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
        if (!results[0]) {
          req.session.message = {
            type: 'error',
            title: 'Wrong Inputs',
            message: `Please enter correct information.`,
          };
          res.redirect('back');
        }
        else {
          res.redirect('/member');
        }
      }
    });
  }
};