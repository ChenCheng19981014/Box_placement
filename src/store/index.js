/**
 * @description vue状态管理
 */

import store from "vuex"
import Vue from "vue"

Vue.use(store)

export default new store.Store({
    state: {
        //路由切换状态
        rc: false,
        // 登录状态
        loginState: false,
        // 用户信息
        userInfo: {

        },
        threeLoad: false,//，模型加载
        isDisabled: true,//是否可点击
        fitLayoutRatio: 0,
        onChangeRunSceneCallback: {},
        onResizeCallBack: {},
    },
    mutations: {
        openLoading(state) {
            state.threeLoad = false
        },
        closeLoading(state) {
            state.threeLoad = true
        },
        onResize(state, map) {
            const { type, fn } = map;
            state[type] = fn;
        },
        setFitLayoutRatio(store, ratio) {
            store.fitLayoutRatio = ratio;
            Object.values(store.onResizeCallBack).map((fn) => fn(ratio));
        },
        setRunSceneMap(state, map) {
            const { type, fn } = map;
            state.onChangeRunSceneCallback[type] = fn;
        },
    },
    actions: {
    }
})
