<style lang="scss" scoped>
.custom-head {
  width: 100%;
  height: 152px;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background-image: url("../../assests/custom/head.png");
  background-size: 100% 100%;
  .text {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 628px;
    height: 56px;
    top: 22px;
    background-image: url("../../assests/custom/headtext.png");
    background-size: 100% 100%;
  }
  .right-content,
  .left-content {
    position: absolute;
    top: 26px;
    display: flex;
    .content-item {
      font-weight: 400;
      font-size: 24px;
      line-height: 34px;
      color: #45a2ff;
    }
  }
  .right-content {
    right: 20px;
    .content-item {
      &:not(:first-child) {
        margin-left: 60px;
      }
    }
  }
  .left-content {
    left: 20px;
    .content-item {
      display: flex;
      align-items: center;
      .icon {
        width: 36px;
        height: 36px;
        margin-right: 16px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:not(:last-child) {
        margin-right: 60px;
      }
    }
  }
}
</style>
<template>
  <div class="custom-head">
    <div class="text"></div>
    <div class="right-content">
      <div class="content-item">{{ date }}</div>
      <div class="content-item">{{ week }}</div>
      <div class="content-item">{{ time }}</div>
    </div>
    <div class="left-content">
      <div class="content-item">无锡</div>
      <div class="content-item">
        <div class="icon"><img src="@/assests/custom/rain.png" alt="" /></div>
        大雨
      </div>
      <div class="content-item">17-28℃</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "custom-head",
  data() {
    return {
      date: "",
      time: "",
      week: "",
      timer: null,
    };
  },
  created() {
    this.getDate();
    this.getTime();
    this.timer = setInterval(() => {
      this.getTime();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    getDate() {
      let date = new Date();
      let year = date.getFullYear() + "";
      let month = date.getMonth() + 1 + "";
      let day = date.getDate() + "";
      let week = [
        "星期天",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      let index = date.getDay();
      this.week = week[index];
      this.date = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    getTime() {
      let date = new Date();
      let hour = date.getHours() + "";
      let min = date.getMinutes() + "";
      let second = date.getSeconds() + "";
      this.time = `${hour.padStart(2, "0")}:${min.padStart(
        2,
        "0"
      )}:${second.padStart(2, "0")}`;
    },
  },
};
</script>
