const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryCtrl');

router.get('/', getCategories);              // 获取分类列表
router.post('/', auth, createCategory);      // 新增分类
router.put('/:id', auth, updateCategory);    // 编辑分类
router.delete('/:id', auth, deleteCategory); // 删除分类

module.exports = router;
