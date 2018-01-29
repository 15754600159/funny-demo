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

        // 获取、设置用户信息
        setUserInfo();

        // // session存储表格信息
        // saveTableInfo();

        // 加载页面左部分标签（表名）,并存储表信息到session
        initLeftPartTableNames();

        // 点击事件监听
        bindClickFunc();

        // 页面参数处理
        pageParamsHandle();

        // 页面日期选择器初始化
        calendar($('.date1'), 'right');
        
        // 页面左部分表名拖拽功能
        dragFunc();
        
        // 输入框变化事件监听
        bindInputChangeFunc();

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

        //重新设置搜索结果框的top值（包括背景审查、对比摸排）
        var height = $("body").height() + 18;
        $('.result-table-box, .qkmp').css('top', height);
    }

    /**
     * @desc: 获取、设置用户信息
     * @param: none
     * @return: undefined 
     */
    function setUserInfo() {
        var userInfo = getUser();
        // console.log(userInfo);
        if(!userInfo){
            return ;
        }
        $('.nav-bar .admin-word').text(userInfo.userName);
        $('.nav-bar .department-word').text(userInfo.deptName);
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

        // 如果页面是情况摸排任务列表页面跳转而来，则需要复现之前用户的状态；
        if(from === 'qkmprwlb'){ //如果页面不是跳转自 对比摸排的任务列表页面，不做任何操作
            reproductionSelectState();
        }
    }

    /**
     * @desc: 初始加载页面左部分标签（表名）,并存储表信息到session
     * @param: none
     * @return: undefined 
     */
    function initLeftPartTableNames(){
        var json = {};
        // 获取本地上传的数据表
        $.ajax({
            type: "get",
            url: qkmphost+ "api/uploadTable/list",
            async: false, //同步获取表数据
            success: function(localData) {
                // console.log(localData)
                json.localTables = localData;

                // 存储本地表信息到session 
                var localTables = {};
                for (var i = 0, j = localData.length; i < j; i++) {
                    localTables[localData[i].batchId] = localData[i];
                }
                // console.log(localTables);
                sessionStorage.setItem('localTables', JSON.stringify(localTables));
            }
        });
        //获取原先的数据库表
    	$.ajax({
	        type: "get",
	        url: qkmphost+ "api/modelTable/list?sourceId=&tableName=",
	        async: false, //同步获取表数据
	        success: function(onlineData) {
                // console.log(onlineData)
                json.tables = onlineData;
                
                // 存储线上表信息到session 
                var onlineTables = {};
                for (var i = 0, j = onlineData.length; i < j; i++) {
                    onlineTables[onlineData[i].tgtTable] = onlineData[i];
                }
                // console.log(onlineTables);
                sessionStorage.setItem('onlineTables', JSON.stringify(onlineTables));
	        }
        });
    	
        var onlineHtmlCode = '',
            localPersonHtmlCode = '',
            localCarHtmlCode = '',
            tables = json.tables,
            localTables = json.localTables;
        for(var i in tables){
            onlineHtmlCode += `<div class="item ${tables[i]['subTgtType'] === '1' ? 'red-item' : tables[i]['subTgtType'] === '2' ? 'yellow-item' : 'blue-item'}" title="${tables[i]['tgtName']}" data-tgtTable="${tables[i]['tgtTable']}" data-batchId="${tables[i]['batchId']}" data-tgtType="${tables[i]['tgtType']}">
                            <span class="glyphicon glyphicon-bookmark" aria-hidden="true"></span>
                            <span>${tables[i]['tgtName']}</span>
			            </div>`
        }
        for(var i in localTables){
            if(localTables[i]['tgtFlag'] === '0'){
                continue;
            }
            if(parseInt(localTables[i]['tableType']) === 1){
                localPersonHtmlCode += `<div class="item ${localTables[i]['subTgtType'] === '1' ? 'red-item' : localTables[i]['subTgtType'] === '2' ? 'yellow-item' : 'blue-item'}" title="${localTables[i]['tgtName']}" data-tgtTable="${localTables[i]['tgtTable']}" data-batchId="${localTables[i]['batchId']}" data-tgtType="${localTables[i]['tgtType']}">
                                <span class="glyphicon glyphicon-bookmark" aria-hidden="true"></span>
                                <span>${localTables[i]['tgtName']}</span>
                            </div>`
            }else{
                localCarHtmlCode += `<div class="item ${localTables[i]['subTgtType'] === '1' ? 'red-item' : localTables[i]['subTgtType'] === '2' ? 'yellow-item' : 'blue-item'}" title="${localTables[i]['tgtName']}" data-tgtTable="${localTables[i]['tgtTable']}" data-batchId="${localTables[i]['batchId']}" data-tgtType="${localTables[i]['tgtType']}">>
                                <span class="glyphicon glyphicon-bookmark" aria-hidden="true"></span>
                                <span>${localTables[i]['tgtName']}</span>
                            </div>`
            }
        }
        $('.left-part .items-box .sub-select-box .item').remove();
        $('.left-part .items-box .sub-select-box .online-database-tables').append($(onlineHtmlCode));
        $('.left-part .items-box .sub-select-box .local-upload-tables .local-ryl').append($(localPersonHtmlCode));
        $('.left-part .items-box .sub-select-box .local-upload-tables .local-cll').append($(localCarHtmlCode));
        // $('[data-toggle="tooltip"]').tooltip(); //初始化全表名提示
        leftTableNamefilterFunc('本地', '');//添加完之后即进行一次筛选
    }

    /**
     * @desc: 页面点击事件绑定
     * @param: none
     * @return: undefined 
     */
    function bindClickFunc() {
        // 对比摸排页面 左边部分标签页切换
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

        // 页面左部分 智能搜索 ‘全部选择’ 点击功能
        $('.qkmp .left-part .items-box .select-all').on('click', function(){
            if($.trim($('.left-part .button-box .active').text()) === '本地关注类'){
                alertInfoFunc('本地表不可添加到目标区！');
                return ;
            }
            $('#loading').fadeIn('normal', function(){ //开始loading
                var flag = true; //true为全选状态 false为有选项没被选择
                var labels = $('.qkmp .left-part .items-box .sub-select-box .online-database-tables .item').filter(function(){ //只筛选显示的元素
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
                        alertInfoFunc('表已全部添加！');
                    })
                }else{ //有选项没有选择状态
                    addQbMbqInfoCard(labels);
                }
            }); 
            $('#loading').fadeOut(); //结束loading
        })

        // 页面左部分 本地关注类 上传表单按钮功能 模态框展示
        $('.qkmp .left-part .add-local-table, .search-bar .qkmp-buttons .button.upload').on('click', function(){
        	$('#localUploadSingle-userId').val(getUser().loginName);
        	$('#localUploadSingleTableName').val("");
        	$('#uploadSingleTable ol.file-list').empty();
            $('#uploadSingleTable button[type="submit"]').button('reset');
            $('#uploadSingleTable').modal('show');
        })

        // 页面左部分 智能搜索 下属标签 ‘文字标签’ 点击功能(表格定位)
        $(document).on('click', '.qkmp .left-part .items-box .sub-select-box .item > span:nth-child(1)', function(){
            var itemElem = $(this).parent(),
                tgtTable = itemElem.data('tgttable');
            rightBottomTableNameScrollFunc(tgtTable);
        })

        // 页面左部分 下部选项 ‘是否融合’ ‘定时’ 点击功能
        $(document).on('click', '#ksmpAlertTable .row .item', function(){
            var ifChange = false, //来标记选中的标签是否有变化
                yetLabel = $(this).parent().find('.active').text();
            if(compareStr(yetLabel, $(this).text())){
                return ;
            }
            $(this).addClass('active').siblings().removeClass('active');
            if(compareStr($(this).text(), '手动')){
                $('#ksmpAlertTable .timing-box').slideUp();
            }else if(compareStr($(this).text(), '定时')){
                $('#ksmpAlertTable .timing-box').slideDown();
            }
        })

        // 开始摸排弹窗中 定时选项中 频次‘天’‘小时’切换 -> 更改后面select下拉框的内容 30->24个选项
        $('#ksmpAlertTable input[name="day-hour"]').on('click', function(){
            var value = $(this).val(),
                ksmpAlertTable = $(this).parents('#ksmpAlertTable');

            if(value === '1'){ //天
                ksmpAlertTable.find('.cir-value .day').show();
                $('#qkmp-cir-util-day').show();
                $('#qkmp-cir-util-hour').hide();
            }else{
                ksmpAlertTable.find('.cir-value .day').hide();
                $('#qkmp-cir-util-hour').show();
                $('#qkmp-cir-util-day').hide();
            }
            ksmpAlertTable.find('.cir-value').val('1');
        })
        
        // 页面右部分 表字段点击功能
        $(document).on('click', '.qkmp .fields-box span', function(){
            $(this).toggleClass('active');
        })

        // 页面右下部分 导航器分类点击功能
        $(document).on('click', '.right-bottom-part .slide-filter-menu li:not(.search-input)', function(){
            $(this).addClass('active').siblings('li.active').removeClass('active'); //先换类，再获取选择状态

            var searchWord = $.trim($('#rightBottomSearchTableName').val()),
                category = $.trim($(this).find('span:last').text());
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

        // 页面 右下 导航按钮点击功能
        $('.right-bottom-part .slide-filter-menu .menu-control').on('click', function(){
            var menuBar = $(this).parent('.slide-filter-menu');
            if(parseInt(menuBar.css('left')) === 0){
                menuBar.css({
                    left: -150,
                    opacity: 0.8
                })
            }else{
                menuBar.css({
                    left: 0,
                    opacity: 1
                })
            }
        })

        // 页面表 右下 目标区 右上全部清空按钮功能
        $('.right-bottom-part .slide-filter-menu .delete-all-table').on('click', function(){
            $('.qkmp .left-part .items-box .sub-select-box .item').removeClass('active');
            $('.right-bottom-part .mbq-info-box .mbq-info-card').remove();
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
                error: function(){
                    console.log('获取数据统计失败!');
                }
            })
            
        })
        
        // 右上 表信息卡右上角浏览数据按钮点击功能
        $(document).on('click', '.llsj-button', function(){
            var cardElem = $(this).parent().parent(),
                tgtType = cardElem.data('tgttype'),
                batchId = cardElem.data('batchid'),
                tgtTable = cardElem.data('tgttable');

            var table = getTableInfo(tgtType, batchId, tgtTable),
                tgtName = table.tgtName, //表中文名
                tgtColumn = table.tgtColumn, //表中文名
                tgtColumncn = table.tgtColumncn, //表中文名
                largeModel = $('#llsjModel');
                // url = qkmphost + 'api/modelTable/listTableData',

            largeModel.data('tgtType', tgtType);
            largeModel.data('batchId', batchId);
            largeModel.data('tgtName', tgtName);
            largeModel.data('tgtTable', tgtTable);
            largeModel.data('tgtcolumncn', tgtColumncn);
            largeModel.data('tgtcolumn', tgtColumn);
            // 获取指定页数和每页信息条数的表格信息 并配置分页器
            getLlsjData(1, 10, largeModel);
            largeModel.modal('show');

        })
        
        // 左下 ‘开始摸排’点击功能
        $('.left-part .ksmp-button').on('click', function(){
            var dbyCard = $('.right-top-part .dby-info-card'),
                idCards = $.trim($('.search-bar input.input').val()),
                reg = /^(\d{18}[,， ])*\d{18}$/;
            if(idCards.length === 0 && dbyCard.length === 0){
                alertInfoFunc('请添加对比源信息或者在输入框内输入人员身份证号！');
                return ;
            }
            var tgtType = dbyCard.data('tgttype'), //表类别
                batchId = dbyCard.data('batchid'),//批次号
                tgtTable = dbyCard.data('tgttable'), //表英文名
                tgtTypeName = getCategory(tgtType),//表类别 名
                table = getTableInfo(tgtType, batchId, tgtTable);
                
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
            var isMbqAllHasSelectColumn = true,
                targetTable = [];
            mbqCards.each(function(index, element){
                var that = $(this),
                    tgtType = that.data('tgttype'), //表类别
                    batchId = that.data('batchid'),//批次号
                    tgtTable = that.data('tgttable'), //表英文名
                    table = getTableInfo(tgtType, batchId, tgtTable);
                targetTable[index] = {};
                targetTable[index].tableName = table.tgtName; //表名称

                var selectColumnElem = $(this).find('.fields-box span.active');
                if(selectColumnElem.length === 0){
                    alertInfoFunc('请至少为表“' + targetTable[index].tableName + '”选择一个对比字段！');
                    isMbqAllHasSelectColumn = false;
                    return false;
                }
            })
            if (isMbqAllHasSelectColumn === false){
                return ;
            }

            $('#ksmpAlertTable').modal('show');
        })
        
        // 开始摸排确认弹窗 确定按钮功能
        $('#ksmpAlertTable button.sure').on('click', function(){

            // 信息提交前的检验
            var name = $('#ksmpAlertTable .task-name-box .task-name').val(), //任务名
                dbyCard = $('.right-top-part .dby-info-card'),
                idCards = $.trim($('.search-bar input.input').val()),
                reg = /^(\d{18}[,， ])*\d{18}$/,
                tgtType = dbyCard.data('tgttype'), //表类别
                batchId = dbyCard.data('batchid'),//批次号
                tgtTable = dbyCard.data('tgttable'), //表英文名
                tgtTypeName = getCategory(tgtType),//表类别 名
                table = getTableInfo(tgtType, batchId, tgtTable),
                selectColumnElem = $('.right-top-part .fields-box span.active'),
                mbqCards = $('.right-bottom-part .mbq-info-box .mbq-info-card');
    
            if($.trim(name).length === 0){
                alertInfoFunc('请输入任务名！');
                return ;
            }

            var activeElem = $('#ksmpAlertTable .filter-condition-box .row .item.active'),
                isConcat = $.trim($(activeElem[0]).find('span').first().text()) === '融合' ? 1 : 2,
                cirType = $.trim($(activeElem[1]).find('span').first().text()) === '手动' ? 1 : 2,
                cirUnit = $('#ksmpAlertTable input[name="day-hour"]:checked').val(),
                cirValue = $('#ksmpAlertTable select.cir-value').val(),
                startTime = $('#ksmpAlertTable .dateranger1 .daterangebox').val().split(',')[0],
                endTime = $('#ksmpAlertTable .dateranger1 .daterangebox').val().split(',')[1],
                compareStartTime = $('#ksmpAlertTable .dateranger2 .daterangebox').val().split(',')[0],
                compareEndTime = $('#ksmpAlertTable .dateranger2 .daterangebox').val().split(',')[1],
                tgtColumn = table ? table.tgtColumn : '', //表中文名
                tgtColumncn = table ? table.tgtColumncn : '', //表中文名
                sourceTable = {},
                targetTable = [];
             
            if(dbyCard.length > 0){
                sourceTable.batchId = table ? table.batchId : '', //表batchid 本地表有值，线上表为空null
                sourceTable.tableId = table ? table.tgtTable : '',
                sourceTable.tableName = table ? table.tgtName : '', //表中文名
                sourceTable.tableType = tgtType, //表类型（0资源 1轨迹 2人员）
                sourceTable.compareColumnName = '', //比对字段 逗号分隔
                sourceTable.compareColumn = '', //比对字段
                sourceTable.connectColumnName = dbyCard.find('.filter-conditions-box .orange-label-box span').eq(1).text(), //关联字段 名称
                sourceTable.connectColumn = table ? getColumn(sourceTable.connectColumnName, tgtColumn, tgtColumncn) : '', //关联字段
                sourceTable.consColumnName = dbyCard.find('.filter-conditions-box .green-label-box span').eq(1).text(), //约束字段名称
                sourceTable.consColumn = table ? getColumn(sourceTable.consColumnName, tgtColumn, tgtColumncn) : '', //约束字段
                sourceTable.startTime = dbyCard.find('.filter-conditions-box .daterangebox').val().split(',')[0], //约束开始时间
                sourceTable.endTime = dbyCard.find('.filter-conditions-box .daterangebox').val().split(',')[1]; //约束结束时间
    
                selectColumnElem.each(function(){
                    sourceTable.compareColumnName += $.trim($(this).text()) + ',';
                })
                sourceTable.compareColumn = getColumns(sourceTable.compareColumnName, tgtColumn, tgtColumncn);
            }
                
            mbqCards.each(function(index, element){
                var that = $(this),
                    tgtType = that.data('tgttype'), //表类别
                    batchId = that.data('batchid'),//批次号
                    tgtTable = that.data('tgttable'), //表英文名
                    table = getTableInfo(tgtType, batchId, tgtTable),
                    tgtColumn = table.tgtColumn,
                    tgtColumncn = table.tgtColumncn;
                targetTable[index] = {};
                targetTable[index].batchId = batchId, //表batchid 本地表有值，线上表为空null
                targetTable[index].tableId = tgtTable, //表英文名
                targetTable[index].tableName = table.tgtName, //表名称
                targetTable[index].tableType = table.tgtType, //表类型（0资源 1轨迹 2人员）
                targetTable[index].compareColumnName = '', //比对字段 逗号分隔
                targetTable[index].compareColumn = '', //比对字段
                targetTable[index].connectColumnName = $(this).find('.filter-conditions-box .orange-label-box span').eq(1).text(), //关联字段 名称
                targetTable[index].connectColumn = getColumn(targetTable[index].connectColumnName, tgtColumn, tgtColumncn), //关联字段
                targetTable[index].consColumnName = $(this).find('.filter-conditions-box .green-label-box span').eq(1).text(), //约束字段名称
                targetTable[index].consColumn = getColumn(targetTable[index].consColumnName, tgtColumn, tgtColumncn), //约束字段
                targetTable[index].startTime = $(this).find('.filter-conditions-box .daterangebox').val().split(',')[0], //约束开始时间
                targetTable[index].endTime = $(this).find('.filter-conditions-box .daterangebox').val().split(',')[1]; //约束结束时间
    
                var selectColumnElem = $(this).find('.fields-box span.active');
                selectColumnElem.each(function(){
                    targetTable[index].compareColumnName += $.trim($(this).text()) + ',';
                })
                targetTable[index].compareColumn = getColumns(targetTable[index].compareColumnName, tgtColumn, tgtColumncn);
            })
            
            var data = {},
                url = '';
            if($('html').data('operation') === 'alter'){ //修改
                url = qkmphost+ 'api/task/update';
                data = {
                    "id": $('html').data('taskId'),
                    "name": name,
                    "idCards": idCards,
                    "batchId":sourceTable.batchId?sourceTable.batchId:'', //批次号
                    "startTime": startTime, //比对开始时间
                    "endTime": endTime, //比对结束时间
                    "isConcat": isConcat, //1、融合 2、去重
                    "cirType": cirType, //定时类型 1、手动，2定时
                    "cirUnit": cirUnit, //定时频次 单位 （1、天 2、小时）
                    "cirValue": cirValue, //定时频次值
                    "compareStartTime": compareStartTime, //任务开始时间
                    "compareEndTime": compareEndTime, //任务结束时间
                    "userid": getUser().loginName, //用户id
                    "sourceTable": sourceTable,
                    "targetTable": targetTable,
                };
            }else{ //新增
                url = qkmphost+ 'api/task/add';
                data = {
                    "batchId":sourceTable.batchId?sourceTable.batchId:'', //批次号
                    "name": name,
                    "idCards": idCards,
                    "startTime": startTime, //比对开始时间
                    "endTime": endTime, //比对结束时间
                    "isConcat": isConcat, //1、融合 2、去重
                    "cirType": cirType, //定时类型 1、手动，2定时
                    "cirUnit": cirUnit, //定时频次 单位 （1、天 2、小时）
                    "cirValue": cirValue, //定时频次值
                    "compareStartTime": compareStartTime, //任务开始时间
                    "compareEndTime": compareEndTime, //任务结束时间
                    "userid": getUser().loginName, //用户id
                    "sourceTable": sourceTable,
                    "targetTable": targetTable,
                };
            }
    
            // console.log(data)
            $('#loading').fadeIn('normal', function(){ //开始loading
                // console.log(data)
                $.ajax({
                    url: url,
                    type: 'post',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify(data),
                }).done(function(data) {
                    // 摸排成功
                    $('#loading').fadeOut('normal');//结束loading
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

        })

        // 弹窗‘单个’表格上传提交按钮点击功能
        $('#uploadSingleTable button[type="submit"]').on('click', function(e){
            e.preventDefault();
            // 检验表名词是否已填
            var tableName = $('#localUploadSingleTableName').val();
            if ($.trim(tableName) === ''){
                alertInfoFunc('请填写表名称！');
                return ;
            }
            // 检验文件类型
            var fileNameText = $('#uploadSingleTable .file-list li:nth-child(1)').text(),
                fileName = fileNameText.slice(0, fileNameText.length-2),
                reg = /(xls|xlsx)$/i;
            if(!reg.test(fileName)){
                alertInfoFunc('仅允许导入”xls”或”xlsx”格式文件，请上传指定的文件类型！');
                return ;
            }
            // 检验文件大小
            var fileSize = $('#uploadSingleTable input[name="excelFile"]')[0].files[0].size;
            if(fileSize > 5242880){
                alertInfoFunc('导入文件不能超过5M！');
                return ;
            }

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
                    dragFunc();
                    //添加对比源信息卡
                    var dbyBoxElem = $('.right-top-part'),
                        draggable = $('.left-part .items-box .sub-select-box .local-upload-tables .item').filter(function(index){
                            return compareStr($.trim($(this).text()), tableName);
                        })

                    addDbyInfoCard(dbyBoxElem, draggable);
                    $('#uploadSingleTable').modal('hide');
                }else{
                	 $('#uploadSingleTable button[type="submit"]').button('reset');
                	 alertInfoFunc('上传失败，'+data.msg);
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

        // 页面搜索栏+批量上传弹窗 模板下载 按钮点击下载.xlsx文件功能
        $('.search-bar .qkmp-buttons .download, #uploadSingleTable .download-model').on('click', function(){
            window.location.href = 'http://10.101.139.21:8777/xls/model.xlsx';
        })

        // 搜索栏 背景审查 页面切换点击功能
        // $('.search-bar .search-type span:nth-child(1)').on('click', function(){
        //     var searchPersonID = $.trim($('.search-bar input.input').val());
        //     if(searchPersonID.length > 0){
        //         window.location.href = '../index.html?from=qkmp&personID=' + searchPersonID;
        //     }else{
        //         window.location.href = '../index.html';
        //     }
        // })

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
                        fieldElem.removeClass('active');
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
                        dragElemInit(fieldsBox.parent()); //初始化字段拖拽
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
            $(this).prev('.field').text('请拖入约束条件');

            // 隐藏后面 ‘x’ 和 时间选择框
            if($(this).parent('.green-label-box').length > 0){
                $(this).css('display', 'none').siblings('.dateranger').css('display', 'none');
            }
        })

        
        
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

            }
        });

        // 目标区的设置为拖拽接收区
        $('.right-bottom-part .mbq-info-box').droppable({
            accept: '.left-part .items-box .sub-select-box .item',//限制可拖入元素的类
            drop: function(event, ui){ // ui.draggable可获取被拖动的元素；  event.target可获取元素放置的容器
                var draggable = $(ui.draggable),
                    data = draggable.data(),
                    tgtType = data.tgttype, //表类别
                    tgtTypeName = getCategory(tgtType),//表类别 名
                    searchWord = $('#rightBottomSearchTableName').val();

                // 已添加的表不能再次添加
                if(draggable.hasClass('active')){
                    alertInfoFunc('[' + $.trim(draggable.text()) + ']表已存在于目标区中！');
                    return ;
                }

                //添加目标区信息卡
                addMbqInfoCard(draggable);
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
                category = $.trim($('.right-bottom-part .slide-filter-menu li.active span:last').text());
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
            $('#localUploadSingleTableName').val(name.split('.')[0]);//自动填上表名
        });

        // 模态框上传多个表格数据 监听input[type='file']的change事件来更新文件名的显示
        // $('#uploadMultipleTable input[name="excelFile"]').on('change', function(e){
        //     var files = e.currentTarget.files,
        //         name = '',
        //         htmlCode = '';
        //     for(var i = 0, j = files.length; i < j; i++){
        //         name = files[i].name;
        //         htmlCode += `<li>${name}<a href="#">删除</a></li>`;
        //     }
        //     $('#uploadMultipleTable ol.file-list').html(htmlCode);
        // });

    }

    /**
     * @desc 页面左部分模拟桌面鼠标左键区域选择表名功能
     * @param {*可鼠标选框的区域范围元素} boxElem Object(jquery对象)
     * @return undefined
     */
    function mouseSelectAreaItems(boxElem){

        boxElem[0].onmousedown = function (event) {

            var srcElem = event.srcElement ? event.srcElement : event.target;
            if($(srcElem).is('span') || $(srcElem).hasClass('item')){  //若事件源是span，即在进行表名的拖动，则不进行选框的操作
                return ;
            }

            var currentType = $.trim($('.left-part .button-box .button.active span').text()),
                tgtType = getCategoryNum(currentType),
                evt = window.event || arguments[0],
                startX = (evt.x || evt.clientX), //设置或获取鼠标指针位置相对于父文档的 x 像素坐标
                startY = (evt.y || evt.clientY), //设置或获取鼠标指针位置相对于父文档的 y 像素坐标
                selDiv = document.createElement("div"),
                itemNodes = {},
                _x = null,
                _y = null;
            if(currentType === '智能搜索'){
                itemNodes = boxElem.find('.online-database-tables .item');
            }else{
                itemNodes = boxElem.find('.item').filter(function(item){ //只筛选出当前可看见的元素
                    return parseInt($(this).data('tgttype')) === tgtType;
                });
            }

            selDiv.style.cssText = "position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;";
            selDiv.id = "selectDiv";
            document.body.appendChild(selDiv);
            selDiv.style.left = startX + "px";
            selDiv.style.top = startY + "px";
            
            clearEventBubble(evt);//阻止事件冒泡
    
            $(document).on('mousemove', function () {
                evt = window.event || arguments[0];
                    if (selDiv.style.display == "none") {
                        selDiv.style.display = "";
                    }
                    _x = (evt.x || evt.clientX);
                    _y = (evt.y || evt.clientY);
                    $(selDiv).css({
                        left: Math.min(_x, startX),
                        top: Math.min(_y, startY),
                        width: Math.abs(_x - startX),
                        height: Math.abs(_y - startY),
                    })
    
                clearEventBubble(evt);
            })

            $(document).on('mouseup', function(evt){
                // ---------------- 关键检测 ---------------------  
                var _l = selDiv.offsetLeft, _t = selDiv.offsetTop;
                var _w = selDiv.offsetWidth, _h = selDiv.offsetHeight;
                for (var i = 0, j = itemNodes.length; i < j; i++) {
                    var sl = $(itemNodes[i]).width() + $(itemNodes[i]).offset().left,
                        st = $(itemNodes[i]).height() + $(itemNodes[i]).offset().top;
                    if (sl > _l && st > _t && $(itemNodes[i]).offset().left < _l + _w && $(itemNodes[i]).offset().top < _t + _h) {
                        $(itemNodes[i]).addClass('selected');
                    }
                }
                //移除选框元素
                document.body.removeChild(selDiv);
                _x = null, _y = null, selDiv = null, startX = null, startY = null, evt = null;
                $(document).off('mousemove');
                $(document).off('mouseup');

                //将选框中的表添加到目标区
                $('.left-part .items-box .sub-select-box .item.selected:not(.active)').removeClass('selected').each(function(){
                    var draggable = $(this),
                        data = draggable.data(),
                        tgtType = data.tgttype, //表类别
                        tgtTypeName = getCategory(tgtType),//表类别 名
                        searchWord = $('#rightBottomSearchTableName').val();

                    //添加目标区信息卡
                    addMbqInfoCard($(this));
                    // 添加完卡之后就滚动到那条信息卡
                    // rightBottomTableNamefilterFunc(tgtTypeName, searchWord);
                });
                
            })

        }

    }


    /**
     * @desc 如果页面是情况摸排任务列表页面跳转而来，则需要复现之前用户的状态
     * @param none
     * @return undefined
     */
    function reproductionSelectState(){
        var from = GetQueryString("from"); //获取url参数 from 判断页面跳转自哪里
        // if(from !== 'qkmprwlb'){ //如果页面不是跳转自 对比摸排的任务列表页面，不做任何操作
        //     return ;
        // }

        var taskId = GetQueryString("taskId"),//获取需要复现的任务ID
            operation = GetQueryString("operation"),
            data = {
                taskId: taskId,
            };
        // 为之后点击摸排的时候，可以判断是新增还是保存 提供依据
        $('html').data('from', from);
        $('html').data('taskId', taskId);
        $('html').data('operation', operation);
        if(operation === 'check'){ //如果是查看，则禁用开始摸排按钮
            var ksmpButton = $('#ksmpAlertTable button.sure');
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
            // console.log(data);
            var taskCompare = data.msg.taskCompare,
                tableList = data.msg.tablelist,
                sourceName = taskCompare.sourceName,
                sourceTableSelectInfo = {},
                targetTableSelectInfo = [],
                taskName = taskCompare.name,//任务名
                startTime = taskCompare.startTime,
                endTime = taskCompare.endTime,
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
            $('#ksmpAlertTable .filter-condition-box .task-name').val(taskName); //任务名
            calendar($('#ksmpAlertTable .filter-condition-box .dateranger1 input'), 'right', startTime, endTime);
            if(parseInt(isConcat) === 1){ //融合
                $('#ksmpAlertTable .select-combine-type .col-md-8').first().find('.item:nth-child(1)').addClass('active').siblings().removeClass('active');
            }else{ //去重
                $('#ksmpAlertTable .select-combine-type .col-md-8').first().find('.item:nth-child(1)').removeClass('active').siblings().addClass('active');
            }
            if(parseInt(cirType) === 1){ //手动
                $('#ksmpAlertTable .select-time-type .col-md-8').first().find('.item:nth-child(1)').addClass('active').siblings().removeClass('active');
            }else{ //定时
                $('#ksmpAlertTable .select-time-type .col-md-8').first().find('.item:nth-child(2)').trigger('click');
                $('#ksmpAlertTable .select-time-type .col-md-8').first().find('.item:nth-child(1)').removeClass('active').siblings().addClass('active');
                if(taskCompare.compareStartTime){
                    calendar($('#ksmpAlertTable .timing-box .dateranger2 input'), 'right', compareStartTime, compareEndTime);
                }
                if(parseInt(cirUnit) === 1){ //天
                    $('#ksmpAlertTable .timing-box .row:nth-child(2) label:nth-child(1) > input').attr('checked', 'checked');
                }else{ //小时
                    $('#ksmpAlertTable .timing-box .row:nth-child(2) label:nth-child(2) > input').attr('checked', 'checked');
                }
                $('#ksmpAlertTable .timing-box .row:nth-child(2) select').val(cirValue);
            }

                
            // 对比源信息卡复现
            if(draggable.length > 0){
                addDbyInfoCard(dbyBoxElem, draggable);
            }else{
                // 由身份证号转化为对比源
                var draggable = $('<div></div>'),
                    sourceTable = tableList[0];
                draggable.data('batchid', sourceTable.batchId);//批次号
                draggable.data('tgttable', sourceTable.tableId); //表英文名
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
                            addMbqInfoCard($(this));
                            return false; //找到一个即可，跳出循环
                        }
                    }else{ //线上类
                        if(compareStr($(this).data('tgttable'), tableId)){
                            addMbqInfoCard($(this));
                            return false; //找到一个即可，跳出循环
                        }
                    }
                })
            })
            var mbqCardElems = $('.right-bottom-part .mbq-info-box .mbq-info-card');
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

    






    /**-------工具方法----------------------------------------------------------------------------------------------------------------------------------*/ 

    





})