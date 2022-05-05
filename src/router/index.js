import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/login'
import hotelKeyTable from "@/components/hotelKeyTable";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/hotel-key-table',
    name: 'hotelKeyTable',
    component: hotelKeyTable
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
