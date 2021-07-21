<!--
 * @Author: JST
 * @Date: 2020-08-22 15:34:26
 * @LastEditTime: 2020-08-23 15:48:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /medical-360/src/components/Empty.vue
 -->
<template>
  <div class="empty-wrap">
    <img src="../../../static/images/empty.png" alt="">
      <span>暂无更多内容</span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.empty-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img{
    width: 150px;
  }
  span{
    color: #ccc;
    font-size: 15px;
    margin-top: 34px;
  }

}
</style>
