<!-- 订单数据 -->
<template>
  <div id="container">
    <div class="num">
      <div class="num_item">
        <h5>
          <i class="el-icon-bank-card"></i>
          <span>平台总订单数</span>
        </h5>
        <p>{{ proMessage.totalCount }}</p>
      </div>
      <div class="num_item">
        <h5>
          <i class="el-icon-bank-card"></i>
          <span>平台注册用户总数</span>
        </h5>
        <p>{{ proMessage.registerTotalCount }}</p>
      </div>
      <div class="num_item">
        <h5>
          <i class="el-icon-bank-card"></i>
          <span>平台订单金额总数</span>
        </h5>
        <p>{{ proMessage.pay_all }}</p>
      </div>
      <!-- <div>平台注册用户总数</div>
      <div>平台订单金额总数</div>-->
    </div>
    <div class="active">
      <div id="chart"></div>
    </div>
    <div class="total">
      <div id="chart2"></div>
    </div>
    <div class="retention">
      <h3>留存率(百分比)</h3>
      <div class="progress">
        <div>
          <el-progress
            type="dashboard"
            :percentage="percentage"
            :color="colors"
            :stroke-width="15"
            :width="100"
          ></el-progress>
          <p>次日</p>
        </div>
        <div>
          <el-progress
            type="dashboard"
            :percentage="percentage2"
            :color="colors"
            :stroke-width="15"
            :width="100"
          ></el-progress>
          <p>本周</p>
        </div>
        <div>
          <el-progress
            type="circle"
            :percentage="percentage3"
            :color="colors"
            :stroke-width="15"
            :width="100"
          ></el-progress>
          <p>当月</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/api/request.js";
