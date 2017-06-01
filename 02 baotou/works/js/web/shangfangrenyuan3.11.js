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
        $("#query").bind('click', function () {
            initData(count,pagipationQuery);
        })
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
            pageSize: 10,
            //当前页索引编号。从其开始（从0开始）的整数。
            pageIndex: 0,
            //指示分页导航栏中最多显示的页索引数量。
            pageGroupSize: 3,
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
     * 查询按钮查询
     * @param count 查询结果总条数
     */
    function initData(count) {
        // 查询数据
        //var beginTime ="?beginTime="+ $("#reservation").val().split(",")[0];
        // var endTime = "&endTime="+$("#reservation").val().split(",")[1];
        var ssds_xzqhdm=$("#area").val();
        var jgdm_sf=$("#myDataSheng").val().split(",")[0].substr(0,2);
        var jgdm_s=$("#myDataShi").val().split(",")[0].substr(0,4);
        var jgdm_qx=$("#myDataXian").val();
        var nl1=$("#myDataYear").val().split(",")[0];
        var nl2=$("#myDataYear").val().split(",")[1];
        var xb=$("#myDataSex").val();
        var from="?from="+1;
        var size1="&size1="+20;
        var showNum=0;
        Get("/ShangFang/personOverview"+from+size1, function (data) {
            var htmlobj="";
            $("#tableBody").empty();
            count=data.data.length;
            $.each(data, function (index, item) {
                for (var obj in item) {
                    showNum++;
                    if (showNum <= 10) {
                        htmlobj = htmlobj + "<tr><td>" + item[obj].jgdm_qx + "</td><td>" + item[obj].yh_xm + "</td><td></td><td>" + item[obj].zjhm + "</td>" + "<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
                    }
                }
                $("#tableBody").append(htmlobj);
                //初始化分页
                pagination(count);
            });
        })
    }

    /**
     * 分页器查询
     * @param pageIndex 当前页数
     * @param pageSize 每页显示条数
     */
    function pagipationQuery(pageIndex,pageSize){
        // 查询数据
        // var beginTime ="?beginTime="+ $("#reservation").val().split(",")[0];
        // var endTime = "&endTime="+$("#reservation").val().split(",")[1];
        var ssds_xzqhdm=$("#area").val();
        var jgdm_sf=$("#myDataSheng").val().split(",")[0];
        var jgdm_s=$("#myDataShi").val().split(",")[0];
        var jgdm_qx=$("#myDataXian").val();
        var nl1=$("#myDataYear").val().split(",")[0];
        var nl2=$("#myDataYear").val().split(",")[1];
        var xb=$("#myDataSex").val();
        var from="?from="+pageIndex*pageSize;
        var size1="&size1="+pageSize;
        Get("/ShangFang/personOverview"+from+size1, function (data) {
            var htmlobj="";
            $("#tableBody").empty();
            count=data.data.length;
            $.each(data, function (index, item) {
                for (var obj in item) {
                    htmlobj+="<tr><td>"+item[obj].jgdm_qx+"</td><td>"+item[obj].yh_xm+"</td><td></td><td>"+item[obj].zjhm+"</td>"+"<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
                }
                $("#tableBody").append(htmlobj);
            });
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

});
