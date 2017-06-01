var oneRegion = ['新城区', '回民区', '玉泉区', '赛罕区', '土默特左旗', '托克托县', '和林格尔县', '清水河县', '武川县'];
var hotelname = ['酒店1', '酒店2', '酒店3', '酒店4', '酒店5', '酒店6', '酒店7', '酒店8', '酒店9'];
//日期控件中文
var locale = {
    "format": 'YYYY-MM-DD',
    "separator": " -222 ",
    "applyLabel": "确定",
    "cancelLabel": "取消",
    "fromLabel": "起始时间",
    "toLabel": "结束时间'",
    "customRangeLabel": "自定义",
    "weekLabel": "W",
    "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
    "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    "firstDay": 1
};

/**
 * 定义全局变量host
 * @type {string}
 */
var host = "http://"+location.host+ "/rest";

/**
 * 定义get方法
 * @param url
 * @param success
 * @
 */
function Get(url,success){
    fetch(host + url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'  
        }
    }).then(
        function(response){
            return response.json()
        }
    ).then(success)
        .catch(function(ex) {
            console.log('parsing failed', ex)
        })
}

/**
 * 定义post方法
 * @param url
 * @param params
 * @param success
 * @constructor
 */
function Post(url,params,success){
    fetch(host + url, {
        method: "POST",
        headers: {
            //'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        //body:JSON.stringify(params)
        body:params
    }).then(function(response){return response.json()}).then(success)
        .catch(function(ex) {console.log('parsing failed', ex)})
}

/**
 * 初始化时间控件
 */
var initCalender = function () {
    var startDate = moment(moment().subtract(30, 'days').calendar()).format("YYYY-MM-DD");
    var endDate = moment().format("YYYY-MM-DD");

    //日期,默认时间设成当日到前30天
    var reservation = $('#reservation');
    reservation.val(startDate + ',' + endDate);
    reservation.daterangepicker({
        'locale': locale,
        format: "YYYY-MM-DD",
        startDate: startDate,
        endDate: endDate
    }, function (start, end) {
        startDate = start.format('YYYY-MM-DD');
        endDate = end.format('YYYY-MM-DD');
		$('#reservation').val(startDate + ',' + endDate);
    });
};

/**
 * 初始化辖区
 * @param xqlb
 */
function initXq(xqlb) {
    Get("/code/area", function (data) {
        $.each(data, function (index, item) {
            $("#area").append("<option value='" + item.code + "'>" + item.value + "</option>");
            xqlb[item.code] = item.value
        });
        $('.chosen-select').chosen();
        $('.chosen-select-deselect').chosen({allow_single_deselect: true});
    })
}

/**
 * 初始省份
 * @param provinces
 */
function initProvince(provinces) {
    Get("/code/jgAll2?id=0", function (data) {
        $("#myDataSheng").empty().append( "<option value=''>省级籍贯</option>");
        $.each(data, function (index, item) {
            $("#myDataSheng").append("<option value='" + item.code + ","+item.id+"'>" + item.name + "</option>");
            provinces[item.code] = item.name
        });
        $('.chosen-select').chosen();
        $('.chosen-select-deselect').chosen({allow_single_deselect: true});
    })
}

/**
 *初始市
 * @param cities
 */
function  initCity(cities){
    $('#myDataSheng').change(function() {
		var sheng = $('#myDataSheng option:selected').val();
        if (sheng != undefined) {
            var level =$('#myDataSheng option:selected').val().split(",")[1] || "";
            $("#myDataShi").empty().append( "<option value=''>市级籍贯</option>").change();
            Get("/code/jgAll2?id=" + level, function (data) {
                $.each(data, function (index, item) {
                    $("#myDataShi").append("<option value='" + item.code + "," + item.id + "'>" + item.name + "</option>");
                    cities[item.code] = item.name
                });
                $('.chosen-select').chosen();
                $('.chosen-select-deselect').chosen({allow_single_deselect: true});
            });
        }
    })
}

/**
 *初始区县
 * @param counties
 */
function  initCounty(counties){
    $('#myDataShi').change(function() {
        if ($('#myDataShi option:selected').val() != undefined) {
            var level =$('#myDataShi option:selected').val().split(",")[1] || "";
            $("#myDataXian").empty().append( "<option value=''>区县籍贯</option>");
            Get("/code/jgAll2?id=" + level, function (data) {
                $.each(data, function (index, item) {
                    $("#myDataXian").append("<option value='" + item.code + "'>" + item.name + "</option>");
                    counties[item.code] = item.name
                });
                $('.chosen-select').chosen();
                $('.chosen-select-deselect').chosen({allow_single_deselect: true});
            })
        }
    })
}

function initZdrylb(zdrylb,func){
	Get("/code/zdryxlAll", function (data) {
        $.each(data, function (index, item) {
            zdrylb[item.code] = item.name
        });
        func
    })
}
function initMzlb(mzlb) {
	Get("/code/mzAll", function (data) {
        $.each(data, function (index, item) {
        	if(item.code.length <= 1) {
        		var i = "0"+ item.code
        		mzlb[i] = item.name
        	}
            mzlb[item.code] = item.name
        });
    })
}

//导航
document.write(' <script src="..\/js\/plugins\/jquery.mousewheel.min.js"></script>');
document.write(' <script src="..\/js\/plugins\/jquery.mCustomScrollbar.min.js"></script>');
document.write(' <link rel="stylesheet" href="..\/css\/plugins\/jquery.mCustomScrollbar.css">');

var iniLeftNav=function () {
    var navs = [{
        url: '', text: '上网人员多维分析',
        subnav: [
            {url: 'overViewOfInternetPerson.html', text: '人员总览'},
            {url: 'featureInternet.html', text: '人员特征分析'}
        ]
    },{
        url: '', text: '涉毒人员多维分析',
        subnav: [
            {url: 'PandectShedu.html', text: '人员总览'},
            {url: 'featureApoison.html', text: '人员特征分析'},
            {url: 'sheduPerson.html', text: '人员区域分析'}
        ]
    },{
        url: '', text: '民航旅客多维分析',
        subnav: [
            {url: 'PandectMinhang.html', text: '人员总览'},
            {url: 'featureCA.html', text: '人员特征分析'}
        ]
    },{
        url: '', text: '邪教人员多维分析',
        subnav: [
            {url: 'PandectXieJiao.html', text: '人员总览'},
            {url: 'featureHeresy.html', text: '人员特征分析'},
            {url: 'xiejiaoPerson.html', text: '人员区域分析'}
        ]
    },{
        url: '', text: '旅馆住宿人员多维分析',
        subnav: [
            {url: 'PandectHotel.html', text: '人员总览'},
            {url: 'featureInnStay.html', text: '人员特征分析'}
        ]
    },{
        url: '', text: '暂住人员多维分析',
        subnav: [
            {url: 'PandectZanzhu.html', text: '人员总览'},
            {url: 'featureStay.html', text: '人员特征分析'},
            {url: 'zanzhuPerson.html', text: '人员区域分析'}
        ]
    },{
        url: '', text: '七类重点人员多维分析',
            subnav: [
            {url: 'PandectQL.html', text: '人员总览'},
            {url: 'featureSeven.html', text: '人员特征分析'},
            {url: 'qileiPerson.html', text: '人员区域分析'}
        ]
    },{
        url: '', text: '两抢一盗人员多维分析',
            subnav: [
            {url: 'PandectLQYD.html', text: '人员总览'},
            {url: 'featureSteal.html', text: '人员特征分析'},
            {url: 'liangqiangyidaoPerson.html', text: '人员区域分析'}
        ]
    },{
        url: '', text: '经侦人员多维分析',
            subnav: [
            {url: 'PandectJingzhen.html', text: '人员总览'},
            {url: 'featureSpyl.html', text: '人员特征分析'},
            {url: 'jingzhenPerson.html', text: '人员区域分析'}
        ]
    },{
        url: '', text: '上访人员多维分析',
            subnav: [
            {url: 'PandectShangfang.html', text: '人员总览'},
            {url: 'featurePetition.html', text: '人员特征分析'},
            {url: 'shangfangPerson.html', text: '人员区域分析'}
        ]
    },{
        url: '', text: '常住人员多维分析',
        subnav: [
            {url: 'PandectChangzhu.html', text: '人员总览'},
            {url: 'featureResident.html', text: '人员特征分析'},
            {url: 'changzhuPerson.html', text: '人员区域分析'}
        ]
    },{
        url: '', text: '涉疆人员多维分析',
            subnav: [
            {url: 'PandectShejiang.html', text: '人员总览'},
            {url: 'featureBorder.html', text: '人员特征分析'}
        ]
    },{
        url: '', text: '高危人员多维分析',
            subnav: [
				{url: 'gwLiuruLiuchu.html', text: '高危人员流入流出分析'},
				{url: 'gwLjd.html', text: '高危人员落脚点分析'},
				{url: 'gaoweiPerson.html', text: '高危人员区域分析'}
        ]
    }];
    var html=  '<div class="fixed-nav " ><div class="items"></div>' +
        '<div class="slider "><span></span></div><div class="slider-close hide"><span></span></div> </div>';
    $(html).insertAfter(".top");
    $.each(navs,function (index, nav) {
        var lis=[];
        if(nav.subnav){
            $.each(nav.subnav,function (k, subnav) {
                lis.push('<li url="'+subnav.url+'">'+subnav.text+'</li>')
            });
        }
        $('.fixed-nav .items').append('<div class="nav-box active"><div class="nav-title ">'+nav.text+'</div><ul class="nav-list">'+lis.join('')+'</ul></div>');
    });
    var ind= window.location.pathname.lastIndexOf('/');
    var current= window.location.pathname.substr(ind+1);
    $('.fixed-nav .items').mCustomScrollbar({
        theme: 'minimal'});
    $('.fixed-nav .nav-list li[url="'+current+'"]').addClass('active');
    $('.fixed-nav .nav-list li[url="'+current+'"]').parents('.nav-box').addClass('active');
    $('.fixed-nav .slider').off('click').on('click',function(e){
        e = e || window.event;
        if(e.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
        }else{
            e.returnValue = false;
            e.cancelBubble = true;
        }
        var that=$(this).parent();
        that.animate({left:"0px"});
        $('.nav-box',that).removeClass('hide');
        $('.slider',that).addClass('hide');
        $('.slider-close',that).removeClass('hide');
    });
    var closeSilder=function(){
        $('.fixed-nav').animate({left:"-220px"},function(){
            $('.fixed-nav .nav-box').addClass('hide');
            $('.fixed-nav .slider-close').addClass('hide');
            $('.fixed-nav .slider').removeClass('hide');
        });
    };
    $('.fixed-nav .slider-close').off('click').on('click',function(e){
        closeSilder();
    });
    $('.fixed-nav .nav-list li').off('click').on('click',function(e){
        e = e || window.event;
        if(e.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
        }else{
            e.returnValue = false;
            e.cancelBubble = true;
        }
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parent().addClass('active').siblings().removeClass('active');

        var url=$(this).attr('url');
        window.location=url;
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
		var str = $('.title').text().substr(0,2)
		
		$.each($('.nav-title'), function(k,v) {
	
			var Txt = $(this).text()
			var TitleLen = $('.title').text().length
			
			if(Txt.indexOf(str) != -1) {
				$(v).siblings('ul').show()
				$(v).addClass('actives')
			}else if(TitleLen > 8) {
				var str1 = $('.title').text().substr(6,2)
				if(Txt.indexOf(str1) != -1) {
					$(v).siblings('ul').show()
					$(v).addClass('actives')
				}
			}
			
		});
	}
};
//tab切换
function Tab() {
	$('.gwP_second').hide()
	$('.gwP_ols').on('click','li',function () {
		var i = $(this).index()
		$(this).addClass('hover').siblings('li').removeClass('hover')
		
		$('.gwP_uls>li').eq(i).show().siblings('li').hide()
	})
}
//包头地图
function BtMap(x) {
	var app = echarts.init(document.getElementById('gwP_qianxi'))
	option = {
	      title: {
	            text: '高危人员区域活动分析',
	            left: 'center' //组件的位置
	      },
	      tooltip: {
	            trigger: 'item'
	      },
	      visualMap: {
	            min: 0,
	            max: 6000,
	            left: '10%',
	            top: 'bottom',
	            text: ['高','低'],           // 文本，默认为数值文本
	            calculable: true
	      },
	      series: [
	            {
	                  name: 'person',
	                  type: 'map',
	                  mapType: 'baotou',
	                  roam: false,
	                  label: {
	                        normal: {
	                              show: false
	                        },
	                        emphasis: {
	                              show: true
	                        }
	                  },
	                  data: x
	            }
	      ]
	};
	app.setOption(option)
	app.on('click',function (params) {
		location.href = 'http://127.0.0.1:8020/works/view/zanzhuPerson.html?' + params.name
	})
}
$(document).ready(function(){
    iniLeftNav();
});

//
function clearNull(s){
	switch(s){
		case '':
		case 'null':
		case null:
		case undefined:
			s = "";
			break;
		default:
			break;
	}
	return s;
}