<style lang="scss" scoped>
.custom-bottom {
  width: 1985px;
  height: 181px;
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-image: url("../../assests/custom/bottom.png");
  background-size: 100% 100%;
  .btn-group {
    pointer-events: all;
    position: absolute;
    bottom: 46px;
    display: flex;
    left: 50%;
    transform: translateX(-50%);
    .btn-item {
      width: 165px;
      height: 158px;
      &:first-child {
        margin-right: 38px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
<template>
  <div class="custom-bottom">
    <div class="btn-group">
      <div
        class="btn-item"
        v-for="(item, index) in btnList"
        @click="changeRoute(item)"
      >
        <img
          :src="$route.path == item.route ? item.active : item.normal"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/components/scene-national-map/Bus.js";
export default {
  name: "custom-bottom",
  data() {
    return {
      btnList: [
        {
          route: "/ware",
          normal: require("@/assests/custom/right-normal.png"),
          active: require("@/assests/custom/right-active.png"),
        },
        {
          route: "/",
          normal: require("@/assests/custom/left-normal.png"),
          active: require("@/assests/custom/left-active.png"),
        },
      ],
    };
  },
  mounted() {},
  watch: {},
  methods: {
    changeRoute({ route }) {
      bus.$emit("set-state-dialogThree", false);
      bus.$emit("sceneRunning", false);
      this.$router.push({
        path: route,
      });
      if (route == "/ware") {
        bus.$emit("scene-xlxz-initAnima");
      } else {
        bus.$emit("set-state-dialogThree", false);
        bus.$emit("sceneRunning", true);
      }
    },
  },
};
</script>
