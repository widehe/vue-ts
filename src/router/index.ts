import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: () => import('../App.vue'),
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('../components/HelloWorld.vue'),
  },
  {
    path: '/param/:id',
    component: () => import('../components/Param.vue'),
    props: (route: any) => ({ paramId: route.params.id, age: route.query.age }),
  },
  {
    path: '/indexDB',
    component: () => import('../components/IndexDB.vue'),
  },
  {
    path: '/loading',
    component: () => import('../components/Loading.vue'),
  },
]

const router = new Router({
  linkActiveClass: 'active',
  routes: constantRouterMap,
} as any)

export default router
