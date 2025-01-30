
import HomePage from '../pages/home.svelte';
import Debug from '../pages/debug.svelte';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    name: 'Debug',
    path: '/debug/',
    component: Debug,
    options: {
      transition: 'f7-push',
    }
  }
];

export default routes;
