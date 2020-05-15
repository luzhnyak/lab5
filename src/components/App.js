import '../styles/reset.css';
import '../styles/style.css';
import 'bootstrap.native/dist/bootstrap-native-v4';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getRecipes } from "../services";

import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import Loader from './Loader';

export default class App {
  constructor() {
    this.appContainer = document.getElementById('appContainer');
    this.recipesListLink = document.getElementById('recipeListLink');
    this.recipeFormLink = document.getElementById('recipeFormLink');

    this.bindNavigationHandlers();
    this.fetchRecipes();
  }

  fetchRecipes = async () => {
    this.showPage(new Loader());
    const recipes = await getRecipes();
    this.showPage(new RecipeList(recipes));
  }

  bindNavigationHandlers = () => {
    let previousTargetLink = this.recipesListLink;
    this.recipesListLink.addEventListener('click', ({ target }) => {
      previousTargetLink.parentNode.classList.remove('active');
      target.parentNode.classList.add('active');
      previousTargetLink = target;
      this.fetchRecipes();
    });
    this.recipeFormLink.addEventListener('click', ({ target }) => {
      previousTargetLink.parentNode.classList.remove('active');
      target.parentNode.classList.add('active');
      previousTargetLink = target;
      this.showPage(new RecipeForm());
    });
  };

  showPage = ({ element: page }) => {
    while (this.appContainer.firstChild) {
      this.appContainer.removeChild(this.appContainer.firstChild);
    }
    this.appContainer.appendChild(page);
  };
}
