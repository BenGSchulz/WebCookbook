'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

const ngRoute = require('angular-route');

import uiBootstrap from 'angular-ui-bootstrap';

import {
  routeConfig
} from './app.config';


import constants from './app.constants';
import util from '../components/util/util.module';
import navbar from '../components/navbar/navbar.component';
import main from './main/main.component';
import about from './about/about.component';
import recipes from './recipes/recipes.component';
import recipeDetail from './recipeDetail/recipeDetail.component';
import users from './users/users.component';
import userDetail from './userDetail/userDetail.component';


import './app.scss';

angular.module('comp3705App', [ngCookies, ngResource, ngSanitize, ngRoute, uiBootstrap,
  constants, util, navbar, main, about, recipes, recipeDetail, users, userDetail])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['comp3705App'], {
      strictDi: true
    });
  });
