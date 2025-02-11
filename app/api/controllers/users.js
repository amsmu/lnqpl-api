const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  create: function (req, res, next) {
    userModel.findOne({ email: req.body.email }, function (err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (userInfo != null) {
          res.status(400).json({ status: 'error', message: 'Another user with same email exists', data: null });
        } else {
          userModel.create(
            { name: req.body.name, email: req.body.email, password: req.body.password, is_admin_user: req.body.is_admin_user },
            function (err, result) {
              if (err) next(err);
              else res.json({ status: 'success', message: 'User has been added successfully', data: null });
            }
          );
        }
      }
    });
  },

  signIn: function (req, res, next) {
    userModel.findOne({ email: req.body.email }, function (err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign({ id: userInfo._id }, req.app.get('secret'), { expiresIn: '2h' });
          res.json({ status: 'success', message: 'User found', data: { user: userInfo, token: token } });
        } else {
          res.status(500).json({ status: 'error', message: 'Incorrect email and password combination', data: null });
        }
      }
    });
  },
};
