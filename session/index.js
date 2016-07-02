'use strict';
const session = require('express-session');
const config = require('../config');
// should add - connect-mongo to save sessions

module.exports = session({
	secret: config.sessionSecret,
	resave: false,
	saveUninitialized:false
})