<!-- 轨迹监控 -->
<template>
  <div id="container">
    <div class="list">
      <div class="real_time_order">
        <h2>实时订单列表</h2>
        <ul>
          <li>实时订单号：</li>
          <!-- <li v-if="orderStatus === false" @click="realtimeTrack('510100_39a096b71376b82f35732eff6d95779b')">实时订单号： 39a096b71376b82f35732eff6d95779b</li> -->
          <div class="dataShow">
            <li
              v-for="item in realOrderList"
              :key="item"
              @click="realtimeTrack(item)"
            >{{item.substring(7,item.length)}}</li>
          </div>
        </ul>
      </div>
      <div class="historical_orders">
        <h2>历史订单列表</h2>
        <ul>
          <li>历史订单号：</li>
          <!-- <li v-if="this.history === '39a096b71376b82f35732eff6d95779b'" @click="hisTrack('39a096b71376b82f35732eff6d95779b')">39a096b71376b82f35732eff6d95779b</li>
          <li v-if="this.history1 === '11746cc1d82418066fda69f08fb671c8'" @click="hisTrack('11746cc1d82418066fda69f08fb671c8')">11746cc1d82418066fda69f08fb671c8</li>-->
          <div class="dataShow">
            <li
              v-for="item in hisOrderList"
              :key="item"
              @click="hisTrack(item.substring(7,item.length))"
            >{{item.substring(7,item.length)}}</li>
          </div>
        </ul>
      </div>
      <div id="lng_lat">{{message}}</div>
    </div>
    <div class="input-card" v-show="isControl">
      <h4>轨迹回放控制</h4>
      <div class="input-item">
        <el-row>
          <el-col :span="12">
            <div>
              <input type="button" class="btn" value="开始动画" id="start" @click="startAnimation()" />
            </div>
          </el-col>
          <el-col :span="12">
            <div style="margin-left: 5px">
              <input type="button" class="btn" value="暂停动画" id="pause" @click="pauseAnimation()" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <input type="button" class="btn" value="继续动画" id="resume" @click="resumeAnimation()" />
            </div>
          </el-col>
          <el-col :span="12">
            <div style="margin-left: 5px">
              <input type="button" class="btn" value="停止动画" id="stop" @click="stopAnimation()" />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import CITY_CNTER from "@/utils/city";
