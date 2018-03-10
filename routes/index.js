var express = require('express');
var router = express.Router();
var config = require('../config');
var connect = require('../utils/sqlConnect');

// do some checking here => check the default user profile
// ternary statement => MDN ternary
var toRender = (config.kidsmode) ? 'main_kids' : 'home';

/* GET home page. */
router.get('/', function(req, res, next) {
  connect.query('SELECT * FROM tbl_user', (err, result) => {
    if (err) {
      throw err; console.log(err);
    } else {
      console.log(result);

      res.render(toRender, {
        title: 'Flashback',
        mainpage : true,
        cms : false,
        userData : result,
        kidsmode : config.kidsmode
      });
    }
  });
});

router.get('/cms', (req, res) => {
  res.render('cmsform', {
    cms : true,
    mainpage : false
  });
});

module.exports = router;
