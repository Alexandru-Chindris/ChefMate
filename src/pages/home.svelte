<Page name="home">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap" rel="stylesheet">
  <swiper-container pagination={true} class="demo-swiper-multiple" space-between={0}>
  <swiper-slide>
    <div class="cont1">
      <div class="hamburger"></div>
      <div class="arrow"></div>
      <div class="welcome-text bree-serif-regular">Inspiring tastes, one recipe at a time</div>
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="cont2">
      <div class="chicken"></div>
      <div class="bree-serif-regular introduction-text">
        Share recipes, discover new dishes, 
        and join a community passionate about cooking.
      </div>
      <div class="arrow2"></div>
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide-content">Slide 3</div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide-content">Slide 4</div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide-content">Slide 5</div>
  </swiper-slide>
</swiper-container>
</Page>
<script>
  // import function to register Swiper custom elements
  
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
  import '../css/home.css';
  import {
    Page,
    Navbar,
    NavTitle,
    NavTitleLarge,
    Link,
    Toolbar,
    Block,
    BlockTitle
  } from 'framework7-svelte';
</script>