import { proData, srsData, asData, rssData } from "@/api";
export default {
  data() {
    return {
      proMessage: {
        totalCount: 0,
        registerTotalCount: 0,
        pay_all: 0,
      },
      asData: [
        {
          value: 60,
          name: "当日",
          itemStyle: { color: "#FF6600" },
        },
        {
          value: 129,
          name: "当周",
          itemStyle: { color: "#99CC33" },
        },
        {
          value: 300,
          name: "当月",
          itemStyle: { color: "#0099FF" },
        },
      ],
      rssData: [
        {
          value: 15,
          name: "当日",
          itemStyle: { color: "#FF6600" },
        },
        {
          value: 78,
          name: "当周",
          itemStyle: { color: "#99CC33" },
        },
        {
          value: 140,
          name: "当月",
          itemStyle: { color: "#0099FF" },
        },
      ],
      myChart: null,
      myChart2: null,
      //   进度条数据
      percentage: 30,
      percentage2: 60,
      percentage3: 78,
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
    };
  },
  mounted() {
    var y = 5e7;
    console.log(y);
    // this.initMap();
    // this.initChart2()
    // this.initChart()
    this.getAllData();
    console.log(this.$store.state.citycode);
    // window.AMap.ControlBar.prototype.XU = function(a, b) {
    //   console.log("a:" + a + "," + b);
    //   b = (b / 90) * 60;
    //   this.GK || (b = 0);
    //   this.g.su.style.transform = this.g.su.style.WebkitTransform =
    //     "rotateX(-" + b + "deg) rotateZ(" + a + "deg)";
    // };
  },
  methods: {
    getAllData() {
      util
        .axios({
          method: "post",
          url: "/didi/pro",
          data: {},
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.proMessage = res.data[0];
          }
        });
      // await proData({}).then((res) => {
      //   if (res.status === 200){
      //     this.proMessage = res.data[0]
      //   }
      // })
      util
        .axios({
          method: "post",
          url: "/didi/srs",
          data: {},
        })
        .then((resSrs) => {
          console.log(resSrs);
          if (resSrs.status === 200) {
            this.percentage = parseInt(
              resSrs.data[0].dayStateRate
            );
            console.log(this.percentage);
            this.percentage2 = parseInt(
              resSrs.data[0].weekStateRate
            );
            this.percentage3 = parseInt(
              resSrs.data[0].monthStateRate
            );
          }
        });
      util
        .axios({
          method: "post",
          data: {},
          url: "/didi/as",
        })
        .then((resAs) => {
          console.log(resAs);
          if (resAs.status === 200) {
            this.asData = [
              {
                value: resAs.data[0].DAU,
                name: "当日",
                itemStyle: { color: "#FF6600" },
              },
              {
                value: resAs.data[0].WAU,
                name: "当周",
                itemStyle: { color: "#99CC33" },
              },
              {
                value: resAs.data[0].MAU,
                name: "当月",
                itemStyle: { color: "#0099FF" },
              },
            ];
          }
          this.initChart();
        });
      util
        .axios({
          method: "post",
          url: "/didi/rss",
          data: {},
        })
        .then((resRss) => {
          if (resRss.status === 200) {
            this.rssData = [
              {
                value: resRss.data[0].dayNewUserCount,
                name: "当日",
                itemStyle: { color: "#FF6600" },
              },
              {
                value: resRss.data[0].weekNewUserCount,
                name: "当周",
                itemStyle: { color: "#99CC33" },
              },
              {
                value: resRss.data[0].monthNewUserCount,
                name: "当月",
                itemStyle: { color: "#0099FF" },
              },
            ];
          }
          this.initChart2();
        });
    },
    initMap() {
      //初始化地图
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
        mapStyle: "amap://styles/34eee3392325080eabb764ca4af5f2ab",
      });

      AMap.plugin(["AMap.ControlBar"], function () {
        // 添加 3D 罗盘控制
        map.addControl(new AMap.ControlBar());
      });
    },
    initChart() {
      const option = {
        title: {
          text: "活跃用户数(位)",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            var tar = params[0];
            return tar.name + "<br/>" + "位数" + " : " + tar.value;
          },
        },
        xAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "category",
          data: ["当日", "本周", "当月"],
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          axisLabel: {
            margin: 2, //刻度标签与轴线之间的距离
          },
        },
        series: [
          {
            data: this.asData,
            type: "bar",
          },
        ],
      };
      this.myChart = this.$echarts.init(document.getElementById("chart"));
      this.myChart.setOption(option);
    },
    initChart2() {
      const option = {
        title: {
          text: "注册用户数(位)",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            var tar = params[0];
            return tar.name + "<br/>" + "位数" + " : " + tar.value;
          },
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          data: ["当日", "本周", "当月"],
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          axisLabel: {
            margin: 2,
            formatter: function (value, index) {
              // if (value >= 10000 && value < 10000000) {
              //     value = value / 1000 + "k";
              // } else if (value >= 10000000) {
              //     value = value / 1000000 + "k";
              // }
              value = value / 1000 + "k";
              return value;
            },
          },
        },
        // grid: {
        //   left: 35
        // },
        series: [
          {
            data: this.rssData,
            type: "bar",
          },
        ],
      };
      this.myChart2 = this.$echarts.init(document.getElementById("chart2"));
      this.myChart2.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
  // overflow-y: scroll
}
h3 {
  padding: 15px;
}
.num {
  // margin-top: 80px;
  position: absolute;
  top: 80px;
  left: 0;
  z-index: 999;
  color: #fff;
  //   border: solid 1px;
  opacity: 0.8;
  h5 span {
    padding-left: 20px;
  }
  p {
    padding: 10px 0 0 30px;
    font-size: 20px;
  }
}
.num > div {
  margin: 20px;
  float: left;
}
.active {
  width: 20%;
  // height: 300px;
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 999;
  color: #fff;
  opacity: 0.8;
  // border: solid 1px;
  #chart {
    width: 300px;
    height: 300px;
  }
}
.total {
  width: 27%;
  position: absolute;
  top: 80px;
  right: 0;
  z-index: 999;
  opacity: 0.8;
  // border: solid 1px;
  color: #fff;
  #chart2 {
    width: 310px;
    height: 300px;
    // background: #ccc;
  }
}
.retention {
  width: 30%;
  height: 200px;
  position: absolute;
  bottom: 50px;
  right: 0;
  z-index: 999;
  color: #fff;
  opacity: 0.8;
  //   border: solid 1px;
  .progress {
    div {
      float: left;
      padding: 7px;
    }
    p {
      text-align: center;
    }
  }
}
</style>