const Sensex = require("../models/sensex");

exports.getAllStockes = (req, res) => {
  const page = req.params.page;
  Sensex.find()
    .sort({ date: -1 })
    .select("open close date -_id")
    .skip((page - 1) * 3)
    .limit(3)
    .then((data) => {
      res.send(data);
    })
    .catch(err => console.error(err));
};

exports.addStock = (req, res) => {
  const data = new Sensex({
    open: req.body.open,
    close: req.body.close
  });
  data.save()
    .then((result) => {
      res.send("Data Added Successfully");
    })
    .catch(err => console.error(err));
};
