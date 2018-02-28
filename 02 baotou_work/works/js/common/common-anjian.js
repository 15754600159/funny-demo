var oneRegion = ['新城区', '回民区', '玉泉区', '赛罕区', '土默特左旗', '托克托县', '和林格尔县', '清水河县', '武川县'];
var hotelname = ['酒店1', '酒店2', '酒店3', '酒店4', '酒店5', '酒店6', '酒店7', '酒店8', '酒店9'];
//日期控件中文
var locale = {
	"format": 'YYYY-MM-DD',
	"separator": " -222 ",
	"applyLabel": "确定",
	"cancelLabel": "取消",
	"fromLabel": "起始时间",
	"toLabel": "结束时间",
	"customRangeLabel": "自定义",
	"weekLabel": "W",
	"daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
	"monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	"firstDay": 1
};

/**
 * 初始化时间控件
 */
var initCalender = function() {
	var startDate = moment(moment().subtract(30, 'days').calendar()).format("YYYY-MM-DD");
	var endDate = moment().format("YYYY-MM-DD");

	//日期,默认时间设成当日到前30天
	$('#reservation').val(startDate + ',' + endDate);
	$('#reservation').daterangepicker({
		'locale': locale,
		format: "YYYY-MM-DD",
		startDate: startDate,
		endDate: endDate,
	}, function(start, end) {
		startDate = start.format('YYYY-MM-DD');
		endDate = end.format('YYYY-MM-DD');
		$('#reservation').val(startDate + ',' + endDate);
	});
};

//导航
document.write(' <script src="..\/js\/plugins\/jquery.mousewheel.min.js"></script>');
document.write(' <script src="..\/js\/plugins\/jquery.mCustomScrollbar.min.js"></script>');
document.write(' <link rel="stylesheet" href="..\/css\/plugins\/jquery.mCustomScrollbar.css">');

