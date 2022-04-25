<!-- 概览 -->
<template>
  <div id="container">
    <div class="left">
      <div class="order_info">
      <h2>订单概况</h2>
        <ul>
          <li><i class="el-icon-document"></i>订单总数: {{orderOverview.orderCount}}</li>
          <li><i class="el-icon-user-solid"></i>乘车人数: {{orderOverview.orderPassengerCount}}</li>
          <li><i class="el-icon-location"></i>累计轨迹点数: {{pointsCount}}</li>
          <!-- <li>疲劳报警: {{orderOverview.fatigueAlarmCount}}</li> -->
        </ul>
      </div>
      <div class="order_count">
        <h2>
          订单数量变化
          <p  @click="open()">详情</p></h2>
          <div id="myChartOne"></div>
      </div>

      <!-- <div class="warn">
        <h2>疲劳报警</h2>
        <h3>TOP 10</h3>
        <ul>
          <li>xxx1 司机 22h</li>
          <li>xxx2 司机 22h</li>
          <li>xxx3 司机 22h</li>
          <li>xxx4 司机 22h</li>
          <li>xxx5 司机 22h</li>
        </ul>
      </div> -->
    </div>

    <div class="right">
      <div class="speed">
      <h2>平均行车速度</h2>
        <div id="myChartThree"></div>
      </div>
      <!-- <div class="right_two">
        <h2>拥堵概览</h2>
        <div class="chart">
          <div id="myChartFour"></div>
          <div id="myChartFive"></div>
        </div>
        <div class="info_list">
          <h3>TOP 10</h3>
          <ul>
            <li>xxxxxxxxxxxxxxxxxxxxx街道</li>
            <li>xxxxxxxxxxxxxxxxxxxxx街道</li>
            <li>xxxxxxxxxxxxxxxxxxxxx街道</li>
            <li>xxxxxxxxxxxxxxxxxxxxx街道</li>
            <li>xxxxxxxxxxxxxxxxxxxxx街道</li>
            <li>xxxxxxxxxxxxxxxxxxxxx街道</li>
            <li>xxxxxxxxxxxxxxxxxxxxx街道</li>
          </ul>
        </div>
      </div> -->
    </div>
    <!-- 日期控件 -->
    <!-- <div class="date">
      <el-date-picker
        class="aaa"
        v-model="startTime"
        type="datetime"
        placeholder="选择开始时间"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="changeDate(startTime)"
      ></el-date-picker>
    </div> -->

    <!-- 详情弹框 -->
    <el-dialog title="详情" width=70% :visible.sync="dialogTableVisible">
      <div id="myChartTwo" style="width:100%;height:300px;z-index:999"></div>
    </el-dialog>
  </div>
</template>

