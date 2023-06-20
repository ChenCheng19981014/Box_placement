<template>
  <div
    class="scene-wuxi-map"
    ref="scene-wuxi-map"
    onselectstart="return false;"
  >
    <div @pointerdown="(e) => e.stopPropagation()" class="btn"></div>

    <div
      :class="'point spirte-' + Object.keys(i)[0]"
      v-for="(i, _) in pointName"
      @pointerdown="openDialog(i, $event)"
    >
      <template v-if="Object.keys(i)[0] != 'lingtan'">
        <div class="pointer"></div>
        <div class="text-content">{{ Object.values(i)[0] }}</div>
        <!-- <div class="video" v-if="i.isShow" @pointerdown.stop="closeDialog(i)">
          <img :src="i.img" alt="" />
        </div> -->
      </template>
      <template v-else>
        <div class="icon-lt">
          <img src="@/assests/custom/wuxi-map.png" alt="" />
        </div>
      </template>
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
import bus from "./../scene-national-map/Bus";
import * as THREE from "three";
import { fn } from "./Change";
import router from "../../router";
import { number } from "echarts";
const { RunScene, Utils } = Engine;
export default {
  name: "SceneWuxiMap",
  data() {
    return {
      path:
        "https://3d-editor-2-1303915342.cos.ap-shanghai.myqcloud.com/202306011718471658691001202334.glb",
      pointName: [
        {
          goodwe: "固德威数字孪生",
          img: require("@/assests/page/three/4-固德威.png"),
          isShow: false,
        },
        {
          zhonghuan: "中环领先数字孪生平台",
          img: require("@/assests/page/three/3-中环.png"),
          isShow: false,
        },
        {
          haiji: "海基智慧工厂",
          img: require("@/assests/page/three/1-海基.png"),
          isShow: false,
        },
        {
          zhengtu: "征图智慧园区",
          img: require("@/assests/page/three/2-征图.png"),
          isShow: false,
        },
        {
          tianpeng: "天鹏电站管控平台",
          img: require("@/assests/page/three/7-天鹏.png"),
          isShow: false,
        },
        {
          yuhuan: "彧寰智慧工厂",
          img: require("@/assests/page/three/12-彧寰.png"),
          isShow: false,
        },
        {
          jingkaibaijingtu: "经开百景图",
          img: require("@/assests/page/three/16-经开百景图.png"),
          isShow: false,
        },
        {
          lingtan: "零探",
          isShow: false,
        },
        {
          langchao: "浪潮智慧园区",
          img: require("@/assests/page/three/11-浪潮.png"),
          isShow: false,
        },
        {
          jingkaishidaidanao: "经开新时代大脑",
          img: require("@/assests/page/three/9-经开新时代.png"),
          isShow: false,
        },
        {
          yuanjing: "远景能源",
          img: require("@/assests/page/three/15-远景.png"),
          isShow: false,
        },
        {
          shizhen: "市政新能源",
          img: require("@/assests/page/three/14-市政新能源.png"),
          isShow: false,
          video:
            "http://movs.linktwins.com/static/video/smart_enengy/shizheng.mp4",
        },
        {
          saketie: "萨科特新能源",
          img: require("@/assests/page/three/8-萨科特.png"),
          isShow: false,
        },
        {
          biguiyuan: "碧桂园智慧楼宇",
          img: require("@/assests/page/three/13-碧桂园.png"),
          isShow: false,
          video: "http://movs.linktwins.com/static/video/smart_yq/bjy.mp4",
        },
        {
          huawei: "华伟液压智慧工厂",
          img: require("@/assests/page/three/10-华伟液压.png"),
          isShow: false,
          video: "http://movs.linktwins.com/static/video/smart_made/hw1.mp4",
        },
        {
          dahang: "大航有能智慧车间",
          img: require("@/assests/page/three/6-大航有能.png"),
          isShow: false,
        },
      ],
      isRuning: true,
    };
  },
  async mounted() {
    // 返回动画
    bus.$on("scene-wuxi-initAnima", (to) => {
      runScene.cameraEx.setTemp("默认", { time: 2 });
    });

    // 加载场景
    this.$store.commit("openLoading");

    // 加载场景
    runScene = await this.loadScene(this.path);

    runScene.on("loaded", () => {
      this.resize(store.state.fitLayoutRatio, runScene);
      this.$refs["scene-wuxi-map"].classList.add("show");

      fn(runScene, {
        Utils,
        bus,
        Three: THREE,
      });
      this.onDone();
    });

    bus.$on("sceneRunning", (isRuning) => {
      this.isRuning = isRuning;
    });
  },
  methods: {
    closeDialog(item) {
      item.isShow = false;
    },
    openDialog(item, event) {
      // console.log("item:", item);
      if (Object.keys(item)[0] == "lingtan") {
        this.$router.push({
          path: "/ware",
        });
        return;
      }

      runScene?.cb.controls.change.add("setDialogPosition", () => {
        if (!this.isRuning) return;
        bus.$emit("set-position-dialogThree", item, event);
      });

      // 设置 唯一dom位置
      bus.$emit("set-position-dialogThree", item, event);
      bus.$emit("set-state-dialogThree", true);

      this.pointName.forEach((item) => {
        item.isShow = false;
      });

      item.isShow = true;
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
        dom: this.$refs["scene-wuxi-map"],
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
.scene-wuxi-map {
  width: 100%;
  height: 100%;
  position: absolute;
  // position: relative;
  z-index: 3;
  opacity: 0;
}

.scene-wuxi-map .btn {
  position: absolute;
  z-index: 2;
}

.show {
  opacity: 1 !important;
}

.scene-wuxi-map .none {
  opacity: 0 !important;
}

.scene-wuxi-map .block {
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

.scene-wuxi-map .point {
  // position: absolute;
  height: 74px;
  display: flex;
  align-items: center;
  position: relative;
  @keyframes suspend {
    from {
      top: -45px;
    }
    to {
      top: 148px;
    }
  }
  .icon-lt {
    // animation: suspend 1s linear 0s infinite alternate forwards;
    width: 121px;
    height: 81px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .pointer {
    width: 68px;
    height: 82px;
    background-image: url("../../assests/custom/pointer-normal.png");
    background-size: 100% 100%;
    position: relative;
    z-index: 5;
  }

  .text-content {
    background: linear-gradient(
      90deg,
      #0078e1 11.89%,
      rgba(47, 49, 86, 0.7) 100%
    );

    border-radius: 90px;
    height: 28px;
    color: #ffffff;
    font-weight: 500;
    font-size: 14px;
    line-height: 28px;
    padding: 8px;
    padding-left: 26px;
    display: flex;
    align-items: center;
    margin-left: -30px;
    margin-top: -6px;
  }
}

.scene-wuxi-map .point:hover {
  .pointer {
    background-image: url("../../assests/custom/pointer-active.png");
  }

  .text-content {
    background: linear-gradient(
      90deg,
      #02a557 11.89%,
      rgba(4, 141, 83, 0.7) 100%
    );
  }
}

.scene-wuxi-map .point .video {
  position: absolute;
  width: 150px;
  height: 120px;
  border-radius: 10px;
  transform: translate(25%, 65%);
  z-index: 100;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
