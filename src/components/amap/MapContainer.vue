<template>
  <div>
    <div id="container"></div>
    <div class="centre" v-show="shgowCentre">
      <br>
      <br>
      <van-cell-group>
        <van-field
            v-model="passengerOriginText"
            left-icon="location"
            disabled
        />
        <van-divider :style="{ color: '#0080ff', borderColor: '#007fff', padding: '0 16px' }"></van-divider>
        <van-field
            v-model="passengerFinishText"
            id='tipinput'
            left-icon="share"
        />
        <van-divider :style="{ color: '#0080ff', borderColor: '#007fff', padding: '0 16px' }"></van-divider>
        <span>距离：{{ kilometre }}</span>
        <div>价格：{{ price }}</div>
      </van-cell-group>

      <van-button style="width: 220px;margin: 40px 20%" @click="placeAnOrder"
                  color="linear-gradient(to right, rgb(143 198 240), rgb(62 83 198))">
        开始打车
      </van-button>

    </div>


    <div class="Form" style="font-size: 18px" v-show="showForm">
      <div style="margin: 30px;">
        <van-row type="flex" justify="space-between">
          <van-col span="6">距离：{{ kilometre }}</van-col>
          <van-col span="10">价格：{{ price }}</van-col>
        </van-row>
      </div>
      <van-divider :style="{ color: '#96a6af', borderColor: '#96a6af', padding: '0 16px' }"></van-divider>
      <div style="margin: 30px;">
        <van-row type="flex" justify="space-between">
          <van-col span="24" v-model="passengerOriginText">
            <van-icon name="location-o"/>
            出发地：{{ passengerOriginText }}
          </van-col>
          <div style="height: 80px"></div>
          <van-col span="24" v-model="passengerFinishText">
            <van-icon name="guide-o"/>
            目的地：{{ passengerFinishText }}
          </van-col>

        </van-row>
        <van-divider :style="{ color: '#96a6af', borderColor: '#96a6af', padding: '0 16px' }"></van-divider>
        <van-row>
          <van-col span="6">
            <van-count-down  ref="countDown" :time="time" format=" mm 分 ss 秒"/>
          </van-col>
          <van-col offset="4" span="6">
            等待接单
          </van-col>
        </van-row>

<!--        <div style="display: inline-block"></div>-->


        <div style="text-align: center">
          <van-button size="large" type="primary" @click="cancellation">取消订单</van-button>
        </div>
      </div>
    </div>

  </div>

</template>


<script>

import AMapLoader from '@amap/amap-jsapi-loader';
import {Dialog} from 'vant';
import md5 from "js-md5";
import {Toast} from "vant";
import router from "@/router";
import {mapActions} from "vuex";

