app.api.example = {
	add: function(settings) {
		app.api.ajax({
			url: '/example',
			type: 'POST',
			data: settings.data
		}, settings);
	},
	update: function(settings) {
		app.api.ajax({
			url: '/example/' + settings.data.id,
			type: 'PUT',
			data: settings.data
		}, settings);
	},
	view: function(settings) {
		app.api.ajax({
			url: '/example/' + settings.data.id,
			type: 'GET'
		}, settings);
	},
	search: function(settings) {
		app.api.ajax({
			url: '/example/search',
			type: 'GET',
			data: settings.data
		}, settings);
	}
};
