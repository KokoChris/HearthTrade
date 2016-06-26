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
        .catch(error => console.log(error));

});


router.post('/add' , (req, res) => {

	console.log(req.body)
	let userId = req.user._id;

	User.findById(userId)
		.then(user => {
			user.cards.push(req.body)
			user.save();
		})
		.catch(err => {
			console.log(err);
		})

})




module.exports = router;
