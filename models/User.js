// USER username- string unique required trimmed email-string required unique must match valid email thoughts- array of _id values referencing thoguht model friends- array of _id values refercing User model

const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      //unique
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      //unique
      //must match vaild email
    },
    thoughts: {
      //Array of _id values referencing the Thought model
    },
    friends: {
      //Array of _id values referencing the User model (self-reference)
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;