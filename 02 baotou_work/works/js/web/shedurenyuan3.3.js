
    var xqlb = {};
    //省
    var provinces = {};
    //市
    var cities = {};
    //县
    var counties = {};
    var mzlb = {}
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
        
        initMzlb(mzlb)
        //绑定查询按钮事件
        $("#query").bind('click', function () {
            pagipationQuery(null,15);
        })
       
       initZdrylb(zdrylbmap,pagipationQuery(null,15))
         
        
    });
    var isFirstQuery=true;
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
        //结束时间
        //var endTime = "&endTime="+$("#reservation").val().split(",")[1];
        //行政区划代码
        //var ssds_xzqhdm="&ssds_xzqhdm="+($("#area").value==undefined?"":"&ssds_xzqhdm="+$("#area").value);
        //籍贯代码（省分）
        var jgdm_sf=$("#myDataSheng").val();
        if(jgdm_sf!=undefined&&jgdm_sf!=""&&jgdm_sf!="-1"){
            jgdm_sf=(jgdm_sf.split(",")[0]).substring(0,2);
        }else{
            jgdm_sf="";
        }
        //籍贯代码（市）
        var jgdm_s=$("#myDataShi").val();
        if(jgdm_s!=undefined && jgdm_s!=""&&jgdm_s!="-1"){
            jgdm_s=jgdm_s.split(",")[0].substring(0,4);
        }else{
            jgdm_s="";
        }
        //籍贯代码（区县）
        var jgdm_qx=($("#myDataXian").val() == undefined || $("#myDataXian").val() == -1 )?"":$("#myDataXian").val().split(",")[0];
        //年龄从
        var nl1=$("#myDataYear").val().split(",")[0];
        // 年龄到
        var nl2=$("#myDataYear").val().split(",")[1];
        //性别
        var xb=($("#myDataSex").val()==undefined?"":$("#myDataSex").val());
        var from=1;
        if(pageIndex!=null){
            if(pageIndex*pageSize>=9985){
                from=9985;
            }else{
                from=pageIndex*pageSize;
            }
        }
        var size1=pageSize;
        Post("/shedu/overview",{
        	jgdm_sf: jgdm_sf,
        	jgdm_s: jgdm_s,
        	jgdm_qx: jgdm_qx,
        	nl1: nl1,
        	nl2: nl2,
        	xbdm: xb,
        	pageNo: from,
        	size: size1
        }, function (data) {
            var htmlobj="";
            $("#tableBody").empty();
            count=data.result.length;
            $.each(data.result, function (index, item) {
      
                $("#tableBody").append(
						    "<tr>"+
						    "<td>"+(item.xm==undefined?'':item.xm)+"</td>"+
						    "<td>"+(item.sfzh==undefined?'':item.sfzh)+"</td>"+
						   	"<td>"+(item.xbdm==1?'男':'女')+"</td>"+
						    "<td>"+(mzlb[item.mzdm]==undefined?'':mzlb[$.trim(item.mzdm)])+"</td>"+
						    "<td>"+(item.jg_sf==undefined?'':item.jg_sf)+"</td>"+
						    "<td>"+(item.nl==undefined?'':parseInt(item.nl))+"</td>"+
						    "<td>"+(item.zdrylbbjmc == undefined ? '':item.zdrylbbjmc)+"</td>"+
						    "<td>"+(item.zylbdm=="null"?'':item.zylbdm)+"</td>"+
						    "</tr>"
				);
            });
            if(pageIndex=null||isFirstQuery) {
                if(data.total>10000){
                    pagination(10000);
                }else{
                    pagination(data.total);
                }

            }
            if(data.result.length>0){
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
    	if(z.indexOf(",")!=-1){
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
