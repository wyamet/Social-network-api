const { Thoughts, Users } = require("../models");

const thoughtController = {
  // Creates new thought
  createThought: async ({ params, body }, res) => {
    try {
      const thought = await Thoughts.create(body);

      if (!thought)
        return res.status(500).json({ error: "Could not create Thought" });

      Users.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      return res.status(200).json(thought);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Could not create Thought" });
    }
  },

  // get thought by id
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thoughts.findOne({ _id: req.params.id })
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v");
      if (!thought) {
        res.status(404).json({ message: "No thought with this id!" });
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
      const thoughts = await Thoughts.find()
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
      const thought = await Thoughts.findOne({ _id: req.params.id })
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
      const updatedThought = await Thoughts.findOneAndUpdate(
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
      const deletedThought = await Thoughts.findOneAndDelete({
        _id: req.params.id,
      });
      if (!deletedThought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      const updatedUser = await Users.findOneAndUpdate(
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
      const updatedThought = await Thoughts.findOneAndUpdate(
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
      const updatedThought = await Thoughts.findOneAndUpdate(
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
