'use strict';

import {Recipe} from './recipes.model';
import {User} from '../users/users.model';
import {Review} from '../reviews/reviews.model';
// import mongoose from 'mongoose';

// Find all Recipes
export function index(req, res) {
  Recipe.find()
    .populate({path: 'submitter', Model: User})
    .populate({path: 'reviews', Model: Review})
    .populate({path: 'savedBy', Model: User})
    .exec()
    .then(function (recipes) {
      res.status(200);
      res.json(
        recipes
      );
    })
    .catch(function (err) {
      res.status(500);
      res.send(err);
    });
}

// Find details for one recipe
export function show(req, res) {
  Recipe.findById(req.params.id)
    .populate({path: 'submitter', Model: User})
    .populate({path: 'reviews', Model: Review})
    .populate({path: 'savedBy', Model: User})
    .exec()
    .then(function (existingRecipe) {
      if (existingRecipe) {
        // Recipe was found by Id
        res.status(200);
        res.json(existingRecipe);
      } else {
        // Recipe was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

export function random(req, res) {
  // Recipe.count()
  //   .exec()
  //   .then(function(count) {
  //     return Math.floor(Math.random() * count);
  //   })
  //   .then(function(randomIndex) {
  //     Recipe.findOne()
  //       .skip(randomIndex)
  //       .exec(function(err, result) {
  //         if(err) {
  //           res.status(500);
  //           res.send(err);
  //         } else {
  //           res.status(200);
  //           res.json(result);
  //         }
  //       });
  //   })
  //   .catch(function(err) {
  //     res.status(500);
  //     res.send(err);
  //   });

  Recipe.count()
    .exec(function(err, count) {
      if(err) {
        res.status(500);
        res.send(err);
      }
      let randomIndex = Math.floor(Math.random() * count);
      Recipe.findOne().skip(randomIndex)
        .exec(function(err, result) {
          if(err) {
            res.status(500);
            res.send(err);
          }
          return result;
        });
    });
}

export function showAllByUser(req, res) {
  User.findById(req.params.userId)
    .populate({path: 'submittedRecipes'})
    .select('submittedRecipes')
    .exec()
    .then(function (submittedRecipes) {
      if (submittedRecipes) {
        // User was found by Id
        res.status(200);
        res.json({
          submittedRecipes
        });
      } else {
        // Recipe was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

export function showAllSavedByUser(req, res) {
  User.findById(req.params.userId)
    .populate({path: 'savedRecipes'})
    .select('savedRecipes')
    .exec()
    .then(function (savedRecipes) {
      if (savedRecipes) {
        // User was found by Id
        res.status(200);
        res.json({
          savedRecipes
        });
      } else {
        // Recipe was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

// Create a new recipe
export function create(req, res) {
  let recipeData = req.body;

  Recipe.create(recipeData)
    .then(function (createdRecipe) {
      res.status(201);
      res.json(createdRecipe);
    })
    .catch(function (err) {
      res.status(400);
      console.log(err);
      res.send(err);
    });
}

export function createByUser(req, res) {
  let recipeData = req.body;

  let usernameIn = recipeData.submitter;
  User.findOne({username: usernameIn})
    .exec()
    .then(function (submittingUser) {
      if (submittingUser) {
        recipeData.submitter = submittingUser._id;
        return Promise.resolve(recipeData);
      } else {
        res.status(404);
        res.json({message: 'Not found'});
      }
    })
    .then(function (returnedRecipeData) {
      // console.log(returnedRecipe);
      return Recipe.create(returnedRecipeData);
    })
    .then(function (createdRecipe) {
      // delete createdRecipe.submitter;
      res.status(201);
      res.json(createdRecipe);
    })
    .catch(function (err) {
      res.status(400);
      console.log(err);
      res.send(err);
    });
}

// Update a recipe
export function update(req, res) {
  // Start by trying to find the recipe by its id
  Recipe.findById(req.params.id)
    .populate({path: 'submitter', Model: User})
    .populate({path: 'reviews', Model: Review})
    .populate({path: 'savedBy', Model: User})
    .exec()
    // Update recipe and address
    .then(function (existingRecipe) {
      // If recipe exists, update all fields of the object
      if (existingRecipe) {
        existingRecipe.name = req.body.name;
        existingRecipe.description = req.body.description;
        existingRecipe.pictureURL = req.body.pictureURL;
        existingRecipe.prepTime = req.body.prepTime;
        existingRecipe.cookTime = req.body.cookTime;
        existingRecipe.directions = req.body.directions;
        existingRecipe.ingredients = req.body.ingredients;
        existingRecipe.tags = req.body.tags;

        return Promise.all([
          existingRecipe.increment().save()
        ]);
      } else {
        // Recipe was not found
        return existingRecipe;
      }
    })
    .then(function (savedObjects) {
      if (savedObjects) {
        res.status(200);
        res.json(savedObjects[0]);
      } else {
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

// Remove a Recipe
export function destroy(req, res) {
  let reviewsOnRecipe;
  Recipe.findById(req.params.id)
    .populate({path: 'reviews', Model: Review})
    .exec()
    .then(function (existingRecipe) {
      if (existingRecipe) {
        reviewsOnRecipe = Review.find({_id: {$in: existingRecipe.reviews}});

        return Promise.all([
          // reviewsOnRecipe.remove(),
          reviewsOnRecipe.remove(),
          existingRecipe.remove()
        ]);
      } else {
        return existingRecipe;
      }
    })
    // Delete was successful
    .then(function (deletedRecipe) {
      if (deletedRecipe) {
        res.status(204).send();
      } else {
        // Recipe was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function (err) {
      res.status(400);
      console.log(err);
      res.send(err);
    });
}

