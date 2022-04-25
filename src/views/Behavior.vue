<!-- 用户乘车行为统计 -->
<template>
  <div>
    <div id="chart"></div>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myChart: null
    };
  },
  mounted() {
    this.initChart();
    this.initMap();
    console.log("设置正北方向......");
    // window.AMap.ControlBar.prototype.XU = function(a, b) {
    //   console.log("a:" + a + "," + b);
    //   b = (b / 90) * 60;
    //   this.GK || (b = 0);
    //   this.g.su.style.transform = this.g.su.style.WebkitTransform =
    //     "rotateX(-" + b + "deg) rotateZ(" + a + "deg)";
    // };
  },
  methods: {
    // 初始化图表
    initChart() {
      const option = {
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          data: ["豪华车", "拼车", "专车", "出租车", "顺风车"]
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            data: [
              { value: 60, itemStyle: { color: "#EEEEEE" } },
              { value: 200, itemStyle: { color: "#1E54C1" } },
              { value: 150, itemStyle: { color: "#FFA70F" } },
              { value: 80, itemStyle: { color: "#FE430E" } },
              { value: 70, itemStyle: { color: "#00A0E8" } }
            ],
            type: "bar"
          }
        ]
      };
      this.myChart = this.$echarts.init(document.getElementById("chart"));
      this.myChart.setOption(option);
    },
    // 初始化地图
    initMap(){
      var map = new AMap.Map("container", {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: false,
        zoom: 17,
        pitch: 65,
        rotation: 45,
        viewMode: "3D", //开启3D视图,默认为关闭
        expandZoomRange: true,
        zoomToAccuracy: true,
        center: [116.333926, 39.997245],
        // mapStyle: "amap://styles/f83c66227b0703fd99732aa8928e6f0e"
        mapStyle: "amap://styles/34eee3392325080eabb764ca4af5f2ab"
      });
       AMap.plugin(["AMap.ControlBar"], function() {
        // 添加 3D 罗盘控制
        map.addControl(new AMap.ControlBar());
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#chart {
  width: 45%;
  background: #181b2c;
  position: absolute;
  top: 80px;
  left: 3%;
  bottom: 50px;
}
#container {
  width: 45%;
  background: #181b2c;
  position: absolute;
  top: 80px;
  right: 3%;
  bottom: 50px;
}
</style>