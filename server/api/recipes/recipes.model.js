import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let ingredientSchema = Schema({
  ingredient: {type: String, required: true},
  amount: {type: String, required: true}
});

let recipeSchema = Schema({
  name: {type: String, required: true},
  submitter: {type: Schema.Types.ObjectId, ref: 'User'},
  date: {type: Date, required: true, default: Date.now},
  description: {type: String, required: true},
  pictureURL: {type: String, required: true},
  prepTime: {type: Number, required: true},
  cookTime: {type: Number, required: true},
  directions: {type: [String], required: true},
  ingredients: [ingredientSchema],
  // reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
  savedBy: [{type: Schema.Types.ObjectId, ref: 'User'}],
  tags: [String]
}, {toJSON: {virtuals: true}});

recipeSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'onRecipe'
});

let Recipe = mongoose.model('Recipe', recipeSchema);

export {Recipe};
