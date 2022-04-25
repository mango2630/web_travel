<!-- 订单报表 -->
<template>
  <div>
    <div id="chart"></div>
    <div class="info">
      <div class="info_name">
        <h2>车型</h2>
        <ul>
          <li v-for="(item,index) in vehicleType" :key="item.id" :class="{active: index === current}"   @click="showList(item.id,index)">{{item.type}}</li>
        </ul>
      </div>
      <div class="info_list" v-show="isShowList">
        <ul v-if="list.length>0">
          <li v-for="item in list" :key="item.orderId">{{item.orderId}}</li>
        </ul>
        <div v-else>暂无该订单！</div>
      </div>
    </div>
  </div>
</template>

<script>
import { statistics,getList } from "@/api";
export default {
  data() {
    return {
      current: -1,
      myChart:null,
      vehicleType: [
        { type: "滴滴专车", id: 1 },
        { type: "滴滴企业专车", id: 2 },
        { type: "滴滴快车", id: 3 },
        { type: "滴滴企业快车", id: 4 },
      ],
      carData:[],
      list:[],
      isShowList: false
    };
  },
  async mounted() {
     this.initChart();
      const {status,data:{data}} = await statistics()
      if(status === 200){
          this.carData = data
          console.log(this.carData)
      }
  },
  methods: {
    initChart() {
      const option = {
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "60%",
            data: [
              { value: 335, name: "专车", itemStyle: { color: "#FFA70F" } },
              { value: 310, name: "出租车", itemStyle: { color: "#FE430E" } },
              { value: 234, name: "顺风车", itemStyle: { color: "#00A0EA" } },
              { value: 135, name: "拼车", itemStyle: { color: "#1E54C1" } },
              { value: 1548, name: "豪华车", itemStyle: { color: "#EEEEEE" } }
            ],
            label: { show: true, position: "inner", color: "#000" }
          }
        ]
      };
      this.myChart = this.$echarts.init(document.getElementById("chart"));
      this.myChart.setOption(option);
    },
    // 展示列表
    async showList(id,index) {
      this.current = index;
      
      const {status,data:{data:{list}}} = await getList({productId:id});
      console.log(list)
      if(status === 200){
          this.list = list
          this.isShowList = true;
      }  
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
  left: 2%;
  bottom: 5%;
}
.info {
  width: 45%;
  background: #181b2c;
  position: absolute;
  top: 80px;
  right: 2%;
  bottom: 5%;
  .info_name {
    color: #fff;
    float: left;
    h2 {
      font-size: 20px;
      color: #fff;
      margin: 20px 0 0 50px;
      padding-left: 15px;
      border-left: solid 3px #ffdc76;
    }
    ul {
      margin: 30px 0 0 70px; 
      li {
        width: 100px;
        line-height: 30px;
        margin: 20px 0;
        border-bottom: solid 2px #46413b;
        cursor: pointer;
      }
    }
    .active {
        border-bottom: solid 2px #ffdc76;
      }
  }

  .info_list {
    width: 200px;
    min-height: 50px;
    background: #fff;
    color: #333;
    margin: 15px 0 0 50px;
    float: left;
    ul {
      margin: 30px 0 30px 0;
      li {
        width: 100px;
        font-size: 12px;
        line-height: 30px;
        margin: 10px auto;
        border-bottom: solid 1px #ffdc76;
      }
    }
    div{
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>