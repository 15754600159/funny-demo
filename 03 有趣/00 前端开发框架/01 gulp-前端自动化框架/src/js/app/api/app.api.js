/* global app:false*/
app.api = {

	url: '/api',

	xhrMap: {}, // 保存xhr对象

	abort: function() {
		var id;
		var xhr;
		for (id in app.api.xhrMap) {
			xhr = app.api.xhrMap[id];
			if (xhr) {
				xhr.abort();
			}
		}
		app.loading.hide();
	},

	ajax: function(options, callback) {
		var settings = {
			url: options.fullUrl || (app.api.url + options.url),
			type: options.type,
			method: options.type,
			cache: callback.cache,
			contentType: 'application/json',
			dataType: 'json',
			xhrFields: {
				withCredentials: true
			},
			// 90秒超时
			timeout: 90000,
			processData: false,
			success: callback.success,
			error: function(XHR) {
				app.loading.hide();
				if (XHR.status === 401) {
					app.login.open();
					return false;
				} else if (XHR.status === 403) {
					app.alert('权限错误', '错误');
					return false;
				}
			},
			beforeSend: function(XHR) {
				var id = Date.now() + Math.random();
				XHR.id = id;
				app.api.xhrMap[id] = XHR;
				if (callback.beforeSend) {
					callback.beforeSend(XHR);
				}
			},
			complete: function(XHR) {
				var id = XHR.id;
				delete app.api.xhrMap[id];

				if (!XHR) {
					// abort
					app.loading.hide();
				}

				if (callback.complete) {
					callback.complete(XHR);
				}
			}
		};

		if (callback.error) {
			settings.error = callback.error;
		}
		if (callback.complete) {
			settings.complete = callback.complete;
		}

		var $d = $m;

		if (options.data) {
			if (options.type.toUpperCase() === 'GET') {
				if ($m) {
					settings.data = $m.serialize(options.data);
				} else {
					settings.data = $d.serializeObject(options.data);
				}
			} else {
				settings.data = JSON.stringify(options.data);
			}
		}

		return $d.ajax(settings);
	},

	error: function(XHR) {
		app.loading.hide();
		if (XHR.status === 401) {
			app.login.open();
			return false;
		} else if (XHR.status === 403) {
			app.alert('权限错误', '错误');
			return false;
		}
		try {
			var result = JSON.parse(XHR.responseText);
			if (result) {
				app.alert(result.msg, '错误');
			}
		} catch (e) {
			if (XHR.status === 400) {
				app.alert('请求错误', '错误');
				return false;
			}
			app.alert('无法连接服务，请稍后再试', '网络异常');
		}
	}
};
