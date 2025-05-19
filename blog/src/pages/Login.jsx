import { Form, Input, Button, Card, message } from 'antd';
import { login } from '../api/auth';
import { setToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = async (values) => {
    try {
      const res = await login(values);
      setToken(res.data.token);
      message.success('登录成功');
      navigate('/admin/categories');
    } catch (err) {
      messageApi.error('登录失败：用户名或密码错误');
      console.log("err in login, ",err)
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {contextHolder}
      <Card title="管理员登录" style={{ width: 350 }}>
        <Form onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
