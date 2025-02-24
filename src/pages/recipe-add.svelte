<Page class="recipe-add-page">
    <Block class="recipe-add-page__block">
      <List strongIos outlineIos dividersIos>
        <Block>
            <div class="recipe-add-page__recipe-name">Recipe name</div>
            <ListInput
              label="Name"
              floatingLabel
              type="text"
              placeholder="Your name"
              clearButton
            />
        </Block>
        <Block>
            <div class="recipe-add-page__recipe-name">Recipe description</div>
            <TextEditor
              placeholder="Enter text..."
              mode="popover"
              buttons={['bold', 'italic', 'underline', 'strikeThrough']}
              style="--f7-text-editor-height: 150px"
            />
        </Block>
        <Block>
            <div class="recipe-add-page__recipe-name">Recipe category</div>
            <div class="list list-strong-ios list-outline-ios">
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-input-wrap">
                      <input
                        type="text"
                        placeholder="Category"
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
            <ListItem header="Time for preparation" title={TimeComputed}>
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
            <Button outline onClick={addIngredientInput}>Aggiungi ingrediente</Button></Block>
          <List form>
            {#each ingredientInputs as input (input.id)}
              <ListItem class="ingredient-item">
                <img src={input.cover ? input.cover : "https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg"} alt class="ingredient-image"/>
                <div class="ingredient-details">
                  <Input
                    type="text"
                    label="Ingrediente"
                    placeholder="Inserisci ingrediente"
                    autocomplete="on"
                    autocorrect="off"
                    spellcheck="false"
                    list="ingredientList"
                    value={input.ingredient}
                    onInput={(e) => updateIngredient(input.id, e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Quantità"
                    readonly
                    placeholder="Seleziona quantità"
                    class="picker-input"
                    value={input.quantity}
                    onFocus={() => {
                      pickerModal.open();
                      pickerModal.once('picker:close', () => {
                        const selectedValue = pickerModal.value[0];
                        updateQuantity(input.id, selectedValue);
                      });
                    }}
                  />
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
    import { f7, Block, Page, List, ListItem, Stepper, TextEditor, ListInput, Button, Input, Icon} from 'framework7-svelte';
    import { onMount, onDestroy } from 'svelte';
    import { category, ingredients } from '../js/store.js';
    import '../css/recipe-add.css';
    import { createEventDispatcher } from 'svelte';
  
/*     $: ingridiets = ingredients; */

    let pickerCategory;
  
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
    });
  
    onDestroy(() => {
      if (pickerCategory) pickerCategory.destroy();
    });

    let startingValue = 15;

    $: TimeComputed = (() => {
        const value = startingValue;

        const hours = Math.floor(value / 60);
        const minutes = value - hours * 60;
        const formatted = [];
        if (hours > 0) {
        formatted.push(`${hours} ${hours > 1 ? 'hours' : 'hour'}`);
        }
        if (minutes > 0) {
        formatted.push(`${minutes} minutes`);
        }
        return formatted.join(' ');
    })();

    function setTime(value) {
        startingValue = value;
    }

    let ingredientInputs = [];
  let nextId = 0;
  let pickerModal;

  const dispatch = createEventDispatcher();

  // Opzioni per il Picker
  const quantityOptions = Array.from({ length: 100 }, (_, i) => (i + 1) / 10); // Da 0.1 a 10 kg con incrementi di 0.1
  const quantityValues = quantityOptions.map(value => ({ value: value.toFixed(1) + ' kg' }));

  onMount(() => {
    // Inizializza il Picker
    pickerModal = f7.picker.create({
      inputEl: '.picker-input',
      value: [quantityValues[0]], // Valore di default
      rotateEffect: true,
      formatValue: function (values) {
        return values[0];
      },
      cols: [
        {
          textAlign: 'center',
          values: quantityValues,
        }
      ]
    });
  });

  function addIngredientInput() {
    ingredientInputs = [...ingredientInputs, { id: nextId++, ingredient: '', quantity: quantityValues[0].value, cover: '' }];
  }

  function removeIngredientInput(id) {
    ingredientInputs = ingredientInputs.filter(item => item.id !== id);
  }

  function updateIngredient(id, value) {
    ingredientInputs = ingredientInputs.map(item =>
      item.id === id ? { ...item, ingredient: value, cover: $ingredients.find(i => i.name === value)?.cover || '' } : item
    );
    dispatch('change', ingredientInputs);
  }

  function updateQuantity(id, value) {
    ingredientInputs = ingredientInputs.map(item =>
      item.id === id ? { ...item, quantity: value } : item
    );
    dispatch('change', ingredientInputs);
  }

  $: console.log(ingredientInputs); // Utile per il debug
</script>
