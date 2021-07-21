<template>
  <div class="pathology-info-ctn-wrap" v-if="diseaseInfo">
    <div class="info-wrap clinical-info-wrap">
      <div class="clinical-info-top-wrap" ref="infoTopWrap0">
        <div class="clinical-top-wrap">
          <span class="xjtitle-color" v-if="diseaseInfo.diseaseInfoModel[0]">{{
            diseaseInfo.diseaseInfoModel[0] &&
              diseaseInfo.diseaseInfoModel[0].disease_info_title
          }}</span
          ><i
            class="el-icon-edit"
            @click="
              ONSHOWTOAST({
                parentIndex: 1,
                childIndex: 0,
                isParent: false,
                isSearch: false
              })
            "
          ></i>
        </div>
        <div
          class="clinical-middle-wrap"
          v-if="
            diseaseInfo.diseaseInfoModel[0] &&
              diseaseInfo.diseaseInfoModel[0].children
          "
        >
          <div
            v-for="(ns, index) in formatterChildren(
              diseaseInfo.diseaseInfoModel[0].children,
              1
            )"
            :key="index"
            class="sub-wrap"
          >
            <span v-if=" diseaseInfo.diseaseInfoModel[0].children[index]" class="TNM-label">{{ ns.disease_info_title || '' }}:</span>
            <span v-if=" diseaseInfo.diseaseInfoModel[0].children[index]" class="padding-23 default-color"
              >{{ ns.disease_info_title_value
              }}{{ ns.disease_info_title_unit }}</span
            >
          </div>
          <div
            v-for="(ns, index) in formatterChildren(
              diseaseInfo.diseaseInfoModel[0].children,
              0
            )"
            :key="ns.id + index"
            class="sub-wrap"
          >
            <p v-if=" diseaseInfo.diseaseInfoModel[0].children[index]">
              <span class="TNM-label">{{ ns.disease_info_title  || '' }}:</span>
            </p>
            <div class="sub-c-wrap" v-if=" diseaseInfo.diseaseInfoModel[0].children[index]">
              <p
                class="sub-wrap"
                v-for="schild in ns.children"
                :key="schild.id"
              >
                <span class="TNM-label">{{ schild.disease_info_title || ''}}:</span>
                <span class="padding-23 default-color"
                  >{{ schild.disease_info_title_value
                  }}{{ schild.disease_info_title_unit }}</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="clinical-info-middle-wrap"
        v-if="diseaseInfo.diseaseInfoModel[2]"
      >
        <div class="clinical-top-wrap">
          <span class="xjtitle-color">{{
            diseaseInfo.diseaseInfoModel[2] &&
              diseaseInfo.diseaseInfoModel[2].disease_info_title
          }}</span
          ><i
            class="el-icon-edit"
            @click="
              ONSHOWTOAST({
                parentIndex: 1,
                childIndex: 1,
                isParent: false,
                isSearch: false
              })
            "
          ></i>
        </div>
        <div class="clinical-m-middle-wrap">
          <div
            class="clinical-m-middle-l-wrap"
            v-if="
              diseaseInfo.diseaseInfoModel[2] &&
                diseaseInfo.diseaseInfoModel[2].children
            "
          >
            <p
              v-for="clinicalSsmtz in diseaseInfo.diseaseInfoModel[2]
                .children[0].children"
              :key="clinicalSsmtz.id"
            >
              <span class="TNM-label"
                >{{ clinicalSsmtz.disease_info_title }}:</span
              >
              <span
                class="xj-span-title padding-l-r"
                :class="{
                  'RBC-label-2': clinicalSsmtz.abnormal_value_judgment === 1,
                  'RBC-label-3': clinicalSsmtz.abnormal_value_judgment === 2
                }"
              >
                {{ clinicalSsmtz.disease_info_title_value
                }}{{ clinicalSsmtz.disease_info_title_unit }}</span
              >
            </p>
          </div>
        </div>
        <div
          class="clinical-m-middle-wrap"
          v-if="
            diseaseInfo.diseaseInfoModel[2] &&
              diseaseInfo.diseaseInfoModel[2].children[2]
          "
        >
          <div class="clinical-m-middle-tz-wrap">
            <p class="tx-label-wrap">
              <span class="TNM-label"
                >{{
                  diseaseInfo.diseaseInfoModel[2].children[2]
                    .disease_info_title
                }}:</span
              >
            </p>
            <div class="tz-r-wrap">
              <template
                v-for="(item, index) in diseaseInfo.diseaseInfoModel[2]
                  .children[2].children"
              >
                <p
                  :key="index"
                  class="xj-span-title default-color"
                  v-if="
                    diseaseInfo.diseaseInfoModel[2].children ||
                      item.disease_info_title_value === 'y'
                  "
                >
                  {{ item.disease_info_title }}
                </p>
              </template>
            </div>
          </div>
        </div>
        <div
          class="clinical-m-middle-wrap clinical-m-middle-tz-wrap-noline"
          v-if="diseaseInfo.diseaseInfoModel[2].children[1]"
        >
          <div class="clinical-m-middle-tz-wrap">
            <p class="tx-label-wrap">
              <span class="TNM-label"
                >{{
                  diseaseInfo.diseaseInfoModel[2].children[1]
                    .disease_info_title
                }}:</span
              >
            </p>
            <div class="tz-r-wrap">
              <template
                v-for="(item, index) in diseaseInfo.diseaseInfoModel[2]
                  .children[1].children"
              >
                <p
                  v-if="
                    diseaseInfo.diseaseInfoModel[2].children ||
                      item.disease_info_title_value === 'y'
                  "
                  :key="index"
                  class="xj-span-title default-color"
                >
                  {{ item.disease_info_title }}
                </p>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 实验室检查部分 -->
    <div
      class="info-wrap laboratory-info-wrap"
      v-if="
        diseaseInfo.diseaseInfoModel[1] &&
          diseaseInfo.diseaseInfoModel[1].children
      "
    >
      <div class="l-i-top-wrap">
        <div
          class="clinical-m-middle-wrap laboratory-info-top-wrap laboratory-sys-wrap"
          v-for="(child, index) in diseaseInfo.diseaseInfoModel[1].children"
          :key="index"
        >
          <p class="clinical-title-wrap" v-if="index === 0">
            <span class="xjtitle-color">{{
              diseaseInfo.diseaseInfoModel[1].disease_info_title
            }}</span
            ><i
              class="el-icon-edit"
              @click="
                ONSHOWTOAST({
                  parentIndex: 2,
                  childIndex: 2,
                  isParent: false,
                  isSearch: false
                })
              "
            ></i>
          </p>
          <!-- 实验室检查下每个小标题 -->
          <div v-if="child && child.children" class="xjtitle-color">
            {{ child.disease_info_title }} :
          </div>
          <div v-else-if="child">{{ child.disease_info_title }} :</div>
          <div class="laboratory-sys-4-wrap">
            <div
              class="laboratory-sys-item-wrap"
              v-for="(item, index) in child.children"
              :key="index"
            >
              <template
                v-if="
                  diseaseInfo.diseaseInfoModel[1].children ||
                    item.disease_info_title_value != 'n'
                "
              >
                <p class="laboratory-title TNM-label ">
                  {{ item.disease_info_title }}
                </p>
                <p
                  v-if="item.presentation_type != 2"
                  class="laboratory-dvalue"
                  :class="[
                    item.abnormal_value_judgment
                      ? 'RBC-label-' + item.abnormal_value_judgment
                      : 'default-color'
                  ]"
                >
                  {{ item.disease_info_title_value
                  }}{{ item.disease_info_title_unit
                  }}<i
                    class="el-icon-caret-bottom RBC-label-3"
                    v-if="
                      item.disease_info_title_value &&
                        item.abnormal_value_judgment === 1
                    "
                  ></i
                  ><i
                    v-else-if="
                      item.disease_info_title_value &&
                        item.abnormal_value_judgment === 2
                    "
                    class="el-icon-caret-top RBC-label-3"
                  ></i>
                </p>
                <p class="laboratory-date RBC-date">{{ item.visit_time }}</p>
              </template>
            </div>
          </div>
        </div>
        <p class="bottom-more"></p>
      </div>
    </div>
    <div
      class="info-wrap p-pathology-info-wrap"
      v-if="diseaseInfo.diseaseInfoModel[4] &&diseaseInfo.diseaseInfoModel[4].children"
    >
      <p class="clinical-title-wrap">
        <span class="xjtitle-color">{{
          diseaseInfo.diseaseInfoModel[4].disease_info_title
        }}</span
        ><i
          class="el-icon-edit"
          @click="
            ONSHOWTOAST({
              parentIndex: 4,
              childIndex: 4,
              isParent: false,
              isSearch: false
            })
          "
        ></i>
      </p>
      <!-- <div class="pathology-wrap">
      <span class="TNM-label">是否{{diseaseInfo.diseaseInfoModel[4].children[0].disease_info_title}}</span><span class="TNM-label default-color">{{diseaseInfo.diseaseInfoModel[4].children[0].disease_info_title_value}}</span>
    </div> -->
      <div class="pathology-wrap pathology-wrap-collumn">
        <!-- <span class="TNM-label">原位腺癌（AIS、BAC）</span> -->
        <div
          class="lung-wrap"
          v-if="diseaseInfo.diseaseInfoModel[4].positionName"
          :class="[
            diseaseInfo.diseaseInfoModel[4].positionName
              .split(',')[0]
              .split('-')[0] + '-block'
          ]"
        >
          <div
            class="image-lung"
            v-for="img in diseaseInfo.diseaseInfoModel[4].positionName
              .split(',')
              .filter(e => e)"
            :key="img"
            :class="img"
          ></div>
        </div>
      </div>
      <div
        v-for="(lung, index) in diseaseInfo.diseaseInfoModel[4].children"
        :key="index"
        class="pathology-wrap"
      >
        <span class="TNM-label" style="padding: 0; padding-bottom:8px;">{{
          lung.disease_info_title
        }}</span
        ><span class="default-color" style="margin-left: 12px;"
          >{{ lung.disease_info_title_value
          }}{{
            lung.disease_info_title_unit ? lung.disease_info_title_unit : ''
          }}</span
        >
      </div>
    </div>

    <div class="info-wrap clinical-info-wrap">
      <div class="scroll-wrap">
        <div class="jy-info-top-wrap border-all" ref="infoTopWrap1">
          <!-- <div class="clinical-top-wrap">
          <span class="xjtitle-color">基因检查</span><i class="el-icon-edit" @click="ONSHOWTOAST({parentIndex:4,childIndex:1,isParent:false,isSearch:false})"></i>
        </div>
        <div class="jy-middle-wrap">
          <p class="clinical-label" v-for="(jcItem, index) in pathologyInfo.jyjc" :key="index"><span class="xj-sub-middle-title">{{jcItem.label}}</span><span :class="[jcItem.value?'default-color':'xj-sub-middle-val1','xj-sub-middle-val']">{{jcItem.value===0?'阴性':'阳性'}}</span></p>
          <p>......</p>
        </div> -->
        </div>
        <div class="jwhistory-wrap" v-if="diseaseInfo.diseaseInfoModel[5]">
          <div class="clinical-top-wrap">
            <span class="xjtitle-color">{{
              diseaseInfo.diseaseInfoModel[5].disease_info_title
            }}</span
            ><i
              class="el-icon-edit"
              @click="
                ONSHOWTOAST({
                  parentIndex: 4,
                  childIndex: 5,
                  isParent: false,
                  isSearch: false
                })
              "
            ></i>
          </div>
          <div
            class="jwhistory-m-middle-wrap"
            v-if="diseaseInfo.diseaseInfoModel[5].children && diseaseInfo.diseaseInfoModel[5].children[0].disease_info_title_value"
          >
            <p
              v-for="(item,
              index) in diseaseInfo.diseaseInfoModel[5].children[0].disease_info_title_value.split(
                ','
              )"
              :key="index"
              class="xj-sub-middle-title"
            >
              {{ item }}
            </p>
          </div>
          <p style="padding-left:40px;padding-bottom:20px;">......</p>
        </div>
        <div
          class="clinical-info-middle-wrap"
          v-if="diseaseInfo.diseaseInfoModel[3]"
        >
          <div class="l-i-bottom-wrap l-i-top-wrap">
            <div
              class="clinical-m-middle-wrap laboratory-info-top-wrap laboratory-sys-wrap"
              style="flex-direction: column;"
            >
              <p class="clinical-title-wrap">
                <span class="xjtitle-color">{{
                  diseaseInfo.diseaseInfoModel[3].disease_info_title
                }}</span
                ><i
                  class="el-icon-edit"
                  @click="
                    ONSHOWTOAST({
                      parentIndex: 2,
                      childIndex: 3,
                      isParent: false,
                      isSearch: false
                    })
                  "
                ></i>
              </p>
              <div
                class="laboratory-sys-4-wrap"
                v-if="diseaseInfo.diseaseInfoModel[3].children"
              >
                <div
                  class="laboratory-sys-item-wrap"
                  v-for="(child, index) in diseaseInfo.diseaseInfoModel[3]
                    .children"
                  :key="index"
                  :style="{ width: child.portion ? child.portion : '' + '%' }"
                >
                  <p class="laboratory-title TNM-label ">
                    {{ child.disease_info_title }}
                  </p>
                  <p
                    class="laboratory-value"
                    :class="[
                      child.degree
                        ? 'RBC-label-' + child.degree
                        : 'default-color'
                    ]"
                  >
                    <span v-if="child.presentation_type != 2"
                      >{{ child.disease_info_title_value
                      }}{{ child.disease_info_title_unit }}</span
                    >
                  </p>
                  <p class="laboratory-date RBC-date" v-if="child.visit_time">
                    {{ child.visit_time }}
                  </p>
                  <p
                    v-else-if="child.children"
                    v-for="item in child.children"
                    :key="item.id"
                  >
                    <span
                      class="TNM-label"
                      style="padding: 0; padding-bottom:8px;"
                      >{{ item.disease_info_title }}</span
                    ><span class="default-color" style="margin-left: 12px;"
                      >{{ item.disease_info_title_value
                      }}{{
                        item.disease_info_title_unit
                          ? item.disease_info_title_unit
                          : ''
                      }}</span
                    >
                  </p>
                </div>
              </div>
            </div>
            <p class="bottom-more"></p>
          </div>
          <!-- <div class="clinical-top-wrap">
          <span class="xjtitle-color">既往治疗</span><i class="el-icon-edit" @click="ONSHOWTOAST({parentIndex:4,childIndex:3,isParent:false,isSearch:false})"></i>
        </div>
        <div class="jwhistory-m-middle-wrap border-bottom">
          <p v-for="(item, index) in pathologyInfo.historyZl" :key="index" class="xj-sub-middle-title">{{item}}</p>
        </div>
        <div class="jwhistory-fs-middle-wrap border-bottom">
          <p><span class="xj-sub-middle-title">肺叶切除</span><span class="qctime">2019-7-19</span></p>
          <p>......</p>
        </div>
        <div class="jwhistory-fs-middle-wrap ">
          <p><span class="xj-sub-middle-title">预防性脑照射</span><span class="xj-sub-middle-title">伽玛刀</span><span class="xj-sub-middle-title">GTV</span></p>
        </div> -->
        </div>
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
  computed: {
    ...mapState({
      pathologyInfo: state => state.disease360.pathologyInfo
    })
  },
  mounted () {
    // console.log(
    //   this.diseaseInfo.diseaseInfoModel[4]?.positionName
    //     .split(',')[0]
    //     .split('-')[0] + '-block',
    //   'diseaseInfo.diseaseInfoModel[4].positionName.split(',
    //   ')[0].split(' - ')[0]+'
    // )
  },
  methods: {
    ...mapMutations({
      ONSHOWTOAST: 'disease360/ONSHOWTOAST'
    }),
    formaterDiseaseChildren (v) {
      return v.filter((e, i) => {
        return i > 0
      })
    },
    formatterChildren (arr, has) {
      const as = arr.filter(e => {
        return has ? !e?.children : e?.children
      })
      console.log(as)
      return as
    }
  }
}
</script>

