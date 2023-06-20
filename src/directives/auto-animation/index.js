import { watch } from "vue"
import store from "../../store"
/**
 * @description 自动注入class 出入场动画
 */

export default {
    bind(el, binding,) {

        //获取类目
        let id = binding.arg

        const unwatch = watch(() => store.state.rc, () => {
            changeClass()
            //只监听一次，然后处理
            // unwatch()
        })

        //初始化自动执行
        changeClass()

        //修改动画类目函数 
        function changeClass() {
            if (!store.state.rc) {
                el.classList.remove('a-r-' + id)
                el.classList.add('a-' + id)
            } else {
                el.classList.remove('a-' + id)
                el.classList.add('a-r-' + id)
            }
        }
    }
}                            