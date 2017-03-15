// APP //
var app = require('./../index');
var db = app.get('db');

module.exports = {
	// RETURN CURRENT USER //
	me: function(req, res, next) {
		if (!req.user) {
			return res.status(200).send(null);
		}

		// Return user
		return res.status(200).send(req.user);
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

			req.session.passport.user = user;

			res.status(200).send(user);
		});
	}
};
