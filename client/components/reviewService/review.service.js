'use strict';

export function ReviewService($resource) {
  'ngInject';
  var Review = {
    getAllReviewsOnRecipe(recipeId) {
      return $resource('/api/recipes/:id/reviews').query({id: recipeId}).$promise;
    },
    getReviewById(reviewId) {
      return $resource('/api/reviews/:id').get({id: reviewId}).$promise;
    },
    updateReview(review) {
      let updateResource = $resource('/api/reviews/:id', null,
        {
          update: { method: 'PUT' }
        });
      return updateResource.update({ id: review._id }, review).$promise;
    },
    createReview(review, recipeId) {
      return $resource('/api/recipes/:id/reviews').save({id: recipeId}, review).$promise;
    },
    deleteReview(reviewId) {
      return $resource('/api/reviews/:id').remove({id: reviewId}).$promise;
    }
  };
  return Review;
}
