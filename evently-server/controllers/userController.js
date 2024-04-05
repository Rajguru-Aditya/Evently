const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const User = require('../models/userModel');

// @desc    Fetch all user
// @route   GET /api/user
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  // Fetch all user from the database
  const user = await User.findAll();

  // Respond with the user
  res.json(user);
});

// @desc    Fetch single user
// @route   GET /api/user/:id
// @access  Public
const getUser = asyncHandler(async (req, res) => {
  // get the user id from the request parameters
  const userId = req.params.id;

  // Fetch the user from the database
  const user = await User.findByPk(userId);

  // Respond with the user
  res.json(user);
});

// @desc    Create an user
// @route   POST /api/user
// @access  Private/Admin
const createUser = asyncHandler(async (req, res) => {
  try {
    // Extract user details from request body or wherever they come from
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    };

    console.log("User data:", userData);

    if (!userData.name || !userData.email || !userData.password) {
      res.status(400);
      throw new Error("Please provide username, email and password");
    }

    const userExists = await User.findOne({
      where: {
        email: userData.email,
      },
    });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // create user in db
    const user = await User.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        message: "User created successfully",
        data: user,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @desc    Update an user
// @route   PUT /api/user/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  // get the user id from the request parameters
  const userId = req.params.id;

  // Extract user details from request body or wherever they come from
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  };

  // Update the user in the database
  const updatedUser = await User.update(userData, {
    where: {
      id: userId,
    },
  });

  // Respond with the updated user
  res.status(200).json({
    updated: updatedUser,
    message: "User updated successfully",
    data: userData,
  });
});

// @desc    Delete an user
// @route   DELETE /api/user/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  // get id from the request parameters
  const userId = req.params.id;

  // Delete the user from the database
  const deletedUser = await User.destroy({
    where: {
      id: userId,
    },
  });

  // Respond with the deleted user
  res.status(200).json({
    deleted: deletedUser,
    message: `User ${userId} deleted successfully`,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  console.log("Login Request body: ", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  // const hashedPassword = await bcrypt.hash(password, 10);

  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  } else {
    console.log("User found: ", user);
  }

  // compare password with hashed password

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.status(200).json({
      message: "User logged in",
      accessToken,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
