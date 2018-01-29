/**
 * @desc: session存储表格信息
 * @param: none
 * @return: undefined 
 */
function saveTableInfo() {
    // 存储local本地上传的表信息
    $.ajax({
        type: "get",
        url: qkmphost + "api/uploadTable/list",
        success: function (localData) {
            var localTables = {};

            for (var i = 0, j = localData.length; i < j; i++) {
                localTables[localData[i].batchId] = localData[i];
            }
            // console.log(localTables);
            sessionStorage.setItem('localTables', JSON.stringify(localTables));
        }
    });
    // 存储online线上的表信息
    $.ajax({
        type: "get",
        url: qkmphost + "api/modelTable/list?sourceId=&tableName=",
        success: function (onlineData) {
            var onlineTables = {};

            for (var i = 0, j = onlineData.length; i < j; i++) {
                onlineTables[onlineData[i].tgtTable] = onlineData[i];
            }
            // console.log(onlineTables);
            sessionStorage.setItem('onlineTables', JSON.stringify(onlineTables));
        }
    });
}

/**
 * @desc: 根据表类别、batchId、表英文名 获取session里面存储的表信息--------情况摸排
 * @param {*容器原始} tgtType String
 * @param {*bacthId} batchId String
 * @param {*表英文名} tgtTable String
 * @return: table 单表信息 
 */
function getTableInfo(tgtType, batchId, tgtTable) {
    var tables = {},
        table = {},
        tableStr = '';
    
    if(parseInt(tgtType) === 4){ //本地表
        tableStr = sessionStorage.getItem('localTables');
        tables = JSON.parse(tableStr);
        table = tables[batchId];
    }else{ //线上表
        tableStr = sessionStorage.getItem('onlineTables');
        tables = JSON.parse(tableStr);
        table = tables[tgtTable];
    }

    return table;
}


/**
 * @desc 初始化日期选择控件
 * @param {*日期控件jquery对象} dateElem Object
 * @param {*日期控件弹出的方向} openDirection String
 * @return undefined
 */
function calendar(dateElem, openDirection, startDate, endDate) {

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
    // var startDate = startDate || moment().format("YYYY-MM-DD");
    // var endDate = endDate || moment(moment().add(30, 'days').calendar()).format("YYYY-MM-DD");
    if(startDate){
        dateElem.val(startDate + ',' + endDate); //注释————初始时间为空
    }
    dateElem.daterangepicker({
        applyClass: 'btn-success',
        // clearClass:'btn-warning',
        cancelClass: 'btn-info',
        'locale': locale,
        format: "YYYY-MM-DD",
        startDate: startDate,
        endDate: endDate,
        opens: openDirection,
        dateLimit: {
            "days": 30 //限制最长时间间隔30天
        },
    }, function (start, end) {
        // startDate=start.format('YYYY-MM-DD');
        // endDate=end.format('YYYY-MM-DD');
    });
    // 用户不能直接输入日期
    dateElem.attr("readonly", "readonly");

}

/**
 * @desc 添加对比源信息卡
 * @param {*容器原始} dbyBoxElem (jquery对象)
 * @param {*添加信息来源元素} draggable (jquery对象)
 * @return undefined
 */
