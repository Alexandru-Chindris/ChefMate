<script>
    export let item;
    export let user;
    export let cate;
    import { Icon } from 'framework7-svelte';
    import { fly } from 'svelte/transition';
    import { sineOut } from 'svelte/easing';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
  
    $: categoryIcon = (cate && item && item.category) ? (cate.find(c => c.name === item.category)?.icon || '') : '';
  
    let liked = false;
    let particles = [];
  
    // Heart Animation
    let heartShake = tweened(0, {
      duration: 200,
      easing: cubicOut,
    });
  
    function toggleLike() {
      liked = !liked;
  
      // Trigger heart shake
      heartShake.set(liked ? -5 : 5).then(() => {
        heartShake.set(0);
      });
  
      if (liked) {
        const particleCount = 10;
        for (let i = 0; i < particleCount; i++) {
          particles = [...particles, createParticle()];
        }
      } else {
        setTimeout(() => {
          particles = [];
        }, 100);
      }
      
    }
  
    function createParticle() {
      const angle = Math.random() * Math.PI * 2;
      const speed = 20 + Math.random() * 30;
      const size = 5 + Math.random() * 8;
      const x = 0;
      const y = 0;
      const hue = Math.random() * 20;
    const color = `hsl(${hue}, 80%, 60%)`;
      return {
        x,
        y,
        angle,
        speed,
        size,
        color,
        life: 500,
      };
    }
  </script>
  
  <div class="feed-container">
    <div class="image-container">
      <img src={item.cover} alt={item.title} />
    </div>
    <div class="text-content">
      <div class="category-container">
        {categoryIcon}{item.category}
      </div>
      <h2 class="item-title">{item.title}</h2>
      <p class="description">
        {item.description ? item.description.substring(0, 100) : 'No description available.'}
      </p>
      <div class="feed-footer">
        <div class="source">
          <img src={item.author && typeof item.author === 'object' && item.author.profilePicture ? item.author.profilePicture : '/images/default-profile.png'} alt class="source-logo" />
          <span>{item.author && typeof item.author === 'object' ? (item.author.username || item.author.name || 'Autore sconosciuto') : (item.author || 'Autore sconosciuto')}</span>
        </div>
        <div>
          <a href class="bookmark">
            <Icon f7="bookmark" />
          </a>
          <a href class="heart" class:liked on:click={toggleLike} style="transform: translateX({$heartShake}px);">
            {#if liked}
                <Icon f7='heart_fill' />
            {:else}
                <Icon f7='heart'/>
            {/if}

            {#each particles as particle (particle)}
              <div class="particle"
                style="
                  width: {particle.size}px;
                  height: {particle.size}px;
                  background-color: {particle.color};
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                "
                transition:fly={{
                  x: Math.cos(particle.angle) * particle.speed,
                  y: Math.sin(particle.angle) * particle.speed * -1,
                  duration: particle.life,
                  easing: sineOut,
                }}
              />
            {/each}
          </a>
        </div>
      </div>
    </div>
  </div>
  
<style>
.feed-container {
    background-color: #f2f2f7;
    border-radius: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-family: sans-serif;
    position: relative;
}
  
.image-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
}
  
.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
  
.text-content {
    padding: 15px;
}

.text-content h2 {
    font-size: 1.2em;
    margin-bottom: 8px;
    color: #222;
}
  
.text-content .description {
    font-size: 0.9em;
    color: #555;
    line-height: 1.4;
}
 
.feed-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    border-top: 1px solid #ddd;
    margin-top: 10px;
}
  
.source {
    display: flex;
    align-items: center;
    font-size: 0.85em;
    color: #333;
}
  
.source-logo {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 5px;
    object-fit: cover;
}
  
.heart {
    display: inline-block;
    font-size: 1.2em;
    margin-left: 15px;
    position: relative; /* For particle positioning */
    cursor: pointer;
}
  
.heart:hover {
    color: red;
}
  
.heart.liked {
    color: red;
}
  
.bookmark {
    color: #333;
    font-size: 1.2em;
    margin-left: 15px;
}
  
a{
    color: #333;
}

.bookmark:hover {
    color: blue;
}
  
.category-container {
    padding-top: 0.5vh;
    font-size: 2vh;
    padding-left: 1.5vh;
    padding-right: 1.5vh;
    width: fit-content;
    height: 3.4vh;
    background-color: rgba(128, 128, 128, 0.466);
    border-radius: 30px;
}
  
.particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
}

.bookmark {
  color: #333;
  font-size: 1.2em;
  margin-left: 15px;
  position: relative; /* Per il posizionamento delle particelle */
  cursor: pointer;
}

.bookmark:hover {
  color: blue;
}
</style>