define(function(require, exports, module) {
    var commonFunc = require('./person');
    //辖区
    var xqlb = {};
    //省
    var provinces = {};
    //市
    var cities = {};
    //县
    var counties = {};
	
	
	var isFirstQuery=true;
	
	var zdryxl = {}
	
/**
 * 初始省份
 * @param provinces
 */
function initProvince1(provinces) {
    Get("/code/jgAll1", function (data) {
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
function  initCity1(cities){
    $('#myDataSheng').change(function() {
		if(!this.value){
			$("#myDataShi").empty().append( "<option value=''>市级籍贯</option>").change();
			return false;
		}
        if ($('#myDataSheng option:selected').val() != undefined) {
            var level =$('#myDataSheng option:selected').val().split(",")[1];
            $("#myDataShi").empty();
            Get("/code/jgAll2?id=" + level, function (data) {
                $("#myDataShi").append( "<option value=''>市级籍贯</option>");
                $.each(data, function (index, item) {
                    $("#myDataShi").append("<option value='" + item.code + "," + item.id + "'>" + item.name + "</option>");
                    cities[item.code] = item.name
                });
                $('.chosen-select').chosen();
                $('.chosen-select-deselect').chosen({allow_single_deselect: true});
            })
        }
    })
}

/**
 *初始区县
 * @param cities
 */
function  initCounty1(counties){
    $('#myDataShi').change(function() {
		if(!this.value){
			$("#myDataXian").empty().append( "<option value=''>区县籍贯</option>");
			return false;
		}
        if ($('#myDataShi option:selected').val() != undefined) {
            var level =$('#myDataShi option:selected').val().split(",")[1];
            var $myDataxian = $("#myDataXian").empty().append( "<option value=''>区县籍贯</option>");
            Get("/code/jgAll2?id=" + level, function (data) {
                $.each(data, function (index, item) {
                    $myDataxian.append("<option value='" + item.code + "," + item.id + "'>" + item.name + "</option>");
                    cities[item.code] = item.name
                });
                $('.chosen-select').chosen();
                $('.chosen-select-deselect').chosen({allow_single_deselect: true});
            })
        }
    })
}
        var pages,//分页数
        size = 20;//页面数量
    $(function () {
        //calendar();
        //初始化省
        initProvince1(provinces);
        //联动市
        initCity1(cities);
        //联动县
        initCounty1(counties);
        //初始化辖区
        //initXq(xqlb);
        //初始化细类
        initZdrylb(zdryxl);
        //总数
        var count=0;
        //绑定查询按钮事件
        $("#query").bind('click', function () {
			isFirstQuery=true
            pagipationQuery(0,size);
        }).click();
    });

    /**
     * 分页控件
     * @param total
     */
    function pagination(total) {
        var demo2 = BootstrapPagination($("#pagination"), {
            layoutScheme: "lefttext,pagesizelist,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
            //记录总数。
            total: total,
            //分页尺寸。指示每页最多显示的记录数量。
            pageSize: 20,
            //当前页索引编号。从其开始（从0开始）的整数。
            pageIndex: 0,
            //指示分页导航栏中最多显示的页索引数量。
            pageGroupSize: 10,
            //位于导航条左侧的输出信息格式化字符串
            leftFormateString: "本页{count}条记录/共{total}条记录",
            //位于导航条右侧的输出信息格式化字符串
            rightFormateString: "第{pageNumber}页/共{totalPages}页",
            //页码文本格式化字符串。
            pageNumberFormateString: "{pageNumber}",
            //分页尺寸输出格式化字符串
            pageSizeListFormateString: "每页显示{pageSize}条记录",
            //上一页导航按钮文本。
            prevPageText: "上一页",
            //下一页导航按钮文本。
            nextPageText: "下一页",
            //上一组分页导航按钮文本。
            prevGroupPageText: "上一组",
            //下一组分页导航按钮文本。
            nextGroupPageText: "下一组",
            //首页导航按钮文本。
            firstPageText: "首页",
            //尾页导航按钮文本。
            lastPageText: "尾页",
            //设置页码输入框中显示的提示文本。
            pageInputPlaceholder: "GO",
            //接受用户输入内容的延迟时间。单位：毫秒
            pageInputTimeout: 800,
            //分页尺寸列表。
            pageSizeList: [5, 10, 20, 50, 100, 200],
            //当分页更改后引发此事件。
            pageChanged: function (pageIndex, pageSize) {
                pagipationQuery(pageIndex,pageSize);
            },
        });
    }

function xbmc(xbdm){
	if(xbdm == '1')
		return "男";
	if(xbdm == '2')
		return "女";
	else 
		return "未知";
}

    /**
     * 分页器查询
     * @param pageIndex 当前页数
     * @param pageSize 每页显示条数
     */
    function pagipationQuery(pageIndex,pageSize){
        var jgdm_sf=$("#myDataSheng").val().split(",")[0].substr(0,2);
        var jgdm_s=$("#myDataShi").val().split(",")[0].substr(0,4);
        var jgdm_qx=$("#myDataXian").val().split(',')[0];
		
        var nl1=$("#myDataYear").val().split(",")[0];
        var nl2=$("#myDataYear").val().split(",")[1];
		
        var xjlb=$("#myDataXieJiao").val();
        var xb=$("#myDataSex").val();
		var from = 1;
        if(pageIndex!=null){
            if(pageIndex*pageSize>=9985){
                from=9985;
            }else{
                from=pageIndex*pageSize;
            }
        }
		var size1 = pageSize
		
        Post("/personXjry/overview",{
        	jgdm_sf: jgdm_sf,
        	jgdm_s: jgdm_s,
        	jgdm_qx: jgdm_qx,
        	nl1: nl1,
        	nl2: nl2,
        	xjlb: xjlb,
        	xbdm: xb,
        	pageNo: from,
        	size: size1
        }, function (rs) {
            var htmlobj="";
            $("#tableBody").empty();
            count=rs.result.length;
			var data = rs.result;
            $.each(data, function (index, item) {
                    htmlobj+="<tr>\
					<td>"+clearNull(item.xm)+"</td>\
					<td>"+clearNull(item.sfzh)+"</td>\
					<td>"+clearNull(xbmc(item.xbdm))+"</td>\
					<td>"+clearNull(item.mzmc)+"</td>\
					<td>"+clearNull(item.jg_sf+item.jg_s+item.jg_qx)+"</td>\
					<td>"+clearNull(item.nl)+"</td>\
					<td>"+clearNull(zdryxl[item.zdryxl])+"</td>\
					<td>"+clearNull(item.zy)+"</td>\
					<td>"+clearNull(item.jzdz)+"</td>\
					</tr>";
                
            });
            $("#tableBody").append(htmlobj);
            if(pageIndex=null||isFirstQuery) {
                if(rs.total>10000){
                    pagination(10000);
                }else{
                    pagination(rs.total);
                }

            }

            if(rs.result.length>0){
                isFirstQuery=false;
            }
        })
    }

function serialize(postData){
	var params = "";
	for(var key in postData){
		var value = postData[key];
		if(value)
			params += ("&" + key + "=" + value);
	}
	return params;
}

});
