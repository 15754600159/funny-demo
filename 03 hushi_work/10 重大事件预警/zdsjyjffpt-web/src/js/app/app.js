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
app.sp = function(data) {
	if (data == '01') {
		return '未审批'
	};
	if (data == '02') {
		return '审批通过'
	};
	if (data == '03') {
		return '审批未通过'
	}
};
app.yx = function(data) {
	if (data == 0) {
		return '有效'
	};
	if (data == 1) {
		return '无效'
	}
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
}

app.ajaxCount = 0; //记录ajax的计数器，为0的时候，请求全部完成；
// 获取页面所需码表信息，并存储到 app.constants.js中
app.getDictInfo = function() {
	app.loading.show(); // 显示loading
	// 请求一般码表数据
	const dictArray = app.constants.zdsjyj_dict_array;
	app.api.dataDict.getDictInfo({
		data: {
			// 去除 'sjmgsd'涉及敏感时点 的数去请求，因为敏感时点数据在getPersonCategoryDictInfo中请求
			types: dictArray.slice(0, dictArray.length-1).join(','), 
		},
		success: (result) => {
			// console.log(result);
			if (result.success === 0) {
				app.alert('获取码表信息失败！');
				// app.loading.hide(); // 隐藏loading
				return;
			}

			for (let [key, value] of Object.entries(result.msg)) {
				app.constants[key] = {};
				app.constants[key].nameMap = {};
				app.constants[key].keyMap = {};
				for (let elem of value) {
					app.constants[key].nameMap[elem.code] = elem.name;
					app.constants[key].keyMap[elem.name] = elem.code;
				}
			}
			// console.log(app.constants);
		}
	});

	// 请求涉事类别数据，并存储到 app.constants.js中 
	app.api.dataDict.getListSslb({
		success: (result) => {
			// console.log(result);
			app.constants.sslbTreeData = result;

			app.constants.sslb = {};
			app.constants.sslb.nameMap = {};
			app.constants.sslb.keyMap = {};
			for (let elem of result) {
				app.constants.sslb.nameMap[elem.sslb] = elem.qtlbmc;
				app.constants.sslb.keyMap[elem.qtlbmc] = elem.sslb;
			}
		}
	});

	// 请求人员类别数据，并存储到 app.constants.js中 
	app.api.dataDict.getPersonCategoryDictInfo({
		success: (result) => {
			// console.log(result);
			if (result.success === 0) {
				app.alert('获取人员类别码表信息失败！');
				// app.loading.hide(); // 隐藏loading
				return;
			}

			app.constants.rylbTreeData = result.msg;

			app.constants.personCategory = {};
			app.constants.personCategory.nameMap = {};
			app.constants.personCategory.keyMap = {};
			for (let elem of result.msg) {
				app.constants.personCategory.nameMap[elem.code] = elem.name;
				app.constants.personCategory.keyMap[elem.name] = elem.code;
			}
		}
	});

	// 请求敏感时期数据，并存储到 app.constants.js中 
	app.api.dataDict.getSensitivePeriod({
		success: (result) => {
			// console.log(result);
			if (result.success === 0) {
				app.alert('获取敏感时期码表信息失败！');
				// app.loading.hide(); // 隐藏loading
				return;
			}

			app.constants.mgsqFullData = result.msg;

			app.constants.sjmgsd = {};
			app.constants.sjmgsd.nameMap = {};
			app.constants.sjmgsd.keyMap = {};
			for (let elem of result.msg) {
				app.constants.sjmgsd.nameMap[elem.id] = elem.sensitivePName;
				app.constants.sjmgsd.keyMap[elem.sensitivePName] = elem.id;
			}
		}
	});

	// 请求采集单位数据，并存储到 app.constants.js中 
	app.api.dataDict.getCjdw({
		success: (result) => {
			// console.log(result);

			app.constants.cjdwTreeData = result;

			app.constants.cjdw = {};
			app.constants.cjdw.nameMap = {};
			app.constants.cjdw.keyMap = {};
			for (let elem of result) {
				app.constants.cjdw.nameMap[elem.code] = elem.name;
				app.constants.cjdw.keyMap[elem.name] = elem.code;
			}
		}
	});


};
