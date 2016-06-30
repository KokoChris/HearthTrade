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
    
    res.send({message:'Trade Requested!!!',


    });

})


router.get('/new', (req,res) => {
   let requestedCardId = req.query.requestedCardId;
   
   let findSeller = User.find().elemMatch('cards',{_id:requestedCardId})
   let findBuyer = User.find({_id: req.user._id});

   Promise.all([findSeller,findBuyer])
   		.then(results => {
   			let buyerCards = results[1][0].cards;
   			let sellerCards = results[0][0].cards;
   			let sellerCard = sellerCards.filter( card => {
   				
   				return card._id == requestedCardId
   			})
   			res.render('trades/new',{buyerCards,sellerCard})
   		})
})	



module.exports = router;
