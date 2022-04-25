<!-- 系统监控 -->
<template>
  <div class="container">
    <div class="chart">
      <div id="chartOne"></div>
      <div id="chartTwo"></div>
      <div id="chartThree"></div>
    </div>
    <div class="info">
      <el-row>
        <el-col :span="4"><div style="margin-left: 30px">概况</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div style="margin-top: 10px;margin-left: 30px; margin-bottom: 10px">{{Message}}</div></el-col>
      </el-row>
      <!-- <div class="details">概况</div>
      <div class="details-all"></div> -->
      <div class="task">
        <h5>任务详情</h5>
        <div class="table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="220">
          </el-table-column>
          <el-table-column
            prop="name1"
            label="出错stage(个)">
          </el-table-column>
          <el-table-column
            prop="name2"
            label="运行stage(个)">
          </el-table-column><el-table-column
            prop="name3"
            label="等待stage(个)">
          </el-table-column>
          <el-table-column
            prop="name4"
            label="运行批次(个)">
          </el-table-column>
          <el-table-column
            prop="name5"
            label="等待批次(个)">
          </el-table-column>
          <el-table-column
            prop="name6"
            label="完成批次(个)">
          </el-table-column>
          <el-table-column
            prop="name7"
            label="最大内存(M))">
          </el-table-column>
          <el-table-column
            prop="name8"
            label="使用内存(M))">
          </el-table-column>
        </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { testData } from "@/api";
import util from '@/api/request.js';

