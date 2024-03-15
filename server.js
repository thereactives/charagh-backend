const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// Routes
const UserRoutes = require("./routes/UserRoutes");

// App setup
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", UserRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(4000);
    console.log("listening");
  })
  .catch((error) => {
    console.log(error);
  });
