/**
 * @description 路由信息
 */

export default [
    {
        name: "index",
        path: "/",
        component: () => import("@/views/index"),
        meta: {
            time() { return 300 }
        }
    },
    {
        name: "ware",
        path: "/ware",
        component: () => import("@/views/ware"),
        meta: {
            time() { return 300 }
        }
    },

]
