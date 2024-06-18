const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

//create a schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please tell us your name!"],
  },

  email: {
    type: String,
    required: [true, "please provide your email!"],
    unique: true,
    lowerCase: true,
    //validte the users email to be in the right format,we will call the isEmail method on d validator object
    validate: [validator.isEmail, "please provide a valid email !"],
  },

  photo: String,

  role: {
    type: String,
    //use enum validator to allow certain typeof role to be specified
    enum: ["user", "admin"],
    default: "user",
  },

  password: {
    type: String,
    required: [true, "please provide a password!"],
    minLength: 8,
    //this select wont allow the password results show up to the client
    Select: false,
  },
  //password is validated here to check for same password
  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password!"],
    //we will create a function and an error message, we use the custom validator
    validate: {
      //validator function,specify a callback function which wil be b called when the document is created,this only works on CREATE OR SAVE A NEW OBJECT NOTONUPDATE!!!
      validator:
        //we cnt use arrow func bcos we want to use the THIS keyword
        function (el) {
          //from th validator func we return eithr true or false, if false we get a validation err
          return el === this.password; //abc=== abc : true, abc=== abb : false
        },

      message: "password are not the same!!!",
    },
  },
});

//we will use a mongoose middleware for encryption, the PRE-SAVE or DOCUMENT middleware
//set a PRE-HOOK middleware  on save, bcos th encryption would be hppening between the moment the data is received and saved to the database,the presave middlewre runs between getting the data and savng it to the databse, so thats the perfect time to manipulate the data

userSchema.pre("save", async function (next) {
  // we want to encrypt only on saving or updating only the password
  //only run this function if password is modified
  if (!this.isModified("password")) return next; //if password isnt modified dont run the any of the other code in here,exit d function, move to the next middleware

  //else encrypt the password with a strong hashing algorithm, cost of 12

  this.password = await bcrypt.hash(this.password, 12);

  //we then go ahead to delete the confirm password so it wont persist in the database, so we set it 2 undefinded,bcos at this point we only have the password hashed
  //delete the password field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
