var controller = {
    init: function(){
        amGloable.common.initCalender();
        this.bindGajgjgdm();
        this.bindJtsgwfxw();
        //自动调整图表大小
        this.resizeBar()();

        //绑定事件
        this.findButton();

        //图表
        this.fillAllBars();
    },
    //窗口大小变化事件，自动调整图表大小
    resizeBar: function(chartName, chart){
        var _this = this;
        var charts = this.charts || {};
        if(chartName && chart){
            charts[chartName] = chart;
            _this.charts = charts;
        }
        return function(){
            $(window).resize(function(){
                $.each(_this.charts, function(i, item){
                    item.resize && item.resize();
                });
            });
        }
    },
    //处理机关_公安机关下拉框数据绑定
    bindGajgjgdm: function(){
        var $select1 = $('#select1').empty().append('<option value="">处理机关_公安机关</option>');
        var map = {};
        amGloable.api.codeGxsAll.get("", function(data){
            $.each(data, function(i, item){
                map[item.code] = item.id;
                var key = item.code;
                var value = item.value || item.name;
                $select1.append('<option value="'+key+'">'+value+'</option>');
            });
        });

    },

    //交通事故违法行为下拉框数据绑定
    bindJtsgwfxw: function(){
        var $select1 = $('#select2').empty().append('<option value="">交通违法行为</option>');
        var map = {};
        amGloable.api.codeJtsgwfxwAll.get("", function(data){
            $.each(data, function(i, item){
                map[item.code] = item.id;
                var key = item.code;
                var value = item.value || item.name;
                $select1.append('<option value="'+key+'">'+value+'</option>');
            });
        });

    },

    //绑定查询按钮点击事件
    findButton: function(){
        var _this = this;
        $('#find').click(function(){
            _this.fillAllBars();
        });
    },
    getParams: function(analyzeType){
        var kssj = $('#reservation').val().split(',');
        var _cljg_gajgjgdm = $('#select1').val();
        var _jtwfxwdm = $('#select2').val();

        var opt = {};
      //  opt._type = _type;
        opt.beginTime = kssj[0];
        opt.endTime = kssj[1];

        _cljg_gajgjgdm && (opt.cljg_gajgjgdm = _cljg_gajgjgdm);
        _jtwfxwdm && (opt.jtwfxwdm = _jtwfxwdm);
        analyzeType && (opt.analyzeType = analyzeType);

        return $.param(opt);
    },
    parseData: function(data){
        var x = [], y = [];
        $.each(data, function(i, item){
            var entry = amGloable.tools.toEntry(item);
            x.push(entry.key);
            y.push(entry.value);
        });
        return {x:x,y:y};
    },
    parseCode: function(codeList){
        var map = {};
        $.each(codeList, function(i, item){
            map[item.code] = item.value || item.name;
        });
        return map;
    },
    leijia: function(x, y){
        var map = {};
        $.each(x, function(i, item){
            map[item] = map[item] ? parseInt(map[item]) + parseInt(y[i]) : parseInt(y[i]);
        });
        var x = [], y = [];
        $.each(map, function(_x, _y){
            x.push(_x);
            y.push(_y);
        });
        return {x:x, y:y}
    },
    fillAllBars: function(){
        this.fillSYXZCharts();
        this.fillCLLXCharts();
    },
    //机动车使用性质图
    fillSYXZCharts: function(){
        var _this = this;
        $.when(
            amGloable.api.codeJdcsyxzAll.getAjax(""),
            amGloable.api.SheAnCheLiang.getAjax(_this.getParams("jdcsyxzdm"))
        ).done(function(jqXHR1, jqXHR2){
            var ret1 = $.parseJSON(jqXHR1[2].responseText);
            var ret2 = $.parseJSON(jqXHR2[2].responseText); ret2 = _this.parseData(ret2.data);

            var codeList = _this.parseCode(ret1);
            ret2 = _this.leijia(ret2.x, ret2.y);
            var _x = [];
            $.each(ret2.x, function(i, item){
                _x.push(codeList[item] || "其他");
            });
            _this.leftCharts(_x, ret2.y, "jdcsyxzdm");
        });
    },
    //交通违法车辆类型图
    fillCLLXCharts: function(){
        var _this = this;
        $.when(
            amGloable.api.codeCllxAll.getAjax(""),
            amGloable.api.SheAnCheLiang.getAjax(_this.getParams("jtwfcllxdm"))
        ).done(function(jqXHR1, jqXHR2){
            var ret1 = $.parseJSON(jqXHR1[2].responseText);
            var ret2 = $.parseJSON(jqXHR2[2].responseText); ret2 = _this.parseData(ret2.data);

            var codeList = _this.parseCode(ret1);
            ret2 = _this.leijia(ret2.x, ret2.y);
            var _x = [];
            $.each(ret2.x, function(i, item){
                _x.push(codeList[item] || "其他");
            });

            _this.leftCharts(_x, ret2.y, "jtwfcllxdm");
        });
    },
    sort: function(x, y){
        var map = {};
        var _x=[],_y=[];
        for(var i in x) {
            _x.push(x[i]);
            map[x[i]] = y[i]
        }
        _x = _x.sort(function(a, b){return a.localeCompare(b);});
        x = []; y = [];
        for(var i in _x){
            x.push(_x[i]);
            y.push(map[_x[i]]);
        }
        return {x:x,y:y};
    },
    leftCharts: function(x,y, chartsDiv){
        var charts = echarts.init(document.getElementById(chartsDiv));
        this.resizeBar(chartsDiv, charts);//将图表添加到数组，方便统一resize
        charts.setOption({
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '2%',
                right: '2%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data:x,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'人数',
                    type:'bar',
                    barWidth: '60%',
                    data:y
                }
            ]
        });
    },
    rightCharts: function(x,y, chartsDiv){
        var charts = echarts.init(document.getElementById(chartsDiv));
        this.resizeBar(chartsDiv, charts);
        charts.setOption({
            color: ['#7CCD7C'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '2%',
                right: '2%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'value',
                    position: 'top',
                    splitLine: {show: false},
                    axisLine: {show: false},
                    axisTick: {show: false},
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    data:x,
                    axisLine: {show: false},
                    axisTick: {show: false},
                    axisLabel: {interval: 0},
                }
            ],
            series : [
                {
                    name:'人数',
                    type:'bar',
                    barWidth: '60%',
                    data:y
                }
            ]
        });
    },
    //发案部位
    getFabwData: function(){}

};

$(function(){
    controller.init();
});