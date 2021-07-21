<template>
  <div class="f-wrap">
    <div class="f-block-wrap" v-for="v in flist" :key="v.id">
      <p class="b-title-wrap">
        <span class="default-color" style="font-size: 18px;">{{ v.title }}</span
        ><span v-if="isFollowUp" class="fx-btn">{{
          v.style ? '进行完成' : '进行中'
        }}</span>
      </p>
      <p class="b-msg-wrap">{{ v.msg }}</p>
      <div class="b-middle-wrap" v-if="!isFollowUp">
        <span class="fx-btn">{{ v.style ? '分享完成' : '分析中' }}</span>
        <p class="fx-img"></p>
      </div>
      <div class="b-bottom-wrap">
        <div class="b-item-wrap">
          <p
            class="i-img"
            :class="{ 'i-time-img': v.teamLabel === '会诊时间' }"
            v-if="isFollowUp"
          ></p>
          <div
            :style="{
              'flex-direction': !isFollowUp ? 'column' : 'column-reverse'
            }"
          >
            <p class="default-color" style="padding: 4px 0;">{{ v.teamNum }}</p>
            <p>{{ v.teamLabel }}</p>
          </div>
        </div>
        <div class="b-item-wrap">
          <p class="i-img i-imgs" v-if="isFollowUp"></p>
          <div
            :style="{
              'flex-direction': !isFollowUp ? 'column' : 'column-reverse'
            }"
          >
            <p style="padding: 4px 0;">{{ v.point }}</p>
            <p>{{ v.pointLabel }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['title'],
  computed: {
    ...mapState({
      dialogTitle: state => state.disease360.dialogTitle
    }),
    isFollowUp () {
      return this.title === '随访'
    },
    flist () {
      if (this.isFollowUp) {
        return [
          {
            id: 1,
            title: '随访项目名称',
            style: 1,
            teamLabel: '患者人数',
            teamNum: 32,
            pointLabel: '随访人数',
            point: 3
          },
          {
            id: 2,
            title: 'MDT随访名称',
            style: 1,
            teamLabel: '会诊时间',
            teamNum: '2020-10-12',
            pointLabel: '最后随访',
            point: '2020-12-02'
          }
        ]
      } else {
        return [
          {
            id: 1,
            title: '队列比较',
            style: 1,
            msg: '关于心血管疾病的二临床药物试验的相关研究',
            teamLabel: '队列人数',
            teamNum: 32,
            pointLabel: '研究成员',
            point: 3
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.f-wrap {
  padding-right: 70px !important;
  .fx-btn {
    padding: 4px 14px;
    border-radius: 12px;
    background-color: #f5f7fa;
    font-size: 12px;
    font-weight: 500;
    color: rgb(114, 172, 154);
  }
  padding: 18px 24px;
  .f-block-wrap {
    cursor: pointer;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    padding: 12px;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
    .b-msg-wrap {
      padding-bottom: 8px;
    }
    .b-title-wrap {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      font-size: 16px;
      font-weight: 600;
    }
    .b-middle-wrap {
      padding: 8px 0;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-right: 20px;
      .fx-img {
        width: 30px;
        height: 30px;
        background: url('../../static/images/change.png') no-repeat;
        background-size: 100%;
        background-position: center;
      }
    }
    .b-bottom-wrap {
      display: flex;
      position: relative;
      height: 80px;
      padding-top: 12px;
      justify-content: space-between;
      &::before {
        content: '';
        width: 1px;
        position: absolute;
        top: 10px;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #eee;
      }
      .b-item-wrap {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .i-img {
          width: 40px;
          height: 40px;
          background: url('../../static/images/people.png') no-repeat;
          background-size: 70%;
          background-position: center;
          margin-right: 18px;
        }
        .i-time-img {
          background: url('../../static/images/time.png') no-repeat;
          background-size: 70%;
          background-position: center;
        }
        .i-imgs {
          background: url('../../static/images/persion.png') no-repeat;
          background-size: 62%;
          background-position: center;
        }
        div {
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
      }
    }
  }
}
</style>
