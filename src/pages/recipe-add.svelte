<Page class="recipe-add-page">
  <Block class="recipe-add-page__block">
    <List strongIos outlineIos dividersIos>
      <Block>
        <div class="recipe-add-page__recipe-name">Nome della ricetta</div>
        <ListInput
          label="Nome"
          floatingLabel
          type="text"
          placeholder="Nome della tua ricetta"
          clearButton
        />
      </Block>
      <Block>
        <div class="recipe-add-page__recipe-name">Descrizione della ricetta</div>
        <TextEditor
          placeholder="Inserisci testo..."
          mode="popover"
          buttons={['bold', 'italic', 'underline', 'strikeThrough']}
          style="--f7-text-editor-height: 150px"
        />
      </Block>
      <Block>
        <div class="recipe-add-page__recipe-name">Categoria della ricetta</div>
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
        <Button outline onClick={addIngredientInput}>Aggiungi ingrediente</Button>
      </Block>
      <List form class="ing-list">
        {#each ingredientInputs as input (input.id)}
          <ListItem class="ingredient-item">
            <img src={input.cover ? input.cover : "https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg"} alt class="ingredient-image"/>
            <div class="ingredient-details">
              <!-- Ingridient name -->
              <AutoComplete 
              items={$ingredients.map(i => i.name)} 
              bind:selectedItem={input.selectedIngredient}
              on:selectedItemChange={(name) => updateIngredientName(input.id, name)}
              />
              <!-- Quantity -->
              
            </div>
            <Button fill color="red" onClick={() => removeIngredientInput(input.id)} class="remove-button">
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
  </Block>
</Page>

<script>
  import { f7, Block, Page, List, ListItem, Stepper, TextEditor, ListInput, Button, Icon } from 'framework7-svelte';
  import { onMount, onDestroy } from 'svelte';
  import { category, ingredients } from '../js/store.js';
  import '../css/recipe-add.css';
  import { createEventDispatcher } from 'svelte';
  import AutoComplete from "simple-svelte-autocomplete";

  let pickerCategory;
  let pickerModal;

  onMount(() => {
    let categoryNames = [];

    category.subscribe(currentCategories => {
      categoryNames = currentCategories.map(item => item.name);

      if (pickerCategory) {
        pickerCategory.cols.replaceValues(categoryNames);
      } else {
        pickerCategory = f7.picker.create({
          inputEl: '#demo-picker-category',
          cols: [
            {
              textAlign: 'center',
              values: categoryNames
            }
          ]
        });
      }
    });

    const quantityOptions = Array.from({ length: 100 }, (_, i) => (i + 1) / 10);
    const quantityValues = quantityOptions.map(value => ({ value: value.toFixed(1) + ' kg' }));

    pickerModal = [];
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
  let nextId = 0;

  function addIngredientInput() {
  ingredientInputs = [...ingredientInputs, { 
    id: nextId++, 
    ingredient: '', 
    quantity: '0.1 kg', 
    cover: '', 
    selectedIngredient: null
  }];
  createQuantityPicker(nextId - 1);
}
  function removeIngredientInput(id) {
    ingredientInputs = ingredientInputs.filter(item => item.id !== id);
    pickerModal[id].destroy();
  }

  function updateIngredientName(id, name) {
  ingredientInputs = ingredientInputs.map(item => {
    if (item.id === id) {
      item.ingredient = name;
      item.selectedIngredient = name;
    }
    return item;
  });
}



  function createQuantityPicker(index) {
    const quantityOptions = Array.from({ length: 100 }, (_, i) => (i + 1) / 10); // Da 0.1 a 10 kg con incrementi di 0.1
    const quantityValues = quantityOptions.map(value => ({ value: value.toFixed(1) + ' kg' }));

    pickerModal[index] = f7.picker.create({
      inputEl: `.picker-input-${ingredientInputs[index].id}`,
      value: [quantityValues[0]], // Valore di default
      rotateEffect: true,
      formatValue: function (values) {
        return values[0];
      },
      cols: [
        {
          textAlign: 'center',
          values: quantityValues.map(option => option.value),
        }
      ],
      onPickerChange: (picker, values) => {
        ingredientInputs[index].quantity = values[0];
      }
    });
  }
</script>
