'use strict';

var abztk_constant = {
    tgtType: {  //表类型
        nameMap: {
            "0": "shehui",
            "1": "guiji",//null
            "2": "renyuan",
            "3": "cheliang",
            "4": "shehui",//null
            "5": "wupin",
            "6": "anjian",
            "7": "zuzhi",
            "8": "dianzi",
            "9": "wangluo",
            "10": "renxiang",
            "11": "dizhi",
        },
        keyMap: {
            "shehui": "0",
            "guiji": "1",//null
            "renyuan": "2",
            "cheliang": "3",
            "shehui": "4",//null
            "wupin": "5",
            "anjian": "6",
            "zuzhi": "7",
            "dianzi": "8",
            "wangluo": "9",
            "renxiang": "10",
            "dizhi": "11",
        }
    },
}

$(function() {

    /**-----mian----------------------------------------------------------------------------------------------------------------------------- */
    // 页面初始化
    initPage();

    /**
     * @desc: 页面初始化
     * @param: none
     * @return: undefined 
     */
    function initPage() {
        
        // 初始化页面点击功能
        initClickFunc();
        // 输入框搜索功能
        initSearchFunc();
        // 初始获取表名信息
        initTableName();

    }

    /**-----逻辑方法----------------------------------------------------------------------------------------------------------------------- */
    // 初始化页面点击功能
    function initClickFunc() {
        // 页面标签页切换 tab-nav-bar
        $('.tab-nav-bar .button').on('click', function(){
            var pageName = $(this).data('subpage'),
                searchWord = $.trim($('#table_search').val());

            $(this).addClass('active').siblings('.active').removeClass('active');
            $('.page-content .tables-box .subpage-' + pageName).addClass('active').siblings('.active').removeClass('active');
            filterTable(searchWord);
        });

        // 点击表名，展示表信息 '浏览数据'   去除 人像 表名
        $('.page-content .tables-box subpage:not(.subpage-renxiang)').on('click', '.single-table', function(){
            var llsjModel = $('#llsjModel'),
                tgtType = $(this).data('tgttype'),
                batchId = $(this).data('batchid'),
                tgtTable = $(this).data('tgttable');

            var table = getQbztkTableInfo(tgtTable),
                tgtName = table.tgtName, //表中文名
                tgtColumn = table.tgtColumn, //表中文名
                tgtColumncn = table.tgtColumncn, //表中文名
                tgtTable = table.tgtTable; //车辆专题库的表id

            llsjModel.data('tgtType', tgtType);
            llsjModel.data('batchId', batchId);
            llsjModel.data('tgtName', tgtName);
            llsjModel.data('tgtTable', tgtTable);
            llsjModel.data('tgtcolumncn', tgtColumncn);
            llsjModel.data('tgtcolumn', tgtColumn);
            llsjModel.data('tgttable', tgtTable);
            // 获取指定页数和每页信息条数的表格信息 并配置分页器
            getLlsjData(1, 10, llsjModel);
            
            llsjModel.modal('show');
        });

        // 点击表名，展示表信息 '浏览数据'   去除 人像 表名
        $('.page-content .tables-box .subpage-renxiang').on('click', '.single-table', function(){
            var rxLlsjModel = $('#rxLlsjModel');
            rxLlsjModel.modal('show');
        });

    }

    // 输入框搜索功能
    function initSearchFunc(){
        $('.page-content #table_search').on('input propertychange', function() {
            var searchWord = $.trim($(this).val());

            filterTable(searchWord);
        });

    }

    // 根据输入内容，筛选表名
    function filterTable(searchWord) {
        var activeSubPage = $('.tables-box .subpage.active');

        activeSubPage.find('.single-table').css('display', 'none').filter(function(){
            return $.trim($(this).find('.table-name').text()).indexOf(searchWord) > -1;
        }).css('display', 'inline-flex');
    }

    // 初始获取表名信息
    function initTableName() {
        // $('#loading').fadeIn('normal'); //显示loading
        // 获取表数据
        $.ajax({
            type: "get",
            url: qkmphost+ "/api/infoSource/list?sourceId=&tableName=",
            // async: false, //同步获取表数据
            success: function(result) {
                // console.log(result);

                var htmlTemp = {},
                    category = '',
                    qbztkTables = {};
                for (var key in abztk_constant.tgtType.keyMap){
                    htmlTemp[key] = '';
                };
                for (var i = 0, j = result.length; i < j; i++){
                    category = abztk_constant.tgtType.nameMap[result[i].tgtType];
                    htmlTemp[category] += `<div class="single-table" data-tgttable="${result[i].tgtTable}" data-batchid="${result[i].batchId}" data-tgttype="${result[i].tgtType}">
                        <img src="../../img/qbztk/${category}.png" alt="icon">
                        <span class="table-name" title="${result[i].tgtName}">${result[i].tgtName}</span>
                        <span class="table-message-count">${result[i].count}</span>
                    </div>`;
                    // 存储线上表信息到session 
                    qbztkTables[result[i].tgtTable] = result[i];
                };
                $('.page-content .tables-box > .subpage').each(function() {
                    var className = $(this).attr('class'),
                        category = className.match(/subpage\-(\S+)/)[1];
                    $(this).empty().append(htmlTemp[category]);
                });
                
                // 存储线上表信息到session 
                sessionStorage.setItem('qbztkTables', JSON.stringify(qbztkTables));
            },
            complete: function() {
                $('#loading').fadeOut('normal');
            }
        });
    }



    /**-----common方法----------------------------------------------------------------------------------------------------------------------- */

    /**
     * @desc: 根据表类别、batchId、表英文名 获取session里面存储的表信息 -----------情报专题库
     * @param {*表英文名} tgtTable String
     * @return: table 单表信息 
     */
    function getQbztkTableInfo(tgtTable) {
        var tables = {},
            table = {},
            tableStr = '';
        
        tableStr = sessionStorage.getItem('qbztkTables');
        tables = JSON.parse(tableStr);
        table = tables[tgtTable];

        return table;
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
            url = '',
            tgtType = largeModel.data('tgtType'),
            tgtName = largeModel.data('tgtName'),
            tableName = largeModel.data('tgtTable'),
            batchId = largeModel.data('batchId'),
            tgtcolumncn = largeModel.data('tgtcolumncn'),
            tgtColumn = largeModel.data('tgtcolumn'),
            tgtTable = largeModel.data('tgttable');
        
        if(parseInt(tgtType) === 3){//车辆专题库
            // console.log('bendilei')
            data = {
                type: tgtTable,
                pageNum: pageNum,
                pageSize: pageSize,
            };
            url = qkmphost + 'api/infoSource/listCarSource';
        }else{ // 其他专题库
            data = {
                tableName: tableName,
                batchId: '',
                pageNum: pageNum,
                pageSize: pageSize,
            };
            url = qkmphost + 'api/modelTable/listTableData';
        }

        $.ajax({
            type: 'GET',
            url: url,
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
                        if(items[a][tgtColumnArray[i]] === undefined || items[a][tgtColumnArray[i]] === '' || items[a][tgtColumnArray[i]] === 'null'){
                            items[a][tgtColumnArray[i]] = '-';
                        };
                        items[a][tgtColumnArray[i]] = items[a][tgtColumnArray[i]].replace(/\\n/, ' ');
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



})