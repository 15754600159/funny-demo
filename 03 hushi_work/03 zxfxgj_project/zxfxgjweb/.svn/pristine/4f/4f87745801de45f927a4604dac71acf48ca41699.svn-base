app.api.department = {
	add: function(settings) {
		app.api.ajax({
			url: '/department',
			type: 'POST',
			data: settings.data
		}, settings);
	},
	update: function(settings) {
		app.api.ajax({
			url: '/department',
			type: 'PUT',
			data: settings.data
		}, settings);
	},
	del: function(settings) {
		app.api.ajax({
			url: '/department/' + settings.data.id,
			type: 'DELETE'
		}, settings);
	},
	view: function(settings) {
		app.api.ajax({
			url: '/department/' + settings.data.id,
			type: 'GET'
		}, settings);
	},
	search: function(settings) {
		app.api.ajax({
			url: '/department/search',
			type: 'GET',
			data: settings.data
		}, settings);
	},
	importFromExcel: function(settings) {
		app.api.ajax({
			url: '/department/importFromExcel',
			type: 'GET',
			data: settings.data
		}, settings);
	}
};
