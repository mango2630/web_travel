<!-- 订单监控 -->
<template>
  <div style="width:100%;height:100%;color:#fff" id="container">
    <div class="num">
      <div class="num_item">
        <h5>
          <i class="el-icon-bank-card"></i>
          <span>平台总订单数</span>
        </h5>
        <p>{{proMessage.totalCount}}</p>
      </div>
      <div class="num_item">
        <h5>
          <i class="el-icon-bank-card"></i>
          <span>平台注册用户总数</span>
        </h5>
        <p>{{proMessage.registerTotalCount}}</p>
      </div>
      <div class="num_item">
        <h5>
          <i class="el-icon-bank-card"></i>
          <span>平台订单金额总数</span>
        </h5>
        <p>{{proMessage.pay_all}}</p>
      </div>
      <!-- <div>平台注册用户总数</div>
      <div>平台订单金额总数</div>-->
    </div>
    <div class="retention">
      <h3>订单完成率</h3>
      <div class="progress">
        <div>
          <el-progress
            type="dashboard"
            :percentage="percentage"
            color="#f56c6c"
            :stroke-width="15"
            :width="100"
          ></el-progress>
          <p>日均订单数</p>
        </div>
        <div>
          <el-progress
            type="dashboard"
            :percentage="percentage1"
            color="#e6a23c"
            :stroke-width="15"
            :width="100"
          ></el-progress>
          <p>周订单数</p>
        </div>
        <div>
          <el-progress
            type="circle"
            :percentage="percentage2"
            color="#5cb87a"
            :stroke-width="15"
            :width="100"
          ></el-progress>
          <p>月订单数</p>
        </div>
        <div>
          <el-progress
            type="circle"
            :percentage="percentage3"
            color="#6f7ad3"
            :stroke-width="15"
            :width="100"
          ></el-progress>
          <p>订单累计里程总数</p>
        </div>
      </div>
    </div>
    <!-- <div id="chart"></div> -->
    <div style="backgroundColor:#1b1b1b" ></div>
  </div>
</template>