window._AMapSecurityConfig = {
  securityJsCode: myconf.gdCode//密匙
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
      myKey: myconf.gdKey,//key
      driving: null,  //车辆
      cardriving:null,//车辆路线


      shgowCentre: true,//选择位置界面
      showForm: false,//订单详情界面 可取消订单

      startLongitude: "",//起点经度
      startLatitude: "",//起点纬度
      endLongitude: "",//终点经度
      endLatitude: "",//终点纬度

      startName: "",//起点名
      endName: "",//终点名
      kilometre: "",//公里
      price: "",//价格
      min: 0,
      max: 60,
      timer: null, //定时器名称
      time: 1 * 60 * 1000,

    }
  },
  methods: {
    ...mapActions(['savePassengerOrderAction','savePassengerInfoAction']),
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
            that.showPlaceAnOrder();

            // placeSearch.setCity(e.poi.adcode);
            // placeSearch.search(e.poi.name);  //关键字查询查询
          }
        });
      }).catch(e => {
        console.log(e);
      })
    },
    // 小车车动了
    carStartGo(){
      AMapLoader.load({
        key:this.myKey,             // 申请好的Web端开发者Key，首次调用 load 时必填
        version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins:["AMap.MoveAnimation","AMap.Marker","AMap.Polyline","AMap.GraspRoad"],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap)=>{
        // this.map.remove(this.marker);
        // 将路径转成车辆可运行的数据
        this.marker = JSON.parse(JSON.stringify(this.carDriving))
        this.lineArr= JSON.parse(JSON.stringify(this.carDriving))

        const that=this
        this.marker = new AMap.Marker({
          map: that.map,
          // 转化为经纬度【x，y】
          position: (that.passengerOrigin+"").split(","),
          icon:new AMap.Icon({
            size: new AMap.Size(60, 60),    // 图标尺寸
            image: 'https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png',  // Icon的图像
            // imageOffset: new AMap.Pixel(-13, -26),  // 图像相对展示区域的偏移量，适于雪碧图等
            imageSize: new AMap.Size(26, 52)   // 根据所设置的大小拉伸或压缩图片
          }),
          offset: new AMap.Pixel(0, 0),
        });

        var passedPolyline = new AMap.Polyline({
        });
        this.marker.on('moving', function (e) {
          passedPolyline.setPath(e.passedPath);
          that.map.setCenter(e.target.getPosition(),true)
        });

        this.map.setFitView();

        window.startAnimation = function startAnimation () {
          that.marker.moveAlong(that.lineArr, {
            // 每一段的时长
            duration: 500,//可根据实际采集时间间隔设置
            // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
            autoRotation: true,
          });
          that.marker.setTop(true)//车辆置顶
        };

        // 添加进入
        this.map.add(this.marker);
        startAnimation ()
      }).catch(e=>{
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


    //下单
    placeAnOrder: function () {

      var forbidClick =true;
      // 自定义加载图标
      Toast.loading({
        message: '下单中...',
        forbidClick,
        duration:0,
        loadingType: 'spinner',
      });
      this.$axios({
        method: "post", url: `/ysyx_passengerconfirmo/order/passenger/takecar`,//:8340
        params: {
          passengerId: this.$store.state.passengerInfo.passengerId,
          startName: this.startName,//起点名
          startLongitude: this.startLongitude,//起点经度
          startLatitude: this.startLatitude,//起点纬度
          endName: this.endName,//终点名
          endLongitude: this.endLongitude,//终点经度
          endLatitude: this.endLatitude,//终点纬度
          orderMileage: this.kilometre,//历程“米”

        }

      }).then(res => {
        console.log(res.data)
        if (res.data.statusCode == 101) {
          Toast.success("乘客下单成功");
          this.savePassengerOrderAction(res.data.list[0])

          console.log(this.$store.state.passengerOrder)
          this.min=0;//计时归零
          this.$refs.countDown.reset();
          const that = this

          this.shgowCentre = false;//选择位置界面
          this.showForm = true;//订单详情界面 可取消订单

          that.timer = setInterval(() => {//定时器开始
            that.min++;//每分钟加1

            if (that.min == that.max) {//min=max时停止计时
              this.shgowCentre = true;//选择位置界面
              this.showForm = false;//订单详情界面 可取消订单
              // alert("dz")
              clearInterval(that.timer);// 满足条件时 停止计时
            }
            console.log("dz")
            that.passengerRequestCar();
          }, 3000)

          console.log(res.data.list[0])//订单数据
        } else if (res.data.statusCode == 201) {
          Toast.success("起点区域未开通服务");


        } else if (res.data.statusCode == 301) {
          Toast.fail("终点区域未开通服务");
        }

      }).catch(err => {
        console.log(err)
      })




    },

    // 计时器
    cancellation: function () {

      this.shgowCentre = true;
      this.showForm = false;
      clearInterval(this.timer);// 停止计时
      this.min=0;//计时归零
      this.$refs.countDown.reset();
    },


    //展示信息
    showPlaceAnOrder() {
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
          // map: this.map,//是否需要地图指引
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
            console.log("起点经度" + result.origin.lng)
            console.log("起点纬度" + result.origin.lat)

            console.log("终点名" + result.destinationName)
            console.log("终点经度" + result.end.location.lng);
            console.log("终点纬度" + result.end.location.lat);
            console.log("距离" + result.routes[0].distance + "米");//公里数单位米----------------------------
            console.log("时间" + result.routes[0].time + "秒");//时间数单位秒----------------------------
            that.startName = result.start.name;
            that.startLongitude = result.origin.lng;//起点经度
            that.startLatitude = result.origin.lat;//起点纬度
            that.endName = result.destinationName;//终点名
            that.endLongitude = result.end.location.lng;//终点经度
            that.endLatitude = result.end.location.lat;//终点纬度
            that.kilometre = result.routes[0].distance / 1000 //公里
            var priceNum = that.kilometre * 1.7 ;//价格
            if (priceNum >= 10) {
              that.price = priceNum.toFixed(2)
            } else if (priceNum <= 10) {
              that.price = 10;
            }


          } else {
            console.log(('获取驾车数据失败：' + result));
          }
        });

      }).catch(e => {
        console.log(e);
      })
    },
