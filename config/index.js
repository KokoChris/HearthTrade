if (process.env.NODE_ENV) {
	//pending configuration for production

} else {
	module.exports = require("./development.json")
}