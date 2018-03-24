$(function() {

    // 预设
    const ajax = function(options, callback) {
		var settings = {
			url: options.url,
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
			// success: callback.success,
			error: function(XHR) {
				console.log('error', XHR)
			},
			complete: function(XHR) {
				console.log('complate')
			}
		};

		if (callback.error) {
			settings.error = callback.error;
		}
		if (callback.complete) {
			settings.complete = callback.complete;
		}

		return $.ajax(settings);
	};

    // 接口层
    const viewXsycyjjcpzList = function(settings) {
		return ajax({
			url: '/data',
			type: 'GET',
			data: settings.data,
		}, settings);
	};

    // app层
    // viewXsycyjjcpzList({
    //     data: {
    //         a: 1,
    //         b: 2,
    //     },
    // }).done(function(result) {
    //     console.log('result', result);
    // });

    async function getData() {
        const result = await viewXsycyjjcpzList({
            data: {
                a: 1,
                b: 2,
            },
        });

        console.log(result);
    };

    getData();

})