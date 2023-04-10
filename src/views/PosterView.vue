<template>
  <div>
    <van-image
        width="100%"
        height="100%"
        :src="require('../img/Poster.png')"
    />
  </div>
</template>

<script>
export default {
  name: "PosterView",
  data() {
    return {
      timer: null,
    }
  },

  methods: {
    setTimer() {

      if (this.timer == null) {
        this.timer = setTimeout(() => {
          console.log("跳转")
          this.$router.push('/login')
        }, 3000)
      }
    }
  },
  created: function () {
    this.timer = null,
        this.setTimer()
  },

  destroyed: function () {
    this.timer = null
  }

}
</script>

<style scoped>

</style>