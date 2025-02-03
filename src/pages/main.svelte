<Page ptr ptrMousewheel={true} onPtrRefresh={loadMore}>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap" rel="stylesheet">
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
                      footer="Card Footer"
                    />
                    </ListItem>
                </Block>
              {/each}
            </List>
              {:else}
              <Block class="correction">
                <NavTitle title="👋 Good morning, $user." hideOnPageScroll transparent class="navbar bree-serif-regular"></NavTitle>
                <Card
                  title="Card header"
                  content="Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions."
                  footer="Card footer"
                  class="card-correction"
                />
                <List mediaList strongIos dividersIos outlineIos class="single-element">
                  {#each items as item, index (index)}
                  <ListItem title={item.title} subtitle={item.author} />
                  {/each}
                </List>
                <p>Tab 1 content</p>
              </Block>
          {/if}

      </Tab>
      <Tab id="tab-2" class="page-content">
        <Block class="correction">
          <p>Tab 2 content</p>
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
import {Page, Block, f7, Tabs, Tab, Toolbar, Link, Navbar, NavTitle, List, ListItem, BlockFooter, Card, SkeletonBlock} from 'framework7-svelte';
import '../css/mainView.css';

let items = [ 
    {
      title: 'Yellow Submarine',
      author: 'Beatles',
      cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-1.jpg',
    },
    {
      title: "Don't Stop Me Now",
      author: 'Queen',
      cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-2.jpg',
    },
    {
      title: 'Billie Jean',
      author: 'Michael Jackson',
      cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg',
    },
  ];

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