<style lang="scss" scoped>
$xjTheme-clor: #eee;
.pathology-info-ctn-wrap {
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  overflow: hidden;
  .info-wrap {
    flex: 1;
    position: relative;
    height: 100%;
    overflow-y: auto;

    .scroll-wrap {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }
  }

  .clinical-m-middle-wrap {
    display: flex;
    margin: 0 20px;
    border-bottom: 1px solid $xjTheme-clor;

    .clinical-title-wrap {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      padding-bottom: 0;
    }
  }

  .clinical-top-wrap {
    display: flex;
    justify-content: space-between;
    padding: 6px 14px;
    color: $xjTheme-clor;
    align-items: center;
    font-size: 14px;
    font-weight: 900;
    padding-bottom: 5px;

    i {
      color: #606266;
    }
  }

  .clinical-info-wrap {
    margin-right: 1px;
    border-left: none;
    border-bottom: 1px solid $xjTheme-clor;
    display: flex;
    flex-direction: column;

    .clinical-info-top-wrap {
      padding-bottom: 14px;
      border: 1px solid $xjTheme-clor;
      overflow: auto;
      min-height: 160px;
    }

    .clinical-info-middle-wrap {
      flex: 1;
      margin-top: 3px;
      border: 1px solid $xjTheme-clor;

      .clinical-m-middle-wrap {
        display: flex;
        margin: 0 14px;
        border-bottom: 1px solid $xjTheme-clor;

        .clinical-m-middle-l-wrap {
          p {
            padding: 6px 0;
            width: 50%;
          }

          flex: 1;
          min-height: 100px;
          display: flex;
          flex-wrap: wrap;
        }

        .clinical-m-middle-tz-wrap {
          display: flex;
          min-height: 80px;
          padding-top: 20px;
          width: 100%;
          .tx-label-wrap {
            padding-right: 8px;
          }

          .tz-r-wrap {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            margin-right: 14px;
            p {
              width: 50%;
              padding-bottom: 6px;
            }
          }
        }

        .history-wrap {
          flex: 1;
        }
      }

      .clinical-m-middle-tz-wrap-noline {
        border-bottom: none;
      }
    }
  }

  .clinical-middle-wrap {
    padding: 0 14px;
    display: flex;
    flex-wrap: wrap;

    .padding-23 {
      padding: 1px 1px 6px 3px;
    }

    .sub-wrap {
      padding-right: 10px;
      padding-top: 8px;
      padding-bottom: 4px;
    }

    .clinical-label {
      padding: 15px 0;
    }
  }

  .laboratory-info-wrap {
    margin: 0 2px;
    border: 1px solid $xjTheme-clor;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .laboratory-info-top-wrap {
      min-height: 60px;
      display: flex;
      flex-direction: column;

      &:last-of-type {
        border-bottom: none;
      }

      .laboratory-top-wrap {
        display: flex;
        justify-content: space-between;
        padding: 14px;
        color: #7ea8d7;
        align-items: center;
        font-size: 14px;
        font-weight: 900;
      }
    }

    .laboratory-sys-wrap {
      display: flex;
      flex-direction: column;

      .laboratory-sys-4-wrap {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 6px;
        align-content: baseline;

        .laboratory-sys-item-wrap {
          width: 50%;
          box-sizing: border-box;

          .laboratory-dvalue {
            display: flex;
            justify-content: space-between;
            padding-right: 15%;

            i {
              font-size: 18px;
            }
          }

          .laboratory-value {
            line-height: 23px;
          }
        }
      }
    }

    .l-i-top-wrap {
      overflow-y: auto;
      position: relative;
      border-bottom: 1px solid $xjTheme-clor;

      .bottom-more {
        height: 20px;
        position: sticky;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: linear-gradient(#fff, #fff, #eee);
        opacity: 0.5;
      }
    }

    .l-i-bottom-wrap {
      margin-top: 2px;
      padding-top: 6px;
      max-height: 40%;
      overflow-y: auto;
      position: relative;
      border: 1px solid $xjTheme-clor;
      // flex: 1;
    }
  }

  .p-pathology-info-wrap {
    margin: 0 2px;
    border: 1px solid $xjTheme-clor;

    .clinical-title-wrap {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      padding-bottom: 0;
    }

    .pathology-wrap {
      padding-left: 10px;
      padding-right: 30px;
      display: flex;
      justify-content: space-between;
    }

    .pathology-wrap-collumn {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .inspect-info-wrap {
    margin-left: 1px;
    border-right: none;
    display: flex;
    flex-direction: column;

    .inspect-info-wrap-top {
      height: 200px;
      border: 1px solid $xjTheme-clor;
    }

    .inspect-info-wrap-middel {
      height: 200px;
      border: 1px solid $xjTheme-clor;
      margin: 2px 0;
    }

    .inspect-info-wrap-bottom {
      flex: 1;
      border: 1px solid $xjTheme-clor;
    }
  }

  .qc-wrap {
    p {
      display: flex;
      justify-content: space-between;
      padding: 20px;
    }
  }

  .jwhistory-wrap {
    margin-top: 2px;
    border: 1px solid #eee;
  }

  .jy-middle-wrap {
    padding: 0 20px;
    padding-top: 4px;

    p {
      display: flex;
      justify-content: space-between;
      padding: 0 60px 10px 20px;
    }
  }

  .xj-sub-middle-val0 {
    color: #409eff;
  }

  .xj-sub-middle-val1 {
    color: #e6a23c;
  }

  .jwhistory-m-middle-wrap {
    display: flex;
    flex-wrap: wrap;
    margin: 0 20px;
    padding-top: 10px;

    p {
      width: 33%;
      padding-left: 20px;
      padding-bottom: 10px;
    }
  }

  .jwhistory-fs-middle-wrap {
    margin: 0 20px;

    p {
      padding: 8px 20px;
      display: flex;
      padding-right: 40px;
      justify-content: space-between;

      .qctime {
        color: #909399;
      }
    }
  }

  .lung-wrap {
    width: 250px;
    height: 250px;
    margin: 20px auto 10px;
    background: url('../../static/images/lung/lung.png') no-repeat;
    background-size: contain;
    position: relative;
    background-position: center;

    .image-lung {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }

    .lung-01 {
      background: url('../../static/images/lung/01.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .lung-02 {
      background: url('../../static/images/lung/02.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .lung-03 {
      background: url('../../static/images/lung/03.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .lung-04 {
      background: url('../../static/images/lung/04.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .lung-05 {
      background: url('../../static/images/lung/05.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
  }
  .bc-block {
    width: 250px;
    height: 250px;
    margin: 20px auto 10px;
    background: url('../../static/images/lung/bc.png') no-repeat;
    background-size: contain;
    position: relative;
    background-position: center;

    .image-bc {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }

    .lung-01 {
      background: url('../../static/images/lung/01.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .lung-02 {
      background: url('../../static/images/lung/02.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .lung-03 {
      background: url('../../static/images/lung/03.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .lung-04 {
      background: url('../../static/images/lung/04.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .lung-05 {
      background: url('../../static/images/lung/05.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
  }
  .hc-block {
    width: 355px;
    height: 250px;
    margin: 20px auto 10px;
    background: url('../../static/images/liver/liver.png') no-repeat;
    background-size: contain;
    position: relative;
    background-position: center;
    .image-lung {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }

    .hc-01 {
      background: url('../../static/images/liver/01.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .hc-02 {
      background: url('../../static/images/liver/02.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .hc-03 {
      background: url('../../static/images/liver/03.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .hc-04 {
      background: url('../../static/images/liver/04.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .hc-05 {
      background: url('../../static/images/liver/05.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .hc-06 {
      background: url('../../static/images/liver/06.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .hc-07 {
      background: url('../../static/images/liver/07.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .hc-08 {
      background: url('../../static/images/liver/08.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
  }
  .gc-block {
    width: 355px;
    height: 250px;
    margin: 20px auto 10px;
    background: url('../../static/images/stomach/stomach.png') no-repeat;
    background-size: contain;
    position: relative;
    background-position: center;
    .image-lung {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }

    .gc-01 {
      background: url('../../static/images/stomach/01.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .gc-02 {
      background: url('../../static/images/stomach/02.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .gc-03 {
      background: url('../../static/images/stomach/03.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .gc-04 {
      background: url('../../static/images/stomach/04.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .gc-05 {
      background: url('../../static/images/stomach/05.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .gc-06 {
      background: url('../../static/images/stomach/06.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
  }
  .cc-block {
    width: 355px;
    height: 250px;
    margin: 20px auto 10px;
    background: url('../../static/images/intestines/intestines.png') no-repeat;
    background-size: contain;
    position: relative;
    background-position: center;
    .image-lung {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }

    .cc-01 {
      background: url('../../static/images/intestines/01.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .cc-02 {
      background: url('../../static/images/intestines/02.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .cc-03 {
      background: url('../../static/images/intestines/03.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .cc-04 {
      background: url('../../static/images/intestines/04.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .cc-05 {
      background: url('../../static/images/intestines/05.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
    .cc-06 {
      background: url('../../static/images/intestines/06.png') no-repeat;
      background-size: contain;
      background-position: center;
    }
  }

  .sub-c-wrap {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
