import { createRouter, createWebHashHistory } from "vue-router";


const Home = () => import('../views/home/Home')

//2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  }
]
const router = createRouter({
  history:createWebHashHistory(),
  routes,
  mode: 'history'
})

//导出
export default router
