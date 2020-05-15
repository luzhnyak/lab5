import Element from './Element';

export default class Modal extends Element {
  constructor(recipe) {
    super();

    this.recipe = recipe;
    this.createRecipeModal(recipe);
  }

  createRecipeModal = () => {
    this.element = this.createElement('div', { classNames: ['modal', 'show', 'modal-open'] });
    const modalDialog = this.createElement('div', { classNames: ['modal-dialog', 'scrollable'] });
    const modalContent = this.createElement('div', { classNames: ['modal-content'] });
    const header = this.createModalHeader();
    const body = this.createModalBody();

    this.element.addEventListener('click', (event) => {
      if(event.target === this.element) {
        this.element.remove();
      }
    });
    modalContent.append(header, body);
    modalDialog.appendChild(modalContent);
    this.element.appendChild(modalDialog);
  };

  createModalHeader = () => {
    const { title } = this.recipe;
    const recipeTitle = this.createElement('h4', { classNames: ['modal-title'] });
    const closeButton = this.createElement('button', { classNames: ['close'] });

    recipeTitle.innerText = title;
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => this.element.remove());
    return this.wrapTo('modal-header', recipeTitle, closeButton);
  }

  createModalBody = () => {
    const { imageUrl, ingredients, description } = this.recipe;
    const recipeImage = this.createRecipeImage(imageUrl);
    const ingredientsHeader = this.createHeader('Ingredients');
    const recipeIngredients = this.createIngredientsList(ingredients);
    const descriptionHeader = this.createHeader('Description');
    const recipeDescription = this.createElement('p', { classNames: ['card-text'] });

    recipeDescription.innerHTML= description;
    return this.wrapTo(
      'modal-body',
      recipeImage,
      ingredientsHeader,
      recipeIngredients,
      descriptionHeader,
      recipeDescription
    );
  };

  createHeader = (text) => {
    const header = this.createElement('h5');
    header.innerText = text;

    return header;
  }

  createIngredientsList = (ingredients) => {
    const ingredientsList = this.createElement('ul', { classNames: ['list-group'] });
    const ingredientsListItems = ingredients
      .split(',')
      .map(ingredient => {
        const item = this.createElement('li', { classNames: ['list-group-item'] });
        item.innerText = ingredient;
        return item;
      });
    ingredientsList.append(...ingredientsListItems);
    return ingredientsList;
  }

  createRecipeImage = (imageUrl) => {
    const image = this.createElement('img', {
      classNames: ['img-responsive', 'm-auto'],
      attributes: {
        src: imageUrl,
        alt: 'Recipe Image'
      }
    });

    return image;
  };
}
