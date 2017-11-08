app.api.func = {
	add: function(settings) {
		app.api.ajax({
			url: '/function',
			type: 'POST',
			data: settings.data
		}, settings);
	},
	update: function(settings) {
		app.api.ajax({
			url: '/function',
			type: 'PUT',
			data: settings.data
		}, settings);
	},
	del: function(settings) {
		app.api.ajax({
			url: '/function/' + settings.data.id,
			type: 'DELETE'
		}, settings);
	},
	view: function(settings) {
		app.api.ajax({
			url: '/function/' + settings.data.id,
			type: 'GET'
		}, settings);
	},
	search: function(settings) {
		app.api.ajax({
			url: '/function/search',
			type: 'GET',
			data: settings.data
		}, settings);
	},
	importFromExcel: function(settings) {
		app.api.ajax({
			url: '/function/importFromExcel',
			type: 'GET',
			data: settings.data
		}, settings);
	}
};
