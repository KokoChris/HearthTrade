const express = require('express');
const router = express.Router();
const User = require('../models/user');






router.post('/', (req, res) => {

    let cardId = req.body.id;
    let buyerId =  req.user._id;
     User.find().elemMatch('cards',{_id:cardId}).then( seller => {
     	this.seller = seller[0];
     	this.seller.incomingTrades.push({
     		card: cardId,
    		otherUser: buyerId
     	})
     	this.seller.save();

     	return  new Promise( (resolve,reject) => {
    		resolve( this.seller._id)
    	});

    }).then( sellerId  => {

       User.find({ _id : buyerId})
	    	.then( buyer => {
	    		
	    		buyer[0].outgoingTrades.push({
	    			card: cardId,
	    			otherUser: sellerId
	    		})

	    		buyer[0].save();
	    	})

 	})
 	.catch(err => {
 		console.log(err)
 	})
    
    // find seller and creating incoming request
   

    

    res.send({message:'Trade Requested!!!',


    });

})



module.exports = router;
