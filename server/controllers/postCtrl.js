const db = require('../db');

exports.getAllPosts = (req, res) => {
  const { category_id } = req.query;
  let sql = `SELECT id, title, category_id, created_at FROM posts`;
  
  const params = [];
  if (category_id) {
    sql += ` WHERE category_id = ?`;
    params.push(category_id);
  }
  
  sql += ` ORDER BY created_at DESC`;
  
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ message: '查询文章失败', error: err });
    res.json({ data: results });
  });
};

exports.getPostById = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM posts WHERE id = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: '查询失败', error: err });
    if (results.length === 0) return res.status(404).json({ message: '文章不存在' });
    res.json(results[0]);
  });
};

exports.createPost = (req, res) => {
  const { title, content, category_id } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: '标题和内容不能为空' });
  }

  const sql = `INSERT INTO posts (title, content, category_id, created_at) VALUES (?, ?, ?, NOW())`;
  db.query(sql, [title, content, category_id || null], (err, result) => {
    if (err) return res.status(500).json({ message: '新增失败', error: err });
    res.json({ message: '新增成功', id: result.insertId });
  });
};

exports.updatePost = (req, res) => {
  const { id } = req.params;
  const { title, content, category_id } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: '标题和内容不能为空' });
  }

  const sql = `UPDATE posts SET title = ?, content = ?, category_id = ?, created_at = NOW() WHERE id = ?`;
  db.query(sql, [title, content, category_id, id], (err, result) => {
    if (err) return res.status(500).json({ message: '更新失败', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: '文章不存在' });
    res.json({ message: '更新成功' });
  });
};

exports.deletePost = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM posts WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: '删除失败', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: '文章不存在' });
    res.json({ message: '删除成功' });
  });
};
