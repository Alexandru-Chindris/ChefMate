<Page>
  <Block strong inset>
    <p>Sorry</p>
    <p>Requested content not found.</p>
    <Button raised fill class="bree-serif-regular btn1" on:click={()=> createRecipe()} >Login</Button>
  </Block>
</Page>
<script>
  import {Page, Block, Button } from 'framework7-svelte';

async function createRecipe() {
  const response = await fetch('http://localhost:5000/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: "Spaghetti Carbonara",
      ingredients: ["spaghetti", "uova", "guanciale", "pecorino", "pepe"],
      instructions: "Cuoci la pasta, prepara la crema di uova e pecorino, unisci tutto con il guanciale.",
    }),
  });

  const data = await response.json();
  console.log(data);
}


async function updateRecipe() {
  const response = await fetch('http://localhost:5000/update', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      search: "Spaghetti Carbonara",
      newTitle: "Spaghetti alla Carbonara",
    }),
  });

  const data = await response.json();
  console.log(data);
}

async function deleteRecipe() {
  const response = await fetch('http://localhost:5000/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      search: "Spaghetti alla Carbonara",
    }),
  });

  const data = await response.json();
  console.log(data);
}

</script>