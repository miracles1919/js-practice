import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Layout from '../components/Layout';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/detail',
    name: 'Layout',
    props: true,
    component: Layout,
    children: [
      {
        path: '/detail/:id',
        name: 'detail',
        props: true,
        component: () =>
          import(/* webpackChunkName: "detail" */ '../views/Detail.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
