app.ztjc.search = {
    pageContainer: '.ztjc',
    url: 'pages/qbxsfx/ztjc/index.html',
    init: function() {
        // 初始化时间选择框
        app.time.init();
        // 初始化人员类别的树Dom
		app.ztjc.initPersonCategoryTree(this.pageContainer + ' .personCategory-tree-item');
        // 初始化页面 统计图 柱状图echarts
        this.initCharts();
        // 初始信息表搜索
        this.initSearchForm(1, 10, app.qbxsfx.pagination);
        // 初始化页面元素点击功能
        this.initClickFunc();

	},
	reset: function() { //全局刷新

    },
    refresh: function() { //当前页刷新
        const page = $('#ztjcPagination li.active a').text();
        this.initSearchForm(page, 10, app.qbxsfx.pagination);
    },
    initClickFunc: function() {
        const that = this;
        // 查询按钮
        $(that.pageContainer).find('.filter-box .btn_search').on('click', function() {
            that.initSearchForm(1, 10, app.qbxsfx.pagination);
        });
        // 下载按钮
        $(that.pageContainer).find('.filter-box .btn_download').on('click', function() {
        	app.ztjc.search.download();
        });
	},
	initSearchForm: function(pageNo, pageSize, pagination) {
		const that = app.ztjc.search,
			startDate = $('.qbxsgl input[name="startDate"]').val(),
			endDate = $('.qbxsgl input[name="endDate"]').val();

		if (app.time.jiaoyan(startDate, endDate) > 0) { //检查开始时间是否小于结束时间
			return;
		}
		app.loading.show(); // 显示loading

        const param = app.qbxsfx.serializeForm($(that.pageContainer).find('.filter-box form')); // 获取查询所需数据
        param.pageNo = pageNo;
        param.pageSize = pageSize;

        app.api.ztjc.getJjryList({
            data: param,
            success: function(result) {
                // console.log(result);
                if (result.success === 0) {
                    app.alert('查询数据失败！');
                    app.loading.hide(); // 隐藏loading
                    return;
                }

                const data = result.msg ? result.msg.result : '',
                    tbodyContainer = $(that.pageContainer).find(".table-box .table-body");
                let tableBodyTemple = '';

                tbodyContainer.empty();
                for (let i = 0, j = data.length; i < j; i++) {
                    tableBodyTemple += `<tr data-id="${data[i].qbxxid}" data-resultId="${data[i].resultId}">
                        <td title="${data[i].name}">${app.data(data[i].name)}</td>
                        <td title="${data[i].sfzh}">${app.data(data[i].sfzh)}</td>
                        <td title="${that.transformPersonCategory(data[i].personCategory)}">${app.data(that.transformPersonCategory(data[i].personCategory))}</td>
                        <td title="${data[i].managePlace}">${app.data(data[i].managePlace)}</td>
                        <td title="${data[i].actType}">${app.data(data[i].actType)}</td>
                        <td title="${data[i].actTime}">${app.data(data[i].actTime)}</td>
                        <td title="${data[i].recordTime}">${app.data(data[i].recordTime)}</td>
                        <td title="${data[i].travelNumber}">${app.data(data[i].travelNumber)}</td>
                        <td title="${data[i].departPlace}">${app.data(data[i].departPlace)}</td>
                        <td title="${data[i].destinationPlace}">${app.data(data[i].destinationPlace)}</td>
                    </tr>`;
                };
                tbodyContainer.append(tableBodyTemple);
                pagination && pagination(result, 'ztjcPagination', that.initSearchForm);
                app.loading.hide();
            }
        });
    },
    // 转换人员类型codeStr为NameStr
    transformPersonCategory: function(codeStr) {
        const codeArray = codeStr.split(','),
            personCategory = app.constants.personCategory;
        if (!personCategory) {
            return ;
        }
        let nameArray = [];
        for (var i = 0, j = codeArray.length; i < j; i++){
            nameArray.push(personCategory.nameMap[codeArray[i]]);
        }
        return nameArray.join(',');
    },
    // 初始化图表
    initCharts: function() {
        const that = this;

        // 初始化柱状图-------------------------------------------------------------------------------------------------
        const histogram = echarts.init($(that.pageContainer + ' .jjryfx-content-block .block-content')[0]);
        // -指定图表的配置项和数据
        const option_histogram = {
            color: ['#3398DB'],
            title: {
                // text: '近一周（9月11-17日） 共 500 人进京',
                left: 'center',
                textStyle: {
                    color: '#343434',
                    fontSize: '14',
                    fontFamily: 'MicrosoftYaHei',
                    fontWeight: 'lighter',
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // --坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // --默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: { //图例
                right: '1%',
                data: [
                    {
                        name: '群体总数',
                        // 图形
                        icon: 'roundRect',
                        // 文本
                        textStyle: {
                            color: '#249dd0',
                            fontSize: '12'
                        }
                    },
                    {
                        name: '进京人数',
                        // 图形
                        icon: 'roundRect',
                        // 文本
                        textStyle: {
                            color: '#ff7200',
                            fontSize: '12'
                        }
                    },
                ],
            },
            grid: {
                top: '24%',
                left: '1%',
                right: '1%',
                bottom: '4%',
                containLabel: true
            },
            dataZoom: [
                // {
                //     show: true,
                //     type: 'slider',
                //     start: 0,
                //     end: 10
                // },
                {
                    show: true,
                    type: 'inside',
                    start: 0,
                    end: 10
                },
            ],
            xAxis: [
                {
                    type: 'category',
                    // data : ['涉访群体', '涉访群体', '涉访群体', '涉访群体', '涉访群体', '涉访群体', '涉访群体'],
                    axisTick: {
                        alignWithLabel: true
                    },
                    splitLine: {
                        show: false,
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: {
                        show: false,
                    },
                }
            ],
            series: [
                {
                    name:'进京人数',
                    type:'bar',
                    barWidth: '30%',
                    // stack: '人数',
                    barGap: '-100%', // 不用堆叠，用控制两个柱状图重叠来实现对撞图堆叠
                    z: '2',
                    // data:[10, 102, 120, 110, 90, 100, 70],
                    itemStyle: {
                        normal: {
                            color: '#ff7200',
                        },
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            color: '#fff',
                        }
                    },
                },
                {
                    name:'群体总数',
                    type:'bar',
                    barWidth: '30%',
                    // stack: '人数',
                    barGap: '-100%', // 不用堆叠，用控制两个柱状图重叠来实现对撞图堆叠
                    z: '1',
                    // data:[590, 620, 520, 510, 580, 460, 570],
                    itemStyle: {
                        normal: {
                            color: '#249dd0',
                        },
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            color: '#249dd0',
                        }
                    },
                }
            ]
        };
        // 请求表格数据
        app.api.ztjc.getJjryCount({
            success: function(result) {
                // console.log(result);
                if (result.success === 0) {
                    app.alert('获取进京人员统计信息失败！');
                    // app.loading.hide(); // 隐藏loading
                    return;
                }
                const msg = result.msg,
                    groupPersonList = msg.countGroupPersonList,
                    jjGroupArray = [], //群体进京人数统计
                    groupArray = [], //群体总数
                    groupNameArray = []; //群体名称
                // 添加群体数据
                for (let i = 0, j = groupPersonList.length; i < j; i++){
                    jjGroupArray.push(groupPersonList[i].counts);
                    groupArray.push(groupPersonList[i].groupSize);
                    groupNameArray.push(app.data(groupPersonList[i].groupName));
                }
                // 添加个人数据
                jjGroupArray.push(msg.noGroupCounts);
                groupArray.push(msg.noGroupCounts);
                groupNameArray.push('涉事个人');

                option_histogram.series[0].data = jjGroupArray;
                option_histogram.series[1].data = groupArray;
                option_histogram.xAxis[0].data = groupNameArray;
                // 设置表格标题
                option_histogram.title.text = `近一周共 ${msg.countAll} 人进京`;

                // 使用刚指定的配置项和数据显示图表。
                histogram.setOption(option_histogram);
            }
        });


        // 初始化饼图----------------------------------------------------------------------------------------------------
        const pie = echarts.init($(that.pageContainer + ' .jrjjrs-content-block .left-pie-chart')[0]);
        // -指定图表的配置项和数据
        const option_pie = {
            color: ['#b3dffd','#9bc9e8','#f39e59','#50e6d3','#f265fb','#ff0000','#fff67e','#749f83','#c4ccd3','#d48265','#abdc00','#bda29a'],
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
                {
                    name: '今日进京人数',
                    type: 'pie',
                    radius : '85%',
                    center: ['50%', '50%'],
                    // data:[
                    //     {value:335, name:'赛罕区'},
                    //     {value:310, name:'玉泉区'},
                    // ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {
                        normal: {
                            position: 'inside',
                            show: true,
                            formatter: '{c}',
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        }
                    }
                }
            ]
        };
        // 请求表格数据
        app.api.ztjc.getJjryTodayCount({
            success: function(result) {
                // console.log(result);
                if (result.success === 0) {
                    app.alert('获取今日进京人员统计信息失败！');
                    // app.loading.hide(); // 隐藏loading
                    return;
                }
                const msg = result.msg,
                    countToBJTodayList = msg.countToBJTodayList,
                    dataArray = [];
                let jrjjrsTbodyTemp = '';
                for (let i = 0, j = countToBJTodayList.length; i < j; i++){
                    dataArray[i] = {};
                    dataArray[i].value = countToBJTodayList[i].counts;
                    dataArray[i].name = countToBJTodayList[i].censusAreaCn;
                    jrjjrsTbodyTemp += `<tr>
                                            <td class="color-${(i)%12 + 1}">${countToBJTodayList[i].censusAreaCn}</td>
                                            <td>${countToBJTodayList[i].counts}</td>
                                        </tr>`;
                }
                option_pie.series[0].data = dataArray;
                // 总数设置
                $(that.pageContainer).find('.jrjjrs-content-block .jjrs-num').text(msg.countTodayAll);
                // 今日人数统计表初始化
                $(that.pageContainer).find('.jrjjrs-content-block .right-table .table-body').empty().append(jrjjrsTbodyTemp);

                // 使用刚指定的配置项和数据显示图表。
                pie.setOption(option_pie);
            }
        });

	},
	download: function(){
		const that = app.ztjc.search,
		startDate = $('.qbxsgl input[name="startDate"]').val(),
		endDate = $('.qbxsgl input[name="endDate"]').val();

		if (app.time.jiaoyan(startDate, endDate) > 0) { //检查开始时间是否小于结束时间
			return;
		}
		// app.loading.show(); // 显示loading
	
	    const param = app.qbxsfx.serializeForm($(that.pageContainer).find('.filter-box form')); // 获取查询所需数据
	    param.pageNo = 1;
		param.pageSize = 10000;
		location.href = app.api.ztjc.exportPeopleEventInfo + $m.serialize(param);
	}
}
