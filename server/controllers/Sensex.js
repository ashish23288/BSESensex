const Sensex = require('../models/sensex');
const moment = require('moment');

exports.getAllStockes = (req, res) => {
  const page = req.params.page;
  console.log('page', page);
  Sensex.find()
    .sort({ date: -1 })
    .select("open close date -_id")
    .skip((page-1)*3)
    .limit(3)
    .then((data) => {
      res.send(data);
    })
    .catch(err => console.log(err));
};

exports.addStock = (req, res) => {
  const data = new Sensex({
    open: req.body.open,
    close: req.body.close
  });
  data.save()
    .then((result) => {
      console.log(result);
      res.send('Data Added Successfully');
    })
    .catch(err => console.log(err))
}