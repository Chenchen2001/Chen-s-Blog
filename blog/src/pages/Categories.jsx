import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../api/category';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const onSubmit = async () => {
    const values = await form.validateFields();
    if (editingId) {
      await updateCategory(editingId, values);
      message.success('分类已更新');
    } else {
      await createCategory(values);
      message.success('分类已创建');
    }
    form.resetFields();
    setOpen(false);
    setEditingId(null);
    loadCategories();
  };

  const onEdit = (record) => {
    form.setFieldsValue({ name: record.name });
    setEditingId(record.id);
    setOpen(true);
  };

  const onDelete = async (id) => {
    await deleteCategory(id);
    message.success('分类已删除');
    loadCategories();
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 80 },
    { title: '分类名称', dataIndex: 'name' },
    {
      title: '操作',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => onEdit(record)}>编辑</Button>
          <Popconfirm title="确定删除吗？" onConfirm={() => onDelete(record.id)}>
            <Button type="link" danger>删除</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => { form.resetFields(); setOpen(true); setEditingId(null); }}>
          新增分类
        </Button>
      </div>
      <Table rowKey="id" columns={columns} dataSource={categories} />

      <Modal
        title={editingId ? '编辑分类' : '新增分类'}
        open={open}
        onOk={onSubmit}
        onCancel={() => { setOpen(false); setEditingId(null); }}
        okText="提交"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="分类名称" rules={[{ required: true, message: '请输入分类名称' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
