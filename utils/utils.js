var jwt = require('jsonwebtoken');
const userModel = require('../app/api/models/users');

module.exports = {
  validateUser: (req, res, next) => {
    jwt.verify(req.headers['x-access-token'], req.app.get('secret'), function (err, decoded) {
      if (err) {
        res.json({ status: 'error', message: err.message, data: null });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  },

  isAdmin: (req, res, next) => {
    userModel.findOne({ _id: req.body.userId }, function (err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (userInfo.is_admin_user) {
          next();
        } else {
          res.json({ status: 'error', message: 'Incorrect email and password combination', data: null });
        }
      }
    });
  },
};
