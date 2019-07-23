/**
 * 管理界面  权限控制
 */
import { getEnvConfig } from '~/config/config'
import axios from 'axios'
import utils from '~/utils/common'
export default function(context) {
  // function redirectRefundAddress() {
  //   context.redirect('/frame/redirect?path=' + '/customer-service/cs-mgmt');
  //   // context.redirect('/frame/customer-service/cs-mgmt');
  // }
  // var path = context.route.path;
  // if (path.search('/frame/') != -1 && path.search('/frame/customer-service/cs-mgmt') == -1 && path.search('/frame/redirect') == -1) {
  //   let apiPath = getEnvConfig().apiPath;
  //   apiPath = getFromCookieWhite(context.req, 'apipath') || apiPath;
  //   let refundAddress = context.store.state.refundAddress;
  //   let token = getFromCookieWhite(context.req, 'sst-sup-token') || context.store.getters['token'];
  //   if (!refundAddress) {
  //     return new Promise((resolve, reject) => {
  //       axios({
  //         method: 'get',
  //         url: apiPath + "/refund/address",
  //         headers: {
  //           "Authorization": "Bearer " + token
  //         },
  //       }).then(function(response) {
  //         let res = response.data;
  //         if (res.status == 'success') {
  //           if (res.data.id && res.data.refund_address) {
  //             context.store.commit('updateRefundAddress', res.data)
  //             resolve();
  //           } else {
  //             redirectRefundAddress()
  //           }
  //         } else {
  //           if (res.code == 401) {
  //             context.redirect('/auth/login');
  //             return;
  //           }
  //           redirectRefundAddress()
  //         }
  //       }).catch((err) => {
  //         // 获取权限发生错误
  //         // console.log(err);
  //         redirectRefundAddress()
  //       })
  //     })
  //   } else {}
  // }
}
/**
 * 从请求头获取cookie信息
 */
function getFromCookieWhite(req, key) {
  if (!req || !req.headers.cookie) return;
  const cook = req.headers.cookie.split(';').find(c => c.trim().startsWith(key + '='));
  if (!cook) return;
  const value = cook.split('=')[1];
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}