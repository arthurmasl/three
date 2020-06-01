import * as THREE from '../three.js/build/three.module';
import { OrbitControls } from '../three.js/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from '../three.js/examples/jsm/loaders/GLTFLoader';
import { GUI } from '../three.js/examples/jsm/libs/dat.gui.module';

import clockModel from '../public/models/clock.glb';

let camera;
let scene;
let renderer;
let controls;
let light;

let clock;

const loader = new GLTFLoader();
const gui = new GUI();

const params = {
  speed: 0.1,
};

class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }

  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }

  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}

const init = () => {
  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 1;
  camera.position.y = 2;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x333333);

  scene.add(new THREE.AmbientLight(0xffffff));

  light = new THREE.DirectionalLight(0xdfebff, 1);
  light.position.set(50, 200, 100);
  light.position.multiplyScalar(1.3);
  light.castShadow = true;

  scene.add(light);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI;
  controls.minDistance = 0.1;
  controls.maxDistance = 1000;

  gui.add(params, 'speed', -1, 1);


  document.body.appendChild(renderer.domElement);
};


const animate = () => {
  requestAnimationFrame(animate);

  clock.children[3].rotation.y -= params.speed;

  renderer.render(scene, camera);
};

loader.load(clockModel, (gltf) => {
  clock = gltf.scene;

  gui.addColor(new ColorGUIHelper(clock.children[3].material, 'color'), 'value') //
    .name('arrow');
  gui.addColor(new ColorGUIHelper(clock.children[4].material, 'color'), 'value') //
    .name('inner');
  gui.addColor(new ColorGUIHelper(clock.children[6].material, 'color'), 'value') //
    .name('wrapper');


  scene.add(clock);
  animate();
});

init();
