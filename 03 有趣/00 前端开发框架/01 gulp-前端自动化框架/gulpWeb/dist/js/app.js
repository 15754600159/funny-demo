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

/* global app:false*/
app.api = {

	url: 'http://localhost:9999',
	// url: 'http://192.168.2.105:9999', //岁
	// url: 'http://192.168.1.103:9999', //祥

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
			complete: function(XHR) {
				if (!XHR) {
					// abort
					app.loading.hide();
				}
			}
		};

		if (callback.error) {
			settings.error = callback.error;
		}
		if (callback.complete) {
			settings.complete = callback.complete;
		}

		var $d = window.$ || $m;

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

app.api.application = {
	add: function(settings) {
		app.api.ajax({
			url: '/application',
			type: 'POST',
			data: settings.data
		}, settings);
	},
	update: function(settings) {
		app.api.ajax({
			url: '/application',
			type: 'PUT',
			data: settings.data
		}, settings);
	},
	del: function(settings) {
		app.api.ajax({
			url: '/application/' + settings.data.id,
			type: 'DELETE'
		}, settings);
	},
	view: function(settings) {
		app.api.ajax({
			url: '/application/' + settings.data.id,
			type: 'GET'
		}, settings);
	},
	search: function(settings) {
		app.api.ajax({
			url: '/application/search',
			type: 'GET',
			data: settings.data
		}, settings);
	}
};

app.api.dataDict = {
	add: function(settings) {
		app.api.ajax({
			url: '/dataDict',
			type: 'POST',
			data: settings.data
		}, settings);
	},
	update: function(settings) {
		app.api.ajax({
			url: '/dataDict',
			type: 'PUT',
			data: settings.data
		}, settings);
	},
	del: function(settings) {
		app.api.ajax({
			url: '/dataDict/' + settings.data.id,
			type: 'DELETE'
		}, settings);
	},
	view: function(settings) {
		app.api.ajax({
			url: '/dataDict/' + settings.data.id,
			type: 'GET'
		}, settings);
	},
	search: function(settings) {
		app.api.ajax({
			url: '/dataDict/search',
			type: 'GET',
			data: settings.data
		}, settings);
	},
	importFromExcel: function(settings) {
		app.api.ajax({
			url: '/dataDict/importFromExcel',
			type: 'GET',
			data: settings.data
		}, settings);
	}
};

app.api.department = {
	add: function(settings) {
		app.api.ajax({
			url: '/department',
			type: 'POST',
			data: settings.data
		}, settings);
	},
	update: function(settings) {
		app.api.ajax({
			url: '/department',
			type: 'PUT',
			data: settings.data
		}, settings);
	},
	del: function(settings) {
		app.api.ajax({
			url: '/department/' + settings.data.id,
			type: 'DELETE'
		}, settings);
	},
	view: function(settings) {
		app.api.ajax({
			url: '/department/' + settings.data.id,
			type: 'GET'
		}, settings);
	},
	search: function(settings) {
		app.api.ajax({
			url: '/department/search',
			type: 'GET',
			data: settings.data
		}, settings);
	},
	importFromExcel: function(settings) {
		app.api.ajax({
			url: '/department/importFromExcel',
			type: 'GET',
			data: settings.data
		}, settings);
	}
};

app.api.func = {
	add: function(settings) {
		app.api.ajax({
			url: '/function',
			type: 'POST',
			data: settings.data
		}, settings);
	},
	update: function(settings) {
		app.api.ajax({
			url: '/function',
			type: 'PUT',
			data: settings.data
		}, settings);
	},
	del: function(settings) {
		app.api.ajax({
			url: '/function/' + settings.data.id,
			type: 'DELETE'
		}, settings);
	},
	view: function(settings) {
		app.api.ajax({
			url: '/function/' + settings.data.id,
			type: 'GET'
		}, settings);
	},
	search: function(settings) {
		app.api.ajax({
			url: '/function/search',
			type: 'GET',
			data: settings.data
		}, settings);
	},
	importFromExcel: function(settings) {
		app.api.ajax({
			url: '/function/importFromExcel',
			type: 'GET',
			data: settings.data
		}, settings);
	}
};

app.api.kyrqdrypfx = {

    kyrqCxUrl: app.api.url + "/kyrq/doubtpeople/group/", //可疑人群查询接口
    kyrqXzUrl: app.api.url + "/kyrq/doubtpeople/group/", //可疑人群新增接口
    kyrqIdCxUrl: app.api.url + "/kyrq/doubtpeople/group/", //可疑人群根据id查询接口
    kyrqXgUrl: app.api.url + "/kyrq/doubtpeople/group/", //可疑人群修改接口
    kyrqScUrl: app.api.url + "/kyrq/doubtpeople/group/", //可疑人群删除接口

    kyryDrUrl: app.api.url + "/kyrq/doubtpeople/people/{kyrqbh}/people/file/", //可疑人员导入接口

    kyryCxUrl: app.api.url + "/kyrq/doubtpeople/people/", //可疑人员查询接口
    kyryXzUrl: app.api.url + "/kyrq/doubtpeople/people/", //可疑人员新增接口
    kyryIdCxUrl: app.api.url + "/kyrq/doubtpeople/people/", //可疑人员根据id查询接口
    kyryXgUrl: app.api.url + "/kyrq/doubtpeople/people/", //可疑人员修改接口
    kyryScUrl: app.api.url + "/kyrq/doubtpeople/people/", //可疑人员删除接口

};

app.api.role = {
	add: function(settings) {
		app.api.ajax({
			url: '/role',
			type: 'POST',
			data: settings.data
		}, settings);
	},
	update: function(settings) {
		app.api.ajax({
			url: '/role',
			type: 'PUT',
			data: settings.data
		}, settings);
	},
	del: function(settings) {
		app.api.ajax({
			url: '/role/' + settings.data.id,
			type: 'DELETE'
		}, settings);
	},
	view: function(settings) {
		app.api.ajax({
			url: '/role/' + settings.data.id,
			type: 'GET'
		}, settings);
	},
	search: function(settings) {
		app.api.ajax({
			url: '/role/search',
			type: 'GET',
			data: settings.data
		}, settings);
	}
};

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

app.api.userRole = {
	add: function(settings) {
		app.api.ajax({
			url: '/userRole',
			type: 'POST',
			data: settings.data
		}, settings);
	},
	update: function(settings) {
		app.api.ajax({
			url: '/userRole',
			type: 'PUT',
			data: settings.data
		}, settings);
	},
	del: function(settings) {
		app.api.ajax({
			url: '/userRole/' + settings.data.id,
			type: 'DELETE'
		}, settings);
	},
	view: function(settings) {
		app.api.ajax({
			url: '/userRole/' + settings.data.id,
			type: 'GET'
		}, settings);
	},
	search: function(settings) {
		app.api.ajax({
			url: '/userRole/search',
			type: 'GET',
			data: settings.data
		}, settings);
	},
	save: function(settings) {
		app.api.ajax({
			url: '/userRole/save',
			type: 'POST',
			data: settings.data
		}, settings);
	}
};

app.alert = function(message, title, callback) {
	$m.message(message);
	if (callback) {
		callback();
	}
};

/* eslint-disable quotes */
app.constants = {
	userStatus: {
		nameMap: {
			"0": "已删除",
			"1": "可用",
			"2": "禁用"
		},
		keyMap: {
			"已删除": "0",
			"可用": "1",
			"禁用": "2"
		}
	},
	// 数据字典类型
	dataDictType: {
		nameMap: {
			"10": "性别",
			"11": "籍贯",
			"12": "民族",
			"13": "政治面貌",
			"21": "警衔",
			"22": "职务",
		}
	},
	genderCode: {
		nameMap: {
			"1": "男",
			"2": "女",
			"3": "未知"
		}
	},
	// 政治面貌
	politicsStatus: {
		nameMap: {
			"1": "党员",
			"2": "团员",
			"3": "群众"
		}
	},
	//警衔
	policeRankCode: {
		nameMap: {
			"1": "总警监",
			"2": "副总警监",
			"3": "警监（一级）",
			"4": "警监（二级）",
			"5": "警监（三级）",
			"6": "警司（一级）",
			"7": "警司（二级）",
			"8": "警司（三级）",
			"9": "警员（一级）",
			"10": "警员（二级）"
		}
	},
	//职务
	positionCode: {
		nameMap: {
			"1": "一级警员",
			"2": "二级警员",
			"3": "三级警员",
			"4": "一级警长",
			"5": "二级警长",
			"6": "三级警长",
			"7": "四级警长"
		}
	},
	originCode: {
		nameMap: {
			"11": "北京市",
			"12": "天津市",
			"13": "河北省",
			"14": "山西省",
			"15": "内蒙古自治区",
			"21": "辽宁省",
			"22": "吉林省",
			"23": "黑龙江省",
			"31": "上海市",
			"32": "江苏省",
			"33": "浙江省",
			"34": "安徽省",
			"35": "福建省",
			"36": "江西省",
			"37": "山东省",
			"41": "河南省",
			"42": "湖北省",
			"43": "湖南省",
			"44": "广东省",
			"45": "广西壮族自治区",
			"46": "海南省",
			"50": "重庆市",
			"51": "四川省",
			"52": "贵州省",
			"53": "云南省",
			"54": "西藏自治区",
			"61": "陕西省",
			"62": "甘肃省",
			"63": "青海省",
			"64": "宁夏回族自治区",
			"65": "新疆维吾尔自治区",
			"71": "台湾省",
			"81": "香港特别行政区",
			"82": "澳门特别行政区"
		}
	},
	nationCode: {
		nameMap: {
			"01": "汉族",
			"02": "蒙古族",
			"03": "回族",
			"04": "藏族",
			"05": "维吾尔族",
			"06": "苗族",
			"07": "彝族",
			"08": "壮族",
			"09": "布依族",
			"10": "朝鲜族",
			"11": "满族",
			"12": "侗族",
			"13": "瑶族",
			"14": "白族",
			"15": "土家族",
			"16": "哈尼族",
			"17": "哈萨克族",
			"18": "傣族",
			"19": "黎族",
			"20": "傈僳族",
			"21": "佤族",
			"22": "畲族",
			"23": "高山族",
			"24": "拉祜族",
			"25": "水族",
			"26": "东乡族",
			"27": "纳西族",
			"28": "景颇族",
			"29": "柯尔克孜族",
			"30": "土族",
			"31": "达斡尔族",
			"32": "仫佬族",
			"33": "羌族",
			"34": "布朗族",
			"35": "撒拉族",
			"36": "毛难族",
			"37": "仡佬族",
			"38": "锡伯族",
			"39": "阿昌族",
			"40": "普米族",
			"41": "塔吉克族",
			"42": "怒族",
			"43": "乌孜别克族",
			"44": "俄罗斯族",
			"45": "鄂温克族",
			"46": "崩龙族",
			"47": "保安族",
			"48": "裕固族",
			"49": "京族",
			"50": "塔塔尔族",
			"51": "独龙族",
			"52": "鄂伦春族",
			"53": "赫哲族",
			"54": "门巴族",
			"55": "珞巴族",
			"56": "基诺族",
			"97": "其他"
		}
	}
};

app.date = {
	shortDate: function(string) {
		var date = $m.date.toDate(string, 'yyyy-MM-dd');
		var now = new Date();

		var pattern = 'yyyy-MM-dd';
		if (date.getFullYear() === now.getFullYear()) {
			pattern = 'MM-dd';
			if (date.getMonth() === now.getMonth()) {
				if (date.getDate() === now.getDate()) {
					pattern = '今天';
				} else if (date.getDate() + 1 === now.getDate()) {
					pattern = '昨天';
				} else if (date.getDate() - 1 === now.getDate()) {
					pattern = '明天';
				}
			}
		}
		return $m.date.toString(date, pattern);
	},
	formatTimeLineDateTime: function(string) {
		var date = $m.date.toDate(string, 'yyyy-MM-dd HH:mm:ss');
		var now = new Date();

		var pattern = 'yyyy-MM-dd<br>HH:mm:ss';
		if (date.getFullYear() === now.getFullYear()) {
			pattern = 'MM-dd<br>HH:mm:ss';
			if (date.getMonth() === now.getMonth()) {
				if (date.getDate() === now.getDate()) {
					pattern = '今天<br>HH:mm:ss';
				} else if (date.getDate() + 1 === now.getDate()) {
					pattern = '昨天<br>HH:mm:ss';
				}
			}
		}
		return $m.date.toString(date, pattern);
	},
	formatDateTime: function(dateString) {
		var formatedDate = '';
		if (dateString) {
			var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
			formatedDate = (dateString + '').replace(pattern, '$1-$2-$3 $4:$5:$6');
		}
		return formatedDate;
	},
	formatDateTimeT: function(dateString) {
		var formatedDate = '';
		if (dateString) {
			formatedDate = dateString.substring(0, 19).replace('T', ' ');
		}
		return formatedDate;
	}
};

app.loading = {
	show: function() {
		$m.showLoading();
	},
	hide: function() {
		$m.hideLoading();
	}
};

