import express from 'express';
import * as controller from './users.controller';

let router = express.Router();

// GET methods
router.get('/users', controller.index);
router.get('/users/:id', controller.show);

router.get('/recipes/:recipeId/users', controller.showAllUsersWhoSaved);

// POST method
router.post('/users', controller.create);

// PUT method
router.put('/users/:id', controller.update);

// DELETE method
router.delete('/users/:id', controller.destroy);

export {router};
