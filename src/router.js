import Vue from "vue";
import Router from "vue-router";
// // 概览
// import Overview from "./views/Overview.vue";
// // 订单监控
// import OrderMonitoring from "./views/OrderMonitoring.vue";
// // 轨迹监控
// import Trajectory from "./views/Trajectory.vue";
// // 虚拟车站
// import Station from "./views/Station.vue";
// // 出行迁途
// import Movingway from "./views/Movingway.vue";
// // 订单报表
// import OrderStatement from "./views/OrderStatement.vue";
// // 用户乘车行为
// import Behavior from "./views/Behavior.vue";
// // 出行活跃区域统计
// import Trip from "./views/Trip.vue";
// // 疲劳驾驶报警
// import Police from "./views/Police.vue";
// // 供需分析
// import SupplyDemand from "./views/SupplyDemand.vue";
// // 道路拥堵分析
// import TrafficJam from "./views/TrafficJam.vue";
// // 订单查询
// import Order from "./views/Order.vue";
// // 报告
// import Presentation from "./views/Presentation.vue";
// // 订单数据
// import OrderData from "./views/OrderData.vue";
// // 用户数据
// import UserData from "./views/UserData.vue";
// // 热力图
// import HeatMap from "./views/HeatMap.vue";
// // 预约单
// import BookingForm from "./views/BookingForm.vue";
// // 系统监控
// import System from "./views/System.vue";


Vue.use(Router);

export default new Router({
  
  // base: '/dist/',
  base: process.env.BASE_URL,
  routes: [
    //概览
    {
      path: "/",
      name: "overview",
      component: (resolve) => require(['./views/Overview.vue'], resolve)
    },
    //订单监控
    {
      path: "/orderMonitoring",
      name: "orderMonitoring",
      component: (resolve) => require(['./views/OrderMonitoring.vue'], resolve),
      meta: {
        isAuth: true
      }
    },
    //运行轨迹
    {
      path: "/trajectory",
      name: "trajectory",
      component: (resolve) => require(['./views/Trajectory.vue'], resolve)
    },
    //虚拟车站
    {
      path: "/station",
      name: "station",
      component: (resolve) => require(['./views/Station.vue'], resolve)
    },
    // 出行迁途
    {
      path: "/movingway",
      name: "movingway",
      component: (resolve) => require(['./views/Movingway.vue'], resolve)
    },
    // 订单报表
    {
      path: "/orderStatement",
      name: "orderStatement",
      component: (resolve) => require(['./views/OrderStatement.vue'], resolve)
    },
    // 用户乘车行为
    {
      path: "/behavior",
      name: "behavior",
      component: (resolve) => require(['./views/Behavior.vue'], resolve)
    },
    // 出行活跃区域统计
    {
      path: "/trip",
      name: "trip",
      component: (resolve) => require(['./views/Trip.vue'], resolve)
    },
    // 疲劳驾驶报警
    {
      path: "/police",
      name: "police",
      component: (resolve) => require(['./views/Police.vue'], resolve)
    },
    // 供需分析
    {
      path: "/supplyDemand",
      name: "supplyDemand",
      component: (resolve) => require(['./views/SupplyDemand.vue'], resolve)
    },
    // 道路拥堵分析
    {
      path: "/trafficJam",
      name: "trafficJam",
      component: (resolve) => require(['./views/TrafficJam.vue'], resolve)
    },
    // 订单查询
    {
      path: "/order",
      name: "order",
      component: (resolve) => require(['./views/Order.vue'], resolve)
    },
    // 报告
    {
      path: "/presentation",
      name: "presentation",
      component: (resolve) => require(['./views/Presentation.vue'], resolve)
    },
    // 订单数据
    {
      path: "/orderData",
      name: "orderData",
      component: (resolve) => require(['./views/OrderData.vue'], resolve)
    },
    // 用户数据
    {
      path: "/userData",
      name: "userData",
      component: (resolve) => require(['./views/UserData.vue'], resolve)
    },
    // 热力图
    {
      path: "/heatMap",
      name: "heatMap",
      component: (resolve) => require(['./views/HeatMap.vue'], resolve)
    },
    // 预约单
    {
      path: "/bookingForm",
      name: "bookingForm",
      component: (resolve) => require(['./views/BookingForm.vue'], resolve)
    },
    // 系统监控
    {
      path: "/system",
      name: "system",
      component: (resolve) => require(['./views/System.vue'], resolve)
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});