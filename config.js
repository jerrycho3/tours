const mongoose = require("mongoose");

const DB = DB.connect()

  .then(() => {
    console.log("connection to database successful");
  })

  .catch((error) => {
    console.log("something went wrong" + error.message);
  });
