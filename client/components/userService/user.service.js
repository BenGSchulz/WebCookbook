'use strict';

export function UserService($resource) {
  'ngInject';
  var User = {
    getAllUsers() {
      return $resource('/api/users/').query().$promise;
    },
    getUserById(userId) {
      return $resource('/api/users/:id').get({id: userId}).$promise;
    },
    updateUser(user) {
      let updateResource = $resource('/api/users/:id', null,
        {
          update: { method: 'PUT' }
        });
      return updateResource.update({ id: user._id }, user).$promise;
    },
    createUser(user) {
      return $resource('/api/users').save(user).$promise;
    },
    deleteUser(userId) {
      return $resource('/api/users/:id').delete({id: userId}).$promise;
    }
  };
  return User;
}
