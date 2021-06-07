
const { Thought, Reaction } = require('../models');

const thoughtController = {
// GET all thoughts
getAllThoughts(req, res) {
    User.find({})
      .select("-__v")
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

//GET single thoughts
getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select("-__v")
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

//CREATE a thoughts 
//(don't forget to push the created thought's _id to the associated user's thoughts array field)
createThought({ body }, res) {
    Thought.create(body)
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.json(err));
  },

//UPDATE a thoughts
updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },
  


//DELETE thoughts
deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.json(err));
  },
  

//ADD thoughts
updateReaction(req, res) {
    Reaction.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { reaction: req.params.reactionId } },
      { new: true, runValidators: true }
    )
      .then((reactionData) => {
        if (!reactionData) {
          res.status(404).json({ message: "No reaction found with this id!" });
          return;
        }
        res.json(reactionData);
      })
      .catch((err) => res.json(err));
  },


//REMOVE thoughts
deleteReaction(req, res) {
    Reaction.findOneAndDelete(
      { _id: params.id },
      { $pull: { reaction: req.params.reactionId } }
    )
      .then((reactionData) => res.json(reactionData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;