const express = require("express").Router();
const User = require("../model/User");
// const Event = require("../model/Event");
const verifyToken = require("../middleware/verifyToken");



// Get User
router.get("/profile", (req, res) => {
  res.send(req.user.name)
  // try {
  //   const profile = await User.findOne({ _id: req.params.id });
  //   // const events = await Event.find({
  //   //   userId: req.user.id
  //   // }).select('_id');
  //   const { _id, name, email, photoUrl } = profile;
  //   res.send({ _id, name, email, photoUrl, events: [] }); // add events when ready
  // } catch (error) {
  //   res.status(400).send(error);
  // }
});

// Update User
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body
        }
      }
    );
    res.json({
      message: `User: ${updatedUser._id} updated`
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete User
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const removedUser = await User.findOneAndRemove({ _id: req.params.id });
    res.json({
      message: `User: ${removedUser._id} deleted`
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
