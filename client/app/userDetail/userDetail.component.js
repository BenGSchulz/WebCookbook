import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './userDetail.routes';
import userService from '../../components/userService/user.module';
import updateUserModal from '../../components/updateUserModal/updateUserModal.controller';

export class UserDetailController {
  /*@ngInject*/
  constructor($routeParams, $uibModal, User) {
    this.User = User;
    this.$routeParams = $routeParams;
    this.$uibModal = $uibModal;
    this.getUserData();
  }

  getUserData() {
    this.User.getUserById(this.$routeParams.id)
      .then(response => {
        this.user = response;
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateUser(user) {
    this.$uibModal.open({
      template: require('../../components/updateUserModal/updateUserModal.html'),
      controller: 'updateUserController as updateUserController',
      resolve: {
        user: () => user
      }
    });
  }

  removeUser(user) {
    let confirmed = confirm('Delete this user?');
    if(confirmed) {
      this.User.deleteUser(user._id)
        .then(response => {
          window.location.replace('/users');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  $onInit() {

  }
}

export default angular.module('comp3705App.userDetail', [ngRoute, userService, updateUserModal])
  .config(routing)
  .component('userDetail', {
    template: require('./userDetail.html'),
    controller: UserDetailController,
    controllerAs: 'userDetailController'
  })
  .name;
