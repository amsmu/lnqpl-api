const personModel = require('../models/person');

module.exports = {
  create: function (req, res, next) {
    personModel.create(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        address: req.body.address,
        ssn: req.body.ssn,
      },
      function (err, result) {
        if (err) next(err);
        else res.json({ status: 'success', message: 'Person details added successfully.', data: null });
      }
    );
  },

  getAll: function (req, res, next) {
    let peopleList = [];
    personModel.find({}, function (err, people) {
      if (err) {
        next(err);
      } else {
        for (let person of people) {
          peopleList.push({
            id: person._id,
            first_name: person.first_name,
            last_name: person.last_name,
            phone: person.phone,
            address: person.address,
            ssn: person.ssn,
          });
        }
        res.json({ status: 'success', message: 'People found!!!', data: { people: peopleList } });
      }
    });
  },
};
