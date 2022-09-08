import { useEffect, useRef, useState } from "react";
const THREE:any = require('three');
import { Layout } from 'antd';
// @ts-ignore
import { SketchPicker } from 'react-color'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
const { Header, Footer, Sider, Content } = Layout;
import rgbHex from "rgb-hex";
import { observer } from 'mobx-react-lite'
import {useStore} from '@/pages/store';
import { Color } from 'three';


const Modolview = () => {
  const mountRef = useRef(null);
  const {renderstatestore} = useStore();
  const handleChangeComplete = (color:any)=>{
    renderstatestore.setColor(color);
  };
  useEffect(() => {
    let scene = new THREE.Scene();
    let objloader = new OBJLoader();
    objloader.load('http://localhost:3000/model/nanosuit.obj',function (obj:any) {
      obj.scale.set(10,10,10);
      obj.position.set(0, -100, 0);
      scene.add(obj);
    })

    let width = window.innerWidth;
    let height = window.innerHeight;
    let k = width / height;
    let s = 200;
    let camera = new THREE.PerspectiveCamera(50, 1, 0.1, 20000);
    camera.position.set(0, 50, 250);
    camera.lookAt(scene.position);

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    let animate = ()=> {
      // scene.add(renderstatestore.point);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
    // @ts-ignore
    mountRef.current.appendChild( renderer.domElement );
  }, []);

  return (
    <div>
      <Layout>
        <Sider style={{background: '#fff'}} width={270}>
          <SketchPicker color={'#fff'}
                        width={250}
                        onChange={(e:any)=>{handleChangeComplete(new Color(e.rgb.r/255,e.rgb.g/255,e.rgb.b/255))}}
          />
        </Sider>
        <Content>
          <div ref={mountRef} id="myDiv"/>
        </Content>
      </Layout>
    </div>
  );
}

export default observer(Modolview);
