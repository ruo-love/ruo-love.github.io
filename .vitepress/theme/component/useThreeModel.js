import * as THREE from "three";
import { ref } from "vue";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function useThreeModel() {
  let scene = null;
  let camera = null;
  let renderer = null;
  let controls = null;
  let spotLight = null;
  let floorMesh = null;
  function initScene() {
    // 创建场景
    const _scene = new THREE.Scene();
    // _scene.fog = new THREE.FogExp2(0x1b1b1f, 0.1); // 设置场景雾效
    // 启用场景的阴影
    _scene.receiveShadow = true;
    return _scene;
  }
  function initCamera(sceneRef) {
    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      sceneRef.value.clientWidth / sceneRef.value.clientHeight,
      0.1,
      1000
    );

    camera.position.z = 6;
    camera.position.y = 2;
    return camera;
  }
  function initRenderer(sceneRef) {
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setSize(sceneRef.value.clientWidth, sceneRef.value.clientHeight);
    sceneRef.value.appendChild(renderer.domElement);
    return renderer;
  }
  function initOrbitControls(camera, renderer) {
    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    // 启用阻尼效果
    controls.enableDamping = true; // 启用阻尼效果
    controls.dampingFactor = 0.5; // 阻尼系数，调整阻尼效果的强度
    return controls;
  }
  function initAmbientLight() {
    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // 第一个参数是光的颜色，第二个参数是光的强度
    scene.add(ambientLight);
  }
  function initSpotLight(helper = false) {
    // 添加平行光
    spotLight = new THREE.SpotLight(0xffffff, 1000);
    spotLight.position.set(0, 10, 10);
    spotLight.angle = Math.PI / 4;
    spotLight.castShadow = true;

    // 设置阴影相关属性

    scene.add(spotLight);
    if (helper) {
      // 添加平行光辅助线
      const helper = new THREE.SpotLightHelper(spotLight, 5);
      scene.add(helper);
    }
    return spotLight;
  }
  function initFloor(isDark) {
    // 创建地板的几何体
    const floorGeometry = new THREE.BoxGeometry(10, 0.1, 16); // 设置地板的大小
    // 创建地板的材质
    const floorMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
    }); // 设置地板的颜色

    // 创建地板的网格对象
    floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);

    // 设置地板的位置
    floorMesh.position.set(0, -0.1, 0); // 根据需要调整位置
    // 开启地板的阴影接收
    floorMesh.receiveShadow = true;
    floorMesh.castShadow = true;

    // 将地板添加到场景中
    scene.add(floorMesh);
    return floorMesh;
  }

  function initModel() {
    // 创建 GLTF 加载器
    const gltfLoader = new GLTFLoader();
    // 实例化加较器draco
    const dracoloader = new DRACOLoader();
    dracoloader.setDecoderPath("/draco/");
    gltfLoader.setDRACOLoader(dracoloader);
    // 加载 glTF 模型
    gltfLoader.load(
      "/jump-transformed.glb",
      (gltf) => {
        /* gltf.scene.traverse((child) => {
          if (child.isMesh) {
            // 如果是 Mesh 对象，设置新的材质
            const newMaterial = new THREE.MeshPhongMaterial({
              color: child.material.color,
            });
            child.material = newMaterial;
          }
        });*/

        // 获取模型
        const model = gltf.scene;
        const animations = gltf.animations;
        if (animations && animations.length) {
          const mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(animations[0]); // 假设模型只有一个动画

          // 设置动画持续时间为10秒
          action.setDuration(10).play();

          // 在渲染循环中更新动画
          const clock = new THREE.Clock();
          const animate = () => {
            requestAnimationFrame(animate);

            const delta = clock.getDelta();
            mixer.update(delta);

            controls.update();
            renderer.render(scene, camera);
          };

          animate();
        }
        model.castShadow = true;
        console.log(model);
        model.scale.set(3, 3, 3);
        // 添加模型到场景
        scene.add(model);
        controls.target.set(0, 4, 0); // 设置控制器的焦点
        camera.lookAt(0, 4, 0); // 设置相机的焦点
        spotLight.target = model; // 设置平行光的焦点
      },
      undefined,
      (error) => {
        console.error("Error loading glTF model", error);
      }
    );
  }
  function startRenderThreeD(sceneRef, isDark) {
    // 创建场景
    scene = initScene();
    // 创建相机
    camera = initCamera(sceneRef);
    // 创建渲染器
    renderer = initRenderer(sceneRef);
    // 创建轨道控制器
    controls = initOrbitControls(camera, renderer);
    // 添加环境光
    initAmbientLight();
    //添加平行光;
    spotLight = initSpotLight();
    floorMesh = initFloor(isDark);
    // 添加模型
    initModel();
    // 渲染循环
    const animate = () => {
      controls.update(); // 更新控制器
      renderer.setClearColor(isDark.value ? 0x1b1b1f : 0xffffff, 1);
      floorMesh.material.color.set(isDark.value ? 0x1b1b1f : 0xffffff);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
    return { scene, camera, renderer, controls };
  }
  return { startRenderThreeD };
}

export default useThreeModel;
