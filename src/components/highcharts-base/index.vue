<template>
  <!-- hightcharts测试 -->
  <div ref="chart" id="container"></div>
</template>
<script>
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import Highcharts3D from "highcharts/highcharts-3d";
import cylinder from 'highcharts/modules/cylinder'
HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
cylinder(Highcharts);
export default {
  name: "highcharts-base",
  data() {
    return {
      chart: null
    };
  },
  props: {
    // 传递的对象
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    height: {
      type: String,
      required: false,
      default: '0px'
    },
    width: {
      type: String,
      required: false,
      default: '0px'
    },
    xAxisAni: {
      type: Boolean,
      default: true
    },
    yAxisAni: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      // 全局配置
      Highcharts.setOptions({
        chart: {
          backgroundColor: 'rgba(0,0,0,0)',
        },
        credits: {
          //去除右下角水印
          enabled: false
        },
        // 解决警告
        accessibility: {
          enabled: false
        }
      });
      // 图表初始化
      if (this.chart) {
        this.chart.destroy()
      }
      // 3D效果初始化
      this.init3D()
      this.reDraw()
    },
    // 重绘
    reDraw() {
      this.chart = new Highcharts.Chart(this.$refs.chart, this.options)
      this.$nextTick(() => {
        this.doAxisAnimation()
      })
    },
    doAxisAnimation() {
      if (document.getElementsByClassName("highcharts-axis-labels").length == 0) return

      let xAxis = document.getElementsByClassName("highcharts-axis-labels")[1]
      if (this.xAxisAni && xAxis) {

        let texts = xAxis.getElementsByTagName("text")
        texts = Array.from(texts)
        for (let text of texts) {
          text.style.opacity = 0
          text.style.transform = `translateX(-40px)`;
          setTimeout(() => {
            text.style.transition = ".2s all"
            text.style.opacity = 1
            text.style.transitionDelay=texts.indexOf(text)/10+"s"
            text.style.transform = `translateX(0px)`;
          }, 0);
        }

        // //透明度初始化处理


      }
      let yAxis = document.getElementsByClassName("highcharts-axis-labels")[0]

      if (this.xAxisAni && xAxis) {

        //透明度初始化处理
        yAxis.style.opacity = 0
        yAxis.style.transform = `translatey(40px)`;
        setTimeout(() => {
          yAxis.style.transition = "1s all"
          yAxis.style.opacity = 1
          yAxis.style.transform = `translateY(0px)`;
        }, 0);

      }
    },
    //执行轴动画
    // 初始3D效果
    init3D() {
      var each = Highcharts.each,
        round = Math.round,
        cos = Math.cos,
        sin = Math.sin,
        deg2rad = Math.deg2rad;
      Highcharts.wrap(Highcharts.seriesTypes.pie.prototype, 'translate', function (proceed) {
        proceed.apply(this, [].slice.call(arguments, 1));
        // 如果图表不是3d的
        if (!this.chart.is3d()) {
          return;
        }

        //不同高度柱状图
        var series = this,
          chart = series.chart,
          optionss = chart.optionss,
          seriesOptionss = series.optionss,
          depth = seriesOptionss.depth || 0,
          optionss3d = optionss.chart.optionss3d,
          alpha = optionss3d.alpha,
          beta = optionss3d.beta,
          z = seriesOptionss.stacking ? (seriesOptionss.stack || 0) * depth : series._i * depth;
        z += depth / 2;
        if (seriesOptionss.grouping !== false) {
          z = 0;
        }
        each(series.data, function (point) {
          var shapeArgs = point.shapeArgs,
            angle;
          point.shapeType = 'arc3d';
          var ran = point.optionss.h;
          shapeArgs.z = z;
          shapeArgs.depth = depth * 0.75 + ran;
          shapeArgs.alpha = alpha;
          shapeArgs.beta = beta;
          shapeArgs.center = series.center;
          shapeArgs.ran = ran;
          angle = (shapeArgs.end + shapeArgs.start) / 2;
          point.slicedTranslation = {
            translateX: round(cos(angle) * seriesOptionss.slicedOffset * cos(alpha * deg2rad)),
            translateY: round(sin(angle) * seriesOptionss.slicedOffset * cos(alpha * deg2rad))
          };
        });
      });
      (function (H) {
        H.wrap(Highcharts.SVGRenderer.prototype, 'arc3dPath', function (proceed) {
          // Run original proceed method
          var ret = proceed.apply(this, [].slice.call(arguments, 1));
          ret.zTop = (ret.zOut + 0.5) / 100;
          return ret;
        });
      }(Highcharts));
    }
  },
  // 监听Options的改变,当改变时重新渲染图表
  watch: {
    options: function () {
      this.reDraw()
    }
  }
};
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
