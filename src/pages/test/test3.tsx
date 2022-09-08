import { Col, Row, Slider, Button, Radio, Tooltip, Space } from 'antd';
import React, { useState } from 'react';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useStore } from '@/pages/store';
import { observer } from 'mobx-react-lite';



const Commodity = () => {
  const { modelliststore } = useStore();
  const colCount = 3;


  const view = (key:any)=>{
    console.log(key);
  }
  const download = (key:any)=>{
    console.log(key);
  }

  return (
      <Row gutter={[16, 16]} >
        {modelliststore.list.map((item: {ID: any, name: any })=>(
          <Col key={item.ID.toString()} span={24 / colCount}>
            <div>{item.name}</div>
            <img src={'http://localhost:3000/image/'+item.ID+'.jpg'} width="300" height="180"/>
            <Radio.Group >
              <Space size={10}>
                <Button  type="primary" shape="circle" icon={<SearchOutlined />}
                         onClick={()=>view(item.ID)} size='small' />
                <Button  type="primary" shape="circle" icon={<DownloadOutlined />}
                         onClick={()=>download(item.ID)} size='small' />
              </Space>
            </Radio.Group>
          </Col>
        ))}
      </Row>
  );
};

export default observer(Commodity);
