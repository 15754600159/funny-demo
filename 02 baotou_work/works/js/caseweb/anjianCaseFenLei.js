var controller = {
    charts: [],//页面所有图表的集合
    init: function(){
        amGloable.common.initCalender();
        this.ajlball();
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




    //获取所有案件类别
    ajlball:function(){
        amGloable.api.codeAjlbAll.get("", function (data) {
            sdCfg.ajlb = data;
        })
    },
    //案件类别码表
    getAjlb : function(code){
        for(var v=0;v<sdCfg.ajlb.length;v++){
            if(("" + code) == sdCfg.ajlb[v].code){
                return sdCfg.ajlb[v].name;
            }
        }
        return "其他";
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
    bindAjlb: function(){
        //三级案件类别下拉框
        var $select1 = $('#ajlb1').empty().append('<option value="">一级案件类别</option>');
        var $select2 = $('#ajlb2');
        var $select3 = $('#ajlb3');
        var map1 = {}, map2 = {};//保存一级，二级code和id的映射
        amGloable.api.codeAjlbList1.get("", function(data){
            $.each(data, function(i, item){
                var code = item.code;
                var value = item.value || item.name;
                map1[code] = item.id;
                $select1.append('<option value="'+code+'">'+value+'</option>');
            });
        });
        $select1.change(function(){
            var id = map1[this.value];//根据code获取到一级的id
            amGloable.api.codeAjlbList2.get("code=" + id, function(data){
                $select2.empty().append('<option value="">二级案件类别</option>');
                $.each(data, function(i, item){
                    var code = item.code;
                    var value = item.value || item.name;
                    map2[code] = item.id;
                    $select2.append('<option value="'+code+'">'+value+'</option>');
                });
                $select2.change();
            });
        });
        $select2.change(function(){
            var id = map2[this.value];//根据code获取二级的id
            amGloable.api.codeAjlbList2.get("code=" + id, function(data){
                $select3.empty().append('<option value="">三级案件类别</option>');
                $.each(data, function(i, item){
                    var code = item.code;
                    var value = item.value || item.name;
                    $select3.append('<option value="'+code+'">'+value+'</option>');
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
        return $.param(opt);
    },
    parseData: function(data){
        var x = [], y = [];
        $.each(data, function(i, item){
            var entry = amGloable.tools.toEntry(item);
            x.push(controller.getAjlb(entry.key));
            y.push(entry.value);
        });
        return {x:x,y:y};
    },
    fillAllBars: function(){
        var analyzeTypeList = [
            {"type":"ajlb","div":"ajfl"},
        ];
        for(var i in analyzeTypeList){
            var analyzeType = analyzeTypeList[i];
            this.fillCharts(analyzeType.type, analyzeType.div);
        }
    },
    //根据分析类型获取图表数据
    getAnalyzeData: function(analyzeType, callback){
        var _this = this;
        console.log(this.getParams(analyzeType));
        amGloable.api.anjianFenLei.get(this.getParams(analyzeType), function(rs){
            var ret = _this.parseData(rs.data);
            callback && callback(ret.x, ret.y);
            // _this.fillCharts(analyzeType, ret.x,ret.y);
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
    fillCharts: function(analyzeType, chartsDiv){
        var _this = this;

        this.getAnalyzeData(analyzeType, function(x, y){
            //排序
            var ret = _this.sort(x, y);
            _this.leftCharts(ret.x, ret.y, chartsDiv);
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
    //发案部位
    getFabwData: function(){}

};

var sdCfg ={ ajlb:[] };

$(function(){
    controller.init();
});