const express = require("express");
const userController = require("../controllers/userControllers");
const authController = require("../controllers/authController");

const router = express.Router();

//authentication route
router.post("/signup", authController.signup);
router.post("/login", authController.login);

//we can also refactor our route handler function this way
router
  .route("/")

  //this is what is called chaining multiple middleware function for the same route
  .post(userController.createUser)
  .get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
