const express = require("express");
require("dotenv").config();
//create an express ass
const app = express();
const workoutRoues = require("./routes/workoutRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

app.use(express.json());
//set up a get route handler

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//use this route handler for all requests starting with the provided route
app.use("/api/workouts", workoutRoues);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        "connected to database and server listening on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