// 乘客请求接单
    passengerRequestCar(){


          const that =this
      this.$axios({

        method: "get", url: `/ysyx_passengerorderquery/passenger/getOrderInfo/${this.$store.state.passengerOrder.orderId}`,//:8340


      }).then(res => {
        console.log(res.data)
        if (res.data.statusCode == 101) {
          Toast.success("司机接单");
          clearInterval(this.timer);// 停止计时
          that.savePassengerOrderAction(res.data.list[0])
          // this.customNavigationId([119.284459,26.04489],[this.passengerOrigin])//导航路线 起点this.passengerOrigin 终点


        } else if (res.data.statusCode == 201) {
          Toast.success("无司机接单");
        }

      }).catch(err => {
        console.log(err)
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
// 自定义导航  起点坐标  终点坐标
    customNavigationId(startid,finishid){
      // 测试输入经纬度
      // startid=[119.284459,26.04489]
      // finishid=[119.296411,26.074286]
      AMapLoader.load({
        key:this.myKey,             // 申请好的Web端开发者Key，首次调用 load 时必填
        version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins:["AMap.Driving"],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap)=>{
        //构造路线导航类----------------------------
        this.driving = new AMap.Driving({
          map: this.map,//是否需要地图指引------------------
          // panel: "panel"//路线导航-------------------
        });
        const that =this
        // 根据起终点经纬度规划驾车导航路线
        this.driving.search(new AMap.LngLat((startid+"").split(",")[0]*1,(startid+"").split(",")[1]*1), new AMap.LngLat((finishid+"").split(",")[0]*1,(finishid+"").split(",")[1]*1), function(status, result) {
          // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
          if (status === 'complete') {
            console.log('绘制驾车路线完成');
            console.log(result);
            console.log(result.routes[0].distance);//公里数单位米----------------------------
            console.log(result.routes[0].time);//时间数单位秒----------------------------
            console.log(result.routes[0].steps);//子路段----------------------------
            // 拿到所有定位的车的路线
            let carArr=[];
            for (let i = 0; i <result.routes[0].steps.length ; i++) {
              for (let j = 0; j <result.routes[0].steps[i].path.length ; j++) {
                var arr2 = [result.routes[0].steps[i].path[j].lng,result.routes[0].steps[i].path[j].lat]

                carArr.push(arr2)
              }
            }
            console.log(carArr)
            that.carDriving=carArr
            that.carStartGo()//车辆移动
          } else {
            console.log(('获取驾车数据失败：' + result));
          }
        });


      }).catch(e=>{
        console.log(e);
      })
    },


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
    //   搜索
    passengerFinishSearch() {

    }

  ,
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
  height: 360px;
  border-radius: 15px; /*边框弧度*/
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.63);
  margin: 20px auto;
  /*margin-top: 15px;*/
  background-color: rgba(253, 253, 253, 0.6);
}

.Form {
  width: 95%;
  height: 360px;
  margin: 30px auto;
  background-color: rgba(253, 253, 253, 0.6);
  border-radius: 5px; /*边框弧度*/
  box-shadow: 0 0 10px rgba(42, 41, 41, 0.33);
  overflow: hidden;
}

/*.colon {*/
/*  display: inline-block;*/
/*  margin: 0 4px;*/
/*  color: #ee0a24;*/
/*}*/
/*.block {*/
/*  display: inline-block;*/
/*  width: 22px;*/
/*  color: #fff;*/
/*  font-size: 15px;*/
/*  text-align: center;*/
/*  background-color: #93ee0a;*/
/*}*/
</style>
