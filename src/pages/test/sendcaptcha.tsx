import { useEffect, useRef, useState } from "react";
// @ts-ignore
import * as THREE from "three";

const App = () => {

  const mountRef = useRef(null);
  const [col,setcolor] = useState(true)

  const transcolor = ()=>{
    console.log(col);
    setcolor(!col);
  }

  useEffect(() => {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();

    renderer.setSize( window.innerWidth, window.innerHeight );

    // @ts-ignore
    mountRef.current.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: col? "blue" : "red" });
    var cube = new THREE.Mesh( geometry, material );

    scene.add( cube );
    camera.position.z = 5;

    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
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

export default App;