import { historyTrackPoints, realtimeOrder } from "@/api";
export default {
  data() {
    return {
      orderStatus: false,
      websocket: null, //socket实例
      wsuri: "ws://localhost:8080/websocket",
      realOrderList: [], //实时订单
      hisOrderList: [], //历史订单
      map: null,
      cityCode: "075",
      websocket: null,
      lngAndLat: null, //经纬度
      lineArr: [], //存放历史轨迹点
      marker: null,
      timename: null,
      isEnd: false,
      polyline: null, // 绘制轨迹
      passedPolyline: null,
      message: "",
      history: "",
      history1: "",
      isControl: false, //轨迹控制显示隐藏
      datatime: null
      // CITY_CNTER : [],
    };
  },
  computed: {
    // 获取citycode
    getCitycode() {
      return this.$store.state.citycode;
    }
  },
  watch: {
    getCitycode: {
      handler(newValue, oldValue) {
        console.log(this.getCitycode);
        // this.getCitycode = newValue;
        // var center = CITY_CNTER.get(this.citycode);
        // this.map.setCenter(center);
        // console.log(this.getCitycode);
      }
    }
  },
  created() {
    this.initWebSocket();
  },
  async mounted() {
    console.log(this.$store.state.citycode);
    // 初始化
    this.initMap();

    this.map.setCenter([104.07513, 30.72724]);
    this.map.on("complete", () => {
      console.log("地图准备完成...............");
    });
    console.log("设置正北方向......");

    console.log("请求实时订单列表");

    console.log("citycode:" + this.getCitycode);
    this.getOrderdata();
    // this.datatime = window.setInterval(this.getOrderdata(), 30000)
    // this.realtimeTrackInterval2 = window.setInterval(this.getOrderOverview(this.nowCity), 5000);

    // const {
    //   status,
    //   data: { data }
    // } = await realtimeOrder({ cityCode: "075" });
    // if (status === 200) {
    //   this.realOrderList = data;
    // }

    // });
    // $("#city").change(function () {
    //     var citycode = $("#city").val();
    //     var center = CITY_CNTER.get(citycode);
    //     map.setCenter(center);
    // });
  },
  destroyed() {
    console.log("+++++++++_______");
    //离开路由之后断开websocket连接
    window.clearInterval(this.timename);
    window.clearInterval(this.datatime);
    this.closeWebSocket();
  },
  methods: {
    getOrderdata() {
      this.datatime = window.setInterval(() => {
        console.log("获取数据");
        this.$axios({
          method: "post",
          url: "/api/track/realtimeOrder",
          data: { cityCode: 510100 }
        }).then(res => {
          console.log(res);
          this.realOrderList = res.data.data;
        });
      }, 3000);
    },
    initMap() {
      //初始化地图
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: false,
        zoom: 25,
        pitch: 65,
        rotation: 45,
        viewMode: "3D", //开启3D视图,默认为关闭
        expandZoomRange: true,
        zoomToAccuracy: true,
        center: CITY_CNTER.get(this.citycode),
        // mapStyle: "amap://styles/f83c66227b0703fd99732aa8928e6f0e"
        mapStyle: "amap://styles/34eee3392325080eabb764ca4af5f2ab"
      });

      AMap.plugin(["AMap.ControlBar"], () => {
        // console.log(13213213213,this)
        // 添加 3D 罗盘控制
        var bar = new AMap.ControlBar();
        this.map.addControl(bar);
      });
    },
    // 初始化websocket
    initWebSocket() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        console.log('0000000')
        // 实例化socket
        this.websocket = new WebSocket(this.wsuri);
        // 监听socket消息
        this.websocket.onmessage = this.websocketonmessage;
        // 监听socket连接
        this.websocket.onopen = this.websocketonopen;
        // 监听socket错误信息
        this.websocket.onerror = this.websocketonerror;
        // 监听socket关闭
        this.websocket.onclose = this.closeWebSocket;
      }
    },
    // 将消息显示在网页上
    setMessage(message) {
      this.message = message;
      // document.getElementById("lng_lat").innerHTML = innerHTML + "<br/>";
    },
    //连接发生错误的回调方法
    websocketonerror(error) {
      console.log("cuowu" + error);
      this.setMessage(error);
    },
    //连接成功建立的回调方法
    websocketonopen() {
      console.log("连接成功！！！");
      this.setMessage(open);
    },
    //接收到消息的回调方法
    websocketonmessage(event) {
      console.log("webstock回调");
      this.setMessage(event.data);
      console.log(event.data);
      if (event.data.indexOf(",") != -1) {
        this.lngAndLat = (event.data + "").split(",");
        // console.log("this.lngAndLat", this.lngAndLat);
      } else if (event.data.indexOf("end") != -1) {
        console.log("订单结束");
        this.orderStatus = true;
        this.lngAndLat = event.data;
      }
    },
    //关闭连接
    closeWebSocket() {
      this.websocket.close();
    },

    // //发送消息
    send() {
      console.log("是否调用此方法");
      var message = document.getElementById("text").value;
      this.websocket.send(message);
    },

    // 获取实时轨迹  @param orderId
    realtimeTrack(orderId) {
      console.log(orderId)
      // this.history = ''
      // this.history1 = ''
      this.marker = null;
      console.log('+++++++xsaxsaxsa')
      console.log(this.websocket.readyState !== 1);
      if (this.websocket.readyState !== 1) {
      console.log('+++++++xsaxsaxsa')
        this.websocket = new WebSocket(this.wsuri);
        // 监听socket消息
        this.websocket.onmessage = this.websocketonmessage;
      }
      this.isControl = false;
      if ("undefined" == typeof this.lngAndLat || null == this.lngAndLat) {
        this.lngAndLat = "";
      }
      var lngAndLatStr = this.lngAndLat.toString();
      console.log(lngAndLatStr);
      //清除页面标注
      this.marker = null;
      //清理定时器，从新定义新的定时器.
      window.clearInterval(this.timename);
      // this.timename = window.setInterval(() => {
      //   lngAndLatStr = this.lngAndLat.toString();
      //   // console.log("lngAndLat", lngAndLat);
      //   if (lngAndLatStr.indexOf(",") != -1) {
      //     window.clearInterval(this.timename);
      //   }

      //   console.log("219 orderId:"+orderId);
      //   this.websocket.send(orderId);
      //   console.log('sID')
      // }, 300);

      var timename2 = window.setInterval(() => {
        lngAndLatStr = this.lngAndLat.toString();
        if (lngAndLatStr.indexOf("end") != -1) {
          //判断订单轨迹结束后讲订单的信息移入到历史订单列表中去.
          console.log("订单结束");
          this.orderStatus = true;
          window.clearInterval(timename2);
          this.websocket.close();
          // const idx = this.realOrderList.findIndex(value => )
          const index = this.realOrderList.indexOf(orderId);
          if (index > -1) {
            this.realOrderList.splice(index, 1);
          }
          this.hisOrderList.push(orderId);
          this.lngAndLat = "";
          // this.history = orderId.substring(7,orderId.length)
          // this.history1 = orderId.substring(7,orderId.length)
          // console.log(this.history1)
          this.map.setFitView();
          // this.realOrderList.

          // $RealtimeOrderList.find("span[orderId='" + orderId + "']").remove();
          // $HisOrderList.append(
          //   "<span style='font-size: 1em;font-family: 'Arial Black' orderId=" +
          //     orderId +
          //     ">" +
          //     "<a href='#' onclick=hisTrack('" +
          //     orderId +
          //     "')>" +
          //     orderId +
          //     "</a></span>"
          // );
          return;
        }
        if (lngAndLatStr.indexOf(",") != -1) {
          var lngLat = new AMap.LngLat(
            this.lngAndLat[0],
            this.lngAndLat[1],
            false
          );
          if (null != this.marker) {
            console.log(this.marker);
            console.log("走1");
            //设置标注位置
            //移动汽车位置前先平移地图，扩大显示的视角范围。
            this.map.animateEnable = true;
            this.map.panTo(lngLat);

            this.marker.moveTo(lngLat, 20000, k => {
              return k;
            });
          } else {
            console.log(this.marker);
            console.log("周二");
            this.marker = new AMap.Marker({
              map: this.map,
              position: lngLat,
              icon: "https://webapi.amap.com/images/car.png",
              offset: new AMap.Pixel(-26, -13),
              autoRotation: true,
              angle: -90
            });
          }
        }

        console.log("---发送id---:" + orderId);
        this.websocket.send(orderId);
      }, 300);
      console.log("+++++++");
      console.log(this.marker);
      // 清空上次的标记以及定时器
      // this.marker = null;
      // window.clearInterval(this.timename);
    },
    //  开始动画
    startAnimation() {
      if (
        this.polyline == null ||
        this.passedPolyline == null ||
        this.lineArr.length == 0
      ) {
        alert("轨迹点不存在!");
        return;
      }
      this.marker.moveAlong(this.lineArr, 200);
    },
    // 暂停动画
    pauseAnimation() {
      console.log("this.polyline", this.polyline);
      console.log("this.passedPolyline", this.passedPolyline);
      console.log("this.lineArr.length", this.lineArr.length);
      if (
        this.polyline == null ||
        this.passedPolyline == null ||
        this.lineArr.length == 0
      ) {
        alert("轨迹点不存在!");
        return;
      }
      this.marker.pauseMove();
    },
    // 继续动画
    resumeAnimation() {
      if (
        this.polyline == null ||
        this.passedPolyline == null ||
        this.lineArr.length == 0
      ) {
        alert("轨迹点不存在!");
        return;
      }
      this.marker.resumeMove();
    },
    // 停止动画
    stopAnimation() {
      if (this.lineArr.length == 0) {
        alert("轨迹点不存在!");
        return;
      }
      this.marker.stopMove();
    },
    // 获取历史轨迹
    async hisTrack(orderId) {
      console.log(this.marker);
      // this.marker = null
      this.map.setFitView();
      console.log(this.marker);
      this.isControl = true;
      var data = [];
      this.$axios({
          method: "post",
          url: "/track/historyTrackPoints",
          data: { orderId: orderId }
        })
        .then(res => {
          data = res.data.data;
          if (res.status === 200) {
            //清理旧的轨迹点
            this.lineArr = new Array();
            console.log("操作成功！");
            data.forEach((item, i) => {
              // console.log("i", i);
              let tmpArray = new Array();
              // console.log(item.lng)
              tmpArray[0] = item.lng;
              tmpArray[1] = item.lat;
              // console.log("tmpArray",tmpArray)
              this.lineArr[i] = tmpArray;
            });
            if (null != this.marker) {
              console.log("1");
              this.map.remove(this.marker);
              this.marker = null;
            }
            if (null != this.polyline) {
              console.log("1");
              this.map.remove(this.polyline);
              this.polyline = null;
            }
            if (this.passedPolyline != null) {
              console.log("1");
              this.map.remove(this.passedPolyline);
              this.passedPolyline = null;
            }
            this.marker = new AMap.Marker({
              map: this.map,
              position: this.lineArr[0],
              icon: "https://webapi.amap.com/images/car.png",
              offset: new AMap.Pixel(-26, -13),
              autoRotation: true,
              angle: -90
            });
            this.map.setFitView();
            console.log(this.marker.getPosition());
            this.marker.on("moving", e => {
              console.log(e.passedPath);
              // console.log("moving:" + this.marker.getPosition());
              this.map.panTo(this.marker.getPosition());
              console.log("this", this);
              this.passedPolyline.setPath(e.passedPath);
            });
            this.polyline = new AMap.Polyline({
              map: this.map,
              path: this.lineArr,
              showDir: true,
              strokeColor: "#ffed04", //线颜色
              // strokeOpacity: 1,     //线透明度
              strokeWeight: 6 //线宽
              // strokeStyle: "solid"  //线样式
            });
            this.passedPolyline = new AMap.Polyline({
              map: this.map,
              // path: lineArr,
              strokeColor: "#AF5", //线颜色
              // strokeOpacity: 1,     //线透明度
              strokeWeight: 6 //线宽
              // strokeStyle: "solid"  //线样式
            });
          }
        });
      // console.log("orderId:" + orderId);
      // const {
      //   status,
      //   data: { data }
      // } = await historyTrackPoints({ orderId: orderId });
      // console.log(data);
      // if (status === 200) {
      //
      // }
    }
  }
};
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  height: 100%;
}
.list {
  width: 400px;
  z-index: 9999;
  position: absolute;
  top: 80px;
  left: 0;
}
.real_time_order,
.historical_orders {
  width: 300px;
  height: 200px;
  background: #181b2c;
  opacity: 0.8;
  color: #fff;
  float: left;
  border: 1px solid black;
  border-radius: 0 100px 100px 0;
  h2 {
    font-size: 20px;
    color: #fff;
    margin: 15px 0 0 15px;
    padding-left: 15px;
    border-left: solid 3px #ffdc76;
  }
  ul {
    margin-top: 5px;
    height: 200px;
    .dataShow {
      height: 70px;
      overflow-y: auto;
    }

    li {
      margin: 0 15px;
      font-size: 12px;
      color: #25a5f7;
      line-height: 30px;
      text-align: center;
      border-bottom: solid 1px #ffdc76;
    }
  }
}
.historical_orders {
  margin-top: 20px;
}

#lng_lat {
  width: 200px;
  height: 20px;
  left: 0px;
  position: absolute;
  z-index: 9999;
  background-color: #8d7b8c;
  filter: alpha(Opacity=80);
  -moz-opacity: 0.8;
  opacity: 0.8;
  overflow-x: auto;
  white-space: nowrap;
  position: fixed;
  bottom: 1rem;
}

// 轨迹控制
.input-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #181b2c;
  opacity: 0.8;
  background-clip: border-box;
  width: 25rem;
  height: 10rem;
  border-width: 0;
  border-radius: 0.4rem;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 0.75rem 1.25rem;
  z-index: 999;
  h4 {
    color: #fff;
  }
}
.input-item {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  height: 3rem;
}
.input-card .btn {
  margin-right: 1.2rem;
  width: 9rem;
}
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: transparent;
  background-image: none;
  color: #fff;
  border-color: #25a5f7;
  padding: 0.25rem 0.5rem;
  line-height: 1.5;
  border-radius: 1rem;
  -webkit-appearance: button;
  cursor: pointer;
  outline: none;
  margin-top: 10px;
}
.input-card .btn:last-child {
  margin-right: 0;
}
</style>
