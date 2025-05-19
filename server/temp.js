// 使用 Node.js 脚本一次性插入用户
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '011119', // 修改为你的密码
  database: 'blog_system',
});

connection.connect();

const username = 'admin';
const password = '123456';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  connection.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hash],
    (err, result) => {
      if (err) throw err;
      console.log('管理员账号已插入');
      connection.end();
    }
  );
});
