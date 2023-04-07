<template>
  <div id="container"></div>
</template>


<script>

import AMapLoader from '@amap/amap-jsapi-loader';

window._AMapSecurityConfig = {
  securityJsCode: 'ba6797411b09136c88583c486cf395cf'
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
    }
  },
  methods: {
    initMap() {

      AMapLoader.load({
        key: "738506afec3b63bf7c978eb468906f10",             // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.ControlBar", "AMap.MouseTool", "AMap.MapType", "AMap.HawkEye", "AMap.Geolocation", "AMap.ControlBar","AMap.AdvancedInfoWindow"],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        console.log("map")
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


        this.map.addControl(new AMap.Scale());   // 添加左下角的比例尺
        let toolBar = new AMap.ToolBar({
          position: {
            bottom: '210px',
            right: '35px'
          }
        });
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：5s
          position: 'RB',    //定位按钮的停靠位置
          offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
          zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
        });

        let controlBar = new AMap.ControlBar({
          position: {
            bottom: '280px',
            right: '10px',
          },
        });


        // let AdvancedInfoWindow = new AMap.AdvancedInfoWindow({
        //   position: {
        //     bottom: '280px',
        //     right: '10px',
        //   },
        // })


        // //构造路线导航类
        // let driving = new AMap.Driving({
        //   map: this.map,
        //   panel: "panel"
        // });


        // this.map.addControl(toolBar);   // 添加右下角的放大缩小
        // this.map.addControl(controlBar);   // 方向盘
        // this.map.addControl(new AMap.MapType());   // 添加右上角的标准图和卫星图  和路况
        // this.map.addControl(new AMap.HawkEye());   // 添加地图放大镜
        this.map.addControl(geolocation); // 添加回到当前位置组件
        // this.map.addControl(AdvancedInfoWindow);
        // 根据起终点名称规划驾车导航路线
        // driving.search([
        //   {keyword: '福四中',city:'福州'},
        //   {keyword: '三盛托斯卡纳',city:'福州'}
        // ], function (status, result) {
        //   // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
        //   if (status === 'complete') {
        //     log.success('绘制驾车路线完成')
        //   } else {
        //
        //     log.error('获取驾车数据失败：' + result)
        //   }
        // });


        geolocation.getCurrentPosition(function (status, result) {
          if (status == 'complete') {
            onComplete(result)
          } else {
            onError(result)
          }
        });

        //解析定位结果
        function onComplete(data) {
          alert("定位成功")
          var str = [];
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
</style>
