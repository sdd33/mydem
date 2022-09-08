import { useEffect, useRef, useState } from "react";
const THREE:any = require('three');
import { Layout } from 'antd';
// @ts-ignore
import { SketchPicker } from 'react-color'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import rgbHex from 'rgb-hex';
const { Header, Footer, Sider, Content } = Layout;

const Modolview = () => {
  const mountRef = useRef(null);

  const [color,setcolor] = useState('#fff')
  console.log(color);
  const handleChangeComplete = (color:any) => {
    setcolor(color.hex);
  };


  useEffect(() => {
    let scene = new THREE.Scene();
    let objloader = new OBJLoader();
    objloader.load('http://localhost:3000/model/nanosuit.obj',function (obj:any) {
      obj.scale.set(10,10,10);
      obj.position.set(0, -100, 0);
      scene.add(obj);
    })

    let point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300);
    scene.add(point);
    let ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);

    let width = window.innerWidth;
    let height = window.innerHeight;
    let k = width / height;
    let s = 200;
    let camera = new THREE.PerspectiveCamera(50, 1, 0.1, 20000);
    camera.position.set(0, 50, 250);
    camera.lookAt(scene.position);
    // @ts-ignore
    // window.scene = scene;
    // @ts-ignore
    // window.camera = camera;
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    let animate = ()=> {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
    //@ts-ignore
    // window.renderer = renderer;
    // @ts-ignore
    mountRef.current.appendChild( renderer.domElement );
  }, []);

  return (
    <div>
      <Layout>
        <Sider style={{background: '#fff'}} width={270}>
          <SketchPicker color={color}
                        width={250}
                        // onChange={handleChangeComplete}
                        onChange={(e:any)=>{setcolor("#" + rgbHex(e.rgb.r, e.rgb.g, e.rgb.b, e.rgb.a))}}
          />
        </Sider>
        <Content>
          <div ref={mountRef} id="myDiv"/>
        </Content>
      </Layout>
    </div>
  );
}

export default Modolview;
