<style lang="scss" scoped>
.video-content {
  width: 1170px;
  height: 658px;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 12;
  transform: translate(-50%, -50%);
  pointer-events: all;
  .close {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 14;
    background-image: url("../../assests/custom/close.png");
    background-size: 100% 100%;
    cursor: pointer;
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
}
</style>

<template>
  <div class="video-content">
    <div class="close" @click="closeVideo"></div>

    <video :src="videoSrc" controls autoplay></video>
  </div>
</template>

<script>
export default {
  name: "video-content",
  props: ["videoSrc"],
  methods: {
    closeVideo() {
      this.$parent.isShowVideo = false;
    },
  },
};
</script>
