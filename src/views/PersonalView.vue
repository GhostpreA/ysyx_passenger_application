<template>
  <div id="mine">
    <van-nav-bar title="个人中心"
                 :fixed=true
                 :border=false
                 style="height:2.5rem;background-color: #a2f0f6;"></van-nav-bar>

    <div style="background-color: #a2f0f6;width: 100%;height: 200px">
      <div class="personMsg" click="goToUserCenter">
        <div style="display: inline-block;margin: 50px 20px;">
          <van-image
              round
              width="6rem"
              height="6rem"
              :src="require('../img/logo2.png')"
          />
        </div>
        <div class="personInfo" style="display: inline-block;margin-top: -60px;font-size: 20px">
          <span>昵称</span>
          <br>
          <span>手机号:135*****553</span>
        </div>
      </div>
      <div style="width: 100%;height: 25px; background-color: #cccece"></div>

      <br>
      <van-cell title="订单" icon="bookmark-o" is-link style="font-size: 25px"></van-cell>
      <van-divider :style="{ color: '#cccece', borderColor: '#cccece', padding: '0 0px' }">
      </van-divider>
      <van-cell title="钱包" icon="bill-o" is-link style="font-size: 25px"></van-cell>
      <van-divider :style="{ color: '#cccece', borderColor: '#cccece', padding: '0 0px' }">
      </van-divider>
      <van-cell title="客服" icon="service-o" is-link style="font-size: 25px"></van-cell>
      <van-divider :style="{ color: '#cccece', borderColor: '#cccece', padding: '0 0px' }">
      </van-divider>
      <van-cell title="设置" icon="setting-o" is-link to="setting" style="font-size: 25px"></van-cell>
    </div>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" :to="{name:'home'}">首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o">聊天</van-tabbar-item>
      <van-tabbar-item icon="user-o">个人</van-tabbar-item>
    </van-tabbar>
    <div class="logo">
      <van-image
          :src="require('../img/logo.png')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      active: ""
    }
  }
}
</script>

<style scoped>
.van-tabbar-item--active { /*//底部导航栏，功能点击变色*/
  color: #d81e06;
}

.van-icon {
  font-size: 25px;
}

.logo {
  width: 180px;
  height: 130px;
  margin-top: 95%;
  margin-left: 28%;
}
</style>