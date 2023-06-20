<style lang="scss" scoped>
.right-content {
  width: 600px;
  height: 914px;
  background-image: url("../../../assests/page/page1right.png");
  background-size: 100% 100%;
  .prject-list {
    position: absolute;
    bottom: 17px;
    left: 22px;
    width: 557px;
    display: grid;
    grid-template-columns: 175px 175px 175px;
    grid-template-rows: 184px 184px;
    row-gap: 15px;
    column-gap: 16px;
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
}
</style>

<template>
  <div class="right-content">
    <div class="prject-list" @click="openProject">
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
</template>
<script>
export default {
  data() {
    return {
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
      ],
    };
  },
  methods: {
    openProject() {
      this.$parent.isShowProject = true;
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