app.menu = {
	sidebarMenuData: [{
		name: '组织管理',
		code: 'department',
		page: 'pages/department/index.html'
	}, {
		name: '用户管理',
		code: 'user',
		page: 'pages/user/index.html'
	}, {
		name: '角色管理',
		code: 'role',
		page: 'pages/role/index.html'
	}, {
		name: '权限管理',
		code: 'userRole',
		page: 'pages/userRole/index.html'
	}, {
		name: '功能管理',
		code: 'function',
		page: 'pages/function/index.html'
	}, {
		name: '系统应用',
		code: 'application',
		page: 'pages/application/index.html'
	}, {
		name: '数据字典',
		code: 'dataDict',
		page: 'pages/dataDict/index.html'
	}, {
		name: 'demo',
		code: 'dataDict',
		page: 'pages/temp/add.html'
	}],
	getSidebarMenu: function() {
		var result = [];

		//var functions = app.user.functions || [];

		var menus = app.menu.sidebarMenuData;
		var menu;
		var i;
		var l = menus.length;
		for (i = 0; i < l; i++) {
			menu = menus[i];
			//if (functions.indexOf(menu.code) > -1) {
			result.push(menu);
			//}
		}
		return result;
	},
	initSidebarMenu: function() {
		// 菜单内容填充
		// var menuData = app.menu.getSidebarMenu();
		// var template = $('#tmpl-sidebar-menu').html();
		// var html = $m.tmpl(template, menuData);
		// $('#sidebar-menu').html(html);
		$(document).ready(function() {
			var trigger = $('.hamburger'),
				overlay = $('.overlay'),
				isClosed = true;

			trigger.click(function() {
				hamburger_cross();
			});
			$("nav ul li").on('click', function() {
				if ($(this).children(".sencend-menu").is(':hidden')) {
					$(this).children(".sencend-menu").animate({
						height: 'show'
					}, 400)
						//siblings遍历sencend-menu的元素
						.end().siblings().find(".sencend-menu").hide(400);
				} else {
					$(this).children(".sencend-menu").animate({
						height: 'hide'
					}, 400)
						.end().siblings().find(".sencend-menu").hide(400)
						.end().siblings().find(".thired-menu").hide(400);;
				}

			});
			var thist = $('.sencend-menu').children('li');
			$(thist).on('click', function() {
				// console.info($(this).children(".thired-menu").is(':hidden'))
				if ($(this).children(".thired-menu").is(':hidden')) {
					$(this).children(".thired-menu").animate({
						height: 'show'
					}, 400)
						//siblings遍历thired-menu的元素
						.end().siblings().find(".thired-menu").hide(400);
				} else {
					$(this).children(".thired-menu").animate({
						height: 'hide'
					}, 400)
						.end().siblings().find(".thired-menu").hide(400);
				}
			})
			$('.sencend-menu').click(function(e) {
				e.stopPropagation();
			});
			$('.thired-menu').click(function(e) {
				e.stopPropagation();
			});

			function hamburger_cross() {

				if (isClosed == true) {
					overlay.hide();
					trigger.removeClass('is-open');
					trigger.addClass('is-closed');
					isClosed = false;
				} else {
					overlay.show();
					trigger.removeClass('is-closed');
					trigger.addClass('is-open');
					isClosed = true;
				}
			}

			$('[data-toggle="offcanvas"]').click(function() {
				$('#container-wrapper').toggleClass('toggled');
			});
		});

		// 菜单点击事件
		$('#sidebar-menu').on('click', '.sidebar-menu-item', function() {
			var $menu = $(this);
			var page = $menu.data('page');
			console.log(page);
			if (page) {
				app.nav.toPage(page);
			}
		});

		$('.sencend-menu').on('click', '.sidebar-menu-item', function() {
			var $menu = $(this);
			var page = $menu.data('page');
			console.log(page);
			if (page) {
				app.nav.toPage(page);
			}
		});

		$('.sencend-menu .thired-menu').on('click', '.sidebar-menu-item', function() {
			var $menu = $(this);
			var page = $menu.data('page');
			console.log(page);
			if (page) {
				app.nav.toPage(page);
			}
		});

	}

};

app.nav = {
	toPath: function(path, data) {
		var to = path.split('/')[0];
		$('#nav-menu .item.active').removeClass('active');
		$('#nav-' + to).addClass('active');
		app[to].navTo(path, data);
	},
	toPage: function(pageUrl) {
		console.log(pageUrl);
		$m.page.loadPage({
			url: pageUrl,
			effect: 'fade',
			container: 'page-content-wrapper'
		});
	},
	toHome: function() {
		$('#nav-menu .item.active').removeClass('active');
		$m.page.loadPage({
			url: 'pages/home/index.html',
			effect: 'fade',
			cache: true
		});
	}
};

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

app.tree = {
	json: [{
		"name": "中科慈航",
		"code": "ZKCH",
		"icon": "icon-tree-root",
		"child": [{
				"name": "广州中科慈航",
				"icon": "icon-tree-open",
				"code": "GZZKCH",
				"parentCode": "ZKCH",
				"child": [{
					"name": "广州中科慈航天河区分行",
					"code": "GZZKCHTQFH",
					"icon": "",
					"parentCode": "GZZKCH",
					"child": []
				}]
			},
			{
				"name": "北京中科慈航",
				"icon": "",
				"code": "BJZKCH",
				"parentCode": "ZKCH",
				"child": [{
					"name": "北京中科慈航中城区分行",
					"code": "BJZKCHZCFH",
					"icon": "",
					"parentCode": "BJZKCH",
					"child": []
				}]
			}
		]
	}, {
		"name": "中科科技",
		"code": "ZKKJ",
		"icon": "icon-tree-root",
		"child": [{
			"name": "广州中科科技",
			"code": "GZZKKJ",
			"icon": "icon-tree-open",
			"parentCode": "ZKKJ",
			"child": [{
				"name": "广州天河中科科技",
				"code": "GZTHZKKJ",
				"icon": "",
				"parentCode": "GZZKKJ",
				"child": []
			}]
		}]
	}],
	init: function(data, rootUL) {

		for (var i = 0; i < data.length; i++) {
			var data2 = data[i];
			if (data[i].icon == 'icon-tree-root') {
				$('#' + rootUL).append('<li data-name="' + data[i].code + '"><div>' +
					'<label class="check"><input type="checkbox" ><span>' + data[i].name + '</span></label>' +
					'</div></li>');
			} else {
				var children = $('li[data-name="' + data[i].parentCode + '"]').children('ul');
				if (children.length == 0) {
					$('li[data-name="' + data[i].parentCode + '"]').append('<ul></ul>')
				}
				$('li[data-name="' + data[i].parentCode + '"] > ul').append(
					'<li data-name="' + data[i].code + '">' +
					'<div>' +
					'<i class="icon ' + data[i].icon + '"></i> ' +
					'<label class="check"><input type="checkbox" name="functionCode" data-code="' + data[i].code + '" data-appid="' +
					data[i].appId + '" value="' + data[i].code + "-" + data[i].appId + '"><span>' + data[i].name +
					'</span></label>' +
					'</div>' +
					'</li>')
			}
			for (var j = 0; j < data[i].child.length; j++) {
				var child = data[i].child[j];
				var children = $('li[data-name="' + child.parentCode + '"]').children('ul');
				if (children.length == 0) {
					$('li[data-name="' + child.parentCode + '"]').append('<ul></ul>')
				}
				$('li[data-name="' + child.parentCode + '"] > ul').append(
					'<li data-name="' + child.code + '">' +
					'<div>' +
					'<label class="check"><input type="checkbox" name="functionCode" data-code="' + child.code + '" data-appid="' +
					child.appId + '"  value="' + child.code + "-" + child.appId + '"><span>' + child.name + '</span></label>' +
					'</div>' +
					'</li>')
				var child2 = data[i].child[j].child;
				app.tree.init(child2)
			}
			app.tree.init(data[i]);
		}

		$('#' + rootUL + ' input').change(function() {
			var checked = this.checked;
			$(this).parent().parent().parent().find('input').each(function() {
				this.checked = checked;
			});
		});

		// $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', '关闭');
		//        $('.tree li.parent_li > span').on('click', function (e) {
		//            var children = $(this).parent('li.parent_li').find(' > ul > li');
		//            if (children.is(':visible')) {
		//                children.hide();
		//                $(this).attr('title', '展开').find(' > i').addClass('icon-tree-open').removeClass('icon-tree-close');
		//            } else {
		//                children.show();
		//                $(this).attr('title', '关闭').find(' > i').addClass('icon-tree-close').removeClass('icon-tree-open');
		//            }
		//            e.stopPropagation();
		//        });

		//        for (var i = 0; i < data.length; i++) {
		//			var data2 = data[i];
		//			if (data[i].icon == 'icon-tree-root') {
		//				$('#rootUL').append('<li data-name="' + data[i].code + '"><div><i class="icon ' + data[i].icon + '"></i> ' + data[i].name  + 
		//					'</div></li>');
		//			} else {
		//				var children = $('li[data-name="' + data[i].parentCode + '"]').children('ul');
		//				if (children.length == 0) {
		//					$('li[data-name="' + data[i].parentCode + '"]').append('<ul></ul>')
		//				}
		//				$('li[data-name="' + data[i].parentCode + '"] > ul').append(
		//					'<li data-name="' + data[i].code + '">' +
		//					'<div>' +
		//					'<i class="icon ' + data[i].icon + '"></i> ' +
		//					data[i].name  +
		//					'</div>' +
		//					'</li>')
		//			}
		//			for (var j = 0; j < data[i].child.length; j++) {
		//				var child = data[i].child[j];
		//				var children = $('li[data-name="' + child.parentCode + '"]').children('ul');
		//				if (children.length == 0) {
		//					$('li[data-name="' + child.parentCode + '"]').append('<ul></ul>')
		//				}
		//				$('li[data-name="' + child.parentCode + '"] > ul').append(
		//					'<li data-name="' + child.code + '">' +
		//					'<div>' +
		//					'<i class="icon ' + child.icon + '"></i> ' +
		//					data[i].name  +
		//					'</div>' +
		//					'</li>')
		//				var child2 = data[i].child[j].child;
		//				app.tree.init(child2)
		//			}
		//			app.tree.init(data[i]);
		//		}
	}
};

app.main = {
	open: function() {
		$m.page.loadPage({
			url: 'pages/main.html',
			effect: 'fade',
			container: 'container-wrapper'
		});
	},

	init: function() {
		app.menu.initSidebarMenu();

		// 判断是否页面返回而来
		var from = sessionStorage.getItem("from");
		if (from === 'gzqtrygl') {
			sessionStorage.setItem("from", ""); //清除值
			$m.page.openPage({
				url: 'pages/gzqt/gzqtgl.html',
				container: 'page-content-wrapper',
				effect: 'fade'
			});
			return;
		} else if (from == 'gzqtwgzrygl') {
			sessionStorage.setItem("from", ""); //清除值
			$m.page.openPage({
				url: 'pages/gzqt/gzqtgl.html',
				container: 'page-content-wrapper',
				effect: 'fade'
			});
			return;
		}

		// 默认显示第一个菜单的页面
		$('#sidebar-menu>li:first-child>.sidebar-menu-item').click();
	},

	// getQueryString: function(name) {
	// 	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	// 	var r = window.location.search.substr(1).match(reg);
	// 	if (r != null) return unescape(r[2]); return null;
	// },

};

app.user = {
	currentUser: null,
	functions: null,
	clear: function() {
		app.user.currentUser = null;
		app.user.userFunctions = null;
	},
	/**
	 * 获取当前登陆用户
	 */
	getCurrentUser: function() {
		if (app.user.currentUser) {
			return app.user.currentUser;
		}

		var user = localStorage.user;
		if (user) {
			app.user.currentUser = JSON.parse(user);
			return app.user.currentUser;
		} else {
			return null;
		}
	},
	/**
	 * 获取用户权限
	 */
	listFunctions: function(callback) {
		app.api.user.listFunctions({
			success: function(userFunctions) {
				app.user.userFunctions = userFunctions;

				callback && callback();
			},
			error: app.api.error
		});
	},
	/**
	 * 跳转到查询页面
	 */
	toSearchPage: function() {
		$m.page.loadPage({
			url: 'pages/user/index.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到新增页面
	 */
	toAddPage: function() {
		$m.page.loadPage({
			url: 'pages/user/add.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到编辑页面
	 */
	toUpdatePage: function(id) {
		app.user.update.id = id;
		$m.page.loadPage({
			url: 'pages/user/update.html?id=' + id,
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 删除
	 */
	del: function(id) {
		app.api.user.del({
			data: {
				userId: id
			},
			success: function(result) {
				$m.message('删除成功');
				app.user.search.listPager.refresh();
			},
			error: app.api.error
		});
	},
	/**
	 * 激活
	 */
	enable: function(id) {
		app.api.user.enable({
			data: {
				userId: id
			},
			success: function(result) {
				$m.message('激活成功');
				app.user.search.listPager.refresh();
			},
			error: app.api.error
		});
	},
	/**
	 * 禁用
	 */
	disable: function(id) {
		app.api.user.disable({
			data: {
				userId: id
			},
			success: function(result) {
				$m.message('禁用成功');
				app.user.search.listPager.refresh();
			},
			error: app.api.error
		});
	}
};

app.user.add = {
	init: function() {
		app.user.add.initForm();
	},
	initForm: function() {
		app.user.add.initFormDate();
		//		app.user.add.initDepartmentSelect();
		//		app.select.init('#user-add-genderCode', app.constants.genderCode.nameMap, {
		//			label: '请选择性别',
		//			value: ''
		//		});
		//		app.select.init('#user-add-nativePlaceCode', app.constants.originCode.nameMap, {
		//			label: '请选择籍贯',
		//			value: ''
		//		});
		//		app.select.init('#user-add-nationCode', app.constants.nationCode.nameMap, {
		//			label: '请选择民族',
		//			value: ''
		//		});
		//		app.select.init('#user-add-politicsStatus', app.constants.politicsStatus.nameMap, {
		//			label: '请选择政治面貌',
		//			value: ''
		//		});
		//		app.select.init('#user-add-policeRankCode', app.constants.policeRankCode.nameMap, {
		//			label: '请选择警衔',
		//			value: ''
		//		});
		//		app.select.init('#user-add-positionCode', app.constants.positionCode.nameMap, {
		//			label: '请选择职务',
		//			value: ''
		//		});
		//		$m('#form-user-add').validate({
		//			submitHandler: function(form) {
		//				var formdata = $m(form).serializeObject();
		//
		//				var data = {
		//					user: {
		//						username: formdata.idNo,
		//						password: '',
		//					},
		//					userInfo: formdata
		//				};
		//
		//				app.api.user.add({
		//					data: data,
		//					success: function(result) {
		//						$m.message('保存成功');
		//						app.user.toSearchPage();
		//					},
		//					error: app.api.error
		//				});
		//			},
		//			rules: {
		//				name: {
		//					required: true
		//				},
		//				idNo: {
		//					required: true,
		//					pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
		//				}
		//			},
		//			messages: {
		//				name: {
		//					required: "请输入姓名",
		//				},
		//				idNo: {
		//					required: "请输入身份证号",
		//					pattern: "身份证号输入不正确"
		//				}
		//			}
		//		});
	},
	initDepartmentSelect: function() {
		var query = {
			pageSize: 200,
			pageNum: 0
		};
		app.api.department.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					nameMap[result.datas[i].code] = result.datas[i].name;
				}
				app.select.init('#user-add-departmentCode', nameMap, {
					label: '请选择工作单位',
					value: ''
				});
			}
		});
	},
	initFormDate: function() {
		//生日
		var pattern = 'yyyy-MM-dd';
		var now = $m.date.toString(new Date(), pattern)

		var picker = $m.datePicker({
			elementId: 'zxrygl-search-cjsj-input',
			format: 'yyyy-MM-dd',
			value: null,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-add-birthday').val(date);
			}
		});
		// 授衔日期
		var picker = $m.datePicker({
			elementId: 'user-add-rankDate-input',
			format: 'yyyy-MM-dd',
			value: null,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-add-rankDate').val(date);
			}
		});
		// 批准任职日期
		var picker = $m.datePicker({
			elementId: 'user-add-positionDate-input',
			format: 'yyyy-MM-dd',
			value: null,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-add-positionDate').val(date);
			}
		});
		// 参加工作时间
		var picker = $m.datePicker({
			elementId: 'user-add-workStartDate-input',
			format: 'yyyy-MM-dd',
			value: null,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-add-workStartDate').val(date);
			}
		});
		// 参加警务工作时间
		var picker = $m.datePicker({
			elementId: 'user-add-policeStartDate-input',
			format: 'yyyy-MM-dd',
			value: null,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-add-policeStartDate').val(date);
			}
		});
	}
};

