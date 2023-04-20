<template>
  <div class="home">
<!--    <div>-->
<!--      <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--    </div>-->

    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block" >
          <p v-model="message">系统检测到您有一份未支付订单</p>
          <van-button type="info" style="margin: 0 auto" @click="toPay()">去支付</van-button>
        </div>
      </div>
    </van-overlay>
<!--    <div class="logo">-->
<!--      <van-image-->
<!--          :src="require('../img/logo.png')"-->
<!--      />-->
<!--    </div>-->

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" >首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o" >聊天</van-tabbar-item>
      <van-tabbar-item icon="user-o" :to="{name:'personal'}">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld";
import {mapActions} from "vuex";

export default {
  name: 'HomeView',
  components:{
    // HelloWorld,

  },
  data() {
    return {
      active: '',
      show: '',
      message:'正在加载中'
    }
  },
  methods: {
    ...mapActions(['saveUnPayOrderInfoAction']),
    toPay:function(){
      console.log("去支付")
      console.log(this.$store.state.unPayOrderInfo)

      const that =this
      console.log(that.$store.state.unPayOrderInfo.orderId)
      // this.$axios.post(`/ysyx_payorder/payment`,
      // {data:{
      //       orderId:this.$store.state.unPayOrderInfo.orderId
      //       }}
      // ).then(function () {
      //   console.log("生成成功")
      //   // this.$router.push("/payOrder")
      // })
      this.$axios.post(`/ysyx_payorder/payment`,
          {
            orderId:that.$store.state.unPayOrderInfo.orderId
          })
          .then(function(res){
            console.log(res.data)
            that.$router.push("/payOrder")
          })

    }
  },
  mounted() {
    console.log("开始检测是否有未支付订单")


    console.log(this.$store.state.passengerInfo)
    const that = this
    this.$axios.get(`/ysyx_passengerorderquery/passenger/getDoingOrder/${this.$store.state.passengerInfo.passengerId}`
      ).then(function(res){
       console.log("axios的返回值")
       console.log(res.data)
      if(res.data.statusCode===601){
        that.show = true
        that.saveUnPayOrderInfoAction(res.data.list[0])
        console.log("存在一份未支付订单")
        that.message="存在一份未支付订单"
         }else{
        that.show = false
        console.log("没有存在未支付订单")
        }
      }
    )

  },
};

</script>

<style scoped>

.van-tabbar-item--active { /*//底部导航栏，功能点击变色*/
  color: #d81e06;
}



.logo{
  width:160px;
  height:120px;
  margin:auto;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 50%;
  height: 120px;
  background-color: #fff;
  text-align:center;
  /*margin: 0 auto;*/
}
</style>
