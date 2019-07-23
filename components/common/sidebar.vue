<style lang="less">
@import "~assets/css/base.less";
.el-menu--popup {
  padding: 0;
}
.sidebar-top {
  overflow: hidden;
  padding: 0 10px;
  height: 49px;
  background: @ht1;
  color: #fff;
  text-align: center;
  line-height: 50px;
  font-size: 14px;
  font-weight: bold;
  .top-icon {
    display: inline-block;
    img {
      width: 22px;
      vertical-align: middle;
      position: relative;
      top: -1px;
    }
  }
  .top-title {}
}
.el-menu {
  background: #273238 ! important;
}
.el-menu-vertical {
  z-index: 666;
  /*border-right: 1px solid #273238;*/
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 201px;
}
.nav-href {
  color: inherit;
}
.el-submenu .el-menu {
  overflow: hidden;
}
.el-menu-item {
  border-left: 2px solid @ht5;
}
.el-submenu .el-menu-item {
  padding-left: 45px ! important;
}
.el-menu--collapse .el-submenu .el-menu-item {
  padding-left: 20px ! important;
}
.el-submenu__title .iconfont {
  // transition: border-color .3s, background-color .3s, color .3s;
  display: inline-block;
  width: 18px;
  text-align: center;
  font-size: 14px;
}
.el-menu-item,
.el-submenu__title {
  transition: border-color .3s, background-color .3s, color .3s;
  color: #828282 ! important;
  transition: none;
}
.el-submenu.is-active .el-submenu__title,
.el-submenu.is-active .el-submenu__title i,
.el-menu-item.is-active {
  color: #fff ! important;
}
.el-menu-item:focus,
.el-menu-item:hover,
.el-submenu__title:hover,
.el-menu-item.is-active {
  background: #3C4447 ! important;
  color: #fff ! important;
}
.el-menu-item {
  transition: inherit ! important;
}
.el-menu-item,
.el-submenu__title {
  height: 46px;
  line-height: 46px;
}
.el-submenu .el-menu-item {
  height: 44px;
  line-height: 44px;
}
.el-menu-item.is-active {
  border-left: 2px solid #409eff
}
</style>
<template>
  <div>
    <div style="color: #fff"> </div>
    <div class="sidebar-top">
      <span class="top-icon">
        <img src="~assets/img/logo-o2.png">
      </span>
      <span class="top-title">兽兽淘供应商管理系统</span></div>
    <el-menu v-if="menuVisible" :collapse="menuCollapse" :default-openeds="opends" :default-active="active" ref="menu" class="el-menu-vertical" background-color="#273238" text-color="#C2C2C2" active-text-color="#FFFFFF" :router="true" @open="open" @close="close" @select="select" :collapse-transition="false" width="200px" :unique-opened="true">
      <template>
        <template v-for="item of sidebarConfig">
          <template v-if="item.sub">
            <el-submenu :index="item.path">
              <template slot="title"> <i :class="item.iconClass"></i> <span slot="title">{{item.title}}</span> </template>
              <template v-for="subitem of item.sub">
                <el-menu-item :path="subitem.path" :index="subitem.path">{{subitem.title}}</el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :path="subitem.path" :index="item.path" style="text-indent: -2px;"> <i :class="item.iconClass"></i> <span slot="title">{{item.title}} </span> </el-menu-item>
          </template>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { sidebarConfig, childPageMap } from '~/config/sidebar.config'
import util from '~/utils/common'
export default {
  props: ["menuCollapse"],
  components: {},
  data() {
    var thisRoutePath = this.$route.path;
    var childPage = childPageMap[thisRoutePath]
    return {
      util: util,
      sidebarConfig: sidebarConfig,
      childPageMap: childPageMap,
      menuHeight: '',
      opends: childPage ? [childPage.topPath] : [thisRoutePath.substr(0, thisRoutePath.lastIndexOf("/"))],
      active: childPage ? childPage.parentPath : thisRoutePath,
      menuVisible: true,
    }
  },
  created() {},
  methods: {
    open(index) {},
    close(index) {},
    select(index) {
      if (index == this.$route.path) {
        this.$emit('reload');
      }
      util.closeLoading(true);
    },
  },
  mounted() {
    let self = this;
    util.addEvent('sideBarOpen', function(index, subindex) {
      self.$refs['menu'].open(index)
      self.active = subindex;
      self.menuVisible = false;
      self.$nextTick(function() {
        self.menuVisible = true;
      })
    })
  },
  computed: {}
}
</script>