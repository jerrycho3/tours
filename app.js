const express = require("express");
const app = express();
const morgan = require("morgan");

const tourRouter = require("./routers/tourRouter");

if (process.env.NODE_ENV === development) {
  app.use(morgan("tiny"));
}

//if this middleware isnt used our response will throw undefined
app.use(express.json());

//serving static file to the server from a folder and not from a route,we use this middeleware
// app.use(express.static(`${__dirname}/dev_data`));

// app.use((req, res, next) => {
//   console.log("hello from my middleware");
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //this is hw we can get access to the req headers in express, with bearer we posess the TOKEN
  console.log(req.headers);
});

app.use("/api/v1/tours", tourRouter);

module.exports = app;
