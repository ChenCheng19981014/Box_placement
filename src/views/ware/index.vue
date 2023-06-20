<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  pointer-events: all;
  // z-index: 2;
  .left {
    position: absolute;
    top: 102px;
    z-index: 4;
  }
  .right {
    position: absolute;
    top: 102px;
    z-index: 4;
  }
  .biaopai {
    position: absolute;
    z-index: 8;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    width: 378px;
    height: 39px;
    background-image: url("../../assests/custom/lt-xz.png");
    background-size: 100% 100%;
  }
}
</style>

<template>
  <div class="index">
    <template v-if="threeLoad">
      <div class="left" v-rc:left>
        <Left></Left>
      </div>
      <div class="right" v-rc:right>
        <Right></Right>
      </div>
    </template>

    <video-content
      v-if="isShowVideo"
      videoSrc="https://linktwins-1303915342.cos.ap-shanghai.myqcloud.com/xuelangxiaozhen/%E9%A3%9E%E4%B9%A620230606-134202.mp4"
    ></video-content>
    <!-- <SceneNationalMap></SceneNationalMap> -->
    <keep-alive>
      <SceneXlxz></SceneXlxz>
    </keep-alive>
    <div class="biaopai"></div>
  </div>
</template>

<script>
import SceneXlxz from "./../../components/scene-xlxz/index.vue";
import Left from "./components/left.vue";
import Right from "./components/right";
import bus from "../../components/scene-national-map/Bus";
export default {
  components: {
    SceneXlxz,
    Left,
    Right,
  },
  mounted() {},
  data() {
    return {
      isShowVideo: false,
    };
  },
  computed: {
    threeLoad() {
      return this.$store.state.threeLoad;
    },
  },
  methods: {},
};
</script>
