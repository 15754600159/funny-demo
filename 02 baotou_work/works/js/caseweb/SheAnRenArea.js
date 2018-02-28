var controller = {
    init: function(){
        amGloable.common.initCalender();
        this.bindPcsFj();
        //this.bindAjlb();
		amGloable.common.initLdaj($('#ajlb1'),$('#ajlb2'),$('#ajlb3'));
        //绑定事件
        this.bindFindButton();
        //窗口大小更改事件
        this.resizeCharts();

        this.getData();
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
    parseData: function(data){
        var x = [], y = [];
        $.each(data, function(i, item){
            var entry = amGloable.tools.toEntry(item);
            x.push(entry.key);
            y.push(entry.value);
        });
        return {x:x,y:y};
    },
    getData: function(){
        var _this = this;
        console.log("参数："+_this.getParams());
        $.when(
            amGloable.api.SheAnRenDiYu.getAjax(_this.getParams()),
            amGloable.api.codeJgAll1.getAjax("")
        ).done(function(ret1, ret2){
            //数据
            var data1 = $.parseJSON(ret1[2].responseText); data1 = data1.data || data1;
            //码表
            var data2 = $.parseJSON(ret2[2].responseText); data2 = data2.data || data2;
            var mydata = controller.parseData(data1);
            var ret = controller.code.jgCode(data2, mydata.x,mydata.y );

            _this.fillCharts(ret.x, ret.y);
        });
    },
    getParams: function(){
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


        opt.analyzeType = "jgdm_sf";

        return $.param(opt);
    },
    bindFindButton: function(){
        var _this = this;
        $('#find').click(function(){
            _this.getData();
        });
    },
    fillCharts: function(x,y){
        var charts = echarts.init(document.getElementById("userLiveness"));
        this.charts.push(charts);//将图表添加到resize数组
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
    charts: [],
    //窗口大小更改
    resizeCharts: function(){
        var _this = this;
        $(window).on("resize", function(){
            $.each(_this.charts, function(i, item){
                item.resize && item.resize();
            });
        });
    }
};


//添加码表解析的方法
controller.code = {
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