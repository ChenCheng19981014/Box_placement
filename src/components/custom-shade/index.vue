<style lang="scss" scoped>
.custom-shade {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  background-image: url("../../assests/custom/shade.png");
  background-size: 100% 100%;
}
</style>
<template>
  <div class="custom-shade"></div>
</template>

<script>
export default {
  name: "custom-shade",
};
</script>
