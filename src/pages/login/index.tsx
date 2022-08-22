import React, { createContext,useState } from 'react'
import {Form, Input, Checkbox, Button, message} from 'antd';
import logo from '@/assets/logo.png';
import './index.less';
import {useStore} from "@/pages/store";
import { history } from 'umi';
import { observer } from 'mobx-react-lite'



function login() {
  // @ts-ignore
  const {loginStore} = useStore();
  // @ts-ignore
  const {loginstateStore} = useStore();

  const [state,setstate] = useState({
    issucess: false,
    username: ''
  })

  async function onFinish(values :any) {
    try {
      await loginStore.settoken({
        mobile: values.username,
        code: values.password
      }).then((res) => {
        console.log(res)
        if (res.code === 0) {
          loginstateStore.login();
          message.success('登陆成功');
          history.push('/layout');
        } else {
          message.success('登陆失败 密码错误');
        }
      })
    } catch (e) {
      console.log(e)
      message.success('登陆失败 未知错误'+e);
    }
  }

  const regist = ()=>{
    console.log("注册")
    history.push('/regist');
  }

  return (
      <div className ='login'>
      <img className ='login-logo' src={logo} alt=''/>

      <div className = 'login-container'>
        <Form initialValues={{ remember: true, }} onFinish={onFinish}>

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '账号不能为空!',
              },
            ]}
          >
            <Input size="large" placeholder="账号"/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '密码不能为空!',
              },
            ]}
          >
            <Input.Password size="large" placeholder="密码"/>
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住密码</Checkbox>
            <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" size="large" htmlType="submit" block>登陆</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large" onClick={regist} block>注册</Button>
          </Form.Item>

        </Form>
        </div>
      </div>
  )
}

export default observer(login)






