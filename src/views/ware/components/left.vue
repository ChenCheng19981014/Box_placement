<style lang="scss" scoped>
.left-content {
  width: 600px;
  height: 914px;
  position: relative;
  background-image: url("../../../assests/page/page2left.png");
  background-size: 100% 100%;
  .scroll-content {
    width: 265px;
    height: 167px;
    overflow: hidden;
    position: absolute;
    bottom: 21px;
    right: 40px;
    .all-content {
      height: 167px;
      display: flex;
      transition: all;
      position: relative;
    }
    .content-item {
      flex-shrink: 0;
      width: 113px;
      height: 145px;
      position: relative;
      top: 10px;
      img {
        width: 100%;
        height: 100%;
      }
      // &::before {
      //   content: "";
      //   position: absolute;
      //   z-index: 3;
      //   top: 0;
      //   left: 0;
      //   right: 0;
      //   bottom: 0;
      //   background-color: #00000033;
      // }
    }
    .right-item {
      margin-left: 38px;
    }
    .center-item {
      width: 129px;
      height: 167px;
      top: 0px;
      position: absolute;
      z-index: 5;
      left: 50%;
      transform: translateX(-50%);
      &::before {
        content: "";
        background-color: transparent !important;
      }
    }
  }
  .video-content {
    width: 568px;
    height: 320px;
    position: absolute;
    top: 181px;
    left: 16px;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.scroll-content {
  .el-carousel__mask {
    background-color: rgba($color: #000000, $alpha: 0.8);
    z-index: 2;
  }
}
</style>

<template>
  <div class="left-content">
    <div class="video-content" @click="openVideo"></div>
    <div class="scroll-content">
      <el-carousel :interval="4000" type="card" height="167px">
        <el-carousel-item v-for="item in imgList">
          <div class="content-item" ref="zsListRef">
            <img :src="item" alt="" />
          </div>
        </el-carousel-item>
      </el-carousel>
      <!-- <div class="all-content" ref="allRef">
        <div class="content-item" v-for="item in imgList" ref="zsListRef">
          <img :src="item" alt="" />
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgList: [
        require("@/assests/page/zs/1.png"),
        require("@/assests/page/zs/1.png"),
        require("@/assests/page/zs/1.png"),
        // require("@/assests/page/zs/1.png"),
      ],
      timer: null,
    };
  },
  mounted() {
    this.setAni();
  },
  methods: {
    openVideo() {
      this.$parent.isShowVideo = true;
    },
    setAni() {
      // let init = 1;
      // let begin = 0;
      // let lang = 65;
      // let length = this.imgList.length;
      // this.$refs.zsListRef[1].classList.add("center-item");
      // this.$refs.zsListRef[2].classList.add("right-item");
      // let scrollDom = this.$refs.allRef;
      // this.timer = setInterval(() => {
      //   begin -= lang;
      //   scrollDom.style.transfrom = `${begin}px`;
      // }, 1000);
    },
  },
};
</script>
