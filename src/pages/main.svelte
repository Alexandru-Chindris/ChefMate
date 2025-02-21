<Page ptr ptrMousewheel={true} onPtrRefresh={loadMore} class="main-page">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap" rel="stylesheet">
<Popup opened={showPopup} onPopupClosed={closeRecipeModal}>
  <Page class="container-detail">
    <Navbar title={selectedRecipe ? selectedRecipe.title : 'Page not found'} class="detail-navbar">
      <Link slot="nav-left" popupClose><Icon f7="arrow_uturn_left" /></Link>
      <Link slot="nav-right"><Icon f7="heart" /></Link>
    </Navbar>
    <Block class="detail-main-border">
      {#if selectedRecipe && selectedRecipe.ingridients}
        <Block>
          <div class="detail-img-container" style="--selectedRecipe-cover: url({selectedRecipe.cover});">
            <img src={selectedRecipe.cover} alt={selectedRecipe.title}/>
          </div>
          <div class="recipe-info">
            <h3>{selectedRecipe.title}</h3>
            <p>{selectedRecipe.category || 'Default Category'}</p>
            <div class="detail-post-row">
              <div class="detail-post-item">
                <Icon f7="eye" size="17px" /> 
                <span> {selectedRecipe.views}</span>
              </div>
              <div class="detail-post-item">
                <Icon f7="hand_thumbsup" size="17px" />
                <span> {selectedRecipe.likes}</span>
              </div>
              <div class="detail-post-item">
                <Icon f7="person" size="17px" />
                <span> {selectedRecipe.author}</span>
              </div>
            </div>
          </div>
          <div class="stats-row">
            <div class="stat-item">
              <Icon f7="flame" size="18px" color="black" />
              <p>{selectedRecipe.views} cal</p>
            </div>
            <div class="stat-item">
              <Icon f7="person_2" size="18px" color="black" />
              <p>Servings {selectedRecipe.serving}</p>
            </div>
            <div class="stat-item">
              <Icon f7="timer" size="18px" color="black" />
              <p>{selectedRecipe.minutes} min</p>
            </div>
            <div class="stat-item">
              <Icon f7="info_circle" size="18px" color="black" />
              <p>Nutrition</p>
            </div>
          </div>
          <h3>Ingredients</h3>
          <div class="detail-recipe-components">
            {#each selectedRecipe.ingridients as item}
              <div class="detail-recipe-components-item">
                <img src={item.cover} alt={item.name} />
                <div class="detail-recipe-components-item-text">
                  <span>{item.name}</span>
                  <span>{item.kg}</span>
                </div>
              </div>
            {/each}
          </div>
          <Block>
          </Block>
        </Block>
      {:else}
        <p>No details</p>
      {/if}
    </Block>
  </Page>
</Popup>
  <Toolbar tabbar icons position={"bottom"}>
    <Link tabLink="#tab-1" tabLinkActive text="Home" iconIos="f7:house" iconMd="material:home"/>
    <Link tabLink="#tab-2" text="Discover" iconIos="f7:search" iconMd="material:search" />
    <Link tabLink="#tab-3" text="Profile" iconIos="f7:person" iconMd="material:group"/>
  </Toolbar>
    <Tabs animated>
      <Tab id="tab-1" class="page-content" tabActive>
          {#if loading} <!-- loading default -->
            <List strongIos outlineIos dividersIos mediaList v-if="loading">
              {#each items as n, index (index)}
                <Block class="skeleton-correction">
                    <ListItem
                    key={n}
                    class={`skeleton-text skeleton-effect-${effect} reload-style`}
                    title="Full Name"
                    subtitle="Position"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis. Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
                    >
                    <Card
                      outline
                      class="skeleton-text"
                      title="Card Header"
                      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit."
                      footer="Card Footer"/>
                    </ListItem>
                </Block>
              {/each}
            </List>
              {:else}
              <Block class="correction">
                {#if user.name}
                  <NavTitle title="👋 {greetUserByTime()}, {user.name}" hideOnPageScroll transparent class="navbar bree-serif-regular"></NavTitle>
                {:else}
                  <NavTitle title="👋 {greetUserByTime()}" hideOnPageScroll transparent class="navbar bree-serif-regular"></NavTitle>
                {/if}
                <p class="subtitle-today lato">Today's recipe</p>
                <a on:click={() => openRecipeModal(today_selection)} href>
                  <Card class="today-recipe-correction" style="--today-pic: url({today_selection.cover});">
                    <p class="cus-today">{today_selection.title}</p>
                  </Card>
                </a>
                <p class="subtitle lato">Recipe that you would love</p>
                <swiper-container pagination class="demo-swiper-multiple" space-between="10" slides-per-view="auto">
                  {#each items as item, index (index)}
                    <swiper-slide>
                      <div class="single-card" >
                        <a on:click={() => openRecipeModal(item)} href>
                          <img class="card-image" src={item.cover} alt=""/>
                        </a>
                        <div class="card-content" >
                          <div class="card-stats">
                            <span class="stat">
                              <p><Icon f7="heart_circle" size="22px"/></p>
                              {item.views}
                            </span>
                            <span class="stat">
                              <p><Icon f7="hand_thumbsup" size="22px"/></p>{item.likes}
                            </span>
                          </div>
                          <p class="card-title">{item.title}</p>
                        </div>
                      </div>
                    </swiper-slide>
                  {/each}
                </swiper-container>
                <p class="subtitle lato">Categories</p>
                <div class="categories-container">
                  <swiper-container pagination class="demo-swiper-multiple" space-between="1" slides-per-view="4">
                    {#each categories as item}
                       <swiper-slide class="catogory-container">
                        <div class="rounded-container">
                          <div class="category-name">{item.icon} <br>{item.name}</div>
                        </div>
                       </swiper-slide>
                    {/each}
                  </swiper-container>
                </div>
                <p>Feed</p>
                <div class="block">
                  <!-- should be sorted-items in for each , missing sorting algorithm -->
                  {#each items as item (item.title)}
                    <Feed item={item} user={user} cate={categories}/>
                  {/each}
                </div>
              </Block>
          {/if}
      </Tab>
      <Tab id="tab-2" class="page-content">
        <Block class="correction-tab2">
          <Navbar title="Search">
            <Subnavbar inner={true} class="subnav">
              <div class="searchbar-container">
                <Searchbar searchContainer=".search-list" searchIn=".item-title" />
              </div>
            </Subnavbar>
          </Navbar>
      
          <List strongIos outlineIos dividersIos class="searchbar-not-found">
            <ListItem title="Nothing found" />
          </List>
      
          <List strongIos outlineIos dividersIos class="list-content search-list searchbar-found">
            {#each items as item, index (index)}
              <ListItem>
                <div slot="media" class="image-container">
                  <a on:click={() => openRecipeModal(item)} href>
                    <img src={item.cover} alt={item.title} class="list-item-image" />
                  </a>
                </div>
                <div slot="title" class="list-item-content">
                  <div class="item-title">{item.title}</div>
                  <div class="item-stats">
                    <span class="stat">
                      <Icon f7="heart_circle" size="16px" /> {item.views}
                    </span>
                    <span class="stat">
                      <Icon f7="hand_thumbsup" size="16px" /> {item.likes}
                    </span>
                  </div>
                </div>
              </ListItem>
            {/each}
          </List>
        </Block>
      </Tab>
      <Tab id="tab-3" class="page-content">
        <Block class="correction">
          <div class="extra-ios-space">
            <Segmented strong tag="p">
              <Button active={activeStrongButton === 0} onClick={() => (activeStrongButton = 0)}>
                Profile
              </Button>
              <Button active={activeStrongButton === 1} onClick={() => (activeStrongButton = 1)}>
                Favorites
              </Button>
              <Button active={activeStrongButton === 2} onClick={() => (activeStrongButton = 2)}>
                Settings
              </Button>
            </Segmented>
            {#if activeStrongButton == 0}
            <div class="profile-container">
              <img src={user.profilePicture} alt class="profile-picture" />
              <h2 class="username">@{user.username}</h2>
              <p class="bio">{user.bio}</p>               
              <div class="recipes-section">
                <h3 class="recipes-title">Your Recipes</h3>
                <Fab position="center-bottom" text="Create">
                  <Icon f7="plus" md="material:plus" />
                </Fab>
                {#if user.recipes.length > 0}
                  <div class="recipes-container">
                    {#each user.recipes as recipe}
                      <div class="recipe-card">
                        <img src={recipe.image} alt={recipe.title} />
                      </div>
                    {/each}
                  </div>
                {:else}
                  <p class="no-recipes-message">No recipe still!</p>
                {/if}
              </div>
            </div>
          {/if}
          {#if activeStrongButton == 1}
            <div class="container-fav">
              <h1 class="title-fav">Favorites</h1>
              <p class="paragraph-fav">You don't have any favorites yet</p>
              <p class="paragraph-fav">When viewing a recipe, press the favorite icon <Icon f7="bookmark"/> to add it</p>
            </div>
            {/if}
            {#if activeStrongButton == 2}
              <h1 class="title-settings">Settings</h1>
              <div class="container-settings">
                <List dividersIos simpleList strong outline>
                  <a href>
                    <ListItem title="Personal Information">
                      <Icon f7="chevron_right" color="black" />
                    </ListItem>
                  </a>
                  <a href>
                    <ListItem title="Security">
                      <Icon f7="chevron_right" color="black"/>
                    </ListItem>
                  </a>
                  <a href>
                    <ListItem title="Account Preferences">
                      <Icon f7="chevron_right" color="black"/>
                    </ListItem>
                  </a>
                  <a href>
                    <ListItem title="Advanced Settings">
                      <Icon f7="chevron_right" color="black"/>
                    </ListItem>
                  </a>
                </List>
              </div>
            {/if}
          </div>
        </Block>
      </Tab>
    </Tabs>
</Page>
<script>
import {Page, Block, f7, Tabs, Tab, Toolbar, Link, NavTitle, List, ListItem, Icon, Card, Navbar, Searchbar, Subnavbar, Popup, Segmented, Button, Fab} from 'framework7-svelte';
import '../css/mainView.css';
import Feed from '../pages/feed.svelte';

// Profile page
let activeStrongButton = 0;

// user db
let user = {
    name: "Ludovica",
    profilePicture: "../images/profile/user-template.jpg",
    username: "username",
    bio: "Love to cook, love life. I'm good in the kitchen, and i like dogs.",
    recipes: [
      { id: 1, title: "Pasta al pomodoro", image: "../images/images/IMG_0819-843347201.jpg"},
      { id: 2, title: "Spaghetti di Ludo", image: "../images/images/spaghetti_ludo.jpg" },
      { id: 3, title: "Elemento 3", image: "https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg" },
      { id: 4, title: "Pasta al pomodoro", image: "../images/images/IMG_0819-843347201.jpg" },
      { id: 5, title: "Spaghetti di Ludo", image: "../images/images/spaghetti_ludo.jpg" },
      { id: 6, title: "Elemento 3", image: "https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg" },
      { id: 4, title: "Pasta al pomodoro", image: "../images/images/IMG_0819-843347201.jpg" },
    ]
};

// Logical View
let ingridients = [
  {
    name: "salt",
    kg: "23.9g",
    cover: "../images/ingridients/salt.jpg"
  },
  {
    name: "butter",
    kg: "3.9g",
    cover: "../images/ingridients/butter.jpg"
  },
]

let categories = [
    { name: 'Burger', icon:'🍔'},
    { name: 'Pizza', icon:'🍕'},
    { name: 'Dessert', icon:'🍩'},
    { name: 'Sushi', icon:'🍣'},
    { name: 'Salads', icon:'🥗'},
    { name: 'Drinks', icon:'🍹'},
    { name: 'Pasta', icon:'🍝'},
];

let items = [
  {
    title: 'Carbonara',
    cover: '../images/images/IMG_0819-843347201.jpg',
    views: 5322,
    description: 'Un classico della cucina romana, ricco e saporito.',
    likes: 14,
    serving: 4,
    minutes: 20,
    author: 'Mario Rossi',
    category: 'Burger',
    ingridients:[
      {
        name: "salt",
        kg: "23.9g",
        cover: "../images/ingridients/salt.jpg"
      },
      {
        name: "butter",
        kg: "3.9g",
        cover: "../images/ingridients/butter.jpg"
      },],
  },
  {
    title: 'Spaghetti di Ludo',
    cover: '../images/images/spaghetti_ludo.jpg',
    views: 3745,
    description: 'Una rivisitazione originale degli spaghetti, un\'esplosione di gusto.',
    likes: 10,
    serving: 4,
    minutes: 15,
    author: 'Luigi Bianchi',
    category: 'Pizza',
    ingridients:[
      {
        name: "salt 2",
        kg: "23.9g",
        cover: "../images/ingridients/salt.jpg"
      },
      {
        name: "butter 2",
        kg: "3.9g",
        cover: "../images/ingridients/butter.jpg"
      },],
  },
  {
    title: 'Billie Jean',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg',
    views: 2987,
    description: 'Un dessert sorprendente, un omaggio alla pop star.',
    likes: 13,
    serving: 2,
    minutes: 30,
    author: 'Giulia Verdi',
    category: 'Dessert',
    ingridients:[
      {
        name: "salt",
        kg: "23.9g",
        cover: "../images/ingridients/salt.jpg"
      },
      {
        name: "butter",
        kg: "3.9g",
        cover: "../images/ingridients/butter.jpg"
      },],
  },
  {
    title: 'Elemento 4',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg',
    views: 4120,
    description: 'Un antipasto sfizioso, ideale per aprire ogni pasto.',
    likes: 7,
    serving: 5,
    minutes: 25,
    author: 'Carla Neri',
    category: 'Appetizer',
    ingridients:[
      {
        name: "salt",
        kg: "23.9g",
        cover: "../images/ingridients/salt.jpg"
      },
      {
        name: "butter",
        kg: "3.9g",
        cover: "../images/ingridients/butter.jpg"
      },],
  },
  {
    title: 'Pesto Genovese',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-4.jpg',
    views: 3666,
    description: 'Un condimento ligure famoso in tutto il mondo, profumato e intenso.',
    likes: 11,
    serving: 3,
    minutes: 18,
    author: 'Roberto Di Luca',
    category: 'Main Course',
    ingridients:[
      {
        name: "salt",
        kg: "23.9g",
        cover: "../images/ingridients/salt.jpg"
      },
      {
        name: "butter",
        kg: "3.9g",
        cover: "../images/ingridients/butter.jpg"
      },],
  },
  {
    title: 'Riso alla Cantonese',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-5.jpg',
    views: 2854,
    description: 'Un classico della cucina cinese, colorato e gustoso.',
    likes: 16,
    serving: 4,
    minutes: 25,
    author: 'Mario Rossi',
    category: 'Salads',
    ingridients:[
      {
        name: "salt",
        kg: "23.9g",
        cover: "../images/ingridients/salt.jpg"
      },
      {
        name: "butter",
        kg: "3.9g",
        cover: "../images/ingridients/butter.jpg"
      },],
  },
  {
    title: 'Pollo al Curry',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-6.jpg',
    views: 3231,
    description: 'Un piatto esotico e speziato, un viaggio nei sapori dell\'India.',
    likes: 19,
    serving: 2,
    minutes: 22,
    author: 'Carla Neri',
    category: 'Sushi',
    ingridients:[
      {
        name: "salt",
        kg: "23.9g",
        cover: "../images/ingridients/salt.jpg"
      },
      {
        name: "butter",
        kg: "3.9g",
        cover: "../images/ingridients/butter.jpg"
      },],
  },
  {
    title: 'Pizza Montanara',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-2.jpg',
    views: 4977,
    description: 'Una pizza fritta napoletana, un\'esperienza unica di gusto e tradizione.',
    likes: 18,
    serving: 4,
    minutes: 15,
    author: 'Giulia Verdi',
    category: 'Main Course',
    ingridients:[
      {
        name: "salt",
        kg: "23.9g",
        cover: "../images/ingridients/salt.jpg"
      },
      {
        name: "butter",
        kg: "3.9g",
        cover: "../images/ingridients/butter.jpg"
      },],
  },
  {
    title: 'Tiramisù Classico',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-7.jpg',
    views: 5230,
    description: 'Un dessert italiano amato in tutto il mondo, un\'armonia di sapori e consistenze.',
    likes: 28,
    serving: 6,
    minutes: 30,
    author: 'Luigi Bianchi',
    category: 'Dessert',
    ingridients:[
      {
        name: "salt",
        kg: "23.9g",
        cover: "../images/ingridients/salt.jpg"
      },
      {
        name: "butter",
        kg: "3.9g",
        cover: "../images/ingridients/butter.jpg"
      },],
  },
  {
    title: 'Cous Cous di Verdure',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-8.jpg',
    views: 1867,
    description: 'Un piatto mediorientale leggero e nutriente, un\'esplosione di colori e profumi.',
    likes: 10,
    serving: 3,
    minutes: 18,
    author: 'Roberto Di Luca',
    category: 'Pasta',
    ingridients:[
      {
        name: "salt",
        kg: "23.9g",
        cover: "../images/ingridients/salt.jpg"
      },
      {
        name: "butter",
        kg: "3.9g",
        cover: "../images/ingridients/butter.jpg"
      },],
  },
  {
    title: 'Salmone al Limone',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-9.jpg',
    views: 2543,
    description: 'Un piatto semplice e raffinato, un classico della cucina mediterranea.',
    likes: 12,
    serving: 4,
    minutes: 23,
    author: 'Giulia Verdi',
    category: 'Pasta',
    ingridients:[
      {
        name: "salt",
        kg: "23.9g",
        cover: "../images/ingridients/salt.jpg"
      },
      {
        name: "butter",
        kg: "3.9g",
        cover: "../images/ingridients/butter.jpg"
      },],
  },
  {
    title: 'Focaccia alle Erbe',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-10.jpg',
    views: 3120,
    description: 'Un pane lievitato profumato e gustoso, ideale per accompagnare ogni pasto.',
    likes: 17,
    serving: 3,
    minutes: 20,
    author: 'Carla Neri',
    category: 'Sushi',
    ingridients:[
      {
        name: "salt",
        kg: "23.9g",
        cover: "../images/ingridients/salt.jpg"
      },
      {
        name: "butter",
        kg: "3.9g",
        cover: "../images/ingridients/butter.jpg"
      },],
  },
];

/* Random Day Recipe start */
let randomValue = null;
let lastUpdateDate = null;

function updateRandomValue() {
    const today = new Date().toDateString();

    if (lastUpdateDate !== today) {
        randomValue = Math.floor(Math.random() * items.length);
        lastUpdateDate = today;
    }

    return randomValue;
}

updateRandomValue();
let today_selection = items[randomValue];

/* Random Day Recipe end*/

/* Recipe Popup View start */
let selectedRecipe = null;
let showPopup = false;

function openRecipeModal(item) {
  selectedRecipe = item;
  showPopup = true;
}

function closeRecipeModal() {
  showPopup = false;
  selectedRecipe = null;
}
/* Recipe Popup View end */

function greetUserByTime() {
  const now = new Date();
  const currentHour = now.getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon";
  } else if (currentHour >= 18 && currentHour < 22) {
    return "Good evening";
  }
}

/* Pull to refresh start */
  function loadMore(done) {
    setTimeout(() => {
        loading = true;
        setTimeout(() => {
          loading = false;
        }, 3000);
      done();
    }, 1000);
  } 

/* Reloading effects start */
  let loading = false;
  let effect = "fade";
/* Reloading effects end */
/* Pull to refresh end */
</script>