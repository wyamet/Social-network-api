const { Thought, User } = require("../models");

const thoughtController = {
  // Creates new thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No thoughts with this ID" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  // get thought by id
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.id })
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v");
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find()
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v");
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get thought by id
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.id })
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v");
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // update thought by id
  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      )
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v");
      if (!updatedThought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // delete thought by id
  deleteThought: async (req, res) => {
    try {
      const deletedThought = await Thought.findOneAndDelete({
        _id: req.params.id,
      });
      if (!deletedThought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: deletedThought.userId },
        { $pull: { thoughts: deletedThought._id } },
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  createReaction: async (req, res) => {
    try {
      const newReaction = { ...req.body, reactionId: new Date().getTime() };
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: newReaction } },
        { new: true, runValidators: true }
      )
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v");
      if (!updatedThought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.status(201).json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create reaction" });
    }
  },
  deleteReaction: async (req, res) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      )
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v");
      if (!updatedThought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.status(200).json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete reaction" });
    }
  },
};
module.exports = thoughtController;
