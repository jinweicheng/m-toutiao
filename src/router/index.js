// createWebHistory
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('../views/layout'),
    children: [
      {
        // 默认子路由
        path: 'home',
        name: 'home',
        component: () => import('../views/home')
      },{
        path: 'my',
        name: 'my',
        component: () => import('../views/my')
      },{
        path: 'video',
        name: 'video',
        component: () => import('../views/video')
      },{
        path: 'question',
        name: 'question',
        component: () => import('../views/question')
      }  
    ],
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;




