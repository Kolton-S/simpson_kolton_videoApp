var express = require('express');
var connect = require('../utils/sqlConnect');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  connect.query('SELECT * FROM tbl_movies; SELECT * FROM tbl_movies WHERE movies_featured = "1"', (err, results) => {
    if (err) {
      throw err; console.log(err);
    } else {
      console.log(results);

      res.render('movies', {
        title: 'Flashback - Parents - Movies',
        movieData : results[0],
        featuredData : results[1]
      });
    }
  });
});

module.exports = router;
