<template>
  <div class="dialogThree" ref="dialogThree" v-show="isShow" @click="close">
    <img :src="img" alt="" />
  </div>
</template>
<script>
import bus from "./../scene-national-map/Bus";
export default {
  name: "dialogThree",
  data() {
    return {
      isShow: false,
      img: null,
      item: null,
    };
  },
  mounted() {
    // 设置位置
    bus.$on("set-position-dialogThree", this.setPosition);

    // 是否显示
    bus.$on("set-state-dialogThree", (isShow) => {
      this.isShow = isShow;
      this.$refs["dialogThree"].style.display = `${isShow ? "block" : "none"}`;
    });

    // let x=0;
    // let y=0;

    // window.onpointerdown = (e) => {
    //   let startx = e.clientX;
    //   let starty = e.clientY;
    //   window.onmousemove = (ev) => {
    //     // this.setPosition();
    //     // let dom = document.querySelector(".dialogThree");
    //     // let addX = ev.clientX - startx;
    //     // let addY = ev.clientY - starty;
    //     // startx = ev.clientX;
    //     // starty = ev.clientY;
    //     // console.log(addX, addY);
    //     // dom.style.left = dom.offsetLeft + addX + "px";
    //     // dom.style.top = dom.offsetTop + addY + "px";
    //   };

    //   window.onpointerup = () => {
    //     window.onmousemove = null;
    //     window.onpointerup = null;
    //   };
    // };
  },
  methods: {
    close() {
      bus.$emit("openVideo", this.item);
      this.isShow = false;
    },
    setPosition(_, el) {
      this.img = _.img;
      this.item = _;
      const { x, y, width, height } = el.target.getBoundingClientRect();

      let dom = document.querySelector(".dialogThree");

      dom.style.left = 2 + x + "px";

      dom.style.top = height + y + "px";

      // if (this.isShow) return;

      // this.isShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.dialogThree {
  position: absolute;
  width: 150px;
  height: 120px;
  z-index: 50;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
