<template>
  <div>
    <h1>订单列表</h1>

    <div class="block" style="width: 90%; height: 650px; text-align: center">
      <div class="payForm">
        <div v-for="item in orderList" style="width: 240px; height: 300px; margin: 0px auto; ">

          <div type="flex" style="text-align: left;border:2px solid #eee;box-shadow: 0 0 5px rgba(0,0,0,.1);" >
            <div span="22">订单号: {{ item.orderId }}</div>
            <br>
            <div span="22">起点位置: {{ item.startName }}</div>
            <br>
            <div span="22">终点位置: {{item.endName}}</div>
            <br>
            <div span="22">结束时间: {{ item.orderStatustime }}</div>
            <br>
            <div span="22">价格: {{item.orderCost}}</div>
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
  name: "HistoryOrderView",
  data() {
    return {
      active: "",
      orderList:""
    }
  },
  methods:{},
  mounted() {
    console.log("进来了")
    console.log(this.$store.state.passengerInfo)
    const that = this
    this.$axios.get('/ysyx_passengerinfo/passenger/selectAllOrder'
        ,{params:{
          passengerId:this.$store.state.passengerInfo.passengerId
          }}
    ).then(function (res){
      console.log(res.data)
      that.orderList =res.data.list
    })

  }
}



</script>

<style scoped>

</style>
