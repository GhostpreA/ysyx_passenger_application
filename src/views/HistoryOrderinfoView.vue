<template>
  <div>

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

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" >首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o" >聊天</van-tabbar-item>
      <van-tabbar-item icon="user-o" :to="{name:'personal'}">个人</van-tabbar-item>
    </van-tabbar>
  </div>
  </div>
</template>

<script>
export default {
  name: "HistoryOrderinfoView",
  data() {
    return {
      active: ""
    }
  },
  mounted() {

  }
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
</style>
