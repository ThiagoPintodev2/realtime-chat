import { Link } from 'react-router';
import axios from 'axios';
import baseUrl from '../../../../backend/services/api'
import { Button, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import './index.less'

const validateMessages = {
  required: 'Campo ${label} obrigatório!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

type RegisterForm = {
  user: {
    name: string;
    email: string;
  };
  password: string;
  password2: string;
}

function CreateUser() {
  const [form] = Form.useForm();

  const createNewUser = async (value: RegisterForm) => {
    try {
      const response = await baseUrl.post('/create-user', {
        name: value.user.name,
        email: value.user.email,
        password: value.password
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='container-create-user'>
      <h1 className='container-create-user__title'>Crie a Sua Conta</h1>
      <Form
        form={form}
        name="nest-messages"
        onFinish={createNewUser}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
        layout='vertical'
      >
        <Form.Item name={['user', 'name']} label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Senha" name="password" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        {/* Field */}
        <Form.Item
          label="Confirmar Senha"
          name="password2"
          dependencies={['password']}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('As Senhas Digitadas não são iguais!'));
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
      <Link className='link' to='/'><ArrowLeftOutlined />&nbsp;Voltar</Link>
    </div>
  );
}

export default CreateUser;