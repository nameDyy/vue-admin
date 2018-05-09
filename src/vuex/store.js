import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

// 没有在main.js中安装公共的插件vuex
Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    collapsed:false,
}

// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    toogleCollapsed(state) {
        state.collapsed = !state.collapsed
    }
}

// 创建 store 实例并导出
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})