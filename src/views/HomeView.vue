<template>
  <div class="home">
    <div>
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>


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

export default {
  name: 'HomeView',
  components:{
    HelloWorld,

  },
  data() {
    return {
      active: '',
    }
  },
  methods: {

  },
  mounted() {

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

</style>