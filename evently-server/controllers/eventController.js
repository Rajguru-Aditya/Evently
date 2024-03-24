const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");

// const Event = require('../models/eventModel');

// @desc    Fetch all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  res.json("getEvents");
});

// @desc    Fetch single event
// @route   GET /api/events/:id
// @access  Public
const getEvent = asyncHandler(async (req, res) => {
  res.json("getEvent");
});

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  try {
    // Extract event details from request body or wherever they come from
    const eventData = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      image: req.body.image,
    };

    console.log("Event data:", eventData);

    // Create the event in the database
    const createdEvent = await Event.create(eventData);

    // Respond with the created event
    res.status(201).json(createdEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  res.json("updateEvent");
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  res.json("deleteEvent");
});

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
