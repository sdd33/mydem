import React from 'react'
import {Form, Input, Checkbox, Button, message} from 'antd';
import './index.less';
import {useStore} from "@/pages/store";
import { history } from 'umi';
import { observer } from 'mobx-react-lite'
import axios from 'axios';
import {getToken} from '@/pages/utils'
import { values } from 'mobx';

let token = getToken() || '';

const comlist = axios({
  method:'get',
  url:'http://localhost:3000/login/get',
  headers: {
    "my_token": token
  }
})

function login() {
  // @ts-ignore
  const {loginStore} = useStore();
  // @ts-ignore
  const {loginstateStore} = useStore();

  comlist.then((res)=>{
    console.log(res.data);
    if (res.data.code === 0 && getToken()!=='null') {
      loginstateStore.login();
      message.success('登陆成功');
      history.push('/layout/'+getToken());
    } else {
      message.error('token已失效，请重新登陆');
    }

  })

  async function onFinish(values :any) {
    try {
      await loginStore.settoken({
        mobile: values.username,
        code: values.password
      }).then((res) => {
        console.log(res)
        if (res.code === 0  && getToken()!=='null') {
          loginstateStore.login();
          message.success('登陆成功');
          history.push('/layout/'+getToken());
        } else {
          message.error('登陆失败 密码错误');

        }
      })
    } catch (e) {
      console.log(e)
      message.error('登陆失败 未知错误'+e);
    }
  }

  const regist = ()=>{
    console.log("注册")
    history.push('/regist');
  }

  return (
      <div className ='login'>
      <h1>3D Library</h1>
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






