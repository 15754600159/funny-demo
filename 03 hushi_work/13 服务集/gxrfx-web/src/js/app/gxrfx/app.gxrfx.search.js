/*
 * @Author: 果实o
 * @Date: 2017-12-11 19:35:39
 * @Last Modified by: 果实o
 * @Last Modified time: 2018-01-29 17:46:10
 */
app.gxrfx.search = {
    pageContainer: '.gxrfx',
    url: 'pages/gxrfx/index.html',
    state: 0, //标识页面的操作状态： 0: normal 可进行所有操作； 1: readOnly 不可进行删除可历史记录操作
    constant: {
        zdrSystemUrl: 'http://10.101.140.130:8000/hs_gongan/login',
    },

    // 初始化页面
    init: function() {
        // 初始化时间选择框
        app.time.init();
        // 处理iframe页面之间传递的参数
        this.getPageData();
        // 初始化人员类别下拉框
        this.initRylbSelector();
        // 初始信息表搜索
        this.initSearchForm(1, 10, app.commonFunc.pagination);
        // 初始化页面元素点击功能
        this.initClickFunc();

    },

    //全局刷新
    reset: function() { },

    //当前页刷新
    refresh: function() {
        const page = $('#gxrfxPagination li.active a').text();
        this.initSearchForm(page, 10, app.commonFunc.pagination);
    },

    // 初始化页面元素点击功能
    initClickFunc: function() {
        const that = this;
        // 查询按钮
        $('.btn_search', that.pageContainer).on('click', function() {
            // 清楚之前选择的 线索总体统计 类别
            $('.nowrap-block .clue-statistics-content', that.pageContainer).removeData('type');
            $('.nowrap-block .clue-statistics-content .active', that.pageContainer).removeClass('active');
            // 刷新列表
            that.initSearchForm(1, 10, app.commonFunc.pagination);
        });
        // 历史记录
        $('.btn_history', that.pageContainer).on('click', function() {
            app.gxrfx.history.open();
        });
        // 关系展开按钮：关系list展开
        $('.btn_show_gxList', that.pageContainer).on('click', function() {
            $('.gx-list', that.pageContainer).slideToggle();
        });
        // 信息删除
        $('.table-body', that.pageContainer).on('click', '.btn_delete', function() {
            const _this = this;
            layer.confirm('您确定要删除此条信息？', {
                btn: ['确定', '取消'],
                title: '删除'
            }, function(index) {
                const gxsfzh = $(_this).parents('tr').data('gxsfzh'),
                    key = 'delete_dybkxx',
                    param = {
                        key,
                        gxsfzh,
                        yxx: '2',
                    };
                app.api.gxrfx.deleteDybc({
                    data: param,
                    success: function(result) {
                        // console.log(result);
                        if (result.success === 0) {
                            app.alert('操作失败！');
                            return;
                        }

                        that.refresh();
                    }
                });

                layer.close(index);
            });
        });

    },

    // 处理iframe页面之间传递的参数
    getPageData: function() {
        // 页面加载完成，给父包含页面提示
        if (window.top != window.self) {
            const param = {
                action: 'onload',
                data: '',
            };
            window.parent.postMessage(param, this.constant.zdrSystemUrl);
        }

        // 监听接收消息
        window.addEventListener('message', (event) => {
            console.log(event);
            const data = event.data;
            switch (data.action) {
                case 'normal': // 正常模式（查看+修改）
                    this.state = 0;
                    $('input[name="relationid"]', $(this.pageContainer)).val(data.relationId);
                    // 初始信息表搜索
                    this.initSearchForm(1, 10, app.commonFunc.pagination);
                    break;
                case 'readOnly': // 只读模式（只能查看，不能操作）
                    this.state = 1;
                    $('input[name="relationid"]', $(this.pageContainer)).val(data.relationId);
                    // 初始信息表搜索
                    this.initSearchForm(1, 10, app.commonFunc.pagination);
                    break;
                case 'submit1': // 提交
                    console.log('submit1')
                    this.submitDybk(data.data);
                    break;
                case 'submit2': // 提交
                    this.submitDybk(2);
                    break;
                default:
                    console.log('操作在iframe中没有匹配的响应！');
            }

        });
    },

    // 初始信息表搜索
    initSearchForm: async function(pageNo, pageSize, pagination) {
        const that = app.gxrfx.search;  //因为要将initSearchForm函数传入pagination中执行，所以that要指向具体的对象，不能用this

        const param = app.commonFunc.serializeForm($('form', that.pageContainer)); // 获取查询所需数据
        param.key = 'select_dybkxx';
        param.yxx = 0; //未提交类型
        param.pageNo = pageNo;
        param.limit = pageSize;

        const result = await app.api.gxrfx.viewGxrfxList({ data: param });
        //	 	console.log(result);
        if (result.status === 0) {
            app.alert('查询数据失败！');
            return;
        }

        const data = result.data ? result.data.result : '',
            tbodyContainer = $(that.pageContainer).find(".table-body");
        let tableBodyTemple = '';

        tbodyContainer.empty();
        for (let i = 0, j = data.length; i < j; i++) {
            tableBodyTemple +=
                `<tr data-id="${data[i].relationid}" data-gxsfzh="${data[i].gxsfzh}">
                    <td title="${data[i].gxxm}">${app.data(data[i].gxxm)}</td>
                    <td title="${data[i].gxsfzh}">${app.data(data[i].gxsfzh)}</td>
                    <td title="${data[i].zdrxlmc}">${app.data(data[i].zdrxlmc)}</td>
                    <td title="${data[i].rylbmc}">${app.data(data[i].rylbmc)}</td>
                    <td title="${data[i].gx}">${app.data(data[i].gx)}</td>
                    <td class="operate">
                        <span class="glyphicon glyphicon-list-alt btn_check" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="详情"></span>
                        <span class="glyphicon glyphicon-remove-circle btn_delete" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="删除"></span>
                    </td>
                </tr>`;
        };
        tbodyContainer.append(tableBodyTemple);
        if (that.state === 0) {
            app.commonFunc.initTooltip(); // 初始化表格最后一列操作文字的提示
        } else {
            $('.table-body .btn_delete', that.pageContainer).prop('disabled', true).css('cursor', 'not-allowed');
        }
        pagination && pagination(result, 'gxrfxPagination', that.initSearchForm);

    },

    // 提交多元布控信息
    submitDybk: async function(param) {
        console.log(param)
        const status = await app.api.gxrfx.submitDybk({ data: param });
        if (status === 0) {
            app.alert('提交多元布控信息失败！');
            return;
        }
    },

    // 初始化人员类别下拉框
    initRylbSelector: async function() {
        const param = {
            key: 'select_rylb',
        },
            selectContainer = $('select[name="rylbmc"]', $(this).pageContainer);
        let selectTemplate = '<option value="">请选择</option>';

        const result = await app.api.gxrfx.getRylbTreeData({ data: param });
        if (result.status === 0) {
            app.alert('查询人员类别下拉框数据失败！');
            return;
        };

        for (let elem of result.data.result) {
            selectTemplate += `<option value="${elem.name}">${elem.name}</option>`;
        };
        selectContainer.empty().append(selectTemplate);

    },

}
