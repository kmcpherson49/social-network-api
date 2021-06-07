const { User, Thought } = require('../../models');

const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateFriend,
  deleteFriend
} = require('../../controllers/user-controller');

// /api/users
router
  .route('/api/users')
  .get(getAllUsers)
  .get(getUserById)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
  .route('/api/users/:userId/friends/:friendId')
  .post(updateFriend)
  .delete(deleteFriend);

module.exports = router;