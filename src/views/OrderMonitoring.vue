<!-- 订单监控 -->
<template>
  <div style="width:100%;height:100%;color:#fff">
    <!-- <div class="order_list"> -->
    <!-- <h2>订单列表</h2> -->
    <!-- <ul>
        <li v-for="(item,index) in list" :key="index">{{item}}</li>
    </ul>-->
    <div id="chart"></div>
    <div class="order_info">
      <ul>
        <li>
          <i></i>
          <b>总订单:</b>
          <span>{{leftOrder.totalOrderNum}}</span>
        </li>
        <li>
          <i></i>
          <b>日均订单数:</b>
          <span>{{leftOrder.avgOrderNum}}</span>
        </li>
        <li>
          <i></i>
          <b>月订单数:</b>
          <span>{{leftOrder.monthOrderNum}}</span>
        </li>
        <li>
          <i></i>
          <b>订单总里程:</b>
          <span>{{leftOrder.charge_mileage}}</span>
        </li>
      </ul>
    </div>

    <div class="retention">
      <h3>订单数(辆次)</h3>
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
    <div class="info">
      <el-tabs type="card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-truck"></i> 车辆</span>
            <div class="table">
              <el-table :data="tableData" border style="width: 100%">
              <el-table-column
                prop="o_begin_address_code"
                label="城市"
                width="180">
                <template slot-scope="scope">
                    <div style="cursor: pointer" slot="reference" class="name-wrapper">
                      <el-tag v-if="scope.row.o_begin_address_code === '110100'" size="medium">北京</el-tag>
                      <el-tag v-else-if="scope.row.o_begin_address_code === '370600'" size="medium">烟台</el-tag>
                      <el-tag v-else-if="scope.row.o_begin_address_code === '420100'" size="medium">武汉</el-tag>
                      <el-tag v-else-if="scope.row.o_begin_address_code === '420300'" size="medium">十堰</el-tag>
                      <el-tag v-else-if="scope.row.o_begin_address_code === '610100'" size="medium">西安</el-tag>
                      <el-tag v-else-if="scope.row.o_begin_address_code === '460100'" size="medium">海口</el-tag>
                      <el-tag v-else-if="scope.row.o_begin_address_code === '510100'" size="medium">成都</el-tag>
                    </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="dayVehicleCount"
                label="日车辆数"
                width="180">
              </el-table-column>
              <el-table-column
                prop="monthVehicleCount"
                label="月车辆数">
              </el-table-column>
            </el-table>
          </div>
          </el-tab-pane>
          <el-tab-pane label="订单">
            <span slot="label"><i class="el-icon-tickets"></i> 订单</span>
            <div class="table">
              <el-table :data="tableData" border style="width: 100%">
              <el-table-column
                prop="o_begin_address_code"
                label="城市"
                width="180">
                <template slot-scope="scope">
                    <div style="cursor: pointer" slot="reference" class="name-wrapper">
                      <el-tag  @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.o_begin_address_code === '110100'" size="medium">北京</el-tag>
                      <el-tag v-else-if="scope.row.o_begin_address_code === '370600'" size="medium">烟台</el-tag>
                      <el-tag v-else-if="scope.row.o_begin_address_code === '420100'" size="medium">武汉</el-tag>
                      <el-tag v-else-if="scope.row.o_begin_address_code === '420300'" size="medium">十堰</el-tag>
                      <el-tag v-else-if="scope.row.o_begin_address_code === '610100'" size="medium">西安</el-tag>
                      <el-tag v-else-if="scope.row.o_begin_address_code === '460100'" size="medium">海口</el-tag>
                      <el-tag v-else-if="scope.row.o_begin_address_code === '510100'" size="medium">成都</el-tag>
                    </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="dayOrderCount"
                label="日订单数"
                width="180">
              </el-table-column>
              <el-table-column
                prop="weekOrderCount"
                label="周订单数">
              </el-table-column>
              <el-table-column
                prop="monthOrderCount"
                label="月订单数">
              </el-table-column>
            </el-table>
          </div>
          </el-tab-pane>
        </el-tabs>
      <!-- <table>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table> -->
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import 'echarts/map/js/china.js';
import util from '@/api/request.js';
export default {
  data() {
    return {
      percentage3: 0,
      percentage2: 0,
      percentage1: 0,
      percentage: 0,
      leftOrder: {
        total_count: 0,
        daily_count: 0,
        cur_month_count: 0,
        total_mileage: 0 
      },
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ],
      myChart: null,
      list: ["列表1", "列表1", "列表1", "列表1", "列表1", "列表1"],
      tableData: [
        // {
        //   city_code: '110100',
        //   _day_vehicle_num: 10,
        //   _month_vehicle_num: 300,
        //   _day_order_num: 30,
        //   _week_order_num: 350,
        //   _month_order_num: 1300
        // },
        // {
        //   city_code: '370600',
        //   _day_vehicle_num: 40,
        //   _month_vehicle_num: 256,
        //   _day_order_num: 20,
        //   _week_order_num: 240,
        //   _month_order_num: 1000
        // },
        // {
        //   city_code: '610100',
        //   _day_vehicle_num: 70,
        //   _month_vehicle_num: 700,
        //   _day_order_num: 60,
        //   _week_order_num: 590,
        //   _month_order_num: 1400
        // },
        // {
        //   city_code: '510100',
        //   _day_vehicle_num: 5,
        //   _month_vehicle_num: 130,
        //   _day_order_num: 30,
        //   _week_order_num: 350,
        //   _month_order_num: 1300
        // },
        // {
        //   city_code: '510100',
        //   _day_vehicle_num: 34,
        //   _month_vehicle_num: 340,
        //   _day_order_num: 50,
        //   _week_order_num: 550,
        //   _month_order_num: 1600
        // },
      ]
    };
  },
  mounted() {
    this.initChart();
    this.getLeftOrder()
    this.get0rderTable()
    this.getRightOrder()
  },
  methods: {
    handleEdit(a,b){
      console.log(a)
      console.log(b)
    },
    get0rderTable(){
      util.axios({
        method: 'post',
        data: {},
        url:'/didi/vehicle_order'
      }).then(res =>{
        console.log(res)
        this.tableData = res.data
      })
    },
    getLeftOrder(){
      util.axios({
        method: 'post',
        url:'/didi/dwmm',
        data: {}
      }).then(res => {
        this.leftOrder = res.data[0]
      })
    },
    getRightOrder(){
      util.axios({
        method: 'post',
        data:{},
        url: '/didi/fspos1'
      }).then(res =>{
        console.log('完成率')
        console.log(res)
        this.resultData = res.data[0]
        this.percentage = parseInt((this.resultData._year_comple_rate))
        this.percentage1 = parseInt((this.resultData._week_comple_rate))
        this.percentage2 = parseInt((this.resultData._month_comple_rate))
        this.percentage3 = parseInt((this.resultData._quarter_comple_rate))
      })
    },
    initChart() {
      // 基于准备好的dom，初始化echarts图表
      var mapName = 'china';
      var data = [
          {name:"北京",value:199},
          {name:"天津",value:42},
          {name:"河北",value:102},
          {name:"山西",value:81},
          {name:"内蒙古",value:47},
          {name:"辽宁",value:67},
          {name:"吉林",value:82},
          {name:"黑龙江",value:123},
          {name:"上海",value:24},
          {name:"江苏",value:92},
          {name:"浙江",value:114},
          {name:"安徽",value:109},
          {name:"福建",value:116},
          {name:"江西",value:91},
          {name:"山东",value:119},
          {name:"河南",value:137},
          {name:"湖北",value:116},
          {name:"湖南",value:114},
          {name:"重庆",value:91},
          {name:"四川",value:125},
          {name:"贵州",value:62},
          {name:"云南",value:83},
          {name:"西藏",value:9},
          {name:"陕西",value:80},
          {name:"甘肃",value:56},
          {name:"青海",value:10},
          {name:"宁夏",value:18},
          {name:"新疆",value:180},
          {name:"广东",value:123},
          {name:"广西",value:59},
          {name:"海南",value:14},
      ];

      var geoCoordMap = {};
      var toolTipData = [
          {name:"北京",value:[{name:"科技人才总数",value:95},{name:"理科",value:82}]},
          {name:"天津",value:[{name:"文科",value:22},{name:"理科",value:20}]},
          {name:"河北",value:[{name:"文科",value:60},{name:"理科",value:42}]},
          {name:"山西",value:[{name:"文科",value:40},{name:"理科",value:41}]},
          {name:"内蒙古",value:[{name:"文科",value:23},{name:"理科",value:24}]},
          {name:"辽宁",value:[{name:"文科",value:39},{name:"理科",value:28}]},
          {name:"吉林",value:[{name:"文科",value:41},{name:"理科",value:41}]},
          {name:"黑龙江",value:[{name:"文科",value:35},{name:"理科",value:31}]},
          {name:"上海",value:[{name:"文科",value:12},{name:"理科",value:12}]},
          {name:"江苏",value:[{name:"文科",value:47},{name:"理科",value:45}]},
          {name:"浙江",value:[{name:"文科",value:57},{name:"理科",value:57}]},
          {name:"安徽",value:[{name:"文科",value:57},{name:"理科",value:52}]},
          {name:"福建",value:[{name:"文科",value:59},{name:"理科",value:57}]},
          {name:"江西",value:[{name:"文科",value:49},{name:"理科",value:42}]},
          {name:"山东",value:[{name:"文科",value:67},{name:"理科",value:52}]},
          {name:"河南",value:[{name:"文科",value:69},{name:"理科",value:68}]},
          {name:"湖北",value:[{name:"文科",value:60},{name:"理科",value:56}]},
          {name:"湖南",value:[{name:"文科",value:62},{name:"理科",value:52}]},
          {name:"重庆",value:[{name:"文科",value:47},{name:"理科",value:44}]},
          {name:"四川",value:[{name:"文科",value:65},{name:"理科",value:60}]},
          {name:"贵州",value:[{name:"文科",value:32},{name:"理科",value:30}]},
          {name:"云南",value:[{name:"文科",value:42},{name:"理科",value:41}]},
          {name:"西藏",value:[{name:"文科",value:5},{name:"理科",value:4}]},
          {name:"陕西",value:[{name:"文科",value:38},{name:"理科",value:42}]},
          {name:"甘肃",value:[{name:"文科",value:28},{name:"理科",value:28}]},
          {name:"青海",value:[{name:"文科",value:5},{name:"理科",value:5}]},
          {name:"宁夏",value:[{name:"文科",value:10},{name:"理科",value:8}]},
          {name:"新疆",value:[{name:"文科",value:36},{name:"理科",value:31}]},
          {name:"广东",value:[{name:"文科",value:63},{name:"理科",value:60}]},
          {name:"广西",value:[{name:"文科",value:29},{name:"理科",value:30}]},
          {name:"海南",value:[{name:"文科",value:8},{name:"理科",value:6}]},
      ];
    
      // 基于准备好的dom，初始化echarts图表
      this.myChart = this.$echarts.init(document.getElementById("chart"));
      this.myChart.showLoading();
        var mapFeatures = this.$echarts.getMap(mapName).geoJson.features;
        this.myChart.hideLoading();
        mapFeatures.forEach(function(v) {
            // 地区名称
            var name = v.properties.name;
            // 地区经纬度
            geoCoordMap[name] = v.properties.cp;

        });
        var max = 480,
            min = 9; // todo
        var maxSize4Pin = 100,
            minSize4Pin = 20;
            var convertData = function(data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
              var geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {
                  res.push({
                      name: data[i].name,
                      value: geoCoord.concat(data[i].value),
                  });
              }
          }
          return res;
      };
      const option = {
        backgroundColor: "#1b1b1b",
        tooltip: {
        padding: 0,
        enterable: true,
        transitionDuration: 1,
        textStyle: {
            color: '#000',
            decoration: 'none',
        },
        // position: function (point, params, dom, rect, size) {
        //   return [point[0], point[1]];
        // },
        formatter: function(params) {
            // console.log(params)
            var tipHtml = '';
            tipHtml = '<div style="width:200px;height:100px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">'
            +'<div style="width:80%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">'+'<el-progress :percentage="50" status="warning">' + '</el-progress>'
            +'<span style="margin-left:10px;color:#fff;font-size:16px;">'+params.name+'</span>'+'</div>'
            +'<p style="color:#fff;font-size:15px;">'+'<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">'+'</i>'
            +'车辆分布数：'+'<span style="color:#11ee7d;margin:0 6px;">'+toolTipData.length+'</span>'+'个'+'</p>'
            +'<p style="color:#fff;font-size:15px;">'+'<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">'+'</i>'
            +'车辆订单数'+'<span style="color:#f48225;margin:0 6px;">'+toolTipData.length+'</span>'+'个'+'</p>'
            +'</div>';
            return tipHtml;
          }

        },
        visualMap: {
            show: true,
            min: 0,
            max: 200,
            left: '10%',
            top: 'bottom',
            calculable: true,
            seriesIndex: [1],
            inRange: {
                color: ['#04387b', '#467bc0'] // 蓝绿
            }
        },
        geo: {
            show: true,
            map: mapName,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: true, //是否支持缩放 
            itemStyle: {
                normal: {
                    areaColor: '#023677',
                    borderColor: '#1180c7',
                },
                emphasis: {
                    areaColor: '#4499d0',
                }
            }
        },
        series: [{
            name: '散点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#fff'
                }
            }
        },
            {
                type: 'map',
                map: mapName,
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                animation: false,
                data: data
            },
            {
                name: '点',
                type: 'scatter',
                coordinateSystem: 'geo',
                zlevel: 6,
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data.sort(function(a, b) {
                    return b.value - a.value;
                }).slice(0, 10)),
                symbolSize: function(val) {
                    return val[2] / 10;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'left',
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'yellow',
                        shadowBlur: 10,
                        shadowColor: 'yellow'
                    }
                },
                zlevel: 1
            },
          ]
      };
      // 为echarts对象加载数据
      this.myChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
#chart {
  width: 100%;
  height: 100%;
}
.order_info {
  width: 28%;
  height: 25%;
  border: solid 1px #696d79;
  position: absolute;
  left: 2%;
  top: 15%;
  color: #fff;
  background: #181b2c;
  opacity: 0.8;
  ul {
    padding: 10px 15px;
  }
  ul li {
    padding: 5px;
  }
  i {
    width: 20px;
    height: 10px;
    border: solid 1px;
    display: inline-block;
  }
  b {
    font-weight: 500;
    padding-left: 15px;
  }
  span {
    padding-left: 15px;
  }
  li:nth-child(1) i {
    background: #00a0ea;
  }
  li:nth-child(2) i {
    background: #1e54c1;
  }
  li:nth-child(3) i {
    background: #fe430e;
  }
  li:nth-child(4) i {
    background: #eeeeee;
  }
}

.info {
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #181b2c;
  top: 60%;
  color: #fff;
  opacity: 0.8;
  table {
    width: 100%;
    border-collapse: collapse;
    color:#fff
  }
  tr td {
    height: 50px;
    border: solid 1px #353849;
    text-align: center;
  }
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
