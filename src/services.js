import { callApi } from './helpers/webApiHelper';

export const getRecipes = async () => {
  try {
    const response = await callApi('/recipes.json', {
      type: 'GET'
    });

    return Object.keys(response).map(id => ({
      id,
      ...response[id]
    }));
  } catch (error) {
    console.log(error);
  }
}

export const createRecipe = async (recipe) => {
  try {
    const response = await callApi('/recipes.json', {
      type: 'POST',
      body: recipe
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}
