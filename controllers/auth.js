const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = (req, res) => {
	User.find({
		email: req.body.email,
	}).then((docs) => {
		if (docs.length != 0) {
			return res.status(409).json({
				error: 'Authorization Error',
			});
		}
		bcrypt.hash(req.body.password, 10, (error, hashPassword) => {
			if (error) {
				return res.status(400).json({
					error: error,
				});
			}
			new User({
				email: req.body.email,
				password: hashPassword,
			})
				.save()
				.then((docs) => {
					return res.json({
						_id: docs._id,
						email: req.body.email,
					});
				})
				.catch((error) => {
					res.status(400).json({
						error: error,
					});
				});
		});
	});
};

exports.loginUser = (req, res) => {
	User.find({ email: req.body.email })
		.then((docs) => {
			if (docs.length == 0) {
				return res.status(400).json({
					error: 'Miss match Email or Password',
				});
			}
			bcrypt
				.compare(req.body.password, docs[0].password)
				.then((result) => {
					if (!result) {
						return res.status(400).json({
							error: 'Miss match Email or Password',
						});
					}
					docs[0].password = undefined;

					//Token
					const token = jwt.sign(
						{
							email: docs[0].email,
							_id: docs[0]._id,
						},
						'secretCode',
						{
							expiresIn: '1h',
						},
					);
					return res.status(200).json({
						message: 'Login in Successfull',
						token: token,
						user: docs[0],
					});
				})
				.catch((error) => res.status(400).json({ error: error }));
		})
		.catch((error) => res.status(400).json({ error: error }));
};
