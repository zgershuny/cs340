var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_gershunz',
  password        : '7737',
  database        : 'cs340_gershunz'
});
module.exports.pool = pool;
