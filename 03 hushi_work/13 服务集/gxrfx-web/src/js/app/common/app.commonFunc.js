/*
 * @Author: 果实o
 * @Date: 2017-12-14 10:17:29
 * @Last Modified by: 果实o
 * @Last Modified time: 2018-01-09 11:57:36
 */
app.commonFunc = {

	/**
	 * @desc 初始化表格数据操作列的文字提示功能
	 * @return undefined
	 */
    initTooltip: function() {
        $('[data-toggle="tooltip"]:not(.btn-wx)').tooltip();
    },

	/**
	 * @desc 初始化全选按钮
	 * @param container {String} 需要初始化全选按钮的容器，默认值是document
	 * @return undefined
	 */
    initCheckAll: function(pageContainer = document) {
        $(pageContainer).find(".Checkall").prop('checked', false); //全选按钮变为未选中
        $(pageContainer).find(".Checkall").off('click').on('click', function() {
            const _this = this;
            checkif = $(_this).prop('checked'),
                table = $(_this).parents('.table');

            if (checkif) {
                table.find("tbody input[type='checkbox']").prop("checked", true).change();
            } else {
                table.find("tbody input[type='checkbox']").prop("checked", false).change();
            }
        });
        $(pageContainer).find('table tbody').off('click').on('click', '.checkbox', function() {
            const checkif = $(this).prop('checked');
            if (checkif == false) {
                $('.Checkall').prop('checked', false);
            }
        });
    },

	/**
	 * @desc 初始化分页
	 * @param data {Objext} 翻页数据
	 * @param container {String} 分页容器
	 * @param searchHandle {Function} 分页器关联的搜索函数
	 * @return undefined
	 */
    pagination: function(data, container, searchHandle) {
        const that = app.commonFunc;
        BootstrapPagination(
            $('#' + container), {
                layoutScheme: "lefttext,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
                // 记录总数。
                total: data.data.totalRows,
                // 分页尺寸。指示每页最多显示的记录数量。
                pageSize: data.data.pageSize,
                // 当前页索引编号。从其开始（从0开始）的整数。
                pageIndex: data.data.pageNo - 1,
                // 指示分页导航栏中最多显示的页索引数量。
                pageGroupSize: 10,
                // 位于导航条左侧的输出信息格式化字符串
                leftFormateString: "本页{count}条记录/共{total}条记录",
                // 位于导航条右侧的输出信息格式化字符串
                rightFormateString: "第{pageNumber}页/共{totalPages}页",
                // 页码文本格式化字符串。
                pageNumberFormateString: "{pageNumber}",
                // 分页尺寸输出格式化字符串
                pageSizeListFormateString: "每页显示{pageSize}条记录",
                // 上一页导航按钮文本。
                prevPageText: "上一页",
                // 下一页导航按钮文本。
                nextPageText: "下一页",
                // 上一组分页导航按钮文本。
                prevGroupPageText: "上一组",
                // 下一组分页导航按钮文本。
                nextGroupPageText: "下一组",
                // 首页导航按钮文本。
                firstPageText: "首页",
                // 尾页导航按钮文本。
                lastPageText: "尾页",
                // 设置页码输入框中显示的提示文本。
                pageInputPlaceholder: "GO",
                // 接受用户输入内容的延迟时间。单位：毫秒
                pageInputTimeout: 800,
                // 分页尺寸列表。
                pageSizeList: [5, 10, 20],
                // 当分页更改后引发此事件。
                pageChanged: (pageIndex, pageSize) => {
                    searchHandle(pageIndex + 1, pageSize, that.pagination);
                },
            });
    },

	/**
	 * @desc 序列化一般容器，从表单中提取数据
	 * @param container {Jquery Object} 需要序列化表单数据的容器
	 * @param formObject {Object} 原始添加了表单数据的对象，不传就默认为新的空的对象
	 * @return formObject {Object} 添加了表单数据的表单数据对象
	 */
    serializeForm: function(container, formObject = {}) {
        let input_selectElem = container.find('input[type="text"],select,textarea'),
            checkboxElem = container.find('input[type="checkbox"]');

        input_selectElem.each(function() {
            let key = $(this).attr('name'),
                value = $(this).val();
            formObject[key] = value;
        })
        checkboxElem.each(function() {
            let key = $(this).attr('name'),
                value = $(this).is(':checked');
            formObject[key] = value;
        })

        return formObject;
    },

	/**
	 * @desc 将表单对象数据填入表单输入框
	 * @param container {Jquery Object} 需要填入表单数据的容器
	 * @param formObject {Object} 表单数据的对象
	 * @return undefined
	 */
    setFormValues: function(container, formObject) {
        let input_selectElem = container.find('input, select, textarea'),
            checkboxElem = container.find('input[type="checkbox"]');
        input_selectElem.each(function() {
            let name = $(this).attr('name');
            $(this).val(formObject[name]);
        })
        checkboxElem.each(function() {
            let name = $(this).attr('name');

            $(this).prop('checked', formObject[name]);
        })
    },

	/**
	 * @desc 加载关系的树
	 * @param container {String} 树的选择器
	 * @param selectType {Number} 选择项型：1：单选； 2：多选
	 * @return undefined
	 */
    initGxdmTree: async function(container, selectType = 1) {
        const treeContainer = $(container);

        let zTreeObj,
            zTreeOnClick = (event, treeId, treeNode) => {
                const gxdmTreeDom = $(event.currentTarget);
                gxdmTreeDom.siblings('.node-name').val(treeNode.name);
                gxdmTreeDom.siblings('.node-code').val(treeNode.code);
            },
            zTreeOnCheck = (event, treeId, treeNode) => {
                const gxdmTreeDom = $(event.currentTarget),
                    treeObj = $.fn.zTree.getZTreeObj(treeId),
                    nodes = treeObj.getCheckedNodes(true),
                    names = [],
                    codes = [];
                for (let elem of nodes) {
                    names.push(elem.qtlbmc);
                    codes.push(elem.gxdm);
                }
                gxdmTreeDom.siblings('.node-name').val(names.join(','));
                gxdmTreeDom.siblings('.node-code').val(codes.join(','));
            },
            setting = {
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "code", //子节点
                        pIdKey: "pid" //父节点
                    },
                    key: {
                        name: "name" // 节点名字
                    },
                },
                callback: {
                    onClick: zTreeOnClick
                }
            },
            setting2 = {
                check: {
                    enable: true,
                    chkStyle: "checkbox",
                    chkboxType: { "Y": "p", "N": "s" }
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "code", //子节点
                        pIdKey: "pid" //父节点
                    },
                    key: {
                        name: "name" // 节点名字
                    },
                },
                callback: {
                    onCheck: zTreeOnCheck
                }
            },
            zNodes;

        const param = {
            key: 'select_gx',
            limit: 100,
        },
        treeData = await app.api.gxrfx.getGxTreeData({ data: param });
        zNodes = treeData.data.result;

        if (selectType === 1) {
            zTreeObj = $.fn.zTree.init($(container + ' .gxdm-tree-dom'), setting, zNodes);
        } else {
            zTreeObj = $.fn.zTree.init($(container + ' .gxdm-tree-dom'), setting2, zNodes);
        }

        // 树选择输入框的点击 关系
        treeContainer.find('.node-name').off('click').on('click', function(event) {
            const that = $(this);
            that.siblings('.gxdm-tree-dom').css('display', 'block');
            const hideTreeDomFunc = (event) => {
                const target = $(event.target);
                if (!(target.hasClass('tree-dom') || target.parents('.tree-dom').length > 0)) {
                    $(document).off('click', hideTreeDomFunc);
                    that.siblings('.gxdm-tree-dom').css('display', 'none');
                }
            };
            setTimeout(() => {
                $(document).on('click', hideTreeDomFunc);
            }, 1)

        });
        // 输入框之后 x 删除框内内容
        treeContainer.find('.glyphicon-remove').off('click').on('click', function() {
            const that = $(this);
            that.siblings('.node-name, .node-code').val('');
            zTreeObj.checkAllNodes(false); // 取消树选框状态
        });
    },

	/**
	 * @desc 检查时间段选择：选了开始时间就必须选择结束时间
	 * @param startTime {String} 开始时间
	 * @param endTime {String} 结束时间
	 * @return {Number} 0:没有选择结束时间 1:正常
	 */
    checkEndTime: function(startTime, endTime) {
        if (startTime !== '' && endTime === '') {
            app.alert('选择了开始时间，就必须选择结束时间！');
            return 0;
        }
        return 1;
    },

	/**
	 * @desc 初始化码表下拉框内容
	 * @param container {String} 需要初始化下拉框的容器，默认值是document
	 * @return undefined
	 */
    initDictSelect: function(container = 'document') {
        const dictArray = app.constants.zdsjyj_dict_array;
        for (let elem of dictArray) {
            const selectContainer = container === 'document' ? $('select[name="' + elem + '"], select[data-name="' + elem + '"]') : $(container).find('select[name="' + elem + '"], select[data-name="' + elem + '"]');
            let selectTemplate = '<option value="">请选择</option>';
            if (selectContainer.length > 0) {
                // 没取到值的错误处理
                if (app.constants[elem] === undefined) {
                    console.log('码表 ' + elem + ' 没有数据！');
                    return;
                }
                const dictObj = app.constants[elem].nameMap;
                for (let [key, value] of Object.entries(dictObj)) {
                    selectTemplate += `<option value="${key}">${value}</option>`;
                }
            }
            selectContainer.empty().append(selectTemplate);
        }
    },

	/**
	 * @desc 将码表code字符串翻译为码表中文名
	 * @param codeString {String} 需要翻译的code字符串，逗号隔开
	 * @param dictName {String} 所属码表名称
	 * @return nameString {String} 码表中文名，逗号隔开
	 */
    transDictCodeToName: function(codeString, dictName) {
        const codeArray = codeString.split(','),
            dictNameMap = app.constants[dictName].nameMap,
            nameArray = [];
        let nameString = '';
        for (let elem of codeArray) {
            nameArray.push(dictNameMap[elem]);
        }
        nameString = nameArray.join(',');
        return nameString;
    },

	/**
	 * @desc 加载关键词下拉多选框 (注意: 可能会和上面的初始化码表下拉框冲突，重复渲染)
	 * @param container {String} 下拉框所在页面的选择器
	 * @return undefined
	 */
    initGjcSlect2: function(container = 'document') {
        const data = [],
            dictData = app.constants.gjc.nameMap;
        for (let [key, value] of Object.entries(dictData)) {
            data.push({
                id: key,
                text: value,
            });
        }
        $('select[name="gjc"]', container).empty().select2({
            data: data,
            placeholder: '请选择',
            allowClear: true,
            multiple: true,
            width: '400px',
        })
    },


};
