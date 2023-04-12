<template>
  <div>
    <!--    导航-->
    <!--    <div class="input-item">-->
    <!--      <div class="input-item-prepend"><span class="input-item-text">经纬度</span></div>-->
    <!--      <input id='lnglat' type="text" v-model="passengerOrigin">-->
    <!--    </div>-->

    <!--    <input id="regeo" type="button" class="btn" value="经纬度 -> 地址">-->


    <div id="container"></div>
    <div class="centre">
      <br>
      <br>

      <van-cell-group>
        <van-field
            v-model="passengerOriginText"
            left-icon="location"
            disabled
        />
        <van-divider
            :style="{ color: '#0080ff', borderColor: '#007fff', padding: '0 16px' }"
        >
        </van-divider>
        <van-field
            id='tipinput'
            left-icon="share"
        />
      </van-cell-group>

      <van-button style="width: 220px;margin: 20px 20%" @click="navigation"
                  color="linear-gradient(to right, rgb(143 198 240), rgb(62 83 198))">
        开始打车
      </van-button>

    </div>


  </div>

</template>


<script>

import AMapLoader from '@amap/amap-jsapi-loader';
import md5 from "js-md5";
import {Toast} from "vant";
import router from "@/router";

window._AMapSecurityConfig = {
  securityJsCode: 'ba6797411b09136c88583c486cf395cf'//密匙
}
export default {
  name: "MapContainer",
  data() {
    return {
      //此处不声明 map 对象，可以直接使用 this.map赋值或者采用非响应式的普通对象来存储。
      map: null,
      mouseTool: null,
      overlays: [],
      auto: null,
      placeSearch: null,
      passengerOrigin: "",  //定位乘客位置
      passengerOriginText: "",//定位乘客地址
      passengerFinishText: "",//乘客的终点
      myKey: "738506afec3b63bf7c978eb468906f10",//key
      driving: null  //路线


    }
  },
  methods: {
    initMap() {

      AMapLoader.load({
        key: this.myKey,             // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15                                                            定位            导航                 搜索            搜索
        plugins: ["AMap.ToolBar", "AMap.ControlBar", "AMap.MouseTool", "AMap.MapType", "AMap.Geolocation", "AMap.Geocoder", "AMap.Driving", "AMap.AutoComplete"],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.map = new AMap.Map("container", {  //设置地图容器id
          viewMode: "3D",    //是否为3D地图模式
          zoom: 12,           //初始化地图级别
          center: [119.296411, 26.074286], //初始化地图中心点位置
        });
        console.log(this.map);
        this.map.on('click', function (e) {
          console.log("经度", e.lnglat.getLng())
          console.log("纬度", e.lnglat.getLat())
        });


        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：5s
          position: 'RB',    //定位按钮的停靠位置
          offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
          zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
        });


        this.map.addControl(geolocation);//定位

        geolocation.getCurrentPosition(function (status, result) {
          if (status == 'complete') {
            onComplete(result)
            console.log("来了")
          } else {
            onError(result)
            console.log("来了1")
          }
        });
        //解析定位结果
        //   this指向锁定保存
        const that = this;

        function onComplete(data) {
          var str = [];
          // 定位锁定起点
          that.passengerOrigin = data.position
          // this.passengerOrigin=data.position
          //调用定位方法传入data参数-------------------------------------------------------
          that.translatePositional(that.passengerOrigin);
          // regeoCode()
          str.push('定位结果：' + data.position);
          str.push('定位类别：' + data.location_type);
          if (data.accuracy) {
            str.push('精度：' + data.accuracy + ' 米');
          }//如为IP精确定位结果则没有精度信息
          str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
          console.log(str)
        }

        //解析定位错误信息
        function onError(data) {
          console.log('失败原因排查信息:' + data.message + '浏览器返回信息：' + data.originMessage)
        }

        //输入提示
        var autoOptions = {
          input: "tipinput"
        };
        AMap.plugin(['AMap.PlaceSearch', 'AMap.AutoComplete'], function () {
          var auto = new AMap.AutoComplete(autoOptions);
          var placeSearch = new AMap.PlaceSearch({
            map: that.map
          });  //构造地点查询类
          auto.on("select", select);//注册监听，当选中某条记录时会触发
          function select(e) {
            that.passengerFinishText = e.poi.name
            // placeSearch.setCity(e.poi.adcode);
            // placeSearch.search(e.poi.name);  //关键字查询查询
          }
        });
      }).catch(e => {
        console.log(e);
      })
    },
    //   定位
    positioning() {
      AMapLoader.load({
        key: this.myKey,             // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15                                                            定位            导航                 搜索            搜索
        plugins: ["AMap.Geolocation"],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：5s
          position: 'RB',    //定位按钮的停靠位置
          offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
          zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
        });
        this.map.addControl(geolocation);//定位
        geolocation.getCurrentPosition(function (status, result) {
          if (status == 'complete') {
            onComplete(result)
          } else {
            onError(result)
          }
        });
        //解析定位结果
        //   this指向锁定保存
        const that = this;

        function onComplete(data) {
          alert("定位成功")
          var str = [];
          // 定位锁定乘客起点
          that.passengerOrigin = data.position
          str.push('定位结果：' + data.position);
          str.push('定位类别：' + data.location_type);
          if (data.accuracy) {
            str.push('精度：' + data.accuracy + ' 米');
          }//如为IP精确定位结果则没有精度信息
          str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
          console.log(str)
        }

        //解析定位错误信息
        function onError(data) {
          alert("定位失败")
          console.log('失败原因排查信息:' + data.message + '浏览器返回信息：' + data.originMessage)
        }
      }).catch(e => {
        console.log(e);
      })
    },
    //经纬度转文字定位
    translatePositional(id) {
      console.log("经纬度转文字定位")
      AMapLoader.load({
        key: this.myKey,             // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Geocoder"],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        console.log("经纬度转文字定位回来")
        var geocoder = new AMap.Geocoder({
          city: "010", //城市设为北京，默认：“全国”
          radius: 1000 //范围，默认：500
        });
        // 新建组件
        var marker = new AMap.Marker();
        regeoCode()
        // // 保存this指向
        const that = this

        function regeoCode() {
          var lnglat = id  //传入定位的id--------------------------------------------------------------
          marker.setPosition(lnglat);
          geocoder.getAddress(lnglat, function (status, result) {
            if (status === 'complete' && result.regeocode) {
              console.log(result.regeocode.formattedAddress)
              that.passengerOriginText = result.regeocode.formattedAddress    //更改起点参数为定位------------------------------
            } else {
              console.log('根据经纬度查询地址失败');
            }
          });
        }

        // 添加进入
        this.map.add(marker);
      }).catch(e => {
        console.log(e);
      })
    },

    // 导航
    navigation() {
      if (this.driving) {
        console.log("删除")
        this.driving.clear();
      }
      const that = this;
      AMapLoader.load({
        key: this.myKey,             // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Driving"],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        //构造路线导航类----------------------------
        this.driving = new AMap.Driving({
          map: this.map,//是否需要地图指引
          // panel: "panel"//路线导航
        });

        // 根据起终点经纬度规划驾车导航路线
        // console.log(this.passengerOrigin + "起点")

        // 根据起终点名称规划驾车导航路线
        this.driving.search([
          {keyword: this.passengerOriginText, city: '福州'},//起点
          {keyword: this.passengerFinishText, city: '福州'}//终点
        ], function (status, result) {
          // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
          if (status === 'complete') {
            console.log(result)
            console.log("起点名" + result.start.name)
            console.log("起点经度" + result.destination.lng)
            console.log("起点纬度" + result.destination.lat)

            console.log("终点名" + result.destinationName)
            console.log("终点经度" + result.end.location.lng);
            console.log("终点纬度" + result.end.location.lat);
            console.log("距离" + result.routes[0].distance + "米");//公里数单位米----------------------------
            console.log("时间" + result.routes[0].time + "秒");//时间数单位秒----------------------------

            var kilometre = result.routes[0].distance / 1000
            var tiemNum = result.routes[0].time / 60;
            that.$axios({
              method: "get", url: `/takecar/order/passenger/takecar/`,
              params: {
                // acc: this.loginForm.passengerAcc,
                // pwd: md5(this.loginForm.passengerPwd)
                startName: result.start.name,//起点名
                startLongitude: result.destination.lng,//起点经度
                startLatitude: result.destination.lat,//起点纬度
                endName: result.destinationName,//终点名
                endLongitude: result.end.location.lng,//终点经度
                endLatitude: result.end.location.lat,//终点纬度
                mileage: kilometre,//历程“米”
              }

            }).then(res => {
              console.log(res.data)
            }).catch(err => {
              console.log(err)
            })


          } else {
            console.log(('获取驾车数据失败：' + result));
          }
        });

      }).catch(e => {
        console.log(e);
      })
    },
    // 自定义导航  起点名  终点名
    customNavigation(startText, finishText) {
      if (this.driving) {
        console.log("删除")
        this.driving.clear();

      }
      AMapLoader.load({
        key: this.myKey,             // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Driving"],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        //构造路线导航类----------------------------
        this.driving = new AMap.Driving({
          map: this.map,//是否需要地图指引------------------
          panel: "panel"//路线导航-------------------
        });

        // 根据起终点经纬度规划驾车导航路线
        console.log(this.passengerOrigin + "起点")

        // 根据起终点名称规划驾车导航路线
        this.driving.search([
          {keyword: startText, city: '福州'},//起点
          {keyword: finishText, city: '福州'}//终点
        ], function (status, result) {
          // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
          if (status === 'complete') {
            console.log('绘制驾车路线完成');
            console.log(result);
            console.log(result.routes[0].distance);//公里数单位米----------------------------
            console.log(result.routes[0].time);//时间数单位秒----------------------------

          } else {
            console.log(('获取驾车数据失败：' + result));
          }
        });

      }).catch(e => {
        console.log(e);
      })
    },
    //   搜索
    passengerFinishSearch() {

    }

  },
  mounted() {
    //DOM初始化完成进行地图初始化
    this.initMap();
  }
}
</script>

<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 300px;
}

.amap-logo {
  display: none !important;
}

/* 隐藏高德版权  */
.amap-copyright {
  display: none !important;
}

>>> .van-icon-location:before {
  content: '\e6da';
  color: #212fef;
}

>>> .van-field__control {
  font-size: 20px;
}

.centre {
  width: 95%;
  height: 260px;
  border-radius: 15px; /*边框弧度*/
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.63);
  margin: 20px auto;
  /*margin-top: 15px;*/
  background-color: rgba(253, 253, 253, 0.6);
}


</style>
