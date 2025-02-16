
import HomePage from '../pages/home.svelte';
import Debug from '../pages/debug.svelte';
import Login from '../pages/login.svelte';
import SignIn from '../pages/sign-in.svelte';
import MainView from '../pages/main.svelte';
import Register from '../pages/register_user_form.svelte';

var routes = [
  {
    path: '/',
    component: Debug, // Default: HomePage
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
    name: 'RegisterForm',
    path: '/register_user_form/',
    component: Register,
    options: {
      transition: 'f7-push',
    },
  }
];

export default routes;
