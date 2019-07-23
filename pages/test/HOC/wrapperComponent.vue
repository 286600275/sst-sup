<style lang="less">
</style>
<template>
  <div>
    <h1> 基础组件</h1>
    <baseComp p="baseProp" @handle-base="handleBase">
      <div>我是一个slot</div>
      <template v-slot:sname>
        <div>我是一个具名slot</div>
        <div>我是一个具名slot2</div>
      </template>
    </baseComp>
    <h1>高阶组件</h1>
    <hocComp p="hocProp" @handle-base="handleBase">
      <template v-slot:sname>
        <div>我是一个具名hoc-slot</div>
        <div>我是一个具名hoc-slot2</div>
      </template>
      <div>我是一个hoc-slot</div>
      </baseComp>
    </hocComp>
  </div>
</template>
<script>
import hoc from '~/pages/test/HOC/hoc'
import baseComp from '~/pages/test/HOC/baseComponent.vue'
const hocComp = hoc(baseComp);
export default {
  components: { hocComp, baseComp },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleBase(p) {
      alert('这是来自base的一个事件' + p);
    },
  },
  mounted() {},
  computed: {}
};
</script>