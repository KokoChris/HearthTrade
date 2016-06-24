'use strict';

const express = require('express');
const app  = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const methodOverride = require("method-override");
const session = require('./session');
const config = require('./config');
const LocalStrategy = require('passport-local');

const User = require('./models/user');

const authRoutes = require('./routes/auth');





app.use(express.static('public'));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req,res,next) {
	
	res.locals.currentUser = req.user;
	next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


mongoose.connect(config.dbURI);


app.set('view engine' , 'ejs');

app.use(authRoutes)

app.get('/' , (req, res ) => {
    
      res.render('landing');
});


app.listen(port , () => {
    console.log("Server running on port " + port);
});