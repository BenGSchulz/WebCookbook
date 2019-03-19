import mongoose from 'mongoose';
let Schema = mongoose.Schema;

// This schema represents the name of the user
let nameSchema = Schema({
  // firstName is a simple String type that is required
  firstName: {type: String, required: true},
  // middleName is a simple String type that is not required
  middleName: {type: String, required: false},
  // lastName is a simple String type that is required
  lastName: {type: String, required: true}
});

// This is the main user schema
let userSchema = Schema({
  // Age is a simple number type that is required
  name: nameSchema,
  username: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true}
}, {toJSON: {virtuals: true}});

userSchema.virtual('submittedRecipes', {
  ref: 'Recipe',
  localField: '_id',
  foreignField: 'submitter'
});

userSchema.virtual('savedRecipes', {
  ref: 'Recipe',
  localField: '_id',
  foreignField: 'savedBy'
});

userSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'reviewer'
});

let User = mongoose.model('User', userSchema);

export {User};
