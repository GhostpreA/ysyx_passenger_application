<template>

  <div>
    <van-nav-bar
        title="手机号"
        left-text="返回"
        :fixed=true
        left-arrow
        @click-left="onClickLeft">
    </van-nav-bar>

    <div class="ss" style=" margin-top: 150px;margin-left: 12%">
      <samp style="font-size: 23px; text-align: center">当前手机号:135*****553</samp>
    </div>

    <div class="ss" style=" margin-top: 50px;margin-left: 22%">
      <samp style="font-size: 23px; text-align: center">请输入新的手机号</samp>
    </div>

    <div>
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
    </div>

        <van-button type="info" style="width: 320px; margin: 30px;">修改手机号</van-button>
  </div>

</template>

<script>
import router from "@/router";

export default {
  name: "BindingPhoneView",
  data() {
    return {
      cellphone: '',
      cellphoneShow: false,
    }
  },
  methods: {
    onClickLeft() {
      router.push({path: "setting"})
    }
  }
}
</script>

<style scoped>

</style>