if (process.env.NODE_ENV) {
	module.exports = {
    host:process.env.host || "",
    dbURI: process.env.dbURI,
    sessionSecret: process.env.sessionSecret,
    hearthstoneApiKey:process.env.hearthstoneApiKey
  }


} else {
	module.exports = require("./development.json")
}