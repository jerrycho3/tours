const express = require("express");
const authController = require("../controllers/authController");
const tourController = require("../controllers/tourControllers");

const router = express.Router();

//we can also refactor our route handler function this way

//param middleware runs for certain parameters in our URL

router.param("id", tourController.checkId);
router
  .route("/")

  //this is what is called chaining multiple middleware func for the same route
  //let say we want to protect the ''getAllTours '' route, we create a middleware func that will run before getAllTours endpoint and protect the route from unauthorised acces
  .get(authController.protct, tourController.getAllTours)
  .post(tourController.checkBody, tourController.createATour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTours)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    tourController.deleteTours
  );

module.exports = router;
