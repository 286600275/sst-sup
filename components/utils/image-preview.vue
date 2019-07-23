<style lang="less" scoped>
.preview-img {
  max-width: 100%;
  display: block;
  margin: 0px auto 20px;
  border-radius: 5px;
}
</style>
<template>
  <div>
    <el-dialog title="图片预览" :visible.sync="dialogVisible" top="5vh">
      <img class="preview-img" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: [],
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
    }
  },
  methods: {
    show(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    }
  },
  mounted() {},
  computed: {},
  head: {}
}
</script>