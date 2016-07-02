const express = require('express');
const router = express.Router();
const User = require('../models/user');






router.get('/incoming', (req, res) => {

    let userId = req.user._id;
    User.findById(userId)
        .select('incomingTrades')
        .then(user => {
            res.render('trades/incoming', { 'incomingTrades': user.incomingTrades })
        })

})

router.get('/outgoing', (req, res) => {
    let userId = req.user._id;
    User.findById(userId)
        .select('outgoingTrades')
        .then(user => {

            res.send(user.outgoingTrades)
        })
})

router.post('/incoming', (req, res) => {


    let tradeId = req.body.tradeId;
    User.find().elemMatch('incomingTrades', { _id: tradeId })
        .then(user => {
            let trades = user[0].incomingTrades;
            let trade = trades.filter(trade => {
                return trade._id == tradeId;
            })[0];

            let sellerCardId = trade.cards[0]._id;
            let buyerCardId = trade.cards[1]._id;

            let findSeller = User.find().elemMatch('cards', { _id: sellerCardId })
            let findBuyer = User.find().elemMatch('cards', { _id: buyerCardId })

            return [findSeller, findBuyer]

        })
        .then(queries => {
            return Promise.all(queries)

        })
        .then(results => {

            let seller = results[0][0];
            let buyer = results[1][0];

            let trades = seller.incomingTrades;

            let trade = trades.filter(trade => {
                return trade._id == tradeId;
            })[0];

            let sellerCardId = trade.cards[0]._id;
            let buyerCardId = trade.cards[1]._id;

            let sellerCard = seller.cards.filter(card => {


                return JSON.stringify(card._id) == JSON.stringify(sellerCardId);
            })[0];
            let buyerCard = buyer.cards.filter(card => {

                return JSON.stringify(card._id) == JSON.stringify(buyerCardId);

            })[0];
            seller.cards.push(buyerCard);
            buyer.cards.push(sellerCard);
            //the trade has happened but the users still have their old cards

            let sellerCardIndex = seller.cards.indexOf(sellerCard);
            let buyerCardIndex = buyer.cards.indexOf(buyerCard);
            let incomingTradeIndex = seller.incomingTrades.indexOf(trade);

            seller.cards.splice(sellerCardIndex, 1);
            buyer.cards.splice(buyerCardIndex, 1);
            seller.incomingTrades.splice(incomingTradeIndex, 1);

            //now the cards and the incoming trade is gone and we only have to erase the outgoing trade of the buyer
            let outgoingTrade = buyer.outgoingTrades.filter(trade => {
            	
                return JSON.stringify(trade.otherUser) == JSON.stringify(seller._id) && JSON.stringify(trade.cards[0]) == JSON.stringify(sellerCard)  &&  JSON.stringify(trade.cards[1]) == JSON.stringify(buyerCard);

            })[0];
            let outgoingTradeIndex = buyer.outgoingTrades.indexOf(outgoingTrade);
            buyer.outgoingTrades.splice(outgoingTradeIndex,1);

              buyer.save();
              seller.save();




        })
        .catch(err => console.log(err))

})




router.post('/', (req, res) => {

    console.log('hey')
    let sellerCardId = req.body.cards.scard;
    let buyerCardId = req.body.cards.bcard;

    let findSeller = User.find().elemMatch('cards', { _id: sellerCardId })
    let findBuyer = User.find().elemMatch('cards', { _id: buyerCardId })

    Promise.all([findBuyer, findSeller])
        .then(results => {

            let buyer = results[0][0];
            let seller = results[1][0];
            let sellerCard = seller.cards.filter(card => {
                return card._id == sellerCardId
            })[0];
            let buyerCard = buyer.cards.filter(card => {
                return card._id == buyerCardId;
            })[0];


            buyer.outgoingTrades.push({
                cards: [sellerCard, buyerCard],
                otherUser: seller._id
            })
            seller.incomingTrades.push({
                cards: [sellerCard, buyerCard],
                otherUser: buyer._id
            })
            buyer.save();
            seller.save();
            res.send({ redirect: '/users' });

        })
        .catch(err => {
            console.log(err);
        })



})


router.get('/new', (req, res) => {

    let requestedCardId = req.query.requestedCardId;

    let findSeller = User.find().elemMatch('cards', { _id: requestedCardId })
    let findBuyer = User.find({ _id: req.user._id });

    Promise.all([findSeller, findBuyer])
        .then(results => {
            let buyerCards = results[1][0].cards;
            let sellerCards = results[0][0].cards;
            let sellerCard = sellerCards.filter(card => {

                return card._id == requestedCardId
            })
            res.render('trades/new', { buyerCards, sellerCard })
        })
})



module.exports = router;
