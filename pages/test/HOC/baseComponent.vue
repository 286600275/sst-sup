<style lang="less">
</style>
<template>
  <div>
    <button @click="$emit('handle-base',p)">{{pop1}}</button>
    <slot />
    <br> =====================插槽分割线=========================== <br>
    <slot name="sname" />
  </div>
</template>
<script>
export default {
  props: ['p'],
  components: {},
  data() {
    return {
      pop1: "basePop1",
    };
  },
  created() {},
  methods: {
    handleClick() {
      alert(this.p);
    }
  },
  mounted() {},
  computed: {}
};
</script>