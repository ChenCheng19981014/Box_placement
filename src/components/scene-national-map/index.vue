<template>
  <div
    class="scene-national-map"
    ref="scene-national-map"
    onselectstart="return false;"
  >
    <div @pointerdown="(e) => e.stopPropagation()" class="btn"></div>

    <div
      class="point"
      :class="[
        'spirte-' + Object.keys(i)[0],
        Object.keys(i)[0] == 'lingtan' ? 'point2' : '',
      ]"
      v-for="(i, _) in pointName"
      @pointerdown="toNext(i)"
    >
      <img :src="i.img" alt="" />
    </div>
  </div>
</template>

<script>
// chang 事件 实例
let sceneChange = null;
// 场景
let scene = null;

let runScene = null;
import Engine from "run-scene-v2";
import store from "../../store";
import bus from "./Bus";
import * as THREE from "three";
import { fn } from "./Change";
import router from "../../router";
const { RunScene, Utils } = Engine;
export default {
  name: "SceneNationalMap",
  data() {
    return {
      path:
        "https://3d-editor-2-1303915342.cos.ap-shanghai.myqcloud.com/202306011800314987911001202348.glb",
      pointName: [
        {
          centralChina: "华中点位",
          img: require("@/assests/page/three/hz.png"),
        },
        { westChina: "华北点位", img: require("@/assests/page/three/hb.png") },
        { eastChina: "华西点位", img: require("@/assests/page/three/hx.png") },
        { northChina: "华东点位", img: require("@/assests/page/three/hd.png") },
        { southChina: "华南点位", img: require("@/assests/page/three/hn.png") },
        {
          lingtan: "零碳点位",
          img: require("@/assests/page/three/lt-point.png"),
        },
      ],
    };
  },
  async mounted() {
    // 返回动画
    bus.$on("scene-national-map-initAnima", (to) => {
      runScene?.cameraEx?.setTemp("默认", { time: 2 });
    });

    // 加载场景
    this.$store.commit("openLoading");

    runScene = await this.loadScene(this.path);

    runScene.on("loaded", () => {
      this.resize(store.state.fitLayoutRatio, runScene);

      this.$refs["scene-national-map"].classList.add("show");

      fn(runScene, {
        Utils,
        bus,
        Three: THREE,
      });

      this.onDone();
    });
  },
  methods: {
    toNext(item) {
      if (Object.keys(item)[0] == "lingtan") {
        bus.emit("changeCj");
      }
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
        dom: this.$refs["scene-national-map"],
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
.scene-national-map {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 3;
  opacity: 0;
}

.scene-national-map .btn {
  position: absolute;
  z-index: 2;
}

.show {
  opacity: 1 !important;
}

.scene-national-map .none {
  opacity: 0 !important;
}

.scene-national-map .block {
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

.scene-national-map .point {
  position: absolute;
  width: 191px;
  height: 79px;
  img {
    width: 100%;
    height: 100%;
  }
}
@keyframes suspend {
  from {
    top: -45px;
  }
  to {
    top: 148px;
  }
}
.scene-national-map .point2 {
  width: 121px;
  height: 120px;
  // animation: suspend 1s linear 0s infinite alternate forwards;
}
</style>
