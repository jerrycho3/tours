const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev_data/tours_template.json`)
);

//param middleware

exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length)
    return res.status(404).json({
      status: "failed",
      message: "invalid ID",
    });
  next();
};

//create a body middleware
exports.checkBody = (req, res, next) => {
  //check if bbody contains name and price property
  if (!req.body.name || !req.body.price) {
    //if not send back http status code 400(bad request) and add the middleware to the post handler stack
    return res.status(400).json({
      status: "fail",
      message: "missing name or price",
    });
  }
  next();
};
exports.createATour = (req, res) => {
  //console.log(req.body);
  //since there is no database to generate the id of the tour just created then we get the id of the last obj and add 1 to it with this func=>
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  //push the new created tour to the existin array
  tours.push(newTour);
  //write it into the existing DB in my file system
  fs.writeFile(
    `${__dirname}/dev_data/tours_template.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

//to get all tours
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res
    .status(200)
    //we formatted our reponse using jsend format
    .json({
      status: "sucess",
      //send the number of result to the client for easy understanding,nd it only mkes sense when we are sending many or array of objcts
      results: tours.length,
      requestedAt: req.requestTime,
      data: {
        tours,
      },
    });
};

//to get a Tour
exports.getTour = (req, res) => {
  console.log(req.params);
  //convert the id tht is in a string to a number
  const id = req.params.id * 1;
  //the find method will create an array which only the id gotten from the params is returned and stored into the tour varible
  const tour = tours.find((el) => el.id === id);
  // to check if the id is not in the tour DB in the file system
  if (id > tours.length) {
    return res.status(404).json({
      status: "failed",
      message: "invalid ID",
    });
  }

  res
    .status(200)
    //we formatted our reponse using jsend format
    .json({
      status: "sucess",
      data: {
        tour,
      },
    });
};

//to update a tour

exports.updateTours = (req, res) => {
  res
    .status(200)
    //we formatted our reponse using jsend format
    .json({
      status: "sucess",
      //send the number of result to the client for easy understanding,nd it only mkes sense when we are sending many or array of objcts
      message: "this route is not yet defined",
    });
};

//to delete a tour

exports.deleteTours = (req, res) => {
  res
    .status(200)
    //we formatted our reponse using jsend format
    .json({
      status: "sucess",
      //send the number of result to the client for easy understanding,nd it only mkes sense when we are sending many or array of objcts
      message: "this route is not yet defined",
    });
};
