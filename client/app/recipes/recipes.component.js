import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './recipes.routes';
import recipeService from '../../components/recipeService/recipe.module';
import createRecipeModal from '../../components/createRecipeModal/createRecipeModal.controller';
// import recipe from '../../components/recipeService/recipe.module';

export class RecipesController {
  /*@ngInject*/
  constructor(Recipe, $http, $routeParams, $uibModal) {
    this.Recipe = Recipe;
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.$uibModal = $uibModal;
    this.getRecipes();

    // this.getRecipeData();
  }

  setData() {
    this.currentPage = 1;
    this.recipesPerPage = 3;
    this.totalRecipes = this.recipes.length;
    this.displayedRecipes = this.recipes.slice(0, this.recipesPerPage);
  }

  changePage() {
    this.displayedRecipes = this.recipes.slice((this.currentPage * this.recipesPerPage) - this.recipesPerPage, (this.currentPage * this.recipesPerPage));
  }

  getRecipes() {
    this.Recipe.getAllRecipes()
      .then(response => {
        this.recipes = response;
        this.setData();
      })
      .catch(error => {
        console.error(error);
      });
  }

  createRecipe() {
    this.$uibModal.open({
      template: require('../../components/createRecipeModal/createRecipeModal.html'),
      controller: 'createRecipeController as createRecipeController',
      resolve: {
        recipeCtrl: () => this
      }
    });
  }

  // getRecipeData() {
  //   this.Recipe.getRecipeByID(this.$routeParams.id)
  //     .then(response => {
  //       this.recipe = response;
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  $onInit() {
  }
}

export default angular.module('comp3705App.recipes', [ngRoute, recipeService, createRecipeModal])
  .config(routing)
  .component('recipes', {
    template: require('./recipes.html'),
    controller: RecipesController,
    controllerAs: 'recipesController'
  })
  .name;

