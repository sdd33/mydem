import { useEffect, useRef, useState } from "react";
// @ts-ignore
import * as THREE from "three";
import {useStore} from '@/pages/store';
import { useHistory,useParams } from 'react-router-dom';
import axios from 'axios';



const Modolview = (props:any) => {
  const {upimagestore} = useStore();
  const mountRef = useRef(null);
  const [col,setcolor] = useState(true);

  const params = useParams();
  console.log(params.id);


  const transcolor = ()=>{
    console.log(col);
    setcolor(!col);
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

  useEffect(() => {
    let scene = new THREE.Scene();
    let geometry = new THREE.BoxGeometry(100, 100, 100);
    console.log(col);
    let material = new THREE.MeshLambertMaterial({ color: col? 'red':'green' });
    let mesh = new THREE.Mesh(geometry,material);
    console.log(mesh);
    scene.add(mesh);
    let point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300);
    scene.add(point);
    let ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let k = width / height;
    let s = 200;
    let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 100, 200);
    camera.lookAt(scene.position);

    let renderer = new THREE.WebGLRenderer({
      // @ts-ignore
      canvas: mountRef.current
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0xb9d3ff, 1);

    let animate = function () {
      requestAnimationFrame( animate );
      mesh.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();

  }, []);

  return (

    <div>
      <button onClick={transcolor}>切换颜色</button>
      <button onClick={getpicture}>获取当前渲染图片</button>
      <canvas  ref={mountRef}>
      </canvas>
    </div>
  );
}

export default Modolview;
