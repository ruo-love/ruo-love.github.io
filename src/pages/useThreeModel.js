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
    _scene.fog = new THREE.FogExp2(0xffffff, 0.05); // 设置场景雾效
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

    camera.position.z = 10;
    camera.position.y = 4;
    return camera;
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
  function initAmbientLight() {
    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // 第一个参数是光的颜色，第二个参数是光的强度
    scene.add(ambientLight);
  }
  function initSpotLight(helper = true) {
    // 添加平行光
    spotLight = new THREE.SpotLight(0xffffff, 1000);
    spotLight.position.set(-10, 10, -10);
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
  function initReflector() {
    // 创建镜像地板
  }
  function initModel() {
    return new Promise((resolve, reject) => {
      const gltfLoader = new GLTFLoader();
      // 实例化加较器draco
      const dracoloader = new DRACOLoader();
      dracoloader.setDecoderPath("/draco/");
      gltfLoader.setDRACOLoader(dracoloader);
      // 加载 glTF 模型
      gltfLoader.load(
        "/jump-transformed.glb",
        (gltf) => {
          // 获取模型
          const model = gltf.scene;
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
            }
          });
          const animations = gltf.animations;
          if (animations && animations.length) {
            mixer = new THREE.AnimationMixer(model);
            action.value = mixer.clipAction(animations[0]); // 假设模型只有一个动画
          }
          model.castShadow = true;
          model.scale.set(3, 3, 3);
          // 添加模型到场景
          scene.add(model);
          controls.target.set(0, 4, 0); // 设置控制器的焦点
          camera.lookAt(0, 4, 0); // 设置相机的焦点
          spotLight.target = model; // 设置平行光的焦点
          resolve();
        },
        undefined,
        (error) => {
          reject(error);
          console.error("Error loading glTF model", error);
        }
      );
    });
    // 创建 GLTF 加载器
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
          const subModel = model.getObjectByName("chair");
          subModel.material = subModel.material.clone();
          subModel.material.color.set(0xff5f5f); // 设置新的颜色
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
  function addText() {
    return new Promise((resolve, reject) => {
      const loader = new FontLoader();
      loader.load(
        "/helvetiker_regular.typeface.json",
        function (font) {
          const geometry = new TextGeometry("HELLO WORLD", {
            font: font,
            size: 1.3,
            weight: "bold",
            height: 0.55,
            curveSegments: 12,
            bevelEnabled: false,
          });
          const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.x = -6;
          mesh.position.y = 1;
          mesh.position.z = -2;
          mesh.rotation.x = -Math.PI / 13.5;
          mesh.castShadow = true;
          scene.add(mesh);
          resolve(mesh);
        },
        // 加载失败的回调函数
        function (xhr) {
          console.error("Font loading failed:", xhr);
        },
        reject
      );
    });
  }
  function initAnimation(textMesh) {
    const textTween = new Tween(textMesh.position)
      .to({ x: -6, y: 1, z: 2 }, 1000)
      .delay(1000)
      .onUpdate((v, e) => {
        // textMesh.material.color.set(0x292d3e, e);
      })
      .easing(TWEEN.Easing.Quadratic.InOut);

    const targetPosition = { x: 0, y: 4, z: 8 };
    const duration = 2000; // 动画持续时间
    const tween = new TWEEN.Tween(camera.position)
      .to(targetPosition, duration)
      .easing(TWEEN.Easing.Quadratic.InOut) // 使用 Quadratic 缓动函数
      .onUpdate(() => {
        // 在每一帧更新时执行的回调函数
        // 这里可以进行一些自定义操作
      })
      .onStart(() => {
        playAnimation();
      }) // 动画开始时的回调函数
      .onComplete(() => {
        textTween.start();
      }) // 动画结束时的回调函数
      .start();

    return [tween, textTween];
  }
  async function startRenderThreeD(sceneRef, isDark) {
    // 创建场景
    scene = initScene();
    // 创建相机
    camera = initCamera(sceneRef);
    // 创建渲染器
    renderer = initRenderer(sceneRef);
    // 创建轨道控制器
    controls = initOrbitControls(camera, renderer);
    // 添加环境光
    // initAmbientLight();
    //添加平行光;
    // spotLight = initSpotLight();
    floorMesh = initFloor(isDark);
    initReflector();
    // const textMesh = await addText();
    // 加载模型

    await addAModel();
    // 添加模型
    // await initModel();
    // const [tween, textTween] = initAnimation(textMesh);
    // 渲染循环
    const animate = () => {
      controls.update(); // 更新控制器
      renderer.setClearColor(isDark.value ? 0x1b1b1f : 0xff5efe6, 1);
      const delta = clock.getDelta();
      mixer?.update(delta);
      // tween.update(); // 更新 Tween.js，使动画生效
      // textTween.update(); // 更新 Tween.js，使动画生效
      floorMesh.material.color.set(isDark.value ? 0x1b1b1f : 0xff5efe6);
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
