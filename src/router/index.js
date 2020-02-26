import Vue from 'vue'
import VueRouter from 'vue-router'

//1.安装插件
Vue.use(VueRouter)

//懒加载
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
//2.创建路由对象
const routes = [
  {
    //重定向
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]
const router = new VueRouter({
  routes,
  model: 'history'
})

//导出router
export default router
