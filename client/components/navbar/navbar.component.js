'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    title: 'About',
    link: '/about'
  }, {
    title: 'Home',
    link: '/'
  }, {
    title: 'Recipes',
    link: '/recipes'
  }, {
    title: 'Users',
    link: '/users'
  }];

  isCollapsed = true;

  constructor($location) {
    'ngInject';

    this.$location = $location;
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
