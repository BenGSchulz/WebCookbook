import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let reviewSchema = Schema({
  rating: {type: Number, min: 0, max: 5, required: true},
  description: String,
  date: {type: Date, required: true, default: Date.now},
  reviewer: {type: Schema.Types.ObjectId, ref: 'User'},
  onRecipe: {type: Schema.Types.ObjectId, ref: 'Recipe'},
  helpfulCount: {type: Number, min: 0, required: true},
  unhelpfulCount: {type: Number, min: 0, required: true}
});

let Review = mongoose.model('Review', reviewSchema);

export {Review};
