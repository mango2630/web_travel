<!-- 出行活跃区域统计 -->
<template>
  <div>
    <div class="set_out">
      <h2>出发地</h2>
      <div id="worldCloud" style="width:100%;height:425px;"></div>
    </div>
    <div class="destination">
      <h2>目的地</h2>
      <div id="worldCloud2" style="width:100%;height:425px;"></div>
    </div>
  </div>
</template>

<script>
// 引入词云图
import "echarts-wordcloud";
//   import worldCloud from  'word-cloud'
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
        // title: {
        //   text: "研发部邮件主题分析",
        //   x: "center",
        //   textStyle: {
        //     fontSize: 23,
        //     color: "#FFFFFF"
        //   }
        // },
        tooltip: {
          show: true
        },
        series: [
          {
            name: "研发部邮件主题分析",
            type: "wordCloud",
            sizeRange: [6, 66],
            rotationRange: [-45, 90],
            textPadding: 0,
            left: "center",

            top: "center",
            shape: "circle",
            autoSize: {
              enable: true,
              minSize: 6
            },
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160)
                    ].join(",") +
                    ")"
                  );
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: [
              {
                name: "Jayfee",
                value: 666
              },
              {
                name: "Nancy",
                value: 520
              }
            ]
          }
        ]
      };

      var JosnList = [];

      JosnList.push(
        {
          name: "Jayfee",
          value: 666
        },
        {
          name: "Nancy",
          value: 520
        },
        {
          name: "生活资源",
          value: "999"
        },
        {
          name: "供热管理",
          value: "888"
        },
        {
          name: "供气质量",
          value: "777"
        },
        {
          name: "生活用水管理",
          value: "688"
        },
        {
          name: "一次供水问题",
          value: "588"
        },
        {
          name: "交通运输",
          value: "516"
        }
      );

      option.series[0].data = JosnList;
	  this.chart = this.$echarts.init(document.getElementById("worldCloud"));
	  this.chart = this.$echarts.init(document.getElementById("worldCloud2"));
      this.chart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.set_out,
.destination {
  width: 40%;
  height: 500px;
  border: solid 1px;
  float: left;
  margin: 130px 50px;
  h2 {
    margin: 20px;
    padding-left: 20px;
	border-left: 2px solid #ffdc76;
	color: #fff;
  }
}
//  .destination{
//     width: 30%;
//     height: 500px;
//     border: solid 1px;
//  }
//  .destination{
//     width: 30%;
//     border: solid 1px;
//  }
</style>