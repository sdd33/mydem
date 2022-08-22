import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Avatar } from 'antd';
import React from 'react';
import './index.less';
const { Header, Content, Footer, Sider } = Layout;

const items1 = ['商城', '我的' ].map((key,i) => ({
  key: i+1,
  label: `${key}`,
}));

const miancontent = ['用户信息','退出/注销'];
const subcontent2 = [['信息查询','信息修改'],['退出登陆','注销账号']];

const items2 = [UserOutlined, LaptopOutlined].
map((icon,
  index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `${miancontent[index]}`,
    children: subcontent2[index].map((subtext, j) => {
      const subKey = index * 2 + j + 1;
      return {
        key: subKey,
        label: `${subtext}`,
      };
    }),
  };
});

function button1(key: string){
  console.log(key);
}

function button2(item: string){
  console.log(item);
}

const App = () => (
  <Layout>

    <Header className="header">
      <Layout>
        <Sider>
          <Avatar size={40}>USER</Avatar>
        </Sider>
        <Content>
          <Menu theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={items1}
                onClick={(e) =>button1(e.key)}/>
        </Content>
      </Layout>
    </Header>

    <Content style={{ padding: '0 50px', }}>
      <Breadcrumb style={{ margin: '16px 0', }}>
      </Breadcrumb>

      <Layout className="site-layout-background" style={{ padding: '24px 0', }}>
        <Sider className="site-layout-background" width={200}>
          <Menu mode="inline" defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', }}
                items={items2}
                onClick={(e) =>button2(e.key)}/>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280, }}>
          Content
        </Content>
      </Layout>

    </Content>
    <Footer style={{ textAlign: 'center', }}>
    </Footer>
  </Layout>
);

export default App;
