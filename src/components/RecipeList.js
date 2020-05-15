import Element from './Element';
import Recipe from './Recipe';

export default class RecipeList extends Element {
  constructor(recipes) {
    super();

    this.fillCards(recipes);
  }

  fillCards = (recipes) => {
    const cards = recipes.map(recipe => {
      let { element: recipeElement } = new Recipe(recipe);
      recipeElement = this.wrapTo('col-4', recipeElement);
      return recipeElement;
    });
    this.element = this.createElement('div', { classNames: ['row', 'mt-3'] });
    this.element.append(...cards);
  };


}
