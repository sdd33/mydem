import { Col, Row, Slider, Button, Radio, Tooltip, Space } from 'antd';
import React, { useState } from 'react';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import {useStore} from '@/pages/store';

const App = () => {
  // @ts-ignore
  const { modelliststore } = useStore();
  const cols1 = [];
  const colCount = 3;
  let colCode = '';

  for (let i = 0; i < modelliststore.list.length; i++) {
    cols1.push(
      <Col key={i.toString()} span={24 / colCount}>
        <div>Column</div>
        <Radio.Group >
          <Space size={10}>
          <Button  type="primary" shape="circle" icon={<SearchOutlined />}
                  onClick={()=>view(i)} size='small' />
          <Button  type="primary" shape="circle" icon={<DownloadOutlined />}
                  onClick={()=>download(i)} size='small' />
          </Space>
        </Radio.Group>
      </Col>,
    );
    colCode += `  <Col span={${24 / colCount}} />\n`;
  }

  const view = (key:any)=>{
    console.log(key);
  }
  const download = (key:any)=>{
    console.log(key);
  }

  return (
    <div>
      <Row gutter={[16, 16]} >
        {modelliststore.list.map(item=>(
          <Col key={item.id.toString()} span={24 / colCount}>
            <div>Column</div>
            <Radio.Group >
              <Space size={10}>
                <Button  type="primary" shape="circle" icon={<SearchOutlined />}
                         onClick={()=>view(item.id)} size='small' />
                <Button  type="primary" shape="circle" icon={<DownloadOutlined />}
                         onClick={()=>download(item.id)} size='small' />
              </Space>
            </Radio.Group>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default App;