app.user.excelWindow = {
	url: 'pages/user/excelWindow.html',
	callback: null,
	open: function() {
		$m.page.openPage(app.user.excelWindow.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.user.excelWindow.clear();
		$m.page.closePage(app.user.excelWindow.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-user-excelWindow').addClass('popIn');
		$('#window-user-excelWindow .btn-window-close').on('click', function() {
			$('#window-user-excelWindow').addClass('popOut');
			app.user.excelWindow.close();
		});

		// 文件上传按钮
		app.user.excelWindow.initFileUpload();

	},
	clear: function() {
		app.user.excelWindow.callback = null;
	},
	initFileUpload: function() {
		$('#fileupload-user').fileupload({
			url: '/api/user/importFromExcel',
			dataType: 'json',
			acceptFileTypes: /(\.|\/)(xls|xlsx)$/i,
			autoUpload: true,
			messages: {
				maxNumberOfFiles: 'Maximum number of files exceeded',
				acceptFileTypes: '文件类型错误',
				maxFileSize: 'File is too large',
				minFileSize: 'File is too small'
			},
			done: function(e, data) {
				app.loading.hide();
				app.user.search.listPager.refresh();
				app.user.excelWindow.close();
			},
			always: function() {
				app.loading.hide();
			},
			progressall: function() {
				app.loading.show();
			},
			processalways: function(e, data) {
				app.loading.hide();
				var index = data.index;
				var file = data.files[index];
				if (file.error) {
					app.alert(file.error);
				}
			}
		});
	}
};

app.user.resetPasswordWindow = {
	url: 'pages/user/resetPasswordWindow.html',
	id: null,
	open: function() {
		$m.page.openPage(app.user.resetPasswordWindow.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.user.resetPasswordWindow.clear();
		$m.page.closePage(app.user.resetPasswordWindow.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-user-resetPasswordWindow').addClass('popIn');
		$('#window-user-resetPasswordWindow .btn-window-close').on('click', function() {
			$('#window-user-resetPasswordWindow').addClass('popOut');
			app.user.resetPasswordWindow.close();
		});

		// 确定按钮
		$('#btn-ok-user-resetPassword').on('click', function() {
			$m('#form-user-resetPasswordWindow').submit();
		});

		app.user.resetPasswordWindow.initData();

	},
	clear: function() {
		app.user.resetPasswordWindow.callback = null;
	},
	initData: function() {
		app.api.user.view({
			data: {
				id: app.user.resetPasswordWindow.id
			},
			success: function(result) {
				$m('#form-user-resetPasswordWindow').setFormValues(result.user);
				$('#user-resetPasswordWindow-username').val(result.user.username);
				$('#user-resetPasswordWindow-userId').val(result.user.id);
				app.user.resetPasswordWindow.initForm();
			},
			error: app.api.error
		});
	},
	initForm: function() {
		$m('#form-user-resetPasswordWindow').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.user.resetPassword({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.user.resetPasswordWindow.close();
					},
					error: app.api.error
				});
			},
			rules: {
				password: {
					required: true,
					maxlength: 20,
					minlength: 6,
					pattern: /[A-Za-z0-9\-_!@#$%^&]+/
				},
				passwordConfirm: {
					required: true,
					maxlength: 20,
					minlength: 6,
					equalTo: '#user-resetPasswordWindow-password'
				}
			},
			messages: {
				password: {
					required: '请输入密码',
					maxlength: '密码长度为6到20位',
					minlength: '密码长度为6到20位',
					pattern: '密码格式不正确'
				},
				passwordConfirm: {
					required: '请再次输入密码',
					maxlength: '密码长度为6到20位',
					minlength: '密码长度为6到20位',
					equalTo: '密码输入不一致'
				}
			}
		});
	}
};

app.user.search = {
	departmentNameMap: {},
	init: function() {
		app.user.search.initDepartmentSelect();
		app.user.search.initSearchForm();
	},
	initSearchForm: function() {
		$m('#form-user-search').validate({
			submitHandler: function(form) {
				app.user.search.listPager.query = $m(form).serializeObject();
				app.user.search.listPager.pageNum = 0;
				app.user.search.listPager.refresh();
			}
		});
	},
	initListPager: function() {
		app.user.search.listPager = $m.listPager({
			varName: 'app.user.search.listPager',
			itemId: 'list-user',
			columns: [{
				name: 'name',
				label: '姓名',
				sortable: true,
			}, {
				name: 'idNo',
				label: '身份证号',
				sortable: true
			}, {
				name: 'genderCode',
				label: '性别',
				sortable: true,
				dataRender: function(data, column) {
					var gender = '';
					if (data.genderCode) {
						gender = app.constants.genderCode.nameMap[data.genderCode];
					}
					return '<td>' + gender + '</td>';
				}
			}, {
				name: 'nativePlaceCode',
				label: '籍贯',
				sortable: true,
				dataRender: function(data, column) {
					var nativePlace = '';
					if (data.nativePlaceCode) {
						nativePlace = app.constants.originCode.nameMap[data.nativePlaceCode];
					}
					return '<td>' + nativePlace + '</td>';
				}
			}, {
				name: 'nationCode',
				label: '民族',
				sortable: true,
				dataRender: function(data, column) {
					var nation = '';
					if (data.nationCode) {
						nation = app.constants.nationCode.nameMap[data.nationCode];
					}
					return '<td>' + nation + '</td>';
				}
			}, {
				name: 'policeRankCode',
				label: '警衔',
				sortable: true,
				dataRender: function(data, column) {
					var policeRank = '';
					if (data.policeRankCode) {
						policeRank = app.constants.policeRankCode.nameMap[data.policeRankCode];
					}
					return '<td>' + policeRank + '</td>';
				}
			}, {
				name: 'positionCode',
				label: '职务',
				sortable: true,
				dataRender: function(data, column) {
					var position = '';
					if (data.positionCode) {
						position = app.constants.positionCode.nameMap[data.positionCode];
					}
					return '<td>' + position + '</td>';
				}
			}, {
				name: 'departmentCode',
				label: '工作单位',
				sortable: true,
				dataRender: function(data, column) {
					var department = '';
					if (data.departmentCode) {
						department = app.user.search.departmentNameMap[data.departmentCode];
					}
					return '<td>' + department + '</td>';
				}
			}, {
				name: 'id',
				label: '操作',
				headStyle: 'width:226px;text-align:center',
				dataRender: function(data, column) {
					var updatePassword = '<a class="btn btn-small" onclick="javascript:app.user.search.openResetPassword(\'' +
						data.userId +
						'\');">重置密码</a>';
					var updateBtn = '<a class="btn btn-small" onclick="javascript:app.user.toUpdatePage(\'' + data.userId +
						'\');">修改</a>';
					var delBtn = '<a class="btn btn-small" href="javascript:void(0);" onclick="javascript:app.user.del(\'' +
						data.userId + '\');">删除</a>';
					var statusBtn = '';
					if (data.status == app.constants.userStatus.keyMap['可用']) {
						statusBtn = '<a class="btn btn-small" onclick="javascript:app.user.disable(\'' + data.userId +
							'\');">禁用</a>';
					} else if (data.status == app.constants.userStatus.keyMap['禁用']) {
						statusBtn = '<a class="btn btn-small" onclick="javascript:app.user.enable(\'' + data.userId +
							'\');">激活</a>';
					}
					return '<td style="text-align:center">' + updatePassword + statusBtn + updateBtn + delBtn + '</td>';
				}
			}],
			dataProvider: function(listPager, callback) {
				var query = listPager.query || {};
				query.pageSize = listPager.pageSize;
				query.pageNum = listPager.pageNum;
				query.status = [app.constants.userStatus.keyMap['可用'], app.constants.userStatus.keyMap['禁用']];
				if (listPager.orderBy) {
					query.orderBy = listPager.orderBy;
					query.sort = listPager.asc ? 'asc' : 'desc';
				}
				app.api.user.search({
					data: query,
					success: function(result) {
						callback(result.totalNum, result.datas);
					}
				});
			}
		});
		app.user.search.listPager.refresh();
	},
	initDepartmentSelect: function() {
		var query = {
			pageSize: 1000,
			pageNum: 0
		};
		app.api.department.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					nameMap[result.datas[i].code] = result.datas[i].name;
				}
				app.user.search.departmentNameMap = nameMap;
				app.select.init('#user-search-departmentCode', nameMap, {
					label: '请选择工作单位',
					value: ''
				});
				app.user.search.initListPager();
			}
		});
	},
	openResetPassword: function(userId) {
		app.user.resetPasswordWindow.id = userId;
		app.user.resetPasswordWindow.open();
	}
};

app.user.update = {
	id: null,
	init: function() {
		app.user.update.initData();
	},
	initData: function() {
		app.select.init('#user-update-genderCode', app.constants.genderCode.nameMap, {
			label: '请选择性别',
			value: ''
		});
		app.select.init('#user-update-nativePlaceCode', app.constants.originCode.nameMap, {
			label: '请选择籍贯',
			value: ''
		});
		app.select.init('#user-update-nationCode', app.constants.nationCode.nameMap, {
			label: '请选择民族',
			value: ''
		});
		app.select.init('#user-update-politicsStatus', app.constants.politicsStatus.nameMap, {
			label: '请选择政治面貌',
			value: ''
		});
		app.select.init('#user-update-policeRankCode', app.constants.policeRankCode.nameMap, {
			label: '请选择警衔',
			value: ''
		});
		app.select.init('#user-update-positionCode', app.constants.positionCode.nameMap, {
			label: '请选择职务',
			value: ''
		});
		app.api.user.view({
			data: {
				id: app.user.update.id
			},
			success: function(result) {
				$m('#form-user-update').setFormValues(result.userInfo);
				app.user.update.initDepartmentSelect(result.userInfo.departmentCode);
				app.user.update.initFormDate(result.userInfo);
				app.user.update.initForm();
			},
			error: app.api.error
		});
	},
	initForm: function() {
		$m('#form-user-update').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.user.update({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.user.toSearchPage();
					},
					error: app.api.error
				});
			},
			rules: {
				name: {
					required: true
				},
				idNo: {
					required: true,
					pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
				}
			},
			messages: {
				name: {
					required: "请输入姓名",
				},
				idNo: {
					required: "请输入身份证号",
					pattern: "身份证号输入不正确"
				}
			}
		});
	},
	initDepartmentSelect: function(departmentCode) {
		var query = {
			pageSize: 200,
			pageNum: 0
		};
		app.api.department.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					nameMap[result.datas[i].code] = result.datas[i].name;
				}
				app.select.init('#user-update-departmentCode', nameMap, {
					label: '请选择工作单位',
					value: ''
				});
				if (departmentCode) {
					$('#user-update-departmentCode').val(departmentCode);
				}
			}
		});
	},
	initFormDate: function(data) {
		//生日
		var pattern = 'yyyy-MM-dd';
		var now = $m.date.toString(new Date(), pattern)

		var picker = $m.datePicker({
			elementId: 'user-update-birthday-input',
			format: 'yyyy-MM-dd',
			value: data.birthday,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-update-birthday').val(date);
			}
		});
		// 授衔日期
		var picker = $m.datePicker({
			elementId: 'user-update-rankDate-input',
			format: 'yyyy-MM-dd',
			value: data.rankDate,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-update-rankDate').val(date);
			}
		});
		// 批准任职日期
		var picker = $m.datePicker({
			elementId: 'user-update-positionDate-input',
			format: 'yyyy-MM-dd',
			value: data.positionDate,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-update-positionDate').val(date);
			}
		});
		// 参加工作时间
		var picker = $m.datePicker({
			elementId: 'user-update-workStartDate-input',
			format: 'yyyy-MM-dd',
			value: data.workStartDate,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-update-workStartDate').val(date);
			}
		});
		// 参加警务工作时间
		var picker = $m.datePicker({
			elementId: 'user-update-policeStartDate-input',
			format: 'yyyy-MM-dd',
			value: data.policeStartDate,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-update-policeStartDate').val(date);
			}
		});
	}
};

app.login = {
	checkLogin: function(callback) {
		app.api.user.loginUser({
			success: function(data) {
				if (data) {
					app.user.listFunctions(function() {
						callback(true);
					});
				} else {
					app.login.open();
				}
			},
			error: function() {
				app.login.open();
			}
		});
	},
	open: function() {
		// 跳转到单点登录页面
		window.location = '/login/sso';
	}

};

