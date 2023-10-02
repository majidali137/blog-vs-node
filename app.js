const express = require("express");
const dotenv = require("dotenv").config();

const createError = require("http-errors");

const app = express();

//initalization DataBase
require("./initDB")();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PostRoute = require("./Routes/Post-route");
app.use("/posts", PostRoute);

const CommentRoute = require("./Routes/Comment-route")
app.use("/comments", CommentRoute)

const UserRoute = require("./Routes/User-route");
app.use("/users", UserRoute);

app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

// Error Handler

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server started on port " + PORT + "....");
});
