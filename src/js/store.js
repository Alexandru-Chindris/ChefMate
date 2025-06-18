
import { createStore } from 'framework7/lite';
import { writable } from 'svelte/store';

const store = createStore({
  state: {
    products: [
      {
        id: '1',
        title: 'Apple iPhone 8',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
      },
      {
        id: '2',
        title: 'Apple iPhone 8 Plus',
        description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
      },
      {
        id: '3',
        title: 'Apple iPhone X',
        description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
      },
    ]
  },
  getters: {
    products({ state }) {
      return state.products;
    }
  },
  actions: {
    addProduct({ state }, product) {
      state.products = [...state.products, product];
    },
  },
})

export const category = writable([
  { name: 'Burger', icon: '🍔' },
  { name: 'Pizza', icon: '🍕' },
  { name: 'Dessert', icon: '🍩' },
  { name: 'Sushi', icon: '🍣' },
  { name: 'Salads', icon: '🥗' },
  { name: 'Drinks', icon: '🍹' },
  { name: 'Pasta', icon: '🍝' }
]);

// Logical View
export let ingredients = writable([
  {
    name: "sugar",
    cover: "https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg",
  },
  {
    name: "flour",
    cover: "https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg",
  },
  {
    name: "milk",
    cover: "https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg",
  },
  {
    name: "eggs",
    cover: "https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg",
  },
  {
    name: "pepper",
    cover: "https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg"
  },
  {
    name: "olive oil",
    cover: "https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg"
  },
  {
    name: "garlic",
    cover: "https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg"
  },
  {
    name: "onion",
    cover: "https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg"
  },
  {
    name: "tomato",
    cover: "https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg"
  },
  {
    name: "cheese",
    cover: "https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg"
  },
  {
    name: "spezie",
    cover: "https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg"
  }
]);

export const user = writable(null);

export default store;