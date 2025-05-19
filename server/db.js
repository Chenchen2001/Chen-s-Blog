const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: '<Your Database Host>',
  user: '<Your Database Username>',
  password: '<Your Database Password>',
  database: 'blog_system'
});
module.exports = connection;
