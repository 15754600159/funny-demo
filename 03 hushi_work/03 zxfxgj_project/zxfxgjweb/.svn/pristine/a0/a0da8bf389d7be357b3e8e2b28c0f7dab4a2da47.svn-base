app.api.userRole = {
	add: function(settings) {
		app.api.ajax({
			url: '/userRole',
			type: 'POST',
			data: settings.data
		}, settings);
	},
	update: function(settings) {
		app.api.ajax({
			url: '/userRole',
			type: 'PUT',
			data: settings.data
		}, settings);
	},
	del: function(settings) {
		app.api.ajax({
			url: '/userRole/' + settings.data.id,
			type: 'DELETE'
		}, settings);
	},
	view: function(settings) {
		app.api.ajax({
			url: '/userRole/' + settings.data.id,
			type: 'GET'
		}, settings);
	},
	search: function(settings) {
		app.api.ajax({
			url: '/userRole/search',
			type: 'GET',
			data: settings.data
		}, settings);
	},
	save: function(settings) {
		app.api.ajax({
			url: '/userRole/save',
			type: 'POST',
			data: settings.data
		}, settings);
	}
};
