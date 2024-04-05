const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");

// const Event = require('../models/eventModel');

// @desc    Fetch all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  // Fetch all events from the database
  const events = await Event.findAll();

  // Respond with the events
  res.json(events);
});

// @desc    Fetch single event
// @route   GET /api/events/:id
// @access  Public
const getEvent = asyncHandler(async (req, res) => {
  // get the event id from the request parameters
  const eventId = req.params.id;

  // Fetch the event from the database
  const event = await Event.findByPk(eventId);

  // Respond with the event
  res.json(event);
});

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  try {
    // Extract event details from request body or wherever they come from
    const eventData = {
      userId: req.user.id,
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
  // get the event id from the request parameters
  const eventId = req.params.id;

  // Extract event details from request body or wherever they come from
  const eventData = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    image: req.body.image,
  };

  // Update the event in the database
  const updatedEvent = await Event.update(eventData, {
    where: {
      id: eventId,
    },
  });

  // Respond with the updated event
  res.status(200).json({
    updated: updatedEvent,
    message: "Event updated successfully",
    data: eventData,
  });
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  // get id from the request parameters
  const eventId = req.params.id;

  // Delete the event from the database
  const deletedEvent = await Event.destroy({
    where: {
      id: eventId,
    },
  });

  // Respond with the deleted event
  res.status(200).json({
    deleted: deletedEvent,
    message: `Event ${eventId} deleted successfully`,
  });
});

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
