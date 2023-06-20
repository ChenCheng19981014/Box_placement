/**
 * @description axios配置管理
 */

import axios from "axios"
import router from "@/router"
import { Notification } from "element-ui"
import { NETWORD_SUCCESS_CODE, NETWORK_UN_LOGIN_CODE } from "../../constant/system"
import { getCookie } from "../../utils"

let instance = axios.create({
    baseURL: '/api',
    timeout: 100000,
    headers: {
        get: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        post: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
})

instance.interceptors.request.use(config => {
    let token = getCookie("Authorization")
    if (token) {
        config.headers.Authorization = token;

    }
    return config
})

instance.interceptors.response.use(data => {
    return data.data
    //成功返回信息
    if (data.data.code === NETWORD_SUCCESS_CODE) {

    } else {
        Notification.error(data.data.message)
        //如果未登录
        if (data.data.code == NETWORK_UN_LOGIN_CODE) {
            router.replace({
                name: "login"
            })
        }
        throw new Error(data.data.message)
    }

})

export default instance