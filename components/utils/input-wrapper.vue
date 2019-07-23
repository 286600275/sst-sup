<style lang="less">
</style>
<template>
  <div class="input-group"> <span v-if="label" class="input-label">{{label}}：</span>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ["label"],
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  computed: {},
  head: {}
}
</script>
<!--
    input 
    <el-input class="" style="width: 250px" placeholder="患者姓名、联系方式" size="small">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
 -->