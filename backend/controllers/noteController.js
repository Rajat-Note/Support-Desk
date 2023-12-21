const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModal");
const Note = require("../models/noteModal");

const getNotes = asyncHandler(async (req, res) => {
  // Get user using id in the jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.find(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

const addNote = asyncHandler(async (req, res) => {
  // Get user using id in the jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.find(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const note = await Note.create({
    ticket: req.params.ticketId,
    text: req.body.text,
    user: req.user.id,
  });

  res.status(201).json(note);
});

module.exports = {
  getNotes,
  addNote,
};
