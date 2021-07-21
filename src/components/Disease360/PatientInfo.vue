<template>
  <div class="patient-info-wrap">
    <div class="user-info-wrap">
      <div class="user-info-wrap">
        <div class="user-item" >
          <span class="user-label">姓名 :</span><span class="user-val xjtheme-color">{{basicInfoModel.tpatname}}</span>
          <span class="user-label">病案号 :</span><span class="user-val xjtheme-color">{{basicInfoModel.tpatno}}</span>
          <span class="user-label">性别 :</span><span class="user-val xjtheme-color">{{basicInfoModel.gender}}</span>
          <span class="user-label">年龄 :</span><span class="user-val xjtheme-color">{{basicInfoModel.age}}</span>
          <span class="user-label">身高 :</span><span class="user-val xjtheme-color">{{basicInfoModel.height}}</span>
          <span class="user-label">体重 :</span><span class="user-val xjtheme-color">{{basicInfoModel.weight}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'element-ui'
export default {
  components: {
    [Button.name]: Button
  },
  props: {
    basicInfoModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../static/style/flexStyle';
$theme-clor:rgb(35,53,75);
$xjTheme-border-clor:rgb(126,168,215);
$xjTheme-clor:rgb(35,53,75);
@mixin flex-center(){
  display: flex;
  align-items: center;
}
.patient-info-wrap {
  height: 100%;
  display: flex;
  align-items: center;
  border-top: 1px solid #ddd;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .btn-wrap {
    width: 150px;
    height: 100%;
    @include flexistyle();
    padding-right: 40px;
    button {
        width: 200px;
        background-color: rgba($color: $xjTheme-clor, $alpha: .9);
        border-color: $xjTheme-clor;
      }
  }
  .user-info-wrap {
      flex: 1;
      @include flexistyle();
      justify-content: flex-start;
      padding: 0 10px;
    }
  .user-info-wrap {
    @include flex-center;
    .user-item {
      @include flex-center;
      .user-label {
        font-weight: 700;
      }
      .user-val {
        padding-left: 14px;
        padding-right: 40px;
      }
    }
  }
}
</style>
