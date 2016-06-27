const express = require('express');
const router = express.Router();
const User = require('../models/user');




router.get('/', (req, res) => {
    //need to render a list of users somewhere, not sure yet
    User.find({})
        .then(users => { res.render('profiles/index', { profiles: users }) })
        .catch(err => { console.log(err) })
});

router.get('/:userID', (req, res) => {
    //show the profile page 
    let userId = req.params.userID;

    User.findById(userId,{ '_id': 0, 'cards': 0, '__v': 0 })
        .then(user => { res.send(user) })
        .catch(err => { console.log(err) })
})
router.get('/:userID/collection', (req, res) => {
    let userId = req.params.userID;
    User.findById(userId)
        .select('-_id')
        .select('cards')
        .then(cards => { res.send(cards) })
        .catch(err => { console.log(err) })
})

router.get('/:userID/edit', (req, res) => {
    let userId = req.params.userID;


    User.findById(userId)
        .then(user => {
            console.log(user);
            res.render('profiles/edit', { profile: user })
        })
        .catch(err => {
            console.log(err)
        })
})

router.put("/:userID", (req, res) => {

    let userId = req.params.userID;
    User.findByIdAndUpdate(userId, req.body.profile)
        .then(user => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
        })
})

router.delete("/:userID/", (req, res) => {
    let userId = req.params.userID;
    User.findByIdAndRemove(userId)
        .then(res.redirect('back'))
        .catch(err => {
            console.log(err);
        })
});




//need to secure routes



module.exports = router;
