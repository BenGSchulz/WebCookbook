'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/users/:id', {
    template: '<user-detail></user-detail>'
  });
}
