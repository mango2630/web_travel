<!-- 订单监控 -->
<template>
  <div style="width:100%;height:100%;color:#fff">
    <div id="chart"></div>
  </div>
</template>

<script>
// import "echarts/map/js/china.js";
import $axios from 'axios';
import jquery from 'jquery'
export default {
  data() {
    return {
      proMessage: {},
      percentage: 10,
      percentage1: 50,
      percentage2: 70,
      percentage3: 40,
      options:{},
      citycode: '',
      wuhanOptions:{},
      chengduOptions:{},
      xianOptions:{},
      haikouOptions:{},
      resultData:{},
      colors: [
        { color: "#f56c6c", percentage: 10 },
        { color: "#e6a23c", percentage: 20 },
        { color: "#5cb87a", percentage: 30 },
        { color: "#1989fa", percentage: 40 },
        { color: "#6f7ad3", percentage: 50 },
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ],
      myChart: null,
      list: ["列表1", "列表1", "列表1", "列表1", "列表1", "列表1"]
    };
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
          console.log(oldVal)
          this.getRightOrder(curVal)
          if(curVal === '420100'){
            this.$axios.get('api/region').then((res) => {
              this.options = res.data.data
              this.initChart();
            }, function(err) {
              console.log(err)
            })
          }
        },
        deep:true
      },
  },
  methods: {
    getMapData(){
      // this.util.axios({
      //   method: 'post',
      //   url: 'http://localhost:8080/track/virtualStations',
      //   data: {cityCode:"83"}
      // }).then((res) => {
      //   if(res.status === 200){
          // this.initChart()
        // }else{
        //   this.$message({
        //     message: '警告哦，这是一条警告消息',
        //     type: 'warning'
        //   });
        // }
        // console.log(res)
        // res.data.data.forEach(item => {
        //   this.mapData.push(
        //     [item.startingLng, item.startingLat]
        //   )
        // })
        // this.initMap(this.mapData);
      // })
    },
    initChart() {
      // 基于准备好的dom，初始化echarts图表
      this.myChart = this.$echarts.init(document.getElementById("chart"));
       this.$echarts.registerMap('haikou', this.haikouOptions);
      this.myChart.hideLoading();
      var geoCoordMap = {
          '龙华区': [110.3419,19.7777],
            '美兰区': [110.5000,19.9834],
          '琼山区': [110.527,19.6000],
          '秀英区': [110.187,20.018145],
      }

      var goData = [
          [{
              name: '龙华区'
          }, {
              id: 1,
              name: '美兰区',
              value: 4352
          }],
          [{
              name: '琼山区'
          }, {
              id: 2,
              name: '秀英区',
              value: 1765
          }],
          [{
              name: '美兰区'
          }, {
              id: 1,
              name: '秀英区',
              value: 5910
          }],
      ];

      //值控制圆点大小
      var backData = [
          [{
              name: '美兰区'
          }, {
              id: 1,
              name: '龙华区',
              value: 3653
          }],
          [{
              name: '秀英区'
          }, {
              id: 2,
              name: '琼山区',
              value: 6753
          }],
          [{
              name: '秀英区'
          }, {
              id: 1,
              name: '美兰区',
              value: 6785
          }],
      ];

      var arcAngle = function(data) {
      var j, k;
      for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          if (dataItem[1].id == 1) {
              j = 0.2;
              return j;
          } else if (dataItem[1].id == 2) {
              k = -0.2;
              return k;
          }
        }
      }
      var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
      var convertData = function(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (dataItem[1].id == 1) {
                    if (fromCoord && toCoord) {
                        res.push([{
                            coord: fromCoord,
                        }, {
                            coord: toCoord,
                            value: dataItem[1].value //线条颜色

                        }]);
                    }
                } else if (dataItem[1].id == 2) {
                    if (fromCoord && toCoord) {
                        res.push([{
                            coord: fromCoord,
                        }, {
                            coord: toCoord
                        }]);
                    }
                }
            }
            return res;
        };

        var color = ['#3ed4ff', '#ffa022', '#a6c84c'];
        var series = [];
        [
            ['1', goData],
            ['2', backData]
        ].forEach(function(item, i) {
            series.push({
                name: item[0],
                type: 'lines',
                zlevel: 2,
                //线特效配置
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.1,
                    symbol: planePath, //标记类型
                    symbolSize: 20
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1,
                        opacity: 0.4,
                        curveness: arcAngle(item[1]), //弧线角度
                        color: '#fff'
                    }
                },
                data: convertData(item[1])
            }, {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                //波纹效果
                rippleEffect: {
                    period: 2,
                    brushType: 'stroke',
                    scale: 3
                },
                label: {
                    normal: {
                        show: true,
                        color: '#fff',
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                //终点形象
                symbol: 'circle',
                //圆点大小 动态更改
                // symbolSize: function(val) {
                //     return val[2] / 8;
                // },
                symbolSize: 29,
                // color: '#009FD9',
                itemStyle: {
                    normal: {
                        show: true
                    }
                },
                data: item[1].map(function(dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })

            });

        });
      const option = {
        backgroundColor: "#1b1b1b",
        tooltip: {
            trigger: 'item',
            formatter: '{b}'
            // formatter: function(params) {
            //     //鼠标悬浮显示站点数
            //     var res = "";
            //     var name = params.data.name;
            //     var value = params.data.value[2];
            //     res = "<span style='color:#fff;'>" + name + "</span><br/>站点数：" + value;
            //     return res;
            // }
        },
        //线颜色及飞行轨道颜色
        visualMap: {
            show: false,
            min: 0,
            max: 100,
            color: ['#009FD9', '#009FD9', '#000000'] //更改圆圈的颜色
        },
        //地图相关设置
        geo: {
            map: 'haikou',
            //视角缩放比例
            zoom: 1,
            //显示文本样式
            label: {
                normal: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                },
                emphasis: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            //鼠标缩放和平移
            roam: true,
            itemStyle: {
                normal: {
                    //          	color: '#ddd',
                    borderColor: 'rgba(147, 235, 248, 1)',
                    borderWidth: 1,
                    areaColor: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(	47,79,79, .2)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(128, 217, 248, 1)',
                    // shadowColor: 'rgba(255, 255, 255, 1)',
                    shadowOffsetX: -2,
                    shadowOffsetY: 2,
                    shadowBlur: 10
                },
                emphasis: {
                    areaColor: '#389BB7',
                    borderWidth: 0
                }
            }
        },
        series: series
      };
      // 为echarts对象加载数据
      this.myChart.setOption(option);
    }
  },
  mounted() {
    this.$store.dispatch('setCityStatus', true)
    this.citycode = this.$store.state.citycode
    this.$nextTick(()=>{})
    this.getMapData()
  },
  created(){
    console.log(this.$store.state.cityCode)
    // this.$axios.get('api/region').then((res) => {
    //   this.options = res.data.data
    // }, function(err) {
    //   console.log(err)
    // })
    // this.$axios.get('/api/wuhan').then((ress) => {
    //   this.wuhanOptions = ress.data.data
    // }, function(err) {
    //   console.log(err)
    // })
    // this.$axios.get('/api/xian').then((resxian) => {
    //   this.xianOptions = resxian.data.data
    // }, function(err) {
    //   console.log(err)
    // })
    this.$axios.get('/js/haikou.json').then((reshaikou) => {
      this.haikouOptions = reshaikou.data
      this.initChart();
    }, function(err) {
      console.log(err)
    })
    // this.$axios.get('/api/chengdu').then((reschengdu) => {
    //   this.chengduOptions = reschengdu.data.data
    // }, function(err) {
    //   console.log(err)
    // })
  }
};
</script>
<style lang="less" scoped>
#chart {
  width: 100%;
  height: 100%;
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

.retention {
  width: 22%;
  height: 200px;
  position: absolute;
  top: 15%;
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
