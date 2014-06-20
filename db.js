// libs
var Bookshelf = require('bookshelf');

var config = {
	host: 'localhost', 
	user: 'root',
	password: '',
	database: 'dbAircraftUpgrade',
	charset: 'UTF8_GENERAL_CI'
};

var DB = Bookshelf.initialize({
	client: 'mysql', 
	connection: config
});

// exports
// DB
module.exports.DB = DB;