<script>
// import "echarts/map/js/china.js";
import $axios from 'axios';
import jquery from 'jquery'
export default {
  data() {
    return {
      proMessage: {
        totalCount: 0, 
        registerTotalCount: 0,
        pay_all: 0
      },
      percentage: 0,
      percentage1: 0,
      percentage2: 0,
      percentage3: 0,
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
    initMap(data) {
      console.log('-====')
      console.log(data)
      var map = new AMap.Map("container", {
        center: [114.374025,30.874155], //设置中心点
        resizeEnable: true,
        zoom: 9,
        mapStyle: 'amap://styles/dark'
      });
      //  map.setMapStyle('amap://styles/dark')
       var preIcon, clickIcon, cluster, markers = [], lnglats =
       [
        [114.374025,30.874155],
        [114.802108,30.842149],
        [114.30304,30.594911],
        [114.029341,30.582186],
        [114.08124,30.309637],
        [114.283109,30.578771],
        [114.39707,30.634215],
        [114.307344,30.546536],
        [114.313961,30.349045],
        [114.400718,30.504259],
        [114.142483,30.622467],
        [114.264568,30.57061],
        [114.265807,30.549326]];
        for(var i=0;i<lnglats.length;i+=1){
                var text = new AMap.Text({
                    text:' ',
                    textAlign:'center',
                    verticalAlign:'middle', //middle 、bottom
                    draggable:false, //数据是否可拖动 
                    cursor:'pointer',
                    angle:10, //点标记的旋转角度支持IE9及以上版本
                    style:{
                        'width': '10px',
                        'height': '10px',
                        'border-radius': '50%',
                        'border-width': 0,
                        'text-align': 'center',
                        'font-size': '12px',
                        'color': 'blue',
                        'background-color':'#009FD9',
                        '-moz-box-shadow': '0px 0px 20px 2px  #009FD9',
                        'box-shadow': '0px 0px 20px 2px #009FD9',
                        '-webkit-box-shadow':'0 0 20px, 20px #009FD9',
                        'position':'absoult',  
                        'animation':'myfirst 1s ease-out',
                        'animation-iteration-count': 'infinite',
                        'animation-delay': '1.1s'
                    },
                    position: lnglats[i]
                })
                text.setMap(map);
                text.resumeMove(map);
            }
        
    //鼠标点击事件,设置地图中心点及放大显示级别
    function resetMap(e) {
      console.log(e)
         console.log("您模拟触发了地图click事件!");
            new AMap.InfoWindow({
                content:'模拟事件触发',
            }).open(map,e.lnglat)
        // map.setZoomAndCenter(11, e.target.getPosition());
        
        for (var i = 0; i < markers.length; i++) {
            markers[i].setIcon(preIcon);
        }
 
        e.target.setIcon(clickIcon);
 
    }

      //   AMap.plugin(["AMap.ControlBar"], function() {
      // // 添加 3D 罗盘控制
      //     map.addControl(new AMap.ControlBar());
      //   });

      // 创建纯文本标记
      // var text = new AMap.Text({
      //   text: "5个",
      //   anchor: "center", // 设置文本标记锚点
      //   draggable: true,
      //   cursor: "pointer",
      //   // angle: 10,
      //   style: {
      //     padding: ".2rem 1.25rem",
      //     "margin-bottom": "1rem",
      //     "border-radius": ".25rem",
      //     "background-color": "white",
      //     width: "3rem",
      //     "border-width": 0,
      //     "box-shadow": "0 2px 6px 0 rgba(114, 124, 245, .5)",
      //     "text-align": "center",
      //     "font-size": "20px",
      //     color: "blue"
      //   },
      //   position: [116.333926, 39.997245]
      // });

      // text.setMap(map);
    },
    getMapdata (){
      this.util.axios({
        method: 'get',
        url: '/didi/hars',
        params: {address_code: '420100'}
      }).then(res =>{
        console.log('地图数据')
        console.log(res)
      })
    },
    getTitleData (){
      this.util.axios({
        method:"post",
        url:"/didi/pro",
        data:{},
      }).then(res=>{
        console.log(res)
        if(res.status === 200){
           this.proMessage = res.data[0]
        }
      }) 
      //  await proData({}).then((res) => {
      //   if (res.status === 200){
      //     this.proMessage = res.data[0]
      //   }
      // })
    },
    getRightOrder(data){
      console.log(data)
      let cityname = ''
      if (data === '420100') {
        cityname = '湖北省武汉市'
      } else if (data === '510100'){
        cityname = '四川省成都市'
      }  else if(data === '610100'){
        cityname = '陕西省西安市'
      } else if(data === '460100'){
        cityname = '海南省海口市'
      }
      this.util.axios({
        method: 'post',
        data:{},
        url: '/didi/fspos1'
      }).then(res =>{
        this.resultData = res.data[0]
        this.percentage = parseInt((this.resultData._year_comple_rate))
        this.percentage1 = parseInt((this.resultData._week_comple_rate))
        this.percentage2 = parseInt((this.resultData._month_comple_rate))
        this.percentage3 = parseInt((this.resultData._quarter_comple_rate))
      })
    },
    initChart() {
      // 基于准备好的dom，初始化echarts图表
      this.myChart = this.$echarts.init(document.getElementById("chart"));
       this.$echarts.registerMap('wuhan', this.wuhanOptions);
      this.myChart.hideLoading();
      var geoCoordMap = {
          '黄陂区': [114.374025,30.874155],
            '新洲区': [114.802108,30.842149],
          '江岸区': [114.30304,30.594911],
          '蔡甸区': [114.029341,30.582186],
        '汉南区': [114.08124,30.309637],
          '江汉区': [114.283109,30.578771],
          '青山区': [114.39707,30.634215],
          '武昌区': [114.307344,30.546536],
          '江夏区': [114.313961,30.349045],
          '洪山区': [114.400718,30.504259],
          '东西湖区': [114.142483,30.622467],
          '硚口区': [114.264568,30.57061],
          '汉阳区': [114.265807,30.549326],
      }
      var data =  [
              {
                  name: '黄陂区',
                  value: 85
              },
              {
                  name: '新洲区',
                  value: 70
              }, {
                  name: '江岸区',
                  value: 75
              }, {
                  name: '蔡甸区',
                  value: 80
              }, {
                  name: '汉南区',
                  value: 78
              }, {
                  name: '江汉区',
                  value: 77
              }, {
                  name: '青山区',
                  value: 79
              }, {
                  name: '武昌区',
                  value: 85
              }, {
                  name: '江夏区',
                  value: 81
              }, {
                  name: '洪山区',
                  value: 83
              },{
                  name: '东西湖区',
                  value: 50
              },{
                  name: '硚口区',
                  value: 65
              },{
                  name: '汉阳区',
                  value: 89
              }
              ];

      var convertData = function(data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
              var geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {
                  res.push({
                      name: data[i].name,
                      value: geoCoord.concat(data[i].value)
                  });
              }
          }
          return res;
      };

      const option = {
        backgroundColor: "#1b1b1b",
        tooltip: {
            trigger: 'item',
            backgroundColor: '#09bdb1',
            borderColor: '#FFFFCC',
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: 'z-index:100',
            formatter: function(params, ticket, callback) {
                //根据业务自己拓展要显示的内容
                var res = "";
                var name = params.name;
                var value = params.value;
                res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
                return res;
            }
        },
        legend: { //图例
            orient: 'vertical', //图例方向
            top: 'top', //如果 top 的值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐
            left: 'right',
            data: ['credit_pm2.5'],
            textStyle: {
                color: '#fff'
            }
        },
        visualMap: { //颜色的设置  dataRange
            show: false,
            x: 'left',
            y: 'center',
            seriesIndex: [1],
            min: 70,
            max: 90,
            text: ['高', '低'], // 文本，默认为数值文本
            textStyle: {
                color: '#fff'
            },
            inRange: { //定义 在选中范围中 的视觉元素。（用户可以和 visualMap 组件交互，用鼠标或触摸选择范围）
                color: ['#5cd2c3','#419bd3','#7a95d2','#5dcbdc','#838dcd','#5de9b1','#5dc6df','#5db8ea','#2bbc90','#5dc4e3']

            }
        },
        geo: {
            map: 'wuhan',
            left: '500',
            roam: false,
            itemStyle: { //地图区域的多边形 图形样式
                color: '#fff',
                normal: { //是图形在默认状态下的样式
                    label: {
                        show: true, //是否显示标签
                        textStyle: {
                            color: '#ff0'
                        },
                    },

                    borderWidth: 1,
                    borderColor: 'rgba(37,124,169)',
                    shadowColor: '#e8e8e8',
                    shadowOffsetY: 15,
                    shadowOffsetX: 8,

                },

            },
        },
        series: [{
                name: 'credit_pm2.5',
                type: 'effectScatter',
                left: '500',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function(val) {
                    return val[2] / 5;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'bottom',
                        color:'#fff',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#10f9ff',
                        shadowBlur: 0,
                        shadowColor: '#05C3F9'
                    }
                },
                zlevel: 1
            }, {
                type: 'map',
                mapType: 'wuhan',
                left: '500',
                // zoom: 1.2,
                roam: false, //是否开启鼠标缩放和平移漫游
                itemStyle: { //地图区域的多边形 图形样式
                    // color: ['rgb(11,85,142)', 'rgb(13,106,177)'],
                    normal: { //是图形在默认状态下的样式
                        label: {
                            show: true, //是否显示标签
                            textStyle: {
                                color: 'transparent'
                            },
                        },
                        borderWidth: 1,
                        borderColor: '#28729f',
                        areaColor: '#29b4b7',
                    },
                    emphasis: { //是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                        label: {
                            show: false,
                            textStyle: {
                                color: 'transparent'
                            },
                        },
                        borderColor: '',
                        areaColor: '',
                    }
                },

                data: data
            }
        ]
    };
      // 为echarts对象加载数据
      this.myChart.setOption(option);
    }
  },
  mounted() {
    this.initMap()
    // this.$store.dispatch('setCityStatus', true)
    this.citycode = this.$store.state.citycode
    this.getRightOrder(this.citycode)
    this.getTitleData()
    // this.$nextTick(()=>{})
  },
  created(){
    this.getMapdata()
    console.log(this.$store.state.cityCode)
    this.$axios.get('api/region').then((res) => {
      this.options = res.data.data
    }, function(err) {
      console.log(err)
    })
    this.$axios.get('/js/wuhan.json').then((ress) => {
      console.log(ress)
      this.wuhanOptions = ress.data
      this.initChart();
    }, function(err) {
      console.log(err)
    })
    this.$axios.get('/api/xian').then((resxian) => {
      this.xianOptions = resxian.data.data
    }, function(err) {
      console.log(err)
    })
    this.$axios.get('/api/haikou').then((reshaikou) => {
      this.haikouOptions = reshaikou.data.data
    }, function(err) {
      console.log(err)
    })
    this.$axios.get('/api/chengdu').then((reschengdu) => {
      this.chengduOptions = reschengdu.data.data
    }, function(err) {
      console.log(err)
    })
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
