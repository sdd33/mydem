import { Button, Form, Input, Space, Row, Col, Layout, message } from 'antd';
import React, { useState, createContext, ChangeEvent } from 'react';
import './index.less';
import {useStore} from "@/pages/store";
// import { history } from '@/core/history';
const { Header, Footer, Sider, Content } = Layout;


const layout = {
  labelCol: { span: 15 },
  wrapperCol: { offset: 3,span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 16 },
};

const Regist: React.FC = () => {
  // @ts-ignore
  const {emailstore} = useStore();
  // @ts-ignore
  const {registstore} = useStore();
  const [form] = Form.useForm();

  let [num,setNum]=useState(0);
  let [tel,setTel]=useState("");

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      await registstore.setUser({
        username: values.username,
        password: values.password,
        email: values.email,
        captcha: values.captcha
      }).then((res) => {
        if(res.code === 0){
          message.success('注册成功');
        }else if(res.code === -5){
          message.success('注册失败，验证码不正确');
        }else {
          message.success('注册失败 未知错误');
        }
      })
    } catch (e) {
      console.log(e)
      message.success('注册失败 未知错误' + e);
    }
  };

  const onChangeInput = (e:ChangeEvent<HTMLInputElement>) =>{
    setTel(e.target.value)
  }

  const handleSend=()=>{
    emailstore.requstcaptcha({email : tel});
    console.log(tel);
    let a = 10;
    setNum(a)
    const t1 = setInterval(()=>{
      a=a-1
      setNum(a)
      if(a==0){
        clearInterval(t1)
      }
    },1000)
  }

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className='login'>
    <h1>Regist</h1>
    <Form {...layout} form={form} className='regist-container' name="control-hooks" onFinish={onFinish}>
      <Form.Item name="username"
       rules={[
         { required: true, message: '账号不能为空!',},
         { pattern: /^\d{3,}$/, message: '账号格式不对，为手机号码', validateTrigger: 'onBlur'}
       ]}>
        <Input size="large" placeholder="请输入账号"/>
      </Form.Item>

      <Form.Item name="password"
       rules={[
         { required: true, message: '密码不能为空!'},
         { len: 6, message: '密码为6个字符', validateTrigger: 'onBlur'}
       ]}>
        <Input.Password size="large" placeholder="请输入密码"/>
      </Form.Item>

      <Form.Item name="confirm"
       rules={[
         { required: true, message: '请再次输入密码!'},
         { len: 6, message: '密码为6个字符', validateTrigger: 'onBlur'},
         ({ getFieldValue }) => ({
           validator(_, value) {
             if (!value || getFieldValue('password') === value) {
               return Promise.resolve();
             }
             return Promise.reject(new Error('两次密码不一致!'));
           },
         }),
       ]}>
        <Input.Password size="large" placeholder="再次输入密码"/>
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {type: 'email', message: '邮箱格式不正确!'},
          {required: true, message: 'Please input your E-mail!'}
        ]}
      >
        <Input value={tel} size="large" placeholder="请输入邮箱" onChange={onChangeInput}/>
      </Form.Item>

      <Form.Item>
        <Row gutter={8}>
          <Col span={12} >
            <Form.Item
              name="captcha"
              noStyle
              rules={[{ required: true, message: '必须输入验证码!' }]}
            >
              <Input placeholder="请输入验证码"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button disabled={num!==0 || !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(tel)}
                    onClick={handleSend}>{num==0?'发送验证码':"等待"+num+"秒"}</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space size={70}>
          <Button type="primary" htmlType="submit" className="butt">
            注册
          </Button>
          <Button htmlType="button" onClick={onReset} className="butt">
            重置
          </Button>
        </Space>
      </Form.Item>

    </Form>
    </div>
  );
};

export default Regist;
