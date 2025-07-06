export default [
  {
    path: '/',
    component: () => import('@/views/DashboardView/index.vue'),
    name: 'DashboardView',
    meta: { title: 'Dashboard'},
    children: [
      {
        path: '/board/:id',
        component: () => import('@/views/DashboardView/BoardView/index.vue'),
        name: 'DashboardBoardView',
        meta: { title: 'Board'},
      },
    ],
  },
]
