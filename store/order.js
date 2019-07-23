 export const state = () => ({
   logisticsCompany: null,
 })
 export const mutations = {
   updateLogisticsCompany(state, logisticsCompany) {
     state.logisticsCompany = logisticsCompany;
     sessionStorage.setItem('logisticsCompany', JSON.stringify(logisticsCompany));
   },
   deleteLogisticsCompany(state) {
     state.logisticsCompany = "";
     sessionStorage.removeItem('logisticsCompany', logisticsCompany);
   },
 }
 export const actions = {}
 export const getters = {
   logisticsCompany(state) {
     if (!state.logisticsCompany && !process.server) {
       try {
         return JSON.parse(sessionStorage.getItem('logisticsCompany'));
       } catch (e) {}
     }
     return state.logisticsCompany;
   },
 }