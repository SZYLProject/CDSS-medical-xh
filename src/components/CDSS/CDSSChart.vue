<template>
  <div>
    <SimilarCases :screenWidth = 'screenWidth'></SimilarCases>
  </div>
</template>

<script>
import SimilarCases from '@/components/Disease360/SimilarCases'
import { mapState } from 'vuex'
export default {
  components: {
    SimilarCases
  },
  data () {
    return {
      screenWidth: 1000
    }
  },
  created () {
    console.log(this.screenWidth)
  },
  computed: {
    ...mapState({
      chartData: state => state.disease360.chartData,
      chartList: state => state.disease360.chartList
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
