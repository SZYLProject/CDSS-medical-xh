<template>
  <div class="h-info-wrap">
    <div class="info-item">
      <h3>患者姓名:</h3>
      <span>邱**</span>
    </div>
    <div class="info-item">
      <h3>性别:</h3>
      <span>女</span>
    </div>
    <div class="info-item">
      <h3>年龄:</h3>
      <span>34</span>
    </div>
    <div class="info-item">
      <h3>身高:</h3>
      <span>175cm</span>
    </div>
    <div class="info-item">
      <h3>体重:</h3>
      <span>60kg</span>
    </div>
    <div class="info-item">
      <h3>入院时间:</h3>
      <span>2018/03/10 16:32:20</span>
    </div>
    <div class="info-item">
      <h3>入院诊断:</h3>
      <span>心肌梗死</span>
    </div>
    <div class="info-item">
      <h3>发作到住院时间:</h3>
      <span>12小时</span>
    </div>
    <div class="info-item">
      <h3>血管重建方案:</h3>
      <span>直接PCI</span>
    </div>
    <div class="info-item">
      <h3>发病前状态:</h3>
      <span>剧烈运动、情绪激动、饱餐</span>
    </div>
    <div class="info-item">
      <h3>既往史:</h3>
      <span>糖尿病</span>
    </div>
    <div class="info-item">
      <h3>当前心电图:</h3>
      <span>无病理性Q波</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.h-info-wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 40px;

  .info-item {
    display: flex;
    align-items: center;
    line-height: 24px;
    padding-right: 30px;
    h3{
      padding-right: 10px;
      font-size: 13px;
      font-weight: 600;
    }
  }
}
</style>
