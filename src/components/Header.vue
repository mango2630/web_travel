<template>
  <div class="header">
    <div class="header-inner">
      <ul class="header_left">
        <li class="logo">
          <!-- logo -->
          汽车出行
        </li>
        <li>
          <el-dropdown v-if="statusData === true" trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-location-outline el-icon--left"></i>
              {{city}}
              <i class="el-icon-arrow-down el-icon--right"></i>
              <!-- 切换城市 -->
            </span>
            <el-dropdown-menu v-if="mapShow === 0" slot="dropdown">
              <el-dropdown-item command="510100">成都</el-dropdown-item>
              <el-dropdown-item command="610100">西安</el-dropdown-item>
              <el-dropdown-item command="460100">海口</el-dropdown-item>
            </el-dropdown-menu>
            <el-dropdown-menu v-if="mapShow === 1" slot="dropdown">
              <el-dropdown-item command="420100">武汉</el-dropdown-item>
              <el-dropdown-item command="510100">成都</el-dropdown-item>
              <el-dropdown-item command="610100">西安</el-dropdown-item>
              <el-dropdown-item command="460100">海口</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>

      <div class="header_right">
        <el-menu
          :default-active="$route.path"
          router
          background-color="#181B2C"
          text-color="#fff"
          active-text-color="#fff"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item v-for="item in navList" :index="item.router" :key="item.name">{{item.name}}</el-menu-item>
          <!-- <el-menu-item>其余</el-menu-item> -->
          <!-- <el-submenu index="2">
            <template slot="title">其余</template>
            <el-menu-item index="/trip">出行活跃区域统计</el-menu-item>
            <el-menu-item index="/police">疲劳驾驶报警</el-menu-item>
            <el-menu-item index="/supplyDemand">供需分析</el-menu-item>
            <el-menu-item index="/trafficJam">道路拥堵分析</el-menu-item>
            <el-menu-item index="/order">订单查询</el-menu-item>
            <el-menu-item index="/presentation">报告</el-menu-item> -->


            <!-- <el-menu-item index="/orderData">订单数据</el-menu-item> -->
            <!-- <el-menu-item index="/userData">用户数据</el-menu-item>
            <el-menu-item index="/heatMap">热力图</el-menu-item> -->
            <!-- <el-menu-item index="/bookingForm">预约单</el-menu-item> -->
            <!-- <el-menu-item index="/system">系统监控</el-menu-item> -->
            <!-- <el-submenu index="2-4">
              <template slot="title">选项</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu> -->
          <!-- </el-submenu> -->
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statusData: true,
      activeIndex: "1",
      mapShow: 0,
      navList: [
        { name: "概览", router: "/" },
        { name: "订单监控", router: "/orderMonitoring" },
        { name: "轨迹监控", router: "/trajectory" },
        { name: "虚拟车站", router: "/station" },
        { name: "出行迁途", router: "/movingway" },
        { name: "用户数据", router: "/userData" },
        { name: "热力图", router: "/heatMap" },
        { name: "系统监控", router: "/system" },
        // { name: "订单报表", router: "/orderStatement" },
        // { name: "用户乘车行为统计", router: "/behavior" },
        // { name: "其余", router: "/behavior" }
        // { name: "用户数据", router: "/behavior" },
        // { name: "热力图", router: "/behavior" }
      ],
      city: "成都"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      window.localStorage.path = key
      if(key === '/' || key === '/heatMap'){
        this.statusData = true
        if(key === '/heatMap'){
          this.mapShow = 1
          this.city = '武汉'
          this.$store.dispatch('setCitycode', '420100')
        }else if (key === '/') {
          this.mapShow = 0
          this.city = '成都'
          this.$store.dispatch('setCitycode', '610100')
        }
      } else{
        this.statusData = false
      }
    },
    handleCommand(command) {
      if (command === "420100") {
        this.city = "武汉";
      } else if (command === "510100") {
        this.city = "成都";
      } else if (command === "610100") {
        this.city = "西安";
      } else if (command === "460100") {
        this.city = "海口";
      }
      // 修改vuex中citycode
      this.$store.dispatch("setCitycode", command);
    }
  },
  mounted(){
    console.log(this.$store.state.cityStatus)
    if(window.localStorage.path === '/' || window.localStorage.path ==='/heatMap'){
      this.statusData = true
      if(window.localStorage.path === '/heatMap'){
          this.mapShow = 1
          this.city = '武汉'
          this.$store.dispatch('setCitycode', '420100')
        }else{
          this.mapShow = 0
        }
    }else{
      this.statusData = false
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  background: #181b2c;
  opacity: 0.8;
  color: #fff;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
}
.header-inner {
  min-width: 1200px;
}
.header_left {
  width: 32%;
  float: left;
  // background:#ccc;
  .logo {
    width: 120px;
    font-size: 20px;
    font-weight: 500;
    padding-left: 40px;
    height: 60px;
    background: url("~@/assets/logo.png") no-repeat left center;
    background-size: 20%;
  }
  li {
    float: left;
    line-height: 60px;
    margin-left: 60px;
  }
}
.header_right {
  min-width: 60%;
  float: right;
  background: #ccc;
}
.el-dropdown {
  color: #fff;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-dropdown-menu {
  opacity: 0.8;
}
</style>