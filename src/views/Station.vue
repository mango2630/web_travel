<!-- 虚拟车站 -->
<template>
  <div style="backgroundColor:#1b1b1b" id="container">
    <div class="order_list">
      <div class="vertical-text">
        <p v-for="item in StationCount" :key="item.index">
          <i style="margin-right: 10px" class="el-icon-location"></i>
          {{item.districtName}}:{{item.count}}个
        </p>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mapData: [],
      StationCount: []
    };
  },
  mounted() {
    //目前接口不通 先备注
    this.getMapData();
    this.getStationCount();
    // this.initMap();
  },
  methods: {
    getStationCount() {
      this.$axios({
          method: "post",
          url: "/api/track/virtualStationCount",
          data: { cityCode: "83" }
        })
        .then(resData => {
          this.StationCount = resData.data.data;
        });
    },
    getMapData() {
      var newArray = [];
      this.$axios({
          method: "post",
          url: "/api/track/virtualStations",
          data: { cityCode: "83" }
        })
        .then(res => {
          // newArray = res.data.data.slice(0,100)
          // console.log(newArray)
          // res.data.data.forEach(item => {
          //   this.mapData.push(
          //     [item.startingLng, item.startingLat]
          //   )
          // })
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[0] !== null) {
              if (i < 100) {
                this.mapData.push([
                  res.data.data[i].startingLng,
                  res.data.data[i].startingLat
                ]);
              }
            }
          }
          console.log(this.mapData);
          this.$nextTick(() => {
            this.initMap(this.mapData);
          });
        });
    },
    initMap(data) {
      console.log(data);
      var map = new AMap.Map("container", {
        center: data[0], //设置中心点
        resizeEnable: true,
        zoom: 12,
        mapStyle: "amap://styles/dark"
      });
      //  map.setMapStyle('amap://styles/dark')
      var preIcon,
        clickIcon,
        cluster,
        markers = [],
        lnglats = data;
      //  [
      //   [114.374025,30.874155],
      //   [114.802108,30.842149],
      //   [114.30304,30.594911],
      //   [114.029341,30.582186],
      //   [114.08124,30.309637],
      //   [114.283109,30.578771],
      //   [114.39707,30.634215],
      //   [114.307344,30.546536],
      //   [114.313961,30.349045],
      //   [114.400718,30.504259],
      //   [114.142483,30.622467],
      //   [114.264568,30.57061],
      //   [114.265807,30.549326]];
      if (lnglats.length > 0) {
        for (var i = 0; i < lnglats.length; i += 1) {
          var text = new AMap.Text({
            text: " ",
            textAlign: "center",
            verticalAlign: "middle", //middle 、bottom
            draggable: false, //数据是否可拖动
            cursor: "pointer",
            angle: 10, //点标记的旋转角度支持IE9及以上版本
            style: {
              width: "10px",
              height: "10px",
              "border-radius": "50%",
              "border-width": 0,
              "text-align": "center",
              "font-size": "12px",
              color: "blue",
              "background-color": "#009FD9",
              "-moz-box-shadow": "0px 0px 20px 2px  #009FD9",
              "box-shadow": "0px 0px 20px 2px #009FD9",
              "-webkit-box-shadow": "0 0 20px, 20px #009FD9",
              position: "absoult",
              animation: "myfirst 1s ease-out",
              "animation-iteration-count": "infinite",
              "animation-delay": "1.1s"
            },
            position: lnglats[i]
          });
          text.setMap(map);
          text.resumeMove(map);
        }
      }

      //鼠标点击事件,设置地图中心点及放大显示级别
      function resetMap(e) {
        console.log(e);
        console.log("您模拟触发了地图click事件!");
        new AMap.InfoWindow({
          content: "模拟事件触发"
        }).open(map, e.lnglat);
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
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
  .order_list {
    width: 200px;
    height: 200px;
    background: #181b2c;
    opacity: 0.8;
    color: #fff;
    z-index: 999;
    position: absolute;
    top: 80px;
    border: 1px solid black;
    border-radius: 0 100px 100px 0;
    // transform:rotate(90deg);
    left: 0;
    .vertical-text {
      font-size: 15px;
      color: #fff;
      margin: 20px 0 0 35px;
      p {
        color: #009fd9;
        margin-top: 10%;
      }
    }
  }
  @keyframes myfirst {
    0% {
      transform: scale(0.1, 0.1);
      opacity: 0;
      filter: alpha(opacity=0);
    }
    /* 40% {transform: scale(3);} */
    60% {
      opacity: 0.8;
      filter: none;
    }
    /* 80% {transform: scale(5);} */
    100% {
      transform: scale(1.1, 1.1);
      opacity: 0;
    }
  }
}
</style>