app.department = {
	init: function() {},
	/**
	 * 跳转到查询页面
	 */
	toSearchPage: function() {
		$m.page.loadPage({
			url: 'pages/department/index.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到新增页面
	 */
	toAddPage: function() {
		$m.page.loadPage({
			url: 'pages/department/add.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到编辑页面
	 */
	toUpdatePage: function(id) {
		app.department.update.id = id;
		$m.page.loadPage({
			url: 'pages/department/update.html?id=' + id,
			container: 'workspace',
			effect: 'fade'
		});
	},

	del: function(id) {
		app.api.department.del({
			data: {
				id: id
			},
			success: function(result) {
				$m.message('删除成功');
				app.department.search.listPager.refresh();
			},
			error: app.api.error
		});
	}
};

app.department.add = {
	init: function() {
		$m('#form-department-add').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.department.add({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.department.toSearchPage();
					},
					error: app.api.error
				});
			},
			rules: {
				name: {
					required: true,
					maxlength: 90
				},
				code: {
					required: true,
					maxlength: 30
				}
			},
			messages: {
				name: {
					required: "请输入名称",
					maxlength: '名称长度不能超过30个汉字'
				},
				code: {
					required: '请输入代码',
					maxlength: '代码长度不能超过30个字符'
				}
			}
		});
	}
};

app.department.excelWindow = {
	url: 'pages/department/excelWindow.html',
	callback: null,
	open: function() {
		$m.page.openPage(app.department.excelWindow.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.department.excelWindow.clear();
		$m.page.closePage(app.department.excelWindow.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-department-excelWindow').addClass('popIn');
		$('#window-department-excelWindow .btn-window-close').on('click', function() {
			$('#window-department-excelWindow').addClass('popOut');
			app.department.excelWindow.close();
		});

		// 文件上传按钮
		app.department.excelWindow.initFileUpload();

	},
	clear: function() {
		app.department.excelWindow.callback = null;
	},
	initFileUpload: function() {
		$('#fileupload-department').fileupload({
			url: '/api/department/importFromExcel',
			dataType: 'json',
			acceptFileTypes: /(\.|\/)(xls|xlsx)$/i,
			autoUpload: true,
			messages: {
				maxNumberOfFiles: 'Maximum number of files exceeded',
				acceptFileTypes: '文件类型错误',
				maxFileSize: 'File is too large',
				minFileSize: 'File is too small'
			},
			done: function(e, data) {
				app.loading.hide();
				app.department.search.listPager.refresh();
				app.department.excelWindow.close();
			},
			always: function() {
				app.loading.hide();
			},
			progressall: function() {
				app.loading.show();
			},
			processalways: function(e, data) {
				app.loading.hide();
				var index = data.index;
				var file = data.files[index];
				if (file.error) {
					app.alert(file.error);
				}
			}
		});
	}
};

app.department.search = {
	init: function() {
		app.tree.init(app.tree.json);
		app.department.search.initSearchForm();
		app.department.search.initListPager();
	},
	initSearchForm: function() {
		$m('#form-department-search').validate({
			submitHandler: function(form) {
				app.department.search.listPager.query = $m(form).serializeObject();
				console.log(app.department.search.listPager.query);
				app.department.search.listPager.pageNum = 0;
				app.department.search.listPager.refresh();
			}
		});
	},
	initListPager: function() {
		app.department.search.listPager = $m.listPager({
			varName: 'app.department.search.listPager',
			itemId: 'list-department',
			columns: [{
				name: 'name',
				label: '名称',
				sortable: true,
			}, {
				name: 'code',
				label: '代码',
				sortable: true
			}, {
				//				name: 'parentCode',
				//				label: '父级代码',
				//				sortable: true
				//			}, {
				name: 'id',
				label: '操作',
				headStyle: 'width:200px;text-align:center',
				dataRender: function(data, column) {
					var updateBtn = '<a class="btn btn-small" onclick="javascript:app.department.toUpdatePage(\'' + data.id +
						'\');">修改</a>';
					var delBtn =
						'<a class="btn btn-small" href="javascript:void(0);" onclick="javascript:app.department.del(\'' + data.id +
						'\');">删除</a>';
					return '<td style="text-align:center">' + updateBtn + delBtn + '</td>';
				}
			}],
			dataProvider: function(listPager, callback) {
				var query = listPager.query || {};
				query.pageSize = listPager.pageSize;
				query.pageNum = listPager.pageNum;
				if (listPager.orderBy) {
					query.orderBy = listPager.orderBy;
					query.sort = listPager.asc ? 'asc' : 'desc';
				}
				app.api.department.search({
					data: query,
					success: function(result) {
						callback(result.totalNum, result.datas);
					}
				});
			}
		});
		app.department.search.listPager.refresh();
	}
};

app.department.update = {
	id: null,
	init: function() {
		app.department.update.initData();
	},
	initData: function() {
		app.api.department.view({
			data: {
				id: app.department.update.id
			},
			success: function(result) {
				$m('#form-department-update').setFormValues(result);
				app.department.update.initForm();
			},
			error: app.api.error
		});
	},
	initForm: function() {
		$m('#form-department-update').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.department.update({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.department.toSearchPage();
					},
					error: app.api.error
				});
			},
			rules: {
				name: {
					required: true,
					maxlength: 90
				},
				code: {
					required: true,
					maxlength: 30
				}
			},
			messages: {
				name: {
					required: "请输入名称",
					maxlength: '名称长度不能超过30个汉字'
				},
				code: {
					required: '请输入代码',
					maxlength: '代码长度不能超过30个字符'
				}
			}
		});
	}
};

app.role = {
	init: function() {

	},
	/**
	 * 跳转到查询页面
	 */
	toSearchPage: function() {
		$m.page.loadPage({
			url: 'pages/role/index.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到新增页面
	 */
	toAddPage: function() {
		$m.page.loadPage({
			url: 'pages/role/add.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到编辑页面
	 */
	toUpdatePage: function(id) {
		app.role.update.id = id;
		$m.page.loadPage({
			url: 'pages/role/update.html?id=' + id,
			container: 'workspace',
			effect: 'fade'
		});
	},

	del: function(id) {
		app.api.role.del({
			data: {
				id: id
			},
			success: function(result) {
				$m.message('删除成功');
				app.role.search.listPager.refresh();
			},
			error: app.api.error
		});
	}
};

app.role.add = {
	init: function() {
		//app.role.add.initFuncSelect();
		$m('#form-role-add').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.role.add({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.role.toSearchPage();
					},
					error: app.api.error
				});
			},
			rules: {
				name: {
					required: true,
					maxlength: 60
				},
				code: {
					required: true,
					maxlength: 30
				}
			},
			messages: {
				name: {
					required: "请输入名称",
					maxlength: '名称长度不能超过20个汉字'
				},
				code: {
					required: '请输入代码',
					maxlength: '代码长度不能超过30个字符'
				}
			}
		});
	}
};

app.role.search = {
	init: function() {
		app.role.search.initSearchForm();
		app.role.search.initListPager();
	},
	initSearchForm: function() {
		$m('#form-role-search').validate({
			submitHandler: function(form) {
				app.role.search.listPager.query = $m(form).serializeObject();
				app.role.search.listPager.pageNum = 0;
				app.role.search.listPager.refresh();
			}
		});
	},
	initListPager: function() {
		app.role.search.listPager = $m.listPager({
			varName: 'app.role.search.listPager',
			itemId: 'list-role',
			columns: [{
				name: 'name',
				label: '名称',
				sortable: true,
			}, {
				name: 'code',
				label: '代码',
				sortable: true
			}, {
				name: 'parentCode',
				label: '父级代码',
				sortable: true
			}, {
				name: 'id',
				label: '操作',
				headStyle: 'width:200px;text-align:center',
				dataRender: function(data, column) {
					var updateBtn = '<a class="btn btn-small" onclick="javascript:app.role.toUpdatePage(\'' + data.id +
						'\');">修改</a>';
					var delBtn = '<a class="btn btn-small" href="javascript:void(0);" onclick="javascript:app.role.del(\'' +
						data.id + '\');">删除</a>';
					return '<td style="text-align:center">' + updateBtn + delBtn + '</td>';
				}
			}],
			dataProvider: function(listPager, callback) {
				var query = listPager.query || {};
				query.pageSize = listPager.pageSize;
				query.pageNum = listPager.pageNum;
				if (listPager.orderBy) {
					query.orderBy = listPager.orderBy;
					query.sort = listPager.asc ? 'asc' : 'desc';
				}
				app.api.role.search({
					data: query,
					success: function(result) {
						callback(result.totalNum, result.datas);
					}
				});
			}
		});
		app.role.search.listPager.refresh();
	}
};

app.role.update = {
	id: null,
	init: function() {
		app.role.update.initData();
	},
	initData: function() {
		app.api.role.view({
			data: {
				id: app.role.update.id
			},
			success: function(result) {
				$m('#form-role-update').setFormValues(result);
				app.role.update.initForm();
			},
			error: app.api.error
		});
	},
	initForm: function() {
		$m('#form-role-update').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.role.update({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.role.toSearchPage();
					},
					error: app.api.error
				});
			},
			rules: {
				name: {
					required: true,
					maxlength: 60
				},
				code: {
					required: true,
					maxlength: 30
				}
			},
			messages: {
				name: {
					required: "请输入名称",
					maxlength: '名称长度不能超过20个汉字'
				},
				code: {
					required: '请输入代码',
					maxlength: '代码长度不能超过30个字符'
				}
			}
		});
	}
};

app.func = {
	init: function() {

	},
	/**
	 * 跳转到查询页面
	 */
	toSearchPage: function() {
		$m.page.loadPage({
			url: 'pages/function/index.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到新增页面
	 */
	toAddPage: function() {
		$m.page.loadPage({
			url: 'pages/function/add.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到编辑页面
	 */
	toUpdatePage: function(id) {
		app.func.update.id = id;
		$m.page.loadPage({
			url: 'pages/function/update.html?id=' + id,
			container: 'workspace',
			effect: 'fade'
		});
	},

	del: function(id) {
		app.api.func.del({
			data: {
				id: id
			},
			success: function(result) {
				$m.message('删除成功');
				app.func.search.listPager.refresh();
			},
			error: app.api.error
		});
	}
};

app.func.add = {
	init: function() {
		app.func.add.initForm();
	},
	initForm: function() {
		app.func.add.initAppSelect();
		app.func.add.initParentCodeSelect();
		$m('#form-func-add').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.func.add({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.func.toSearchPage();
					},
					error: app.api.error
				});
			},
			rules: {
				name: {
					required: true,
					maxlength: 60
				},
				appId: {
					required: true,
				},
				code: {
					required: true,
					maxlength: 60
				}
			},
			messages: {
				name: {
					required: "请输入名称",
					maxlength: '名称长度不能超过20个汉字'
				},
				appId: {
					required: "请选择应用",
				},
				code: {
					required: '请输入代码',
					maxlength: '代码长度不能超过60个字符'
				}
			}
		});
	},
	initAppSelect: function() {
		var query = {
			pageSize: 200,
			pageNum: 0
		};
		app.api.application.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					nameMap[result.datas[i].appId] = result.datas[i].name;
				}
				app.select.init('#func-add-appId', nameMap, {
					label: '请选择应用',
					value: ''
				});
			}
		});
	},
	initParentCodeSelect: function() {
		var query = {
			pageSize: 200,
			pageNum: 0
		};
		app.api.func.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					nameMap[result.datas[i].code] = result.datas[i].name;
				}
				app.select.init('#func-add-parentCode', nameMap, {
					label: '请选择父级代码',
					value: ''
				});
			}
		});
	},
	changeApp: function() {
		var query = {
			pageSize: 200,
			pageNum: 0,
			appId: $('#func-add-appId').val()
		};
		app.api.func.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					nameMap[result.datas[i].code] = result.datas[i].name;
				}
				app.select.init('#func-add-parentCode', nameMap, {
					label: '请选择父级代码',
					value: ''
				});
			}
		});
	}
};

app.func.excelWindow = {
	url: 'pages/function/excelWindow.html',
	callback: null,
	open: function() {
		$m.page.openPage(app.func.excelWindow.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.func.excelWindow.clear();
		$m.page.closePage(app.func.excelWindow.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-func-excelWindow').addClass('popIn');
		$('#window-func-excelWindow .btn-window-close').on('click', function() {
			$('#window-func-excelWindow').addClass('popOut');
			app.func.excelWindow.close();
		});
		app.func.excelWindow.initAppSelect();
		// 文件上传按钮
		app.func.excelWindow.initFileUpload();

	},
	clear: function() {
		app.func.excelWindow.callback = null;
	},
	initFileUpload: function() {
		$('#fileupload-func').fileupload({
			url: '/api/function/importFromExcel',
			dataType: 'json',
			acceptFileTypes: /(\.|\/)(xls|xlsx)$/i,
			autoUpload: true,
			messages: {
				maxNumberOfFiles: 'Maximum number of files exceeded',
				acceptFileTypes: '文件类型错误',
				maxFileSize: 'File is too large',
				minFileSize: 'File is too small'
			},
			done: function(e, data) {
				app.loading.hide();
				app.func.search.listPager.refresh();
				app.func.excelWindow.close();
			},
			always: function() {
				app.loading.hide();
			},
			progressall: function() {
				app.loading.show();
			},
			processalways: function(e, data) {
				app.loading.hide();
				var index = data.index;
				var file = data.files[index];
				if (file.error) {
					app.alert(file.error);
				}
			},
			submit: function(e, data) {
				if (!$('#func-excel-appId').val()) {
					app.alert("请选择应用");
					return false;
				}
				data.formData = {
					appId: $('#func-excel-appId').val()
				};
			}
		});
	},
	initAppSelect: function() {
		var query = {
			pageSize: 200,
			pageNum: 0
		};
		app.api.application.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					nameMap[result.datas[i].appId] = result.datas[i].name;
				}
				app.select.init('#func-excel-appId', nameMap, {
					label: '请选择应用',
					value: ''
				});
			}
		});
	}
};

app.func.search = {
	init: function() {
		app.func.search.initSearchForm();
		app.func.search.initListPager();
	},
	initSearchForm: function() {
		$m('#form-func-search').validate({
			submitHandler: function(form) {
				app.func.search.listPager.query = $m(form).serializeObject();
				app.func.search.listPager.pageNum = 0;
				app.func.search.listPager.refresh();
			}
		});
	},
	initListPager: function() {
		app.func.search.listPager = $m.listPager({
			varName: 'app.func.search.listPager',
			itemId: 'list-func',
			columns: [{
				name: 'name',
				label: '名称',
				sortable: true,
			}, {
				name: 'code',
				label: '代码',
				sortable: true
			}, {
				name: 'parentCode',
				label: '父级代码',
				sortable: true
			}, {
				name: 'id',
				label: '操作',
				headStyle: 'width:200px;text-align:center',
				dataRender: function(data, column) {
					var updateBtn = '<a class="btn btn-small" onclick="javascript:app.func.toUpdatePage(\'' + data.id +
						'\');">修改</a>';
					var delBtn = '<a class="btn btn-small" href="javascript:void(0);" onclick="javascript:app.func.del(\'' +
						data.id + '\');">删除</a>';
					return '<td style="text-align:center">' + updateBtn + delBtn + '</td>';
				}
			}],
			dataProvider: function(listPager, callback) {
				var query = listPager.query || {};
				query.pageSize = listPager.pageSize;
				query.pageNum = listPager.pageNum;
				if (listPager.orderBy) {
					query.orderBy = listPager.orderBy;
					query.sort = listPager.asc ? 'asc' : 'desc';
				}
				app.api.func.search({
					data: query,
					success: function(result) {
						callback(result.totalNum, result.datas);
					}
				});
			}
		});
		app.func.search.listPager.refresh();
	}
};

app.func.update = {
	id: null,
	init: function() {
		app.func.update.initData();
	},
	initData: function() {
		app.api.func.view({
			data: {
				id: app.func.update.id
			},
			success: function(result) {
				$m('#form-func-update').setFormValues(result);
				app.func.update.initAppSelect(result.appId);
				$('#func-update-code').val(result.code);
				app.func.update.initParentCodeSelect(result);
				app.func.update.initForm();
			},
			error: app.api.error
		});
	},
	initForm: function() {
		$m('#form-func-update').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.func.update({
					data: data,
					success: function(result) {
						app.func.toSearchPage();
						$m.message('保存成功');
					},
					error: app.api.error
				});
			},
			rules: {
				name: {
					required: true,
					maxlength: 60
				},
				appId: {
					required: true,
				},
				code: {
					required: true,
					maxlength: 60
				}
			},
			messages: {
				name: {
					required: "请输入名称",
					maxlength: '名称长度不能超过20个汉字'
				},
				appId: {
					required: "请选择应用",
				},
				code: {
					required: '请输入代码',
					maxlength: '代码长度不能超过60个字符'
				}
			}
		});
	},
	initAppSelect: function(value) {
		var query = {
			pageSize: 200,
			pageNum: 0
		};
		app.api.application.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					nameMap[result.datas[i].appId] = result.datas[i].name;
				}
				app.select.init('#func-update-appId', nameMap, {
					label: '请选择应用',
					value: ''
				});
				if (value) {
					$('#func-update-appId').val(value);
				}
			}
		});
	},
	initParentCodeSelect: function(data) {
		var parentCode = data.parentCode;
		var code = data.code;
		var query = {
			pageSize: 200,
			pageNum: 0,
			appId: data.appId
		};
		app.api.func.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					if (result.datas[i].code != code && result.datas[i].parentCode != code) {
						nameMap[result.datas[i].code] = result.datas[i].name;
					}
				}
				app.select.init('#func-update-parentCode', nameMap, {
					label: '请选择父级代码',
					value: ''
				});
				if (value) {
					$('#func-update-parentCode').val(value);
				}
			}
		});
	},
	changeApp: function() {
		var query = {
			pageSize: 200,
			pageNum: 0,
			appId: $('#func-update-appId').val()
		};
		app.api.func.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				var code = $('#func-update-code').val();
				for (i = 0; i < result.datas.length; i++) {
					if (result.datas[i].code != code && result.datas[i].parentCode != code) {
						nameMap[result.datas[i].code] = result.datas[i].name;
					}
				}
				app.select.init('#func-update-parentCode', nameMap, {
					label: '请选择父级代码',
					value: ''
				});
			}
		});
	}
};

