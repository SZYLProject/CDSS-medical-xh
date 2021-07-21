<template>
  <div class="pinfo-wrap">
    <div class="pinfo-item-wram pinfo-left-wrap">
      <div class="pinfo-item-child-wrap pinfo-item-child-l-wrap" v-for="(model, i) in diseaseInfoTwos" :key="i">
        <!--  col 1,2-->
        <div class="p-i-c-item-wrap p-i-c-top-wram" v-for="(item, idx) in model" :key="idx">
          <p class="p-i-c-top-title-wrap">
            <span class="xjtitle-color">{{item.disease_info_title}}</span>
            <i class="el-icon-edit"></i>
          </p>
          <!-- key:value横向展示 -->
          <div class="p-i-c-middle-wrap" v-if = '!formatterChildren(item.children)'>
            <p class="p-i-c-m-val-wrap padding-l-r" v-for="child in item.children" :key="child.id" :style="{width:child.portion+'%'}">
              <span class="TNM-label">{{child.disease_info_title}}：</span>
              <span class="xj-span-title padding-l-r" :class="{'RBC-label-2':child.abnormal_value_judgment===1,'RBC-label-3':child.abnormal_value_judgment ===2}">{{child.disease_info_title_value}}{{child.disease_info_title_unit}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="pinfo-item-wram pinfo-right-wrap">
      <div class="pinfo-item-child-wrap pinfo-item-child-l-wrap">
        <!--  病理-->
        <div class="p-i-c-item-wrap p-i-c-top-wram">4</div>
      </div>
      <div class="pinfo-item-child-wrap pinfo-item-child-r-wrap">
        <!-- 基因检测 -->
        <div class="p-i-c-item-wrap p-i-c-top-wram">5</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  props: {
    diseaseInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      pathologyInfo: state => state.disease360.pathologyInfo
    }),
    diseaseInfoTwos: function () {
      const model = this.diseaseInfo.diseaseInfoModel
      return [[{ ...model[0] }, { ...model[1] }], [{ ...model[2] }, { ...model[3] }]]
    }
  },
  created () {
    console.log(1111, this.diseaseInfo, this.diseaseInfoTwos)
  },
  methods: {
    ...mapMutations({ ONSHOWTOAST: 'disease360/ONSHOWTOAST' }),
    formatterChildren (children) {
      children.every((e) => {
        console.log(e)
      })
      return children.every(e => e.children)
    }
  }
}
</script>

<style lang="scss" scoped>
$xjTheme-clor:rgba(126,168,215,.6);
// $xjTheme-clor:rgba(37,54,73,.4);
$xjTheme-clor:#eee;
$activeColor:rgba(126,168,215,1);
@mixin flexStyle($just:center,$aligin:center){
  display: flex;
  justify-content: $just;
  align-items: $aligin;
}
.pinfo-wrap {
  height: 100%;
  // background-color: darkcyan;
  display: flex;
  border-top: 1px solid $xjTheme-clor;
  min-height: 600px;
  .pinfo-item-wram {
    flex: 1;
    display: flex;
    overflow-y: hidden;
    .pinfo-item-child-wrap {
      flex: 1;
      margin-right: 2px;
      display: flex;
      flex-direction: column;
      .p-i-c-item-wrap {
        border: 1px solid $xjTheme-clor;
        flex: 1;
        border-top: none;
        min-height: 160px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        .p-i-c-top-title-wrap {
          position: sticky;
          top: 0;
          min-height: 40px;
          background: #fff;
          @include flexStyle(space-between,center);
          padding: 0 14px;
          i {
            font-size: 15px;
            &:hover {
              color: $activeColor;
            }
          }
        }
        .p-i-c-middle-wrap {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          align-content: baseline;
          padding-left: 8px;
          .p-i-c-m-val-wrap {
            @include flexStyle(flex-start,center);
          }
        }
      }
      .p-i-c-bottom-wram {
        flex: 1.5;
        border: 1px solid $xjTheme-clor;
        position: relative;
        border-top: none;
        &::before{
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background-color: $xjTheme-clor;
          top: 2px;
        }
      }
    }
  }
}
</style>
