<Page>
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
    <div class="cont3">
      <div class="bree-serif-regular final-text">Ready to get inspired?</div>
      <div class="container-btn">
        <Button raised fill class="bree-serif-regular btn1" on:click={()=> mainLink()}>Get started!</Button>
      </div>
      <Button small class="bree-serif-regular btn3 color-lime">Discover more!</Button>
      <div class="grid grid-cols-3 grid_logos">
        <div class="linkedin_btn"></div>
        <div class="instagram_btn"></div>
        <div class="github_btn"></div>
      </div>
    </div>
  </swiper-slide>
</swiper-container>
</Page>
<script>
import { register } from 'swiper/element/bundle';
register();

  import '../css/home.css';
  import {
    Page,
    f7,
    Button
  } from 'framework7-svelte';

  function mainLink(){
    f7.views.main.router.navigate('/mainview/');
  }
</script>