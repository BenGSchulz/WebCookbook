import angular from 'angular';

export class UpdateRecipeController {
  /*@ngInject*/
  constructor($uibModalInstance, Recipe, recipe) {
    this.Recipe = Recipe;

    this.recipe = recipe;
    this.setData();
    this.$uibModalInstance = $uibModalInstance;
  }

  setData() {
    this.submitted = false;
    this.submitFail = false;
    this.localDirections = [];
    // this.inDirectionIndex = this.recipe.directions.length + 1;
    this.currentDirectionIndex = 1;
    for(let inDirection of this.recipe.directions) {
      // console.log('looping');
      this.localDirections.push({index: this.currentDirectionIndex, direction: inDirection.toString().slice(3)});
      this.currentDirectionIndex++;
    }
  }

  addDirection() {
    this.localDirections.push({index: this.currentDirectionIndex, direction: ''});
    this.currentDirectionIndex++;
  }

  removeDirection(index) {
    this.localDirections.splice(index, 1);
    for(let i = index; i < this.localDirections.length; i++) {
      this.localDirections[i].index--;
    }
    this.currentDirectionIndex--;
  }

  addIngredient() {
    this.recipe.ingredients.push({ingredient: '', amount: ''});
  }

  removeIngredient(index) {
    this.recipe.ingredients.splice(index, 1);
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  submitForm() {
    let newDirections = [];
    for(let localDirection of this.localDirections) {
      newDirections.push(localDirection.index.toString().concat('. ', localDirection.direction));
    }
    this.recipe.directions = newDirections;
    this.Recipe.updateRecipe(this.recipe)
      .then(result => {
        // this.$uibModalInstance.modalDomEl.footer().innerHTML = '<button ng-click="updateRecipeModal.cancel()" type="button" class="btn btn-default">Close</button>';
        // document.getElementById('modal-footer').innerHTML = '<button ng-click="updateRecipeController.cancel()" type="button" class="btn btn-default">Close</button>';
        this.formInfo = 'Recipe successfully updated!';
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.submitted = true;
        this.submitFail = false;
      })
      .catch(err => {
        console.error(err);
        this.formError = 'Please Fill Out All Fields';
        this.submitted = false;
        this.submitFail = true;

        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });
  }
}

export default angular.module('comp3705App.updateRecipeModal', [])
  .controller('updateRecipeController', UpdateRecipeController)
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
