app.api.dataDict = {
	add: function(settings) {
		app.api.ajax({
			url: '/dataDict',
			type: 'POST',
			data: settings.data
		}, settings);
	},
	update: function(settings) {
		app.api.ajax({
			url: '/dataDict',
			type: 'PUT',
			data: settings.data
		}, settings);
	},
	del: function(settings) {
		app.api.ajax({
			url: '/dataDict/' + settings.data.id,
			type: 'DELETE'
		}, settings);
	},
	view: function(settings) {
		app.api.ajax({
			url: '/dataDict/' + settings.data.id,
			type: 'GET'
		}, settings);
	},
	search: function(settings) {
		app.api.ajax({
			url: '/dataDict/search',
			type: 'GET',
			data: settings.data
		}, settings);
	},
	importFromExcel: function(settings) {
		app.api.ajax({
			url: '/dataDict/importFromExcel',
			type: 'GET',
			data: settings.data
		}, settings);
	}
};
