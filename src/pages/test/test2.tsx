import { useEffect, useRef, useState } from "react";
// @ts-ignore
import * as THREE from "three";

const modolview = () => {

  const mountRef = useRef(null);
  const [col,setcolor] = useState(true)
  const transcolor = ()=>{
    console.log(col);
    setcolor(!col);
  }

  useEffect(() => {

    var scene = new THREE.Scene();
    var geometry = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshLambertMaterial({ color: col? 'red':'blue' });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300);
    scene.add(point);

    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);

    var width = window.innerWidth;
    var height = window.innerHeight;
    var k = width / height;
    var s = 200;

    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200);
    camera.lookAt(scene.position);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0xb9d3ff, 1);
    document.body.appendChild(renderer.domElement);

    var animate = function () {
      requestAnimationFrame( animate );
      mesh.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
    // @ts-ignore
    mountRef.current.appendChild( renderer.domElement );
    // @ts-ignore
    return () => mountRef.current.removeChild( renderer.domElement);
  }, );

  return (
    <div>
      <button onClick={transcolor}>切换颜色</button>
      <div ref={mountRef}>
      </div>
    </div>
  );
}

export default modolview;
