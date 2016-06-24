const express = require('express');
const router =   express.Router();
const User =  require('../models/user');




router.get('/' , (req,res) => {

		User.find({})
			.then(users => { res.send(users)})
			.catch(err => {console.log(err)})
});

router.get('/:userID', (req,res) => {
	
	let userId = req.params.userID;

	User.findById(userId)
		.then(user => {res.send(user)})
		.catch(err => {console.log(err)})
})








module.exports = router;