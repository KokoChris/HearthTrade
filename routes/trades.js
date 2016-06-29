const express = require('express');
const router = express.Router();
const User = require('../models/user');






router.post('/', (req, res) => {
    let cardId = req.body.id;
    let buyer =  req.user._id;

    console.log(seller)

    res.send('tada');

})



module.exports = router;
