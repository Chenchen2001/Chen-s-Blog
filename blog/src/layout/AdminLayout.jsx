import { useState } from 'react';
import { Layout, Menu, Dropdown, Button, message } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileTextOutlined,
  EditOutlined,
  AppstoreOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { removeToken } from '../utils/auth';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey = location.pathname.includes('categories')
    ? 'categories'
    : location.pathname.includes('new')
    ? 'posteditor'
    : 'posts';

  const handleLogout = () => {
    removeToken();
    message.success('已退出登录');
    navigate('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsed={collapsed}
        theme="dark"
        width={200}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            color: '#fff',
            textAlign: 'center',
            fontSize: 18,
            lineHeight: '32px',
          }}
        >
          {collapsed ? '📝' : 'Blog Admin'}
        </div>

        <div style={{ flex: 1 }}>
          <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
            <Menu.Item key="posts" icon={<FileTextOutlined />}>
              <Link to="/admin/posts">文章管理</Link>
            </Menu.Item>
            <Menu.Item key="posteditor" icon={<EditOutlined />}>
              <Link to="/admin/posts/new">发布文章</Link>
            </Menu.Item>
            <Menu.Item key="categories" icon={<AppstoreOutlined />}>
              <Link to="/admin/categories">类别管理</Link>
            </Menu.Item>
          </Menu>
        </div>

        <div
          style={{
            height: 48,
            lineHeight: '48px',
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <MenuUnfoldOutlined style={{ fontSize: 18, color: '#fff' }} />
          ) : (
            <MenuFoldOutlined style={{ fontSize: 18, color: '#fff' }} />
          )}
        </div>
      </Sider>

      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Dropdown overlay={userMenu} placement="bottomRight">
            <Button type="text" icon={<UserOutlined />}>
              管理员
            </Button>
          </Dropdown>
        </Header>
        <Content style={{ margin: '16px', padding: 16, background: '#fff' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;