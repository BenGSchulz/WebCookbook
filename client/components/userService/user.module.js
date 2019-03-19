'use strict';

import angular from 'angular';
import {
  UserService
} from './user.service';

export default angular.module('comp3705App.user', [])
  .factory('User', UserService)
  .name;
