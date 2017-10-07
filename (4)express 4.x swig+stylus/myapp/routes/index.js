var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '标题' });
});
/*
router.get('/', function(req, res) {
  res.render('index', { title: '标题' });
});*/
module.exports = router;
