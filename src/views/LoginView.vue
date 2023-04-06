<template>
  <div>
    <div class="logo">
      <van-image
          :src="require('../img/logo.png')"
      />
    </div>

    <div class="hint">
      用户登入
    </div>


    <div class="userForm">
      <div style="width: 240px; height: 250px; margin: 25px 26px;" >

        <van-form @submit="onSubmit">
          <van-field
              v-model="username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">登入</van-button>
          </div>
        </van-form>
        <div style="margin: 16px;">
          <van-button round block type="info" @click="register">注册</van-button>
        </div>
      </div>
    </div>
    <div class="tableTitle"><span class="midText">其他登入方式</span></div>

    <van-icon name="wechat" color="#60A103FF" size="50px" style="margin-left: 110px"/>
    <van-icon name="graphic" color="#8C9EFFF0" size="50px" style="margin-left: 60px"/>
    <br>
    <samp style="margin-left: 113px; font-size: 20px">微信</samp>
    <samp style="margin:10px 63px; font-size: 20px" @click="smsLogin">验证码</samp>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit(values) {//登入提交表单中内容 Object类型
      console.log('submit', values);
      router.push({path: "home"})
    },

    register:function () {
      router.push({path:"registerView"})
    },
    smsLogin:function () {
      router.push({path:"verification"})
    }

  },
}
</script>

<style scoped>

.logo {
  width: 180px;
  height: 130px;
  margin-top: 50px;
  margin-left: 100px;
}

.hint {
  margin-top: 50px;
  margin-left: auto;
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  color: rgba(85, 95, 100, 0.60);
}

.userForm {
  width: 75%;
  height: 300px;
  margin-top: 70px;
  margin-left: 47px;
  background-color: rgba(253, 253, 253, 0.6);
  border-radius: 15px;/*边框弧度*/
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.63);
  overflow: hidden;
}

.tableTitle {
  position: relative;
  margin: 30px auto;
  width: 300px;
  height: 1px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
}

.midText {
  position: absolute;
  left: 50%;
  background-color: #ffffff;
  padding: 0 15px;
  transform: translatex(-50%) translateY(-50%);

}

</style>