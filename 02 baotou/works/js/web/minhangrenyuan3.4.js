
    //辖区
    var xqlb = {};
    //省
    var provinces = {};
    //市
    var cities = {};
    //县
    var counties = {};
    var zdrylbmap = {};
    $(function () {
        var pages,//分页数
            size;//页面数量
        calendar();
        //初始化省
        initProvince(provinces);
        //联动市
        initCity(cities);
        //联动县
        initCounty(counties);
        //初始化辖区
        initXq(xqlb);
        //总数
        var count=0;
       //绑定查询按钮事件
       isFirstQuery=true;
        $("#query").bind('click', function () {
            pagipationQuery(null,15);
            //isFirstQuery=true;
        })
        
        initZdrylb(zdrylbmap,pagipationQuery(null,15))
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
            pageSize: 15,
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


    /**
     * 分页器查询
     * @param pageIndex 当前页数
     * @param pageSize 每页显示条数
     */
    function pagipationQuery(pageIndex,pageSize){
      // 查询数据
        var beginTime = $("#reservation").val().split(",")[0];
        var endTime = $("#reservation").val().split(",")[1];
        var jgdm_sf = $("#myDataSheng").val();
        if(jgdm_sf != undefined && jgdm_sf != "" && jgdm_sf != "-1"){
            jgdm_sf=jgdm_sf.split(",")[0].substring(0,2);
        }else{
            jgdm_sf="";
        }
        //籍贯代码（市）
        var jgdm_s=$("#myDataShi").val();
        if(jgdm_s != undefined && jgdm_s != "" && jgdm_s != "-1"){
            jgdm_s=jgdm_s.split(",")[0].substring(0,4);
        }else{
            jgdm_s="";
        }
        //籍贯代码（区县）
        var jgdm_qx = ($("#myDataXian").val() == undefined || $("#myDataXian").val() == -1 ) ? "" : $("#myDataXian").val().split(",")[0];
        //年龄从
        var nl1 = $("#myDataYear").val().split(",")[0];
        // 年龄到
        var nl2 = $("#myDataYear").val().split(",")[1];
        //性别
        var xbdm = $("#myDataSex").val() == undefined ? "" : $("#myDataSex").val();
        var from = 1;
        if(pageIndex!=null){
            if(pageIndex*pageSize>=9985){
                from = 9985
            }else{
                from = pageIndex + 1
            }
        }
        var size1 = pageSize;
        Post("/personFlight/overview",{
        	beginTime: beginTime,
        	endTime: endTime,
        	jgdm_sf: jgdm_sf,
        	jgdm_s: jgdm_s,
        	jgdm_qx: jgdm_qx,
        	nl1: nl1,
        	nl2: nl2,
        	xbdm: xbdm,
        	pageNo: from,
        	size: size1
        }, function (datas) {
            var arr = [],arr1 = [];
            $("#tableBody").html('');
            $.each(datas.result, function(k,v) {
            	arr.push(v.zdryxl)
            });
            //重点人员类别码表接口
			Get("/code/zdryxlAll",function (data) {
				
				arr1 = datas.result
				$.each(data, function(k,v) {
					
					$("#tableBody").append(
						    "<tr>"+
						    "<td>"+arr1[k].hbh+"</td>"+
						   	"<td>"+arr1[k].xm+"</td>"+
						    "<td>"+arr1[k].zjhm+"</td>"+
						    "<td>"+(arr1[k].xb == 1 ? "男" : "女")+"</td>"+
						    "<td>"+arr1[k].jg_sf+(arr1[k].jg_s == null ? "" : arr1[k].jg_s)+(arr1[k].jg_qx == null ? "" : arr1[k].jg_qx)+"</td>"+
						    "<td>"+arr1[k].nl+"</td>"+
						    "<td>"+(arr1[k].cfd_dwbh == null ? "" : arr1[k].cfd_dwbh)+"</td>"+
						    "<td>"+(arr1[k].mdd_dwmc == null ? "" : arr1[k].mdd_dwmc)+"</td>"+
						    "<td>"+(arr1[k].cfsj == null ? "" : arr1[k].cfsj)+"</td>"+
						   	"<td>"+(arr1[k].ddsj == null ? "" : arr1[k].ddsj)+"</td>"+
						    "<td>"+(zdrylbmap[arr1[k].zdryxl]==undefined?'':zdrylbmap[arr1[k].zdryxl])+"</td>"+
						    "</tr>"
					);
				});
				
			})
            var count=datas.result.length;
            
            if(pageIndex = null || isFirstQuery) {
                if(datas.totalPage > 10000){
                    pagination(10000);
                }else{
                    pagination(datas.totalPage);
                }

            }
            if(datas.result.length>0){
                isFirstQuery=false;
            }
        })
    }

//加载日历
    function calendar() {
        startDate = moment(moment().subtract(30, 'days').calendar()).format("YYYY-MM-DD");
        endDate = moment().format("YYYY-MM-DD");
        //日期，默认时间设成当日到前30天
        $('#reservation').val(startDate + ',' + endDate);
        $('#reservation').daterangepicker({
            applyClass: 'btn-primary',
            clearClass: 'btn-primary',
            'locale': locale,
            format: "YYYY-MM-DD",
            startDate: startDate,
            endDate: endDate,
        }, function (start, end) {
            startDate = start.format('YYYY-MM-DD');
            endDate = end.format('YYYY-MM-DD');
            console.log(startDate);
        });

    }

function convertZdrylb(z){
    	if(z!=null&&z.indexOf(",")!=-1){
    		
    			var arr = z.split(",");
    			var temp = "";
    			for (var i =0 ;i <arr.length ; i++){
    				temp += zdrylbmap[arr[i]+""]+","
    				}
    				return temp.substring(0,temp.length-1)
    		}else{
    			return zdrylbmap[z+""]
    		}
    }