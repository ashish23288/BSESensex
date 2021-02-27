const Sensex = require("../models/sensex");

exports.getAllStockes = async (req, res) => {
  const pageNo = +req.params.pageNo;
  if (pageNo < 0 || pageNo === 0 || isNaN(pageNo)) {
    return res.json({ "error": true, "message": "invalid page number, should start with 1" });
  }
  const size = 3;
  let totalCount = 0;
  await Sensex.count().then((count) => {
    totalCount = count;
  });
  await Sensex.find()
    .sort({ date: -1 })
    .select("open close date -_id")
    .skip(size * (pageNo - 1))
    .limit(size)
    .then((data) => {
      res.json({
        "totalItems": totalCount,
        "records": data,
        "totalPages": Math.ceil(totalCount / size),
        "currentPage": pageNo
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({ "error": true, "message": "Error fetching data" });
    });
};

exports.addStock = (req, res) => {
  const data = new Sensex({
    open: req.body.open,
    close: req.body.close
  });
  data.save()
    .then((result) => {
      res.send({ "error": false, "message": "Data Added Successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.json({ "error": true, "message": "Error Saving data" });
    });
};