export default {
  props:{
    value: ''
  },
  data() {
    return {
      tableDataAll: [],
      mBSituation: [], //内存
      BatchSituation:[],  //批次状况
      stageSituation:[], //stage状况
      overview:[], //概述
      detail: {}, //详情
      myChartOne: null,
      myChartTwo: null,
      myChartThree: null,
      Message: '一切设备都在运行当中，运行的stage：20个，等待的stage：30个，出错的stage： 5个',
      tableData: [
        // {
        //   date: '2016-7-10',
        //   name1: 2,
        //   name2: 59,
        //   name3: 45,
        //   name4: 50,
        //   name5: 78,
        //   name6: 48,
        //   name7: 200000,
        //   name8: 15000,
        // },
        // {
        //   date: '2016-7-10',
        //   name1: 5,
        //   name2: 44,
        //   name3: 32,
        //   name4: 56,
        //   name5: 43,
        //   name6: 32,
        //   name7: 300000,
        //   name8: 25000,
        // },
        // {
        //   date: '2016-7-17',
        //   name1: 6,
        //   name2: 39,
        //   name3: 55,
        //   name4: 60,
        //   name5: 38,
        //   name6: 48,
        //   name7: 300000,
        //   name8: 25000,
        // }
      ]
    };
  },
  mounted() {
    this.getDataAll()
    // this.initChart()
    // this.initChart2()
    // this.initChart3()
  },
  methods: {
     //测试接口是否可访问
   async getDataAll () {
     var A = []
     var B = []
     var C = []
     var D = ''
     var E = ''
      console.log('接口是否可以调用')
      util.axios({
        method: 'post',
        data: {},
        url: '/didiRedis/monitoring'
      }).then(res =>{
        if (res.status === 200) {
          this.mBSituation = res.data.mBSituation
          this.BatchSituation = res.data.batchSituation
          this.stageSituation = res.data.stageSituation
          this.overview = res.data.概况
          this.detail = res.data.任务详情
            A = [
              { value: this.mBSituation[0], name: "使用内存" },
              { value: this.mBSituation[1], name: "闲置内存" }
            ]
            B = [
              { value: this.stageSituation[0], name: "错误的stage" },
              { value: this.stageSituation[1], name: "运行的stage" },
              { value: this.stageSituation[2], name: "等待的stage" }
            ]
            C = [
              { value: this.BatchSituation[0], name: "运行的批次" },
              { value: this.BatchSituation[1], name: "等待的批次" },
              { value: this.BatchSituation[2], name: "完成的批次" }
            ]
          this.Message = '出现错误的stage:' + this.overview[0]+ '个;' + '正在运行的stage:' + this.overview[1] + '个;' + '处于等待运行的stage:' + this.overview[2] + '个;' + '正在运行的批次:' +this.overview[3]+ '个;' + '处于等待的批次:' + this.overview[4] + '个;' + '所有完成批次:' + this.overview[5]+ '个;' + '最大内存:' + this.overview[6] + 'M;' +'使用内存:' +this.overview[7]+ 'M;' + '闲置内存:' + this.overview[8] + 'M;'
          for(let i in this.detail){
            console.log(i)
            this.tableDataAll.push({
              date: i.replace(new RegExp('-', 'g'), ''),
              name: this.detail[i].replace('[','').replace(']','').split(',')
            })
          }
            if(this.tableDataAll.length === 4){
              console.log('执行')
              this.tableData = [
                {
                  date: this.tableDataAll[0].date,
                  name1: this.tableDataAll[0].name[0],
                  name2: this.tableDataAll[0].name[1],
                  name3: this.tableDataAll[0].name[2],
                  name4: this.tableDataAll[0].name[3],
                  name5: this.tableDataAll[0].name[4],
                  name6: this.tableDataAll[0].name[5],
                  name7: this.tableDataAll[0].name[6],
                  name8: this.tableDataAll[0].name[7],
                },
                {
                  date: this.tableDataAll[1].date,
                  name1: this.tableDataAll[0].name[8],
                  name2: this.tableDataAll[0].name[9],
                  name3: this.tableDataAll[0].name[10],
                  name4: this.tableDataAll[0].name[11],
                  name5: this.tableDataAll[0].name[12],
                  name6: this.tableDataAll[0].name[13],
                  name7: this.tableDataAll[0].name[14],
                  name8: this.tableDataAll[0].name[15],
                },
                {
                  date: this.tableDataAll[2].date,
                  name1: this.tableDataAll[0].name[16],
                  name2: this.tableDataAll[0].name[17],
                  name3: this.tableDataAll[0].name[18],
                  name4: this.tableDataAll[0].name[19],
                  name5: this.tableDataAll[0].name[20],
                  name6: this.tableDataAll[0].name[21],
                  name7: this.tableDataAll[0].name[22],
                  name8: this.tableDataAll[0].name[23],
                },
                {
                  date: this.tableDataAll[3].date,
                  name1: this.tableDataAll[0].name[24],
                  name2: this.tableDataAll[0].name[25],
                  name3: this.tableDataAll[0].name[26],
                  name4: this.tableDataAll[0].name[27],
                  name5: this.tableDataAll[0].name[28],
                  name6: this.tableDataAll[0].name[29],
                  name7: this.tableDataAll[0].name[30],
                  name8: this.tableDataAll[0].name[31],
                }
              ]
              console.log(this.tableData)
            } else if(this.tableDataAll.length === 3) {
              this.tableData = [
                {
                  date: this.tableDataAll[0].date,
                  name1: this.tableDataAll[0].name[0],
                  name2: this.tableDataAll[0].name[1],
                  name3: this.tableDataAll[0].name[2],
                  name4: this.tableDataAll[0].name[3],
                  name5: this.tableDataAll[0].name[4],
                  name6: this.tableDataAll[0].name[5],
                  name7: this.tableDataAll[0].name[6],
                  name8: this.tableDataAll[0].name[7],
                },
                {
                  date: this.tableDataAll[1].date,
                  name1: this.tableDataAll[0].name[8],
                  name2: this.tableDataAll[0].name[9],
                  name3: this.tableDataAll[0].name[10],
                  name4: this.tableDataAll[0].name[11],
                  name5: this.tableDataAll[0].name[12],
                  name6: this.tableDataAll[0].name[13],
                  name7: this.tableDataAll[0].name[14],
                  name8: this.tableDataAll[0].name[15],
                },
                {
                  date: this.tableDataAll[2].date,
                  name1: this.tableDataAll[0].name[16],
                  name2: this.tableDataAll[0].name[17],
                  name3: this.tableDataAll[0].name[18],
                  name4: this.tableDataAll[0].name[19],
                  name5: this.tableDataAll[0].name[20],
                  name6: this.tableDataAll[0].name[21],
                  name7: this.tableDataAll[0].name[22],
                  name8: this.tableDataAll[0].name[23],
                }
              ]
            } else if(this.tableDataAll.length === 2){
              this.tableData = [
                {
                  date: this.tableDataAll[0].date,
                  name1: this.tableDataAll[0].name[0],
                  name2: this.tableDataAll[0].name[1],
                  name3: this.tableDataAll[0].name[2],
                  name4: this.tableDataAll[0].name[3],
                  name5: this.tableDataAll[0].name[4],
                  name6: this.tableDataAll[0].name[5],
                  name7: this.tableDataAll[0].name[6],
                  name8: this.tableDataAll[0].name[7],
                },
                {
                  date: this.tableDataAll[1].date,
                  name1: this.tableDataAll[0].name[8],
                  name2: this.tableDataAll[0].name[9],
                  name3: this.tableDataAll[0].name[10],
                  name4: this.tableDataAll[0].name[11],
                  name5: this.tableDataAll[0].name[12],
                  name6: this.tableDataAll[0].name[13],
                  name7: this.tableDataAll[0].name[14],
                  name8: this.tableDataAll[0].name[15],
                }
              ]
            } else if(this.tableDataAll.length === 1){
              this.tableData = [
                {
                  date: this.tableDataAll[0].date,
                  name1: this.tableDataAll[0].name[0],
                  name2: this.tableDataAll[0].name[1],
                  name3: this.tableDataAll[0].name[2],
                  name4: this.tableDataAll[0].name[3],
                  name5: this.tableDataAll[0].name[4],
                  name6: this.tableDataAll[0].name[5],
                  name7: this.tableDataAll[0].name[6],
                  name8: this.tableDataAll[0].name[7],
                }
              ]
            }else if(this.tableDataAll.length === 5){
              this.tableData = [
                {
                  date: this.tableDataAll[0].date,
                  name1: this.tableDataAll[0].name[0],
                  name2: this.tableDataAll[0].name[1],
                  name3: this.tableDataAll[0].name[2],
                  name4: this.tableDataAll[0].name[3],
                  name5: this.tableDataAll[0].name[4],
                  name6: this.tableDataAll[0].name[5],
                  name7: this.tableDataAll[0].name[6],
                  name8: this.tableDataAll[0].name[7],
                },
                {
                  date: this.tableDataAll[1].date,
                  name1: this.tableDataAll[0].name[8],
                  name2: this.tableDataAll[0].name[9],
                  name3: this.tableDataAll[0].name[10],
                  name4: this.tableDataAll[0].name[11],
                  name5: this.tableDataAll[0].name[12],
                  name6: this.tableDataAll[0].name[13],
                  name7: this.tableDataAll[0].name[14],
                  name8: this.tableDataAll[0].name[15],
                },
                {
                  date: this.tableDataAll[2].date,
                  name1: this.tableDataAll[0].name[16],
                  name2: this.tableDataAll[0].name[17],
                  name3: this.tableDataAll[0].name[18],
                  name4: this.tableDataAll[0].name[19],
                  name5: this.tableDataAll[0].name[20],
                  name6: this.tableDataAll[0].name[21],
                  name7: this.tableDataAll[0].name[22],
                  name8: this.tableDataAll[0].name[23],
                },
                {
                  date: this.tableDataAll[3].date,
                  name1: this.tableDataAll[0].name[24],
                  name2: this.tableDataAll[0].name[25],
                  name3: this.tableDataAll[0].name[26],
                  name4: this.tableDataAll[0].name[27],
                  name5: this.tableDataAll[0].name[28],
                  name6: this.tableDataAll[0].name[29],
                  name7: this.tableDataAll[0].name[30],
                  name8: this.tableDataAll[0].name[31],
                },
                {
                  date: this.tableDataAll[4].date,
                  name1: this.tableDataAll[0].name[32],
                  name2: this.tableDataAll[0].name[33],
                  name3: this.tableDataAll[0].name[34],
                  name4: this.tableDataAll[0].name[35],
                  name5: this.tableDataAll[0].name[36],
                  name6: this.tableDataAll[0].name[37],
                  name7: this.tableDataAll[0].name[38],
                  name8: this.tableDataAll[0].name[39],
                },
              ]
            }
          this.initChart(A);
          this.initChart2(B);
          this.initChart3(C);
        }
      }).catch(function (error) {
        console.log(error.request)
      });
      // async xxx(){} await testData({}).then((res) =>{
      // }).catch(function (error) {
      //   console.log(error.request)
      // });
    },
    initChart(data) {
      console.log('echart加载')
      const option = {
        color:['#0099FF','#99CC33','#FF6600'],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // legend: {
        //   orient: "vertical",
        //   left: "right",
        //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        // },
        series: [
          {
            name: "内存信息",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 30, name: "使用内存" },
              { value: 70, name: "闲置内存" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.myChartOne = this.$echarts.init(document.getElementById("chartOne"));
      this.myChartOne.setOption(option);
    },
    initChart2(data) {
      const option = {
        color:['#0099FF','#99CC33','#FF6600'],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // legend: {
        //   orient: "vertical",
        //   left: "right",
        //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        // },
        series: [
          {
            name: "stage信息",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 5, name: "错误的stage" },
              { value: 55, name: "运行的stage" },
              { value: 40, name: "等待的stage" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.myChartTwo = this.$echarts.init(document.getElementById("chartTwo"));
      this.myChartTwo.setOption(option);
    },
    initChart3(data) {
      const option = {
        color:['#0099FF','#99CC33','#FF6600'],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // legend: {
        //   orient: "vertical",
        //   left: "right",
        //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        // },
        series: [
          {
            name: "批次信息",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 50, name: "运行的批次" },
              { value: 40, name: "等待的批次" },
              { value: 10, name: "完成的批次" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.myChartThree = this.$echarts.init(
        document.getElementById("chartThree")
      );
      this.myChartThree.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .chart {
    width: 100%;
    height: 50%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(90deg, #2b3043 50%, #252a3c 50%);
    background-size: 3px 100%;
    // background: #f00;
    // #chartOne,#ChartTwo{
    //    width: 50%;
    //    height: 100%;
    //    float: left;
    // }
    #someThing {
      text-align: center
    }
    #chartOne {
      width: 30%;
      height: 100%;
      float: left;
    }
    #chartTwo {
      width: 30%;
      height: 100%;
      float: left;
    }
    #chartThree {
      width: 30%;
      height: 100%;
      float: left;
    }
  }
  .info {
    width: 100%;
    height: 40%;
    margin-top: 23%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: solid 2px #fff;
    background: #191c30;
    color: #fff;
    .details {
      height: 50px;
      line-height: 50px;
      padding-left: 30px;
    }
    .details-all {
      height: 10px;
      line-height: 20px;
      color:#fff;
      margin-left: 40px;
      margin-bottom: 20px
    }
    .task {
      h5 {
        height: 50px;
        line-height: 50px;
        padding-left: 30px;
        border-top: solid 1px #353849;
        font-weight: normal;
        font-size: 16px;
      }
    }
  }
}
</style>