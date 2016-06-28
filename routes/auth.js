const express = require('express');
const router =  express.Router();
const User = require('../models/user');
const passport = require('passport');


router.get('/signup' , (req,res) => {
	res.render('signup');
});

router.post('/signup', (req,res) => {
	let newUser = new User({ username: req.body.username});
	User.register(newUser, req.body.password, (err,user) => {
		if(err){
			res.render('signup')//add flash message
		} 

		passport.authenticate('local')(req,res, () => {
			res.redirect('/users')
		})
	})
})


router.get('/login', (req,res ) => {
	res.render('login');
})

router.post('/login', passport.authenticate("local",{
	
	successRedirect: "/users",
	failureRedirect: "/login"
	
	})
);

router.get('/logout', (req,res) => {
	req.logout();
	res.redirect('/');




})


module.exports = router;