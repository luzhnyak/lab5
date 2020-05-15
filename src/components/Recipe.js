import Element from './Element';
import Modal from './Modal';

export default class Recipe extends Element {
  constructor(recipe) {
    super();

    this.recipe = recipe;
    this.createRecipeCard(recipe);
  }

  createRecipeCard = () => {
    const { imageUrl } = this.recipe;
    this.element = this.createElement('div', { classNames: ['card', 'shadow'] });
    const image = this.createCardImage(imageUrl);
    const body = this.createCardBody();
    this.element.append(image, body);
  };

  createCardBody = () => {
    const { title, ingredients } = this.recipe;
    const recipeTitle = this.createElement('h5');
    const recipeIngredients = this.createElement('p', { classNames: ['card-text', 'truncate-overflow'] });
    const button = this.createShowMoreButton('Show More');

    recipeTitle.innerText = title;
    recipeIngredients.innerText = ingredients;

    return this.wrapTo('card-body', recipeTitle, recipeIngredients, button);
  };

  createShowMoreButton = (text) => {
    const showMoreButton = this.createElement('button', { classNames: ['btn', 'btn-success'] });

    showMoreButton.innerText = text;
    showMoreButton.addEventListener('click', () => {
      const { element: recipeModal} = new Modal(this.recipe);
      document.getElementById('root').appendChild(recipeModal);
    });
    return showMoreButton;
  };

  createCardImage = (imageUrl) => {
    const image = this.createElement('img', {
      classNames: ['card-img-top'],
      attributes: {
        src: imageUrl,
        alt: 'Recipe Image'
      }
    });

    return image;
  };
}
