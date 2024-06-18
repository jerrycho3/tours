const user = require("../models/userModel");

//to create a new user
exports.createUser = (req, res) => {
  res.status(201).json({
    status: "success",
    data: {},
    message,
  });
};

//to get all users
exports.getAllUsers = async (req, res) => {
  const allUsers = await user.find();

  res.status(200).json({
    status: "success",
    result: allUsers.length,
    data: {
      allUsers,
    },
  });
};

//to get a user
exports.getUser = (req, res) => {
  res.status(201).json({
    status: "success",
    data: {},
    message,
  });
};

//to update a user
exports.updateUser = (req, res) => {
  res.status(201).json({
    status: "success",
    data: {},
    message,
  });
};

//to delete a user
exports.deleteUser = (req, res) => {
  res.status(201).json({
    status: "success",
    data: {},
    message,
  });
};