<script>
import { orderOverview, orderGps, hourOrderCount } from "@/api";
export default {
  data() {
    return {
      nowCity: 510100,
      dialogTableVisible: false,
      orderOverview: {
        orderCount: 0,
        orderPassengerCount: 0
      }, //订单概况
      orderGps: [], //实时轨迹
      markers: [],
      pointsCount: 1032,
      // new Date("2016-11-01 15:00:00") ||
      startTimeDate: "",
      endTime: "",
      endTimeDate: null,
      startTime: "2016-11-01 10:06:14",
      t: 0,
      icon: {
        type: "image",
        image: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        size: [6, 9],
        anchor: "bottom-center",
        angel: 0,
        retina: true
      },
      ellipseMarker: null,
      map: null,
      layer: null,
      myChart: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
      myChart5: null,
      hourOrderCount: {},
      keyData: [],
       keyData2: [],
      itemData: [],
      realtimeTrackInterval: '',
    };
  },
  async created() {
    // 格式化日期
    Date.prototype.format = function(fmt) {
      //author: meizz
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    };
    this.t = new Date(this.startTime).getTime();
    this.t += 120000;
    this.endTimeDate = new Date(this.t);
    this.endTime = this.endTimeDate.format("yyyy-MM-dd hh:mm:ss");
    // this.startTime = this.startTimeDate.format("yyyy-MM-dd hh:mm:ss");
    // this.t = this.startTimeDate.getTime();
    // this.t += 120000;
    // this.endTimeDate = new Date(this.t);
    // this.endTime = this.endTimeDate.format("yyyy-MM-dd hh:mm:ss");
    //  console.log("this.startTime",this.startTime)
    // 请求订单数
    // this.getOrderOverview();
    // await this.getHourOrderCount();
    // var realtimeTrackInterval = window.setInterval(this.realtimeTrack,5000);
  },
  computed: {
      listenshowpage1() {
        return this.$store.state.citycode;
      }
  },
    watch:{
      listenshowpage1:{
        handler(curVal,oldVal){
          console.log(curVal)
          window.clearInterval(this.realtimeTrackInterval)
          window.clearInterval(this.realtimeTrackInterval1)
          window.clearInterval(this.realtimeTrackInterval2)
          this.changeCity(curVal)
        },
        deep:true
      },
  },
  destroyed() {
    //离开路由之后断开定时任务
    window.clearInterval(this.realtimeTrackInterval)
    window.clearInterval(this.realtimeTrackInterval1)
    window.clearInterval(this.realtimeTrackInterval2)
  },
  mounted() {
    this.getHourOrderCount(this.nowCity)
    this.getOrderOverview(this.nowCity);
    // this.realtimeTrack(this.nowCity)
    // this.initChart()
    this.initChart3()
    this.initMap();
    // this.initChart3();
    // this.initChart4();
    // this.initChart5();
    console.log("设置正北方向......");
    // window.AMap.ControlBar.prototype.XU = function(a, b) {
    //   console.log("a:" + a + "," + b);
    //   b = (b / 90) * 60;
    //   this.GK || (b = 0);
    //   // this.g.su.style.transform = this.g.su.style.WebkitTransform =
    //   //   "rotateX(-" + b + "deg) rotateZ(" + a + "deg)";
    // };
    // console.log("map.ControlBar:" + this.map);

    // this.realtimeTrackInterval = window.setInterval(this.realtimeTrack(this.nowCity), 5000);
    // this.realtimeTrackInterval1 = window.setInterval(this.getHourOrderCount(this.nowCity), 5000);
    // this.realtimeTrackInterval2 = window.setInterval(this.getOrderOverview(this.nowCity), 5000);
  },
  methods: {
    //更换城市
    changeCity(data){
      var data = data
      this.realtimeTrack(data)
      this.getHourOrderCount(data)
      this.getOrderOverview(data)
      // this.realtimeTrackInterval = window.setInterval(this.realtimeTrack(data), 5000);
      // this.realtimeTrackInterval1 = window.setInterval(this.getHourOrderCount(data), 5000);
      // this.realtimeTrackInterval2 = window.setInterval(this.getOrderOverview(data), 5000);
    },
    open (){
      let b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
      this.dialogTableVisible = true
      console.log('sxsxsxsxsxsssss')
      console.log(this.hourOrderCount)
      for (let key in this.hourOrderCount){
        console.log(key)
        console.log('+++++')
        b.splice(parseInt(key.split("-")[2].split("_")[1]) - 1,1,parseInt(this.hourOrderCount[key]));
      }
      var a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,]
      console.log(b)
      this.$nextTick(() => {
        this.initChart2(a,b)
      })
    },
    // 开始日期
    changeDate(startTimeDate) {
      console.log(startTimeDate);
      // this.startTime = startTimeDate.format("yyyy-MM-dd hh:mm:ss");
      // console.log("this.startTime",this.startTime)
      this.getOrderOverview(this.nowCity);
      this.changeCity(this.nowCity)
      // console.log("value", value);
    },
    // 请求订单数
    getOrderOverview(data) {
      this.util.axios({
        method: 'post',
        url: '/track/orderOverview',
        data: {
          "cityCode":data,
          "startTime":"2016-10-10  00:00:00",
          "endTime":"2016-10-10  23:00:00"
        }
      }).then((res) => {
        if(res.data.data === null){
          this.orderOverview = {
            orderCount: 0,
            orderPassengerCount: 0
          }
        }else{
           this.orderOverview = res.data.data;
        }
      })
      // const {
      //   status,
      //   data: { data }
      // } = await orderOverview({
      //   cityCode: "075",
      //   startTime: this.startTime,
      //   endTime: "2016-11-01 23:38:14"
      //   // endTime: "2017-05-19 15:06:20"
      // });
      // if (status === 200) {
      //   this.orderOverview = data;
      // }
    },
    // 获取订单数量变化
    async getHourOrderCount(data) {
      this.hourOrderCount = []
      this.keyData= []
      this.itemData = []
      this.keyData2 = []
      this.util.axios({
        method: 'post',
        url: '/track/hourOrderCount',
        data: {
          "cityCode":data,
          "startTime":"2016-10-10  00:00:00",
          "endTime":"2016-10-10  23:00:00"
          }
        }).then((ret) => {
          console.log('订单详情')
          console.log(ret)
          this.hourOrderCount = ret.data.data
          for (const item in this.hourOrderCount) {
          this.keyData.push(item);
        }
        this.keyData.sort();
        for (let index in this.keyData) {
          this.itemData.push(this.hourOrderCount[this.keyData[index]]);
        }
        for (let i = 0; i < this.keyData.length; i++) {
          this.keyData2.push(this.keyData[i].split("-")[2].split("_")[1]);
        }
        console.log(this.itemData)
        console.log(this.keyData2)
        this.initChart()
      })
    },
    // 获取当前城市的实时轨迹
    // realtimeTrack(data) {
    //   console.log("realtimeTrack:请求实时轨迹");
    //   this.util.axios({
    //     method: 'post',
    //     url: 'http://localhost:8080/track/orderGps',
    //     data: {
    //       "cityCode":data,
    //       "startTime":"2017-05-19 01:09:12",
    //       "endTime":"2017-05-19 23:59:59"
    //     }
    //   }).then((ret) => {
    //     if (ret.data.data === null || ret.data.data.length === 0){
    //       this.drawCircleMarker(0);
    //       this.pointsCount = 0;
    //       this.startTime = this.endTime;
    //       this.endTimeDate = new Date(this.endTime);
    //       this.t = this.endTimeDate.getTime();
    //       this.t += 120000;
    //       this.endTimeDate = new Date(this.t);
    //       this.endTime = this.endTimeDate.format("yyyy-MM-dd hh:mm:ss");
    //     } else{
    //       this.drawCircleMarker(ret.data.data);
    //       this.pointsCount = this.pointsCount + ret.data.data.length;
    //       this.startTime = this.endTime;
    //       this.endTimeDate = new Date(this.endTime);
    //       this.t = this.endTimeDate.getTime();
    //       this.t += 120000;
    //       this.endTimeDate = new Date(this.t);
    //       this.endTime = this.endTimeDate.format("yyyy-MM-dd hh:mm:ss");
    //     }
    //   })
    // },
    initMap() {
      //初始化地图
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: false,
        zoom: 17,
        pitch: 65,
        rotation: 45,
        viewMode: "3D", //开启3D视图,默认为关闭
        expandZoomRange: true,
        zoomToAccuracy: true,
        center: [104.082214, 30.673637],
        // mapStyle: "amap://styles/f83c66227b0703fd99732aa8928e6f0e"
        mapStyle: "amap://styles/34eee3392325080eabb764ca4af5f2ab"
      });

      AMap.plugin(["AMap.ControlBar"], () => {
        // 添加 3D 罗盘控制
        this.map.addControl(new AMap.ControlBar());
      });

      this.layer = new AMap.LabelsLayer({
        zooms: [3, 20],
        zIndex: 1000,
        // 关闭标注避让，默认为开启，v1.4.15 新增属性
        animation: false,
        // 关闭标注淡入动画，默认为开启，v1.4.15 新增属性
        collision: false
      });
      this.map.add(this.layer);
    },
    initChart() {
      const option = {
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#6f7ad3", //边线的颜色
              width: "2" //坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: "#6f7ad3" //坐标值得具体的颜色
            },
            formatter:'{value} 时'
          },
          type: "category",
          boundaryGap: false,
          data: this.keyData2
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#6f7ad3", //边线的颜色
              width: "2" //坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: "#6f7ad3" //坐标值得具体的颜色
            },
            margin: 2,
            formatter: '{value} 个'
          },
          type: "value",
        },
        series: [
        {
          name:'订单数量',
          type:'line',
          stack: '总量',
          areaStyle: {
            normal: {
              color: '#009FD9' //改变区域颜色
            }
          },
          itemStyle : {
            normal : {
              color:'#00a0ea', //改变折线点的颜色
              lineStyle:{
                color:'#253A5D' //改变折线颜色
              }
            }
          },
          data: this.itemData
          }
        ]
      };

      this.myChart = this.$echarts.init(document.getElementById("myChartOne"));
      this.myChart.setOption(option);
    },
    initChart2(a,b) {
      const option = {
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#6f7ad3", //边线的颜色
              width: "2" //坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: "#6f7ad3" //坐标值得具体的颜色
            },
            interval:0,
            formatter:'{value} 时'
          },
          type: "category",
          boundaryGap: false,
          data: a
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#6f7ad3", //边线的颜色
              width: "2" //坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: "#6f7ad3" //坐标值得具体的颜色
            },
            margin: 2,
            formatter: '{value} 个'
          },
          type: "value",
        },
        series: [
        {
          name:'订单数量',
          type:'line',
          stack: '总量',
          areaStyle: {
            normal: {
              color: '#009FD9' //改变区域颜色
            }
          },
          itemStyle : {
            normal : {
              color:'#00a0ea', //改变折线点的颜色
              lineStyle:{
                color:'#253A5D' //改变折线颜色
              }
            }
          },
          data: b
          }
        ]
      };

      this.myChart2 = this.$echarts.init(document.getElementById("myChartTwo"));
      this.myChart2.setOption(option);
    },
    initChart3() {
      const option = {
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#fff", //边线的颜色
              width: "1" //坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: "#fff" //坐标值得具体的颜色
            }
          },
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三","周四","周五"]
        },
        yAxis: {
          axisLine: {
            type: "value",
            lineStyle: {
              type: "solid",
              color: "#fff",
              width: "1"
            }
          },
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          type: "value"
        },
        series: [
          {
            name: "行车速度",
            type: "line",
            stack: "总量",
            itemStyle : {
              normal : {
              color:'#00a0ea', //改变折线点的颜色
              lineStyle:{
              color:'#009FD9' //改变折线颜色
              }
              }
              },
            data: [120, 132, 101,123,134]
          },
          // {
          //   name: "联盟广告",
          //   type: "line",
          //   stack: "总量",
          //   data: [220, 182, 191]
          // },
          // {
          //   name: "视频广告",
          //   type: "line",
          //   stack: "总量",
          //   data: [150, 232, 201]
          // }
        ]
      };
      this.myChart = this.$echarts.init(
        document.getElementById("myChartThree")
      );
      this.myChart.setOption(option);
    },
    initChart4() {
      const option = {
        // tooltip: {
        //   trigger: "item",
        //   formatter: "{a} <br/>{b}: {c} ({d}%)"
        // },
        // legend: {
        //   orient: "vertical",
        //   x: "left",
        //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        // },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      };
      this.myChart = this.$echarts.init(document.getElementById("myChartFour"));
      this.myChart.setOption(option);
    },
    initChart5() {
      const option = {
        tooltip: {},
        dataset: {
          source: [
            ["1", 43.3, 85.8],
            ["2", 83.1, 73.4],
            ["3", 86.4, 65.2],
            ["4", 72.4, 53.9]
          ]
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }]
      };

      this.myChart = this.$echarts.init(document.getElementById("myChartFive"));
      this.myChart.setOption(option);
    },
    drawCircleMarker(points) {
      this.markers = [];
      for (var i = 0; i < points.length; i++) {
        var curPosition = points[i].lnglat;
        var curData = {
          position: curPosition,
          icon: this.icon
        };
        var labelMarker = new AMap.LabelMarker(curData);

        this.markers.push(labelMarker);
      }
      this.layer.add(this.markers);
    }
  }
};
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  height: 100%;
  h2 {
    font-size: 16px;
    color: #fff;
    // margin: 15px;
    margin: 15px 0 15px 15px;
    padding-left: 15px;
    border-left: solid 3px #ffdc76;
    font-weight: 500;
  }
  h3 {
    font-size: 20px;
    font-weight: 300;
    padding: 20px 0 10px 30px;
  }
}
.left {
  width: 40%;
  height: 90%;
  // border: solid 1px #fff;
  position: absolute;
  top: 70px;
  left: 0;
  color: #fff;
  z-index: 999;

  .order_info {
    height: 26%;
    background: #181b2c;
    // background: #ccc;
    opacity: 0.8;
    padding: 1px;
    ul li {
      list-style: outside;
      color: #009FD9;
      margin-left: 30px;
      margin-top: 10px;
      font-size: 18px;
      line-height: 20px;
      i {
        margin-right: 10px
      }
    }
  }

  .order_count {
    height: 60%;
    background: #181b2c;
    // background: #ccc;
    opacity: 0.8;
    padding: 1px;
    margin-top: 70px;
    h2 {
      margin-top: 10px;
      p {
        cursor: pointer;
        color: green
      }
    }
  }
  #myChartOne,
  #myChartTwo {
    width: 100%;
    height: 250px;
    // margin-top: 5px;
    background: #181b2c;
    // background:#f00;
    opacity: 0.8;
  }
  .warn {
    height: 33%;
    margin-top: 10px;
    background: #181b2c;
    // background: #0f0;
    opacity: 0.8;
    padding: 1px;

    ul li {
      font-size: 12px;
      line-height: 20px;
      margin-left: 30px;
    }
  }
}
.right {
  width: 40%;
  height: 90%;
  position: absolute;
  top: 270px;
  right: 0;
  color: #fff;
  z-index: 999;
  .speed {
    height: 60%;
    width: 100%;
    background: #181b2c;
    // background: #ccc;
    opacity: 0.8;
    padding: 1px;
    margin-top: 10px;
    h2 {
      margin-top: 10px;
      p {
        cursor: pointer;
        color: green
      }
    }
  }
  // border: solid 1px #fff;
  #myChartThree {
    height: 250px;
    background: #181b2c;
    // background: #f00;
    opacity: 0.8;
  }
  .right_two {
    height: 65%;
    margin-top: 10px;
    padding: 1px;
    background: #181b2c;

    opacity: 0.8;
    .chart {
      height: 40%;
      #myChartFour,
      #myChartFive {
        width: 50%;
        height: 100%;
        float: left;
        // background: #0f0;
      }
    }
    .info_list {
      height: 47%;
      // background: #ccc;
      ul li {
        // height: 60%;
        text-align: center;
        font-size: 12px;
        line-height: 20px;
        // background: #ccc;
      }
    }
  }
}

.date {
  position: absolute;
  top: 80px;
  left: 50%;
  margin-left: -110px;
  z-index: 999;
  background: #181b2c;
  opacity: 0.8;
}

// .aaa{
//   background: #f00;
// }
</style>
