const mysql = require('mysql2');

exports.getConnection = function() {
  const connection = mysql.createConnection({
    host: 'localhost',
    database: 'safety',
    user: 'root',
    password: 'ZAQ1xsw2',
  });
  connection.connect();
  return connection;
};
