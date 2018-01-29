window.Api = function(opt){
	if(!opt) return;
	if(!opt.url){
		alert("url lost!");
	} else {
		this.url = opt.url;
	}
}

window.Api.prototype = {
	get: function(data, cb){
		var method = "GET";
		return this.getdata(method, data, cb);
	},
	getdata: function(method, data, sc, shortTimeWaiting){
		var timeout = shortTimeWaiting || 60 * 1000;
		return $.ajax({
			type: method,
			url: this.url,
			data: data,
			timeout: timeout,
			success: function(ret){
				sc && sc(ret);
			},
			error: function(ret){
				sc && sc(ret);
			}
		});
	},
	getAjax: function(data){
		var method = "GET";
		return $.ajax({
			type: method,
			url: this.url,
			data: data || ""
		});
	}
}

//ajax全局配置
$.ajaxSetup({
	cache: false,
	timeout: 60*1000
});