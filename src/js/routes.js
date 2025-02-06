
import HomePage from '../pages/home.svelte';
import Debug from '../pages/debug.svelte';
import Login from '../pages/login.svelte';
import SignIn from '../pages/sign-in.svelte';
import MainView from '../pages/main.svelte';
import Main from '../pages/main.svelte';
import Home from '../pages/home.svelte';

var routes = [
  {
    path: '/',
    component: HomePage, // HomePage
  },
  {
    name: 'Debug',
    path: '/debug/',
    component: Debug,
    options: {
      transition: 'f7-push',
    },
  },
  {
    name: 'Login',
    path: '/login/',
    component: Login,
    options: {
      transition: 'f7-push',
    },
  },
  {
    name: 'SignIn',
    path: '/sign-in/',
    component: SignIn,
    options: {
      transition: 'f7-push',
    },
  },
  {
    name: 'MainView',
    path: '/mainview/',
    component: MainView,
    options: {
      transition: 'f7-push',
    },
  }
];

export default routes;
