const { promisify } = require("util");
const users = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    //this will return a promise so we await it
    const newUser = await users.create(req.body);

    const token = signToken(newUser._id);
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
  next();
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //check if email and password exists
    if (!email || password) {
      res.status(400).json({
        status: "failed",
        message: "please provide your email and password!",
      });
    }

    //check if user and password is correct
    const user = await users.findOne({ email }).select("+password");
    if (!user || !user.correctPassword(password, user.password)) {
      res.status(40).json({
        status: "unAthuorised",
        message: "incorrect  email or password!",
      });
    }

    //if everything is OK send TOKEN to the CLIENT
    const token = signToken(user._id);
    res.status(201).json({
      status: "success",
      token,
    });
  } catch (error) {
    res.stat(500).json({
      message: "internal server error" + error.message,
    });
  }
  next();
};

//AUTHORIZATION...dealing with  user role

//athorization checks if a cetain user is given access to protected route and perform certain actions and have right to a certain resource if hes logged in
// grant access to protected route

//let say we want to protect the ''getAllTours '' route

exports.protect = async (req, res, next) => {
  try {
    //1) get the TOKEN and chck if it exist
    //so we send  token using an http header with the request

    let token;

    if (
      //we read the token from the authorization header
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      console.log(token);

      if (!token) {
        res.status(401).json({
          message:
            "unauthorised,you are not logged in please log in to get access",
        });
      }
    }

    //2) VERIFICATION TOKEN:validate the TOKEN, check if the TOKEN is valid
    //we use the JWT verify function here
    //we wil promisify thiis func to make it return a promise

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    //3)if the verification is succesful, we check if the user trying to access the route  stil exist

    //4) chck if user changd password after the JWT was issued
  } catch (error) {
    res.status(500).json({
      message: "internal server error" + error.message,
    });
  }

  next();
};
