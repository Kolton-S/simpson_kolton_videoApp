var express = require('express');
var connect = require('../utils/sqlConnect');
var bodyParser = require('body-parser');
var router = express.Router();

// middleware goes here... it's in the middle of the process -> after the request, before the response
//
// parse the request, make sure we can convert incoming data into something Express can use
router.use(bodyParser.urlencoded({ extended : false }));
router.use(bodyParser.json());

router.use((req, res, next) => {
  var now = new Date();
  var timestamp = now.toLocaleString('en-us', {
    hour : "numeric",
    minute : "numeric",
    hour12 : true
  });

  console.log(`you made a ${req.method} call!`);
  console.log(`you made the call @ ${timestamp}`);
  //console.log(req);
  next(); // run the next method (get, put, post, etc)
});

/* GET home page. */
router.get('/:id', (req, res) => {
  console.log(req.params.id);
  console.log('hit an api route with params');

  connect.query(`SELECT * FROM mainmodel WHERE model="${req.params.id}"`, (err, result) => {
    if (err) {
      throw err; console.log(err);
    } else {
      console.log(result);

      res.json({movieData: result});
    }
  });
});

router.get('/:id', (req, res) => {
  console.log('hit the get route');
  connect.query(`SELECT * tbl_movies WHERE movies_kids="${req.params.id}"`, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.json({movieData: result});
    }
  });
});

router.post('/', (req, res) => {
  console.log(`hit the post route`);

  connect.query(`INSERT into mainmodel (id, model, modelName, pricing, modelDetails, imgPath) VALUES (NULL, "${req.body.model}", "${req.body.modelName}", "${req.body.pricing}", "${req.body.modelDetails}",  "${req.body.imgPath}");`, (err, data) => {
    if (err) {
      throw(err);
    } else {
      res.json(data);
    }
  })
});

module.exports = router;
