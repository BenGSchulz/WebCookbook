import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './about.routes';

export class AboutController {
  /*@ngInject*/
  constructor(appConfig) {
    this.about = appConfig.about;
  }

  $onInit() {
  }
}

export default angular.module('comp3705App.about', [ngRoute])
  .config(routing)
  .component('about', {
    template: require('./about.html'),
    controller: AboutController,
    controllerAs: 'aboutController'
  })
  .name;

