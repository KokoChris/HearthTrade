const express = require('express');
const router = express.Router();
const User = require('../models/user');






router.get('/incoming' , (req,res) => {

   let userId = req.user._id;
   User.findById(userId)
        .select('incomingTrades')
        .then(user => {

          res.send( user.incomingTrades)
        })

})

router.get('/outgoing' , (req,res) => {
    let userId = req.user._id;
     User.findById(userId)
        .select('outgoingTrades')
        .then(user => {
          
          res.send( user.outgoingTrades)
        })
})




router.post('/', (req, res) => {

 
  let sellerCardId = req.body.cards.scard;
  let buyerCardId = req.body.cards.bcard;

  let findSeller = User.find().elemMatch('cards',{_id: sellerCardId})
  let findBuyer = User.find().elemMatch('cards',{_id: buyerCardId})

  Promise.all([findBuyer,findSeller])
    .then(results => {

      let buyer  = results[0][0];
      let seller = results[1][0];
      let sellerCard  = seller.cards.filter( card => {
         return card._id == sellerCardId
      })[0];
      let buyerCard = buyer.cards.filter( card => {
        return card._id ==buyerCardId;
      })[0];


      buyer.outgoingTrades.push({
        cards: [sellerCard,buyerCard],
        otherUser: seller._id
      })
      seller.incomingTrades.push({
        cards:[sellerCard,buyerCard],
        otherUser: buyer._id
      })
      buyer.save();
      seller.save();
      res.send({ redirect: '/users'})

    })

  

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
