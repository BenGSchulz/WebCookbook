import express from 'express';
import * as controller from './recipes.controller';

let router = express.Router();

// GET methods
router.get('/recipes', controller.index);
router.get('/recipes/:id', controller.show);
router.get('/recipes/random/', controller.random);

router.get('/users/:userId/recipes', controller.showAllByUser);
router.get('/users/:userId/savedRecipes', controller.showAllSavedByUser);

// POST method
router.post('/recipes', controller.create);
router.post('/users/:userId/recipes', controller.createByUser);

// PUT method
router.put('/recipes/:id', controller.update);

// DELETE method
router.delete('/recipes/:id', controller.destroy);

export {router};
