'use strict';

export function RecipeService($resource) {
  'ngInject';
  var Recipe = {
    getAllRecipes() {
      return $resource('/api/recipes/').query().$promise;
    },
    getRecipeById(recipeId) {
      return $resource('/api/recipes/:id').get({id: recipeId}).$promise;
    },
    getRandomRecipe() {
      return $resource('/api/recipes/random').get().$promise;
    },
    updateRecipe(recipe) {
      let updateResource = $resource('/api/recipes/:id', null,
        {
          update: { method: 'PUT' }
        });
      return updateResource.update({ id: recipe._id }, recipe).$promise;
    },
    createRecipe(recipe) {
      return $resource('/api/recipes').save(recipe).$promise;
    },
    deleteRecipe(recipeId) {
      return $resource('/api/recipes/:id').delete({id: recipeId}).$promise;
    }
  };
  return Recipe;
}
