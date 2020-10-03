var jwt = require('jsonwebtoken');
const userModel = require('../app/api/models/users');

module.exports = {
  validateUser: (req, res, next) => {
    jwt.verify(req.headers['x-access-token'], req.app.get('secret'), function (err, decoded) {
      if (err) {
        res.status(500).json({ status: 'error', error: err.message, data: null });
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
          res.status(500).json({ status: 'error', message: "You're not an admin use", data: null });
        }
      }
    });
  },
};
