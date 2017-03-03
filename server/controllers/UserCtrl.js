// APP //
var app = require('./../index');
var db = app.get('db');

module.exports = {
	// RETURN CURRENT USER //
	me: function(req, res, next) {
		// Return user
		return res.status(200)
			.json(req.user);
	},

	// UPDATE CURRENT USER //
	updateCurrent: function(req, res, next) {
		var updateUser = req.body;
		updateUser.user_id = req.user.user_id;

		db.users.save(updateUser, function(err, user) {
			if (err) {
				console.log('User update error', err);

				return res.status(401)
					.send(err);
			}

			console.log('user: ', user);
			req.session.passport.user = user;

			res.status(200)
				.send(user);
		});
	}
};