app.application = {
	init: function() {

	},
	/**
	 * 跳转到查询页面
	 */
	toSearchPage: function() {
		$m.page.loadPage({
			url: 'pages/application/index.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到新增页面
	 */
	toAddPage: function() {
		$m.page.loadPage({
			url: 'pages/application/add.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到编辑页面
	 */
	toUpdatePage: function(id) {
		app.application.update.id = id;
		$m.page.loadPage({
			url: 'pages/application/update.html?id=' + id,
			container: 'workspace',
			effect: 'fade'
		});
	},

	del: function(id) {
		app.api.application.del({
			data: {
				id: id
			},
			success: function(result) {
				$m.message('删除成功');
				app.application.search.listPager.refresh();
			},
			error: app.api.error
		});
	},
	autogeneration: function(type) {
		var len = 7;　　
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
		var $charsId = 'abcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
		var maxPos = $chars.length;　　
		var maxIdPos = $charsId.length;　　
		var appId = '';　　
		var appSecret = '';　　
		for (i = 0; i < len; i++) {　　　　
			appId += $charsId.charAt(Math.floor(Math.random() * maxIdPos));　　　　
			if (i < 5) {　　　　
				appSecret += $chars.charAt(Math.floor(Math.random() * maxPos));　　　　
			}　　
		}　　
		$('#application-' + type + '-appId').val(appId);　　
		$('#application-' + type + '-appSecret').val(appSecret);
	}
};

app.application.add = {
	init: function() {
		$m('#form-application-add').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.application.add({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.application.toSearchPage();
					},
					error: app.api.error
				});
			},
			rules: {
				appId: {
					required: true
				},
				appSecret: {
					required: true
				},
				name: {
					required: true,
				},
				appUrl: {
					required: true,
					maxlength: 30
				}
			},
			messages: {
				appId: {
					required: "请输入应用ID"
				},
				appSecret: {
					required: "请输入应用密码"
				},
				name: {
					required: "请输入应用名称"
				},
				appUrl: {
					required: '请输入应用地址'
				}
			}
		});
	}
};

app.application.search = {
	init: function() {
		app.application.search.initSearchForm();
		app.application.search.initListPager();
	},
	initSearchForm: function() {
		$m('#form-application-search').validate({
			submitHandler: function(form) {
				app.application.search.listPager.query = $m(form).serializeObject();
				app.application.search.listPager.pageNum = 0;
				app.application.search.listPager.refresh();
			}
		});
	},
	initListPager: function() {
		app.application.search.listPager = $m.listPager({
			varName: 'app.application.search.listPager',
			itemId: 'list-application',
			columns: [{
				name: 'name',
				label: '应用名称',
				sortable: true,
			}, {
				name: 'appUrl',
				label: '应用地址',
				sortable: true
			}, {
				name: 'enableAuthorization',
				label: '权限授权',
				sortable: true,
				dataRender: function(data) {
					var enableAuthorization = '';
					if (data.enableAuthorization) {
						enableAuthorization = '开启'
					} else {
						enableAuthorization = '关闭'
					}
					return '<td style="">' + enableAuthorization + '</td>';
				}
			}, {
				name: 'enableSso',
				label: '单点登录',
				sortable: true,
				dataRender: function(data) {
					var enableSso = '';
					if (data.enableSso) {
						enableSso = '接入'
					} else {
						enableSso = '关闭'
					}
					return '<td style="">' + enableSso + '</td>';
				}
			}, {
				name: 'id',
				label: '操作',
				headStyle: 'width:200px;text-align:center',
				dataRender: function(data, column) {
					var updateBtn = '<a class="btn btn-small" onclick="javascript:app.application.toUpdatePage(\'' + data.id +
						'\');">修改</a>';
					var delBtn =
						'<a class="btn btn-small" href="javascript:void(0);" onclick="javascript:app.application.del(\'' + data.id +
						'\');">删除</a>';
					return '<td style="text-align:center">' + updateBtn + delBtn + '</td>';
				}
			}],
			dataProvider: function(listPager, callback) {
				var query = listPager.query || {};
				query.pageSize = listPager.pageSize;
				query.pageNum = listPager.pageNum;
				if (listPager.orderBy) {
					query.orderBy = listPager.orderBy;
					query.sort = listPager.asc ? 'asc' : 'desc';
				}
				app.api.application.search({
					data: query,
					success: function(result) {
						callback(result.totalNum, result.datas);
					}
				});
			}
		});
		app.application.search.listPager.refresh();
	}
};

app.application.update = {
	id: null,
	init: function() {
		app.application.update.initData();
	},
	initData: function() {
		app.api.application.view({
			data: {
				id: app.application.update.id
			},
			success: function(result) {
				$m('#form-application-update').setFormValues(result);
				app.application.update.initForm();
			},
			error: app.api.error
		});
	},
	initForm: function() {
		$m('#form-application-update').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.application.update({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.application.toSearchPage();
					},
					error: app.api.error
				});
			},
			rules: {
				appId: {
					required: true
				},
				appSecret: {
					required: true
				},
				name: {
					required: true,
				},
				appUrl: {
					required: true,
					maxlength: 30
				}
			},
			messages: {
				appId: {
					required: "请输入应用ID"
				},
				appSecret: {
					required: "请输入应用密码"
				},
				name: {
					required: "请输入应用名称"
				},
				appUrl: {
					required: '请输入应用地址'
				}
			}
		});
	}
};

app.dataDict = {
	init: function() {

	},
	/**
	 * 跳转到查询页面
	 */
	toSearchPage: function() {
		$m.page.loadPage({
			url: 'pages/dataDict/index.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到新增页面
	 */
	toAddPage: function() {
		$m.page.loadPage({
			url: 'pages/dataDict/add.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到编辑页面
	 */
	toUpdatePage: function(id) {
		app.dataDict.update.id = id;
		$m.page.loadPage({
			url: 'pages/dataDict/update.html?id=' + id,
			container: 'workspace',
			effect: 'fade'
		});
	},

	del: function(id) {
		app.api.dataDict.del({
			data: {
				id: id
			},
			success: function(result) {
				$m.message('删除成功');
				app.dataDict.search.listPager.refresh();
			},
			error: app.api.error
		});
	}
};

app.dataDict.add = {
	init: function() {
		app.select.init('#dataDict-add-type', app.constants.dataDictType.nameMap, {
			label: '请选择数据字典类型',
			value: ''
		});
		$m('#form-dataDict-add').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.dataDict.add({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.dataDict.toSearchPage();
					},
					error: app.api.error
				});
			},
			rules: {
				name: {
					required: true,
					maxlength: 60
				},
				code: {
					required: true,
					maxlength: 30
				}
			},
			messages: {
				name: {
					required: "请输入名称",
					maxlength: '名称长度不能超过20个汉字'
				},
				code: {
					required: '请输入代码',
					maxlength: '代码长度不能超过30个字符'
				}
			}
		});
	}
};

app.dataDict.excelWindow = {
	url: 'pages/dataDict/excelWindow.html',
	callback: null,
	open: function() {
		$m.page.openPage(app.dataDict.excelWindow.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.dataDict.excelWindow.clear();
		$m.page.closePage(app.dataDict.excelWindow.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-dataDict-excelWindow').addClass('popIn');
		$('#window-dataDict-excelWindow .btn-window-close').on('click', function() {
			$('#window-dataDict-excelWindow').addClass('popOut');
			app.dataDict.excelWindow.close();
		});

		// 文件上传按钮
		app.dataDict.excelWindow.initFileUpload();

	},
	clear: function() {
		app.dataDict.excelWindow.callback = null;
	},
	initFileUpload: function() {
		$('#fileupload-dataDict').fileupload({
			url: '/api/dataDict/importFromExcel',
			dataType: 'json',
			acceptFileTypes: /(\.|\/)(xls|xlsx)$/i,
			autoUpload: true,
			messages: {
				maxNumberOfFiles: 'Maximum number of files exceeded',
				acceptFileTypes: '文件类型错误',
				maxFileSize: 'File is too large',
				minFileSize: 'File is too small'
			},
			done: function(e, data) {
				app.loading.hide();
				app.dataDict.search.listPager.refresh();
				app.dataDict.excelWindow.close();
			},
			always: function() {
				app.loading.hide();
			},
			progressall: function() {
				app.loading.show();
			},
			processalways: function(e, data) {
				app.loading.hide();
				var index = data.index;
				var file = data.files[index];
				if (file.error) {
					app.alert(file.error);
				}
			}
		});
	}
};

app.dataDict.search = {
	init: function() {
		app.dataDict.search.initSearchForm();
		app.dataDict.search.initListPager();
	},
	initSearchForm: function() {
		app.select.init('#dataDict-search-type', app.constants.dataDictType.nameMap, {
			label: '请选择数据字典类型',
			value: ''
		});
		$m('#form-dataDict-search').validate({
			submitHandler: function(form) {
				app.dataDict.search.listPager.query = $m(form).serializeObject();
				app.dataDict.search.listPager.pageNum = 0;
				app.dataDict.search.listPager.refresh();
			}
		});
	},
	initListPager: function() {
		app.dataDict.search.listPager = $m.listPager({
			varName: 'app.dataDict.search.listPager',
			itemId: 'list-dataDict',
			columns: [{
				name: 'type',
				label: '类型',
				sortable: true,
				dataRender: function(data, column) {
					var type = '';
					if (data.type) {
						type = app.constants.dataDictType.nameMap[data.type];
					}
					return '<td>' + type + '</td>';
				}
			}, {
				name: 'name',
				label: '名称',
				sortable: true,
			}, {
				name: 'code',
				label: '代码',
				sortable: true
			}, {
				name: 'id',
				label: '操作',
				headStyle: 'width:200px;text-align:center',
				dataRender: function(data, column) {
					var updateBtn = '<a class="btn btn-small" onclick="javascript:app.dataDict.toUpdatePage(\'' + data.id +
						'\');">修改</a>';
					var delBtn = '<a class="btn btn-small" href="javascript:void(0);" onclick="javascript:app.dataDict.del(\'' +
						data.id + '\');">删除</a>';
					return '<td style="text-align:center">' + updateBtn + delBtn + '</td>';
				}
			}],
			dataProvider: function(listPager, callback) {
				var query = listPager.query || {};
				query.pageSize = listPager.pageSize;
				query.pageNum = listPager.pageNum;
				if (listPager.orderBy) {
					query.orderBy = listPager.orderBy;
					query.sort = listPager.asc ? 'asc' : 'desc';
				}
				app.api.dataDict.search({
					data: query,
					success: function(result) {
						callback(result.totalNum, result.datas);
					}
				});
			}
		});
		app.dataDict.search.listPager.refresh();
	}
};

app.dataDict.update = {
	id: null,
	init: function() {
		app.dataDict.update.initData();
	},
	initData: function() {
		app.api.dataDict.view({
			data: {
				id: app.dataDict.update.id
			},
			success: function(result) {
				app.select.init('#dataDict-update-type', app.constants.dataDictType.nameMap, {
					label: '请选择数据字典类型',
					value: ''
				});
				$m('#form-dataDict-update').setFormValues(result);
				app.dataDict.update.initForm();
			},
			error: app.api.error
		});
	},
	initForm: function() {
		$m('#form-dataDict-update').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.dataDict.update({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.dataDict.toSearchPage();
					},
					error: app.api.error
				});
			},
			rules: {
				name: {
					required: true,
					maxlength: 60
				},
				code: {
					required: true,
					maxlength: 30
				}
			},
			messages: {
				name: {
					required: "请输入名称",
					maxlength: '名称长度不能超过20个汉字'
				},
				code: {
					required: '请输入代码',
					maxlength: '代码长度不能超过30个字符'
				}
			}
		});
	}
};

app.userRole = {
	toPage: function() {
		$m.page.loadPage({
			url: 'pages/userRole/index.html',
			effect: 'fade',
			container: 'workspace'
		});
	}
};

app.userRole.save = {
	init: function() {
		app.userRole.save.initForm();
	},
	initForm: function() {
		$m('#form-userRole-save').validate({
			submitHandler: function(form) {
				var formData = $m(form).serializeObject();
				var roleCode = [];
				if (Object.prototype.toString.call(formData.roleCode) !== '[object Array]') {
					roleCode.push(formData.roleCode);
				} else {
					roleCode = formData.roleCode;
				}
				var data = {
					userId: formData.userId,
					roleCode: roleCode
				}
				app.api.userRole.save({
					data: data,
					success: function(result) {
						$m.message('保存成功');

						//						$m('#form-userRole-save').reset();
						//						$("#user-role-userList").find("tr").css('background-color','#fff').find('td').css('color','#000');
					},
					error: app.api.error
				});
			},
			rules: {
				userId: {
					required: true
				}
			},
			messages: {
				name: {
					required: "请选择用户"
				}
			}
		});
	},
	initData: function(userId) {
		var query = {
			pageSize: 200,
			pageNum: 0,
			userId: userId
		};
		app.api.userRole.search({
			data: query,
			success: function(result) {
				var data = {};
				data.userId = userId;
				var roleCode = [];
				for (var i = 0; i < result.datas.length; i++) {
					roleCode.push(result.datas[i].roleCode);
				}
				data.roleCode = roleCode;
				$m('#form-userRole-save').reset();
				$m('#form-userRole-save').setFormValues(data);
			}
		});
	}
}

