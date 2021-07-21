<template>
  <div class="no-c-wrap">
    <div class="ctn-wrap">
      <img src="../static/images/empty.svg" alt="" srcset="">
      <p>404</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.no-c-wrap {
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
  .ctn-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      font-size: 33px;
      font-weight: 900;
      color: #8a8a8a;
    }
  }
}
</style>
