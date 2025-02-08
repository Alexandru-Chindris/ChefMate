<Page ptr ptrMousewheel={true} onPtrRefresh={loadMore} class="main-page">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap" rel="stylesheet">
  <Popup opened={showPopup} onPopupClosed={closeRecipeModal}>
    <Page>
      <Navbar title={selectedRecipe ? selectedRecipe.title : 'Ricetta'}>
        <Link slot="nav-right" popupClose>Chiudi</Link>
      </Navbar>
      <Block>
        {#if selectedRecipe}
          <img src={selectedRecipe.cover} alt={selectedRecipe.title} style="width: 100%" />
          <p>Visite: {selectedRecipe.views}</p>
          <p>Likes: {selectedRecipe.likes}</p>
        {:else}
          <p>No details</p>
        {/if}
      </Block>
    </Page>
  </Popup>
  <Toolbar tabbar icons position={"bottom"}>
    <Link
      tabLink="#tab-1"
      tabLinkActive
      text="Home"
      iconIos="f7:house"
      iconMd="material:home"
    />
    <Link
     tabLink="#tab-2"
     text="Discover"
     iconIos="f7:search"
     iconMd="material:search" 
     />
    <Link
      tabLink="#tab-3"
      text="Profile"
      iconIos="f7:person"
      iconMd="material:group"
    />
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

let items = [ 
  {
    title: 'Carbonara',
    cover: '../images/images/IMG_0819-843347201.jpg',
    views: 6062,
    likes: 18,
  },
  {
    title: 'Spaghetti di Ludo',
    cover: '../images/images/spaghetti_ludo.jpg',
    views: 4500,
    likes: 25,
  },
  {
    title: 'Billie Jean',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg',
    views: 3200,
    likes: 12,
  },
  {
    title: 'Elemento 4',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg',
    views: 1500,
    likes: 8,
  },
  {
    title: 'Pesto Genovese',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-4.jpg',
    views: 2890,
    likes: 11,
  },
  {
    title: 'Riso alla Cantonese',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-5.jpg',
    views: 2050,
    likes: 16,
  },
  {
    title: 'Pollo al Curry',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-6.jpg',
    views: 3100,
    likes: 19,
  },
  {
    title: 'Pizza Montanara',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-2.jpg',
    views: 4640,
    likes: 24,
  },
  {
    title: 'Tiramisù Classico',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-7.jpg',
    views: 5270,
    likes: 31,
  },
  {
    title: 'Cous Cous di Verdure',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-8.jpg',
    views: 1790,
    likes: 10,
  },
  {
    title: 'Salmone al Limone',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-9.jpg',
    views: 1990,
    likes: 14,
  },
  {
    title: 'Focaccia alle Erbe',
    cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-10.jpg',
    views: 3205,
    likes: 17,
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