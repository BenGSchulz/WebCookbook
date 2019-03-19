import express from 'express';
import * as controller from './reviews.controller';

let router = express.Router();

// GET methods for ALL reviews
router.get('/reviews', controller.index);
router.get('/reviews/:reviewId', controller.show);

// GET methods for reviews on certain recipe
router.get('/recipes/:recipeId/reviews', controller.showAllOnRecipe);
// router.get('/recipes/:recipeId/reviews/:reviewId', controller.showOneOnRecipe);

// POST method on recipe
router.post('/recipes/:recipeId/reviews', controller.create);

// PUT method
router.put('/reviews/:reviewId', controller.update);

// DELETE method on recipe
router.delete('/reviews/:reviewId', controller.destroy);

export {router};