var iniLeftNav = function() {
	var navs = [{
			url: '',
			text: '两抢一盗案件多维分析',
			subnav: [{
					url: 'anjianOverview.html?_type=sflqyd',
					text: '两抢一盗案件总览'
				},
				{
					url: 'anjianFeatures.html?_type=sflqyd',
					text: '两抢一盗案件特征分析'
				},
				{
					url: 'anjianQuShi.html?_type=sflqyd',
					text: '两抢一盗案件趋势分析'
				},
				{
					url: 'anjianArea.html?_type=sflqyd',
					text: '两抢一盗案件区域分析'
				},
				{
					url: 'anjianCaseFenLei.html?_type=sflqyd',
					text: '两抢一盗案件分类分析'
				},
				{
					url: 'SheAnRen.html?_type=sflqyd',
					text: '两抢一盗案件涉案人员分析'
				},
				{
					url: 'SheAnRenArea.html?_type=sflqyd',
					text: '两抢一盗案件涉案人员地域分析'
				}
			]
		}, {
			url: '',
			text: '经侦案件多维分析',
			subnav: [{
					url: 'anjianOverview.html?_type=sfjzaj',
					text: '经侦案件总览'
				},
				{
					url: 'anjianFeatures.html?_type=sfjzaj',
					text: '经侦案件特征分析'
				},
				{
					url: 'anjianQuShi.html?_type=sfjzaj',
					text: '经侦案件趋势分析'
				},
				{
					url: 'anjianArea.html?_type=sfjzaj',
					text: '经侦案件区域分析'
				},
				{
					url: 'anjianCaseFenLei.html?_type=sfjzaj',
					text: '经侦案件分类分析'
				},
				{
					url: 'SheAnRen.html?_type=sfjzry',
					text: '经侦案件涉案人员分析'
				},
				{
					url: 'ShouHaiRen.html?_type=sfjzshr',
					text: '经侦案件受害人员分析'
				},
				{
					url: 'SheAnRenArea.html?_type=sfjzry',
					text: '经侦案件涉案人员地域分析'
				}
			]
		}, {
			url: '',
			text: '刑事案件多维分析',
			subnav: [{
					url: 'anjianOverview.html?_type=sfxsaj',
					text: '刑事案件总览'
				},
				{
					url: 'anjianFeatures.html?_type=sfxsaj',
					text: '刑事案件特征分析'
				},
				{
					url: 'anjianQuShi.html?_type=sfxsaj',
					text: '刑事案件趋势分析'
				},
				{
					url: 'anjianArea.html?_type=sfxsaj',
					text: '刑事案件区域分析'
				},
				{
					url: 'anjianCaseFenLei.html?_type=sfxsaj',
					text: '刑事案件分类分析'
				},
				{
					url: 'SheAnRen.html?_type=sfxsry',
					text: '刑事案件涉案人员分析'
				},
				{
					url: 'ShouHaiRen.html?_type=sfxsshr',
					text: '刑事案件受害人员分析'
				},
				{
					url: 'SheAnRenArea.html?_type=sfxsry',
					text: '刑事案件涉案人员地域分析'
				}
			]
		}, {
			url: '',
			text: '治安案件多维分析',
			subnav: [{
					url: 'anjianOverview.html?_type=sfzaaj',
					text: '治安案件总览'
				},
				{
					url: 'anjianFeatures.html?_type=sfzaaj',
					text: '治安案件分析'
				},
				{
					url: 'anjianQuShi.html?_type=sfzaaj',
					text: '治安案件趋势分析'
				},
				{
					url: 'anjianArea.html?_type=sfzaaj',
					text: '治安案件区域分析'
				},
				{
					url: 'anjianCaseFenLei.html?_type=sfzaaj',
					text: '治安案件分类分析'
				},
				{
					url: 'SheAnRen.html?_type=sfzary',
					text: '治安案件涉案人员分析'
				},
				{
					url: 'ShouHaiRen.html?_type=sfzashr',
					text: '治安案件受害人员分析'
				},
				{
					url: 'SheAnRenArea.html?_type=sfzary',
					text: '治安案件涉案人员地域分析'
				}
			]
		}, {
			url: '',
			text: '八类案件多维分析',
			subnav: [{
					url: 'anjianOverview.html?_type=sfblaj',
					text: '八类案件总览'
				},
				{
					url: 'anjianFeatures.html?_type=sfblaj',
					text: '八类案件特征分析'
				},
				{
					url: 'anjianQuShi.html?_type=sfblaj',
					text: '八类案件趋势分析'
				},
				{
					url: 'anjianArea.html?_type=sfblaj',
					text: '八类案件区域分析'
				},
				{
					url: 'anjianCaseFenLei.html?_type=sfblaj',
					text: '八类案件分类分析'
				},
				{
					url: 'SheAnRen.html?_type=sfblry',
					text: '八类案件涉案人员分析'
				},
				{
					url: 'ShouHaiRen.html?_type=sfblshr',
					text: '八类案件受害人员分析'
				},
				{
					url: 'SheAnRenArea.html?_type=sfblry',
					text: '八类案件涉案人员地域分析'
				}
			]
		},
		/*{
		        url: '', text: '其他案件多维分析',
		        subnav: [
		            {url: 'anjianOverview.html?_type=sfqtaj', text: '其他案件总览'},
		            {url: 'anjianFeatures.html?_type=sfqtaj', text: '其他案件特征分析'},
					{url: 'anjianQuShi.html?_type=sfqtaj', text: '其他案件趋势分析'},
					{url: 'anjianArea.html?_type=sfqtaj', text: '其他案件区域分析'},
		            {url: 'anjianCaseFenLei.html?_type=sfqtaj', text: '其他案件分类分析'},
		            {url: 'SheAnRen.html?_type=sfqtry', text: '其他案件涉案人员分析'},
		            {url: 'ShouHaiRen.html?_type=sfqtshr', text: '其他案件受害人员分析'},
		            {url: 'SheAnRenArea.html?_type=sfqtry', text: '其他案件涉案人员地域分析'}
		        ]
		    },*/
		{
			url: '',
			text: '交通违章案件多维分析',
			subnav: [{
				url: 'JTWZCarAnalyze.html',
				text: '案件涉案车辆分析'
			}]
		}
	];
	var html = '<div class="fixed-nav " ><div class="items"></div>' +
		'<div class="slider "><span></span></div><div class="slider-close hide"><span></span></div> </div>';
	$(html).insertAfter(".top");
	$.each(navs, function(index, nav) {
		var lis = [];
		if(nav.subnav) {
			$.each(nav.subnav, function(k, subnav) {
				lis.push('<li url="' + subnav.url + '">' + subnav.text + '</li>')
			});
		}
		$('.fixed-nav .items').append('<div class="nav-box active"><div class="nav-title ">' + nav.text + '</div><ul class="nav-list">' + lis.join('') + '</ul></div>');
	});
	var ind = window.location.href.lastIndexOf('/');
	var current = window.location.href.substr(ind + 1);
	$('.fixed-nav .items').mCustomScrollbar({
		theme: 'minimal'
	});
	$('.fixed-nav .nav-list li[url="' + current + '"]').addClass('active');
	$('.fixed-nav .nav-list li[url="' + current + '"]').parents('.nav-box').addClass('active');
	$('.fixed-nav .slider').off('click').on('click', function(e) {
		e = e || window.event;
		if(e.preventDefault) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			e.returnValue = false;
			e.cancelBubble = true;
		}
		var that = $(this).parent();
		that.animate({
			left: "0px"
		});
		$('.nav-box', that).removeClass('hide');
		$('.slider', that).addClass('hide');
		$('.slider-close', that).removeClass('hide');
	});
	var closeSilder = function() {
		$('.fixed-nav').animate({
			left: "-220px"
		}, function() {
			$('.fixed-nav .nav-box').addClass('hide');
			$('.fixed-nav .slider-close').addClass('hide');
			$('.fixed-nav .slider').removeClass('hide');
		});
	};
	$('.fixed-nav .slider-close').off('click').on('click', function(e) {
		closeSilder();
	});
	$('.fixed-nav .nav-list li').off('click').on('click', function(e) {
		e = e || window.event;
		if(e.preventDefault) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			e.returnValue = false;
			e.cancelBubble = true;
		}
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parent().addClass('active').siblings().removeClass('active');

		var url = $(this).attr('url');
		window.location = url;
	});
	//左侧导航条
	$('.nav-title').siblings('ul').hide();
	$('.nav-title').on('click',function () {
    	
    	$(this).siblings('ul').toggle()
    	
    	$(this).parent().siblings().children('ul').hide()
    	
    	if(!$(this).hasClass('actives')){
    		$(this).addClass('actives')
    		$(this).parent().siblings().children('div').removeClass('actives')
    	}else {
    		$(this).removeClass('actives')
    	}
    })
    RightTab();
    function RightTab() { 
		var str = location.href.split('?')[1];
		
		$.each($('.nav-box>ul>li'), function(k,v) {
			if($(this).attr('url').split('?')[1] == str) {
				$(this).parent('ul').show();
			}
 		});
	}
};
$(document).ready(function() {
	iniLeftNav();
});
var amGloable = amGloable || {};

