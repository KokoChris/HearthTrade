var  mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = global.Promise

var UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    city:String,
    fullname:String,
    state:String,
    cards: [{
    	name: String,
    	img: String,
    	flavor: String,

    }]
    outgoingTrades:[{
        card: String,
        otherUser: String
    }]
    incomingTrades:[{
        card: String,
        otherUser: String
    }]

});




UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
