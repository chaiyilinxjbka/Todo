import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

const ITEMS_DATA = 'items'
const LISTS_DATA = 'lists'
const IS_LOGIN = 'islogin'

const state = {
  items: JSON.parse(window.localStorage.getItem(ITEMS_DATA) || '[]'),
  lists: JSON.parse(window.localStorage.getItem(LISTS_DATA) || '[]'),
  islogin: window.localStorage.getItem(IS_LOGIN)
}
const getters = {
  items:  state => state.items,
  lists:  state => state.lists,
  islogin: state => state.islogin,
  getItemsbytitle: (state) => (title) => {
    var items = state.items.filter(item => {
        if (item.belongto == title){
          return true;
        }
        return false;
      });
    return items;
  }
}
const mutations = {
  addItem(state, obj) {
    let newItem = {
      text: obj.text,
      date: obj.date,
      belongto: obj.belongto,
      isfinished: false,
      isupdated:false
    }
    state.items.push(newItem)
  },
  addList(state, obj) {
    let newList = {
      title: obj.title,
      count: 0
    }
    state.lists.push(newList)
  },
  deleteItem(state, text) {
    state.items.splice(state.items.findIndex(item => item.text == text), 1)
  },
  setLogin (state, islogin) {
    state.islogin = islogin;
  }
}
const localStoragePlugin = store => {
  store.subscribe((mutation, { lists, items, islogin }) => {
    window.localStorage.setItem(ITEMS_DATA, JSON.stringify(items))
    window.localStorage.setItem(LISTS_DATA, JSON.stringify(lists))
    window.localStorage.setItem(IS_LOGIN, islogin)

  })
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: [localStoragePlugin]
})
