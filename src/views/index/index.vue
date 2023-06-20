<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  // position: absolute;
  position: relative;
  top: 0;
  pointer-events: all;

  // z-index: 2;
  .left {
    position: absolute;
    top: 102px;
    left: 50px;
    z-index: 4;
  }
  .right {
    position: absolute;
    top: 102px;
    right: 50px;
    z-index: 4;
  }
  .project-dialog {
    width: 1276px;
    height: 626px;
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url("../../assests/custom/project-dialog.png");
    background-size: 100% 100%;
    .content {
      width: 1136px;
      height: 410px;
      position: absolute;
      top: 157px;
      left: 52px;
      display: grid;
      grid-template-columns: repeat(6, 175px);
      grid-template-rows: 184px 184px 184px;
      row-gap: 15px;
      column-gap: 16px;
      overflow: scroll;
      .list-item {
        padding: 8px;
        background: rgba(82, 142, 255, 0.1);
        border: 1px solid rgba(149, 175, 255, 0.1);
        border-radius: 8px;
        .project-img {
          width: 159px;
          height: 89px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          .project-status {
            width: 93px;
            height: 25px;
            position: absolute;
            top: 0;
            left: 0;
          }
          .brand {
            position: absolute;
            left: 6px;
            bottom: 5px;
            width: 81px;
            height: 24px;
          }
        }
        .project-text {
          width: 159px;
          position: relative;
          .title {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: #00ffff;
          }
          .line {
            color: rgba(255, 255, 255, 0.6);
            font-weight: 400;
            font-size: 12px;
            line-height: 17px;
          }
          .process {
            position: absolute;
            bottom: 5px;
            right: 9px;
            width: 39px;
            height: 37px;
            .process-text {
              position: absolute;
              top: 7px;
              left: 11px;
              font-weight: 400;
              font-size: 13.6615px;
              line-height: 18px;
              color: #ffffff;
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .close {
      width: 17px;
      height: 17px;
      cursor: pointer;
      position: absolute;
      z-index: 12;
      top: 14px;
      right: 20px;
    }
  }
  .return-icon {
    position: absolute;
    z-index: 8;
    cursor: pointer;
    top: 110px;
    left: 700px;
    width: 112px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .biaopai {
    position: absolute;
    z-index: 8;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    width: 378px;
    height: 39px;
    background-image: url("../../assests/custom/national.png");
    background-size: 100% 100%;
  }
}
</style>

<template>
  <div class="index">
    <KeepAlive>
      <component :is="showComponentName"></component>
    </KeepAlive>
    <template v-if="threeLoad">
      <div class="left" v-rc:left>
        <Left></Left>
      </div>
      <div class="right" v-rc:right>
        <Right></Right>
      </div>
    </template>

    <div class="project-dialog" v-if="isShowProject">
      <div class="close" @click="closeProject"></div>
      <div class="content">
        <div class="list-item" v-for="item in projectList">
          <div class="project-img">
            <img :src="item.img" alt="" />
            <div class="project-status">
              <img :src="setStatus(item.status)" alt="" />
            </div>
            <div class="brand">
              <img :src="item.brand" alt="" />
            </div>
          </div>
          <div class="project-text">
            <div class="title">{{ item.name }}</div>
            <div class="line">立项：{{ item.lxTime }}</div>
            <div class="line">预计：{{ item.yjTime }}</div>
            <div class="line">交付：{{ item.jfTime }}</div>
            <div class="process">
              <img :src="setProcess(item.status)" alt="" />
              <div class="process-text">{{ item.process }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <video-content v-if="isShowVideo" :videoSrc="videoSrc"></video-content>
    <div class="return-icon" v-show="isShowReturn" @click="returnNationMap">
      <img src="@/assests/custom/return.png" alt="" />
    </div>
    <div class="biaopai" v-show="!isShowReturn"></div>
  </div>
</template>

<script>
import Left from "./components/left.vue";
import Right from "./components/right";
import SceneNationalMap from "./../../components/scene-national-map/index.vue";
import SceneWuxiMap from "./../../components/scene-wuxi-map";
import bus from "@/components/scene-national-map/Bus.js";
export default {
  components: {
    SceneNationalMap,
    SceneWuxiMap,
    Left,
    Right,
  },
  data() {
    return {
      videoSrc: "",
      isShowVideo: false,
      isShowProject: false,
      projectList: [
        {
          img: require("@/assests/page/project-img/1.png"),
          brand: require("@/assests/page/project-img/brand1.png"),
          status: 1,
          name: "固德威技术股份有限公司",
          lxTime: "2023-05-21",
          yjTime: "2023-05-29",
          jfTime: "2023-05-29",
          process: "100",
        },
        {
          img: require("@/assests/page/project-img/2.png"),
          brand: require("@/assests/page/project-img/brand2.png"),
          status: 1,
          name: "海基智慧工厂",
          lxTime: "2023-04-18",
          yjTime: "2023-05-10",
          jfTime: "2023-05-10",
          process: "100",
        },
        {
          img: require("@/assests/page/project-img/3.png"),
          brand: require("@/assests/page/project-img/brand3.png"),
          status: 1,
          name: "市政新能源",
          lxTime: "2023-04-18",
          yjTime: "2023-05-09",
          jfTime: "2023-05-09",
          process: "100",
        },
        {
          img: require("@/assests/page/project-img/4.png"),
          brand: require("@/assests/page/project-img/brand4.png"),
          status: 1,
          name: "征图智慧园区",
          lxTime: "2023-05-21",
          yjTime: "2023-05-28",
          jfTime: "2023-05-28",
          process: "100",
        },
        {
          img: require("@/assests/page/project-img/5.png"),
          brand: require("@/assests/page/project-img/brand5.png"),
          status: 1,
          name: "无锡经开新时代文明大脑",
          lxTime: "2023-03-31",
          yjTime: "2023-04-05",
          jfTime: "2023-04-05",
          process: "100",
        },
        {
          img: require("@/assests/page/project-img/6.png"),
          brand: require("@/assests/page/project-img/brand6.png"),
          status: 1,
          name: "中环领先数字孪生平台",
          lxTime: "2023-05-21",
          yjTime: "2023-05-29",
          jfTime: "2023-05-29",
          process: "100",
        },
        {
          img: require("@/assests/page/project-img/7.png"),
          brand: require("@/assests/page/project-img/brand7.png"),
          status: 1,
          name: "彧寰智慧工厂",
          lxTime: "2023-05-21",
          yjTime: "2023-05-29",
          jfTime: "2023-05-29",
          process: "100",
        },
        {
          img: require("@/assests/page/project-img/8.png"),
          brand: require("@/assests/page/project-img/brand8.png"),
          status: 1,
          name: "天鹏电站管控平台",
          lxTime: "2023-05-21",
          yjTime: "2023-05-29",
          jfTime: "2023-05-29",
          process: "100",
        },
        {
          img: require("@/assests/page/project-img/9.png"),
          brand: require("@/assests/page/project-img/brand9.png"),
          status: 1,
          name: "萨科特新能源",
          lxTime: "2023-05-21",
          yjTime: "2023-05-29",
          jfTime: "2023-05-29",
          process: "100",
        },
        {
          img: require("@/assests/page/project-img/10.png"),
          brand: require("@/assests/page/project-img/brand10.png"),
          status: 1,
          name: "大航有能智慧车间",
          lxTime: "2023-05-21",
          yjTime: "2023-05-29",
          jfTime: "2023-05-29",
          process: "100",
        },
        {
          img: require("@/assests/page/project-img/11.png"),
          brand: require("@/assests/page/project-img/brand11.png"),
          status: 1,
          name: "碧挂园智慧楼宇",
          lxTime: "2023-05-21",
          yjTime: "2023-05-29",
          jfTime: "2023-05-29",
          process: "100",
        },
        {
          img: require("@/assests/page/project-img/12.png"),
          brand: require("@/assests/page/project-img/brand12.png"),
          status: 0,
          name: "无锡天鹏食品城",
          lxTime: "2023-05-21",
          yjTime: "2023-05-29",
          jfTime: "",
          process: "70",
        },
        {
          img: require("@/assests/page/project-img/13.png"),
          brand: "",
          status: 0,
          name: "智慧船舶项目",
          lxTime: "2023-04-21",
          yjTime: "2023-05-29",
          jfTime: "",
          process: "70",
        },
      ],
      showComponentName: "SceneNationalMap",
    };
  },
  created() {
    bus.$on("openVideo", this.openVideo);

    bus.on("changeCj", () => {
      this.showComponentName = "SceneWuxiMap";
    });
  },
  computed: {
    threeLoad() {
      return this.$store.state.threeLoad;
    },
    isShowReturn() {
      if (this.showComponentName == "SceneWuxiMap") {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    showComponentName() {
      this.resetView();
    },
  },
  activated() {
    this.resetView();
  },
  methods: {
    openVideo(item) {
      if (!item.video) return;
      this.videoSrc = item.video;
      this.isShowVideo = true;
    },
    resetView() {
      if (this.isShowVideo) {
        this.isShowVideo = false;
      }
      if (this.isShowReturn) {
        bus.$emit("scene-wuxi-initAnima");
      } else {
        bus.$emit("scene-national-map-initAnima");
      }
    },
    returnNationMap() {
      bus.$emit("set-state-dialogThree", false);
      this.showComponentName = "SceneNationalMap";
    },
    closeProject() {
      this.isShowProject = false;
    },
    setStatus(status) {
      if (status == 1) {
        return require("@/assests/page/project-img/complate.png");
      } else if (status == 0) {
        return require("@/assests/page/project-img/process.png");
      } else if (status == 1) {
        return require("@/assests/page/project-img/stop.png");
      } else {
        return require("@/assests/page/project-img/late.png");
      }
    },
    setProcess(status) {
      if (status == 3) {
        return require("@/assests/page/project-img/process-error.png");
      } else {
        return require("@/assests/page/project-img/process-normal.png");
      }
    },
  },
};
</script>
