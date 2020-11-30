import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import PageUser from '../views/PageUser/PageUser.vue'
import Test from '../views/Test.vue'
const routes = [
  {
    path: '/test',
    name: 'Test',
    component: Test,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    
  },
  {
    path: '/cadastro',
    name: 'Register',
    component: Register,
  },
  {
    path: '/page_user',
    name: 'pageuser',
    component: PageUser,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
