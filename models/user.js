const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const {PASSWORD_VALDATION_REGEX, EMAIL_VALIDATION_REGEX} = require('../utils');

const User = mongoose.model('User', mongoose.Schema({
    username: 	{type: String, required: true, index: true},
    password: 	{type: String, required: true, match: PASSWORD_VALDATION_REGEX},
	email:		{type: String, required: true, match: EMAIL_VALIDATION_REGEX, lowercase: true, trim: true, unique: true},
	name:		{type: String, required: true, lowercase: true, trim: true},
	registrationDate: {type: Data, default: Date.now}
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