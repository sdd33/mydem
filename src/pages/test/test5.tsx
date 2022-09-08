import { useEffect, useRef, useState } from "react";
// @ts-ignore
import * as THREE from "three";
import {useStore} from '@/pages/store';




const Test5 = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    var typeAPI = {
      MeshLambertMaterial: THREE.MeshLambertMaterial,
      MeshBasicMaterial: THREE.MeshBasicMaterial,
      MeshPhongMaterial: THREE.MeshPhongMaterial,
      PointsMaterial: THREE.PointsMaterial,
    }
    let loader = new THREE.FileLoader();

    let scene = new THREE.Scene();
    let geometry = new THREE.BoxGeometry(100, 100, 100);
    let material = new THREE.MeshLambertMaterial({ color: 'red' });
    let mesh = new THREE.Mesh(geometry, material);
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
    camera.position.set(200, 300, 200);
    camera.lookAt(scene.position);

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0xb9d3ff, 1);
    document.body.appendChild(renderer.domElement);

    renderer.render(scene, camera);


    // @ts-ignore
    mountRef.current.appendChild( renderer.domElement );
    // return () => mountRef.current.removeChild( renderer.domElement);
  }, );

  return (
    <div>
      <div ref={mountRef} id="myDiv">
      </div>
    </div>
  );
}

export default Test5;
