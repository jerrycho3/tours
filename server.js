const dotenv = require("dotenv");
require("./config");
dotenv.config({ path: "./config.env" });
const app = require("./app");

//this wil get us the environment we are currently on
console.log(app.get("env"));

console.log(process.env);

//START THE SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port:${port}...`);
});
