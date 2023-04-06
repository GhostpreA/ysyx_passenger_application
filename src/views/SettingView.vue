<template>
  <div>
    <van-nav-bar
        title="设置"
        left-text="返回"
        :fixed=true
        left-arrow
        @click-left="onClickLeft"
    />

    <div style="width: 100%;height: 70px; background-color: #acbbbb"/>

    <br>
    <van-cell title="修改密码" icon="shield-o" is-link style="font-size: 25px"></van-cell>
    <van-divider :style="{ color: '#cccece', borderColor: '#cccece', padding: '0 0px' }">
    </van-divider>
    <van-cell title="换绑手机号" icon="phone-circle-o" is-link to="bindingPhone" style="font-size: 25px"></van-cell>
    <van-divider :style="{ color: '#cccece', borderColor: '#cccece', padding: '0 0px' }">
    </van-divider>
    <van-cell title="用户指南" icon="records" is-link style="font-size: 25px"></van-cell>
    <van-divider :style="{ color: '#cccece', borderColor: '#cccece', padding: '0 0px' }">
    </van-divider>
    <van-cell-group>
      <van-cell title="版本介绍" icon="back-top" is-link to="setting" style="font-size: 25px" value="v1.1.0" @click="toakt"></van-cell>
    </van-cell-group>


    <div class="logo">
      <van-image
          :src="require('../img/logo.png')"
      />
    </div>
  </div>


</template>

<script>
import router from "@/router";
import {Toast} from "vant";

export default {
  name: "SettingView",
  data() {
    return {}
  },
  methods: {
    onClickLeft() {
      router.push({path: "personal"})
    },

    toakt:function () {
      Toast({
        message: '已是最新版本',

      });
    }
  }
}
</script>

<style scoped>

.van-icon {
  font-size: 25px;
}


.logo {
  width: 180px;
  height: 130px;
  margin-top: 80%;
  margin-left: 28%;
}
</style>