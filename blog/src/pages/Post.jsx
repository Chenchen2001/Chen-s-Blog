import { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { getPosts, deletePost } from '../api/post';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../api/category';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [category, setCategories] = useState([])
  const navigate = useNavigate();

  const loadPosts = async () => {
    const res = await getPosts();
    setPosts(res.data);
  };

  const loadCategory = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  const onDelete = async (id) => {
    await deletePost(id);
    message.success('文章已删除');
    loadPosts();
  };

  useEffect(() => {
    loadPosts();
    loadCategory();
  }, []);

  const columns = [
    { title: '标题', dataIndex: 'title' },
    { title: '分类', dataIndex: 'category_name' , render: (_, record) => {
      const cat = category.find(e => e.id === record.category_id);
      return cat ? cat.name : '加载中...';
    }},
    { title: '创建时间', dataIndex: 'created_at'},
    {
      title: '操作',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => navigate(`/admin/posts/edit/${record.id}`)}>编辑</Button>
          <Popconfirm title="确定删除吗？" onConfirm={() => onDelete(record.id)}>
            <Button type="link" danger>删除</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => navigate('/admin/posts/new')} style={{ marginBottom: 16 }}>
        新增文章
      </Button>
      <Table rowKey="id" columns={columns} dataSource={posts} />
    </div>
  );
}