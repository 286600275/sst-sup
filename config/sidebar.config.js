const sidebarConfig_ = [
  //控制面板
  // {
  //   title: '控制面板',
  //   path: '/panel',
  //   leaf: false,
  //   iconClass: "iconfont icon-dashboard",
  //   sub: [{
  //     title: '系统首页',
  //     path: '/',
  //     leaf: true,
  //   }]
  // },
  //商品管理
  {
    title: '商品管理',
    path: '/pro',
    leaf: false,
    iconClass: "iconfont icon-shangpin",
    sub: [{
      title: '商品列表',
      path: '/pro-list',
      leaf: true,
    }, {
      //   title: '添加商品',
      //   path: '/pro-add',
      //   leaf: true,
      // }, {
      title: '商品分类',
      path: '/pro-classify',
      leaf: true,
    }, {
      title: '品牌管理',
      path: '/brand-mgmt',
      leaf: true,
    }]
  },
  // //订单管理
  {
    title: '订单管理',
    path: '/order',
    leaf: false,
    iconClass: "iconfont icon-dingdan",
    sub: [{
      //   title: '订单列表',
      //   path: '/order-list',
      //   leaf: true,
      // }, {
      title: '门店批发列表',
      path: '/wholesale-list',
      leaf: true,
    }, {
      title: '用户零售列表',
      path: '/retail-list',
      leaf: true,
    }]
  },

  {
    title: '财务中心',
    path: '/finance',
    leaf: false,
    iconClass: "iconfont icon-zijinguanli",
    sub: [{
      title: '财务明细',
      path: '/detail-list',
      leaf: true,
    }, {
      title: '财务审核',
      path: '/refund-check',
      leaf: true,
    }]
  },
  //数据管理
  {
    title: '数据中心',
    path: '/data',
    leaf: false,
    iconClass: "iconfont icon-shuju",
    sub: [{
      title: '数据详情',
      path: '/data-detail',
      leaf: true,
    }]
  },
  {
    title: '物流中心',
    path: '/logistics',
    leaf: false,
    iconClass: "iconfont icon-wuliu",
    sub: [{
      title: '运费模板',
      path: '/freight-template',
      leaf: true,
    }]
  },

  //客服中心
  {
    title: '客服中心',
    path: '/customer-service',
    leaf: false,
    iconClass: "iconfont icon-kefu",
    sub: [{
      title: '退款列表',
      path: '/refund',
      leaf: true,
    }, {
      title: '客服管理',
      path: '/cs-mgmt',
      leaf: true,
    }]
  }, {
    title: '店铺中心',
    path: '/store',
    leaf: false,
    iconClass: "iconfont icon-shangjia",
    sub: [{
      title: '店铺设置',
      path: '/setting',
      leaf: true,
    }]
  },
];
const childPageMap_ = {}
// 用于导航栏
for (var item of sidebarConfig_) {
  item.path = "/frame" + item.path;
  if (item.sub) {
    for (var subitem of item.sub) {
      subitem.path = item.path + subitem.path;
      if (subitem.ssub) {
        for (var ssubitem of subitem.ssub) {
          childPageMap_[subitem.path + ssubitem.path] = {
            topPath: item.path,
            parentPath: subitem.path,
            index: subitem.path + ssubitem.path,
            title: ssubitem.title
          }
        }
      }
    }
  }
}
const breadcrumb_ = (function() {
  var breadcrumb_ = {};
  for (var item of sidebarConfig_) {
    if (!item.sub) {
      breadcrumb_[item.path] = item.title;
    }
    if (item.sub) {
      for (var subitem of item.sub) {
        breadcrumb_[subitem.path] = item.title + "/" + subitem.title;
      }
    }
  }
  return breadcrumb_;
})()
export const childPageMap = childPageMap_;
export const sidebarConfig = sidebarConfig_;
export const breadcrumb = breadcrumb_;