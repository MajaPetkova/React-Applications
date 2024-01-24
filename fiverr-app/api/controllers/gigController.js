const Gig = require("../models/Gig");
const createError = require("../utils/createError");

const createGig = async (req, res, next) => {
  if (!req.isSeller) {
    return next(createError(403, "Only sellers can create a gig"));
  }
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });
  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};
const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId) {
      return next(createError(403, "You can delete only your Gig"));
    }
    await Gig.findByIdAndDelete(req.params.id)
    res.status(200).send("Your gig has been deleted")
  } catch (err) {
    next(err);
  }
};
const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if(!gig){
      return next(createError(404, "Gig not found!"))
    }
    req.status(200).send(gig)
  } catch (err) {
    next(err);
  }
};
const getGigs = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createGig,
  deleteGig,
  getGig,
  getGigs,
};
