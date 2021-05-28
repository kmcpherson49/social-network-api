// thoughtText-string, required, must be 1 to 280 characters createdAt-date, set defultvaluee to current timestamp

const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      //must be between 1 to 280 characters
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
      {
       //Array of nested documents created with the reactionSchema
      }
    ]
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
const ReactionSchema = new Schema(
    {
      reactionId: {
        //Use Mongoose's ObjectId data type
        //Default value is set to a new ObjectId
      },
      reactionBody: {
        type: String,
        required: true,
        //280 chrarcters max
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );

ReactionSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
