<style></style>
<template>
  <el-container :style="'min-width:'+containerMinWidth+'px'" class="outer-container">
    <!-- Aside -->
    <el-aside :class="{'collapse-aside':menuCollapse}">
      <Sidebar :menuCollapse="menuCollapse" @reload="reload"></Sidebar>
    </el-aside>
    <el-container id="rightContainer">
      <el-header>
        <!-- Topbar -->
        <Topbar @trigger-menu="triggerMenu"></Topbar>
      </el-header>
      <Main v-bind:mounted="mounted">
        <el-main>
          <div class="main-container">
            <Common></Common>
            <nuxt v-if="frameView" />
          </div>
        </el-main>
      </Main>
      <el-footer>
        <!-- Footer -->
        <Footer></Footer>
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
import Sidebar from '~/components/common/sidebar.vue'
import Topbar from '~/components/common/topbar.vue'
import Main from '~/components/common/main.vue'
import Footer from '~/components/common/footer.vue'
import Common from '~/components/common/common.vue'
import util from '~/utils/common'
export default {
  props: [],
  components: { Sidebar, Topbar, Main, Footer, Common },
  created() {
    util.init({
      vm: this,
      apiPath: this.$store.state.apiPath,
      env: this.$store.state.env,
    })
  },
  data() {
    return {
      screenHeight: 0,
      mounted: false,
      frameView: true,
      menuCollapse: false
    }
  },
  methods: {
    reload() {
      let self = this;
      self.frameView = false;
      self.$nextTick(function() {
        self.frameView = true;
      })
    },
    triggerMenu() {
      this.menuCollapse = !this.menuCollapse;
    }
  },
  mounted() {
    var self = this;
    self.mounted = true;
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {},
    }
  },
  computed: {
    containerMinWidth() {
      let min = 1024;
      let thispath = this.$route.path;
      switch (this.$route.path) {
        case "/frame/operation/hospital/add-edit":
          min = 1250;
          break;
      }
      return min
    }
  },
  head: {
    title: "兽兽淘供应商管理系统"
  }
}
</script>