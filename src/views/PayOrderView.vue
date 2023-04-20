<template>
  <div>
    <van-overlay :show="payShow">
      <div class="wrapper" @click.stop>
        <div class="block" style="width: 90%; height: 650px; text-align: center">
          <div class="payForm">
            <div style="width: 240px; height: 300px; margin: 0px auto;">

              <div type="flex" style="text-align: left">
                <div span="22">订单号: {{ this.$store.state.unPayOrderInfo.orderId }}</div>
                <br>
                <div span="22">起点位置: {{ this.$store.state.unPayOrderInfo.startName }}</div>
                <br>
                <div span="22">终点位置: {{this.$store.state.unPayOrderInfo.endName}}</div>
                <br>
                <div span="22">结束时间: {{ this.$store.state.unPayOrderInfo.orderStatustime }}</div>
                <br>
                <div span="22">价格: {{this.$store.state.unPayOrderInfo.orderCost}}</div>
              </div>
            </div>
          </div>
          <van-divider :style="{ color: '#5a8ccc', borderColor: '#5a8ccc', padding: '0 16px' }">请保存二维码，前往支付宝扫码</van-divider>

          <van-image
              width="300px"
              height="300px"
              style="margin-top: -10px"
              :src="getQrimg()"/>
<!--              :src="require('../img/qrimg.png')"-->

          <br>
          <van-button type="info">我已完成支付</van-button>
        </div>
      </div>
    </van-overlay>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" >首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o" >聊天</van-tabbar-item>
      <van-tabbar-item icon="user-o" :to="{name:'personal'}">个人</van-tabbar-item>

    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "PayOrderView",
  data() {
    return {
      active: '',
      payHint: true, //未支付提示遮罩层
      payShow: true,//支付界面遮罩层
    }
  },

  methods: {

    show2: function () {//前往支付按钮
      this.payHint = false
      this.payShow = true
    },

    getQrimg: function (){
      var orderId = this.$store.state.unPayOrderInfo.orderId
      let qrimg = "/ysyx_imgserver/img/qr"+orderId
      console.log("当前图片为 "+qrimg)

      return qrimg
    }

  },
}
</script>

<style scoped>
.payForm {
  width: 85%;
  height: 200px;
  margin-top: 20px;
  margin-left: 7%;
  background-color: rgba(253, 253, 253, 0.6);
  border-radius: 15px; /*边框弧度*/
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.63);
  overflow: hidden;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}

</style>
