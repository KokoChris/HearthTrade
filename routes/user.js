const express = require('express');
const router = express.Router();
const User = require('../models/user');




router.get('/', (req, res) => {
    User.find({})
        .then(users => { res.render('profiles/index', { profiles: users }) })
        .catch(err => { console.log(err) })
});

router.get('/all', (req, res) => {
    User.find({})
        .select('cards')
        .then(data => res.send(data))
})

router.get('/:userID', (req, res) => {

    let userId = req.params.userID;

    User.findById(userId, { '_id': 0, 'cards': 0, '__v': 0 })
        .then(user => { res.render('profiles/show', {profile:user}) })
        .catch(err => { console.log(err) })
})
router.get('/:userID/collection', (req, res) => {
    let userId = req.params.userID;
    User.findById(userId)
        .select('cards')
        .then(cards => {
           
            res.render('cards/collection', { profile: cards })
        })
        .catch(err => { console.log(err) })
})

router.get('/:userID/edit', (req, res) => {
    let userId = req.params.userID;


    User.findById(userId)
        .then(user => {

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








module.exports = router;
