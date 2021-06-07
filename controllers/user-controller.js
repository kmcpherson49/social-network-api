const { User, Thought } = require("../models");

const userController = {
  // GEt all users
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //GET single user
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughtText",
        select: "-__v",
      })
      .select("-__v")
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //CREATE a user
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.json(err));
  },

  //UPDATE a user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.json(err));
  },

  //DELETE user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((userData) => res.json(userData))
      .catch((err) => res.json(err));
  },

  //ADD friend
  updateFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
      .then((friendData) => {
        if (!friendData) {
          res.status(404).json({ message: "No friend found with this id!" });
          return;
        }
        res.json(friendData);
      })
      .catch((err) => res.json(err));
  },

  //REMOVE freind
  deleteFriend(req, res) {
    User.findOneAndDelete(
      { _id: params.id },
      { $pull: { friends: req.params.friendId } }
    )
      .then((friendData) => res.json(friendData))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
