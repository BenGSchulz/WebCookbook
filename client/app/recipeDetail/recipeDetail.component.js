import angular from 'angular';

const ngRoute = require('angular-route');
import routing from './recipeDetail.routes';
import recipeService from '../../components/recipeService/recipe.module';
import reviewService from '../../components/reviewService/review.module';
import updateRecipeModal from '../../components/updateRecipeModal/updateRecipeModal.controller';
import updateReviewModal from '../../components/updateReviewModal/updateReviewModal.controller';

export class RecipeDetailController {
  /*@ngInject*/
  constructor(Recipe, Review, $http, $routeParams, $uibModal) {
    this.Recipe = Recipe;
    this.Review = Review;
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.$uibModal = $uibModal;
    this.getRecipeData();
  }

  setData() {
    this.reviewInCreation = {
      rating: 0,
      description: '',
      reviewer: '',
      onRecipe: this.recipe._id,
      helpfulCount: 0,
      unhelpfulCount: 0
    };
  }

  getRecipeData() {
    this.Recipe.getRecipeById(this.$routeParams.id)
      .then(response => {
        this.recipe = response;
        this.setData();
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateRecipe(recipe) {
    this.$uibModal.open({
      template: require('../../components/updateRecipeModal/updateRecipeModal.html'),
      controller: 'updateRecipeController as updateRecipeController',
      resolve: {
        recipe: () => recipe
      }
    });
  }

  removeRecipe(recipe) {
    let confirmed = confirm('Delete this recipe?');
    if(confirmed) {
      this.Recipe.deleteRecipe(recipe._id)
        .then(response => {
          window.location.replace('/recipes');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  addReview() {
    this.Review.createReview(this.reviewInCreation, this.recipe._id)
      .then(response => {
        console.log(response);
        this.getRecipeData();
        // window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  }

  editReview(reviewId) {
    this.Review.getReviewById(reviewId)
      .then(response => {
        this.$uibModal.open({
          template: require('../../components/updateReviewModal/updateReviewModal.html'),
          controller: 'updateReviewController as updateReviewController',
          resolve: {
            review: () => response,
            recipeCtrl: () => this
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  removeReview(reviewId) {
    let confirmed = confirm('Delete this review?');
    if(confirmed) {
      this.Review.deleteReview(reviewId)
        .then(response => {
          // window.location.reload();
          this.getRecipeData();
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  $onInit() {
  }
}

export default angular.module('comp3705App.recipeDetail', [ngRoute, recipeService, reviewService, updateRecipeModal, updateReviewModal])
  .config(routing)
  .component('recipeDetail', {
    template: require('./recipeDetail.html'),
    controller: RecipeDetailController,
    controllerAs: 'recipeDetailController'
  })
  .name;

