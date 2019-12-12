app.api.example = {
	add(options) {
		return app.api.ajax({
			...options,
			url: '/example',
			type: 'POST',
		});
	},
	update(options) {
		return app.api.ajax({
			...options,
			url: '/example',
			type: 'PUT',
		});
	},
	view(options) {
		return app.api.ajax({
			...options,
			url: '/example',
			type: 'GET',
		});
	},
};
