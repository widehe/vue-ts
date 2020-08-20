import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export const constantRouterMap = [
    
    { path: '/', component: () => import("../components/HelloWorld.vue"),redirect: "/home" },
    {
        path: "/param/:id/:age",
        component: () => import("../components/Param.vue"),
        props: true
    }
]

const router = new Router({
    linkActiveClass: "active",
    routes: constantRouterMap
} as any);

export default  router;