app.userRole.search = {
	departmentNameMap: {},
	init: function() {
		app.userRole.search.initDepartmentSelect();
		app.userRole.search.initSearchForm();
		app.userRole.search.initListRole();
		app.userRole.save.init();
	},
	initSearchForm: function() {
		$m('#form-userRole-searchUser').validate({
			submitHandler: function(form) {
				app.userRole.search.listPager.query = $m(form).serializeObject();
				app.userRole.search.listPager.pageNum = 0;
				app.userRole.search.listPager.refresh();
			}
		});
	},
	initListPager: function() {
		app.userRole.search.listPager = $m.listPager({
			varName: 'app.userRole.search.listPager',
			itemId: 'user-role-userList',
			columns: [{
				name: 'userId',
				label: '',
				headStyle: 'width:30px;',
				dataRender: function(data, column) {
					return '<td><label class="check check-nolabel"><input type="checkbox"><span></span></label></td>';
				}
			}, {
				name: 'name',
				label: '姓名',
				sortable: true,
				headStyle: 'width:61px;',
				dataRender: function(data, column) {
					return '<td>' + data.name + '<input type="hidden" value="' + data.userId + '"></td>';
				}
			}, {
				name: 'idNo',
				label: '身份证号',
				sortable: true,
				headStyle: 'width:82px;',
			}, {
				name: 'policeRankCode',
				label: '警衔',
				sortable: true,
				headStyle: 'width:84px;',
				dataRender: function(data, column) {
					var policeRank = '';
					if (data.policeRankCode) {
						policeRank = app.constants.policeRankCode.nameMap[data.policeRankCode];
					}
					return '<td>' + policeRank + '</td>';
				}
			}, {
				name: 'positionCode',
				label: '职务',
				sortable: true,
				headStyle: 'width:61px;',
				dataRender: function(data, column) {
					var position = '';
					if (data.positionCode) {
						position = app.constants.positionCode.nameMap[data.positionCode];
					}
					return '<td>' + position + '</td>';
				}
			}, {
				name: 'departmentCode',
				label: '工作单位',
				sortable: true,
				dataRender: function(data, column) {
					var department = '';
					if (data.departmentCode) {
						department = app.userRole.search.departmentNameMap[data.departmentCode];
					}
					return '<td>' + department + '</td>';
				}
			}],
			dataProvider: function(listPager, callback) {
				var query = listPager.query || {};
				query.pageSize = listPager.pageSize;
				query.pageNum = listPager.pageNum;
				query.status = [app.constants.userStatus.keyMap['可用'], app.constants.userStatus.keyMap['禁用']];
				if (listPager.orderBy) {
					query.orderBy = listPager.orderBy;
					query.sort = listPager.asc ? 'asc' : 'desc';
				}
				app.api.user.search({
					data: query,
					success: function(result) {
						callback(result.totalNum, result.datas);
					}
				});
			}
		});
		app.userRole.search.listPager.refresh();

		$('#user-role-userList').on('click', 'tr', app.userRole.search.searchRole);
	},
	searchRole: function(e, that) {
		var item;
		if (that) {
			item = that;
		} else {
			item = this;
		}
		var userId = $(item).find('input')[1].value;
		$("#user-role-userList :checkbox").prop("checked", false);
		$("#user-role-userList tbody").find("tr").css('background-color', '#fff').find('td').css('color', '#000');
		$(this).css('background-color', '#01458e').find('td').css('color', '#fff');
		$(':checkbox', this).prop('checked', true);
		app.userRole.save.initData(userId);
	},
	initDepartmentSelect: function() {
		var query = {
			pageSize: 1000,
			pageNum: 0
		};
		app.api.department.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					nameMap[result.datas[i].code] = result.datas[i].name;
				}
				app.userRole.search.departmentNameMap = nameMap;
				app.select.init('#userRole-search-departmentCode', nameMap, {
					label: '请选择工作单位',
					value: ''
				});
				app.userRole.search.initListPager();
			}
		});
	},
	initListRole: function() {
		app.userRole.search.listRolePager = $m.listPager({
			varName: 'app.userRole.search.listRolePager',
			itemId: 'user-role-roleList',
			hideToolbar: true,
			hidePageSize: true,
			pageSize: 1000,
			columns: [{
				name: 'code',
				label: '<label class="check check-nolabel"><input type="checkbox" onchange="app.userRole.search.selectAll(this);"><span></span></label>',
				headStyle: 'width:30px;',
				dataRender: function(data, column) {
					return '<td><label class="check check-nolabel"><input type="checkbox" name="roleCode" value="' + data.code +
						'"><span></span></label></td>';
				}
			}, {
				name: 'name',
				label: '名称',
				sortable: true,
				dataRender: function(data, column) {
					return '<td>' + data.name + '</td>';
				}
			}],
			dataProvider: function(listRolePager, callback) {
				var query = listRolePager.query || {};
				query.pageSize = listRolePager.pageSize;
				query.pageNum = listRolePager.pageNum;
				if (listRolePager.orderBy) {
					query.orderBy = listRolePager.orderBy;
					query.sort = listRolePager.asc ? 'asc' : 'desc';
				}
				app.api.role.search({
					data: query,
					success: function(result) {
						callback(result.totalNum, result.datas);
					}
				});
			}
		});
		app.userRole.search.listRolePager.refresh();
	},
	selectAll: function(check) {
		console.log(check.checked);
		if (check.checked) {
			$("#user-role-roleList :checkbox").prop("checked", true);
		} else {
			$("#user-role-roleList :checkbox").prop("checked", false);
		}
	}
};

app.roleFunction = {
	toPage: function() {
		$m.page.loadPage({
			url: 'pages/roleFunction/index.html',
			effect: 'fade',
			container: 'workspace'
		});
	}
};

app.roleFunction.save = {
	init: function() {
		app.roleFunction.save.initForm();
	},
	initForm: function() {
		$m('#form-roleFunction-save').validate({
			submitHandler: function(form) {
				var formData = $m(form).serializeObject();
				var functionCode = [];
				var appId = [];
				$("#form-roleFunction-save input[name='functionCode']:checkbox:checked").each(function() {
					functionCode.push($(this).data('code'));
					appId.push($(this).data('appid'));
				});

				var data = {
					roleCode: formData.roleCode,
					functionCode: functionCode,
					appId: appId
				}
				app.api.roleFunction.save({
					data: data,
					success: function(result) {
						$m.message('保存成功');

					},
					error: app.api.error
				});
			},
			rules: {
				roleCode: {
					required: true
				}
			},
			messages: {
				roleCode: {
					required: "请选择角色"
				}
			}
		});
	},
	initData: function(roleCode) {
		var query = {
			pageSize: 200,
			pageNum: 0,
			roleCode: roleCode
		};
		app.api.roleFunction.search({
			data: query,
			success: function(result) {
				var data = {};
				data.roleCode = roleCode;
				var functionCode = [];
				for (var i = 0; i < result.datas.length; i++) {
					var code = result.datas[i].functionCode + '-' + result.datas[i].appId
					functionCode.push(code);
				}
				data.functionCode = functionCode;
				$m('#form-roleFunction-save').reset();
				$m('#form-roleFunction-save').setFormValues(data);
			}
		});
	}
}

app.roleFunction.search = {
	appMap: null,
	init: function() {
		app.roleFunction.search.initListPager();
		app.roleFunction.search.initListFunction();
		app.roleFunction.save.init();
	},
	initListPager: function() {
		app.roleFunction.search.listRolePager = $m.listPager({
			varName: 'app.roleFunction.search.listRolePager',
			itemId: 'role-function-roleList',
			hideToolbar: true,
			hidePageSize: true,
			pageSize: 1000,
			columns: [{
				name: 'code',
				label: '',
				headStyle: 'width:30px;',
				dataRender: function(data, column) {
					return '<td><label class="check check-nolabel"><input type="checkbox" value="' + data.code +
						'"><span></span></label></td>';
				}
			}, {
				name: 'name',
				label: '名称',
				sortable: true,
				dataRender: function(data, column) {
					return '<td>' + data.name + '</td>';
				}
			}],
			dataProvider: function(listRolePager, callback) {
				var query = listRolePager.query || {};
				query.pageSize = listRolePager.pageSize;
				query.pageNum = listRolePager.pageNum;
				if (listRolePager.orderBy) {
					query.orderBy = listRolePager.orderBy;
					query.sort = listRolePager.asc ? 'asc' : 'desc';
				}
				app.api.role.search({
					data: query,
					success: function(result) {
						callback(result.totalNum, result.datas);
					}
				});
			}
		});
		app.roleFunction.search.listRolePager.refresh();

		$('#role-function-roleList').on('click', 'tr', app.roleFunction.search.searchFunction);
	},
	searchFunction: function(e, that) {
		var item;
		if (that) {
			item = that;
		} else {
			item = this;
		}
		var roleCode = $(item).find('input')[0].value;
		console.log(roleCode);
		$("#role-function-roleList :checkbox").prop("checked", false);
		$("#role-function-roleList tbody").find("tr").css('background-color', '#fff').find('td').css('color', '#000');
		$(this).css('background-color', '#01458e').find('td').css('color', '#fff');

		$(':checkbox', this).prop('checked', true);
		app.roleFunction.save.initData(roleCode);
	},

	initListFunction: function() {
		var query = {
			pageSize: 500,
			pageNum: 0
		};
		app.api.func.search({
			data: query,
			success: function(result) {
				if (result.datas.length > 0) {
					$('#role-function-functionList-empty').hide();
				} else {
					$('#role-function-functionList-tree').hide();
					$('#rrole-function-functionList-button').hide();
				}
				var appMap = {};
				var codeMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					if (!appMap[result.datas[i].appId]) {
						appMap[result.datas[i].appId] = {};
					}
					var parentCode = result.datas[i].parentCode;
					if (!parentCode) {
						parentCode = result.datas[i].appId;
					}
					console.log(parentCode);
					var node = {
						"name": result.datas[i].name,
						"code": result.datas[i].code,
						"appId": result.datas[i].appId,
						"icon": "",
						"parentCode": parentCode,
						"child": []
					};
					// 应用ID下的 父CODE
					if (!appMap[result.datas[i].appId][parentCode]) {
						appMap[result.datas[i].appId][parentCode] = [];
					}
					appMap[result.datas[i].appId][parentCode].push(node);
				}
				app.roleFunction.search.appMap = appMap;
				app.roleFunction.search.initFunctionTree();
			}
		});
	},
	initFunctionTree: function() {
		var query = {
			pageSize: 200,
			pageNum: 0
		};
		app.api.application.search({
			data: query,
			success: function(result) {
				var appMap = app.roleFunction.search.appMap;
				var treeData = [];
				for (i = 0; i < result.datas.length; i++) {
					var child = [];
					if (appMap[result.datas[i].appId]) {
						var appfuncSet = appMap[result.datas[i].appId];
						child = app.roleFunction.search.formatData(appfuncSet, result.datas[i].appId);
					}
					console.log(child);
					var rootData = {
						"name": result.datas[i].name,
						"code": result.datas[i].appId,
						"icon": "icon-tree-root",
						"child": child
					}
					treeData.push(rootData);
					console.log(treeData);
				}
				app.tree.init(treeData, 'role-function-functionList');
			}
		});
	},
	formatData: function(appParentMap, parentId) {
		var child = appParentMap[parentId];
		for (var i = 0; i < child.length; i++) {
			var node = child[i];
			if (appParentMap[child[i].code]) {
				child[i].child = app.roleFunction.search.formatData(appParentMap, child[i].code);
			}
		}
		return child;
	},
	selectAll: function(check) {
		console.log(check.checked);
		if (check.checked) {
			$("#user-role-roleList :checkbox").prop("checked", true);
		} else {
			$("#user-role-roleList :checkbox").prop("checked", false);
		}
	}
};

app.appApiFunction = {
	toPage: function() {
		$m.page.loadPage({
			url: 'pages/appApiFunction/index.html',
			effect: 'fade',
			container: 'workspace'
		});
	}
};

app.appApiFunction.save = {
	init: function() {
		app.appApiFunction.save.initForm();
	},
	initForm: function() {
		$m('#form-appApiFunction-save').validate({
			submitHandler: function(form) {
				var formData = $m(form).serializeObject();
				var apiFunctionName = [];
				if (Object.prototype.toString.call(formData.apiFunctionName) !== '[object Array]') {
					apiFunctionName.push(formData.apiFunctionName);
				} else {
					apiFunctionName = formData.apiFunctionName;
				}
				var data = {
					appId: formData.appId,
					apiFunctionName: apiFunctionName
				}
				app.api.appApiFunction.save({
					data: data,
					success: function(result) {
						$m.message('保存成功');

					},
					error: app.api.error
				});
			},
			rules: {
				appId: {
					required: true
				}
			},
			messages: {
				appId: {
					required: "请选择应用"
				}
			}
		});
	},
	initData: function(appId) {
		var query = {
			pageSize: 200,
			pageNum: 0,
			appId: appId
		};
		app.api.appApiFunction.search({
			data: query,
			success: function(result) {
				var data = {};
				data.appId = appId;
				var apiFunctionName = [];
				for (var i = 0; i < result.datas.length; i++) {
					apiFunctionName.push(result.datas[i].apiFunctionName);
				}
				data.apiFunctionName = apiFunctionName;
				$m('#form-appApiFunction-save').reset();
				$m('#form-appApiFunction-save').setFormValues(data);
			}
		});
	}
}

app.appApiFunction.search = {
	init: function() {
		app.appApiFunction.search.initListPager();
		app.appApiFunction.search.initListApi();
		app.appApiFunction.save.init();
	},
	initSearchForm: function() {
		$m('#form-appApiFunction-search').validate({
			submitHandler: function(form) {
				app.appApiFunction.search.listPager.query = $m(form).serializeObject();
				app.appApiFunction.search.listPager.pageNum = 0;
				app.appApiFunction.search.listPager.refresh();
			}
		});
	},
	initListPager: function() {
		app.appApiFunction.search.listPager = $m.listPager({
			varName: 'app.appApiFunction.search.listPager',
			itemId: 'app-api-appList',
			hideToolbar: true,
			hidePageSize: true,
			pageSize: 1000,
			columns: [{
				name: 'userId',
				label: '',
				headStyle: 'width:30px;',
				dataRender: function(data, column) {
					return '<td><label class="check check-nolabel"><input type="checkbox" value="' + data.appId +
						'"><span></span></label></td>';
				}
			}, {
				name: 'name',
				label: '名称',
				sortable: true,
				dataRender: function(data, column) {
					return '<td>' + data.name + '</td>';
				}
			}],
			dataProvider: function(listPager, callback) {
				var query = listPager.query || {};
				query.pageSize = listPager.pageSize;
				query.pageNum = listPager.pageNum;
				if (listPager.orderBy) {
					query.orderBy = listPager.orderBy;
					query.sort = listPager.asc ? 'asc' : 'desc';
				}
				app.api.application.search({
					data: query,
					success: function(result) {
						callback(result.totalNum, result.datas);
					}
				});
			}
		});
		app.appApiFunction.search.listPager.refresh();

		$('#app-api-appList').on('click', 'tr', app.appApiFunction.search.searchRole);
	},
	searchRole: function(e, that) {
		var item;
		if (that) {
			item = that;
		} else {
			item = this;
		}

		var appId = $(item).find('input')[0].value;
		$("#app-api-appList :checkbox").prop("checked", false);
		$("#app-api-appList tbody").find("tr").css('background-color', '#fff').find('td').css('color', '#000');
		$(this).css('background-color', '#01458e').find('td').css('color', '#fff');

		$(':checkbox', this).prop('checked', true);
		app.appApiFunction.save.initData(appId);

	},
	initListApi: function() {
		app.appApiFunction.search.listApiPager = $m.listPager({
			varName: 'app.appApiFunction.search.listApiPager',
			itemId: 'app-api-apiList',
			hideToolbar: true,
			hidePageSize: true,
			pageSize: 1000,
			columns: [{
				name: 'code',
				label: '<label class="check check-nolabel"><input type="checkbox" onchange="app.appApiFunction.search.selectAll(this);"><span></span></label>',
				headStyle: 'width:30px;',
				dataRender: function(data, column) {
					return '<td><label class="check check-nolabel"><input type="checkbox" name="apiFunctionName" value="' +
						data.functionName + '"><span></span></label></td>';
				}
			}, {
				name: 'description',
				label: '名称',
				sortable: true,
				dataRender: function(data, column) {
					return '<td>' + data.description + '</td>';
				}
			}],
			dataProvider: function(listApiPager, callback) {
				var query = listApiPager.query || {};
				query.pageSize = listApiPager.pageSize;
				query.pageNum = listApiPager.pageNum;
				if (listApiPager.orderBy) {
					query.orderBy = listApiPager.orderBy;
					query.sort = listApiPager.asc ? 'asc' : 'desc';
				}
				app.api.appApiFunction.listApi({
					data: query,
					success: function(result) {
						callback(result.length, result);
					}
				});
			}
		});
		app.appApiFunction.search.listApiPager.refresh();
	},
	selectAll: function(check) {
		console.log(check.checked);
		if (check.checked) {
			$("#app-api-apiList :checkbox").prop("checked", true);
		} else {
			$("#app-api-apiList :checkbox").prop("checked", false);
		}
	}
};

