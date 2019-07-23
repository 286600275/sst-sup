<style>
</style>
<template>
  <div>
    <Common></Common>
    <nuxt />
  </div>
</template>
<script>
import util from '~/utils/common'
import Common from '~/components/common/common.vue'
export default {
  props: [],
  components: { Common },
  created() {
    util.init({
      vm: this,
      apiPath: this.$store.state.apiPath,
    })
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  computed: {},
  head: {
    title: "兽兽淘供应商管理系统"
  }
}
</script>