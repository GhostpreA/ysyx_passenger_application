import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    //公共state对象，存储所有组件的状态
    state: {
        //乘客信息 对象
        passengerInfo: '',
    },

    //唯一取值的方法，计算属性
    getters: {},

    //唯一可以修改state值的方法，同步阻塞
    mutations: {
        //同步方法 保存乘客信息
        savePassengerInfo: (state, resInfo) => state.passengerInfo = resInfo
    },

    //异步调用mutations方法
    actions: {
        //异步方法调用 同步保存乘客信息
        savePassengerInfoAction:({commit},resInfo)=>{commit("savePassengerInfo",resInfo)}
    },
    modules: {}
})
