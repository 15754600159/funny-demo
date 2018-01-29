app.api.appApiFunction = {
	add: function(settings) {
		app.api.ajax({
			url: '/appApiFunction',
			type: 'POST',
			data: settings.data
		}, settings);
	},
	update: function(settings) {
		app.api.ajax({
			url: '/appApiFunction',
			type: 'PUT',
			data: settings.data
		}, settings);
	},
	del: function(settings) {
		app.api.ajax({
			url: '/appApiFunction/' + settings.data.id,
			type: 'DELETE'
		}, settings);
	},
	view: function(settings) {
		app.api.ajax({
			url: '/appApiFunction/' + settings.data.id,
			type: 'GET'
		}, settings);
	},
	search: function(settings) {
		app.api.ajax({
			url: '/appApiFunction/search',
			type: 'GET',
			data: settings.data
		}, settings);
	},
	listApi: function(settings) {
		app.api.ajax({
			url: '/appApiFunction/listApi',
			type: 'GET',
			data: settings.data
		}, settings);
	},
	save: function(settings) {
		app.api.ajax({
			url: '/appApiFunction/save',
			type: 'POST',
			data: settings.data
		}, settings);
	}
};
