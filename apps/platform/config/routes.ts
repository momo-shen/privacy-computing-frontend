export const routes = [
  {
    path: '/',
    wrappers: ['@/wrappers/theme-wrapper', '@/wrappers/login-auth'],
    component: '@/modules/layout/layout.view',
    routes: [
      { path: '/', component: 'edge', wrappers: ['@/wrappers/basic-node-auth', '@/wrappers/p2p-login-auth'] },
      {
        path: '/edge',
        component: 'edge',
        wrappers: ['@/wrappers/basic-node-auth', '@/wrappers/p2p-login-auth'],
      },
      {
        path: '/psi',
        component: 'psi',
        wrappers: [],
      },
      {
        path: '/prisql',
        component: 'prisql',
        wrappers: [],
      },
      { path: '/*', redirect: '/login' },
    ],
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    wrappers: ['@/wrappers/theme-wrapper', '@/wrappers/login-wrapper'],
    component: 'login',
  },
];
