<style lang="scss" scope>
.fit-layout {
  z-index: 2;
  position: relative;
  transform-origin: center center;
  flex-shrink: 0;
}

.layout {
  .lefts {
    position: fixed;
    left: 0;
    top: 0;
    background: black;
    height: 100%;
  }
  .rights {
    position: fixed;
    right: 0;
    top: 0;
    background: black;
    height: 100%;
  }
  .bottoms {
    position: fixed;
    bottom: 0;
    left: 0;
    background: black;
    width: 100%;
  }
  .tops {
    position: fixed;
    top: 0;
    left: 0;
    background: black;
    width: 100%;
  }
}
</style>

<template>
  <div class="layout">
    <div class="lefts" :style="`width:${widths}px`"></div>
    <div class="rights" :style="`width:${widths}px`"></div>
    <div class="tops" :style="`height:${heights}px`"></div>
    <div class="bottoms" :style="`height:${heights}px`"></div>
    <div
      class="fit-layout"
      :style="`transform: scale(${x});width:${width}px;height:${height}px`"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import store from "../../store";
import libBus from "../../lib/bus.js";
export default {
  name: "fit-layout",
  props: {
    width: Number,
    height: Number,
  },
  data() {
    return {
      widths: 0,
      heights: 0,
      x: 1,
      y: 1,
    };
  },
  methods: {
    setScale() {
      let { offsetWidth, offsetHeight } = document.body;
      let width = this.width;
      let height = this.height;
      let screenRadio = width / height;
      let bodyRadio = offsetWidth / offsetHeight;
      // console.log(bodyRadio,screenRadio,"bodyRadio");

      console.log(width, height, "w-h");

      //如果屏幕宽高比例大于需要固定高度
      if (bodyRadio > screenRadio) {
        this.y = offsetHeight / height;
        this.x = this.y;
        this.heights = 0;
        this.widths = (offsetWidth - this.width * this.x) / 2;
      } else {
        this.x = offsetWidth / width;
        this.y = this.x;
        this.widths = 0;
        this.heights = (offsetHeight - this.height * this.x) / 2;
      }
      store.commit("setFitLayoutRatio", this.x);
    },
  },
  created() {
    this.setScale();
    window.addEventListener("resize", () => {
      this.setScale();
      libBus.$emit("changeScene", this.x);
    });
    libBus.$on("resize", (fn) => {
      fn && fn(this.x);
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.setScale);
  },
};
</script>
