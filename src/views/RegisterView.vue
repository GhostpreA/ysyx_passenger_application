<template>
  <div>
    <div class="top">
      <van-icon name="arrow-left" size="40px" @click="back"/>
      <div>
        <van-icon name="user-circle-o" size="60px" style="margin-top: 50px; margin-left: 43%;"/>
      </div>
      <br>
      <samp style="font-size: 25px;margin-left: 45%">注册</samp>
    </div>

    <div class="userForm">
      <div style="width: 70%; height: 280px; margin: 60px 50px;">
          <van-field
              v-model="username"
              name="昵称"
              label="用户名"
              placeholder="昵称"
              :rules="[{ required: true, message: '请填写昵称' }]"
          />
          <van-field
              name="手机号"
              type="tel"
              label="手机号"
              placeholder="手机号"
              :value="cellphone"
              @touchstart.native.stop="cellphoneShow = true"
              :rules="[{ required: true, message: '请填写手机号' }]"
          />

          <!--手机号码数字键盘-->
          <van-number-keyboard
              v-model="cellphone"
              :show="cellphoneShow"
              :maxlength="13"
              @blur="cellphoneShow = false"
          />
          <van-field
              v-model="sms"
              center
              clearable
              label="短信验证码"
              placeholder="请输入短信验证码"
          >
            <template #button>
              <van-button size="small" type="primary">发送验证码</van-button>
            </template>
          </van-field>

          <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
              v-model="redoPwd"
              type="password"
              name="重复密码"
              label="重复密码"
              placeholder="重复密码"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">注册</van-button>
          </div>
      </div>
    </div>

  </div>

</template>

<script>
import router from "@/router";

export default {



  name: "registerView",
  data() {
    return {
      username: '',
      cellphone: '',
      password: '',
      redoPwd:'',
      cellphoneShow: false,
    };
  },
  methods: {
    onSubmit(values) {//登入提交表单中内容 Object类型
      console.log('submit', values);
    },

    back:function () {
     router.push({path:"login"})
    },

  },
}
</script>

<style scoped>
.top {
  margin-top: 35px;
  width: 100%;
  height: 300px;
  background-color: rgba(116, 178, 255, 0.89);
}

.userForm {
  width: 100%;
  height: 80%;
  margin-top: 70px;
  background-color: rgba(253, 253, 253, 0.6);
  border-radius: 15px; /*边框弧度*/
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.63);
  overflow: hidden;
}
</style>