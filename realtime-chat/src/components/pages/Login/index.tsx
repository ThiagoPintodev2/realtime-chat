import baseUrl from '../../../../backend/services/api'

import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input } from 'antd';
import { Link } from 'react-router';

import './index.less'

type LoginBody = {
  email: string,
  password: string
}

function Login() {

  const onFinish = async (values: LoginBody) => {
    console.log(values)
    try {
      const loginUser = await baseUrl.post('/login', {
          email: values.email,
          password: values.password
      })
    }catch(error) {
      console.log(error + 'Falha ao Logar!')
    }
  };
  return (
    <div className='container-login'>
      <h1 className='container-login__title'>Faça o login para entrar na sala de bate papo</h1>
      <Form
        name="login"
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Flex justify="center" align="center">
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          ou <Link to="/create-user">Registrar agora!</Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login