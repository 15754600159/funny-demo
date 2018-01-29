app.api.roleFunction = {
	add: function(settings) {
		app.api.ajax({
			url: '/roleFunction',
			type: 'POST',
			data: settings.data
		}, settings);
	},
	update: function(settings) {
		app.api.ajax({
			url: '/roleFunction',
			type: 'PUT',
			data: settings.data
		}, settings);
	},
	del: function(settings) {
		app.api.ajax({
			url: '/roleFunction/' + settings.data.id,
			type: 'DELETE'
		}, settings);
	},
	view: function(settings) {
		app.api.ajax({
			url: '/roleFunction/' + settings.data.id,
			type: 'GET'
		}, settings);
	},
	search: function(settings) {
		app.api.ajax({
			url: '/roleFunction/search',
			type: 'GET',
			data: settings.data
		}, settings);
	},
	save: function(settings) {
		app.api.ajax({
			url: '/roleFunction/save',
			type: 'POST',
			data: settings.data
		}, settings);
	}
};