app.time = {
	init: function () {
		$(".form_datetime").datetimepicker({
			language: 'zh-CN',
			format: 'yyyy-mm-dd hh:ii:ss',
			weekStart: 1,
			todayBtn: 1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
			showSecond: 1,
			minuteStep: 1,
			bootcssVer: 3
		});
	},
	last: function () {
		var date = new Date();
		var dates = new Date(date.getTime() - 7 * 24 * 3600 * 1000);
		var year = dates.getFullYear();
		var month = dates.getMonth() + 1;
		var day = dates.getDate();
		var hour = dates.getHours();
		if (Number(month) < 10) {
			month = "0" + month;
		}
		if (Number(day) < 10) {
			day = "0" + day;
		}
		if (Number(hour) < 10) {
			hour = "0" + hour;
		}
		var sec = year + '-' + month + '-' + day + ' ' + '00:00:00';
		return sec;
	},
	now: function () {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();
		if (Number(month) < 10) {
			month = "0" + month;
		}
		if (Number(day) < 10) {
			day = "0" + day;
		}
		if (Number(hour) < 10) {
			hour = "0" + hour;
		}
		if (Number(minute) < 10) {
			minute = "0" + minute;
		}
		if (Number(second) < 10) {
			second = "0" + second;
		}
		var noww = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
		return noww;
	},
	jiaoyan: function (time1, time2) {
		var stringTime = time1;
		var stringTime2 = time2;

		var timestamp2 = Date.parse(new Date(stringTime));
		timestamp2 = timestamp2 / 1000;
		var timestamp3 = Date.parse(new Date(stringTime2));
		timestamp3 = timestamp3 / 1000;
		var time = 1;
		if (timestamp2 > timestamp3) {
			alert("开始时间必须小于结束时间")
			return time;
		}
		// 2014-07-10 10:21:12的时间戳为：1404958872
		// console.log(stringTime + "的时间戳为：" + timestamp2);
	},
	last100year: function () {
		var date = new Date();
		var dates = new Date(date.getTime() - 100 * 365 * 24 * 3600 * 1000);
		var year = dates.getFullYear();
		var month = dates.getMonth() + 1;
		var day = dates.getDate();
		var hour = dates.getHours();
		if (Number(month) < 10) {
			month = "0" + month;
		}
		if (Number(day) < 10) {
			day = "0" + day;
		}
		if (Number(hour) < 10) {
			hour = "0" + hour;
		}
		var sec = year + '-' + month + '-' + day + ' ' + '00:00:00';
		return sec;
	}
};

app.drypfx = {
    // 表单自动填值 测试用
    testFrom: function(formElem) {
        formElem.find('input[type="text"]').val('test form submit');
        formElem.find('input[type="number"]').val(2);
        formElem.find('input[type="number"][name*="End"]').val(3);
        formElem.find('select option:nth-child(2)').prop("selected", true);;
        formElem.find('input.form_datetime[name*="Start"]').val('2017-09-06 09:09:32');
        formElem.find('input.form_datetime[name*="End"]').val('2017-09-20 09:09:32');

        formElem.find('input[type="text"][name*="Name"]').val('testForSubmit' + Math.random().toFixed(2) * 100); //任务名 可具体表单具体调整
    },

    // 序列化 一般容器中的 表单控件
    serializeFromWidget: function(container, formObject, i) {
        var formObject = formObject || {},
            input_selectElem = container.find('input[type="text"],select'),
            checkboxElem = container.find('input[type="checkbox"]');

        input_selectElem.each(function() {
            let key = $(this).attr('name'),
                value = $(this).val();
            formObject['ruleTableList[' + i + '].' + key] = value;
        })
        checkboxElem.each(function() {
            let key = $(this).attr('name'),
                value = $(this).is(':checked');
            formObject['ruleTableList[' + i + '].' + key] = value;
        })

        return formObject;
    },

    // 将后台返回值填入表单输入框
    setFormValues: function(elem, formObject) {
        var input_selectElem = elem.find('input, select'),
            checkboxElem = elem.find('input[type="checkbox"]');
        input_selectElem.each(function() {
            let name = $(this).attr('name');

            $(this).val(formObject[name]);
        })
        checkboxElem.each(function() {
            let name = $(this).attr('name');

            $(this).prop('checked', formObject[name]);
        })
    },

    // 多条信息删除
    deleteMutiple: function() {
        var idsArray = [],
            ids = '';

        $('#list-drypfx .table_all input[type="checkbox"]:checked').each(function() {
            idsArray.push($(this).val());
        });
        ids = idsArray.join(',');

        layer.confirm('您确定要删除这些信息吗？', {
            btn: ['确定', '取消'],
            title: '删除'
        }, function(index) {
            $.ajax({
                url: app.api.kyrqdrypfx.kyrqScUrl + '?ids=' + ids,
                type: "delete",
                success: function(response) {
                    // console.log(response);
                    if (response.success === 1) {
                        app.alert('可疑人群删除成功！');
                        app.drypfx.search.SearchInfo(1, 10); // 初始查询
                    } else {
                        app.alert('可疑人群删除失败！');
                    }
                },
                error: function(e) {
                    console.log('可疑人群删除出错！');
                }
            });

            layer.close(index);
        });
    },

    // 分页器
    pagination: function(data, container, page) {
        // console.log(data)
        BootstrapPagination(
            container, {
                layoutScheme: "lefttext,pagesizelist,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
                // 记录总数。
                total: data.total,
                // 分页尺寸。指示每页最多显示的记录数量。
                pageSize: data.pageSize,
                // 当前页索引编号。从其开始（从0开始）的整数。
                pageIndex: data.pageNo - 1,
                // 指示分页导航栏中最多显示的页索引数量。
                pageGroupSize: 10,
                // 位于导航条左侧的输出信息格式化字符串
                leftFormateString: "本页{count}条记录/共{total}条记录",
                // 位于导航条右侧的输出信息格式化字符串
                rightFormateString: "第{pageNumber}页/共{totalPages}页",
                // 页码文本格式化字符串。
                pageNumberFormateString: "{pageNumber}",
                // 分页尺寸输出格式化字符串
                pageSizeListFormateString: "每页显示{pageSize}条记录",
                // 上一页导航按钮文本。
                prevPageText: "上一页",
                // 下一页导航按钮文本。
                nextPageText: "下一页",
                // 上一组分页导航按钮文本。
                prevGroupPageText: "上一组",
                // 下一组分页导航按钮文本。
                nextGroupPageText: "下一组",
                // 首页导航按钮文本。
                firstPageText: "首页",
                // 尾页导航按钮文本。
                lastPageText: "尾页",
                // 设置页码输入框中显示的提示文本。
                pageInputPlaceholder: "GO",
                // 接受用户输入内容的延迟时间。单位：毫秒
                pageInputTimeout: 800,
                // 分页尺寸列表。
                pageSizeList: [5, 10, 20],
                // 当分页更改后引发此事件。
                pageChanged: function(pageIndex, pageSize) {
                    page.SearchInfo(pageIndex + 1, pageSize);
                },
            });
    },

    resetForm: function(form) {
        form.find('input').val('');
    },

};

app.drypfx.add = {
    url: 'pages/kyrqdrypfx/drypfxAddWindow.html',
    callback: null,
    vehicles: null,
    open: function() {
        $m.page.openPage(this.url, 'fade', 'container-wrapper');
    },
    close: function() {
        this.clear();
        $m.page.closePage(this.url, 'fade', 'container-wrapper');
    },
    init: function() {
        var that = this;

        $('#window-drypfx-addWindow').addClass('popIn');
        // 弹框 'x' 点击关闭按钮事件监听
        $('#window-drypfx-addWindow .btn-window-close').off('click').on('click', function() {
            $('#window-drypfx-addWindow').addClass('popOut');
            that.close();
        });

        this.initForm();

        // 弹框 ‘确定’ 按钮点击提交表单事件监听
        $('#btn-ok-group-add').off('click').on('click', function() {
            $('#form-group-add').submit();
        })
    },
    clear: function() {
        this.callback = null;
        this.vehicles = null;
    },
    initForm: function() {
        $m('#form-group-add').validate({
            submitHandler: function(form) {
                var formData = $m(form).serializeObject();
                $.ajax({
                    url: app.api.kyrqdrypfx.kyrqXzUrl,
                    type: "post",
                    data: formData,
                    success: function(response) {
                        // console.log(response);
                        if (response.success === 1) {
                            app.alert('可疑人群新增成功！');
                            that.close(); // 关闭弹窗
                            app.drypfx.search.SearchInfo(1, 10);; // 初始查询
                        } else {
                            app.alert('可疑人群新增失败！');
                        }
                    },
                    error: function(e) {
                        console.log('可疑人群新增出错！')
                    }
                });
            },
            rules: {
                rqmc: {
                    required: true,
                    // maxlength: 60
                },
                rqlx: {
                    required: true,
                },
                yzyy: {
                    required: true,
                }
            },
            messages: {
                rqmc: {
                    required: "请输入人群名称",
                    // maxlength: '名称长度不能超过20个汉字'
                },
                rqlx: {
                    required: "请输入人群类型",
                },
                yzyy: {
                    required: '请输入研制原因',
                }
            }
        });
    }
};

app.drypfx.check = {
    url: 'pages/kyrqdrypfx/drypfxCheckWindow.html',
    callback: null,
    vehicles: null,
    open: function(that) {
        var checkId = $(that).parent().parent('tr').data('id'); //记录操作的信息id,以便后面获取数据
        $('.page .drypfx').data('checkId', checkId);

        $m.page.openPage(this.url, 'fade', 'container-wrapper');
    },
    close: function() {
        this.clear();
        $m.page.closePage(this.url, 'fade', 'container-wrapper');
    },
    init: function() {
        var that = this;

        $('#window-drypfx-checkWindow').addClass('popIn');
        // 弹框 'x' 点击关闭按钮事件监听
        $('#window-drypfx-checkWindow .btn-window-close').off('click').on('click', function() {
            $('#window-drypfx-checkWindow').addClass('popOut');
            that.close();
        });

        // 禁用输入框
        $('input', $('#form-group-check')).prop('disabled', 'disabled');

        this.initForm();

    },
    clear: function() {
        this.callback = null;
        this.vehicles = null;
    },
    initForm: function() {
        // 初始化输入框内容内容
        $.ajax({
            url: app.api.kyrqdrypfx.kyrqIdCxUrl + $('.page .drypfx').data('checkId') + '/',
            type: "get",
            success: function(response) {
                if (response.success === 1) {
                    $m('#form-group-check').setFormValues(response.msg);
                } else {
                    app.alert('可疑人群根据id查询失败！');
                }
            },
            error: function(e) {
                console.log('群可疑人群根据id查询出错！')
            }
        });
    }

};

app.drypfx.import = {
    url: 'pages/kyrqdrypfx/excelWindow.html',
    callback: null,
    vehicles: null,
    open: function(that) {
        var importId = $(that).parent().parent('tr').data('id'); //记录操作的信息id,以便后面获取数据
        $('.page .drypfx').data('importId', importId);

        $m.page.openPage(this.url, 'fade', 'container-wrapper');
    },
    close: function() {
        this.clear();
        $m.page.closePage(this.url, 'fade', 'container-wrapper');
    },
    init: function() {
        var that = this,
            importId = $('.page .drypfx').data('importId'),
            url = app.api.kyrqdrypfx.kyryDrUrl.replace('{kyrqbh}', importId);

        $('#uploadExcelFile input[name="kyrqbh"]').val(importId); //初始化表单人群编号

        $('#window-excelWindow').addClass('popIn');
        // 弹框 'x' 点击关闭按钮事件监听
        $('#window-excelWindow .btn-window-close').off('click').on('click', function() {
            $('#window-excelWindow').addClass('popOut');
            that.close();
        });

        // 文件类型判断
        $('#fileupload').on('change', function() {
            var that = this,
                value = $(this).val(),
                reg = /(xls|xlsx)$/;

            if (!reg.test(value)) {
                app.alert('文件类型不符');
                $(this).val('');
            }
        })

        // 确定按钮
        $('#btn-ok-excel').on('click', function() {
            // 提交前判断
            if ($('#fileupload').val() === '') {
                app.alert('请选择文件');
                return;
            }

            // 文件上传
            $.ajax({
                url: url,
                type: 'POST',
                cache: false,
                data: new FormData($('#uploadExcelFile')[0]),
                processData: false,
                contentType: false,
                dataType: "json",
                beforeSend: function() {
                    app.loading.show();
                },
                success: function(data) {
                    app.loading.hide();
                    if (data.success === 1) {
                        app.alert('文件导入成功！');
                        if (page === 'gzqt') {
                            app.gzqt.search.initSearchForm(1, 10, app.gzqt.search.pagination);
                            return;
                        }
                        if (page === 'zxrygl') {
                            app.zxrygl.search.initSearchForm(0, 1, app.zxrygl.search.pagination);
                            return;
                        }
                    } else {
                        app.alert('文件导入失败！');
                    }
                },
                error: function(error) {
                    app.alert('文件导入出错！' + error);
                    app.loading.hide();
                }
            });

            that.close();
        });
    },
    clear: function() {
        this.callback = null;
        this.vehicles = null;
    },

};

