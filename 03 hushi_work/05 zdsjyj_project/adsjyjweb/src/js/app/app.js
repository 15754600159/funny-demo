/* eslint-disable no-redeclare */
var app = {};

app.init = function() {
	$('#layuicss-layer').remove()
	// 检查用户是否已经登录
	//app.login.checkLogin(function(isLogined) {
	//	if (isLogined) {
	app.main.open();
	//	}
	//});
};
app.data = function(data) {
	if (!data || data == '') {
		return '';
	} else {
		return data;
	}
};
app.urls = function() {
	var url = window.location.href;
	if (url.indexOf('#') > -1) {
		url = url.split("/#")[0];
		return url;
	}
	return url;
},
