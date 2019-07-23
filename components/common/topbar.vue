<style lang="less"> .top {
  height: 50px;
  border-bottom: 1px solid #dfdfdf;
  .operator {
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 0px;
    display: inline-block;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    min-width: 120px;
    text-align: center;
    &:hover {
      background: #F2F2F2;
      .operator-popover {
        visibility: visible;
      }
    }
    .operator-popover {
      font-size: 14px;
      color: #666;
      position: absolute;
      top: 52px;
      right: 0px;
      z-index: 99;
      background: #fff;
      width: 200px;
      visibility: hidden;
      -webkit-transition: opacity .15s, visibility 0s .15s;
      transition: opacity .15s, visibility 0s .15s;
      -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
      -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
      .logout-action {
        border-top: 1px solid #F2F2F2;
        height: 50px;
        line-height: 50px;
        margin-top: 20px;
        &:hover {
          background: #F2F2F2
        }
      }
    }
  }
}
.breadcrumb {
  height: 40px;
  padding: 0 65px;
  margin-top: 0px;
  .el-breadcrumb {
    font-size: 14px;
    height: 40px;
    line-height: 45px;
  }
}
.signout-btn {
  position: absolute;
  right: 10px;
  top: 5px;
  i{
    margin-left: 4px;
  }

}
.username {
  position: absolute;
  top: 15px;
  right: 90px;
}
.top-bar {
  background: #fff;
  padding: 18px 18px 17px 62px;
  border-bottom: 1px solid #dfdfdf;
  position: relative;
}

.bar-icon {
  position: absolute;
  display: inline-block;
  min-width: 0px;
  left: 10px;
  top: 10px;
  width: 38px;
  padding: 6px ! important;
}
</style>
<template>
  <div>
    <div class="top">
      <el-button class="toggle-button bar-icon" @click="$emit('trigger-menu')" type="primary"><i class="fa fa-bars"></i></el-button>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <template v-for="(t,i) of breadcrumbSplit">
            <template v-if="childPage&&(i==breadcrumbSplit.length-1)">
              <el-breadcrumb-item>
                <router-link :to="childPage.parentPath">{{t}}</router-link>
              </el-breadcrumb-item>
            </template>
            <template v-else>
              <el-breadcrumb-item>{{t}}</el-breadcrumb-item>
            </template>
          </template>
          <el-breadcrumb-item v-if="childPage">{{childPageTitle}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <div class="username">{{username}}</div>
        <el-button @click="logout" class="signout-btn" type="text">退出<i class="fas fa-sign-out-alt"></i></el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { breadcrumb, childPageMap } from '~/config/sidebar.config'
import util from '~/utils/common'
export default {
  props: [],
  components: {},
  data() {
    var thisRoutePath = this.$route.path;
    var childPage = childPageMap[thisRoutePath];
    let isRedirect = thisRoutePath.search('/frame/redirect') != -1 ? true : false;
    return {
      childPageMap: childPageMap,
      childPage: childPage,
      breadcrumbSplit: isRedirect ? '' : (childPage ? breadcrumb[childPage.parentPath] : breadcrumb[thisRoutePath]).split('/'),
      username: this.$store.getters['username']
    }
  },
  watch: {
    $route: {
      handler: function() {
        let self = this;
        self.setBreadCrumb();
        self.checkRefundAddress();
      },
    }
  },
  created() {},
  methods: {
    /**
     * 检测退货地址
     * @return {[type]} [description]
     */
    checkRefundAddress() {
      let self = this;
      let path = self.$route.path;
      setTimeout(function() {
        if (path.search('/frame/customer-service/cs-mgmt') == -1 && !self.$store.getters['refundAddress']) {
          util.ajax({
            type: "GET",
            url: util.ajaxPath() + "/refund/address",
            success: function(res) {
              if (res.status == "success") {
                self.returnAddress = res.data;
                if (!res.data.id || !res.data.refund_address) {
                  // 前往
                  self.$router.push('/frame/customer-service/cs-mgmt');
                  self.$nextTick(_ => {
                    setTimeout(function() {
                      util.triggerEvent('sideBarOpen', '/frame/customer-service', '/frame/customer-service/cs-mgmt');
                    }, 0)
                  })
                } else {
                  self.$store.commit('updateRefundAddress', res.data)
                }
              }
            },
            complete: function() {
              util.closeLoading(true);
            }
          })
        }
      }, 500)
    },
    setBreadCrumb() {
      var thisRoutePath = this.$route.path;
      var childPage = childPageMap[thisRoutePath];
      this.childPage = childPage;
      this.breadcrumbSplit = (childPage ? breadcrumb[childPage.parentPath] : breadcrumb[thisRoutePath]).split('/');
    },
    toggerCollapse() {},
    logout() {
      var self = this;
      util.logout();
    }
  },
  computed: {
    // 针对一页多面包屑需要处理(b为index)
    childPageTitle() {
      return this.childPage.title.length ? this.childPage.title[this.$route.query.b || 0] : this.childPage.title
    }
  },
  mounted() {
    this.checkRefundAddress();
  }
}
</script>