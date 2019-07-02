import Vue from "vue"
import Router from "vue-router"
// import Home from "./views/Home.vue"
import Login from "./views/Login.vue"
import Home from "./views/Home.vue"
import Users from "./views/Users.vue"
import Roles from "./views/Roles.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/login",
      component: Login
    },
    {
      path: "/home",
      component: Home,
      children: [
        { path: "/users", component: Users },
        { path: "/roles", component: Roles }
      ]
    },
    {
      path: "/",
      redirect: "/home"
    }
  ]
})
