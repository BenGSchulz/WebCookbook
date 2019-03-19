'use strict';
// import mongoose from 'mongoose';

import {Review} from './reviews.model';
import {User} from '../users/users.model';
import {Recipe} from '../recipes/recipes.model';

// Find all Reviews
export function index(req, res) {
  Review.find()
    .populate({path: 'reviewer', Model: User})
    .populate({path: 'onRecipe', Model: Recipe})
    .exec()
    // This then method will only be called if the query was successful, so no need to error check!
    .then(function(reviews) {
      res.status(200);
      res.json({
        reviews
      });
    })
    .catch(function(err) {
      res.status(500);
      res.send(err);
    });
}

// Find details for one review
export function show(req, res) {
  Review.findById(req.params.reviewId)
    .populate({path: 'reviewer', Model: User})
    .populate({path: 'onRecipe', Model: Recipe})
    .exec()
    .then(function(existingReview) {
      if(existingReview) {
        // Review was found by Id
        res.status(200);
        res.json(existingReview);
      } else {
        // Review was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

export function showAllOnRecipe(req, res) {
  Recipe.findById(req.params.recipeId)
    .populate({path: 'reviews', Model: Review})
    .exec()
    .then(function(existingRecipe) {
      if(existingRecipe) {
        let outReviews = existingRecipe.reviews;
        res.status(200);
        res.json({
          outReviews
        });
      } else {
        // Recipe was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// showAllOnRecipe w/out virtual
// export function showAllOnRecipe(req, res) {
//   Recipe.findById(req.params.recipeId)
//     .populate({path: 'reviews', Model: Review})
//     .exec()
//     .then(function(existingRecipe) {
//       if(existingRecipe) {
//         Review.find()
//           .populate({path: 'reviewer', Model: User})
//           .exec()
//           // This then method will only be called if the query was successful, so no need to error check!
//           .then(function(reviews) {
//             res.status(200);
//             res.json({
//               reviews
//             });
//           })
//           .catch(function(err) {
//             res.status(500);
//             res.send(err);
//           });
//       } else {
//         // Recipe was not found
//         res.status(404);
//         res.json({message: 'Not Found'});
//       }
//     })
//     .catch(function(err) {
//       res.status(400);
//       res.send(err);
//     });
// }

export function create(req, res) {
  let reviewData = req.body;
  let usernameIn = reviewData.reviewer;

  User.findOne({username: usernameIn})
    .exec()
    .then(function(submittingUser) {
      if(submittingUser) {
        if(Recipe.findById(req.params.recipeId)) {
          reviewData.reviewer = submittingUser._id;
          reviewData.onRecipe = req.params.recipeId;
          return Promise.resolve(reviewData);
        } else {
          res.status(404);
          res.json({message: 'Recipe Not found'});
        }
      } else {
        res.status(404);
        res.json({message: 'User Not found'});
      }
    })
    .then(function(returnedReviewData) {
      return Review.create(returnedReviewData);
    })
    .then(function(createdReview) {
      res.status(201);
      res.json(createdReview);
    })
    .catch(function(err) {
      res.status(400);
      console.log(err);
      res.send(err);
    });
}

// Create a new Review Without Virtual
// export function create(req, res) {
//   let reviewData = req.body;
//   let usernameIn = reviewData.reviewer;
//
//   let recipe = null;
//   let savedReview = null;
//
//   Recipe.findById(req.params.recipeId)
//     .exec()
//     .then(function(reviewedRecipe) {
//       if(reviewedRecipe) {
//         recipe = reviewedRecipe;
//         return User.findOne({username: usernameIn});
//       } else {
//         res.status(404);
//         res.json({message: 'Not found'});
//       }
//     })
//     .then(function(submittingUser) {
//       if(submittingUser) {
//         reviewData.reviewer = submittingUser._id;
//         return Promise.resolve(reviewData);
//       } else {
//         res.status(404);
//         res.json({message: 'Not found'});
//       }
//     })
//     .then(function(returnedReviewData) {
//       savedReview = Review.create(returnedReviewData);
//       return savedReview;
//     })
//     .then(function(createdReview) {
//       if(createdReview) {
//         return recipe.reviews.push(createdReview._id);
//       } else {
//         res.status(400);
//         res.json({message: 'Error Saving Review'});
//       }
//     })
//     .then(function(submittedReview) {
//       if(submittedReview) {
//         res.status(201);
//         res.json(savedReview);
//       } else {
//         res.status(400);
//         console.log('Error Submitting Review');
//         res.send();
//       }
//     })
//     .catch(function(err) {
//       res.status(400);
//       console.log(err);
//       res.send(err);
//     });
// }

// Update a Review
export function update(req, res) {
  // Start by trying to find the Review by its id
  Review.findById(req.params.reviewId)
    .populate({path: 'reviewer', Model: User})
    .exec()
    // Update Review and address
    .then(function(existingReview) {
      // If Review exists, update all fields of the object
      if(existingReview) {
        existingReview.rating = req.body.rating;
        existingReview.description = req.body.description;
        existingReview.helpfulCount = 0;
        existingReview.unhelpfulCount = 0;

        return Promise.all([
          existingReview.increment().save()
        ]);
      } else {
        // Review was not found
        return existingReview;
      }
    })
    // This .then will be called after the Promise.all resolves, or be called with null if the Review was not found
    .then(function(savedObjects) {
      // savedObjects should be defined if Promise.all was invoked (Review was found)
      if(savedObjects) {
        res.status(200);
        res.json(savedObjects[0]);
      } else {
        // Review was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    // Error encountered during the save of the Review
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Remove a Review
export function destroy(req, res) {
  Review.findById(req.params.reviewId)
    .exec()
    .then(function(existingReview) {
      if(existingReview) {
        return Promise.all([
          existingReview.remove()
        ]);
      } else {
        return existingReview;
      }
    })
    // Delete was successful
    .then(function(deletedReview) {
      if(deletedReview) {
        res.status(204).send();
      } else {
        // Review was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    //Review delete failed
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

