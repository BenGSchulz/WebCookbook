'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/recipes/:id', {
    template: '<recipe-detail></recipe-detail>'
  });
}
