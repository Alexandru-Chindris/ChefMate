<Page ptr ptrMousewheel={true} onPtrRefresh={loadMore} class="main-page">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bree+Serif&family=Lato:wght@400;700&display=swap" rel="stylesheet">
<Popup opened={showPopup} onPopupClosed={closeRecipeModal}>
  <Page class="container-detail">
    <Navbar title={selectedRecipe ? selectedRecipe.title : 'Page not found'} class="detail-navbar">
      <Link slot="nav-left" popupClose><Icon f7="arrow_uturn_left" /></Link>
      <Link slot="nav-right"><Icon f7="heart" /></Link>
    </Navbar>
    <Block class="detail-main-border">
      {#if selectedRecipe && selectedRecipe.ingredients}
        <Block>
          <div class="detail-img-container" style="--selectedRecipe-cover: url({selectedRecipe.cover});">
            <img src={selectedRecipe.cover} alt/>
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
                <span>{selectedRecipe.author || 'Autore sconosciuto'}</span>
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
            {#each selectedRecipe.ingredients as item}
              <div class="detail-recipe-components-item">
                <img src={item.cover} alt/>
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
    <Link tabLink="#tab-1" tabLinkActive iconIos="f7:house" iconMd="material:home"/>
    <Link tabLink="#tab-2" iconIos="f7:search" iconMd="material:search" />
    <Link tabLink="#tab-3" iconIos="f7:person" iconMd="material:group"/>
  </Toolbar>
    <Tabs animated swipeable>
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
                      class="skeleton-text"
                      title="Card Header"
                      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit."
                      footer="Card Footer"/>
                    </ListItem>
                </Block>
              {/each}
            </List>
              {:else}
                {#if isLogin}
                <Block class="main-container">
                  <div class="header-row">
                    <div class="greeting-col">
                      <NavTitle
                        title="{greetUserByTime()},"
                        hideOnPageScroll
                        transparent
                        class="navbar bree-serif-regular greeting-main"
                      />
                      <Block class="username-style">{$user.name}</Block>
                    </div>
                    <div class="icon-buttons-row">
                      <Button class="icon-circle" small round fill>
                        <Icon f7="cart" size="3vh" />
                      </Button>
                      <Button class="icon-circle" small round fill>
                        <Icon f7="book" size="3vh" />
                      </Button>
                    </div>
                  </div>
                </Block>
                {:else}
                <Block class="main-container">
                  <div class="header-row">
                    <NavTitle title="{greetUserByTime()}" hideOnPageScroll transparent class="navbar bree-serif-regular"></NavTitle>
                    <div class="icon-buttons-row">
                      <Button class="icon-circle" small round fill>
                        <Icon f7="cart" size="3vh"/>
                      </Button>
                      <Button class="icon-circle" small round fill>
                        <Icon f7="book" size="3vh"/>
                      </Button>
                    </div>
                  </div>
                </Block>
                {/if}
                {#if items.length > 0}
                  <Block>
                    {#if today_selection}
                      <p class="subtitle-today open-sans-font">Today's recipe</p>
                      <a on:click={() => openRecipeModal(today_selection)} href>
                          <Card class="today-recipe-correction" style="--today-pic: url({today_selection.cover && !today_selection.cover.startsWith('http') ? 'http://localhost:5000' + today_selection.cover : (today_selection.cover || '../images/placeholders/default_image.png')});">
                        </Card>
                        <div class="today-row">
                          <span class="cus-today">{today_selection.title}</span>
                          <span class="cus-today-author pacifico-regular">{today_selection.author}</span>
                        </div>
                      </a>
                    {/if}
                    <p class="subtitle lato">Explore by categories!</p>
                    <div class="categories-container">
                      <swiper-container pagination class="demo-swiper-multiple cus-space" space-between="1" slides-per-view="4">
                        {#each categoryValue as item}
                          <swiper-slide class="catogory-container">
                            <div class="rounded-container">
                              <div class="category-icon">{item.icon}</div>
                            </div>
                          </swiper-slide>
                        {/each}
                      </swiper-container>
                    </div>
                    <p class="subtitle lato">Trending recipes</p>
                    <swiper-container pagination class="demo-swiper-multiple" space-between="10" slides-per-view="auto">
                      {#each items as item, index (index)}
                        <swiper-slide>
                          <div class="single-card" >
                            <a on:click={() => openRecipeModal(item)} href>
                              <img class="card-image" src={item.cover && !item.cover.startsWith('http') ? "http://localhost:5000" + item.cover : (item.cover || '../images/placeholders/default_image.png')} alt/>
                            </a>
                            <div class="card-content" >
                              <div class="card-stats">
                                <span class="stat">
                                  <p><Icon f7="eye" size="22px"/></p>
                                  {item.views}
                                </span>
                                <span class="stat">
                                  <p><Icon f7="hand_thumbsup" size="22px"/></p>{item.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        </swiper-slide>
                      {/each}
                    </swiper-container>
                    <Block class="promo-container">
                      <div class="promo-content">
                        <img src="../images/images/promo_image.png" alt class="promo-img"/>
                        <div class="promo-text">Sign up, publish and share recipes</div>
                      </div>
                    </Block>
                  </Block>
                {:else}
                  <Block class="empty-message">
                    <div class="empty-content">
                      <img src="../images/network_problems.png" alt class="empty-img"/>
                      <p class="no-recipes-message">Unable to load data. Check your connection and try again.</p>
                    </div>
                  </Block>
              {/if}
          {/if}
      </Tab>
      <Tab id="tab-2" class="page-content">
        {#if items.length > 0}
        <Navbar title="Search">
          <Subnavbar inner={true} class="subnav">
            <div class="searchbar-container">
              <Searchbar searchContainer=".search-list" searchIn=".item-title" />
            </div>
          </Subnavbar>
        </Navbar>
        <Block class="correction-tab2">
          <List strongIos outlineIos dividersIos class="searchbar-not-found">
            <ListItem title="Nothing found" />
          </List>
          <List strongIos outlineIos dividersIos class="list-content search-list searchbar-found">
            {#each items as item, index (index)}
              <ListItem>
                <Feed item={item} user={user} cate={categoryValue}/>
              </ListItem>
            {/each}
          </List>
        </Block>
        {:else}
          <Block class="centered-error-block">
            <div class="centered-error-content">
              <img src="../images/worried_chef.png" alt class="centered-error-image" />
              <p class="centered-error-title">Unable to load your recipe feed due to a connection problem.</p>
            </div>
          </Block>
        {/if}
      </Tab>
      <Tab id="tab-3" class="page-content">
          {#if isLogin}
            <div class="profile-box">
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
              <div class="profile-header">
                <img src="../images/images/hat.png" alt class="chef-hat" />
                <div class="profile-avatar-wrapper">
                  <img src={$user.profilePicture} alt class="profile-avatar"/>
                </div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <img src="../images/images/exit_button.png" alt class="profile-close-img" on:click={closeProfile} tabindex="0" style="cursor:pointer;"/>
              </div>
              <div class="profile-info">
                <span class="profile-username">{$user.username}</span>
                <div class="profile-stats">
                  <span>{$user.views}</span>
                  <i class="f7-icons">eye</i>
                  <span>{$user.likes}</span>
                  <i class="f7-icons">hand_thumbsup</i>
                </div>
              </div>
              <div class="profile-actions">
                <button class="profile-btn" on:click={toRecipe}>Crea</button>
                <button class="profile-btn" on:click={toSaved}>Salvati</button>
              </div>
              <hr class="profile-divider" />
                <div class="profile-recipes-grid">
                  {#if $user.recipes && $user.recipes.length > 0}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                    {#each $user.recipes as recipe, i (recipe._id || i)}
                      <!-- svelte-ignore a11y-no-static-element-interactions -->
                      <div class="recipe-card" on:click={() => openRecipeModal(recipe)} tabindex="0" aria-label={"Apri ricetta " + recipe.title}>
                        <div class="recipe-image-wrapper">
                          <img src={"http://localhost:5000" + recipe.cover ||recipe.cover || recipe.image || '../images/placeholders/default_image.png'} alt class="recipe-card-image"/>
                        </div>
                        <div class="recipe-title">{recipe.title}</div>
                      </div>
                    {/each}
                  {:else}
                    <div class="profile-empty-message">Non hai ancora condiviso nessuna ricetta</div>
                  {/if}
                </div>
              </div>
            {:else}
          <div class="login-container">
            <div class="container-box">
              <img class="chef-img" src="../images/images/login_suggestion.png" alt/>
              <div class="login-title">Jump in! Your kitchen awaits!</div>
              <button class="google-sign-in-button" on:click={loginWithGoogle}>
                <img class="google-icon" src="../images/google_icon.png" alt/>
                <span class="container-login-text">Accedi con Google</span>
              </button>
            </div>
          </div>
        {/if}
      </Tab>
    </Tabs>
</Page>
<script>
import {Page, Block, f7, Tabs, Tab, Toolbar, Link, NavTitle, List, ListItem, Icon, Card, Navbar, Searchbar, Subnavbar, Popup, Button} from 'framework7-svelte';
import '../css/mainView.css';
import Feed from '../pages/feed.svelte';
import { category } from '../js/store.js';
import { auth, provider } from '../js/firebaseConfig.js';
import { signInWithPopup } from "firebase/auth";
import { user } from '../js/store.js';
import { onMount } from 'svelte';

const API_URL = "http://localhost:5000";
$: categoryValue = $category;

// Profile page
function closeProfile() {
  alert("Chiudi profilo (dummy function)");
}

function toSaved() {
  alert("Vai ai salvati (dummy function)");
}

function toRecipe(){
  f7.views.main.router.navigate('/recipe-add/');
}

// Login/Register start
let isLogin = false ; // default false

// Login/Register end

let items = [];
let loading = true;

onMount(async () => {
  try {
    loading = true;
    const response = await fetch(`${API_URL}/api/recipes`);
    const data = await response.json();
    items = data;
    /* console.log("RICETTE CARICATE:", items); */
  } catch (error) {
    console.error("Errore nel caricamento delle ricette:", error);
  } finally {
    loading = false;
  }
});

let today_selection = null;
let lastUpdateDate = null;
let randomValue = null;

$: {
  const today = new Date().toDateString();
  if (items.length > 0 && lastUpdateDate !== today) {
    randomValue = Math.floor(Math.random() * items.length);
    lastUpdateDate = today;
    today_selection = items[randomValue];
    if (today_selection.cover && !today_selection.cover.startsWith('http')) {
      today_selection.cover = "http://localhost:5000" + today_selection.cover;
    }
  } else if (items.length > 0 && today_selection === null) {
    randomValue = Math.floor(Math.random() * items.length);
    today_selection = items[randomValue];
    if (today_selection.cover && !today_selection.cover.startsWith('http')) {
      today_selection.cover = "http://localhost:5000" + today_selection.cover;
    }
  }
}

$: trending = [...items].sort((a, b) => b.views - a.views).slice(0, 10);

// Recipe Popup
let selectedRecipe = null;
let showPopup = false;

function openRecipeModal(item) {
  selectedRecipe = {
    ...item,
    ingredients: item.ingredients || item.ingredients || [],
    cover: item.cover ? (item.cover.startsWith('http') ? item.cover : "http://localhost:5000" + item.cover): item.image || '../images/placeholders/default_image.png',
    author: (typeof item.author === 'object' && item.author) ? (item.author.username || item.author.name || '') : item.author || '',
    serving: item.serving ?? item.servings ?? '',
    minutes: item.minutes ?? item.time ?? 0,
    views: item.views ?? 0,
    likes: item.likes ?? 0,
    category: item.category || 'Default Category',
    description: item.description || '',
    title: item.title || '',
  };
  showPopup = true;
  /* console.log(selectedRecipe.author); */
}


function closeRecipeModal() {
  showPopup = false;
  selectedRecipe = null;
}

function greetUserByTime() {
  const now = new Date();
  const currentHour = now.getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "☀️ Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "👋 Good afternoon";
  } else if (currentHour >= 18 && currentHour < 22) {
    return "🌆 Good evening";
  } else {
    return "😴 Good night";
  }
}

// Pull to refresh
  function loadMore(done) {
    setTimeout(() => {
        loading = true;
        setTimeout(() => {
          loading = false;
        }, 3000);
      done();
    }, 1000);
  } 

// Reloading effects
  let loading_structure = false;
  let effect = "fade";

// Login with Google Firebase
async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;
    const userData = {
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      profilePicture: firebaseUser.photoURL,
      username: firebaseUser.email.split('@')[0],
      bio: "",
      recipes: []
    };
    const idToken = await firebaseUser.getIdToken();
    const response = await fetch(`${API_URL}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken, ...userData })
    });
    const dbUser = await response.json();
    //console.log("Backend response:", dbUser);
    user.set({
      _id: dbUser._id,
      username: dbUser.username,
      name: dbUser.name,
      profilePicture: dbUser.profilePicture,
      bio: dbUser.bio,
      recipes: dbUser.recipes || []
    });
    isLogin = true;
  } catch (error) {
    console.error("Internal application error:", error);
  }
}


</script>