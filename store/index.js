 import utils from '../utils/common'
 const proKey = "sst-sup-";
 export const state = () => ({
   token: "",
   username: "",
   stepStatus: '',
   urlKeyMap: {},
   stepData: {},
   refundAddress: null,
 })
 export const mutations = {
   updateStepData(state, stepData) {
     state.stepData = stepData;
     localStorage.setItem('stepData', JSON.stringify(stepData));
   },
   deleteStepData(state) {
     state.stepData = "";
     localStorage.removeItem('stepData');
   },
   updateUrlKeyMap(state, urlKeyMap) {
     state.urlKeyMap = urlKeyMap;
     sessionStorage.setItem('urlKeyMap', JSON.stringify(urlKeyMap));
   },
   deleteUrlKeyMap(state) {
     state.urlKeyMap = "";
     sessionStorage.removeItem('urlKeyMap', urlKeyMap);
   },
   updateStepStatus(state, status) {
     state.stepStatus = status;
     localStorage.setItem('stepStatus', status);
   },
   deleteStepStatus(state) {
     state.stepStatus = "";
     localStorage.removeItem('stepStatus', status);
   },
   updateToken(state, token) {
     state.token = token;
     localStorage.setItem(proKey + 'token', token);
     utils.cookieUtil.addCookie(proKey + 'token', token)
   },
   deleteToken(state) {
     state.token = "";
     localStorage.removeItem(proKey + 'token');
     utils.cookieUtil.deleteCookie(proKey + 'token')
   },
   updateUsername(state, username) {
     state.username = username;
     localStorage.setItem(proKey + 'username', username);
   },
   deleteUsername(state) {
     state.username = "";
     localStorage.removeItem(proKey + 'username');
   },
   updateRefundAddress(state, refundAddress) {
     state.refundAddress = refundAddress;
     sessionStorage.setItem(proKey + 'refundAddress', JSON.stringify(refundAddress));
   },
   deleteRefundAddress(state) {
     state.refundAddress = "";
     localStorage.removeItem(proKey + 'refundAddress');
   },
 }
 export const actions = {
   loginSuccess(context, { token, username }) {
     context.commit('updateToken', token)
     context.commit('updateUsername', username)
   },
   logout(context) {
     context.commit('deleteToken')
     context.commit('deleteUsername')
   },
   updateUrlKeyMap(context, { key, url }) {
     let map = context.getters['urlKeyMap'];
     if (!map[key]) {
       map[key] = url;
     }
     context.commit('updateUrlKeyMap', map);
   }
 }
 export const getters = {
   stepData(state) {
     if (!state.stepData && !process.server) {
       try {
         return JSON.parse(localStorage.getItem('stepData'));
       } catch (e) {}
     }
     return state.stepData;
   },
   urlKeyMap(state) {
     if (!state.urlKeyMap && !process.server) {
       try {
         return JSON.parse(sessionStorage.getItem('urlKeyMap'));
       } catch (e) {}
     }
     return state.urlKeyMap;
   },
   stepStatus(state) {
     if (!state.stepStatus && !process.server) {
       return localStorage.getItem('stepStatus');
     }
     return state.stepStatus;
   },
   token(state) {
     if (!state.token && !process.server) {
       return localStorage.getItem(proKey + 'token');
     }
     return state.token;
   },
   username(state) {
     if (!state.username && !process.server) {
       return localStorage.getItem(proKey + 'username');
     }
     return state.username;
   },
   refundAddress(state) {
     if (!state.refundAddress && !process.server) {
       try {
         return JSON.parse(localStorage.getItem(proKey + 'refundAddress'));
       } catch (e) {}
     }
     return state.refundAddress;
   }
 }