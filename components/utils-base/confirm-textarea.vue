<style lang="less">
</style>
<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" top="5vh">
      <el-input></el-input>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      title: "",
    }
  },
  methods: {
    show({ title = "提交内容" }) {
      this.title = title;
      this.dialogVisible = true;
    }
  },
  mounted() {},
  computed: {},
  head: {}
}
</script>