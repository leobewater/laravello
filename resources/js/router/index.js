import { createRouter, createWebHistory } from 'vue-router'
import Board from '../views/Board.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import store from '../store'

const routes = [
  { path: '/', name: 'board', component: Board },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

//router.beforeEach((to, from, next) => {
// check user token when "requiresAuth" exists in "meta" key
// if (to.meta.requiresAuth && !store.state.user.token) {
//   next({ name: 'Login' })
// } else if (store.state.user.token && to.meta.isGuest) {
//   // redirect to dashboard if user already logged in and try to go to login or register pages
//   next({ name: 'Board' })
// } else {
//   next()
// }
//})

export default router
