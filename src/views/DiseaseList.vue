<template>
  <router-view class="view"></router-view>
  <!-- <div class="l-wrap">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div> -->
</template>
<script>
export default {
  watch: {
    '$route.meta.index': function (n, o) {
      console.log(o, n)
      if (o > n) {
        this.$route.meta.keepAlive = true
      } else {
        this.$route.meta.keepAlive = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.l-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
