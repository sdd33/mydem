import { defineConfig } from 'umi';


export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },

  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/test', component: '@/pages/test/sendcaptcha' },
    { path: '/test1', component: '@/pages/test/test1' },

    { path: '/login',  component: '@/pages/login/index' },
    { path: '/layout', component: '@/pages/layout/index', wrappers: ['@/pages/wrappers/index']},
    { path: '/regist', component: '@/pages/regist/index'},
  ],
  fastRefresh: {},
  title: 'Umi',
});
