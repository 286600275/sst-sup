 // method list
 /*
 windowResize(func)===============添加window resize事件函数
 openLoading()====================添加window resize事件函数
 closeLoading(clear)==============关闭loading(单例)
 ajax(opt)========================$ajax请求
 tableRender(type)================表格渲染
 addEvent()=======================
 triggerEvent()===================
 removeEvent()====================
 getViewSize()====================获取web可视范围尺寸
 login()==========================登录
 logout()=========================登出
 localStorage.set/get/remove======
 sessionStorage.set/get/remove====
 message.success(msg)=============
  */
 const c = {
   regexp: {
     phoneRegExp: /^1[3|4|5|6|7|8|9][0-9]{9}?$/,
     telRegExp: /(^(0[0-9]{2,3}\-?)\d{7,8}$)|(^1[3|4|5|6|7|8|9][0-9]{9}?$)/,
     idCardExp: /^[1-9]\d{5}(18|19|2([0-9]))\d{2}(0[0-9]|10|11|12)([0-2][0-9]|30|31)\d{3}[0-9Xx]$/,
     emailRegExp: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/,
     priceRegExp: /^([0-9])+(\.[0-9]+)?$/,
     numberRegExp: /^([0-9])+$/,
     expressCodeRegExp: /^[0-9A-Za-z]{8,24}$/,
     bankCardRegExp: /^\d{16,19}$/,
     imgUrlRegExp: /(\.gif|\.jpeg|\.png|\.jpg|\.bmp)/i,
   },
   tip: {
     priceErrorFormat: "价格格式错误",
     bankCardErrorFormat: "银行卡号错误",
     numberErrorFormat: "数量格式错误",
     expressCodeErrorFormat: "快递单号格式错误",
     required: "必填项",
     phoneErrorFormat: "手机号码格式错误",
     telErrorFormat: "电话号码格式错误",
     emailErrorFormat: "邮箱格式错误",
     figureCodeErrorFormat: "图形验证码格式错误",
     figureCodeErrorValidate: "图形验证码验证失败",
     codeSendSuccess: "验证码发送成功",
     codeErrorValidate: "手机验证码不正确",
     newpassInconsistent: "密码不一致",
     passwordMax16: "密码不得超过16位",
     passwordMin6: "密码不得少于6位",
     newpassSuccessSet: "重置成功",
     commitSuccess: "提交成功",
     commitError: "提交失败",
     loginMap: {
       unknown_account: "用户不存在",
       incorrect_credentials: "用户名或密码不正确",
       locked_account: "该帐户已被禁用",
       no_login: "不允许登陆",
       unknown_error: "未知错误",
       admin_login_forbid: "管理员限制登陆",
       excessive_attempts: "一天登录错误超过5次"
     }
   },
   provinceList: [{ name: "北京" }, { name: "天津" }, { name: "上海" }, { name: "重庆" }, { name: "河北" }, { name: "山西" }, { name: "福建" }, { name: "辽宁" }, { name: "吉林" }, { name: "黑龙江" }, { name: "江苏" }, { name: "浙江" }, { name: "安徽" }, { name: "云南" }, { name: "江西" }, { name: "山东" }, { name: "河南" }, { name: "湖北" }, { name: "湖南" }, { name: "广东" }, { name: "海南" }, { name: "四川" }, { name: "贵州" }, { name: "陕西" }, { name: "甘肃" }, { name: "青海" }, { name: "台湾" }, { name: "内蒙古" }, { name: "广西" }, { name: "西藏" }, { name: "宁夏" }, { name: "新疆" }, { name: "香港" }, { name: "澳门" }, ],
   unitList: [{ name: "千克" }, { name: "克" }, { name: "个" }, { name: "瓶" }, { name: "盒" }, { name: "支" }, { name: "升" }, { name: "公升" }, { name: "只" }, { name: "双" }, { name: "套" }, { name: "包" }, { name: "袋" }, { name: "件" }, { name: "箱" }, { name: "米" }],
 }
 c.rules = {
   defaultRequired: { required: true, message: c.tip.required, trigger: 'blur' }
 }
 let keyVals = {
   // 商品审核状态
   proStatus: {
     "status-2,is_del-0": "已通过",
     "status-3,is_del-0": "未通过",
     "status-1,is_del-0": "待审核",
     "is_del-1": "已删除",
   },
   // 商品分类状态
   prodClassifyStatus: {
     "0": "未审核",
     "1": "审核中",
     "20": "审核通过",
     "10": "审核拒绝",
   },
   // 品牌状态
   brandStatus: {
     "1": "申请中等待审核",
     "11": "审核失败",
     "10": "审核成功",
   },
   //订单状态
   orderStatus: {
     "0": "已取消",
     "10": "未付款",
     "20": "待发货",
     "30": "已发货",
     "40": "已完成",
     "50": "退款/退货申请中",
     "60": "退款/退货已完成",
   },
   // 提现状态
   withdrawalStatus: {
     "0": "申请中",
     "1": "已同意",
     "2": "已拒绝",
   },
   // 退款客服审核状态
   refundCheckStatus: {
     "0": "未审核",
     "1": "同意退款",
     "2": "审核拒绝",
     "3": "同意退/换货"
   },
   // 退款处理状态
   refundProcessStatus: {
     "0": "待处理",
     "3": "处理中",
     "1": "已处理",
   },
   // 财务审核状态
   financeCheckStatus: {
     "0": "未审核",
     "1": "同意退款",
     "2": "拒绝退款",
   },
   // 退款财务审核处理状态
   financeCheckProgressStatus: {
     "0": "待处理",
     "1": "已处理",
   },
   // 退款内容
   refundState: {
     "0": "仅退款",
     "1": "退款退货",
     "2": "换货"
   },
   // 退款到账状态
   refundStatus: {
     "1": "未到账",
     "2": "已到账"
   },
   // 退款财务审核状态
   financeCheckStatus: {
     "0": "未审核",
     "1": "审核通过",
     "2": "审核拒绝",
   },

   brainState:{
    "1":"提交审核",
    "2":"审核通过",
    "3":"审核未通过",
   },
   // 银行卡图标icon
   bankIconClassMap: {
     '工商银行': 'icon-gongshangyinhang',
     '交通银行': 'icon-jiaotongyinhang',
     '中国银行': 'icon-zhongguoyinhang',
     '光大银行': 'icon-guangdayinhang',
     '建设银行': 'icon-jiansheyinhang',
     '农业银行': 'icon-zhongguonongyeyinhang',
     "长沙银行": 'icon-yinhanglogo-',
     "浦发银行": 'icon-pufayinxing',
   }
 };
 for (let objKey in keyVals) {
   let arr = [];
   for (let key in keyVals[objKey]) {
     arr.push({
       label: keyVals[objKey][key],
       value: key
     })
   }
   keyVals[objKey + "ObjArr"] = arr;
 }
 // 特殊排序
 keyVals["refundProcessStatusObjArr"] = [{ label: "待处理", value: "0" }, { label: "处理中", value: "3" }, { label: "已处理", value: "1" }, ]
 let global_ = {
   ajaxPath: "",
   loading: {
     instance: null,
     count: 0,
     interval: null,
     time: 0,
     minTime: 300,
   },
   eBus: {},
   vm: null,
 };
 export default {
   init(opt) {
     global_.vm = opt.vm;
     global_.ajaxPath = opt.apiPath;
     // try {
     //   this.cookieUtil.addCookieNotEscape("apipath", opt.apiPath)
     // } catch (e) {}
   },
   /**
    * 添加window resize事件函数
    * @param  {[type]} func [函数]
    */
   windowResize(func) {
     var resize = window.onresize;
     window.onresize = function() {
       if (typeof resize == "function") resize();
       func();
     }
   },
   /**
    * 打开loading(单例) 
    */
   openLoading() {
     if (global_.loading.count == 0) {
       global_.loading.instance = global_.vm.$loading({
         lock: true,
         text: 'Loading',
         background: 'rgba(255, 255, 255, 0.5)',
         target: "#rightContainer",
       });
       global_.loading.time = new Date().getTime()
     }
     global_.loading.count++;
   },
   /**
    * 关闭loading(单例) 
    */
   closeLoading(clear) {
     if (clear) {
       global_.loading.count = 0;
       if (global_.loading.instance) global_.loading.instance.close();
       clearInterval(global_.loading.interval)
     } else {
       global_.loading.count--;
       var ret = closeAction();
       if (!ret) {
         clearInterval(global_.loading.interval)
         global_.loading.interval = setInterval(function() { closeAction() }, global_.loading.minTime / 3)
       }
     }

     function closeAction() {
       let now = new Date().getTime();
       if (global_.loading.count == 0 && global_.loading.instance && (now - global_.loading.time >= global_.loading.minTime)) {
         if (global_.loading.instance) {
           global_.loading.instance.close();
         }
         clearInterval(global_.loading.interval)
         return true;
       }
     }
   },
   ajax(opt) {
     var self = this;
     var option = JSON.parse(JSON.stringify(opt));
     option.beforeSend = function(res) {
       if (!opt._notLoading) self.openLoading();
       if (opt.beforeSend) opt.beforeSend(res);
     };
     option.success = function(res) {
       if (opt.success) var successstop = opt.success(res);
       if (res.status == "error" && !successstop) {
         if (res.message == '未授权') {
           global_.vm.$store.dispatch('logout');
           global_.vm.$message({
             type: "warning",
             message: "权限失效，请重新登录",
             duration: 3000,
             showClose: true,
           });
           setTimeout(function() {
             window.location.href = "/auth/login"
           }, 3000)
           return;
         }
         global_.vm.$message({
           type: "error",
           message: res.message,
           duration: 3000,
         });
         // showErrorMessage("error", "出现错误", {
         //   status: res.code,
         //   detailMessage: res.message
         // });
       }
     };
     option.error = function(error) {
       debugger;
       error = error.statusCode();
       let stop = null;
       if (opt.error) { stop = opt.error(error); }
       if (stop) return;
       switch (error.status) {
         case 412:
         case 401:
           showErrorMessage("warning", "权限失效，请重新登录", error, "access-messagebox");
           self.cookieUtil.deleteCookie("x-auth-token")
           setTimeout(function() {
             window.location.href = "/insur/auth/login"
           }, 3000)
           break;
         default:
           showErrorMessage("error", "出现错误", error);
       }
     };
     option.complete = function(res) {
       if (!opt._notLoading) self.closeLoading(opt.loadingClear_);
       if (opt.complete) opt.complete(res);
     }
     $.ajax($.extend({
       type: "post",
       dataType: "json",
       contentType: "application/json",
       headers: {
         "Authorization": "Bearer " + global_.vm.$store.getters.token
       },
     }, option));

     function showErrorMessage(type, message, error, addClass) {
       debugger;
       console.log(error)
       var $html = $("<div></div>");
       var $message = $("<div class='ajax-info'></div>")
       var $detail = $("<div class='ajax-detail'></div>")
       $message.text(message + "，错误代码：" + error.status);
       $message.append("<i class='message-collapse-btn el-icon-caret-bottom'></i>")
       var detail = error.detailMessage ? error.detailMessage : (error.responseJSON ? (error.responseJSON.message || error.responseJSON.error_message) : error.responseText);
       $detail.text(detail);
       $html.append($message);
       $html.append($detail);
       global_.vm.$message({
         type: type,
         dangerouslyUseHTMLString: true,
         message: $html.prop("outerHTML"),
         duration: 3000,
         showClose: true,
         customClass: "ajax-messagebox " + addClass || ""
       });
       // 错误提示下拉
       $(".message-collapse-btn").off('click').click(function() {
         let $detail = $(this).parents('.el-message__content').find('.ajax-detail');
         if ($detail.css('display') == "none") {
           $detail.show();
           $(this).removeClass('el-icon-caret-bottom').addClass('el-icon-caret-top');
         } else {
           $detail.hide();
           $(this).removeClass('el-icon-caret-top').addClass('el-icon-caret-bottom');
         }
       })
     }
   },
   logout(notGoLogin, callback) {
     let self = this;
     global_.vm.$store.dispatch('logout');
     global_.vm.$store.commit('auth/deleteUserMember');
     global_.vm.$store.commit('deleteRefundAddress');
     if (callback) callback();
     if (!notGoLogin) window.location.href = "/auth/login"
   },
   // 获取权限（登录页前端调用临时方案）
   auth(successCallback, failCallback) {
     let self = this;
     self.ajax({
       loadingClear_: true,
       type: "get",
       url: global_.ajaxPath + "/auth/users",
       success: function(res) {
         successCallback(res)
       },
       error: function(error) {
         failCallback(error)
       }
     })
   },
   /**
    * 列表render通用函数
    * @param  {[type]} type [数据类型]
    * @return {[type]}      [渲染数据]
    */
   tableRender(type, format) {
     return function(row, column, cellValue, index) {
       return dataRender(cellValue, type, format);
     }
   },
   /**
    * 数据render的通用函数
    * @param  {[type]} type [数据类型]
    * @return {[type]}      [渲染数据]
    */
   dataRender(val, type, format) {
     return dataRender(val, type, format);
   },
   addEvent(name, func) {
     global_.eBus[name] = global_.eBus[name] || [];
     global_.eBus[name].push(func);
   },
   triggerEvent(name, ...args) {
     if (global_.eBus[name]) {
       for (let i = 0, func; func = global_.eBus[name][i++];) {
         func(...args);
       }
     }
   },
   removeEvent(name) {
     if (global_.eBus[name]) {
       delete global_.eBus[name];
     }
   },
   getViewSize: function() {
     var w = document.documentElement.clientWidth || document.documentElement.offsetWidth || document.body.offsetWidth;
     var h = document.documentElement.clientHeight || document.documentElement.offsetHeight || document.body.offsetHeight;
     return {
       width: w,
       height: h
     };
   },
   localStorage: {
     set: function(key, data) { localStorage.setItem("ml2_" + key, (typeof data == "string" ? data : JSON.stringify(data))) },
     get: function(key) {
       try { return JSON.parse(localStorage.getItem("ml2_" + key)) } catch (e) { return localStorage.getItem("ml2_" + key) }
     },
     remove: function(key) { localStorage.removeItem("ml2_" + key) },
   },
   sessionStorage: {
     set: function(key, data) { sessionStorage.setItem("ml2_" + key, (typeof data == "string" ? data : JSON.stringify(data))) },
     get: function(key) {
       try { return JSON.parse(sessionStorage.getItem("ml2_" + key)) } catch (e) { return sessionStorage.getItem("ml2_" + key) }
     },
     remove: function(key) { sessionStorage.removeItem("ml2_" + key) },
   },
   message: {
     success: function(msg) {
       global_.vm.$message.success(msg)
     },
     error: function(msg) {
       global_.vm.$message.error(msg)
     }
   },
   getDepData(data, dataDep = "", dataType) {
     let dataDepArr = dataDep.split(".");
     var l = dataDepArr.length;
     var d = data;
     for (var i = 0; i < l; i++) {
       if (!d) {
         return returnEmpty(dataType);
       } else {
         d = d[dataDepArr[i]];
       }
     }
     return ((d == null || d == "") ? returnEmpty(dataType) : d);

     function returnEmpty(dataType) {
       switch (dataType) {
         case "Object":
           return {};
           break;
         case "Array":
           return [];
           break;
         default:
           return "";
       }
     }
   },
   getCookieMap(data, type) {
     let map = {};
     if (!data) return map;
     if (type == "req") {
       if (!data.headers || !data.headers.cookie) return map;
       let cookieArr = data.headers.cookie.split(";");
       for (let i = 0, cookie; cookie = cookieArr[i++];) {
         map[cookie.split('=')[0].trim()] = cookie.split('=')[1];
       }
       return map;
     }
   },
   keyVals: keyVals,
   c: c,
   clone(d) {
     return JSON.parse(JSON.stringify(d));
   },
   cookieUtil: {
     getCookie: function(name) {
       if (document.cookie.length > 0) {
         let c_start = document.cookie.indexOf(name + "=");
         if (c_start != -1) {
           c_start = c_start + name.length + 1;
           let c_end = document.cookie.indexOf(";", c_start);
           if (c_end == -1) c_end = document.cookie.length;
           return unescape(document.cookie.substring(c_start, c_end));
         }
       }
       return "";
     },
     addCookie: function(name, value, expiredays, domain, path) {
       let exdate = new Date();
       exdate.setDate(exdate.getDate() + expiredays);
       let cookieStr = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
       if (domain) cookieStr += ";domain=" + domain;
       path = path || "/";
       cookieStr += ";path=" + path;
       document.cookie = cookieStr;
     },
     addCookieNotEscape: function(name, value, expiredays, domain, path) {
       let exdate = new Date();
       exdate.setDate(exdate.getDate() + expiredays);
       let cookieStr = name + "=" + value + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
       if (domain) cookieStr += ";domain=" + domain;
       path = path || "/";
       cookieStr += ";path=" + path;
       document.cookie = cookieStr;
     },
     deleteCookie: function(name) { //为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间 
       let date = new Date();
       date.setTime(date.getTime() - 10000);
       let cookieStr = name + "=a; expires=" + date.toGMTString();
       cookieStr += ";path=/";
       document.cookie = cookieStr;
     }
   },
   tree: {
     findPath(d, { value = "value", children = "children", data }) {
       // 递归寻找路径
       let dep = 0;
       let path = [];
       let break_ = false;
       for (let item of data) {
         if (break_) break;
         find(item[value], item[children], dep);
         if (break_) break;
       }

       function find(value_, children_, dep) {
         path[dep] = value_;
         if (value_ == d) {
           break_ = true;
         } else {
           if (children_)
             for (let item of children_) {
               if (break_) break;
               find(item[value], item[children], dep + 1);
             }
         }
       }
       if (path.indexOf(d) != -1) {
         path = path.slice(0, path.indexOf(d) + 1);
       }
       if (d != path[path.length - 1]) return [];
       return path;
     }
   },
   img: {
     urlObj2String(obj) {
       if (obj instanceof Array) {
         let arr = [];
         for (let item of obj) {
           arr.push(item.url);
         }
         return arr;
       } else {
         return obj.url;
       }
     },
     string2UrlObj() {}
   },
   ajaxPath: function() {
     return global_.ajaxPath
   },
   message: {
     success(message) {
       global_.vm.$message({
         message: message,
         type: 'success'
       });
     },
     error(message) {
       global_.vm.$message({
         message: message,
         type: 'error'
       });
     }
   },
   /**
    * 根据函数返回指定数据
    */
   filterData(data, kvFuncOrProps) {
     if (data instanceof Array) {
       let d = [];
       for (let item of data) {
         let it = {};
         if (kvFuncOrProps instanceof Array) {
           for (let prop of kvFuncOrProps) {
             it[prop] = item[prop];
           }
         } else if (typeof kvFuncOrProps == 'function') {
           it = kvFuncOrProps(item);
         } else {
           for (let fk in kvFuncOrProps) {
             it[fk] = kvFuncOrProps[fk](item)
           }
         }
         d.push(it);
       }
       return d;
     }
     if (data instanceof Object) {
       let d = {};
       if (kvFuncOrProps instanceof Array) {
         for (let prop of kvFuncOrProps) {
           d[prop] = data[prop];
         }
       } else {
         for (let fk in kvFuncOrProps) {
           d[fk] = kvFuncOrProps[fk](data);
         }
       }
       return d;
     }
   },
   getFileName(url) {
     let lastI = url.lastIndexOf('/');
     return url.substr(lastI + 1);
   },
   clone(obj) {
     return JSON.parse(JSON.stringify(obj))
   },
   getUrlPathKey(url) {
     url = decodeURIComponent(url);
     let start_index = url.indexOf('/upload');
     let end_index = url.indexOf('?');
     if (start_index != -1 && end_index != -1) {
       return url.substring(start_index + 1, end_index)
     }
     return url;
   },
   // changeHtmlUrlKey(html) {
   //   let self = this;
   //   console.log(html);
   //   html = decodeURIComponent(html);
   //   var sources = []
   //   var imgReg = /http.*?Expires=\d{10}/ig;
   //   var match
   //   while ((match = imgReg.exec(html))) {
   //     sources.push(match);
   //   }
   //   for (let rep of sources) {
   //     let originV = rep[0];
   //     let replaceV = self.getUrlByKey(self.getUrlPathKey(rep[0]))
   //     html = html.replace(originV, replaceV);
   //   }
   //   console.log(html)
   //   debugger;
   //   return html;
   // },
   getUrlByKey(key) {
     let self = this;
     let urlKeyMap = global_.vm.$store.getters['urlKeyMap'];
     if (urlKeyMap[key]) return urlKeyMap[key]
     let ret = key;
     self.ajax({
       _notLoading: true,
       type: "POST",
       async: false,
       data: {
         oss_key: key
       },
       dataType: "text",
       contentType: "application/x-www-form-urlencoded",
       url: global_.ajaxPath + "/image/ossurl",
       success: function(res) {
         ret = res;
         global_.vm.$store.dispatch('updateUrlKeyMap', {
           key: key,
           url: res
         })
       },
       error: function() {},
       complete: function() {}
     });
     return ret;
   },
   getBackgroundUrlStyle(val) {
     return "background-image:url('" + val + "')";
   },
   other: {
     filterLeafChildren(data) {
       for (let item of data) {
         check(item);
       }

       function check(item) {
         if (!item.children || !item.children.length) {
           delete item.children;
         } else {
           for (let item2 of item.children) {
             check(item2);
           }
         }
       }
       return data;
     },
     countAmount(data) {
       let order_goods = data.order_goods || [];
       let goods_pay_price_amount = 0;
       let goods_price_amount = 0;
       let cost_price_amount = 0;
       for (let item of order_goods) {
         item.goods_pay_price_amount_row = parseFloat(item.goods_pay_price) * item.goods_num;
         item.goods_price_amount_row = parseFloat(item.goods_price) * item.goods_num;
         item.goods_cost_amount_row = parseFloat(item.cost_price) * item.goods_num;
         goods_pay_price_amount += parseFloat(item.goods_pay_price_amount_row);
         goods_price_amount += parseFloat(item.goods_price_amount_row);
         cost_price_amount += parseFloat(item.goods_cost_amount_row);
       }
       data.goods_pay_price_amount = goods_pay_price_amount;
       data.goods_price_amount = goods_price_amount;
       data.cost_price_amount = cost_price_amount;
       data.order_goods = order_goods;
       return data;
     }
   },
   downloadExl: function(titleArr, dataArr, type, hrefId, fileName) {
     var json = [];
     var rowData = {};
     var keyMap = [];
     for (var i = 0; i < titleArr.length; i++) {
       rowData[i] = titleArr[i];
       keyMap.push(i);
     }
     json.push(rowData);
     for (var i = 0; i < dataArr.length; i++) {
       rowData = {};
       for (var j = 0; j < dataArr[i].length; j++) {
         rowData[j] = dataArr[i][j];
       }
       json.push(rowData);
     }
     var tmpdata = []; //用来保存转换好的json 
     json.map(function(v, i) {
       return keyMap.map(function(k, j) {
         return Object.assign({}, {
           v: v[k],
           position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1),
           s: i == 0 ? { font: { bold: true } } : "",
         });
       });
     }).reduce(function(prev, next) {
       return prev.concat(next);
     }).forEach(function(v, i) {
       return tmpdata[v.position] = {
         v: v.v,
         s: v.s ? v.s : "",
       };
     });
     var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
     var tmpWB = {
       SheetNames: ['mySheet'], //保存的表标题
       Sheets: {
         'mySheet': Object.assign({}, tmpdata, //内容
           {
             '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
           })
       }
     };
     let tmpDown = new Blob([s2ab(XLSX.write(tmpWB, {
       bookType: type == undefined ? 'xlsx' : type,
       bookSST: false,
       type: 'binary' //这里的数据是用来定义导出的格式类型
     }))], {
       type: ""
     }); //创建二进制对象写入转换好的字节流
     var href = URL.createObjectURL(tmpDown); //创建对象超链接
     if (!document.getElementById(hrefId || "hf")) {
       let aDom = document.createElement('a');
       aDom.download = fileName || "download.xlsx";
       aDom.id = hrefId || "hf";
       $('body').append(aDom);
     }
     document.getElementById(hrefId || "hf").href = href; //绑定a标签
     document.getElementById(hrefId || "hf").click(); //模拟点击实现下载
     setTimeout(function() {
       //延时释放
       URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
     }, 100);

     function s2ab(s) {
       //字符串转字符流
       var buf = new ArrayBuffer(s.length);
       var view = new Uint8Array(buf);
       for (var i = 0; i != s.length; ++i) {
         view[i] = s.charCodeAt(i) & 0xFF;
       }
       return buf;
     }
     // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
     function getCharCol(n) {
       var temCol = '',
         s = '',
         m = 0;
       while (n > 0) {
         m = n % 26 + 1;
         s = String.fromCharCode(m + 64) + s;
         n = (n - m) / 26;
       }
       return s;
     }
   },
   setTotal(vm, pagi, total) {
     try {
       vm.$refs[pagi].setTotal(total);
     } catch (e) {}
   }
 }

 function dataRender(val, type, param) {
   let relValue = "";
   if (val !== 0 && !val) return "-"
   switch (type) {
     case "sex":
       relValue = (val == "m" || val == "M") ? "男" : "女"
       break;
     case "date":
       if (!val) { relValue = '-'; break; }
       if (/^\d{9,10}$/.test(val)) val *= 1000;
       relValue = moment(val).format(param || 'YYYY-MM-DD')
       break;
     case "fixed":
       relValue = parseFloat(val).toFixed(2);
       break;
     default:
       relValue = val;
   }
   if (keyVals[type]) relValue = keyVals[type][val];
   return (relValue === 0 || relValue) ? relValue : "-"
 };