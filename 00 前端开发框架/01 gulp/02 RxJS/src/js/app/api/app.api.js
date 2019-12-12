/* global app:false*/
app.api = {
	// 用于统计未返回的ajax数
	noReturnAjaxCount: 0,

	url: '/api',

	xhrMap: {}, // 保存xhr对象

	// 用于页面初始化时，重置noReturnAjaxCount
	resetCount() {
		this.noReturnAjaxCount = 0;
	},

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

	ajax: function(options = {}) {
		var settings = {
			url: options.fullUrl || (app.api.url + options.url),
			type: options.type,
			method: options.type,
			cache: options.cache,
			contentType: 'application/json',
			dataType: 'json',
			xhrFields: {
				withCredentials: true
			},
			// 90秒超时
			timeout: 90000,
			processData: false,
			success: options.success,
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
				if (app.api.noReturnAjaxCount === 0) {
					app.loading.show(); // 显示loading
				}
				app.api.noReturnAjaxCount++;

				// var id = Date.now() + Math.random();
				// XHR.id = id;
				// app.api.xhrMap[id] = XHR;
				if (options.beforeSend) {
					options.beforeSend(XHR);
				}
			},
			complete: function(XHR) {
				// var id = XHR.id;
				// delete app.api.xhrMap[id];

				app.api.noReturnAjaxCount--;
				if (app.api.noReturnAjaxCount <= 0) {
					app.loading.hide(); // 隐藏loading
				}

				if (!XHR) {
					// abort
					app.loading.hide();
				}

				if (options.complete) {
					options.complete(XHR);
				}
			}
		};

		if (options.error) {
			settings.error = options.error;
		}
		if (options.complete) {
			settings.complete = options.complete;
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
