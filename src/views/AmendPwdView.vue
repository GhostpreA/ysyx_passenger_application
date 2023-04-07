<template>

  <div>
    <van-nav-bar
        title="修改密码"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <br>
    <van-cell-group>
      <van-field label="账号" value="输入框已禁用" disabled/>

      <van-field
          v-model="rawPwd"
          type="password"
          name="原密码"
          label="原密码"
          placeholder="原密码"
      />

      <van-field
          v-model="password"
          type="password"
          name="新密码"
          label="新密码"
          placeholder="填写新密码"

      />

      <van-field
          v-model="redoPwd"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="再次填写确认"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">修改</van-button>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "AmendPwd",
  data() {
    return {
      rawPwd: '',//原密码
      password: '',
      redoPwd: '',
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