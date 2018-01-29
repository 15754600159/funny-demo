'use strict';

$(function () {
    /**-----mian----------------------------------------------------------------------------------------------------------------------------- */
    // 页面初始化
    initPage();

    /**
     * @desc: 页面初始化
     * @param: none
     * @return: undefined 
     */
    function initPage() {
        resizeFunc();

        // 页面窗口大小变化 重新计算布局
        $(window).resize(resizeFunc);

        // 页面参数处理
        pageParamsHandle();

        // 加载页面左部分标签（表名）
        initLeftPartTableNames();

        // 点击事件监听
        bindClickFunc();

        // 页面日期选择器初始化
        calendar($('.date1'), 'right');
        
        // 页面左部分表名拖拽功能
        dragFunc();
        
        // 输入框变化事件监听
        bindInputChangeFunc()

        // 页面左部分模拟桌面鼠标左键区域选择表名功能
        mouseSelectAreaItems($('.left-part .items-box .sub-select-box'));

    }

    /**-----逻辑方法----------------------------------------------------------------------------------------------------------------------- */

    /**
     * @desc: 改变页面html的font-size大小 和 搜索结果result-table-box 元素的top值
     * @param: none
     * @return: undefined 
     */
    function resizeFunc() {
        //重新设置html的font-size
        var width = document.body.clientWidth;
        var fontSize = (width - 1680) * 0.0298 + 50;
        $('html').css('font-size', fontSize);

        //重新设置搜索结果框的top值（包括背景审查、情况摸排）
        var height = $("body").height() + 18;
        $('.result-table-box, .qkmp').css('top', height);
    }

    /**
     * @desc: 页面参数处理
     * @param: none
     * @return: undefined 
     */
    function pageParamsHandle() {
        var from = GetQueryString('from');
            
        // 获取url参数 若来自背景审查 页面并且带有personID参数，则根据personID填充搜索框
        var personID = GetQueryString('personID');
        if(from === 'bjsc' && personID.length > 0){
            $('.search-bar input.input').val(personID);
        }

        // 如果页面是情况摸牌任务列表页面跳转而来，则需要复现之前用户的状态；
        if(from === 'qkmprwlb'){ //如果页面不是跳转自 情况摸排的任务列表页面，不做任何操作
            reproductionSelectState();
        }
    }

    /**
     * @desc: 初始加载页面左部分标签（表名）
     * @param: none
     * @return: undefined 
     */
    function initLeftPartTableNames(){
        var json = {};
        //获取原先的数据库表
    	$.ajax({
	        type: "get",
	        url: qkmphost+ "api/modelTable/list?sourceId=&tableName=",
	        async: false, //同步获取表数据
	        success: function(data) {
	        	json.tables = data;
	        }
        });
        // 获取本地上传的数据表
        $.ajax({
	        type: "get",
	        url: qkmphost+ "api/uploadTable/list",
	        async: false, //同步获取表数据
	        success: function(localData) {
	        	json.localTables = localData;
	        }
    	});
    	
        var onlineHtmlCode = '';
        var localPersonHtmlCode = '';
        var localCarHtmlCode = '';
        var tables = json.tables;
        var localTables = json.localTables;
        for(var i in tables){
            onlineHtmlCode += `<div class="item" data-dataBase="${tables[i]['dataBase']}" data-batchId="${tables[i]['batchId']}" data-startNum="${tables[i]['startNum']}" data-pageSize="${tables[i]['pageSize']}" data-tgtId="${tables[i]['tgtId']}" data-tgtTable="${tables[i]['tgtTable']}" data-tgtName="${tables[i]['tgtName']}" data-tgtDesc="${tables[i]['tgtDesc']}" data-tgtColumn="${tables[i]['tgtColumn']}" data-tgtColumncn="${tables[i]['tgtColumncn']}" data-tgtTimeStamp="${tables[i]['tgtTimeStamp']}" data-tgtCompkey="${tables[i]['tgtCompkey']}" data-tgtType="${tables[i]['tgtType']}" data-tgtFlag="${tables[i]['tgtFlag']}">
				            <span>${tables[i]['tgtName']}</span>
				            <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
			            </div>`
        }
        for(var i in localTables){
            if(parseInt(localTables[i]['tableType']) === 1){
                localPersonHtmlCode += `<div class="item" data-dataBase="${localTables[i]['dataBase']}" data-batchId="${localTables[i]['batchId']}" data-startNum="${localTables[i]['startNum']}" data-pageSize="${localTables[i]['pageSize']}" data-tgtId="${localTables[i]['tgtId']}" data-tgtTable="${localTables[i]['tgtTable']}" data-tgtName="${localTables[i]['tgtName']}" data-tgtDesc="${localTables[i]['tgtDesc']}" data-tgtColumn="${localTables[i]['tgtColumn']}" data-tgtColumncn="${localTables[i]['tgtColumncn']}" data-tgtTimeStamp="${localTables[i]['tgtTimeStamp']}" data-tgtCompkey="${localTables[i]['tgtCompkey']}" data-tgtType="${localTables[i]['tgtType']}" data-tableType="${localTables[i]['tableType']}" data-tgtFlag="${localTables[i]['tgtFlag']}">
                                <span>${localTables[i]['tgtName']}</span>
                                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                            </div>`
            }else{
                localCarHtmlCode += `<div class="item" data-dataBase="${localTables[i]['dataBase']}" data-batchId="${localTables[i]['batchId']}" data-startNum="${localTables[i]['startNum']}" data-pageSize="${localTables[i]['pageSize']}" data-tgtId="${localTables[i]['tgtId']}" data-tgtTable="${localTables[i]['tgtTable']}" data-tgtName="${localTables[i]['tgtName']}" data-tgtDesc="${localTables[i]['tgtDesc']}" data-tgtColumn="${localTables[i]['tgtColumn']}" data-tgtColumncn="${localTables[i]['tgtColumncn']}" data-tgtTimeStamp="${localTables[i]['tgtTimeStamp']}" data-tgtCompkey="${localTables[i]['tgtCompkey']}" data-tgtType="${localTables[i]['tgtType']}" data-tableType="${localTables[i]['tableType']}" data-tgtFlag="${localTables[i]['tgtFlag']}">
                                <span>${localTables[i]['tgtName']}</span>
                                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                            </div>`
            }
        }
        $('.left-part .items-box .sub-select-box .item').remove();
        $('.left-part .items-box .sub-select-box .online-database-tables').append($(onlineHtmlCode));
        $('.left-part .items-box .sub-select-box .local-upload-tables .local-ryl').append($(localPersonHtmlCode));
        $('.left-part .items-box .sub-select-box .local-upload-tables .local-cll').append($(localCarHtmlCode));
        leftTableNamefilterFunc('本地关注类', '');//添加完之后即进行一次筛选
    }

    /**
     * @desc: 页面点击事件绑定
     * @param: none
     * @return: undefined 
     */
    function bindClickFunc() {
        // 情况摸排页面 左边部分标签页切换
        $('.qkmp .left-part .button-box .button').on('click', function (e) {
            var target = $(e.currentTarget),
            tableNames = $('.left-part .items-box .sub-select-box .item'),
            category = $.trim(target.text()),
            searchWord = $.trim($('input#leftSearchTableName').val())
            
            target.siblings().removeClass('active');
            target.addClass('active');
            // 控制左部分表名显隐
            leftTableNamefilterFunc(category, searchWord);

        })

        // 页面左部分 智能搜索 选择全部点击功能
        $('.qkmp .left-part .items-box .select-all').on('click', function(){
            var flag = true; //true为全选状态 false为有选项没被选择
            var labels = $('.qkmp .left-part .items-box .sub-select-box .item').filter(function(){ //只筛选显示的元素
                var isDisplay = $(this).css('display') !== 'none';
                return isDisplay;
            });

            labels.each(function(){
                if(!($(this).hasClass("active"))){
                    flag = false;
                    return false;//跳出循环
                }
            })
            if(flag){ //全选状态
                // 触发全部标签的点击来替代 模拟
                labels.each(function(){
                    $(this).find('span:nth-child(2)').trigger("click");
                })
            }else{ //有选项没有选择状态
                // 触发全部标签的点击来替代
                labels.each(function(){
                    if(!($(this).hasClass("active"))){
                        $(this).find('span:nth-child(2)').trigger("click");
                    }
                })
            }
        })

        // 页面左部分 本地关注类 上传表单按钮功能 模态框展示
        $('.qkmp .left-part .add-local-table, .search-bar .qkmp-buttons .button.upload').on('click', function(){
            $('#uploadSingleTable button[type="submit"]').button('reset');
            $('#uploadSingleTable').modal('show');
        })

        // 页面左部分 智能搜索 下属标签 ‘文字标签’ 点击功能(表格定位)
        $(document).on('click', '.qkmp .left-part .items-box .sub-select-box .item > span:nth-child(1)', function(){
            var itemElem = $(this).parent(),
                tgtTypeName = itemElem.data('tgtname');
            rightBottomTableNameScrollFunc(tgtTypeName);
        })

        // 页面左部分 智能搜索 下属标签 ‘小勾勾’ 点击功能(表格添加)
        $(document).on('click', '.qkmp .left-part .items-box .sub-select-box .item > span:nth-child(2)', function(){
            var flag = false, //true为选择状态 false为非选择状态
                // htmlCode = '',
                that = $(this).parent(),
                data = that.data(),
	            tgtType = data.tgttype, //表类别
                tgtTypeName = getCategory(tgtType),//表类别 名
                searchWord = $('#rightBottomSearchTableName').val(),
                mbqBoxElem = $('.right-bottom-part .mbq-info-box');

            // console.log(that)
            if(that.hasClass("active")){
                flag = true;
            }
            if(flag){
                that.removeClass("active");
                // 删除目标区表信息
                $('.right-bottom-part .mbq-info-box .mbq-info-card').each(function(){
                    var that = $(this);
                    if(compareStr(that.data('tgtname'), tgtName)){
                        that.remove();
                        return false;//跳出循环
                    }
                })
            }else{
                that.addClass("active");

                // 增加目标区表信息card
                addMbqInfoCard(mbqBoxElem, that);

                // 添加完卡之后就滚动到那条信息卡
                rightBottomTableNamefilterFunc(tgtTypeName, searchWord);
            }
        })

        // 页面左部分 下部选项 ‘是否融合’ ‘定时’ 点击功能
        $(document).on('click', '.qkmp .left-part .filter-condition-box .row .col-md-4 .item', function(){
            var selectBox = $('.qkmp .left-part .sub-select-box'),
                boxHeight = selectBox.height(),
                addHeight = $('.left-part .filter-condition-box .timing-box').height(),
                ifChange = false, //来标记选中的标签是否有变化
                yetLabel = $(this).parent().find('.active').text();
            $(this).addClass('active').siblings().removeClass('active');
            if(compareStr(yetLabel, $(this).text())){
                return ;
            }
            if(compareStr($(this).text(), '定时')){
                $('.qkmp .left-part .filter-condition-box .timing-box').slideDown();
                selectBox.height(boxHeight - addHeight);
            }else if(compareStr($(this).text(), '手动')){
                $('.qkmp .left-part .filter-condition-box .timing-box').slideUp();
                selectBox.height(boxHeight + addHeight);
            }
        })
        
        // 页面右部分 表字段点击功能
        $(document).on('click', '.qkmp .fields-box span', function(){
            $(this).toggleClass('active');
        })

        // 页面右下部分 标签页点击功能
        $(document).on('click', '.qkmp .right-bottom-part .filter-conditions-box .item', function(){
            $(this).addClass('active').siblings('.active').removeClass('active'); //先换类，再获取选择状态

            var searchWord = $.trim($('#rightBottomSearchTableName').val()),
                category = $.trim($('.right-bottom-part .filter-conditions-box .item.active span').text());
            // 页面右下部分根据表格类别和搜索词来控制 表格card显隐状态
            rightBottomTableNamefilterFunc(category, searchWord);
        })

        // 页面表 右上 对比源 信息卡右上角删除按钮（X）点击删除功能
        $(document).on('click', '.right-top-part .dby-info-card .control-buttons img.button', function(){
            $(this).parents('.dby-info-card').remove(); 
        })
        // 页面表 右下 目标区 信息卡右上角删除按钮（X）点击删除功能
        $(document).on('click', '.right-bottom-part .mbq-info-box .mbq-info-card .control-buttons img.button', function(){
            var cardElem = $(this).parents('.mbq-info-card'),
                tableName = cardElem.data('tgtname');
            // 移除卡片元素（表元素）
            cardElem.remove(); 
            // 移除页面左部分 对应表名的active状态
            $('.left-part .items-box .sub-select-box .item').each(function(){
                var that = $(this);
                if(compareStr(that.data('tgtname'), tableName)){
                    that.removeClass('active');
                }
            })
        })

        // 页面表 右下 目标区 右上全部清空按钮功能
        $('.right-bottom-part .filter-conditions-box .qbqk-button').on('click', function(){
            $('.qkmp .left-part .items-box .sub-select-box .item').removeClass('active');
            $('.right-bottom-part .mbq-info-box > div').empty();
        })

        // 表信息卡右上角数据统计按钮点击功能
        $(document).on('click', '.sjtj-button', function(){
            var url = '',
                data = {},
                cardElem = $(this).parent().parent(),
                tgtType = cardElem.data('tgttype'),
                tableName = cardElem.data('tgttable'),
                batchId = cardElem.data('batchid');

            if(parseInt(tgtType) === 4){//本地类
                data = {
                    tableName: 'compareupload',
                    batchId: batchId
                };
                url = qkmphost + 'api/modelTable/countTableData';
            }else{
                data = {
                    tableName: tableName,
                    batchId: ''
                };
                url = qkmphost + 'api/modelTable/countTableData';
            }

            $.ajax({
                type: 'GET',
                url: url,
                data: data,
                success: function(data){
                    var num = data.msg,
                        smallModel = $('#sjtjModel');
                    
                    smallModel.find('.modal-body span').text(num);
                    smallModel.modal('show');
                },
                erroe: function(){
                    console.log('获取数据统计失败!');
                }
            })
            
        })
        
        // 表信息卡右上角浏览数据按钮点击功能
        $(document).on('click', '.llsj-button', function(){
            var cardElem = $(this).parent().parent(),
                tgtType = cardElem.data('tgttype'),
                batchId = cardElem.data('batchid'),
                tableName = cardElem.data('tgttable'),
                tgtName = cardElem.data('tgtname'),
                tgtcolumncn = cardElem.data('tgtcolumncn'),
                largeModel = $('#llsjModel');
                // url = qkmphost + 'api/modelTable/listTableData',

            largeModel.data('tgtType', tgtType);
            largeModel.data('batchId', batchId);
            largeModel.data('tgtName', tgtName);
            largeModel.data('tableName', tableName);
            largeModel.data('tgtcolumncn', tgtcolumncn);
            // 获取指定页数和每页信息条数的表格信息 并配置分页器
            getLlsjData(1, 10, largeModel);
            largeModel.modal('show');

        })
        
        // 开始摸排点击功能
        $('.left-part .ksmp-button').on('click', function(){
            // 信息提交前的检验
            var name = $('.left-part .filter-condition-box .task-name-box .task-name').val();
            if(name.length === 0){
                alertInfoFunc('请输入任务名！');
                return ;
            }
            var dbyCard = $('.right-top-part .dby-info-card'),
                idCards = $.trim($('.search-bar input.input').val()),
                reg = /^(\d{18}[,， ])*\d{18}$/;
            if(idCards.length === 0 && dbyCard.length === 0){
                alertInfoFunc('请添加对比源信息或者在输入框内输入人员身份证号！');
                return ;
            }
            console.log(reg.test(idCards))
            if(dbyCard.length === 0 && !reg.test(idCards)){
                alertInfoFunc('请以逗号或者空格来分隔身份证号！');
                return ;
            }
            var selectColumnElem = $('.right-top-part .fields-box span.active');
            if(idCards.length === 0 && selectColumnElem.length === 0){
                alertInfoFunc('请至少选择一个对比源对比字段！');
                return ;
            }
            var mbqCards = $('.right-bottom-part .mbq-info-box .mbq-info-card');
            if(mbqCards.length === 0){
                alertInfoFunc('请添加目标区信息！');
                return ;
            }

        	var activeElem = $('.qkmp .left-part .filter-condition-box .row .col-md-4 .item.active'),
        		isConcat = $.trim($(activeElem[0]).find('span').first().text()) === '融合' ? 1 : 2,
        		cirType = $.trim($(activeElem[1]).find('span').first().text()) === '手动' ? 1 : 2,
				cirUnit = $('input[name="day-hour"]:checked').val(),
				cirValue = $('select.cir-value').val(),
				startTime = $('.left-part .filter-condition-box .dateranger1 .daterangebox').val().split(',')[0],
				endTime = $('.left-part .filter-condition-box .dateranger1 .daterangebox').val().split(',')[1],
				compareStartTime = $('.left-part .filter-condition-box .dateranger2 .daterangebox').val().split(',')[0],
				compareEndTime = $('.left-part .filter-condition-box .dateranger2 .daterangebox').val().split(',')[1],
				tgtColumn = dbyCard.data('tgtcolumn'),
				tgtColumncn = dbyCard.data('tgtcolumncn'),
                sourceTable = {},
                targetTable = [];
             
            if(dbyCard.length > 0){
                sourceTable.batchId = dbyCard.data('batchid'), //表batchid 本地表有值，线上表为空null
                sourceTable.tableId = dbyCard.data('tgttable'), //表英文名
                sourceTable.tableName = dbyCard.data('tgtname'), //表名称
                sourceTable.tableType = dbyCard.data('tgttype'), //表类型（0资源 1轨迹 2人员）
                sourceTable.compareColumnName = '', //比对字段 逗号分隔
                sourceTable.compareColumn = '', //比对字段
                sourceTable.connectColumnName = dbyCard.find('.filter-conditions-box .orange-label-box span').eq(1).text(), //关联字段 名称
                sourceTable.connectColumn = getColumn(sourceTable.connectColumnName, tgtColumn, tgtColumncn), //关联字段
                sourceTable.consColumnName = dbyCard.find('.filter-conditions-box .green-label-box span').eq(1).text(), //约束字段名称
                sourceTable.consColumn = getColumn(sourceTable.consColumnName, tgtColumn, tgtColumncn), //约束字段
                sourceTable.startTime = dbyCard.find('.filter-conditions-box .daterangebox').val().split(',')[0], //约束开始时间
                sourceTable.endTime = dbyCard.find('.filter-conditions-box .daterangebox').val().split(',')[1]; //约束结束时间

                selectColumnElem.each(function(){
                    sourceTable.compareColumnName += $.trim($(this).text()) + ',';
                })
                sourceTable.compareColumn = getColumns(sourceTable.compareColumnName, tgtColumn, tgtColumncn);
            }
				
			
            mbqCards.each(function(index, element){
                var tgtColumn = $(this).data('tgtcolumn'),
				    tgtColumncn = $(this).data('tgtcolumncn');
                targetTable[index] = {};
                targetTable[index].batchId = $(this).data('batchid'), //表batchid 本地表有值，线上表为空null
                targetTable[index].tableId = $(this).data('tgttable'), //表英文名
				targetTable[index].tableName = $(this).data('tgtname'), //表名称
				targetTable[index].tableType = $(this).data('tgttype'), //表类型（0资源 1轨迹 2人员）
				targetTable[index].compareColumnName = '', //比对字段 逗号分隔
				targetTable[index].compareColumn = '', //比对字段
				targetTable[index].connectColumnName = $(this).find('.filter-conditions-box .orange-label-box span').eq(1).text(), //关联字段 名称
				targetTable[index].connectColumn = getColumn(targetTable[index].connectColumnName, tgtColumn, tgtColumncn), //关联字段
				targetTable[index].consColumnName = $(this).find('.filter-conditions-box .green-label-box span').eq(1).text(), //约束字段名称
				targetTable[index].consColumn = getColumn(targetTable[index].consColumnName, tgtColumn, tgtColumncn), //约束字段
				targetTable[index].startTime = $(this).find('.filter-conditions-box .daterangebox').val().split(',')[0], //约束开始时间
                targetTable[index].endTime = $(this).find('.filter-conditions-box .daterangebox').val().split(',')[1]; //约束结束时间

                let selectColumnElem = $(this).find('.fields-box span.active');
                if(selectColumnElem.length === 0){
                    alertInfoFunc('请至少为表“' + targetTable[index].tableName + '”选择一个对比字段！');
                    return ;
                }
                
                selectColumnElem.each(function(){
                    targetTable[index].compareColumnName += $.trim($(this).text()) + ',';
                })
                targetTable[index].compareColumn = getColumns(targetTable[index].compareColumnName, tgtColumn, tgtColumncn);
            })
            
            let data = {},
                url = '';
            if($('html').data('operation') === 'alter'){ //修改
                url = qkmphost+ 'api/task/update';
                data = {
                    "id": $('html').data('taskId'),
                    "name": name,
                    "idCards": idCards,
                    "batchId":"", //批次号
                    "isConcat": isConcat, //1、融合 2、去重
                    "cirType": cirType, //定时类型 1、手动，2定时
                    "cirUnit": cirUnit, //定时频次 单位 （1、天 2、小时）
                    "cirValue": cirValue, //定时频次值
                    "startTime": startTime, //比对开始时间
                    "endTime": endTime, //比对结束时间
                    "compareStartTime": compareStartTime, //任务开始时间
                    "compareEndTime": compareEndTime, //任务结束时间
                    "endTime": endTime, //比对结束时间
                    "userid": "000000", //用户id
                    "sourceTable": sourceTable,
                    "targetTable": targetTable,
                };
            }else{ //新增
                url = qkmphost+ 'api/task/add';
                data = {
                    "batchId":"", //批次号
                    "name": name,
                    "idCards": idCards,
                    "isConcat": isConcat, //1、融合 2、去重
                    "cirType": cirType, //定时类型 1、手动，2定时
                    "cirUnit": cirUnit, //定时频次 单位 （1、天 2、小时）
                    "cirValue": cirValue, //定时频次值
                    "startTime": startTime, //比对开始时间
                    "endTime": endTime, //比对结束时间
                    "compareStartTime": compareStartTime, //任务开始时间
                    "compareEndTime": compareEndTime, //任务结束时间
                    "startTime": startTime, //比对开始时间
                    "endTime": endTime, //比对结束时间
                    "userid": "000000", //用户id
                    "sourceTable": sourceTable,
                    "targetTable": targetTable,
                };
            }

            // console.log(data)
            $.ajax({
                url: url,
                type: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(data),
            }).done(function(data) {
                // 摸牌成功
                if(data.success === 1){
                    window.location.href = '../taskManagement.html?from=qkmp';
                }
                // console.log(data); 
            }).fail(function() {
                console.log("error");
            }).always(function() {
                // console.log("complete");
            });
	    	
        	
        })

        // 弹窗‘单个’表格上传提交按钮点击功能
        $('#uploadSingleTable button[type="submit"]').on('click', function(e){
            e.preventDefault();
            var tableName = $('#localUploadSingleTableName').val();
            $(this).button('loading');//因为延迟较高 所以先禁用按钮防止多次点击
            var formData = new FormData($('#uploadSingleTable form')[0]);

            // console.log(formData);
            $.ajax({
                type: 'POST',
                url: qkmphost + 'api/uploadTable/upload',
                data: formData,
                processData: false,
                contentType: false,
                erroe: function(){
                    console.log('上传表格数据失败!');
                }
            }).done(function(data){
                // console.log(data);
                if(parseInt(data.code) === 1){ //成功
                    // 上传一个新表之后 重新加载页面左部分表名
                    initLeftPartTableNames();
                    //添加对比源信息卡
                    let dbyBoxElem = $('.right-top-part'),
                        draggable = $('.left-part .items-box .sub-select-box .local-upload-tables .item').filter(function(index){
                            return compareStr($.trim($(this).text()), tableName);
                        })

                    addDbyInfoCard(dbyBoxElem, draggable);
                    $('#uploadSingleTable').modal('hide');
                }else{
                    console.log('返回失败！');
                }
            })

        })

        // 模态框 上传单个本地表单 文件列表‘删除’按钮点击功能
        $(document).on('click', '#uploadSingleTable ol.file-list li > a', function(){
            var aElem = $(this),
                liElem = aElem.parent();
            liElem.remove();
            $('#uploadSingleTable input[type="file"]').val('');//单个上传空间文件删除只需value置空
        })

        // 日期选择弹框 ‘清楚’按钮的功能实现 active1类用于标记需要清楚的日期选择框
        $(document).on('click', 'input.daterangebox', function(){
            $('input.daterangebox.active1').removeClass('active1');
            $(this).addClass('active1');
        })
        $(document).on('click', '.daterangepicker .ranges button.clearBtn', function(){
            $('input.daterangebox.active1').removeClass('active1').val('');
        })

        // 页面搜索栏 模板下载 按钮点击下载.xlsx文件功能
        $('.search-bar .qkmp-buttons .download').on('click', function(){
            window.location.href = 'http://10.101.139.21:8777/xls/model.xlsx';
        })

        // 搜索栏 背景审查 页面切换点击功能
        $('.search-bar .search-type span:nth-child(1)').on('click', function(){
            var searchPersonID = $.trim($('.search-bar input.input').val());
            if(searchPersonID.length > 0){
                window.location.href = '../index.html?from=qkmp&personID=' + searchPersonID;
            }else{
                window.location.href = '../index.html';
            }
        })

        // 页面信息card查看全部字段的 >> 按钮点击功能
        $(document).on('click', '.qkmp .check-more', function(){
            var that = $(this),
                width = 500,
                top = that.offset().top + that.outerHeight(),
                left = that.offset().left - width + that.outerWidth(),
                checkMoreAlert = $('#checkAllColumn'),
                height = checkMoreAlert.outerHeight(),
                openAlert = function(that){
                    var mbqInfoBox = that.parents('.mbq-info-box'),
                        fieldsBox = that.parent('.fields-box'),
                        addHtmlCode = fieldsBox.html(),
                        addElem = $(addHtmlCode);

                    fieldsBox.data('operating', '1'); // 添加operating属性，来辨识正在操作字段区域，方便查看所有字段弹窗关闭时来更新card的显示字段active状态
                    // 为防止滚动让弹框错位，禁用滚动条
                    if(mbqInfoBox.length > 0){
                        mbqInfoBox.css({
                            overflow: 'hidden'
                        });
                    }
                    // 添加元素
                    addElem.splice(0,1);
                    addElem.each(function(){
                        $(this).removeClass('ui-draggable').removeClass('ui-draggable-handle');
                    })
                    checkMoreAlert.empty().append(addElem);
                    // 点击事件监听
                    $('#checkAllColumn span.field').off('click').on('click', function(){
                        $(this).toggleClass('active');
                    })
                    // 打开弹窗
                    checkMoreAlert.css({
                        top: top,
                        left: left,
                        visibility: 'visible', //不改变元素布局，并不会触发元素的事件
                        transform: 'scale(1, 1)',
                    })
                },
                closeAlert = function(e){
                    if($(e.target).attr('id') !== 'checkAllColumn' && $(e.target).parents('#checkAllColumn').length === 0){
                        // 关闭弹窗之前更新active状态
                        var fieldsBox = $('.fields-box').filter(function(){
                            return $(this).data('operating') === '1';
                        }),
                            fieldElem =  fieldsBox.find('span.field'),
                            checkMoreAlertActiveFieldElem = checkMoreAlert.find('span.active'),
                            mbqInfoBox = $('.right-bottom-part .mbq-info-box');
                    
                        // 启用滚动条
                        mbqInfoBox.css({
                            overflow: 'auto'
                        });
                        checkMoreAlertActiveFieldElem.each(function(){
                            var activeField = $(this);
                            for (var i = 0, j = fieldElem.length; i < j; i++){
                                var item = $(fieldElem[i]);
                                if(compareStr(item.text(), activeField.text())){
                                    item.addClass('active');
                                    fieldElem.splice(0, 0, (fieldElem.splice(i, 1)[0])); //splice取出来的是数组，[0]来取出元素
                                }
                            }
                        })
                        fieldsBox.find('span.field').remove();
                        fieldsBox.append(fieldElem);
                        fieldsBox.data('operating', '0'); // 操作完之后，取消操作状态
                        // 关闭弹窗
                        checkMoreAlert.css({
                            visibility: 'hidden', 
                            transform: 'scale(0, 0)',
                        })
                        // 关闭之后即删除 弹窗外的点击事件
                        $(document).off('click', closeAlert);
                    }
                };

            // 显示弹窗
            if(checkMoreAlert.css('visibility') === 'visible'){ // 若已经打开了一个弹窗，则需要先关闭，再打开一个 利用延迟先执行closeAlert(), 再执行openAlert()
                setTimeout(function(){
                    openAlert(that);
                }, 500)
            }else{
                openAlert(that);
            }

            // 若点击在弹窗外部，则关闭弹窗
            $(document).on('click', closeAlert);
        })

        // 右上 对比源信息card约束条件 ‘x’ 清楚约束条件按钮功能
        $(document).on('click', '.qkmp .filter-conditions-box .delete-ystj', function(){
            $(this).prev('.field').text('');
        })

        
        
    }

    /**
     * @desc 初始化日期选择控件
     * @param {*日期控件jquery对象} dateElem Object
     * @param {*日期控件弹出的方向} openDirection String
     * @return undefined
     */
    function calendar(dateElem, openDirection, startDate, endDate){
    
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
        // 日期，默认时间设成当日到前30天
        var startDate = startDate || moment(moment().subtract(30, 'days').calendar()).format("YYYY-MM-DD");
        var endDate = endDate || moment().format("YYYY-MM-DD");
        dateElem.val(startDate + ',' + endDate);
        dateElem.daterangepicker({
            applyClass:'btn-success',
            // clearClass:'btn-warning',
            cancelClass:'btn-info',
            'locale': locale,
            format:"YYYY-MM-DD",
            startDate:startDate,
            endDate:endDate,
            opens: openDirection, 
            dateLimit: {
                "days": 30 //限制最长时间间隔30天
            },
        }, function(start, end) {
            // startDate=start.format('YYYY-MM-DD');
            // endDate=end.format('YYYY-MM-DD');
        });
        // 用户不能直接输入日期
        dateElem.attr("readonly","readonly");
        
    }

    /**
     * @desc 添加对比源信息卡
     * @param {*容器原始} dbyBoxElem (jquery对象)
     * @param {*添加信息来源元素} draggable (jquery对象)
     * @return undefined
     */
    function addDbyInfoCard(dbyBoxElem, draggable){
        var htmlCode = '',
        batchId = draggable.data('batchid'),//批次号
        tgtId = draggable.data('tgtid'), //表id
        tgtTable = draggable.data('tgttable'), //表英文名
        tgtName = draggable.data('tgtname'), //表中文名
        tgtColumn = draggable.data('tgtcolumn'),
        tgtColumncn = draggable.data('tgtcolumncn').split(/[,，]/),//字段
        tgtTimeStamp = draggable.data('tgttimestamp'),
        tgtCompkey = draggable.data('tgtcompkey'),
        tgtType = draggable.data('tgttype'), //表类别
        tgtTypeName = getCategory(tgtType);//表类别 名

        htmlCode = `<div class="dby-info-card" data-batchId="${batchId}" data-tgtId="${tgtId}" data-tgtTable="${tgtTable}" data-tgtName="${tgtName}" data-tgtColumn="${tgtColumn}" data-tgtColumncn="${tgtColumncn}" data-tgtTimeStamp="${tgtTimeStamp}" data-tgtCompkey="${tgtCompkey}" data-tgtType="${tgtType}">
                        <div class="main-title"><span>${tgtTypeName}</span>
                            ${tgtName}
                            <span>（来自治安综合防范平台数据）</span>
                        </div>
                        <div class="control-buttons">
                            <div class="button sjtj-button">
                                <img src="../../img/bjscxq/sjtj-icon.png" alt="check">
                                <span>数据统计</span>
                            </div>
                            <div class="button llsj-button">
                                <img src="../../img/bjscxq/llsj-icon.png" alt="check">
                                <span>浏览数据</span>
                            </div>
                            <img class="button" src="../../img/bjscxq/wrong-icon.png" alt="delete">
                        </div>
                        <div class="filter-conditions-box">
                            <div class="orange-label-box">
                                <span class="orange-label">关联字段</span>
                                <span class="field">${tgtColumncn[0]}</span>
                            </div>
                            <div class="green-label-box">
                                <span class="green-label">约束条件</span>
                                <span class="field"></span><span class="delete-ystj">x</span>：
                                <!-- 日期选择 -->
                                <div class="input-group dateranger">
                                    <input type="text" class="daterangebox date2" />
                                </div>
                            </div>
                        </div>
                        <div class="fields-box"><p class="check-more">>></p>`
        for( var i in tgtColumncn){
            htmlCode += `<span class="field">${tgtColumncn[i]}</span>`
        }
        htmlCode += `</div></div>`;
        //增加元素前先移除之前的
        var mainInfoBox = dbyBoxElem.find('.main-info-box');
        mainInfoBox.empty();
        mainInfoBox.append(htmlCode);
        //初始化新加的日期选择控件
        calendar($('.right-top-part .dby-info-card .filter-conditions-box .date2'), 'left'); //此操作放在了操作复现上
        // 右上部分对比源 下面标签的拖拽功能
        dragElemInit($('.right-top-part .main-info-box .dby-info-card'));
    }

    /**
     * @desc 添加目标区信息卡
     * @param {*容器原始} dbyBoxElem (jquery对象)
     * @param {*添加信息来源元素} draggable (jquery对象)
     * @return undefined
     */
    function addMbqInfoCard(mbqBoxElem, draggable){
        var htmlCode = '',
            that = draggable,
            data = that.data(),
            tgtId = data.tgtid,
            tgtTable = data.tgttable,
            tgtName = data.tgtname, //表名
            tgtColumn = data.tgtcolumn,
            tgtColumncn = data.tgtcolumncn.split(/[,，]/),//字段
            tgtTimeStamp = data.tgttimestamp,
            tgtCompkey = data.tgtcompkey,
            tgtType = data.tgttype, //表类别
            batchId = data.batchid,
            tgtTypeName = getCategory(tgtType),//表类别 名
            searchWord = $('#rightBottomSearchTableName').val();

            // 增加目标区表信息
        htmlCode = `<div class="mbq-info-card" data-tgtId="${tgtId}" data-batchId="${batchId}" data-tgtTable="${tgtTable}" data-tgtName="${tgtName}" data-tgtColumn="${tgtColumn}" data-tgtColumncn="${tgtColumncn}" data-tgtTimeStamp="${tgtTimeStamp}" data-tgtCompkey="${tgtCompkey}" data-tgtType="${tgtType}">
                        <div class="main-title"><span>${tgtTypeName}</span>
                            ${tgtName}
                            <span>（来自治安综合防范平台数据）</span>
                        </div>
                        <div class="control-buttons">
                            <div class="button sjtj-button">
                                <img src="../../img/bjscxq/sjtj-icon.png" alt="check">
                                <span>数据统计</span>
                            </div>
                            <div class="button llsj-button">
                                <img src="../../img/bjscxq/llsj-icon.png" alt="check">
                                <span>浏览数据</span>
                            </div>
                            <img class="button" src="../../img/bjscxq/wrong-icon.png" alt="delete">
                        </div>
                        <div class="filter-conditions-box">
                            <div class="orange-label-box">
                                <span class="orange-label">关联字段</span>
                                <span class="field">${tgtColumncn[0]}</span>
                            </div>
                            <div class="green-label-box">
                                <span class="green-label">约束条件</span>
                                <span class="field"></span><span class="delete-ystj">x</span>：
                                <!-- 日期选择 -->
                                <div class="input-group dateranger">
                                    <input type="text" class="daterangebox date2" />
                                </div>
                            </div>
                        </div>
                        <div class="fields-box"><p class="check-more"></p>`;
        for(var i in tgtColumncn){
            htmlCode += `<span class="field">${tgtColumncn[i]}</span>`
        }
        htmlCode += `</div></div>`;
        switch (tgtTypeName)
        {
        case '本地关注类':
            $('.right-bottom-part .sub-info-box .mbq-info-box .bdgzl-card-box').prepend(htmlCode);
            //初始化新加的日期选择控件
            calendar($('.right-bottom-part .sub-info-box .mbq-info-box .bdgzl-card-box').first('.mbq-info-card').find('.date2'), 'left');
            //初始化标签的拖拽功能
            dragElemInit($('.right-bottom-part .sub-info-box .mbq-info-box .bdgzl-card-box .mbq-info-card').first());
            break;
        case '人员类':
            $('.right-bottom-part .sub-info-box .mbq-info-box .ryl-card-box').prepend(htmlCode);
            //初始化新加的日期选择控件
            calendar($('.right-bottom-part .sub-info-box .mbq-info-box .ryl-card-box').first('.mbq-info-card').find('.date2'), 'left');
            //初始化标签的拖拽功能
            dragElemInit($('.right-bottom-part .sub-info-box .mbq-info-box .ryl-card-box .mbq-info-card').first());
            break;
        case '物品类':
            $('.right-bottom-part .sub-info-box .mbq-info-box .wpl-card-box').prepend(htmlCode);
            //初始化新加的日期选择控件
            calendar($('.right-bottom-part .sub-info-box .mbq-info-box .wpl-card-box').first('.mbq-info-card').find('.date2'), 'left');
            //初始化标签的拖拽功能
            dragElemInit($('.right-bottom-part .sub-info-box .mbq-info-box .wpl-card-box .mbq-info-card').first());
            break;
        case '轨迹类':
            $('.right-bottom-part .sub-info-box .mbq-info-box .gjl-card-box').prepend(htmlCode);
            //初始化新加的日期选择控件
            calendar($('.right-bottom-part .sub-info-box .mbq-info-box .gjl-card-box').first('.mbq-info-card').find('.date2'), 'left');
            //初始化标签的拖拽功能
            dragElemInit($('.right-bottom-part .sub-info-box .mbq-info-box .gjl-card-box .mbq-info-card').first());
            break;
        case '资源类':
            $('.right-bottom-part .sub-info-box .mbq-info-box .zyl-card-box').prepend(htmlCode);
            //初始化新加的日期选择控件
            calendar($('.right-bottom-part .sub-info-box .mbq-info-box .zyl-card-box').first('.mbq-info-card').find('.date2'), 'left');
            //初始化标签的拖拽功能
            dragElemInit($('.right-bottom-part .sub-info-box .mbq-info-box .zyl-card-box .mbq-info-card').first());
            break;
        default:
            $('.right-bottom-part .sub-info-box .mbq-info-box').prepend(htmlCode);
            //初始化新加的日期选择控件
            calendar($('.right-bottom-part .sub-info-box .mbq-info-box').first('.mbq-info-card').find('.date2'), 'left');
            //初始化标签的拖拽功能
            dragElemInit($('.right-bottom-part .sub-info-box .mbq-info-box .mbq-info-card').first());
        }
    }

    /**
     * @desc 页面标签拖拽功能实现
     * @param none
     * @return undefined
     */
    function dragFunc(){
        // 左部分标签的拖拽功能
        $('.left-part .items-box .sub-select-box .item').draggable({
            helper: 'clone', //克隆，保留原位置的元素
            revert: 'invalid', //没有拖入放置容器，飘回来
            zIndex: 100, //设置拖动的Z-index，避免被position:absolute;的元素覆盖
        });

        // 对比源的设置为拖拽接收区
        $('.right-top-part').droppable({
            accept: '.left-part .items-box .sub-select-box .item',//限制可拖入元素的类
            drop: function(event, ui){ // ui.draggable可获取被拖动的元素；  event.target可获取元素放置的容器
                var dbyBoxElem = $(event.target),
                    draggable = $(ui.draggable);

                //添加对比源信息卡
                addDbyInfoCard(dbyBoxElem, draggable);

                // 执行加载表格数据的脚本
                // var tgtType = draggable.data('tgttype'),
                //     database = draggable.data('database'),
                //     tgtTable = draggable.data('tgttable'),
                //     tgtColumn = draggable.data('tgtcolumn'),
                //     url = qkmphost + 'api/modelTable/excuteTable',
                //     data = {};

                // if (parseInt(tgtType) === 4){ //如果是本地上传表
                //     data = {
                //         dataBaseName: database,
                //         tableName: 'compareupload',
                //         tableColums: tgtColumn,
                //     };
                // }else{
                //     data = {
                //         dataBaseName: database,
                //         tableName: tgtTable,
                //         tableColums: tgtColumn,
                //     };
                // }
                // $.ajax({
                //     type: 'GET',
                //     url: url,
                //     data: data,
                //     success: function(data){
                //         // console.log(data);
                //         // console.log('脚步加载表格数据成功!');
                //     },
                //     erroe: function(){
                //         console.log('脚步加载表格数据失败!');
                //     }
                // })

            }
        });

        // 目标区的设置为拖拽接收区
        $('.right-bottom-part .mbq-info-box').droppable({
            accept: '.left-part .items-box .sub-select-box .item',//限制可拖入元素的类
            drop: function(event, ui){ // ui.draggable可获取被拖动的元素；  event.target可获取元素放置的容器
                var mbqBoxElem = $(event.target),
                    draggable = $(ui.draggable),
                    data = draggable.data(),
                    tgtType = data.tgttype, //表类别
                    tgtTypeName = getCategory(tgtType),//表类别 名
                    searchWord = $('#rightBottomSearchTableName').val();

                draggable.addClass("active");
                //添加目标区信息卡
                addMbqInfoCard(mbqBoxElem, draggable);
                // 添加完卡之后就滚动到那条信息卡
                rightBottomTableNamefilterFunc(tgtTypeName, searchWord);

            }
        });

    }

    /**
     * @desc 输入框变化事件监听
     * @param none
     * @return undefined
     */
    function bindInputChangeFunc(){
        // 页面左部分标签搜索功能
        $('input#leftSearchTableName').on('input propertychange', function() {
            var searchWord = $.trim($(this).val()),
                category = $.trim($('.left-part .button-box .button.active span').text());
            if($(this).data('value-length') === searchWord.length){
                return ;
            }
            // console.log('要搜索了！')
            // 根据表格类别和搜索词来控制 表格名称的显隐状态
            leftTableNamefilterFunc(category, searchWord);

            // 实时更新搜索词的长度，以便后面比较
            $(this).data('value-length', searchWord.length);
        });

        // 页面右下部分标签搜索功能
        $('input#rightBottomSearchTableName').on('input propertychange', function() {
            var searchWord = $.trim($(this).val()),
                category = $.trim($('.right-bottom-part .filter-conditions-box .item.active span').text());
            if($(this).data('value-length') === searchWord.length){
                return ;
            }
            // console.log('要搜索了！')
            // 页面右下部分根据表格类别和搜索词来控制 表格card显隐状态
            // console.log(category)
            // console.log(searchWord)
            rightBottomTableNamefilterFunc(category, searchWord);

            // 实时更新搜索词的长度，以便后面比较
            $(this).data('value-length', searchWord.length);
        });

        // 模态框上传单个表格数据 监听input[type='file']的change事件来更新文件名的显示
        $('#uploadSingleTable input[name="excelFile"]').on('change', function(e){
            //e.currentTarget.files 是一个数组，如果支持多个文件，则需要遍历
            var name = e.currentTarget.files[0].name,
                htmlCode = `<li>${name}<a href="#">删除</a></li>`;
            $('#uploadSingleTable ol.file-list').html(htmlCode);
        });

        // 模态框上传多个表格数据 监听input[type='file']的change事件来更新文件名的显示
        $('#uploadMultipleTable input[name="excelFile"]').on('change', function(e){
            var files = e.currentTarget.files,
                name = '',
                htmlCode = '';
            for(let i = 0, j = files.length; i < j; i++){
                name = files[i].name;
                htmlCode += `<li>${name}<a href="#">删除</a></li>`;
            }
            $('#uploadMultipleTable ol.file-list').html(htmlCode);
        });

    }

    /**
     * @desc 页面左部分模拟桌面鼠标左键区域选择表名功能
     * @param {*可鼠标选框的区域范围元素} boxElem Object(jquery对象)
     * @return undefined
     */
    function mouseSelectAreaItems(boxElem){

        boxElem[0].onmousedown = function (event) {

            var srcElem = event.srcElement ? event.srcElement : event.target;
            if($(srcElem).is('span')){  //若事件源是span，即在进行表名的拖动，则不进行选框的操作
                return ;
            }

            var selList = [];
            var itemNodes = boxElem[0].querySelectorAll('.item');
    
            var isSelect = true;
            var evt = window.event || arguments[0];
            var startX = (evt.x || evt.clientX); //设置或获取鼠标指针位置相对于父文档的 x 像素坐标
            var startY = (evt.y || evt.clientY); //设置或获取鼠标指针位置相对于父文档的 y 像素坐标
            var selDiv = document.createElement("div");
            selDiv.style.cssText = "position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;";
            selDiv.id = "selectDiv";
            document.body.appendChild(selDiv);
            selDiv.style.left = startX + "px";
            selDiv.style.top = startY + "px";
            var _x = null;
            var _y = null;
            clearEventBubble(evt);//阻止事件冒泡
    
            boxElem.on('mousemove',function () {
                evt = window.event || arguments[0];
                if (isSelect) {
                    if (selDiv.style.display == "none") {
                        selDiv.style.display = "";
                    }
                    _x = (evt.x || evt.clientX);
                    _y = (evt.y || evt.clientY);
                    selDiv.style.left = Math.min(_x, startX) + "px";
                    selDiv.style.top = Math.min(_y, startY) + "px";
                    selDiv.style.width = Math.abs(_x - startX) + "px";
                    selDiv.style.height = Math.abs(_y - startY) + "px";
    
                }
    
                clearEventBubble(evt);
            })

            $(document).on('mouseup', function(evt){
                isSelect = false;
                // ---------------- 关键检测 ---------------------  
                var _l = selDiv.offsetLeft, _t = selDiv.offsetTop;
                var _w = selDiv.offsetWidth, _h = selDiv.offsetHeight;
                for (var i = 0; i < itemNodes.length; i++) {
                    var sl = $(itemNodes[i]).width() + $(itemNodes[i]).offset().left;
                    var st = $(itemNodes[i]).height() + $(itemNodes[i]).offset().top;
                    if (sl > _l && st > _t && $(itemNodes[i]).offset().left < _l + _w && $(itemNodes[i]).offset().top < _t + _h) {
                        if(!$(itemNodes[i]).hasClass('selected')){
                            $(itemNodes[i]).addClass('selected');
                        }
                    } else {
                        if($(itemNodes[i]).hasClass('selected')){
                            $(itemNodes[i]).removeClass('selected');
                        }
                    }
                }
                //移除选框元素
                if (selDiv) {
                    document.body.removeChild(selDiv);
                }
                $('.left-part .items-box .sub-select-box .item.selected:not(.active)').removeClass('selected').find('span:nth-child(2)').trigger('click');
                selList = null, _x = null, _y = null, selDiv = null, startX = null, startY = null, evt = null;
                boxElem.off('mousemove');
                $(document).off('mouseup');
            })

        }

    }


    /**
     * @desc 如果页面是情况摸牌任务列表页面跳转而来，则需要复现之前用户的状态
     * @param none
     * @return undefined
     */
    function reproductionSelectState(){
        var from = GetQueryString("from"); //获取url参数 from 判断页面跳转自哪里
        // if(from !== 'qkmprwlb'){ //如果页面不是跳转自 情况摸排的任务列表页面，不做任何操作
        //     return ;
        // }

        var taskId = GetQueryString("taskId"),//获取需要复现的任务ID
            operation = GetQueryString("operation"),
            data = {
                taskId: taskId,
            };
        // 为之后点击摸牌的时候，可以判断是新增还是保存 提供依据
        $('html').data('from', from);
        $('html').data('taskId', taskId);
        $('html').data('operation', operation);
        if(operation === 'check'){ //如果是查看，则禁用开始摸牌按钮
            var ksmpButton = $('.left-part .ksmp-button');
            ksmpButton.css({
                'cursor': 'not-allowed',
                'background': 'gray',
            });
            ksmpButton.off('click');
        }

        $.ajax({
            url: qkmphost+ 'api/task/show',
            type: 'GET',
            data: data,
        }).done(function(data) {
            console.log(data);
            var taskCompare = data.msg.taskCompare,
                tableList = data.msg.tablelist,
                sourceName = taskCompare.sourceName,
                sourceTableSelectInfo = {},
                targetTableSelectInfo = [],
                taskName = taskCompare.name,//任务名
                startTime = taskCompare.startTime.split(/[,，]/)[0],
                endTime = taskCompare.endTime.split(/[,，]/)[1],
                isConcat = taskCompare.isConcat, //是否融合（1、融合，2、去重）
                cirType = taskCompare.cirType, //定时类型（1、手动，2、定时）
                cirUnit = taskCompare.cirUnit, //定时频次类型 （1，天，2，小时）
                cirValue = parseInt(taskCompare.cirValue),
                dbyBoxElem = $('.right-top-part'),
                leftPartItems = $('.left-part .items-box .sub-select-box .item'),
                draggable = {};
                

            if(taskCompare.compareStartTime){
                var compareStartTime = taskCompare.compareStartTime.split(/[,，]/)[0],
                    compareEndTime = taskCompare.compareEndTime.split(/[,，]/)[1];
            }

            sourceTableSelectInfo = tableList.filter(function(item){
                return parseInt(item.compareType) === 1;
            })
            targetTableSelectInfo = tableList.filter(function(item){
                return parseInt(item.compareType) === 2;
            })

            // 区分本地类和线上类: 本地类的唯一标识为batchid; 线上类唯一标识为tgttable（表英文名）
            if(sourceTableSelectInfo[0].tableType === '4'){ //本地类
                draggable = $('.left-part .items-box .sub-select-box .item').filter(function(index){
                    return compareStr($(this).data('batchid'), sourceTableSelectInfo[0].batchId);
                });
            }else{ //线上类
                draggable = $('.left-part .items-box .sub-select-box .item').filter(function(index){
                    return compareStr($(this).data('tgttable'), sourceTableSelectInfo[0].tableId);
                });
            }
            

            // 页面左部分复现
            $('.left-part .filter-condition-box .task-name').val(taskName); //任务名
            calendar($('.left-part .filter-condition-box .dateranger1 input'), 'right', startTime, endTime);
            if(parseInt(isConcat) === 1){ //融合
                $('.left-part .filter-condition-box .select-type .col-md-4').first().find('.item:nth-child(1)').addClass('active').siblings().removeClass('active');
            }else{ //去重
                $('.left-part .filter-condition-box .select-type .col-md-4').first().find('.item:nth-child(1)').removeClass('active').siblings().addClass('active');
            }
            if(parseInt(cirType) === 1){ //手动
                $('.left-part .filter-condition-box .select-type .col-md-4').eq(1).find('.item:nth-child(1)').addClass('active').siblings().removeClass('active');
            }else{ //定时
                $('.left-part .filter-condition-box .select-type .col-md-4').eq(1).find('.item:nth-child(2)').trigger('click');
                $('.left-part .filter-condition-box .select-type .col-md-4').eq(1).find('.item:nth-child(1)').removeClass('active').siblings().addClass('active');
                if(taskCompare.compareStartTime){
                    calendar($('.left-part .filter-condition-box .timing-box .row:nth-child(1) .dateranger2 input'), 'right', compareStartTime, compareEndTime);
                }
                if(parseInt(cirUnit) === 1){ //天
                    $('.left-part .filter-condition-box .timing-box .row:nth-child(2) label:nth-child(1) > input').attr('checked', 'checked');
                }else{ //小时
                    $('.left-part .filter-condition-box .timing-box .row:nth-child(2) label:nth-child(2) > input').attr('checked', 'checked');
                }
                $('.left-part .filter-condition-box .timing-box .row:nth-child(2) select').val(cirValue);
            }

                
            // 对比源信息卡复现
            if(draggable.length > 0){
                addDbyInfoCard(dbyBoxElem, draggable);
            }else{
                // 由身份证号转化为对比源
                let draggable = $('<div></div>'),
                    sourceTable = tableList[0];
                draggable.data('batchid', '');//批次号
                draggable.data('tgtid', sourceTable.id); //表ID
                draggable.data('tgttable', sourceTable.tableId); //表英文名
                draggable.data('tgtname', sourceTable.tableName); //表英文名
                draggable.data('tgtcolumn', sourceTable.compareColumn);
                draggable.data('tgtcolumncn', sourceTable.compareColumnName); //字段
                draggable.data('tgttimestamp', '');
                draggable.data('tgtcompkey', '');
                draggable.data('tgttype', sourceTable.tableType); //表类别
                addDbyInfoCard(dbyBoxElem, draggable);
            }

            var cardElem = dbyBoxElem.find('.dby-info-card'); //信息卡添加之后才能获取
            reproductionCardSelectState(cardElem, sourceTableSelectInfo[0]);

            // 目标区信息卡复现
            targetTableSelectInfo.forEach(function(item, index){
                var tableId = item.tableId,
                    batchId = item.batchId;
                
                leftPartItems.each(function(){
                    // 区分本地类和线上类: 本地类的唯一标识为batchid; 线上类唯一标识为tgttable（表英文名）
                    if($(this).data('tgttype') === '4'){ //本地类
                        if(compareStr($(this).data('batchid'), batchId)){
                            $(this).find('span:nth-child(2)').trigger('click');
                            return false; //找到一个即可，跳出循环
                        }
                    }else{ //线上类
                        if(compareStr($(this).data('tgttable'), tableId)){
                            $(this).find('span:nth-child(2)').trigger('click');
                            return false; //找到一个即可，跳出循环
                        }
                    }
                })
            })
            let mbqCardElems = $('.right-bottom-part .mbq-info-box .mbq-info-card');
            mbqCardElems.each(function(){
                var cardElem = $(this),
                    tgtTable = cardElem.data('tgttable'),
                    selectStateInfo = {};

                selectStateInfo = targetTableSelectInfo.filter(function(item){
                    return compareStr(item.tableId, tgtTable);
                })[0];
                reproductionCardSelectState(cardElem, selectStateInfo);
            })


        }).fail(function() {
            console.log("获取任务信息失败！");
        });


    }

    /**
     * @desc 浏览数据功能 获取指定页数和每页信息条数的表格信息 并配置分页器
     * @param {*第几页} pageNum Number
     * @param {*每页信息条数} pageSize Number
     * @param {*浏览数据摸态框 jQuery对象} cardElem Object
     * @return undefined
     */
    function getLlsjData(pageNum, pageSize, largeModel){
        var data = {},
            tgtType = largeModel.data('tgtType'),
            tgtName = largeModel.data('tgtName'),
            tableName = largeModel.data('tableName'),
            batchId = largeModel.data('batchId'),
            tgtcolumncn = largeModel.data('tgtcolumncn');
        
        if(parseInt(tgtType) === 4){//本地类
            console.log('bendilei')
            data = {
                tableName: 'compareupload',
                batchId: batchId,
                pageNum: pageNum,
                pageSize: pageSize,
            };
        }else{
            data = {
                tableName: tableName,
                batchId: '',
                pageNum: pageNum,
                pageSize: pageSize,
            };
        }

        $.ajax({
            type: 'GET',
            url: qkmphost + 'api/modelTable/listTableData',
            data: data,
            // async: false,
            success: function(data){
                // console.log(data)
                var largeModel = $('#llsjModel'),
                    htmlCode = '',
                    tgtcolumncnArray = tgtcolumncn.split(/[,，]/),
                    items = data.msg.items;
                
                htmlCode += `<caption>${tgtName}</caption><tr>`;
                for (let i = 0, j = tgtcolumncnArray.length; i < j; i++) {
                    htmlCode += `<th>${tgtcolumncnArray[i]}</th>`;
                }
                htmlCode += '</tr>';
                for (let i = 0, j = items.length; i < j; i++) {
                    htmlCode += '<tr>';
                    for (let item in items[i]) {
                        htmlCode += `<td>${items[i][item]}</td>`;
                    }
                    htmlCode += '</tr>';
                }

                largeModel.find('table').html(htmlCode);
                let option = {};
                option.total = data.msg.totalCount;
                option.pageSize = data.msg.pageSize;
                option.pageNumber = data.msg.page;
                // 配置分页器
                paginationInit(option, largeModel.find('nav > ul.pagination'));
            },
            erroe: function(){
                console.log('获取数据统计失败!');
            }
        })
    }
    






    /**-------工具方法----------------------------------------------------------------------------------------------------------------------------------*/ 

    /**
     * @desc 初始化信息卡内标签可拖拽（表信息内字段可拖拽）
     * @param {*信息卡jquery对象} dragCardElem Object
     * @return undefined
     */
    function dragElemInit(dragCardElem){
        dragCardElem.find('.fields-box .field').draggable({
            helper: 'clone', //克隆，保留原位置的元素
            revert: 'invalid', //没有拖入放置容器，飘回来
            zIndex: 100, //设置拖动的Z-index，避免被position:absolute;的元素覆盖
        });

        dragCardElem.find('.filter-conditions-box > div').droppable({
            accept: dragCardElem.find('.fields-box .field'),//限制可拖入元素 选择器或jquery对象
            drop: function(event, ui){ // ui.draggable可获取被拖动的元素；  event.target可获取元素放置的容器
                var fieldElem = $(event.target).find('.field'),
                    fieldText = $(ui.draggable).text();

                fieldElem.text(fieldText);
            }
        });
    }

    /**
     * @desc 页面左部分根据表格类别和搜索词来控制 表格名称的显隐状态
     * @param {*表格类型} category String
     * @param {*搜索词} searchWord String
     * @return undefined
     */
    function leftTableNamefilterFunc(category, searchWord){
        var tableNames = $('.left-part .items-box .sub-select-box .item');
        
        if(compareStr('本地关注类', category)){
            $('.left-part .local-upload-tables').css('display', 'block');
            $('.left-part .online-database-tables').css('display', 'none');
        }else{
            $('.left-part .local-upload-tables').css('display', 'none');
            $('.left-part .online-database-tables').css('display', 'block');
        }

        tableNames.each(function(){
            var that = $(this),
                tgtType = getCategory(that.data('tgttype'));
            
            if(compareStr('智能搜索', category)){
                if(searchWord.length === 0){ //若搜索内容为空，则恢复分类下所有标签
                    that.css('display', 'inline-block');
                }else{//若搜索内容不为空
                    if(that.data('tgtname').indexOf(searchWord) > -1){ //搜索词符合
                        that.css('display', 'inline-block');
                    }else{ //搜索词不符合
                        that.css('display', 'none');
                    }
                }
                return ;
            }

            if(compareStr(tgtType, category)){ //类型符合
                if(searchWord.length === 0){ //若搜索内容为空，则恢复分类下所有标签
                    that.css('display', 'inline-block');
                }else{//若搜索内容不为空
                    if(that.data('tgtname').indexOf(searchWord) > -1){ //搜索词符合
                        that.css('display', 'inline-block');
                    }else{ //搜索词不符合
                        that.css('display', 'none');
                    }
                }
            }else{ //类型不符合
                that.css('display', 'none');
            }

        })
    }

    /**
     * @desc 页面右下部分根据表格类别和搜索词来控制 表格card scroll值
     * @param {*表格类型} category String
     * @param {*搜索词} searchWord String
     * @return undefined
     */
    function rightBottomTableNamefilterFunc(category, searchWord){
        var tableCards = $('.right-bottom-part .mbq-info-box .mbq-info-card'),
            mbqCardsBox = $('.right-bottom-part .sub-info-box .mbq-info-box'),
            cardHeight = 0,
            // 滚动元素到可视区域
            scrollAnimateFunc = function(box, order){ //box: 容器盒元素(jquery对象)    order: 选中元素之前还有几个卡片  
                // for(var i = 0, j = order; i < j; i++){ //盒宽不相同时
                // 	cardHeight += $(tableCards[i]).outerHeight();  //加上盒宽
                // }
                cardHeight += $(tableCards[0]).outerHeight() * order;//相同时
                cardHeight += parseFloat(tableCards.first().css('marginTop')) * order; //加上上margin
        		box.animate({
                    scrollTop: cardHeight  // position 是相对父元素的偏移
                }, 300);
            }

        //符合搜索词的card背景高亮
        tableCards.removeClass('search');
        if(searchWord.length !== 0){  
            tableCards.each(function(){
                var that = $(this);
                if(that.data('tgtname').indexOf(searchWord) > -1){
                    that.addClass('search');
                }
            })
        }
        //滚动到第一个符合搜索条件的card
        tableCards.each(function(){
            var that = $(this),
                order = tableCards.index(that),
                tgtType = that.data('tgttype'), //表类别
                tgtTypeName = getCategory(tgtType);//表类别 名
                
            // 无分类的情况
            if(category === ''){
                if(searchWord.length === 0){ //搜索内容为空
                    scrollAnimateFunc(mbqCardsBox, 0);
                    return false; //break
                }else{//若搜索内容不为空
                    if(that.data('tgtname').indexOf(searchWord) > -1){ //搜索词符合
                        scrollAnimateFunc(mbqCardsBox, order);
                        return false; //break
                    }
                }
                return true; //continue
            }

            // 有分类的情况
            if(compareStr(tgtTypeName, category)){ //类型符合
                if(searchWord.length === 0){ //搜索内容为空
                    scrollAnimateFunc(mbqCardsBox, order);
                    return false; //break
                }else{//若搜索内容不为空
                    if(that.data('tgtname').indexOf(searchWord) > -1){ //搜索词符合
                        scrollAnimateFunc(mbqCardsBox, order);
                        return false; //break
                    }
                }
            }


        })
    }

    /**
     * @desc 页面右下部分根据表名滚动到相应的位置
     * @param {*表格类型} category String
     * @return undefined
     */
    function rightBottomTableNameScrollFunc(tableName){
        var tableCards = $('.right-bottom-part .mbq-info-box .mbq-info-card'),
            mbqCardsBox = $('.right-bottom-part .sub-info-box .mbq-info-box'),
            cardHeight = 0,
            // 滚动元素到可视区域
            scrollAnimateFunc = function(box, order){ //box: 容器盒元素(jquery对象)    order: 选中元素之前还有几个卡片  
                for(var i = 0, j = order; i < j; i++){
                	cardHeight += $(tableCards[i]).outerHeight();  //加上盒宽
                }
                cardHeight += parseFloat(tableCards.first().css('marginTop')) * order; //加上上margin
        		box.animate({
                    scrollTop: cardHeight  // position 是相对父元素的偏移
                }, 300);
            }
        
        tableCards.each(function(){
            var that = $(this),
                order = tableCards.index(that),
                tgtName = that.data('tgtname'); //表名称
            
            if(compareStr(tableName, tgtName)){
                scrollAnimateFunc(mbqCardsBox, order);
                that.addClass('search').siblings().removeClass('search');
                return false; //break
            }

        })
    }

    /**
     * @desc 复现信息卡的选择状态
     * @param {*信息卡jquery对象} cardElem Object
     * @param {*信息卡选择状态复现所需要的信息} selectStateInfo Object
     * @return undefined
     */
    function reproductionCardSelectState(cardElem, selectStateInfo){
        var compareColumnNameArray = deleteNullArrayElem(selectStateInfo.compareColumnName.split(/[,，]/)),
            connectColumnName = selectStateInfo.connectColumnName,
            consColumnName = selectStateInfo.consColumnName,
            timeRange = '',
            startTime = selectStateInfo.startTime,
            endTime = selectStateInfo.endTime;

        cardElem.find('.filter-conditions-box .orange-label-box .field').text(connectColumnName);
        cardElem.find('.filter-conditions-box .green-label-box .field').text(consColumnName);
        cardElem.find('.fields-box .field').each(function(){
            let that = $(this),
                fieldName = that.text();
            if(compareColumnNameArray.indexOf($.trim(fieldName)) > -1){
                that.addClass('active');
            }
        })
        timeRange = startTime + ',' + endTime;
        calendar(cardElem.find('.filter-conditions-box .green-label-box .dateranger input'), 'left', startTime, endTime);
        
    }

    /**
     * @desc 比较两个字符串是否相等 相等返回true
     * @param {*字符串1} str1 String
     * @param {*字符串2} str2 String
     * @return Boolean
     */
    function compareStr(str1, str2){
        return $.trim(str1) === $.trim(str2);
    }
    
    /**
     * @desc 根据表类别数字获取类别名称
     * @param {*表类别数字} categoryNum String
     * @return String
     */
    function getCategory(categoryNum){
    	var tgtType = '';
    	switch (parseInt(categoryNum))
        {
        case 0:
        	tgtType = '资源类';
            break;
        case 1:
        	tgtType = '轨迹类';
            break;
        case 2:
        	tgtType = '人员类';
            break;
        case 3:
        	tgtType = '车辆类';
            break;
        case 4:
        	tgtType = '本地关注类';
            break;
        case 5:
        	tgtType = '物品类';
            break;
        default:
        	tgtType = '智能搜索';
        }
    	
    	return tgtType;
    }
    
    /**
     * @desc 根据表格中文字段名 获取 英文字段名
     * @param {*选择的中文字段名} chosenColumnName String 
     * @param {*表的全部英文字段名} column String (逗号隔开)
     * @param {*表的全部英文字段名} columnName String (逗号隔开)
     * @return String 选择的英文字段名 
     */
    function getColumn(chosenColumnName, column, columnName){
        var columnArray = column.split(/[,，]/),
        	columnNameArray = columnName.split(/[,，]/),
        	chosenColumn = '';
        
        columnNameArray.forEach(function(item, index){
        	if(compareStr(item, chosenColumnName)){
        		chosenColumn = columnArray[index];
        	}
        })
        
        return chosenColumn;
    }
    
    /**
     * @desc 根据表格中文字段名 获取 引文字段名
     * @param {*选择的中文字段名} compareColumnName String (逗号隔开)
     * @param {*表的全部英文字段名} column String (逗号隔开)
     * @param {*表的全部英文字段名} columnName String (逗号隔开)
     * @return String 选择的英文字段名 (逗号隔开)
     */
    function getColumns(compareColumnName, column, columnName){
        var compareColumnNameArray = compareColumnName.slice(0, compareColumnName.length - 1).split(/[,，]/),
        	columnArray = column.split(/[,，]/),
        	columnNameArray = columnName.split(/[,，]/),
        	compareColumnArray = [],
        	compareColumn = '';
        
        compareColumnNameArray.forEach(function(item1, index1){
        	columnNameArray.forEach(function(item2, index2){
        		if(compareStr(item1, item2)){
        			compareColumnArray.push(columnArray[index2]);
        		}
        	})
        })
        
        compareColumn = compareColumnArray.join(',');
        return compareColumn;
    }

    /**
     * @desc 去除数组中的空值
     * @param {*需要去空值得数组} array Array
     * @return undefined
     */
    function deleteNullArrayElem(array){
        var newArray = [];
        for(var i = 0, j = array.length; i < j; i++){
            if(array[i] != undefined && array[i] !== null && array[i] !== ''){
                newArray.push(array[i]);
            }
        }
        return newArray;
    }

    /**
     * @desc 阻止事件冒泡
     * @param {*事件对象} evt Object
     * @return undefined
     */
    function clearEventBubble(evt) {
        if (evt.stopPropagation)
            evt.stopPropagation();
        else
            evt.cancelBubble = true;
        if (evt.preventDefault)
            evt.preventDefault();
        else
            evt.returnValue = false;
    }

    /**
     * @desc 页面右下角提示框 提示
     * @param {*提示信息} message String
     * @param {*提示类型(默认为danger类型):success, warning, danger} type String
     * @return undefined
     */
    function alertInfoFunc(message, type){
        var alertElem = $('#ksmpAlert'),
        className = type ? 'alert-' + type : 'alert-danger';

        alertElem.addClass(className).find('span').text(message);
        $('#ksmpAlert a').on('click', function(){
            alertElem.fadeOut(500);
        })
        alertElem.fadeIn(500, function(){
            setTimeout(function(){
                alertElem.fadeOut(500);
            }, 1500)
        })
    }

    /**
     * @desc 页面表格分页函数
     * @param {*分页配置项} option Object
     * @param {*分页器元素的jQuery对象} paginationElem Object
     * @return undefined
     * let option = {};
        option.total = data.msg.totalCount;
        option.pageSize = data.msg.pageSize;
        option.pageNumber = data.msg.page;
     */
    function paginationInit(option, paginationElem){
        BootstrapPagination(
			paginationElem,
			{
				layoutScheme : "lefttext,pagesizelist,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
				//记录总数。
				total : option.total,
				//分页尺寸。指示每页最多显示的记录数量。
				pageSize : option.pageSize,
				//当前页索引编号。从其开始（从0开始）的整数。
				pageIndex : option.pageNumber - 1,
				//指示分页导航栏中最多显示的页索引数量。
				pageGroupSize : 5,
				//位于导航条左侧的输出信息格式化字符串
				leftFormateString : "本页{count}条记录/共{total}条记录",
				//位于导航条右侧的输出信息格式化字符串
				rightFormateString : "第{pageNumber}页/共{totalPages}页",
				//页码文本格式化字符串。
				pageNumberFormateString : "{pageNumber}",
				//分页尺寸输出格式化字符串
				pageSizeListFormateString : "每页显示{pageSize}条记录",
				//上一页导航按钮文本。
				prevPageText : "上一页",
				//下一页导航按钮文本。
				nextPageText : "下一页",
				//上一组分页导航按钮文本。
				prevGroupPageText : "上一组",
				//下一组分页导航按钮文本。
				nextGroupPageText : "下一组",
				//首页导航按钮文本。
				firstPageText : "首页",
				//尾页导航按钮文本。
				lastPageText : "尾页",
				//设置页码输入框中显示的提示文本。
				pageInputPlaceholder : "GO",
				//接受用户输入内容的延迟时间。单位：毫秒
				pageInputTimeout : 800,
				//分页尺寸列表。
				pageSizeList : [ 5, 10, 20 ],
				//当分页更改后引发此事件。
				pageChanged : function(pageIndex, pageSize) {
					//getScData();
					getLlsjData(pageIndex + 1, pageSize, paginationElem.parents('.modal'));
				},
			});
    }





})