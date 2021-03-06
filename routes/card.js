'use strict';
const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const config = require('../config');
const User = require('../models/user');

const apiKey = config.hearthstoneApiKey;
const apiBaseUrl = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/'


router.get('/', (req, res) => {

    let searchTerm = req.query.card;
    let url = apiBaseUrl + "search/" + searchTerm;
    let requestOptions = {
        url: url,
        headers: {
            'X-Mashape-Key': apiKey

        },
        qs: {
            collectible: 1
        }
    }

    rp(requestOptions)
        .then(cards => {
            let parsedCards = JSON.parse(cards);
            res.render('cards/index', { cards: parsedCards });
        })
        .catch(error => {
            if (error.statusCode === 404) {
                res.redirect('users')//add flash message
            }
        });

});

router.get('/all', (req, res) => {

    User.find({})
        .select('cards')
        .then(users => {

            let cards = users.map((user) => {

                return user.cards
            })

            let mergedCards = [].concat.apply([], cards);
            console.log(mergedCards)
            res.render('cards/allUsers', { cards: mergedCards });
        })
        .catch(err => { console.log(err) })


})

router.post('/add', isLoggedIn, (req, res) => {

    // need to handle a post
    let userId = req.user._id;

    User.findById(userId)
        .then(user => {
            user.cards.push(req.body)
            user.save();
            res.status(200).send({ message: 'Card was successfuly added to your collection!!!' });
        })
        .catch(err => {
            console.log(err);
        })

})




function isLoggedIn(req, res, next) {

    if (req.user) {
        next();
    } else {

        res.status(301).send({ message: 'You need to be logged in to perform this action' })
    }
}



module.exports = router;
