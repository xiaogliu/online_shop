const mysql = require('mysql2');

exports.getConnection = function() {
  const connection = mysql.createConnection({
    host: 'localhost',
    database: 'your database',
    user: 'username',
    password: 'password',
  });
  connection.connect();
  return connection;
};
