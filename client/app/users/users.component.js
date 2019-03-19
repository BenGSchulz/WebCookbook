import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './users.routes';
import userService from '../../components/userService/user.module';
import createUserModal from '../../components/createUserModal/createUserModal.controller';
// import user from '../../components/userService/user.module';

export class UsersController {
  /*@ngInject*/
  constructor(User, $http, $routeParams, $uibModal) {
    this.User = User;
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.$uibModal = $uibModal;
    this.setData();
    this.getUsers();
    // this.getUserData();
  }

  setData() {
    this.currentPage = 1;
    this.usersPerPage = 3;
  }

  changePage() {
    this.displayedUsers = this.users.slice((this.currentPage * this.usersPerPage) - this.usersPerPage, (this.currentPage * this.usersPerPage));
  }

  getUsers() {
    this.User.getAllUsers()
      .then(response => {
        this.users = response;
        this.totalUsers = this.users.length;
        // this.displayedUsers = this.users.slice(0, this.usersPerPage);
        this.displayedUsers = this.users.slice((this.currentPage * this.usersPerPage) - this.usersPerPage, (this.currentPage * this.usersPerPage));
      })
      .catch(error => {
        console.error(error);
      });
  }

  createUser() {
    this.$uibModal.open({
      template: require('../../components/createUserModal/createUserModal.html'),
      controller: 'createUserController as createUserController',
      resolve: {
        usersCtrl: () => this
      }
    });
  }

  // getUserData() {
  //   this.User.getUserByID(this.$routeParams.id)
  //     .then(response => {
  //       this.user = response;
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  $onInit() {
  }
}

export default angular.module('comp3705App.users', [ngRoute, userService, createUserModal])
  .config(routing)
  .component('users', {
    template: require('./users.html'),
    controller: UsersController,
    controllerAs: 'usersController'
  })
  .name;

