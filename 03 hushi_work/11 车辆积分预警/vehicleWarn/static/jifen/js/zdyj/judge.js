define(function(require, exports) {
    $(function() {
        var util = require('./util').util;
        require('./jquery.slimscroll.min');
        $('.vehicleScore').text('+'+sessionStorage.getItem('importScore'));
        $('.ninety').text('+'+sessionStorage.getItem('baseNumber'));
        $.getScript("http://10.102.5.151:8445/js/watermark.js");
        //开始代码
        var tool = {
            sfzh:'',
            loadingImg:function () {
                $.ajaxSetup({
                    complete:function (xhr,status) {
                            $('#loading').hide();
                    }
                });
                $(document).ajaxStart(function(){
                    $('#loading').show();
                }).ajaxStop(function(){
                    $('#loading').hide();
                });
            },
            getEventList:function () {
                function getEventContent(eventCatalog,labelName,points) {
                    $.ajax({
                        url:'/case/rest/list',
                        type:'post',
                        contentType:'application/json',
                        data:JSON.stringify({
                            key:'zdcl_sjlbmx',
                            vehicleSid:tool.getUrlParam('sid'),
                            pointDate:tool.getUrlParam('date'),
                            eventCatalog:eventCatalog
                        }),
                        success:function (res) {
                            switch (eventCatalog){
                                case '01':
                                    addContent1(eventCatalog,labelName,points);
                                    break;
                                case '02':
                                    addContent2(eventCatalog,labelName,points);
                                    break;
                                case '03':
                                    addContent3(eventCatalog,labelName,points);
                                    break;
                                case '04':
                                    addContent4(eventCatalog,labelName,points);
                                    break;
                                case '05':
                                    addContent5(eventCatalog,labelName,points);
                                    break;
                            }
                            function addContent1(eventCatalog,labelName,points) {
                                var str = ``;
                                var str1 = `<div class="behavior-title"><span class="first">${labelName}</span><span class="second">+${points}</span></div><table class="table table-bordered"><tbody><tr><th width="20%">日期</th><th width="20%">时间</th><th width="20%">卡口号</th><!--<th width="20%">操作</th>--></tr></tbody></table> <div class="table-container table-container${eventCatalog}">
                                            <table class="table table-bordered table${eventCatalog}"></table>
                                        </div>`;
                                $('.behavior-table').append(str1);
                                $.each(res.data,function (index,item) {
                                    item.sourceInfo = JSON.parse(item.sourceInfo);
                                    var time = item.sourceInfo[0].checkTimeStr.substring(8,14);
                                    time = time.substring(0,2)+': '+time.substring(2,4) + ': ' + time.substring(4)
                                    str += `<tr>
                                <td width="20%">${item.eventTime}</td>
                                    <td width="20%">${time}</td>
                                <td width="20%">${item.sourceInfo[0].checkPointCode}</td>
                                <!--    <td width="20%" class="low-score"><a href="http://10.102.5.151:8666/index.html?sessionId=8813d6b04f589758493a title="轨迹分析""></a></td>-->
                                    </tr>`
                                })
                                $('.table'+eventCatalog).append(str);
                                $('.table-container'+eventCatalog).slimScroll({
                                    height:'150px',
                                })
                            }
                            function addContent2(eventCatalog,labelName,points) {
                                var str = ``;

                                var str1 = `<div class="behavior-title"><span class="first">${labelName}</span><span class="second">+${points}</span></div><table class="table table-bordered"><tbody><tr><th width="20%">日期</th><th width="20%">白天经过卡口数</th><th width="20%">夜晚经过卡口数</th><!--<th width="20%">操作</th>--></tr></tbody></table> <div class="table-container table-container${eventCatalog}">
                                            <table class="table table-bordered table${eventCatalog}"></table>
                                        </div>`;
                                $('.behavior-table').append(str1);
                                $.each(res.data,function (index,item) {
                                    item.sourceInfo = JSON.parse(item.sourceInfo);
                                    str += `<tr>
                                <td width="20%">${item.eventTime}</td>
                                    <td width="20%">0</td>
                                <td width="20%">${item.sourceInfo.night_outs}</td>
                  <!--                  <td width="20%" class="low-score"><a href="http://10.102.5.151:8666/index.html?sessionId=8813d6b04f589758493a" title="轨迹分析"></a></td>-->
                                    </tr>`
                                })
                                $('.table'+eventCatalog).append(str);
                                $('.table-container'+eventCatalog).slimScroll({
                                    height:'150px',
                                })

                            }
                            function addContent3(eventCatalog,labelName,points) {
                                var str = ``;

                                var str1 = `<div class="behavior-title"><span class="first">${labelName}</span><span class="second">+${points}</span></div><table class="table table-bordered"><tbody><tr><th width="20%">日期</th><th width="20%">频繁过车卡口数</th><th width="20%">所属重点地点</th><!--<th width="20%">操作</th>--></tr></tbody></table> <div class="table-container table-container${eventCatalog}">
                                            <table class="table table-bordered table${eventCatalog}"></table>
                                        </div>`;
                                $('.behavior-table').append(str1);
                                $.each(res.data,function (index,item) {
                                    item.sourceInfo = JSON.parse(item.sourceInfo);
                                    str += `<tr>
                                <td width="20%">${item.eventTime}</td>
                                    <td width="20%">${item.sourceInfo.watchCnts}</td>
                                <td width="20%">${item.sourceInfo.siteName}</td>
                                 <!--   <td width="20%" class="low-score"><a href="http://10.102.5.151:8666/index.html?sessionId=8813d6b04f589758493a" title="轨迹分析"></a></td>-->
                                    </tr>`
                                })
                                $('.table'+eventCatalog).append(str)
                                $('.table-container'+eventCatalog).slimScroll({
                                    height:'150px',
                                })

                            }
                            function addContent4(eventCatalog,labelName,points) {
                                var str = ``;

                                var str1 = `<div class="behavior-title"><span class="first">${labelName}</span><span class="second">+${points}</span></div><table class="table table-bordered"><tbody><tr><th width="20%">日期</th><th width="20%">落脚点数</th><th width="20%">所属重点地点</th><!--<th width="20%">操作</th>--></tr></tbody></table> <div class="table-container table-container${eventCatalog}">
                                            <table class="table table-bordered table${eventCatalog}"></table>
                                        </div>`;
                                $('.behavior-table').append(str1);
                                $.each(res.data,function (index,item) {
                                    item.sourceInfo = JSON.parse(item.sourceInfo);
                                    str += `<tr>
                                <td width="20%">${item.eventTime}</td>
                                    <td width="20%">${item.sourceInfo.moreData.holdCnts}</td>
                                <td width="20%">${item.sourceInfo.siteName}</td>
                               <!--     <td width="20%" class="low-score"><a href="http://10.102.5.151:8666/index.html?sessionId=8813d6b04f589758493a" title="轨迹分析"></a></td>-->
                                    </tr>`
                                })
                                $('.table'+eventCatalog).append(str);
                                $('.table-container'+eventCatalog).slimScroll({
                                    height:'150px',
                                })
                            }
                            function addContent5(eventCatalog,labelName,points) {
                                var str = ``;

                                var str1 = `<div class="behavior-title"><span class="first">${labelName}</span><span class="second">+${points}</span></div><table class="table table-bordered"><tbody><tr><th width="20%">日期</th><th width="20%">伴随通过的卡口数</th><th width="20%">同行车辆牌号</th><!--<th width="20%">操作</th>--></tr></tbody></table> <div class="table-container table-container${eventCatalog}">
                                            <table class="table table-bordered table${eventCatalog}"></table>
                                        </div>`;
                                $('.behavior-table').append(str1);
                                $.each(res.data,function (index,item) {
                                    item.sourceInfo = JSON.parse(item.sourceInfo);
                                    str += `<tr>
                                <td width="20%">${item.eventTime}</td>
                                    <td width="20%">3</td>
                                <td width="20%">${item.sourceInfo.hphm}</td>
                                <!--    <td width="20%" class="low-score"><a href="http://10.102.5.151:8666/index.html?sessionId=8813d6b04f589758493a" title="轨迹分析"></a></td>-->
                                    </tr>`
                                })
                                $('.table'+eventCatalog).append(str);
                                $('.table-container'+eventCatalog).slimScroll({
                                    height:'150px',
                                })
                            }
                        }
                    })
                }
                var info = sessionStorage.getItem('yd');
                info = JSON.parse(info);
                $.each(info,function (index,item) {
                    switch (item.eventCatalog){
                        case '01':
                            getEventContent('01','首次入包',item.points);
                            break;
                        case '02':
                            getEventContent('02','昼伏夜出',item.points);
                            break;
                        case '03':
                            getEventContent('03','频繁过车',item.points);
                            break;
                        case '04':
                            getEventContent('04','落脚点分析',item.points);
                            break;
                        case '05':
                            getEventContent('05','同行分析',item.points);
                            break;
                    }
                })


            },
            init:function () {
                this.loadingImg();
                this.getVehicleDetail();
                this.getScore();
                this.getEventList();
                this.bindEvent();

            },
            bindEvent:function () {
                $('span.first').click(function () {
                    var index = $(this).index('.first');
                    $('.time-line').eq(index).show().siblings('.time-line').hide();
                    if($(this).hasClass('third')){
                        $(this).removeClass('third').siblings().addClass('third');
                    }
                })
                $('.table-containr').slimscroll({
                    width:'100%',
                    height:'212px'
                });
            },
            getBaseScore:function () {
                $.ajax({
                    url:'/case/rest/list',
                    data:JSON.stringify({
                        "key":"zdcl_bqlbjf",
                        "vehicleSid":tool.getUrlParam('sid'),
                        "pointDate": tool.getUrlParam('date')
                    }),
                    success:function (res) {
                        console.log(res);
                    }
                })
            },
            getUrlParam:function (name) {
                var reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
                var result = window.location.search.substring(1).match(reg);
                return result ? decodeURIComponent(result[2]) : null;
            },
            getVehicleDetail:function () {
                $.ajax({
                    url:'/case/rest/list',
                    type:'post',
                    contentType:'application/json',
                    data:JSON.stringify({
                        key:"zdcl_xxxx",
                        vehicleSid: this.getUrlParam('sid')
                    }),
                    success:function (res) {
                        var $vehicle = $('#vehicle-detail');
                        var $ul = $vehicle.find('ul');
                        $ul.empty();
                        var str = ``;
                        var map = ['车牌号','车牌颜色','车牌类型','车辆颜色','车辆品牌','车辆省份'];
                        $.each(res.data,function (index,item) {
                            str += `<li>
                                 <dl><dt>${map[index]}：</dt><dd>${item.vehicleNo}</dd></dl></li>
                                 <li><dl><dt>${map[index+1]}：</dt><dd>${item.plateColorName}</dd></dl>
                                 <dl><dt>${map[index+2]}：</dt><dd>${item.vehicleTypeName}</dd></dl>
                                 <dl><dt>${map[index+3]}：</dt><dd>${item.colorName}</dd></dl>
                                 <dl><dt>${map[index+4]}：</dt><dd>${item.brandName}</dd></dl></li>
                                 <li><dl><dt>${map[index+5]}：</dt><dd>${item.vehicleTitle}</dd></dl>
                           </li>`;
                            tool.sfzh = item.idNo;
                        })
                        tool.getImportantPerson();
                        $ul.append(str);
                    },
                    error:function (msg) {
                        console.log(msg);
                    }
                })
            },
            getScore:function () {
                $.ajax({
                    url: '/case/rest/list',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        key: "zdcl_yjjf",
                        vehicleSid: this.getUrlParam('sid'),
                        pointDate:this.getUrlParam('date')
                    }),
                    success: function (res) {
                        $.each(res.data,function (index,item) {
                            $('.baseScore').text(item.basePoints);
                            $('.ydScore').text(item.eventPoints);
                        })

                    }
                })
            },
            getImportantPerson:function () {
              $.ajax({
                  url:'/case/rest/list',
                  type:'post',
                  contentType:'application/json',
                  data:JSON.stringify({
                      "key":"bjhc_findBySfzh",
                      "sfzh":tool.sfzh
                  }),
                  success:function (res) {
                      var str = ``;
                      var str1 = ``;
                      var filterArray = [];
                      $.each(res.data,function (index,item) {
                          if(item.table === 'serv_zdryxx'){
                              item.rksj = item.rksj.substring(0,10);
                              var tempStr = ``;
                              $.each(item.fields,function (index,item) {
                                  if(item.value==null){
                                      item.value = '';
                                  }
                                  tempStr += `<li><dl><dt>${item.field}：</dt><dd>${item.value}</dd></dl></li>`
                              })
                              str = `<li>
                           <span class="date">${item.rksj}</span>
                           <span class="circle-icon"></span>
                           <img src="../static/jifen/img/circle-icon.png" alt="圆圈" class="double">
                           <div class="item-container important-person">
                            <ol>${tempStr}</ol>
                            </div></li>`;
                          }else if(item.table === 'serv_r_jg_xyrxx'){
                              item.rksj = item.rksj.substring(0,10);
                              var tempStr1 = ``;
                              $.each(item.fields,function (index,item) {
                                  if(item.value==null){
                                      item.value = '';
                                  }
                                  tempStr1 += `<li><dl><dt>${item.field}：</dt><dd>${item.value}</dd></dl></li>`
                              })
                              str1 = `<li>
                           <span class="date">${item.rksj}</span>
                           <span class="circle-icon"></span>
                           <img src="../static/jifen/img/circle-icon.png" alt="圆圈" class="double">
                           <div class="item-container important-person">
                            <ol>${tempStr1}</ol>
                            </div></li>`;
                          }
                      })
                      $('.time-line1').find('ul').html(str);
                      $('.time-line2').find('ul').html(str1);
                      $('.score-number').find('ul').append(`<li class="personal pull-left"><img src="http://10.102.5.151:7722/sfz?sfzh=${res.data[0].sfzh}" alt="身份证头像"></li><li>
                            <dl>
                                <dt>姓名：</dt>
                                <dd>${res.data[0].xm}</dd>
                            </dl>
                            <dl>
                                <dt>身份证号：</dt>
                                <dd>${res.data[0].sfzh}</dd>
                            </dl>
                            <dl>
                                <dt>性别：</dt>
                                <dd>${res.data[0].xb}</dd>
                            </dl>
                             <dl>
                                <dt>籍贯：</dt>
                                <dd>${res.data[0].jg}</dd>
                            </dl>
                    </li>`);

                  }
              })  
            },
            deleteSameElement:function (arr) {
               return _.uniq(arr,'field');
            }
        }
        tool.init();
    });

})
