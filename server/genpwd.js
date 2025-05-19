const bcrypt = require('bcrypt');

username = 'username';
password = 'password';

bcrypt.hash(password, 10, (err, hash) => {
  console.log("Please execute the query below after executing the data.sql file in MySQL.")
  console.log("command can be: mysql -uusername -ppassword < data.sql")
  console.log("=======================================================")
  console.log(`INSERT INTO users (username, password) VALUES ('${username}', '${hash}')`)
  console.log("=======================================================")
});
