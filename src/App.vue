<style lang="scss" scoped>
body {
  margin: 0 auto;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .content {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }
}
</style>

<template>
  <div id="app" @dragstart.prevent @selectstart.prevent>
    <dialogThree></dialogThree>
    <fit-layout :width="3040" :height="1040">
      <div class="content">
        <loading v-show="!threeLoad"></loading>
        <custom-shade></custom-shade>
        <custom-head></custom-head>
        <KeepAlive>
          <router-view></router-view>
        </KeepAlive>
        <custom-bottom></custom-bottom>
      </div>
    </fit-layout>
  </div>
</template>

<script>
import dialogThree from "./components/dialog/dialog.vue";
export default {
  data() {
    return {};
  },
  components: {
    dialogThree,
  },
  computed: {
    threeLoad() {
      return this.$store.state.threeLoad;
    },
  },
  created() {
    this.$router.push({
      path: "/ware",
    });
  },
  methods: {},
  mounted() {},
};
</script>

<style>
/* canvas {
  width: 100% !important;
  height: 100% !important;
} */
</style>
