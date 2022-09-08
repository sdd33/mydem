import {  makeAutoObservable } from 'mobx';
const THREE:any = require('three');
import rgbHex from 'rgb-hex';
import { Color, PointLight } from 'three';

let scene = new THREE.Scene();
let p_light = new PointLight(new Color(1, 1, 1), 1);

class RenderstateStore {
  color = new Color(1, 1, 1);

  constructor() {
    makeAutoObservable(this)
    // scene.add(p_light)
    // let renderer = new THREE.WebGLRenderer();
    // // renderer.setSize(1024, 1024);
    // let camera = new THREE.PerspectiveCamera(50, 1, 0.1, 20000);
    // camera.position.set(0, 50, 250);
    // camera.lookAt(scene.position);
    // document.body.appendChild(renderer.domElement);
    // let animate = ()=> {
    //   renderer.render(scene, camera);
    //   requestAnimationFrame(animate);
    // };
    // animate();
    // this.setColor(this.color);
  }

  setColor (color:Color){
    this.color = color;
    p_light.color.set(color.r);
  }

}

export default RenderstateStore;
