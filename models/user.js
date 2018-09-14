const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const User = mongoose.model('User', mongoose.Schema({
    username: 	{type: String, index: true},
    password: 	{type: String},
	email:		{type: String},
	name:		{type: String}
}));

User.prototype.validatePassword = async function(candidatePassword) {
	return bcryptjs.compare(candidatePassword, this.password);
}

module.exports.createUser = async function ({username, password, email, name}) {
	const user = new User({username, password, email, name});
	try {
		const salt = await bcryptjs.genSalt();
		const hashedPassword = await bcryptjs.hash(password, salt);
	
		user.password = hashedPassword;
		return user.save();
	}
	catch(err) { throw err; }
}

module.exports.User = User;