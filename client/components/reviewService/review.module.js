'use strict';

import angular from 'angular';
import {
  ReviewService
} from './review.service';

export default angular.module('comp3705App.review', [])
  .factory('Review', ReviewService)
  .name;
