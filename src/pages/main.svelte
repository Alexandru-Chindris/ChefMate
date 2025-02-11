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
    <Tabs>
      <Tab id="tab-1" class="page-content" tabActive>
          {#if loading}
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
                      class="skeleton-text "
                      title="Card Header"
                      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit."
                      footer="Card Footer"/>
                    </ListItem>
                </Block>
              {/each}
            </List>
              {:else}
              <Block class="correction">
                <NavTitle title="👋 {greetUserByTime()}, $user." hideOnPageScroll transparent class="navbar bree-serif-regular"></NavTitle>
                <p class="subtitle-today lato">Today's recipe</p>
                <Card class="today-recipe-correction">
                  <p class="cus-today">{today_selection}</p>
                </Card>
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
                <p>Feed</p>
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
                  <img src={item.cover} alt={item.title} class="list-item-image" />
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
          <p>Tab 3 content</p>
        </Block>
      </Tab>
    </Tabs>
</Page>
<script>
import {Page, Block, f7, Tabs, Tab, Toolbar, Link, NavTitle, List, ListItem, Icon, Card, Navbar, Searchbar, Subnavbar, Popup} from 'framework7-svelte';
import '../css/mainView.css';

let today_selection = "Spaghetti di Ludo";


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

let items = [
  {
    title: 'Carbonara',
    cover: '../images/images/IMG_0819-843347201.jpg',
    views: 5322,
    likes: 14,
    serving: 4,
    minutes: 20,
    author: 'Mario Rossi',
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
    title: 'Spaghetti di Ludo',
    cover: '../images/images/spaghetti_ludo.jpg',
    views: 3745,
    likes: 10,
    serving: 4,
    minutes: 15,
    author: 'Luigi Bianchi',
    category: 'Main Course',
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
    likes: 16,
    serving: 4,
    minutes: 25,
    author: 'Mario Rossi',
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
    title: 'Pollo al Curry',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-6.jpg',
    views: 3231,
    likes: 19,
    serving: 2,
    minutes: 22,
    author: 'Carla Neri',
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
    title: 'Pizza Montanara',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-2.jpg',
    views: 4977,
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
    likes: 10,
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
    title: 'Salmone al Limone',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-9.jpg',
    views: 2543,
    likes: 12,
    serving: 4,
    minutes: 23,
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
    title: 'Focaccia alle Erbe',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-10.jpg',
    views: 3120,
    likes: 17,
    serving: 3,
    minutes: 20,
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
];

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

  if (currentHour >= 5 && currentHour < 12) {
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