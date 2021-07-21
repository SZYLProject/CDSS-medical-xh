<template>
<div class="h-card-wrap">
  <p class="h-card-title-wrap"><i class="el-icon-first-aid-kit"></i><span>{{cards.title}}</span></p>
  <div class="card-wrap">
    <div @click="goToDetail(item)" ref="card" v-for="(item, index) in cards.children" :key="index" :body-style="{ padding: '20px' }" :class="['h-w-card box animated bounceIn','margin-left-20',item.url?'h-w-card2':'']">
      <div style="padding: 12px;" :class="{'hoverCancel':!item.url}">
        <h4>{{item.tools}}</h4>
        <p>{{item.tools_content}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  Row,
  Col,
  Card,
  Button
} from 'element-ui'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card,
    [Button.name]: Button
  },
  props: {
    cards: {
      type: Object
    }
  },
  data () {
    return {
      isHoverindex: -1
    }
  },
  methods: {
    goToDetail (item) {
      this.$emit('goToDetail', item)
    },
    mouseover (index) {
      this.isHoverindex = index
    },
    mouseleave (index) {}
  }
}
</script>

<style lang="scss" scoped>
.h-card-wrap {
  box-sizing: border-box;
  width: 100%;

  .h-card-title-wrap {
    padding: 20px;
    padding-bottom: 0;
    padding-top: 20px;
    display: flex;
    align-items: center;

    span {
      font-size: 18px;
      font-weight: 800;
    }

    i {
      font-size: 22px;
      margin-right: 10px;
      color: cadetblue;
    }
  }

  .card-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  .h-w-card {
    width: 200px;
    height: 140px;
    cursor: pointer;
    box-sizing: border-box;
    background: url('../static/images/card1.png') no-repeat;
    background-size: cover;
    background-position: center;
    -o-background-size: cover;
    -moz-background-size: cover;
    -webkit-background-size: cover;

    h4 {
      font-size: 14px;
      font-weight: 500;
      color: #606266;
    }

    p {
      line-height: 20px;
      color: #C0C4CC;
      padding-top: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .hoverCancel {
      cursor: not-allowed;

      h4 {
        color: #ccc;
      }
    }
  }

  .h-w-card2 {
    background: url('../static/images/card2.png') no-repeat;
    background-size: cover;
    background-position: center;
    -o-background-size: cover;
    -moz-background-size: cover;
    -webkit-background-size: cover;
  }

  .margin-left-20 {
    margin: 30px;
    margin-bottom: 3px;
  }

  .image {
    width: 80px;
    height: 80px;
  }
}
</style>
