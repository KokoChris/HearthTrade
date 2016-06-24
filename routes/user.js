const express = require('express');
const router =   express.Router();
const User =  require('../models/user');



router.get('/' , (req,res) => {
	User.find({}, (err,users) =>  {
		if(err){
			console.log(err);
		} else {
			res.send(users);
		}
	})
});

router.get('/:userID', (req,res)=> {
	//
	let userId = req.params.userID;

	User.findById(userId, (err, user)=> {
		if (err) {
			console.log(err)
		} else {
			res.send(user)
		}
	})
})

















module.exports = router;