var controller = {
    charts: [],//页面所有图表的集合
    init: function(){
        amGloable.common.initCalender();
        this.bindPcsFj();
        //this.bindAjlb();
		amGloable.common.initLdaj($('#ajlb1'),$('#ajlb2'),$('#ajlb3'));
        //自动调整图表大小
        this.resizeBar();

        //绑定事件
        this.findButton();

        //图表
        this.fillAllBars();
    },
    //窗口大小变化事件，自动调整图表大小
    resizeBar: function(){
        var _this = this;
        $(window).resize(function(){
            $.each(_this.charts, function(i, item){
                item.resize && item.resize();
            });
        });
    },
    //所属分局和所属派出所下拉框
    bindPcsFj: function(){
        //案件所属分局下拉框数据绑定
        var $select1 = $('#ajssfj_dm').empty().append('<option value="">案件所属分局</option>');
        var $select2 = $('#ajsspcs_dm');
        var map = {};
        amGloable.api.codeAjssfj.get("", function(data){
            $.each(data, function(i, item){
                map[item.code] = item.id;
                var key = item.code;
                var value = item.value || item.name;
                $select1.append('<option value="'+key+'">'+value+'</option>');
            });
        });
        //分局onchange事件
        $select1.change(function(){
            $select2.empty().append('<option value="">案件所属派出所</option>');
            amGloable.api.codeAjsspcs.get("code="+map[this.value], function(data){
                $.each(data, function(i, item){
                    var key = item.code;
                    var value = item.value || item.name;
                    $select2.append('<option value="'+key+'">'+value+'</option>');
                });
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
        var _ajssfj_dm = $('#ajssfj_dm').val();
        var _ajsspcs_dm = $('#ajsspcs_dm').val();
        var _ajlb_dm1 = $('#ajlb1').val();
        var _ajlb_dm2 = $('#ajlb2').val();
        var _ajlb_dm = $('#ajlb3').val();

        var opt = {};
        opt._type = _type;
        opt.beginTime = kssj[0];
        opt.endTime = kssj[1];

        _ajssfj_dm && (opt.ajssfj_dm = _ajssfj_dm);
        _ajsspcs_dm && (opt.ajsspcs_dm = _ajsspcs_dm);
        _ajlb_dm1 && (opt.ajlb_dm1 = _ajlb_dm1);
        _ajlb_dm2 && (opt.ajlb_dm2 = _ajlb_dm2);
        _ajlb_dm && (opt.ajlb_dm = _ajlb_dm);
        opt.analyzeType = analyzeType;
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
    //根据分析类型获取图表数据
    getAnalyzeData: function(codeAjax, analyzeType, callback){
        var _this = this;
        if(codeAjax){
            $.when(
                codeAjax,
                amGloable.api.anjianSheAnRen.getAjax(_this.getParams(analyzeType))
            ).done(function(jqXHR1, jqXHR2){
                var ret1 = $.parseJSON(jqXHR1[2].responseText); ret1 = ret1;
                var ret2 = $.parseJSON(jqXHR2[2].responseText); ret2 = _this.parseData(ret2.data);
                callback && callback(ret1, ret2);
            });
        } else {
            amGloable.api.anjianSheAnRen.get(this.getParams(analyzeType), function(rs){
                var ret = _this.parseData(rs.data);
                callback && callback(ret.x, ret.y);
            });
        }
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
    fillAllBars: function(){
        this.fillNlCharts();
        this.fillXbCharts();
        this.fillJgCharts();
        this.fillMzCharts();
        this.fillXlCharts();
        this.fillZylbCharts();
        this.fillZdryxlCharts();
    },
    //年龄图
    fillNlCharts: function(){
        var _this = this;
        this.getAnalyzeData(null, "nl", function(x, y){
            var ret = controller.code.nldCode(x, y); ret = _this.sort(ret.x,ret.y);
            _this.rightCharts(ret.x, ret.y, "nl");
        });
    },
    //性别图
    fillXbCharts: function(){
        var _this = this;
        this.getAnalyzeData(null, "xbdm", function(x, y){
            var ret = controller.code.sexCode(x, y);
            _this.sexCharts(ret.x, ret.y);
        });
    },
    //籍贯图
    fillJgCharts: function(){
        var _this = this;
        this.getAnalyzeData(amGloable.api.codeJgAll1.getAjax(""),"jgdm_sf", function(ret1, ret2){
            var ret = controller.code.jgCode(ret1, ret2.x, ret2.y);
            _this.leftCharts(ret.x, ret.y, "jg");
        });
    },
    //民族图
    fillMzCharts: function(){
        var _this = this;
        this.getAnalyzeData(amGloable.api.codeMzAll.getAjax(""),"mzdm", function(ret1, ret2){
            var ret = controller.code.commonCode(ret1, ret2.x, ret2.y);
            _this.leftCharts(ret.x, ret.y, "mzdm");
        });
    },
    //学历图
    fillXlCharts: function(){
        var _this = this;
        this.getAnalyzeData(amGloable.api.codeWhcdAll.getAjax(""),"xldm", function(ret1, ret2){
            var ret = controller.code.commonCode(ret1, ret2.x, ret2.y);
            _this.leftCharts(ret.x, ret.y, "xldm");
        });
    },
    //职业类别图
    fillZylbCharts: function(){
        var _this = this;
        this.getAnalyzeData(amGloable.api.codeZylbAll.getAjax(""),"zylbdm", function(ret1, ret2){
            var ret = controller.code.commonCode(ret1, ret2.x, ret2.y);
            _this.leftCharts(ret.x, ret.y, "zylbdm");
        });
    },
    //重点人员细类图
    fillZdryxlCharts: function(){
        var _this = this;
        this.getAnalyzeData(amGloable.api.codeZdryxlAll.getAjax(""),"zdryxl", function(ret1, ret2){
            var ret = controller.code.commonCode(ret1, ret2.x, ret2.y);
            _this.leftCharts(ret.x, ret.y, "zdryxl");
        });
    },
    //左边的柱状图
    leftCharts: function(x,y, chartsDiv){
        var charts = echarts.init(document.getElementById(chartsDiv));
        this.charts.push(charts);//将图表添加到数组，方便统一resize
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
        this.charts.push(charts);
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
    sexCharts: function(x, y){//性别
        var mySex = echarts.init(document.getElementById('xbdm'));
        this.charts.push(mySex);
        var option = {
            color:['#00c6dd', '#698B69', 'red'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:x
            },
            series: [
                {
                    name:'人数',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:y
                }
            ]
        };
        mySex.setOption(option);

    }
};

//添加码表解析的方法
controller.code = {
    sexCode: function(x, y){
        var _this = this;
        var map = {};
        $.each(x, function(i, item){
            var name = _this.sex(item);
            map[name] = map[name] ? (parseInt(map[name]) + parseInt(y[i])) : parseInt(y[i]);
        });
        x = [], y = [];
        for(var i in map){
            x.push(i);
            y.push({name:i, value:map[i]});
        }
        return {x:x, y:y};
    },
    sex: function(code){
        if(code == "1")
            return "男";
        else if(code == "2")
            return "女";
        return "未知";
    },
    //根据年龄计算年龄段
    nldCode: function(x, y){
        var _this = this;
        var map = {};
        $.each(x, function(i, item){
            var name = _this.nld(item);
            map[name] = map[name] ? (parseInt(map[name]) + parseInt(y[i])) : parseInt(y[i]);
        });
        x = [], y = [];
        for(var i in map){
            x.push(i);
            y.push(map[i]);
        }
        return {x:x, y:y};
    },
    nld :function(age){
        var min = 20,max = 60, increment = 10;
        for(var i = min;i<=max; i+=increment){
            if(age < min)
                return min+" 以下";
            if(age < i){
                return (i-increment) +"-"+i;
            }
        }
        return max+" 以上";
    },
    jgCode: function(codeList, _x, _y){
        var x = [];
        $.each(_x, function(i, item){
            x.push(item + "0000");
        });
        return this.commonCode(codeList, x, _y);
    },
    commonCode: function(codeList, _x, _y){
        var x = [], y = [];
        var codes = {};
        $.each(codeList, function(i, item){
            codes[item.code] = (item.name || item.value);
        });

        var map = {};
        $.each(_x, function(i, item){
            var name = codes[item] || "未知";
            map[name] = map[name] ? parseInt(map[name]) + parseInt(_y[i]) : parseInt(_y[i]);
        });
        for(var i in map){
            x.push(i);
            y.push(map[i]);
        }
        return {x:x, y:y};
    }
};

$(function(){
    controller.init();
});