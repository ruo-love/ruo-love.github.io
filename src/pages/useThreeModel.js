import * as THREE from "three";
import { ref, watch } from "vue";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import TWEEN, { Tween } from "@tweenjs/tween.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
function useThreeModel() {
  let scene = null;
  let camera = null;
  let renderer = null;
  let controls = null;
  let spotLight = null;
  let floorMesh = null;
  let mixer = null;
  let action = ref(null);
  let hasPlayedOnce = false;
  const clock = new THREE.Clock();
  function initScene() {
    // 创建场景
    const _scene = new THREE.Scene();
    // _scene.fog = new THREE.FogExp2(0xffffff, 0.05); // 设置场景雾效
    // 启用场景的阴影
    _scene.receiveShadow = true;
    return _scene;
  }
  function initCamera(sceneRef) {
    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      sceneRef.clientWidth / sceneRef.clientHeight,
      0.1,
      1000
    );

    camera.position.z = 5;
    camera.position.y = 4;
    return camera;
  }
  function initOrbitControls(camera, renderer) {
    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    // controls.enableZoom = false;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 6.5;
    controls.maxDistance = 20;
    // controls.minAzimuthAngle = -Math.PI / 10;
    // controls.maxAzimuthAngle = Math.PI / 10;
    // controls.minPolarAngle = Math.PI / 2.25;
    // controls.maxPolarAngle = Math.PI / 1.98;
    // 启用阻尼效果
    controls.enableDamping = true; // 启用阻尼效果
    controls.dampingFactor = 0.5; // 阻尼系数，调整阻尼效果的强度
    return controls;
  }
  function initRenderer(sceneRef) {
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setSize(sceneRef.clientWidth, sceneRef.clientHeight);
    while (sceneRef.firstChild) {
      sceneRef.removeChild(sceneRef.firstChild);
    }
    sceneRef.innerHTML = "";
    sceneRef.appendChild(renderer.domElement);
    return renderer;
  }

  function initFloor(isDark) {
    // 创建地板的几何体
    const floorGeometry = new THREE.CircleGeometry(10, 20); // 设置地板的大小
    // 创建地板的材质
    const floorMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
    }); // 设置地板的颜色

    // 创建地板的网格对象
    floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2; // 将圆形水平放置
    // 设置地板的位置
    floorMesh.position.set(0, -0.1, 0); // 根据需要调整位置
    // 开启地板的阴影接收
    floorMesh.receiveShadow = true;
    floorMesh.castShadow = true;
    const reflector = new Reflector(floorGeometry, {
      textureWidth: sceneRef.clientWidth * window.devicePixelRatio,
      textureHeight: sceneRef.clientHeight * window.devicePixelRatio,
      color: 0xffffff,
      recursion: 1,
    });
    reflector.rotation.x = -Math.PI / 2;
    scene.add(reflector);
    // 将地板添加到场景中
    scene.add(floorMesh);

    return floorMesh;
  }

  function addAModel() {
    // add glb model
    return new Promise((resolve, reject) => {
      const gltfLoader = new GLTFLoader();
      // 实例化加较器draco
      const dracoloader = new DRACOLoader();
      dracoloader.setDecoderPath("/draco/");
      gltfLoader.setDRACOLoader(dracoloader);
      // 加载 glTF 模型
      gltfLoader.load(
        "/model-1.glb",
        (gltf) => {
          // 获取模型
          const model = gltf.scene;
          model.rotation.y = -Math.PI / 2;
          model.traverse((node) => {
            if (node.isMesh && node.name === "chair") {
              node.material = node.material.clone();
              node.material.color.set(0xf9ab2ce);
              console.log('node chair', node)

            }
            else if (node.isMesh && ['desktop-plane-0', 'desktop-plane-1'].includes(node.name)) {
              node.material = node.material.clone();
              node.material.color.set(0xf36393e);
              console.log('node plane', node)

            } else if (node.isMesh && ['room-base'].includes(node.name)) {
              node.material = node.material.clone();
              node.material.color.set(0xfe1d1b0);
              console.log('node plane', node)

            } else if(node.isMesh) {
              node.material = node.material.clone();
              node.material.color.set(0xfb0d911);
              console.log('node plane', node)
            }
          })

          scene.add(model);
          resolve(model);
        },
        undefined,
        (error) => {
          reject(error);
          console.error("Error loading glTF model", error);
        }
      );
    });
  }
  function playAnimation() {
    action.value.clampWhenFinished = true;
    action.value.loop = THREE.LoopOnce; // 设置为只播放一次
    action.value.reset();
    action.value.setDuration(3).play();
  }
  function addLight() {
    const directionalLight = new THREE.DirectionalLight(0xfffffff, 13);
    // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
    directionalLight.position.set(0, 3, 2);
    // 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
    // directionalLight.target = mesh;
    scene.add(directionalLight);
  }
  function addAmb() {
    const light = new THREE.AmbientLight(0xff5efe6, 12); // 柔和的白光
    light.position.set(0, 10, -5);
    scene.add(light);
  }
  async function startRenderThreeD(sceneRef, isDark) {
    // 创建场景
    scene = initScene();
    // 创建相机
    camera = initCamera(sceneRef);
    // 创建渲染器
    renderer = initRenderer(sceneRef);

    const controls = initOrbitControls(camera, renderer)
    floorMesh = initFloor(isDark);

    addLight()
    addAmb()
    await addAModel();

    const animate = () => {
      controls.update()
      renderer.setClearColor(isDark.value ? 0x1b1b1f : 0xff5efe6, 1);
      const delta = clock.getDelta();
      mixer?.update(delta);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
    // 双击播放动画 事件监听
    sceneRef.addEventListener("dblclick", () => {
      playAnimation();
    });
    return { scene, camera, renderer, controls, action };
  }

  return { startRenderThreeD, playAnimation };
}

export default useThreeModel;
