const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	role: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model('User', userSchema);
