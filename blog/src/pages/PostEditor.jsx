/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message, Card } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import { createPost, updatePost, getPostById } from '../api/post';
import { getCategories } from '../api/category';

const mdParser = new MarkdownIt();

export default function PostEditor() {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  const loadPost = async () => {
    if (id) {
      const res = await getPostById(id);
      form.setFieldsValue(res.data);
      setContent(res.data.content);
    }
  };

  useEffect(() => {
    loadCategories();
    loadPost();
  }, []);

  const onFinish = async (values) => {
    const data = { ...values, content };
    if (id) {
      await updatePost(id, data);
      message.success('文章已更新');
    } else {
      await createPost(data);
      message.success('文章已创建');
    }
    navigate('/admin/posts');
  };

  return (
    <Card title={id ? '编辑文章' : '新增文章'}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="category_id" label="分类" rules={[{ required: true }]}>
          <Select options={categories.map(cat => ({ value: cat.id, label: cat.name }))} />
        </Form.Item>
        <Form.Item label="内容">
          <MdEditor
            style={{ height: '400px' }}
            value={content}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ text }) => setContent(text)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