function addDbyInfoCard(dbyBoxElem, draggable) {
    var htmlCode = '',
        tgtType = draggable.data('tgttype'), //表类别
        batchId = draggable.data('batchid'),//批次号
        tgtTable = draggable.data('tgttable'), //表英文名
        tgtTypeName = getCategory(tgtType);//表类别 名

    var table = getTableInfo(tgtType, batchId, tgtTable);
        tgtName = table.tgtName, //表中文名
        tgtColumn = table.tgtColumn, //表中文名
        tgtColumncn = table.tgtColumncn.split(/[,，]/); //表中文名

    htmlCode = `<div class="dby-info-card" data-tgtTable="${tgtTable}" data-batchId="${batchId}" data-tgtType="${tgtType}">
                            <div class="main-title" title="${tgtName}"><span>${tgtTypeName}</span>
                                <span class="tgtName">${tgtName}</span>
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
                                    <span class="field">${tgtColumncn[1]}</span>
                                </div>
                                <div class="green-label-box">
                                    <span class="green-label">时间约束条件</span>
                                    <span class="field">请拖入约束条件</span><span class="delete-ystj" style="display: none;">x</span>
                                    <!-- 日期选择 -->
                                    <div class="input-group dateranger" style="display: none;">
                                        <input type="text" class="daterangebox date2" />
                                    </div>
                                </div>
                            </div>
                            <div class="fields-box"><p class="check-more">>></p>`
    for (var i in tgtColumncn) {
        htmlCode += `<span class="field active">${tgtColumncn[i]}</span>`
    }
    htmlCode += `</div></div>`;
    //增加元素前先移除之前的
    var mainInfoBox = dbyBoxElem.find('.main-info-box');
    mainInfoBox.empty();
    mainInfoBox.append(htmlCode);
    hide_showCheckAllFields($('.right-top-part .dby-info-card'));
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
function addMbqInfoCard(draggable) {
    var htmlCode = '',
        that = draggable,
        data = that.data(),
        tgtType = data.tgttype, //表类别
        batchId = data.batchid,
        tgtTable = data.tgttable,
        tgtTypeName = getCategory(tgtType),//表类别 名
        searchWord = $('#rightBottomSearchTableName').val();

    var table = getTableInfo(tgtType, batchId, tgtTable);
        tgtName = table.tgtName, //表中文名
        tgtColumn = table.tgtColumn, //表中文名
        tgtColumncn = table.tgtColumncn.split(/[,，]/), //表中文名
        tgtCompkeycn = table.tgtCompkeycn; //关联字段


    // 筛选表类型，本地表不能添加到目标区
    if (tgtType === 4) {
        alertInfoFunc('本地表不能添加到目标区！');
        return;
    }

    draggable.addClass("active");
    // 增加目标区表信息
    htmlCode = `<div class="mbq-info-card" data-tgtTable="${tgtTable}" data-batchId="${batchId}" data-tgtType="${tgtType}">
                            <div class="main-title" title="${tgtName}"><span>${tgtTypeName}</span>
                                <span class="tgtName">${tgtName}</span>
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
                                    <span class="field">${tgtCompkeycn}</span>
                                </div>
                                <div class="green-label-box">
                                    <span class="green-label">时间约束条件</span>
                                    <span class="field">请拖入约束条件</span><span class="delete-ystj" style="display: none;">x</span>
                                    <!-- 日期选择 -->
                                    <div class="input-group dateranger" style="display: none;">
                                        <input type="text" class="daterangebox date2" />
                                    </div>
                                </div>
                            </div>
                            <div class="fields-box"><p class="check-more">>></p>`;
    for (var i in tgtColumncn) {
        htmlCode += `<span class="field active">${tgtColumncn[i]}</span>`
    }
    htmlCode += `</div></div>`;
    var elem = {};
    switch (tgtTypeName) {
        case '本地':
            elem = $('.right-bottom-part .sub-info-box .mbq-info-box .bd-card-box');
            elem.prepend(htmlCode);
            //初始化新加的日期选择控件
            calendar(elem.first('.mbq-info-card').find('.date2'), 'left');
            //初始化标签的拖拽功能
            dragElemInit(elem.find('.mbq-info-card').first());
            break;
        case '人员':
            elem = $('.right-bottom-part .sub-info-box .mbq-info-box .ry-card-box');
            elem.prepend(htmlCode);
            calendar(elem.first('.mbq-info-card').find('.date2'), 'left');
            dragElemInit(elem.find('.mbq-info-card').first());
            break;
        case '物品':
            elem = $('.right-bottom-part .sub-info-box .mbq-info-box .wp-card-box');
            elem.prepend(htmlCode);
            calendar(elem.first('.mbq-info-card').find('.date2'), 'left');
            dragElemInit(elem.find('.mbq-info-card').first());
            break;
        case '案件':
            elem = $('.right-bottom-part .sub-info-box .mbq-info-box .aj-card-box');
            elem.prepend(htmlCode);
            calendar(elem.first('.mbq-info-card').find('.date2'), 'left');
            dragElemInit(elem.find('.mbq-info-card').first());
            break;
        case '组织':
            elem = $('.right-bottom-part .sub-info-box .mbq-info-box .zz-card-box');
            elem.prepend(htmlCode);
            calendar(elem.first('.mbq-info-card').find('.date2'), 'left');
            dragElemInit(elem.find('.mbq-info-card').first());
            break;
        case '资源':
            elem = $('.right-bottom-part .sub-info-box .mbq-info-box .zy-card-box');
            elem.prepend(htmlCode);
            calendar(elem.first('.mbq-info-card').find('.date2'), 'left');
            dragElemInit(elem.find('.mbq-info-card').first());
            break;
        case '轨迹':
            elem = $('.right-bottom-part .sub-info-box .mbq-info-box .gj-card-box');
            elem.prepend(htmlCode);
            calendar(elem.first('.mbq-info-card').find('.date2'), 'left');
            dragElemInit(elem.find('.mbq-info-card').first());
            break;
        default:
            console.log('目标区拖拽添加分类不符!');
    }
}

/**
 * @desc 信息卡 表字段能全部显示 则隐藏查看全部字段按钮
 * @param {*信息卡对象} cardElem (jquery对象)
 * @return undefined
 */
function hide_showCheckAllFields(cardElem){
    if(cardElem.find('.fields-box .field:last').position().top < 45 ){
        cardElem.find('.check-more').hide();
    }
}

/**
 * @desc 添加全部 目标区信息卡
 * @param {*信息卡对象数组} labels (jquery对象)
 * @return undefined
 */
function addQbMbqInfoCard(labels) {
    var bdHtmlCode = '',
        ryHtmlCode = '',
        wpHtmlCode = '',
        ajHtmlCode = '',
        zzHtmlCode = '',
        zyHtmlCode = '',
        gjHtmlCode = '';

    labels.each(function(){
        if(!($(this).hasClass("active"))){
            addSingleCard($(this));
        }
    })

    // 添加元素
    $('.bd-card-box').html(bdHtmlCode);
    $('.ry-card-box').html(ryHtmlCode);
    $('.wp-card-box').html(wpHtmlCode);
    $('.aj-card-box').html(ajHtmlCode);
    $('.zz-card-box').html(zzHtmlCode);
    $('.zy-card-box').html(zyHtmlCode);
    $('.gj-card-box').html(gjHtmlCode);
    //初始化新加的日期选择控件
    calendar($('.mbq-info-box .date2'), 'left');
    //初始化标签的拖拽功能
    dragElemInit($('.mbq-info-box .mbq-info-card'));

    function addSingleCard(draggable){
        var htmlCode = '',
            that = draggable,
            data = that.data(),
            tgtType = data.tgttype, //表类别
            batchId = data.batchid,
            tgtTable = data.tgttable,
            tgtTypeName = getCategory(tgtType);//表类别 名
    
        var table = getTableInfo(tgtType, batchId, tgtTable);
            tgtName = table.tgtName, //表中文名
            tgtColumn = table.tgtColumn, //表中文名
            tgtColumncn = table.tgtColumncn.split(/[,，]/), //表中文名
            tgtCompkeycn = table.tgtCompkeycn; //关联字段
    
    
        // 筛选表类型，本地表不能添加到目标区
        if (tgtType === 4) {
            console.log(tgtName)
            alertInfoFunc('本地表不能添加到目标区！');
            return;
        }
    
        draggable.addClass("active");
        // 增加目标区表信息
        htmlCode = `<div class="mbq-info-card" data-tgtTable="${tgtTable}" data-batchId="${batchId}" data-tgtType="${tgtType}">
                                <div class="main-title" title="${tgtName}"><span>${tgtTypeName}</span>
                                    <span class="tgtName">${tgtName}</span>
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
                                        <span class="field">${tgtCompkeycn}</span>
                                    </div>
                                    <div class="green-label-box">
                                        <span class="green-label">时间约束条件</span>
                                        <span class="field">请拖入约束条件</span><span class="delete-ystj" style="display: none;">x</span>
                                        <!-- 日期选择 -->
                                        <div class="input-group dateranger" style="display: none;">
                                            <input type="text" class="daterangebox date2" />
                                        </div>
                                    </div>
                                </div>
                                <div class="fields-box"><p class="check-more">>></p>`;
        for (var i in tgtColumncn) {
            htmlCode += `<span class="field active">${tgtColumncn[i]}</span>`
        }
        htmlCode += `</div></div>`;
        switch (tgtTypeName) {
            case '本地':
                bdHtmlCode += htmlCode;
                break;
            case '人员':
                ryHtmlCode += htmlCode;
                break;
            case '物品':
                wpHtmlCode += htmlCode;
                break;
            case '案件':
                ajHtmlCode += htmlCode;
                break;
            case '组织':
                zzHtmlCode += htmlCode;
                break;
            case '资源':
                zyHtmlCode += htmlCode;
                break;
            case '轨迹':
                gjHtmlCode += htmlCode;
                break;
            default:
                console.log('超出类别范围');
        }
    }


}

/**
* @desc 初始化信息卡内标签可拖拽（表信息内字段可拖拽）
* @param {*信息卡jquery对象} dragCardElem Object
* @return undefined
*/
function dragElemInit(dragCardElem) {
    dragCardElem.find('.fields-box .field').draggable({
        helper: 'clone', //克隆，保留原位置的元素
        revert: 'invalid', //没有拖入放置容器，飘回来
        zIndex: 100, //设置拖动的Z-index，避免被position:absolute;的元素覆盖
    });

    dragCardElem.find('.filter-conditions-box .orange-label-box, .filter-conditions-box .green-label-box').droppable({
        accept: dragCardElem.find('.fields-box .field'),//限制可拖入元素 选择器或jquery对象
        drop: function (event, ui) { // ui.draggable可获取被拖动的元素；  event.target可获取元素放置的容器
            var fieldElem = $(event.target),
                fieldText = $(ui.draggable).text();

            $(ui.draggable).addClass('active'); //拖入的字段 即为被选比较字段
            fieldElem.find('.field').text(fieldText);

            // 显示后面 ‘x’ 和 时间选择框
            if (fieldElem.hasClass('green-label-box')) {
                fieldElem.find('.delete-ystj, .dateranger').css('display', 'inline-block');
            }
        }
    });
}

/**
 * @desc 页面左部分根据表格类别和搜索词来控制 表格名称的显隐状态
 * @param {*表格类型} category String
 * @param {*搜索词} searchWord String
 * @return undefined
 */
function leftTableNamefilterFunc(category, searchWord) {
    var tableNames = $('.left-part .items-box .sub-select-box .item');

    if (compareStr('本地', category)) {
        $('.left-part .local-upload-tables').css('display', 'block');
        $('.left-part .online-database-tables').css('display', 'none');
    } else {
        $('.left-part .local-upload-tables').css('display', 'none');
        $('.left-part .online-database-tables').css('display', 'block');
    }

    tableNames.each(function () {
        var that = $(this),
            tgtType = getCategory(that.data('tgttype'));

        if (compareStr('全部', category)) {
            if (searchWord.length === 0) { //若搜索内容为空，则恢复分类下所有标签
                that.css('display', 'inline-block');
            } else {//若搜索内容不为空
                if (that.text().indexOf(searchWord) > -1) { //搜索词符合
                    that.css('display', 'inline-block');
                } else { //搜索词不符合
                    that.css('display', 'none');
                }
            }
            return;
        }

        if (compareStr(tgtType, category)) { //类型符合
            if (searchWord.length === 0) { //若搜索内容为空，则恢复分类下所有标签
                that.css('display', 'inline-block');
            } else {//若搜索内容不为空
                if (that.text().indexOf(searchWord) > -1) { //搜索词符合
                    that.css('display', 'inline-block');
                } else { //搜索词不符合
                    that.css('display', 'none');
                }
            }
        } else { //类型不符合
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
function rightBottomTableNamefilterFunc(category, searchWord) {
    var tableCards = $('.right-bottom-part .mbq-info-box .mbq-info-card'),
        mbqCardsBox = $('.right-bottom-part .sub-info-box .mbq-info-box'),
        cardHeight = 0,
        // 滚动元素到可视区域
        scrollAnimateFunc = function (box, order) { //box: 容器盒元素(jquery对象)    order: 选中元素之前还有几个卡片  
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
    if (searchWord.length !== 0) {
        tableCards.each(function () {
            var that = $(this);
            if (that.find('.tgtName').text().indexOf(searchWord) > -1) {
                that.addClass('search');
            }
        })
    }
    //滚动到第一个符合搜索条件的card
    tableCards.each(function () {
        var that = $(this),
            order = tableCards.index(that),
            tgtType = that.data('tgttype'), //表类别
            tgtTypeName = getCategory(tgtType);//表类别 名

        // 无分类的情况
        if (category === '') {
            if (searchWord.length === 0) { //搜索内容为空
                scrollAnimateFunc(mbqCardsBox, 0);
                return false; //break
            } else {//若搜索内容不为空
                if (that.find('.tgtName').text().indexOf(searchWord) > -1) { //搜索词符合
                    scrollAnimateFunc(mbqCardsBox, order);
                    return false; //break
                }
            }
            return true; //continue
        }

        // 有分类的情况
        if (compareStr(tgtTypeName, category)) { //类型符合
            if (searchWord.length === 0) { //搜索内容为空
                scrollAnimateFunc(mbqCardsBox, order);
                return false; //break
            } else {//若搜索内容不为空
                if (that.find('.tgtName').text().indexOf(searchWord) > -1) { //搜索词符合
                    scrollAnimateFunc(mbqCardsBox, order);
                    return false; //break
                }
            }
        }


    })
}

/**
 * @desc 页面右下部分根据表名滚动到相应的位置
 * @param {*表英文名} tgtTable String
 * @return undefined
 */
function rightBottomTableNameScrollFunc(tgtTable) {
    var tableCards = $('.right-bottom-part .mbq-info-box .mbq-info-card'),
        mbqCardsBox = $('.right-bottom-part .sub-info-box .mbq-info-box'),
        cardHeight = 0,
        // 滚动元素到可视区域
        scrollAnimateFunc = function (box, order) { //box: 容器盒元素(jquery对象)    order: 选中元素之前还有几个卡片  
            for (var i = 0, j = order; i < j; i++) {
                cardHeight += $(tableCards[i]).outerHeight();  //加上盒宽
            }
            cardHeight += parseFloat(tableCards.first().css('marginTop')) * order; //加上上margin
            // 常规用法 在 jquery.mCustomScrollbar.concat.min.js 插件上不好用
            box.animate({
                scrollTop: cardHeight  // position 是相对父元素的偏移
            }, 300);
            // mCustomScrollbar插件滚动条滚动方法
            // console.log(cardHeight)
            // $('.right-bottom-part .mbq-info-box').mCustomScrollbar('scrollTo', 'top', { //官方方法 --不会用
            //     scrollInertia: cardHeight,
            // })
            // $('#mCSB_2_container').animate({ //自制方法
            //     top: -cardHeight  // position 是相对父元素的偏移
            // }, 300);
        }
    
    tableCards.each(function () {
        var that = $(this),
            order = tableCards.index(that),
            tgtTable_Card = that.data('tgttable'); //表英文名称

        if (compareStr(tgtTable, tgtTable_Card)) {
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
function reproductionCardSelectState(cardElem, selectStateInfo) {
    var compareColumnNameArray = deleteNullArrayElem(selectStateInfo.compareColumnName.split(/[,，]/)),
        connectColumnName = selectStateInfo.connectColumnName,
        consColumnName = selectStateInfo.consColumnName,
        timeRange = '',
        startTime = selectStateInfo.startTime,
        endTime = selectStateInfo.endTime;

    if (consColumnName === undefined || consColumnName === null || consColumnName === '' || consColumnName === '请拖入约束条件') {
        consColumnName = '请拖入约束条件'; //默认值
    } else {
        cardElem.find('.delete-ystj, .dateranger').css('display', 'inline-block');
    }
    cardElem.find('.filter-conditions-box .orange-label-box .field').text(connectColumnName);
    cardElem.find('.filter-conditions-box .green-label-box .field').text(consColumnName);
    cardElem.find('.fields-box .field').each(function () {
        var that = $(this),
            fieldName = that.text();
        if (compareColumnNameArray.indexOf($.trim(fieldName)) > -1) {
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
function compareStr(str1, str2) {
    return $.trim(str1) === $.trim(str2);
}

/**
 * @desc 根据表类别数字获取类别名称
 * @param {*表类别数字} categoryNum String
 * @return String
 */
function getCategory(categoryNum) {
    var tgtType = '';
    switch (parseInt(categoryNum)) {
        case 0:
            tgtType = '资源';
            break;
        case 1:
            tgtType = '轨迹';
            break;
        case 2:
            tgtType = '人员';
            break;
        case 4:
            tgtType = '本地';
            break;
        case 5:
            tgtType = '物品';
            break;
        case 6:
            tgtType = '案件';
            break;
        case 7:
            tgtType = '组织';
            break;
        default:
            tgtType = '全部';
    }

    return tgtType;
}

/**
 * @desc 根据表类别名获取类别数字
 * @param {*表类别名} category String
 * @return String
 */
function getCategoryNum(category) {
    var tgtType = '';
    switch (category) {
        case '资源':
            tgtType = 0;
            break;
        case '轨迹':
            tgtType = 1;
            break;
        case '人员':
            tgtType = 2;
            break;
        case '本地':
            tgtType = 4;
            break;
        case '物品':
            tgtType = 5;
            break;
        case '案件':
            tgtType = 6;
            break;
        case '组织':
            tgtType = 7;
            break;
        default:
            tgtType = -1;
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
function getColumn(chosenColumnName, column, columnName) {
    var columnArray = column.split(/[,，]/),
        columnNameArray = columnName.split(/[,，]/),
        chosenColumn = '';

    columnNameArray.forEach(function (item, index) {
        if (compareStr(item, chosenColumnName)) {
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
function getColumns(compareColumnName, column, columnName) {
    var compareColumnNameArray = compareColumnName.slice(0, compareColumnName.length - 1).split(/[,，]/),
        columnArray = column.split(/[,，]/),
        columnNameArray = columnName.split(/[,，]/),
        compareColumnArray = [],
        compareColumn = '';

    compareColumnNameArray.forEach(function (item1, index1) {
        columnNameArray.forEach(function (item2, index2) {
            if (compareStr(item1, item2)) {
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
function deleteNullArrayElem(array) {
    var newArray = [];
    for (var i = 0, j = array.length; i < j; i++) {
        if (array[i] != undefined && array[i] !== null && array[i] !== '') {
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
function alertInfoFunc(message, type) {
    var alertElem = $('#ksmpAlert'),
        className = type ? 'alert-' + type : 'alert-danger';

    alertElem.addClass(className).find('span').text(message);
    $('#ksmpAlert a').on('click', function () {
        alertElem.fadeOut(500);
    })
    alertElem.fadeIn(500, function () {
        setTimeout(function () {
            alertElem.fadeOut(500);
        }, 1500)
    })
}

/**
 * @desc 页面表格分页函数
 * @param {*分页配置项} option Object
 * @param {*分页器元素的jQuery对象} paginationElem Object
 * @return undefined
 * var option = {};
    option.total = data.msg.totalCount;
    option.pageSize = data.msg.pageSize;
    option.pageNumber = data.msg.page;
 */
function paginationInit(option, paginationElem) {
    BootstrapPagination(
        paginationElem,
        {
            layoutScheme: "lefttext,pagesizelist,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
            //记录总数。
            total: option.total,
            //分页尺寸。指示每页最多显示的记录数量。
            pageSize: option.pageSize,
            //当前页索引编号。从其开始（从0开始）的整数。
            pageIndex: option.pageNumber - 1,
            //指示分页导航栏中最多显示的页索引数量。
            pageGroupSize: 5,
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
            pageSizeList: [5, 10, 20],
            //当分页更改后引发此事件。
            pageChanged: function (pageIndex, pageSize) {
                //getScData();
                getLlsjData(pageIndex + 1, pageSize, paginationElem.parents('.modal'));
            },
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
        tableName = largeModel.data('tgtTable'),
        batchId = largeModel.data('batchId'),
        tgtcolumncn = largeModel.data('tgtcolumncn'),
        tgtColumn = largeModel.data('tgtcolumn');
    
    if(parseInt(tgtType) === 4){//本地类
        // console.log('bendilei')
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
                tbodyHtmlCode = '',
                tgtcolumncnArray = tgtcolumncn.split(/[,，]/),
                tgtColumnArray = tgtColumn.split(/[,，]/),
                items = data.msg.items;
            
            var tableElem = $('<table class="table table-striped table-hover"></table>');
            tableElem.append('<tbody></tbody>');
            largeModel.find('.modal-title').text(tgtName);
            for (var i = 0, j = items.length + 1; i < j; i++){
                tbodyHtmlCode += '<tr></tr>';
            }
            tableElem.find('tbody').html(tbodyHtmlCode);
            for (var i = 0, j = tgtcolumncnArray.length; i < j; i++) {
                tableElem.find('tbody tr').first().append('<th>'+ tgtcolumncnArray[i] +'</th>');
                // 因为要数据要对应列名，所以一列一列加
                for(var a = 0, b = items.length; a < b; a++){
                    if(items[a][tgtColumnArray[i]] === undefined || items[a][tgtColumnArray[i]] === ''){
                        items[a][tgtColumnArray[i]] = '-';
                    }
                    tableElem.find('tbody > tr').eq(a + 1).append('<td title="' + items[a][tgtColumnArray[i]] + '">' + items[a][tgtColumnArray[i]] + '</td>');
                }
            }
            largeModel.find('.modal-body table').remove();
            largeModel.find('.modal-body').append(tableElem);
            
            var option = {};
            option.total = data.msg.totalCount;
            option.pageSize = data.msg.pageSize;
            option.pageNumber = data.msg.page;

            // 判断是否能显示全部信息
            if(data.count > data.msg.totalCount){
                $('#llsjModel .tip .current-num').text(data.msg.totalCount);
                $('#llsjModel .tip').show();
            }else{
                $('#llsjModel .tip').hide();
            }
            // 配置分页器
            paginationInit(option, largeModel.find('nav > ul.pagination'));
        },
        error: function(){
            console.log('获取浏览数据失败!');
        }
    })
}
