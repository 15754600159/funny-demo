define(function(require) {
        require('tablesorter');
        require('daterangepicker');
        require('./plugins/bootstrap-pagination.min');
        $.getScript("http://10.102.5.151:8445/js/watermark.js");
        var util = require('./zdyj/util.js').util;
        var user_token = util.getUrlParam('sessionid');
        var tool = {
            getRuleInfo:function (sid,date,length) {
                var ajax1 = $.ajax({
                    url:'/case/rest/list',
                    method:'post',
                    async:false,
                    contentType:'application/json',
                    data:JSON.stringify({
                        key:'zdcl_sjlbjf',
                        vehicleSid:sid,
                        pointDate:date
                    })
                });
              $.when(ajax1).then(function (res1) {
                  var $rbody = $('#r_tbody');
                  var str = ``;
                  var ydArr = []
                $.each(res1.data,function (index,item) {
                    var tempObj = {}
                    tempObj.eventName = item.eventName;
                    tempObj.points = item.points;
                    tempObj.eventCatalog = item.eventCatalog;
                    ydArr.push(tempObj);
                    str +=`<tr>
                            <td>${index+length+1}</td>
                            <td>${item.pointType}</td>
                            <td>${item.eventName}</td>
                            <td>${item.points}</td>
                    </tr>`
                })
                  sessionStorage.setItem('yd',JSON.stringify(ydArr));
                  $rbody.append(str);
              })
            },
            getTabList:function () {
              $('#l_table').on('click','tr',function () {
                 $(this).addClass('active').siblings().removeClass('active');
                  var sid = $(this).find('td:last a').data('sid');
                  var mc = $(this).find('td:eq(1)').text();
                  var date = $(this).find('td:nth-last-child(2)').text();
                  var length = '';
                  $.ajax({
                      url:'/case/rest/list',
                      method:'post',
                      contentType:'application/json',
                      async:false,
                      data:JSON.stringify({
                              key:'zdcl_bqlbjf',
                              vehicleSid:sid,
                              pointDate:date
                          }),
                      success:function (res) {
                          var $infoMation = $('.infoMation');
                          var $rbody = $('#r_tbody');
                          var str = ``;
                          var str1 = ``
                          $('.cz_xm').text(mc);
                          length = res.data.length;
                          var arr = [];
                          $.each(res.data,function (index,item) {
                                if(item.label=='0600'){
                                    sessionStorage.setItem('baseNumber',item.point)
                                }else{
                                    arr.push(parseInt(item.point));

                                }

                              str += `<span>${item.labelName}</span>`;
                              str1 += `<tr>
                                        <td>${index+1}</td>
                                        <td>${item.pointType}</td>
                                        <td>${item.labelName}</td>
                                        <td>${item.point}</td>
                                </tr>`
                          })

                          sessionStorage.setItem('importScore',Math.max.apply(null,arr));
                          $infoMation.html(str);
                          $rbody.html(str1);

                  },
                  error:function (msg) {
                      console.log(msg);
                  }
              })
                  tool.getRuleInfo(sid,date,length)
              })
            },
            getTableList:function () {
                var vehicleNo = $('#keyword').val();
                var beginDate = $('#reservation').val().split(',')[0];
                var endDate = $('#reservation').val().split(',')[1];
                $.ajax({
                    url:'/case/rest/page',
                    type:'post',
                    contentType:'application/json',
                    data:JSON.stringify({
                        "key"       : "zdcl_jfyjlb",
                        "vehicleNo": vehicleNo,
                        "beginDate": beginDate,
                        "endDate"  : endDate ,
                        pageNo:1
                    }),
                    success:function (res) {
                        var str = '';
                        var $container = $('#l_table');
                        $container.find('tr:gt(0)').remove();
                        $.each(res.data.result,function (index,item) {
                            if(item.eventPoints >= 100){
                                item.eventPoints = 100;
                            }
                            str += `<tr>
                                <td width="10%">${index+1}</td>
                                <td width="10%">${item.vehicleNo}</td>
                                <td width="10%">${item.colorName}</td>
                                <td width="10%">${item.catalogName}</td>
                                <td width="10%">${item.vehicleTitle}</td>
                                <td width="10%">${item.brandName}</td>
                                <td width="10%">${item.eventPoints}</td>
                                <td width="10%">${item.basePoints}</td>
                                <td width="10%">${item.pointDate}</td>
                                <td width="10%"><a href="judge.html?sid=${item.sid}&date=${item.pointDate}" data-sid=${item.sid}>详情</a></td>
                            </tr>`
                        })
                        $container.append(str);
                        $('#l_table').find('tr:eq(1)').trigger('click');
                        pagination(res)
                    }

                })
            }
        }
       function init() {
           tool.getTabList();
           initCalender();
           tool.getTableList();
           $('.applyBtn').click(function () {
               setTimeout(function () {
                   tool.getTableList();
               },50)

           })
       }

       $('.search-logo').click(function () {
           tool.getTableList();
       })

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
        var startDate = moment().subtract(7,'days').format("YYYY-MM-DD");
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
    function pagination(data) {
        var demo2 = BootstrapPagination($("#pagination"), {
            layoutScheme: "lefttext,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
            //记录总数。
            total: data.data.pageCount,
            //分页尺寸。指示每页最多显示的记录数量。
            pageSize: 20,
            //当前页索引编号。从其开始（从0开始）的整数。
            pageIndex: 0,
            //指示分页导航栏中最多显示的页索引数量。
            pageGroupSize: 15,
            //位于导航条左侧的输出信息格式化字符串
            // leftFormateString: "本页{count}条记录/共{total}条记录",
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
            // prevGroupPageText: "上一组",
            //下一组分页导航按钮文本。
            // nextGroupPageText: "下一组",
            //首页导航按钮文本。
            firstPageText: "首页",
            //尾页导航按钮文本。
            lastPageText: "尾页",
            //设置页码输入框中显示的提示文本。
            pageInputPlaceholder: "跳转",
            //接受用户输入内容的延迟时间。单位：毫秒
            pageInputTimeout: 800,
            //分页尺寸列表。
            pageSizeList: [20],
            //当分页更改后引发此事件。
            pageChanged: function (pageIndex, pageSize) {
                var vehicleNo = $('#keyword').val();
                var beginDate = $('#reservation').val().split(',')[0];
                var endDate = $('#reservation').val().split(',')[1];
                $.ajax({
                    url:'/case/rest/page',
                    type:'post',
                    contentType:'application/json',
                    data:JSON.stringify({
                        "key"       : "zdcl_jfyjlb",
                        "vehicleNo": vehicleNo,
                        "beginDate": beginDate,
                        "endDate"  : endDate ,
                        pageNo: pageIndex+1
                    }),
                    success:function (res) {
                        var str = '';
                        var $container = $('#l_table');
                        $container.find('tr:gt(0)').remove();
                        $.each(res.data.result,function (index,item) {
                            if(item.eventPoints >= 100){
                                item.eventPoints = 100;
                            }
                            str += `<tr>
                                <td width="10%">${index+1}</td>
                                <td width="10%">${item.vehicleNo}</td>
                                <td width="10%">${item.colorName}</td>
                                <td width="10%">${item.catalogName}</td>
                                <td width="10%">${item.vehicleTitle}</td>
                                <td width="10%">${item.brandName}</td>
                                <td width="10%">${item.eventPoints}</td>
                                <td width="10%">${item.basePoints}</td>
                                <td width="10%">${item.pointDate}</td>
                                <td width="10%"><a href="judge.html?sid=${item.sid}&date=${item.pointDate}" data-sid=${item.sid} target="_blank">详情</a></td>
                            </tr>`
                        })
                        $container.append(str);
                        $container.find('tr:eq(1)').trigger('click');
                    }

                })
            }
        })
    }
    init();
});
