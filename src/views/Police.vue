<!-- 疲劳驾驶报警 -->
<template>
  <div id="container"></div>
</template>

<script>
export default {
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const option = {
        xAxis: {
          
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#fff", //边线的颜色
              width: "2" //坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: "#fff" //坐标值得具体的颜色
            }
          },
          type: "category",
            // splitLine:{show: false},//去除网格线
          // splitArea : {show : true},//保留网格区域
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          axisLine: {
            type: "value",
            lineStyle: {
              type: "solid",
              color: "#fff",
              width: "2"
            }
          },
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            // lineStyle:{
            //    normal:{
            //        color:'#68B3B6'
            //    }
            // },
            itemStyle: {
              normal: {
                color: "#68B3B6", //改变折线点的颜色
                lineStyle: {
                  color: "#68B3B6" //改变折线颜色
                }
              }
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      };
      this.chart = this.$echarts.init(document.getElementById("container"));
      this.chart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
  width: 80%;
  height: 600px;
  //   border: solid 1px;
  margin: 50px auto;
}
</style>