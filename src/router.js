import Vue from "vue"
import Router from "vue-router"
// import Home from "./views/Home.vue"
import Login from "./views/Login.vue"
import Home from "./views/Home.vue"
import Users from "./views/Users.vue"
import Roles from "./views/Roles/Roles.vue"
import Rights from "./views/Rights.vue"
import Goods from "./views/Goods.vue"
import GoodsAdd from "./views/GoodsAdd.vue"
import Categories from "./views/Categories.vue"

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
        { path: "/roles", component: Roles },
        { path: "/rights", component: Rights },
        { path: "/goods", component: Goods },
        { path: "/goods-add", component: GoodsAdd },
        {
          path: "/categories",
          component: Categories
        }
      ]
    },
    {
      path: "/",
      redirect: "/home"
    }
  ]
})
