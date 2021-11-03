const express = require("express");
const app = express();
var logger = require("morgan");
var cors = require('cors');
var path = require("path");
var createError = require("http-errors");
var indexRoute = require('./routes/index');
const mongoose = require("mongoose");

require('dotenv').config();

// const url = "mongodb+srv://insureme:cWBvRJVcvDxBddsx@insureme.bnj4f.mongodb.net/medPiper?retryWrites=true&w=majority"
mongoose.connect(`${process.env.MONGO_DB_USERNAME}${process.env.MONGO_DB_PASSWORD}${process.env.MONGO_DB_URL}`,
  { useNewUrlParser: true },
  () => console.log("conntext to db"));
app.use(cors())
app.use(logger("dev"))
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static("public"))
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/v1', indexRoute)

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3100, () => console.log("Server Up and running"));
module.exports = app;