app.api.user = {
	loginUser: function(settings) {
		app.api.ajax({
			url: '/user/loginUser',
			type: 'GET'
		}, settings);
	},
	listFunctions: function(settings) {
		app.api.ajax({
			url: '/user/listFunctions',
			type: 'GET'
		}, settings);
	},
	add: function(settings) {
		app.api.ajax({
			url: '/user',
			type: 'POST',
			data: settings.data
		}, settings);
	},
	update: function(settings) {
		app.api.ajax({
			url: '/user',
			type: 'PUT',
			data: settings.data
		}, settings);
	},
	view: function(settings) {
		app.api.ajax({
			url: '/user/' + settings.data.id,
			type: 'GET'
		}, settings);
	},
	search: function(settings) {
		app.api.ajax({
			url: '/user/search',
			type: 'GET',
			data: settings.data
		}, settings);
	},
	del: function(settings) {
		app.api.ajax({
			url: '/user/delete',
			type: 'GET',
			data: settings.data
		}, settings);
	},
	enable: function(settings) {
		app.api.ajax({
			url: '/user/enable',
			type: 'GET',
			data: settings.data
		}, settings);
	},
	disable: function(settings) {
		app.api.ajax({
			url: '/user/disable',
			type: 'GET',
			data: settings.data
		}, settings);
	},
	resetPassword: function(settings) {
		app.api.ajax({
			url: '/user/resetPassword',
			type: 'PUT',
			data: settings.data
		}, settings);
	}
};
