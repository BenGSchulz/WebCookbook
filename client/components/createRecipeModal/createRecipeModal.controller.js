import angular from 'angular';

const ngRoute = require('angular-route');

export class CreateRecipeController {
  /*@ngInject*/
  constructor($uibModalInstance, Recipe, recipeCtrl) {
    this.Recipe = Recipe;
    this.$uibModalInstance = $uibModalInstance;
    this.setData();
    this.recipeCtrl = recipeCtrl;
  }

  setData() {
    this.recipe = {
      name: '',
      date: Date.now,
      description: '',
      pictureURL: '',
      prepTime: 0,
      cookTime: 0,
      directions: [],
      ingredients: [{ingredient: '', amount: ''}],
      tags: []
    };
    this.localDirections = [{index: 1, direction: ''}];
    this.directionIndex = 2;
    this.submitted = false;
    this.id = 0;
    this.formInfo = 'Please Fill All Fields';
  }

  addDirection() {
    this.localDirections.push({index: this.directionIndex, direction: ''});
    // this.recipe.directions.push(this.directionIndex.toString().concat('. '));
    this.directionIndex++;
  }

  removeDirection(index) {
    this.localDirections.splice(index, 1);
    for(let i = index; i < this.localDirections.length; i++) {
      this.localDirections[i].index--;
    }
    this.directionIndex--;
  }

  addIngredient() {
    this.recipe.ingredients.push({ingredient: '', amount: ''});
  }

  removeIngredient(index) {
    this.recipe.ingredients.splice(index, 1);
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  submitForm() {
    for(let localDirection of this.localDirections) {
      this.recipe.directions.push(localDirection.index.toString().concat('. ', localDirection.direction));
    }
    this.Recipe.createRecipe(this.recipe)
      .then(response => {
        this.formInfo = 'Created recipe:' + response._id;
        // document.getElementById('modalInfo').focus({preventScroll: false});
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.submitted = true;
        this.id = response._id;
        this.recipeCtrl.getRecipes();
      })
      .catch(err => {
        console.error(err);
        // this.formError = err.data.toString();
        this.formError = 'Please Fill Out All Fields';

        document.body.scrollTop = document.documentElement.scrollTop = 0;
        // document.getElementById('modalError').focus({preventScroll: false});
      });
  }
}

export default angular.module('comp3705App.createRecipe', [ngRoute])
  .controller('createRecipeController', CreateRecipeController)
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
