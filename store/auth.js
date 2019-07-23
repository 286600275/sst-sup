 export const state = () => ({
   userMember: null,
 })
 export const mutations = {
   updateUserMember(state, userMember) {
     state.userMember = userMember;
     localStorage.setItem('userMember', JSON.stringify(userMember));
   },
   deleteUserMember(state) {
     state.userMember = "";
     localStorage.removeItem('userMember');
   },
 }
 export const actions = {}
 export const getters = {
   userMember(state) {
     if (!state.userMember && !process.server) {
       try {
         return JSON.parse(localStorage.getItem('userMember'));
       } catch (e) {}
     }
     return state.userMember;
   },
 }