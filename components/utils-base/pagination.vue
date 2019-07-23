<style lang="less">
</style>
<template>
  <div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="pageSizes" :page-size="pageSize" layout="total,sizes,prev, pager, next" :total="comptotal">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    attrs: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return { //Pagenation
      pageSizes: this.attrs.pageSizes || [10, 20, 50, 100],
      pageSize: this.attrs.pageSizes ? this.attrs.pageSizes[0] : 10,
      total: 0,
      page: 1,
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.$emit('render');
    },
    handleCurrentChange(currentPage) {
      this.page = currentPage;
      this.$emit('render');
    },
    setTotal(total) {
      let self = this;
      // 分页切换时 当前页大于总数最大页则设置并再次请求
      if ((Math.floor(total / self.pageSize) + 1) < self.page) {
        self.page = Math.floor(total / self.pageSize);
        this.$emit('render');
        return;
      };
      this.total = total;
    },
  },
  mounted() {},
  computed: {
    comptotal() {
      return this.total || 0;
    }
  },
  head: {}
}
</script>