const router = require('express').Router();
const { Thought } = require('../models');

// GET all thoughts
router.get('/api/thoughts', (req, res) => {
    Thought.findAll({

    }).then((allthoughts) => res.status(200).json(allthoughts))
    .catch((err) => res.status(500).json(err))
  });

//GET single thoughts
router.get('/api/thoughts/:id', (req, res) => {
    Thought.findOne({
      where: {
        id: req.params.id
      },
    }).then((onethought) => res.status(200).json(onethought))
    .catch((err) => res.status(500).json(err))
  });

//CREATE a thoughts 
//(don't forget to push the created thought's _id to the associated user's thoughts array field)
router.post('/api/thoughts', (req, res) => {
    Thought.create(req.body)
    .then((thought) => res.status(200).json(thought))
    .catch((err) => res.status(500).json(err))
  });

//UPDATE a thoughts
router.put('/update/:id', ({ params, body }, res) => {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbThought => {
        if (!dbThought) {
          res.json({ message: 'No note found with this id!' });
          return;
        }
        res.json(dbThought);
      })
      .catch(err => {
        res.json(err);
      });
  });
  


//DELETE thoughts
router.delete('/:id', (req, res) => {
    Thought.destroy({
      where: {
        id: req.params.id
      }
    }).then((deletethought) => res.status(200).json(deletethought))
    .catch((err) => res.status(500).json(err))
  });

//ADD thoughts

//REMOVE thoughts