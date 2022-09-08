import { useEffect, useRef, useState } from "react";
const THREE:any = require('three');
import { Layout } from 'antd';
// @ts-ignore
import { SketchPicker } from 'react-color'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import rgbHex from 'rgb-hex';
const { Header, Footer, Sider, Content } = Layout;
import {useStore} from '@/pages/store';

let scene = new THREE.Scene();
let objloader = new OBJLoader();
objloader.load('http://localhost:3000/model/nanosuit.obj',function (obj:any) {
  obj.scale.set(10,10,10);
  obj.position.set(0, -100, 0);
  // obj.children[0].material.color.setHex(props.msg.ambitioncolor);
  scene.add(obj);
})
console.log("create scene...")
let point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300);
scene.add(point);
let ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

let width = window.innerWidth;
let height = window.innerHeight;
let camera = new THREE.PerspectiveCamera(50, 1, 0.1, 20000);
camera.position.set(0, 50, 250);
camera.lookAt(scene.position);

const Modolview = () => {
  const {upimagestore} = useStore();
  const mountRef = useRef(null);
  const [lightcolor,setcolor] = useState('#fff')
  const changecolor = (e:any)=>{
    let hexcolor="#" + rgbHex(e.rgb.r, e.rgb.g, e.rgb.b, e.rgb.a)
    setcolor(hexcolor);
    scene.children[0].color.setRGB(e.rgb.r/255,e.rgb.g/255,e.rgb.b/255);
  };
  const showCanvas = ()=>{
    console.log(scene);
    console.log(mountRef.current);
  }
  const getpicture = () => {
    const canvas:any = document.querySelectorAll("#myDiv canvas")[0];
    console.log(canvas);
    canvas.toBlob((bob:any) => {
      console.log(bob);
      const formData = new FormData();
      formData.append('img',bob);
      upimagestore.sendimage(formData).then((res)=>{
        console.log(res);
      })
    });
  }

useEffect(()=>{
  let renderer = new THREE.WebGLRenderer({
    canvas: mountRef.current
  });
  console.log("开始渲染");
  renderer.setClearColor(0xb9d3ff, 1);
  let animate = function () {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  };
  animate();
},[])

  return (
    <div>
      {/*<button onClick={getpicture}>发送</button>*/}
      <Layout>
        <Sider style={{background: 'blue'}} width={270}>
          <h1>光照调节</h1>
          <SketchPicker color={lightcolor}
                        width={250}
                        onChange={(e:any)=>{changecolor(e)}}
          />
        </Sider>
        <Content>
          <canvas width={width-270} height={height}   ref={mountRef}>
          </canvas>
        </Content>
      </Layout>
    </div>
  );
}

export default Modolview;
