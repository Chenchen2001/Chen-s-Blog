const db = require('../db');

exports.getCategories = (req, res) => {
  db.query('SELECT * FROM categories ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).send('查询失败');
    res.send(results);
  });
};

exports.createCategory = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).send('分类名不能为空');

  db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, result) => {
    if (err) return res.status(500).send('新增失败');
    res.send({ success: true, id: result.insertId });
  });
};

exports.updateCategory = (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (err, result) => {
    if (err) return res.status(500).send('更新失败');
    res.send({ success: true });
  });
};

exports.deleteCategory = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM categories WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send('删除失败');
    res.send({ success: true });
  });
};
