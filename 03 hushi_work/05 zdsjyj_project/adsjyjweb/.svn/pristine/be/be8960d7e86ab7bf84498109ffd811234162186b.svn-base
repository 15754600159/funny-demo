app.select = {
	init: function(selector, optionDatas, defaultOption) {
		var optionHtml = '<option value="">请选择</option>';
		if (defaultOption) {
			optionHtml = '<option value="' + defaultOption.value + '">' + defaultOption.label + '</option>';

			if (defaultOption.empty) {
				optionHtml = '';
			}
		}
		for (var i in optionDatas) {
			optionHtml += '<option value="' + i + '">' + optionDatas[i] + '</option>';
		}
		$(selector).html(optionHtml);
	},
	initMap: function(selector, optionDatas, defaultOption) {
		var optionHtml = '<option value="">请选择</option>';
		if (defaultOption) {
			optionHtml = '<option value="' + defaultOption.value + '">' + defaultOption.label + '</option>';

			if (defaultOption.empty) {
				optionHtml = '';
			}
		}
		for (var i = 0; i < optionDatas.length; i++) {
			optionHtml += '<option value="' + optionDatas[i].value + '">' + optionDatas[i].label + '</option>';
		}
		$(selector).html(optionHtml);
	}
};
