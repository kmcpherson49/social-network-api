const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  updateReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
.route('/api/thoughts')
.get(getAllThoughts)
.get(getThoughtById)
.post(createThought)
.put(updateThought)
.delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
  .route('/api/thoughts/:thoughtId/reactions')
  .post(updateReaction)
  .delete(deleteReaction);

module.exports = router;