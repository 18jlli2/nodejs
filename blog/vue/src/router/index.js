import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () =>
    import ("@/views/login")
const register = () =>
    import ("@/views/register")
const Home = () =>
    import ("@/views/Home")

/*路由*/
Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/register',
    name:'register',
    component:register
  },
  {
    path:'/home',
    name:'home',
    component:Home,

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
