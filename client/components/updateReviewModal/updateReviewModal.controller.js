import angular from 'angular';
// import recipeDetailController from '../../app/recipeDetail/recipeDetail.component';

export class UpdateReviewController {
  /*@ngInject*/
  constructor($uibModalInstance, Review, review, recipeCtrl) {
    this.Review = Review;
    this.$uibModalInstance = $uibModalInstance;
    this.review = review;
    this.recipeCtrl = recipeCtrl;
    this.updated = false;
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  submitForm() {
    this.Review.updateReview(this.review)
      .then(result => {
        // this.$uibModalInstance.modalDomEl.footer().innerHTML = '<button ng-click="updateReviewModal.cancel()" type="button" class="btn btn-default">Close</button>';
        // document.getElementById('modal-footer').innerHTML = '<button ng-click="updateReviewController.cancel()" type="button" class="btn btn-default">Close</button>';
        this.formInfo = 'Review successfully updated!';
        // window.location.reload();
        // recipeDetailController.getRecipeData();
        this.recipeCtrl.getRecipeData();
        this.updated = true;
      })
      .catch(err => {
        console.error(err);
        this.formError = err.toString();
      });
  }
}

export default angular.module('comp3705App.updateReviewModal', [])
  .controller('updateReviewController', UpdateReviewController)
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
