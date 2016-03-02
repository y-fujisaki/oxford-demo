/**
 * 初期表示用処理
 */

// require定義
var express = require('express');
var router = express.Router();

/**
 * 初期表示処理
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
