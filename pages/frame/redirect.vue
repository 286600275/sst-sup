<style scoped>
/**/
</style>
<template>
  <div></div>
</template>
<script>
import util from '~/utils/common'
export default {
  props: [],
  components: {},
  created() {
    let self = this;;
    let path = self.$route.query.path;
    self.$router.push('/frame' + path)
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  computed: {},
  head: {},
  layout: 'frame'
}
</script>