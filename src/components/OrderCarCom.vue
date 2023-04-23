<template>
<div>
  <div class="block" style="width: 90%; height: 650px; text-align: center">
    <div class="payForm">
      <div style="width: 240px; height: 300px; margin: 0px auto;">

        <div type="flex" style="text-align: left">
          <div span="22">订单号: {{ this.$store.state.unPayOrderInfo.orderId }}</div>
          <br>
          <div span="22">起点位置: {{ this.$store.state.unPayOrderInfo.startName }}</div>
          <br>
          <div span="22">终点位置: {{this.$store.state.unPayOrderInfo.endName}}</div>
          <br>
          <div span="22">结束时间: {{ this.$store.state.unPayOrderInfo.orderStatustime }}</div>
          <br>
          <div span="22">价格: {{this.$store.state.unPayOrderInfo.orderCost}}</div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: "OrderCarCom"
}
</script>

<style scoped>

</style>
