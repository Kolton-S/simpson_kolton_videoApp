var mysql = require('mysql');
var config = require('../config');

var connect = mysql.createConnection({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database,
  multipleStatements: true
});

module.exports = connect;
