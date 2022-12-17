var express = require('express');
var router = express.Router();
const db = require("../data/database")

/* GET users listing. */
router.get('/', function (req, res, next) {
  const collection = db.getDb().collection("users")
  // Query stringlerini alın
  const sort = req.query.sort;
  const filter = req.query.filter;
  const limit = +req.query.limit || 0;
  const offset = +req.query.offset || 0;

  // Sorguyu oluşturun
  let query = {};
  if (filter) {
    query = { $or: [{ name: filter }, { phone: filter }, { email: filter }, { country: filter }, { currency: filter }] };
  }
  let sortCriteria = {};
  if (sort) {
    sortCriteria[sort] = 1;
  }
  // Verileri alın ve cevapla
  collection.find(query).sort(sortCriteria).skip(offset).limit(limit).toArray(function (err, docs) {
    res.send(docs);
  });
});

module.exports = router;
