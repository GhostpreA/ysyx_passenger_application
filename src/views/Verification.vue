<template>
  <div>
    <van-icon name="arrow-left" size="40px" style="margin-top: 35px" @click="back"/>
    <div class="hint">
      请输入手机号
    </div>
    <br>
    <div style="margin-left: 50px">
      为了方便进行联系，请输入您常用手机号码
    </div>
    <div class="userForm">
      <div style="width: 90%; height: 250px; margin: 80px 30px;">

        <van-field
            v-model="cellphone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
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
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">登入</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Verification",
  data() {
    return {
      cellphone: '',
      sms: '',
    }
  },

  methods: {
    onSubmit(values) {//登入提交表单中内容 Object类型
      console.log('submit', values);
    },
    back: function () {//返回登入主页面
      router.push({path: "login"})
    },
    getCode:function () {

      console.log(this.cellphone)
      const that = this
      this.$axios({
        method:"get",
        baseURL:"http://localhost:8081",
        url:`/api/passenger/login/getCode/${this.cellphone}`,
      }).then(res=>{
        console.log(res.status)


      }).catch(err=>{
        console.log(err)
      })

    }
  },
}
</script>

<style scoped>
.hint {
  margin-top: 50px;
  margin-left: 40px;
  font-size: 35px;
  font-weight: bold;
  text-align: left;
  color: rgba(85, 95, 100, 0.60);
}

.userForm {
  width: 100%;
  height: 600px;
  margin-top: 70px;
  background-color: rgba(253, 253, 253, 0.6);
  border-radius: 15px; /*边框弧度*/
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.63);
  overflow: hidden;
}
</style>