amGloable.common = {};
amGloable.common.Get = function(url, success) {
	fetch(host + url, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(function(response) {
		return response.json()
	}).then(success).catch(function(ex) {
		console.log('parsing failed', ex)
	})
}
amGloable.common.Post = function(url, params, success) {
	fetch(host + url, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		}).then(function(response) {
			return response.json()
		}).then(success)
		.catch(function(ex) {
			console.log('parsing failed', ex)
		})
}
amGloable.common.initCalender = initCalender;

function getType(_type) {
	var map = {
		sfzaaj: "ZA",
		sfjzaj: "JZ",
		sfxsaj: "XS",
		sflqyd: "LQYD",
		sfblaj: "BL"
	};
	return map[_type];
}

amGloable.common.initLdaj = function($select1, $select2, $select3) {
	//三级案件类别下拉框
	var $select1 = $select1.empty().append('<option value="">一级案件类别</option>');
	var $select2 = $select2 || $('#ajlb_dm2');
	var $select3 = $select3 || $('#ajlb_dm');
	var type = getType(_type);

	amGloable.api.codeLdajLev1.get("codeType=" + type, function(data) {
		$.each(data, function(i, item) {
			var code = item.codeLev1;
			var value = item.dscLev1;
			$select1.append('<option value="' + code + '">' + value + '</option>');
		});
	});
	$select1.change(function() {
		amGloable.api.codeLdajLev2.get("codeType=" + type + "&code=" + this.value, function(data) {
			$select2.empty().append('<option value="">二级案件类别</option>');
			$.each(data, function(i, item) {
				var code = item.codeLev2;
				var value = item.dscLev2;
				$select2.append('<option value="' + code + '">' + value + '</option>');
			});
			$select2.change();
		});
	});
	$select2.change(function() {
		amGloable.api.codeLdajLev3.get("codeType=" + type + "&codeLev2=" + this.value + "&codeLev1=" + $select1.val(), function(data) {
			$select3.empty().append('<option value="">三级案件类别</option>');
			$.each(data, function(i, item) {
				var code = item.code;
				var value = item.name;
				$select3.append('<option value="' + code + '">' + value + '</option>');
			});
		});
	});
}