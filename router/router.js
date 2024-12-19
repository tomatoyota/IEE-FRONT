import { createRouter, createWebHistory } from 'vue-router';
import UpdatePassword from '/components/UpdatePassword.vue';
import path from 'path';

const routes = [
  {
    path: '/',
    name: '/',
    component: () => import('~/pages/index.vue')
  },
  {
    path: '/news',
    component: () => import('~/pages/news.vue')
  },
  {
    path: '/newsView',
    component: () => import('~/pages/newsView.vue')
  },
  {
    path: '/album',
    component: () => import('~/pages/album.vue')
  },
  // {
  //   path: '/reset-password/:token',
  //   name: 'UpdatePassword',
  //   component: UpdatePassword
  // },
  {
    path: '/groupProfile',
    component: () => import('~/pages/groupProfile.vue')
  },
  {
    path: '/personalProfile',
    component: () => import('~/pages/personalProfile.vue')
  },
  {
    path: '/verify',
    component: () => import('~/pages/verify.vue')
  },
  // {
  //   path: '/error',
  //   component: () => import('~/pages/error.vue')
  // },
  // {
  //   path: '/404',
  //   component: () => import('~/pages/[…slug].vue')
  // },
  // {
  //   path: '/:pathMatch(.*)*', // 捕獲未匹配的路徑
  //   redirect: '/404'
  // }
  
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;