app.alert = function(message, title, callback) {
	$m.message(message);
	if (callback) {
		callback();
	}
};