app.drypfx.search = {
    init: function() {
        app.time.init();
        this.SearchInfo(1, 10);

        // 结果表格全选checkbox按钮功能
        $('#list-drypfx .checks').off('click').on('click', function(e) {
            var checkboxElem = $('#list-drypfx .table_all input[type="checkbox"]');

            if ($(this).find('input').is(':checked')) {
                checkboxElem.prop("checked", true);
            } else {
                checkboxElem.prop("checked", false);
            }
        })
    },

    SearchInfo: function(pageNo, pageSize) {
        var formData = $m('#form-group-search').serializeObject(),
            that = this;
        formData.pageNo = pageNo;
        formData.pageSize = pageSize;

        $.ajax({
            url: app.api.kyrqdrypfx.kyrqCxUrl,
            type: "get",
            data: formData,
            success: function(result) {
                if (result.success !== 1) {
                    app.alert('可疑人群查询失败！');
                    console.log('result.success !=== 1');
                    return;
                }

                var msg = result.msg,
                    data = msg.result,
                    resultHtml = '';

                // 拼接、并添加html代码
                for (var i = 0; i < data.length; i++) {
                    resultHtml += "<tr data-id=" + data[i].kyrqbh + ">" +
                        `<td>
                            <label class="check">
                                <input type="checkbox" name="task" value="${data[i].kyrqbh}">
                                <span> </span>
                            </label> 
                        </td>` +
                        "<td>" + app.data(data[i].kyrqbh) + "</td>" +
                        "<td>" + app.data(data[i].rqmc) + "</td>" +
                        "<td>" + app.data(data[i].rqlx) + "</td>" +
                        "<td>" + app.data(data[i].rqgm) + "</td>" +
                        "<td>" + app.data(data[i].drsj) + "</td>" +
                        "<td>" + app.data(data[i].drr) + "</td>" +
                        "<td>" + app.data(data[i].yzyy) + "</td>" +
                        `<td>
                            <button class="btn btn-sm btn-primary" onclick="app.drypfx.import.open(this);">导入</button>
                            <button class="btn btn-sm btn-primary" style="margin-left:3px;" onclick="app.ckrqcy.search.open(this);">人员</button>
                            <button class="btn btn-sm btn-primary" style="margin-left:3px;" onclick="app.drypfx.check.open(this);">查看</button>
                            <button class="btn btn-sm btn-info" style="margin-left:3px;" onclick="app.drypfx.update.open(this);">修改</button>
                            <button class="btn btn-sm btn-danger" style="margin-left:3px;">到图析</button>
                            <button class="btn btn-sm btn-danger" style="margin-left:3px;">关系碰撞</button>
                        </td>` +
                        "</tr >"
                }
                $(".drypfx .table_all").empty().append(resultHtml);
                // 分页器初始化
                app.drypfx.pagination && app.drypfx.pagination(msg, $('#drypfxPagination'), that);
            },
            error: function(e) {
                console.log('可疑人群查询出错！')
            },
        });
    },

    reset: function() {
        app.drypfx.resetForm($('#form-group-search'));
    },

};

app.drypfx.update = {
    url: 'pages/kyrqdrypfx/drypfxUpdateWindow.html',
    callback: null,
    vehicles: null,
    open: function(that) {
        var updateId = $(that).parent().parent('tr').data('id'); //记录操作的信息id,以便后面获取数据
        $('.page .drypfx').data('updateId', updateId);

        $m.page.openPage(this.url, 'fade', 'container-wrapper');
    },
    close: function() {
        this.clear();
        $m.page.closePage(this.url, 'fade', 'container-wrapper');
    },
    init: function() {
        var that = this;

        $('#window-drypfx-updateWindow').addClass('popIn');
        // 弹框 'x' 点击关闭按钮事件监听
        $('#window-drypfx-updateWindow .btn-window-close').off('click').on('click', function() {
            $('#window-drypfx-updateWindow').addClass('popOut');
            that.close();
        });

        this.initForm();

        // 弹框 ‘确定’ 按钮点击提交表单事件监听
        $('#btn-ok-group-update').off('click').on('click', function() {
            var updateId = $('.page .drypfx').data('updateId'),
                formData = $m('#form-group-update').serializeObject();
            formData.kyrqbh = updateId;

            $.ajax({
                url: app.api.kyrqdrypfx.kyrqXgUrl + updateId + '/',
                type: "put",
                data: formData,
                success: function(response) {
                    // console.log(response);
                    if (response.success === 1) {
                        app.alert('可疑人群修改成功！');
                        that.close(); // 关闭弹窗
                        app.drypfx.search.SearchInfo(1, 10); // 初始查询
                    } else {
                        app.alert('可疑人群修改失败！');
                    }
                },
                error: function(e) {
                    console.log('可疑人群修改出错！');
                }
            });
        })
    },
    clear: function() {
        this.callback = null;
        this.vehicles = null;
    },
    initForm: function() {
        // 复现表单数据
        $.ajax({
            url: app.api.kyrqdrypfx.kyrqIdCxUrl + $('.page .drypfx').data('updateId') + '/',
            type: "get",
            success: function(response) {
                if (response.success === 1) {
                    $m('#form-group-update').setFormValues(response.msg);
                } else {
                    app.alert('可疑人群根据id查询失败！');
                }
            },
            error: function(e) {
                console.log('群可疑人群根据id查询出错！');
            }
        });
    }
};

app.ckrqcy = {
    // 多条信息删除
    deleteMutiple: function() {
        var idsArray = [],
            ids = '';

        $('#list-ckrqcy .table_all input[type="checkbox"]:checked').each(function() {
            idsArray.push($(this).val());
        });
        ids = idsArray.join(',');

        layer.confirm('您确定要删除这些信息吗？', {
            btn: ['确定', '取消'],
            title: '删除'
        }, function(index) {
            $.ajax({
                url: app.api.kyrqdrypfx.kyryScUrl + '?ids=' + ids,
                type: "delete",
                success: function(response) {
                    // console.log(response);
                    if (response.success === 1) {
                        app.alert('可疑人员删除成功！');
                        app.ckrqcy.search.SearchInfo(1, 10); // 初始查询
                    } else {
                        app.alert('可疑人员删除失败！');
                    }
                },
                error: function(e) {
                    console.log('可疑人员删除出错！');
                }
            });

            layer.close(index);
        });
    },
};
app.ckrqcy.add = {
    url: 'pages/kyrqdrypfx/ckrqcyAddWindow.html',
    callback: null,
    vehicles: null,
    open: function() {
        $m.page.openPage(this.url, 'fade', 'container-wrapper');
    },
    close: function() {
        this.clear();
        $m.page.closePage(this.url, 'fade', 'container-wrapper');
    },
    init: function() {
        var that = this;

        $('#window-ckrqcy-addWindow').addClass('popIn');
        // 弹框 'x' 点击关闭按钮事件监听
        $('#window-ckrqcy-addWindow .btn-window-close').off('click').on('click', function() {
            $('#window-ckrqcy-addWindow').addClass('popOut');
            that.close();
        });

        // this.initForm();

        // 弹框 ‘确定’ 按钮点击提交表单事件监听
        $('#btn-ok-person-add').off('click').on('click', function() {
            var formData = $m('#form-person-add').serializeObject();
            $.ajax({
                url: app.api.kyrqdrypfx.kyryXzUrl,
                type: "post",
                data: formData,
                success: function(response) {
                    // console.log(response);
                    if (response.success === 1) {
                        app.alert('可疑人员新增成功！');
                        that.close(); // 关闭弹窗
                        app.ckrqcy.search.SearchInfo(1, 10);; // 初始查询
                    } else {
                        app.alert('可疑人员新增失败！');
                    }
                },
                error: function(e) {
                    console.log('可疑人员新增出错！')
                }
            });
        })
    },
    clear: function() {
        this.callback = null;
        this.vehicles = null;
    },
    initForm: function() {

    }
};

app.ckrqcy.check = {
    url: 'pages/kyrqdrypfx/ckrqcyCheckWindow.html',
    callback: null,
    vehicles: null,
    open: function(that) {
        var checkId = $(that).parent().parent('tr').data('id'); //记录操作的信息id,以便后面获取数据
        $('.ckrqcy').data('checkId', checkId);

        $m.page.openPage(this.url, 'fade', 'container-wrapper');
    },
    close: function() {
        this.clear();
        $m.page.closePage(this.url, 'fade', 'container-wrapper');
    },
    init: function() {
        var that = this;

        $('#window-ckrqcy-checkWindow').addClass('popIn');
        // 弹框 'x' 点击关闭按钮事件监听
        $('#window-ckrqcy-checkWindow .btn-window-close').off('click').on('click', function() {
            $('#window-ckrqcy-checkWindow').addClass('popOut');
            that.close();
        });

        // 禁用输入框
        $('input', $('#form-person-check')).prop('disabled', 'disabled');

        this.initForm();

    },
    clear: function() {
        this.callback = null;
        this.vehicles = null;
    },
    initForm: function() {
        // 初始化输入框内容内容
        $.ajax({
            url: app.api.kyrqdrypfx.kyryIdCxUrl + $('.ckrqcy').data('checkId') + '/',
            type: "get",
            success: function(response) {
                console.log(response)
                if (response.success === 1) {
                    $m('#form-person-check').setFormValues(response.msg);
                } else {
                    app.alert('可疑人员根据id查询失败！');
                }
            },
            error: function(e) {
                console.log('可疑人员根据id查询出错！')
            }
        });
    }

};

app.ckrqcy.search = {
    url: 'pages/kyrqdrypfx/ckrqcy.html',
    callback: null,
    vehicles: null,
    open: function(that) {
        var groupId = $(that).parent().parent('tr').data('id'); //记录操作的信息id,以便后面获取数据
        $('.page .drypfx').data('groupId', groupId);

        $m.page.openPage(this.url, 'fade', 'container-wrapper');
    },
    close: function() {
        this.clear();
        $m.page.closePage(this.url, 'fade', 'container-wrapper');
    },
    init: function() {
        //弹窗按钮 
        var that = this;
        $('#window-drypfx-addWindow').addClass('popIn');
        // 弹框 'x' 点击关闭按钮事件监听
        $('#window-drypfx-addWindow .btn-window-close').off('click').on('click', function() {
            $('#window-drypfx-addWindow').addClass('popOut');
            that.close();
        });

        // 页面内容初始化
        app.time.init();
        // 初始化可疑人群编号 
        $('#form-person-search input[name="kyrqbh"]').val($('.page .drypfx').data('groupId'));
        // 初始化查询
        this.SearchInfo(1, 10);

        // 结果表格全选checkbox按钮功能
        $('#list-ckrqcy .checks').off('click').on('click', function(e) {
            var checkboxElem = $('#list-ckrqcy .table_all input[type="checkbox"]');

            if ($(this).find('input').is(':checked')) {
                checkboxElem.prop("checked", true);
            } else {
                checkboxElem.prop("checked", false);
            }
        })
    },

    SearchInfo: function(pageNo, pageSize) {
        var formData = $m('#form-person-search').serializeObject(),
            that = this;
        formData.pageNo = pageNo;
        formData.pageSize = pageSize;

        $.ajax({
            url: app.api.kyrqdrypfx.kyryCxUrl,
            type: "get",
            data: formData,
            success: function(result) {
                if (result.success !== 1) {
                    app.alert('可疑人员查询失败！');
                    console.log('result.success !=== 1');
                    return;
                }

                var msg = result.msg,
                    data = msg.result,
                    resultHtml = '';

                // 拼接、并添加html代码
                for (var i = 0; i < data.length; i++) {
                    resultHtml += "<tr data-id=" + data[i].kyryid + ">" +
                        `<td>
                            <label class="check">
                                <input type="checkbox" name="task" value="${data[i].kyryid}">
                                <span> </span>
                            </label> 
                        </td>` +
                        "<td>" + app.data(data[i].kyrqbh) + "</td>" +
                        "<td>" + app.data(data[i].sfzh) + "</td>" +
                        "<td>" +
                        '<button class="btn btn-sm btn-primary" onclick="app.ckrqcy.check.open(this);">查看</button>' +
                        '<button class="btn btn-sm btn-info" style="margin-left:10px;" onclick="app.ckrqcy.update.open(this);">修改</button>' +
                        '<button class="btn btn-sm btn-danger" style="margin-left:10px;" onclick="app.ckrqcy.deleteSingle(this);">删除</button>' +
                        "</td>" +
                        "</tr >"
                }
                $(".ckrqcy .table_all").empty().append(resultHtml);
                // 分页器初始化
                app.drypfx.pagination && app.drypfx.pagination(msg, $('#personPagination'), that);
            },
            error: function(e) {
                console.log('可疑人员查询出错！');
            },
        });
    },

    clear: function() {
        this.callback = null;
        this.vehicles = null;
    },

    initForm: function() {

    },

    reset: function() {
        app.drypfx.resetForm($('#form-person-search'));
    },


};

app.ckrqcy.update = {
    url: 'pages/kyrqdrypfx/ckrqcyUpdateWindow.html',
    callback: null,
    vehicles: null,
    open: function(that) {
        var updateId = $(that).parent().parent('tr').data('id'); //记录操作的信息id,以便后面获取数据
        $('.ckrqcy').data('updateId', updateId);

        $m.page.openPage(this.url, 'fade', 'container-wrapper');
    },
    close: function() {
        this.clear();
        $m.page.closePage(this.url, 'fade', 'container-wrapper');
    },
    init: function() {
        var that = this;

        $('#window-ckrqcy-updateWindow').addClass('popIn');
        // 弹框 'x' 点击关闭按钮事件监听
        $('#window-ckrqcy-updateWindow .btn-window-close').off('click').on('click', function() {
            $('#window-ckrqcy-updateWindow').addClass('popOut');
            that.close();
        });

        this.initForm();

        // 弹框 ‘确定’ 按钮点击提交表单事件监听
        $('#btn-ok-person-update').off('click').on('click', function() {
            var updateId = $('.ckrqcy').data('updateId'),
                formData = $m('#form-person-update').serializeObject();

            $.ajax({
                url: app.api.kyrqdrypfx.kyryXgUrl + updateId + '/',
                type: "put",
                data: formData,
                success: function(response) {
                    // console.log(response);
                    if (response.success === 1) {
                        app.alert('可疑人员修改成功！');
                        that.close(); // 关闭弹窗
                        app.ckrqcy.search.SearchInfo(1, 10); // 初始查询
                    } else {
                        app.alert('可疑人员修改失败！');
                    }
                },
                error: function(e) {
                    console.log('可疑人员修改出错！');
                }
            });
        })
    },
    clear: function() {
        this.callback = null;
        this.vehicles = null;
    },
    initForm: function() {
        // 复现表单数据
        $.ajax({
            url: app.api.kyrqdrypfx.kyryIdCxUrl + $('.ckrqcy').data('updateId') + '/',
            type: "get",
            success: function(response) {
                if (response.success === 1) {
                    $m('#form-person-update').setFormValues(response.msg);
                } else {
                    app.alert('可疑人员根据id查询失败！');
                }
            },
            error: function(e) {
                console.log('可疑人员根据id查询出错！');
            }
        });
    }
};
