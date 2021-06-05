const { User, Thought } = require('../models');

const userController = {
// GEt all users
getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

//GET single user

//CREATE a user

//UPDATE a user


//DELEYE user

//ADD friend
updateFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, {$addToSet: {friends: req.params.friendId}}, { new: true, runValidators: true })
      .then(friendData => {
        if (!friendData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(friendData);
      })
      .catch(err => res.json(err));
  },

//REMOVE freind

};