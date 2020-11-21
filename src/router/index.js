import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

const Login = () => import('@/views/Login')
const SignUp = () => import('@/views/SignUp')
const Home = () => import('@/views/Home')
const Task = () => import('@/views/Task')

Vue.use(Router)

const checkAuth = (to, from, next) => {
  console.log(store.getters.authenticated)
  if (store.getters.authenticated) {
    next();
  } else {
    next({name: 'login'});
  }
}

function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/home',
      name: 'Home',
      beforeEnter: checkAuth,
    },
    {
      path: '/home',
      name: 'HomePage',
      component: Home,
      beforeEnter: checkAuth,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/task',
      name: 'Create-Task',
      component: Task,
      beforeEnter: checkAuth
    },
    {
      path: '/task/:id',
      name: 'Edit-Task',
      component: Task,
      beforeEnter: checkAuth
    },
  ]
}

export default new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})
