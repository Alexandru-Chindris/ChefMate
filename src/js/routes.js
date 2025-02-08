
import HomePage from '../pages/home.svelte';
import Debug from '../pages/debug.svelte';
import Login from '../pages/login.svelte';
import SignIn from '../pages/sign-in.svelte';
import MainView from '../pages/main.svelte';

var routes = [
  {
    path: '/',
    component: Home, // HomePage
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
  },
  {
    name: 'RecipeDetail',
    path: '/recipe-detail/',
    component: RecipeDetail,
    options: {
      transition: 'f7-push',
    },
  }
];

export default routes;
