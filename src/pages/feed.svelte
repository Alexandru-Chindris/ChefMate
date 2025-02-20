<script>
    export let item;
    export let user;
    export let cate;
    import { Icon } from 'framework7-svelte';
    
    $: categoryIcon = (cate && item && item.category) ? (cate.find(c => c.name === item.category)?.icon || '') : '';
    
</script>

<div class="feed-container">
    <div class="image-container">
     <img src={item.cover} alt={item.title} />
    </div>
    <div class="text-content">
     <div class="category-container">
        {categoryIcon}{item.category}
     </div>
     <h2>{item.title}</h2>
     <p class="description">
      {item.description ? item.description.substring(0, 100) : 'No description available.'}
     </p>
     <div class="feed-footer">
      <div class="source">
       <img  src={user.profilePicture} alt class="source-logo"/>
       <span>{item.author}</span>
      </div>
      <div class="actions">
        <a href>
            <Icon f7="bookmark" />
        </a>
        <a href>
            <Icon f7="heart" />
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
  
.actions a {
    color: #333;
    font-size: 1.2em;
    margin-left: 15px;
}
  
.actions a:hover {
    color: red;
}

.category-container{
    padding-top: 0.5vh;
    font-size: 2vh;
    padding-left: 1.5vh;
    padding-right: 1.5vh;
    width: fit-content;
    height: 3.4vh;
    background-color: rgba(128, 128, 128, 0.466);
    border-radius: 30px;
}
</style>