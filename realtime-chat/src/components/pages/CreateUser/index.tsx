import { Button, Form, Input, Alert, Typography } from 'antd';

import './index.less'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

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

const onFinish = (values: any) => {
  console.log(values);
};


function CreateUser() {
  const [form] = Form.useForm();

  const onFinish = (value: object) => {
    console.log(value);
  };

  return (
    <div className='container-create-user'>
      <h1 className='container-create-user__title'>Crie a Sua Conta</h1>
      <Form
        form={form}
        name="nest-messages"
        onFinish={onFinish}
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
    </div>
  );
}

export default CreateUser;