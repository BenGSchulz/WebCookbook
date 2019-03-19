import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';
import userService from '../../components/userService/user.module';
import recipeService from '../../components/recipeService/recipe.module';
import updateUserModal from '../../components/updateUserModal/updateUserModal.controller';
import createUserModal from '../../components/createUserModal/createUserModal.controller';

export class MainController {
  /*@ngInject*/
  constructor($http, $uibModal, User, Recipe) {
    this.$http = $http;
    this.User = User;
    this.Recipe = Recipe;
    this.$uibModal = $uibModal;
    this.featuredRecipe = null;
    this.getFeaturedRecipe();
    // this.getUserData();
  }

  getFeaturedRecipe() {
    this.Recipe.getAllRecipes()
      .then(response => {
        this.featuredRecipe = response[Math.floor(Math.random() * response.length)];
      })
      .catch(error => {
        console.error(error);
      });
  }

  // getUserData() {
  //   this.User.getAllUsers()
  //     .then(response => {
  //       this.users = response;
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  updateUser(user) {
    this.$uibModal.open({
      template: require('../../components/updateUserModal/updateUserModal.html'),
      controller: 'updateUserController as updateUserController',
      resolve: {
        user: () => user
      }
    });
  }

  createUser() {
    this.$uibModal.open({
      template: require('../../components/createUserModal/createUserModal.html'),
      controller: 'createUserController as createUserController'
    });
  }

  $onInit() {
  }
}

export default angular.module('comp3705App.main', [ngRoute, userService, recipeService, updateUserModal, createUserModal])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainController'
  })
  .name;
