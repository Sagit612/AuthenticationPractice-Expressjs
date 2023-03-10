const express = require('express');
const path = require('path');
var flash = require('connect-flash');
var mongoose = require("mongoose");
var session = require("express-session");
var cookieParser = require('cookie-parser');
var passport = require('passport')
var bodyParser = require('body-parser');

var setUpPassport = require("./setuppassport");
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');



var app = express();

mongoose.connect("mongodb://localhost:27017/test");
setUpPassport();

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.use(session({
    secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
    resave: true,
    saveUninitialized: true
  }));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.listen(app.get("port"), () => {
    console.log("Server started on port " + app.get("port"));
});