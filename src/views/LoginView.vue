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
      <div style="width: 240px; height: 250px; margin: 25px auto;">
        <van-field
            v-model="loginForm.passengerAcc"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="loginForm.passengerPwd"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @click="clickLogin">登入</van-button>
        </div>
        <div style="margin: 16px;">
          <van-button round block type="info" @click="register">注册</van-button>
        </div>
      </div>
    </div>
    <van-divider
        :style="{ color: '#18191a', borderColor: '#191a1c', padding: '0 16px' }"
    >
      其他登入方式
    </van-divider>
    <van-icon name="wechat" color="#60A103FF" size="50px" style="margin-left: 30%"/>
    <van-icon name="graphic" color="#8C9EFFF0" size="50px" style="margin-left: 50px"@click="smsLogin"/>
    <br>
    <samp style="margin-left: 30%; font-size: 22px">微信</samp>
    <samp style="margin-left:52px; font-size: 20px" >验证码</samp>
  </div>
</template>

<script>
import router from "@/router";
import {mapActions} from "vuex";
import {Dialog, Toast} from "vant";
import md5 from 'js-md5';
import myconf from "../../public/front.conf";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        passengerAcc: '',
        passengerPwd: '',
      },

    };
  },
  methods: {

    ...mapActions(["savePassengerInfoAction"]),
    clickLogin: function () {
      const that = this
      this.$axios({
        method: "post", url: `:8080/ysyx_passenger/passenger/login/byDatabaseAcc`,
        data: {
          passengerAcc: this.loginForm.passengerAcc,
          passengerPwd: md5(this.loginForm.passengerPwd)
        }

      }).then(res => {
        console.log(res.data)
        if (res.data.statusCode == 101) {
          Toast.success(res.data.message);

        } else if (res.data.statusCode == 102) {
          Toast.success(res.data.message);
          router.push({path: "home"})
          this.$store.state.passengerInfo=res.data.list[0]

        } else if (res.data.statusCode == 201) {
          Toast.fail(res.data.message);
        }

      }).catch(err => {
        console.log(err)
      })

    },

    register: function () {
      router.push({path: "registerView"})
    },
    smsLogin: function () {
      router.push({path: "verification"})
    }

  },
}
</script>

<style scoped>

.logo {
  width: 180px;
  height: 130px;
  margin-top: 50px;
  margin-left: 22%;
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
  border-radius: 15px; /*边框弧度*/
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.63);
  overflow: hidden;
}


</style>