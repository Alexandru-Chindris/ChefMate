<Page class="cus-bg">
  <div class="image-upload">
    <img src={imageUrl || '../images/placeholders/default_image.png'} alt  class="preview" />
    <button type="button" class="add-image-btn" on:click={handleImageClick} aria-label="Aggiungi foto">
    <i class="material-icons">add_a_photo</i>
    </button>
    <input
      id="imageInput"
      type="file"
      accept="image/*"
      on:change={handleFileChange}
      style="display: none;"
      bind:this={fileInput}
    />
  </div>
  <Navbar title="Aggiungi Ricetta" backLink class="archivo-black-regular cus-navbar" />
  <Block class="cus-container">
    <List strongIos outlineIos dividersIos>
      <Block class="space-between">
        <div>Nome della ricetta</div>
        <ListInput
          label="Nome"
          floatingLabel
          type="text"
          placeholder="Nome della tua ricetta"
          clearButton
          bind:value={recipeName}
        />
      </Block>
      <Block>
        <div>Descrizione della ricetta</div>
        <TextEditor
          class="input-description"
          dividers
          resizable
          placeholder="Inserisci testo..."
          mode="popover"
          buttons={['bold', 'italic', 'underline', 'strikeThrough']}
          style="--f7-text-editor-height: 150px"
          bind:value={recipeDescription}
        />
      </Block>
      <Block>
        <div>Categoria della ricetta</div>
        <div class="list list-strong-ios list-outline-ios">
          <li>
            <div class="item-content item-input">
              <div class="item-inner">
                <div class="item-input-wrap">
                  <input
                    type="text"
                    placeholder="Categoria"
                    readonly="readonly"
                    id="demo-picker-category"
                    class="recipe-add-page__category"
                  />
                </div>
              </div>
            </div>
          </li>
        </div>
      </Block>
      <Block>
        <ListItem header="Tempo di preparazione" title={TimeComputed}>
          <span slot="after">
            <Stepper
              min={15}
              max={600}
              step={15}
              value={startingValue}
              buttonsOnly={true}
              small
              raised
              onStepperChange={setTime}
              class="recipe-add-page__stepper-button"
            />
          </span>
        </ListItem>
      </Block>
      <Block>
      <p>Ingredienti</p>
      <Button 
        outline 
        onClick={addIngredientInput}
        disabled={$ingredients.length === ingredientInputs.filter(i => i.selectedIngredient).length}
      >
        Aggiungi ingrediente
      </Button>
      </Block>
      <List form>
        {#each ingredientInputs as input (input.id)}
          <ListItem>
            <img src={input.cover ? input.cover : "https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg"} alt class="ingredient-image"/>
            <div>
              {#if !input.selectedIngredient}
              <AutoComplete 
                items={$ingredients
                  .map(i => i.name)
                  .filter(name => !ingredientInputs.some(inp => inp.selectedIngredient === name))
                }
                bind:selectedItem={input.selectedIngredient}
                on:selectedItemChange={(name) => updateIngredientName(input.id, name)}
                placeholder="Aggiungi ingrediente..."
              />
              {:else}
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span>{input.selectedIngredient}</span>
                  <span style="min-width: 32px; text-align: center;">
                    {input.quantity} g
                  </span>
                  <Stepper
                    buttonsOnly={true}
                    small
                    raised
                    min={1}
                    max={600}
                    step={1}
                    value={input.quantity}
                    on:stepperChange={(e) => updateIngredientQuantity(input.id, e)}
                  />
                </div>
              {/if}
            </div>
            <Button fill color="red" onClick={() => removeIngredientInput(input.id)}>
              <Icon f7="trash"></Icon>
            </Button>
          </ListItem>
        {/each}

      </List>
      <datalist id="ingredientList">
        {#each $ingredients as ingredient}
          <option value={ingredient.name} />
        {/each}
      </datalist>
    </List>
    <div>
    <Button
      fill
      color={canSave ? 'blue' : 'gray'}
      disabled={!canSave}
      onClick={saveRecipe}
      large
    >
      Salva ricetta
    </Button>
  </div>
  </Block>
</Page>

<script>
  import { f7, Block, Page, List, ListItem, Stepper, TextEditor, ListInput, Button, Icon, Navbar } from 'framework7-svelte';
  import { onMount, onDestroy } from 'svelte';
  import { category, ingredients } from '../js/store.js';
  import '../css/recipe-add.css';
  import AutoComplete from "simple-svelte-autocomplete";

  let recipeName = '';
  let recipeDescription = '';
  let recipeCategory = '';
  let pickerCategory;
  let pickerModal;

$: canSave = recipeName.trim().length > 0
  && recipeCategory.trim().length > 0
  && ingredientInputs.filter(i => i.selectedIngredient).length >= 2;

  // Debug
  //$: console.log('canSave:', canSave, recipeName, ingredientInputs);
  //$: console.log('recipeCategory:', recipeCategory);

  onMount(() => {
    let categoryNames = [];
    category.subscribe(currentCategories => {
      categoryNames = currentCategories.map(item => item.name);

      if (pickerCategory) pickerCategory.destroy();
      pickerCategory = f7.picker.create({
        inputEl: '#demo-picker-category',
        cols: [
          {
            textAlign: 'center',
            values: categoryNames,
            onChange: (picker, value) => {
              recipeCategory = value[0];
            }
          }
        ]
      });
    });
  });

  onDestroy(() => {
    if (pickerCategory) pickerCategory.destroy();
    pickerModal.forEach(picker => picker.destroy());
  });

  let startingValue = 15;

  $: TimeComputed = (() => {
    const value = startingValue;

    const hours = Math.floor(value / 60);
    const minutes = value - hours * 60;
    const formatted = [];
    if (hours > 0) {
      formatted.push(`${hours} ${hours > 1 ? 'ore' : 'ora'}`);
    }
    if (minutes > 0) {
      formatted.push(`${minutes} minuti`);
    }
    return formatted.join(' ');
  })();

  function setTime(value) {
    startingValue = value;
  }

  let ingredientInputs = [];

  function addIngredientInput() {
    ingredientInputs = [
      ...ingredientInputs,
      {
        id: Date.now().toString(),
        selectedIngredient: null,
        quantity: 1, 
      }
    ];
  }

  function updateIngredientName(id, name) {
    ingredientInputs = ingredientInputs.map(input =>
      input.id === id
        ? { ...input, selectedIngredient: name, quantity: 1 }
        : input
    );
  }

  function updateIngredientQuantity(id, event) {
    const value = Array.isArray(event.detail) ? event.detail[0] : event.detail;
    //console.log('ID:', id, 'Valore stepper:', value);
    ingredientInputs = ingredientInputs.map(input =>
      input.id === id
        ? { ...input, quantity: Number(value) }
        : input
    );
  }

  function removeIngredientInput(id) {
    ingredientInputs = ingredientInputs.filter(input => input.id !== id);
  }

async function saveRecipe() {
  const recipe = {
    title: recipeName,
    description: recipeDescription,
    category: recipeCategory,
    time: startingValue,
    ingredients: ingredientInputs.map(i => ({
      name: i.selectedIngredient,
      quantity: i.quantity,
      unit: 'g'
    })),
    //author: userId // user id
  };

  const response = await fetch('http://localhost:5000/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe)
  });

  if (response.ok) {
    console.log("Request send");
  }
}

// Image Upload
let imageUrl = '';
let fileInput = null;

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    imageUrl = URL.createObjectURL(file);
  }
}

function handleImageClick() {
  if (fileInput) {
    fileInput.click();
  }
}
</script>
