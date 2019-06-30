import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import axios from "axios"

import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "./assets/index.css"

axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"
// Add a request interceptor添加一个请求的拦截器
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent

    config.headers.Authorization = localStorage.getItem("token")
    // console.log(config)
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

// 注册一个导航守卫
// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next()
    return
  }
  if (localStorage.getItem("token")) {
    next()
  } else {
    router.push("/login")
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
