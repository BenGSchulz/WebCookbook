import angular from 'angular';
const ngRoute = require('angular-route');

export class CreateUserController {
  /*@ngInject*/
  constructor($uibModalInstance, User, usersCtrl) {
    this.User = User;
    this.$uibModalInstance = $uibModalInstance;
    this.submitted = false;
    this.id = 0;
    this.usersCtrl = usersCtrl;
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  submitForm() {
    this.User.createUser(this.user)
      .then(response => {
        this.formInfo = 'Created user:' + response._id;
        this.submitted = true;
        this.id = response._id;
        this.usersCtrl.getUsers();
      })
      .catch(err => {
        console.error(err);
        this.formError = err.data.toString();
      });
  }
}

export default angular.module('comp3705App.createUser', [ngRoute])
  .controller('createUserController', CreateUserController)
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
