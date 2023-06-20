<template>
  <div class="scene-xlxz" ref="scene-xlxz" onselectstart="return false;">
    <div @pointerdown="(e) => e.stopPropagation()" class="btn"></div>
    <div class="point"></div>
  </div>
</template>

<script>
// chang 事件 实例
let sceneChange = null;
// 场景
let scene = null;
import Engine from "run-scene-v2";
import store from "../../store";
import * as THREE from "three";
import { fn } from "./Change";
import bus from "./../scene-national-map/Bus";
import router from "../../router";
const { RunScene, Utils } = Engine;
export default {
  name: "SceneXlxz",
  data() {
    return {
      path:
        // "http://192.168.3.8:8080/file?path=project/linkpoint/&key=202306051234347264851001202337",
        "http://192.168.3.8:8080/file?path=project/linkpoint/&key=202306200958127630411001202394",
    };
  },
  async mounted() {
    // 返回动画
    bus.$on("scene-xlxz-initAnima", (to) => {
      // if (
      //   router.currentRoute?.name === to.name ||
      //   router.currentRoute?.name === "ware"
      // )
      //   return;
      runScene.cameraEx.setTemp("初始", { time: 2 });
    });

    bus.$on("logClickModel", this.logClickModel);

    // 加载场景
    this.$store.commit("openLoading");
    const runScene = await this.loadScene(this.path);

    runScene.on("loaded", () => {
      this.resize(store.state.fitLayoutRatio, runScene);
      this.$refs["scene-xlxz"].classList.add("show");

      fn(runScene, {
        Utils,
        bus,
        Three: THREE,
      });
      this.onDone();
    });
  },
  methods: {
    ts() {
      bus.$emit("ts");
    },
    resize: (x, runScene) => {
      let map = runScene.assetsEx.engineDom.getBoundingClientRect();
      runScene.setSize(map.width / x, map.height / x);
    },
    // 加载场景
    loadScene(path) {
      const runScene = new RunScene({
        render3: true,
        renderConfig: {
          // 是否允许设置模型位置后自动渲染最新效果
          matrixAutoUpdate: true,
          scriptFrame: 60,
          event: {
            ignores: ["resize"],
          },
        },
      }).load({
        path: path,
        dom: this.$refs["scene-xlxz"],
      });

      runScene.setSize(3040, 1040);

      return runScene;
    },
    // 加载完回调
    onDone() {
      console.log("场景加载完毕~");
      this.$store.commit("closeLoading");
    },
    // 打印点击到的模型
    logClickModel(model) {
      console.log("点击的模型为:", model.name);
    },
  },
  // 场景自带销毁
  destroyed() {
    sceneChange && sceneChange.dispose();
  },
};
</script>

<style lang="scss" scoped>
// 场景
.scene-xlxz {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 3;
  opacity: 0;
}

.scene-xlxz .btn {
  position: absolute;
  z-index: 2;
  > button {
    width: 200px;
    height: 100px;
    background-color: skyblue;
  }
}

.show {
  opacity: 1 !important;
}

.scene-xlxz .none {
  opacity: 0 !important;
}

.scene-xlxz .block {
  display: block !important;
}
.sprites {
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: red;
  opacity: 0;
}
.showOpacity {
  opacity: 1 !important;
}
@keyframes suspend {
  from {
    top: -45px;
  }
  to {
    top: 148px;
  }
}
.point {
  width: 121px;
  height: 120px;
  background-image: url("../../assests/page/three/lt-point.png");
  background-size: 100% 100%;
  animation: suspend 1s linear 0s infinite alternate forwards;
}
</style>
