define(function (require, exports, module) {
    var graphModule_control = new (require('core/common/graphchart/graphchart'))(),
        //baidu
		mapModule_ = require('core/common/mapchart/baidu/mapchart'),
		//pgis
		//mapModule_ = new (require('core/common/mapchart/pgis/mapchart'))(),
        map = null,
        graph = null;
    var url = mining.baseurl.gongan,
    applyObj;
    var $page;
    var drawingManager;
    var requestUrl = {
        circle: mining.baseurl.core + '/map/searchCircle', //vertexGeo: JSON.stringify({lat,lng,radius}),labels
        buffer: mining.baseurl.core + '/map/searchBuffer',  //vertexGeo: JSON.stringify({bufferRadius, points:[{lat, lng}]}),labels
        upload:mining.baseurl.host+':18080/sjz/gongan/control/batch/upload'//mining.baseurl.gongan+'/control/batch/upload'
    };
    var mapColor=['#7399f9','#7daffa','#c592ff','#54c8ac','#28bdbb','#05b1c7','#a3e167','#eb5352','#fe9f5a','#fbc76a'];
    var graphstr,datalist; var   userId = mining.userinfo.user_id;
    function create(isBatch,fun,id) {
        var $dlg = $dialog({
            title: false,
            width: 500, height: 460,
            padding: 0,
            content: '<div class="createcontrol">' +
            ' <div class="titlebar"> <ul> <li  class="active">1.基本信息</li><li class="row-single">2.布控预设</li></ul> <button class="close"><span class="icon icon-delete3"></span></button> </div> ' +
            '<div class="step1">' +
            '<div class="in-row required"><span class="lbl">布控类型</span><select name="" class="select-model item"  ><option value="1">公有布控</option><option value="2">私有布控</option></select></div>' +
            '<div class="in-row required"><span class="lbl">管控单位</span><select name="" class="select-unit item"  ></select></div>' +
            '<div class="in-row required"><span class="lbl">布控种类</span><select name="" class="select-type item"></select> </div>' +
            '<div class="in-row required"><span class="lbl">布控时间</span><input type="text" class="item date" value=""  readonly="readonly"></div>' +
            '<div class="in-row required model-common"><span class="lbl">警讯通报人</span><select name="" class="select-notice item"  multiple="multiple" placeholder="选择警讯通报人"></select> </div>' +
            '<div class="in-row required model-common"><span class="lbl">短信报警人</span><select name="" class="select-message item" multiple placeholder="选择短信报警人"></select> </div>' +
            '<div class="in-row"><span class="lbl" style="vertical-align: top;">布控原因</span><textarea class="item" name="" id="control-reason" maxlength="200" rows="5" placeholder="输入200字以内"></textarea> </div>' +
            '<div class="in-row row-batch hide"><span class="lbl" style="vertical-align: top;">布控目标</span><button  class="btn">名单上传</button>'+
            '<form class="uploadfj" onsubmit="return false;" enctype="multipart/form-data">'+
            '<input type="hidden" name="applicantId" value="' + userId+ '">'+
            '<input type="file" name="file" class="file">'+
            '</form>'+
            '<span class="file-desc"></span> <span class="filetip">?</span> <input type="hidden" name="name"><div class="btnbar"><button class="btn" id="btnBatchSubmit">申请布控</button></div></div>'+
            '<div class="btnbar row-single"><button class="btn-next btn">下一步</button></div> </div> ' +
            '<div class="step2 hide"><ul class="numberlist shadow"><li><span  class="lbl">布控类型</span> <select class="item select-num" style="    width: 150px"></select>' +
            '<select class="item select-car-type hide" style="margin: 0 3px"><option value="1">大型车</option><option value="2">小型车</option></select> <input type="text" class="in-number item" placeholder="请输入要布控的号码" style="    width: 65%;    margin-right: 5px;"/> ' +
            ' <button class="list-add btn"><span class="icon icon-add"></span> 添加</button> </li></ul>' +
            '<div class="controlgraph"><div class="graph shadow" id="graphChart"></div><div class="controlhistory "></div>' +
            '<div class="controlmap "><div id="mapChart"></div> ' +
            '<div class="mapbar"><button class="circlesearch"><span class="icon icon-radiussearch"></span></button>'+
         /*   '<button class="pathsearch"> <span class="icon icon-route"></span></button> <button class="formatpath"><span class="icon icon-trajectory"></span></button>' +*/
            //'<input class="item" style="padding-right: 20px"> <span class="icon icon-search2" style="    position: relative;left: -20px;"></span> <span class="arrow">&gt;&gt;</span></div> ' +
            '<span class="arrow">&gt;&gt;</span></div> ' +
            '<div class="mapinfo"> <ul></ul></div></div>' +
            '<div class="node-event hide" id="graphMenu"><button class=" btn-extend"><span></span> 扩展</button><button class="btn-del"><span class="icon icon-delete4"></span> 删除</button></div> '+
            '<div class="number-info shadow"><div class="info-main"><label>主布控<span></span></label><ul id="sortable1" class="droptrue"></ul></div>' +
            '<div class="info-list"><label >辅布控 <span id="list-count"></span></label> <ul id="sortable2" class="droptrue"></div>' +
            ' </div></div>' +
            '<div class="btnbar"><button class="btn-prev btn" style="margin-right: 10px;">上一步</button><button class="btn" id="btnSubmit">申请布控</button></div></div> ' +
            '</div>',
            onshow: function () {
                $page = $(this.node);
                iniSelect();
                getTarget();
                if(isBatch){
                    $('.row-batch',$page).removeClass('hide');
                    $('.row-single',$page).addClass('hide');
                }
                $('.date', $page).daterangepicker({
                    opens: 'left',
                    format: 'YYYY-MM-DD HH:mm:ss',
                    timePicker: true,
                    timePicker12Hour:false,
                    timePickerSeconds:true,
                    autoUpdateInput:true,
                    applyClass: 'btn-primary',
                    clearClass: 'btn-primary',

                    timePickerIncrement: 1
                    //showDropdowns: true
                    
                }, function(start, end, label, action) {
                    console.log(start);
                    console.log(end);
                    if( $(event.target).hasClass('clearBtn')){
                        $('.date',$page).val('');
                    }
                  
                }).on("show.daterangepicker", function() {

                    console.log("open date range");
                });
                $('.filetip',$page).popover({
                    trigger:'hover',
                    placement:'top',
                    html:true,
                    content:function(){
                        var text ='211421989080846240'+
                            '<br>110132199602146666'+
                            '<br>310132199202149996';
                       
                        return text;
                    }
                });
                $('.btn-prev', $page).on('click', function (){
                    $('.step1', $page).removeClass('hide');
                    $('.step2', $page).addClass('hide');
                    $dlg.width(500);
                    $dlg.height(460);
                    $('.titlebar .active2', $page).removeClass('active2').siblings().addClass('active');
                    $('.btn-next', $page).attr('isprev',true);
                });
                $('form.uploadfj [name=file]',$page).off('change').on('change', function(){
                    var $this = $(this), $form = $this.parents('form:first'),
                        path = $this.val(),
                        name = path.substr(path.lastIndexOf('\\')+1, path.length);

                    if(mining.utils.isEmpty(path)) return;
                    $('[name=name]',$page).val(name);
                    $('.file-desc',$page).html(name);
                    $ajax.ajaxSubmit($this.parent(),{
                        url: requestUrl.upload,
                        success: function(result){
                           $('[name=name]',$page).data('number',result.listObj);
                           $('.file-desc',$page).attr('title',result.listObj.join(','));
                            $('#btnBatchSubmit',$page).removeAttr('disabled');
                        },
                        error: function(result){
                            $dialog.alert('上传身份证号格式有错误');
                            $('#btnBatchSubmit',$page).attr('disabled','disabled');
                            $('.file-desc',$page).removeAttr('title');
                        }
                    });
                });

                $('.btn-next', $page).on('click', function () {
                    if($('.date',$page).val()==''){
                        $dialog.alert('请选择布控时间','warning');
                        return;
                    }
                    if($('select.select-model',$page).val()=='1'){
                        if($('select.select-notice', $page).val()==null){$dialog.alert('警讯通报人不能为空','warning');return;}
                        if($('select.select-message', $page).val()==null){$dialog.alert('短信报警人不能为空','warning');return;}
                    }
                    $('.step1', $page).addClass('hide');
                    $('.step2', $page).removeClass('hide');
                    $('.titlebar .active', $page).removeClass('active').siblings().addClass('active2');
                    $dlg.width(1200);
                    $dlg.height(650);
                    if(!$(this).attr('isprev')){
                        graph = null;
                        if(graphstr){setGraph(graphstr,$page,true,datalist);}
                    }
                    drop();
                    //基本信息参数赋值
                    var start="",end="",date=$('.date',$page).val();
                    if(date.length>0){
                        start=  date.split(' 至 ')[0];
                        end=date.split(' 至 ')[1];
                    }
                   /* applyObj = 'applicantId=' + mining.userinfo.user_id + '&controlTypeId=' + $('select.select-type', $page).val() + '&controlModeId='
                        +$('select.select-model',$page).val()+ '&controlUnitId=' + $('select.select-unit', $page).val()
                        + '&startTime=' + start + '&endTime=' + end;
                    if($('select.select-model',$page).val()=='1'){
                        applyObj += '&jxtbrId=' + $('select.select-notice', $page).val().join(',');
                        applyObj += '&dxtbrId=' + $('select.select-message', $page).val().join(','); 
                    }
                    applyObj += '&controlReason=' + $('#control-reason').val();*/
                    applyObj={'applicantId':mining.userinfo.user_id ,
                    'controlTypeId':$('select.select-type', $page).val() ,
                    'controlModeId':$('select.select-model',$page).val(),
                    'controlUnitId':$('select.select-unit', $page).val(),
                    'startTime':start,
                    'endTime':end,
                    'controlReason': $('#control-reason').val()
                    }
                    if($('select.select-model',$page).val()=='1'){
                        applyObj['jxtbrId']=  $('select.select-notice', $page).val().join(',');
                        applyObj['dxtbrId'] =$('select.select-message', $page).val().join(','); 
                    }else {
                        applyObj['jxtbrId']= mining.userinfo.user_id;
                        applyObj['dxtbrId']=mining.userinfo.user_id;
                    }
                    try{ iniMap($page);}
                    catch(e){}
                });
                $('#btnBatchSubmit',$page).on('click',function(){
                     if($('.date',$page).val()==''){
                        $dialog.alert('请选择布控时间','warning');
                        return;
                    }
                    if($('select.select-model',$page).val()=='1'){
                        if($('select.select-notice', $page).val()==null){$dialog.alert('警讯通报人不能为空','warning');return;}
                        if($('select.select-message', $page).val()==null){$dialog.alert('短信报警人不能为空','warning');return;}
                    }
                    if(!$('[name=name]',$page).data('number')){
                        $dialog.alert('没有上传文件','warning');return;
                    }
                    var btn=$(this);
                    btn.attr('disabled','disabled');
                    var start="",end="",date=$('.date',$page).val();
                    if(date.length>0){
                        start=  date.split(' 至 ')[0];
                        end=date.split(' 至 ')[1];
                    }
                    applyObj = 'applicantId=' + mining.userinfo.user_id + '&controlTypeId=' + $('select.select-type', $page).val() + '&controlModeId='
                        +$('select.select-model',$page).val()+ '&controlUnitId=' + $('select.select-unit', $page).val()
                        + '&startTime=' + start + '&endTime=' + end;
                    if($('select.select-model',$page).val()=='1'){
                        applyObj += '&jxtbrId=' + $('select.select-notice', $page).val().join(',');
                        applyObj += '&dxtbrId=' + $('select.select-message', $page).val().join(','); 
                    }
                    else {
                        applyObj += '&jxtbrId=' + mining.userinfo.user_id;
                        applyObj += '&dxtbrId=' + mining.userinfo.user_id;
                    }
                    applyObj += '&controlReason=' + $('#control-reason').val();
                    applyObj+='&sfzhList='+$('[name=name]',$page).data('number').join(',');

                    $ajax.ajax({
                        url: url+'/control/batch/apply',
                        type: 'post',
                        data: applyObj,
                        success: function (result) {
                            if (result.statusCode == 200) {
                                $dialog.alert("保存成功",'success', function () {
                                    btn.removeAttr('disabled');
                                    $dlg.close();
                                    fun&&fun();
                                 });
                             }
                         },
                         error: function (e) {
                         $dialog.alert("保存失败",'error');
                            btn.removeAttr('disabled');
                        }
                    });
                     mining.utils.serverLog(511);
                });
                $('#btnSubmit', $page).on('click', function () {
                    if(graph==null) {    $dialog.alert("布控目标不能为空");return;}
                    $(this).attr('disabled','disabled');
                    var getSelectVals = function (selects) {
                        var vals = [];
                        $.each(selects, function (k, v) {
                            vals.push($(v).val());
                        });
                        return vals.join(',');
                    };

                    var items = [];
                    $.each($('.info-main li'), function (k, o) {
                        var obj=$(o);
                        items.push({
                            targetId:obj.attr('targetId'), 	//	布控目标类型Id，人、车、手机号
                            number: obj.attr('key'),	//	布控目标号码，身份证号、车牌号等
                            methodId: getSelectVals(obj.find('select.select')),// $(o).find('select.select').val(),	//	布控方式Id，卡口、违章等
                            isMainControl: 1,	//	是否为主布控（0：辅布控，1：主布控）
                            remark: ''	,	// 	备注
                            area:{type:'circle',color: obj.attr('color'),circle:{point:{lng: obj.attr('lng'),lat:obj.attr('lat')},radius:obj.attr('radius')}},
                            level:obj.attr('level')
                        });
                    });
                    $.each($('.info-list li'), function (k, o) {
                        var obj=$(o);
                        items.push({
                            targetId: $(o).attr('targetId'), 	//	布控目标类型Id，人、车、手机号
                            number: obj.attr('key'),	//	布控目标号码，身份证号、车牌号等
                            methodId: getSelectVals($(o).find('select.select')),	//	布控方式Id，卡口、违章等
                            isMainControl: 0,	//	是否为主布控（0：辅布控，1：主布控）
                            remark: ''	,	// 	备注
                            area:{type:'circle',color: obj.attr('color'),circle:{point:{lng: obj.attr('lng'),lat:obj.attr('lat')},radius:obj.attr('radius')}},
                            level:obj.attr('level')
                        });
                    });
                    var item='&itemsGraph=' + JSON.stringify(graph.json().elements)+'&items=' + JSON.stringify(items);
                    var parm=$.extend(applyObj,{
                            itemsGraph:JSON.stringify(graph.json().elements),
                            items:JSON.stringify(items)
                        }) ;
                    console.log(parm);
                    var btn=$(this);
                    var submitUrl=url + '/control/apply';
                  
                    $ajax.ajax({
                        url: submitUrl,
                        type: 'post',
                        data: parm,
                        success: function (result) {
                            if (result.statusCode == 200) {
                                $dialog.alert("保存成功",'success', function () {
                                    btn.removeAttr('disabled');
                                    $dlg.close();
                                    fun&&fun();
                        });
                        }
                    },
                    error: function (e) {
                        $dialog.alert("保存失败",'error');
                            btn.removeAttr('disabled');
                        }
                    });
                    mining.utils.serverLog(517);
                });
                $('.select-num',$page).off('change').on('change',function(){
                        var tVal=$('select.select-num',$page).val();
                        if(tVal=="2"){
                           $('.select-car-type',$page).removeClass('hide');
                            $('.in-number',$page).css('width','57%'); 
                        }else{
                            $('.select-car-type',$page).addClass('hide');
                            $('.in-number',$page).css('width','65%');
                        }
                });
                $('.select-model',$page).off('change').on('change',function(){
                    var tVal=$('select.select-model',$page).val();
                    if(tVal=="1"){
                       $('.model-common',$page).removeClass('hide');
                    }else{
                        $('.model-common',$page).addClass('hide');
                    }
                     mining.utils.serverLog(512,$("select.select-model option:selected", $page).text());
                });
                $('.list-add', $page).on('click', function () {
                  add($page);
                });
                $('.in-number',$page).on('keydown',function(e){
                    var ev = window.event||e;
                    if(ev.keyCode==13) {
                        add($page);
                    }
                });
                $('.number-info', $page).on('change','.select',function () {
                    var item = $(this);
                    var oldVal=item.attr('val');
                    var data=item.parents('li').data('select_data');
                    $.each(data,function (k,v) {
                        if(oldVal==v.id){
                            item.siblings('select').append('<option value="'+v.id+'" >'+v.text+'</option>');
                            return;
                        }
                    });
                   item.siblings('select').find(' option[value='+this.value+']').remove();
                    item.attr('val',this.value);
                });
                $('.number-info', $page).on('click', '.list-btnadd', function () {
                    var item = $(this);
                    var data=item.parents('li').data('select_data');
                    var option=[],id;
                    $.each(data,function (k,v) {
                        if(item.parent().prev().find('select option:selected').text().indexOf(v.text)==-1){
                            if(option.length==0) id=v.id;
                            option.push('<option value="'+v.id+'" >'+v.text+'</option>');
                        }
                    });
                    if(option.length>0){
                        item.parent().prev().find('select option[value='+id+']').remove()
                        var select = $('<select class="select" val="'+id+'">'+option.join('')+'</select>');
                        item.parent().prev().append(select);
                        item.parent().append($('<div class="list-selectdel" style="  margin-top: 8px;"><span class="icon icon-delete2 "></span></div>'));
                    }
                    mining.utils.serverLog(514);
                    //select.select2({minimumResultsForSearch: Infinity});
                });
                $('.number-info', $page).on('click', '.list-selectdel', function () {
                    var index=$(this).index();
                    var select=$(this).parent().prev().children().eq(index);
                    var options=select.find('option');
                   
                    $.each(select.siblings(),function(m,n){
                        $.each(options,function(k,o){ 
                            if($(n).find('option[value='+o.value+']').length==0)
                                $(n).append($(o));
                        });
                       $(n).val($(n).attr('val'));
                    });
                    select.remove();
                     $(this).remove();
                });
                $('.number-info', $page).on('click', '.list-btndel', function () {
                    var item = $(this).parent().parent();
                    var gid=item.attr('gid');
                    graph.$(':selected').unselect();
                    graph.$('#'+gid).select();
                    delNode(gid);
                    $('.controlhistory',$page).html('');
                    item.remove();
                    mining.utils.serverLog(516);
                });
                $('.btn-extend', $page).on('click', function () {
                    extendNode();
                     mining.utils.serverLog(513,'扩展');
                });
                $('.btn-del', $page).on('click', function () {
                    delNode();
                    $('.controlhistory',$page).html('');
                     mining.utils.serverLog(513,'删除');
                });
                $('.number-info', $page).on('click', '.btnmap', function () {
                   /* showMap($page);
                    var parent=$(this).parents('li');
                    $('.number-info li').removeClass('active');
                    parent.addClass('active');
                    var color=$(this).parents('li').attr('color');
                    if(!color){
                        $(this).parents('li').attr('color',mapColor[Math.floor(Math.random()*10)]);
                    }
                    g_FillColor = $(this).parents('li').attr('color');

                    if(parent.attr('lng')){
                        setMapCenter(parent.attr('lng'),parent.attr('lat'));
                    }
                    mining.utils.serverLog(515);*/
                });
                $('.mapbar .arrow', $page).on('click', function () {
                    $('.controlmap', $page).animate({width: '1px'}, 1000).addClass('hide');
                });
                //半径搜索
                $('.circlesearch', $page).off('click').on('click', function (e) {
                    $(this).addClass('active').siblings().removeClass('active');
                    g_LineColor = '#aaa';
                    map.changeDragMode("drawCircle", null, null, complete);
                });
                //路径搜索
                $('.pathsearch', $page).off('click').on('click', function (e) {
                    $(this).addClass('active').siblings().removeClass('active');

                });

                //轨迹拟合
                $('.formatpath', $page).off('click').on('click', function (e) {
                    $(this).addClass('active').siblings().removeClass('active');
                });

                $('.close', $page).on('click', function () {
                    $dlg.close();
                });
                if(id){
                    iniForm(id);
                }else {
                     graphstr='',datalist='';
                    setSelect();
                }
            },
            onclose: function(){
                this.remove();
            }
        }).showModal();

        function add($page){
            var val = $('.in-number', $page).val().trim();
            if (val == '') {
                $dialog.alert('请输入布控号码','warning');
                return
            }
            var reg1=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,reg2=/^[\u4E00-\u9FA5][a-zA-Z]{1}[a-zA-Z_0-9]{5}$/;
            var tVal=$('select.select-num',$page).val();
            if(tVal=="1"&&!reg1.test(val)){
                $dialog.alert('请输入正确的身份证号码','warning');
                return
            }
            if(tVal=="2"&&!reg2.test(val)){
                $dialog.alert('请输入正确的车牌号码','warning');
                return
            }
            var getVertex=function(val){
                $ajax.ajax({
                url: mining.baseurl.core + '/query/getVertexByIndex',
                data: {
                    value: val,
                    index: 'key'
                },
                success: function (data) {
                    if(data.v&&data.v.length>0){
                        var nodedata = {v: data.v, e: []}
                        graphModule_control.appenddata(nodedata);
                        var gid=nodedata.v[0].gid;
                        graph.$('#' +gid ).addClass('red');
                        addMain(gid);
                        graph.nodes(':selected').unselect();
                        graph.$('#'+gid).select();
                        extendNode();
                    }else {
                        $dialog.alert('没有搜索到相关信息','warning');
                        return;
                    }

                },
                error: function (data) {
                    //   mining.utils.alertMsg(data, '获取团伙信息失败，请稍后重试！', 'error');
                }
                });
            
            }
            if(tVal=="3") val=val+'_passport';
            if(tVal=="4") val=val+'_phoneM';
            if(tVal=="2"){
            	var _cartype = $('select.select-car-type',$page).val();
            	if(_cartype.indexOf('_vehicle') == -1) val = _cartype + '_' + val + '_vehicle';
                $ajax.ajax({
                url: mining.baseurl.core + '/query/genBase64Str?oriStr=["'+val+'"]',
                success: function (data) {
                   getVertex(data[0]);
                },
                async: false,
                error: function (data) {
                }
            });
            }else{
                getVertex(val);
            }
       
            var addMain = function (gid) {
                $ajax.ajax({
                    url: url + '/control/methods',
                    data: {
                        applicantId: mining.userinfo.user_id,
                        targetId: $('select.select-num').val()
                    },
                    async: false,
                    success: function (result) {
                        var options = [],selectData=[];
                        for (var i = 0; i < result.listObj.length; i++) {
                            options.push('<option value="' + result.listObj[i].controlMethodId + '"> ' + result.listObj[i].controlMethod + '</option>');
                            selectData.push({'id':result.listObj[i].controlMethodId,'text':result.listObj[i].controlMethod});
                        }
                        //if ($('.number-info li[gid=' + gid + ']', $page).length > 0) return;
                        if ($('.number-info li[gid=' + gid + ']', $page).length > 0)$('.number-info li[gid=' + gid + ']', $page).remove();
                        var li=$('<li targetId="' + $('select.select-num', $page).val() + '" gid="' + gid + '" key="' + $('.in-number', $page).val() + '">'+
                            '<div class="list-item num-val" title="' + $('.in-number', $page).val() + '">' + $('.in-number', $page).val() + '</div>'+
                            '<div class="list-item"><select class="select-main  select"  val="'+(selectData.length>0? selectData[0].id:'')+'">' + options.join('') + '</select> </div>'+
                            '<div> <button class="list-btnadd"><span class="icon icon-add"></span></button></div><div><span class="icon  btnmap"></span></div>'+
                            '<div><button class="list-btndel"><span class="icon icon-delete3"></span></button></div> </li>').data('select_data',selectData);
                        $('.info-main ul', $page).append(li);                    //$('select.select-main').select2({minimumResultsForSearch: Infinity});

                    },
                    error: function (result) {
                    }
                });
            };
            if (!graph) {
                delete graphModule_control;
                graphModule_control = new (require('core/common/graphchart/graphchart'))();
                 graphModule_control.init({
                    container: $('.graph',$page),
                    navigator: false,
                    zoom: 0.5,
                    layout: 'grid',
                    shownormal: true,
                    elements: {nodes: []},// createGraph($page),
                    readyCallback: function () {
                       graph = this;
                        $('.graph').bind('contextmenu', function (e) {
                            graph.$(':selected').unselect();
                            graph.$('.mouseover').first().select();
                            showNodeEvent($page);
                            return false;
                        }).on('click', function () {
                            hideNodeEvent($page);
                        });
                    },
                    selectCallback: function () {
                        if (graph.nodes(':selected').length < 1)return;
                        var data = graph.nodes(':selected').data().data;
                        var tId = $('.number-info li[gid=' + data.gid + ']').attr('targetid'),
                            tVal = $('.number-info li[gid=' + data.gid + '] ').attr('key');

                        getHistoryById(tId, tVal);
                        var li= $('.number-info li[gid=' + data.gid + ']');
                       li.addClass('selected').siblings().removeClass('selected');
                       li.insertBefore(li.parent().find('li:first-child'));
                    }
                });
            }

            mining.utils.serverLog(518,val);
        }
        function getTarget() {
            $ajax.ajax({
                url: url + '/control/targets',
                success: function (targetsData) {
                    var tmethods=targetsData.listObj;
                    var targetsOptions = [];
                    for (var k = 0; k < tmethods.length; k++) {
                        targetsOptions.push('<option value="' + tmethods[k].controlTargetId + '">' + tmethods[k].controlTarget + '</option>')
                    }
                    $('.select-num', $page).html(targetsOptions.join('')).select2({minimumResultsForSearch: Infinity});
                },
                async: false,
                error: function (data) {
                }
            });
        }
        function iniSelect() {
            $ajax.ajax({
                url: url + '/control/units',
                success: function (unitData) {
                    var unitOptions = [];
                    for (var i = 0; i < unitData.listObj.length; i++) {
                        unitOptions.push('<option value="' + unitData.listObj[i].controlUnitId + '">' + unitData.listObj[i].controlUnitName + '</option>')
                    }
                    $('.select-unit', $page).html(unitOptions.join(''));
                },
                async: false,
                error: function (data) {

                }
            });
            $ajax.ajax({
                url: url + '/control/persons',
                success: function (personData) {
                    var personOptions = [];
                    for (var j = 0; j < personData.listObj.length; j++) {
                        personOptions.push('<option value="' + personData.listObj[j].id + '">' + personData.listObj[j].policeManName + '</option>')
                    }
                    $('.select-notice', $page).html(personOptions.join(''));//{minimumResultsForSearch: Infinity}
                    $('.select-message', $page).html(personOptions.join(''));
                },
                async: false,
                error: function (data) {

                }
            });
            $ajax.ajax({
                url: url + '/control/types',
                success: function (data) {
                    var Options = [];
                    for (var j = 0; j < data.listObj.length; j++) {
                        Options.push('<option value="' + data.listObj[j].controlTypeId + '">' + data.listObj[j].controlType + '</option>')
                    }
                    $('.select-type', $page).html(Options.join(''));
                },
                async: false,
                error: function (data) {

                }
            });
        }
        function setSelect() {
            $('.select-car-type',$page).select2({minimumResultsForSearch: Infinity});
            $('.select-unit', $page).select2({minimumResultsForSearch: Infinity});
            $('.select-notice', $page).select2();
            $('.select-message', $page).select2();
            $('.select-model', $page).select2({minimumResultsForSearch: Infinity});
            $('.select-type', $page).select2({minimumResultsForSearch: Infinity});
        }
        function  iniForm(id) {
            $ajax.ajax({
                url: url + '/control/info',
                data: {
                    applicantId: mining.userinfo.user_id,
                    controlId: id
                },
                success: function (data) {
                    $('.select-model').val(data.obj.controlModeId);
                    $('.select-unit').val(data.obj.controlUnitId);
                    $('.select-type').val(data.obj.controlTypeId);
                    $('.date').val(data.obj.startTime + ' 至 ' + data.obj.endTime);
                    $('#control-reason').val(data.obj.controlReason);
                    $.each(data.obj.jxtbr,function(k,v){
                        $('select.select-notice').find('option[value='+ v.id+']').attr('selected',true)
                    });
                    $.each(data.obj.dxtbr,function(k,v){
                        $('select.select-message').find('option[value='+ v.id+']').attr('selected',true)
                    });
                    setSelect();
                    graphstr=data.obj.itemsGraph;
                    datalist=data;
                },
                async: false,
                error: function (data) {

                }
            });
        }
        function drop() {
            $("ul.droptrue").sortable({
                connectWith: "ul"
            });
            $("#sortable1, #sortable2").disableSelection();
            $("#sortable1").droppable({
                drop: function (event, ui) {
                    graph.$('#' + ui.draggable.attr('gid')).addClass('red');
                },over:function (event,ui) {
                    graph.$('#' + ui.draggable.attr('gid')).addClass('red');
                }
            });
            $("#sortable2").droppable({
                drop: function (event, ui) {
                    graph.$('#' + ui.draggable.attr('gid')).removeClass('red');
                },over:function (event,ui) {
                    graph.$('#' + ui.draggable.attr('gid')).removeClass('red');
                }
            });
        }
        function delNode(gid) {
           /* if(gid){
                $.each(graph.$('.relation'),function(k,v){
                    if(v.data().data.from==gid&&$('.info-main li[gid='+v.data().data.to+']').length==0) v.select();
                    if(v.data().data.to==gid&&$('.info-main li[gid='+v.data().data.from+']').length==0) v.select();
                });
            }*/
         /*   var nodes=graph.$(':selected');
            $.each(nodes,function(k,v){
                var node=v.data().data;
                if(node.etype=='relation'){
                    if($('.info-main li[gid='+node.from+']').length==0){
                        graph.$('#'+node.from).select();
                    }
                    if($('.info-main li[gid='+node.to+']').length==0){
                        graph.$('#'+node.to).select();
                    }
                }
            });*/
            var nodes_=graph.$(':selected');
            for(var i=0;i<nodes_.length;i++){
                var li=  $('.number-info li[gid='+nodes_[i].data().id+']');
                var data=li.data('circle'),point=li.data('point');
                if(data){
                    map.removeOverlay(data);//删除对应的圆
                    $('.mapinfo ul li[c_index='+li.attr('c_index')+']').remove();
                }
                if(point){//删除对应的圆所搜索出来的点
                    $.each(point,function(k,p){
                        map.removeOverlay(p);
                    });
                }
                $('#marker'+li.attr('c_index')).remove();
                li.remove();
            }
            graphModule_control.delelements(':selected');
            $('.node-event', $page).addClass('hide');

        }
        function extendNode() {
        	console.time('***** extendNode')
            if (graph.nodes(':selected').length < 1)return;
            var data = graph.nodes(':selected').data().data,
            	classList = mining.mappingutils.getClassList('relation'), 
            	labelAndProp = {},
            	labels = [],
            	ruleIdArr = [];
            
            labels = [];
			$.each(classList, function(i,n){
				labels.push(n.label);
			});
			$.each(labels, function(i,n){
				var _type = classList[n].children[0].type;
				labelAndProp[n] = mining.mapping.objList[n + (mining.utils.isEmpty(_type) ? '' : '_' + _type)].timeline;
			});
            ruleIdArr = mining.mappingutils.getRuleIds();
            $ajax.ajax({
                url:mining.baseurl.host+'/tuning/services/plugin/entitysplit/getById',// mining.baseurl.core + '/query/getByLabel',
                data: {
					vid: data.gid,
					labels: JSON.stringify(labelAndProp),
					rule_ids: JSON.stringify(ruleIdArr),
					starttime: '',
					endtime: '',
					keyword: ''
				},
                success: function (result) {
                	if(mining.utils.isEmpty(result)){
						//$dialog.alert('未找到任何数据！', 'warning');
						return;
					}
					console.time('***** appendEntity');
					graphModule_control.appenddata(result.obj);
                    setTimeout(function(){
                    	addList(data.gid, result.obj);
                    },10);
                },
                error: function (result) {
                    // mining.utils.alertMsg(result, '获取数据失败，请稍后重试！', 'error');
                }
            });
            $('.node-event', $page).addClass('hide');
        }

        function addList(gid, result) {
            var getTId={'person':'1','car':'2'};
            $ajax.ajax({
                url: url + '/control/methods',
                data: {
                },
                //async: false,
                success: function (data) {
                	console.time('***** addList')
                	console.time('***** addList-appendHTML')
                    var typeMapping = require('./typemapping');
                    var getOptions=function(label,selectData){
                        var tar=getTId[label];
                        var options = [];
                        for (var j = 0; j < data.listObj.length; j++) {
                            if(data.listObj[j].controlTargetId==tar){
                                options.push('<option value="' + data.listObj[j].controlMethodId + '"> ' + data.listObj[j].controlMethod + '</option>');
                                selectData.push({'id':data.listObj[j].controlMethodId,'text':data.listObj[j].controlMethod});
                            }
                        }
                        return options;
                    };
                    console.time('***** addList-for')
                    var list = [];
                    for (var i = 0; i < result.v.length; i++) {
                        var o = result.v[i];
                        var lbl = typeMapping(o.label);
                        if (lbl == 'car' || lbl == 'person') {
                            var selectData=[];
                            var options = getOptions(lbl,selectData).join('') ;
                            if ($('.number-info li[gid=' + o.gid + ']', $page).length > 0) { 
                                $('.number-info li[gid=' + o.gid + ']', $page).attr('level',o.ENTITY_level);
                                 continue;
                             }
                            var index=i>9?i%10:i;
                            var key=o.key;
                            var tId=getTId[lbl] ;
                            if(tId=='2')
                                key=o.hpzl_hphm.substr(2);
                            if(tId=='3')
                                key=o.key.replace('_passport','');
                             if(tId=='4')
                                key=o.key.replace('_phoneM','');
                            var li=$('<li gid="' + o.gid + '" key="' + (key ) + '" level="'+ o.ENTITY_level+'" color="'+mapColor[index]+'"  targetId="' + tId+ '">'+
                                '<div class="list-item num-val" title="' + key + '">' +key + '</div><div  class="list-item"> <select class="  select"   val="'+selectData[0].id+'">' + options+' </select></div>' +
                                '<div> <button class="list-btnadd"><span class="icon icon-add"></span></button></div><div> <span class="icon  btnmap"></span></div>'+
                                '<div><button class="list-btndel"><span class="icon icon-delete3"></span></button></div> </li>').data('select_data',selectData);
                            $('.info-list ul', $page).append(li);

                        }
                    }
                    $('.info-list ul', $page).append(list.join(''));
                    //$('.info-list select', $page).select2({minimumResultsForSearch: Infinity});  //影响性能，122个select渲染需要85576.000ms 
                    console.timeEnd('***** addList-select2')
                    $('.number-info', $page).mCustomScrollbar({
                        theme: 'minimal'
                    });
                    getHistoryType();
                    console.timeEnd('***** addList')
                }
            });
        }
    }
    function getHistoryType() {
        if(mining.utils.isEmpty(graph)) return;
    	console.time('***** getHistoryType')
        graph.nodes().removeClass('orange');
        var lis=$('.number-info li');
        var tId=[],num=[];
        $.each(lis,function(k,v){
            tId.push($(v).attr('targetid')),num.push($(v).attr('key'));
        });
        $.ajax({
            url: url + '/control/items/history',
            data:'applicantId='+ mining.userinfo.user_id+'&'+'controlTypeId='+tId.join(',')+'&controlNumber='+num.join(',') ,
            type: 'get',
            success: function (result) {
            	console.time('***** getHistoryType-result')
                if (result.listObj && result.listObj.length > 0) {
                    $.each(result.listObj,function(k,v){
                        var gid = $('.number-info li[key=' +  v.controlNumber + ']').attr('gid');
                        graph.$('#' + gid).addClass('orange');
                    });
                }
                console.timeEnd('***** getHistoryType-result')
                console.timeEnd('***** getHistoryType')
            },
            error: function (result) {
                // mining.utils.alertMsg(result, '获取数据失败，请稍后重试！', 'error');
            }
        });
    }
    function iniMap($page) {
        delete map;
        delete  mapModule_;
        //baidu
		mapModule_ = require('core/common/mapchart/baidu/mapchart');
		//pgis
		//mapModule_ = new (require('core/common/mapchart/pgis/mapchart'))();
        map=null;
        mapModule_.init({
        	id: 'mapChart',
        	snapshot: false,
            readyCallback: function (bdmap) {
                map = bdmap;
            }
        });
        $('.controlmap',$page).addClass('hide');
        //记录地图初始化
		window.SCOPA_MAP_APP = true;
    }
    function  complete (evt) {
        var evtdata = evt.split(',');
        var point = {
            lng: evtdata[0],
            lat: evtdata[1]
        };
        var radius =parseFloat(evtdata[2] ) * 100000;
        var circle=map.getOverlays();
        map.removeOverlay(map.getOverlays()[circle.length-1]);
        var tempLayer = new Circle(evtdata.join(','), g_LineColor, 2, 0.5, g_FillColor);
        map.addOverlay(tempLayer);
        var activeli=$('.number-info li.active');
        var data=activeli.data('circle');
        var count = $('.mapinfo li').length;
        if(data){
            map.removeOverlay(data);//删除以前的圆
            var   p_=activeli.data('point');
            if(p_){//删除对应的圆所搜索出来的点
                $.each(p_,function(k,p){
                    map.removeOverlay(p);
                });
            }
            $('#marker'+activeli.attr('c_index')).remove();
            count=Number(activeli.attr('c_index'));
            $('.mapinfo ul li[c_index='+activeli.attr('c_index')+']').html('<p><span>' + (count + 1) + '</span> <span> 圆心：' + JSON.stringify(point) + '</span></p><p style="text-indent: 10px"><span>半径：' + radius + '米</span></p> ')
        }else {
            $('.mapinfo ul').append('<li c_index="'+count+'" style="color:'+g_FillColor+'"><p><span>' + (count + 1) + '</span> <span> 圆心：' + JSON.stringify(point) + '</span></p><p style="text-indent: 10px"><span>半径：' + radius + '米</span></p>  </li>');
            $('.mapinfo', $page).mCustomScrollbar({
                theme: 'minimal'
            });
        }
        activeli.attr({lng:point.lng,lat:point.lat,radius:radius,c_index:count}).data('circle',tempLayer);

        // 正式：调用接口，获取圆内的经纬度点，并标注
        $ajax.ajax({
            url: mining.baseurl.core + '/map/searchCircle',//lng=114.5&lat=38.5&radius=10000
            data: {
                vertexGeo: JSON.stringify({
                    lat: parseFloat(point.lat),
                    lng: parseFloat(point.lng),
                    radius: radius / 1000
                }),
                labels:'',
                keyword:''
            },
            type:'post',
            success: function (result) {
                if(!result.v) return;
                var point=[];
                var length=result.v.length;
                for(var i=0;i<length;i++){
                    var item=result.v[i].geo;
                    var uPoint = new Point(item.lng, item.lat);
                    var uHTMLOverLay1 = new HTMLElementOverLay("marker"+count,uPoint,'<div class="map-point"></div>');
                    point.push(uHTMLOverLay1);
                    map.addOverlay(uHTMLOverLay1);
                }
                activeli.data('point',point);
            }
        });

    };

    function showMap($page) {
        $('.controlmap', $page).removeClass('hide').animate({width: '303px'}, 500);
    }
    function setMapCenter(lng, lat) {
        var uPoint = new Point(lng, lat);
        map.centerAtLatLng(uPoint);
    }
    function showNodeEvent($page) {
        $('.node-event', $page).removeAttr('style');
        $('.node-event', $page).removeClass('hide').offset({left: event.clientX + 20, top: event.clientY});
    }
    function hideNodeEvent($page) {
        $('.node-event', $page).addClass('hide');
    }
    function setGraph(data,$page,flag,datalist) {
        if(mining.utils.isEmpty(data)) return;
        delete graphModule_control;
        graphModule_control = new (require('core/common/graphchart/graphchart'))();
        graph=null;
        graphModule_control.init({
            container: $('.graph',$page),
            navigator: false, shownormal: true,
            zoom: 0.5,
            elements:data.nodes? data:[] ,
            layout: 'grid',
            readyCallback: function () {
                graph=this;
                $('.graph').bind('contextmenu', function (e) {
                    graph.$(':selected').unselect();
                    graph.$('.mouseover').first().select();
                    showNodeEvent($page);
                    return false;
                }).on('click', function () {
                    hideNodeEvent($page);
                });
                if(data.data&&data.data.v.length>0)
                 graphModule_control.appenddata(data.data);
            },
            selectCallback: function () {
                if (graph.nodes(':selected').length < 1)return;
                var data = graph.nodes(':selected').data().data;
                var tId = $('.number-info li[gid=' + data.gid + ']').attr('targetid'),
                    tVal = $('.number-info li[gid=' + data.gid + '] ').attr('key');
                getHistoryById(tId, tVal);
                var li= $('.number-info li[gid=' + data.gid + ']');
                li.addClass('selected').siblings().removeClass('selected');
                li.insertBefore(li.parent().find('li:first-child'));
            }
        });

        if(flag){setList($page,graph,datalist)}
    }
    function getHistoryById(tId, tVal) {

        $.ajax({
            url: url + '/control/item/info',
            data: {
                applicantId: mining.userinfo.user_id,
                controlTypeId: tId,
                controlNum: tVal
            },
            type: 'get',
            success: function (result) {
                var trs = [];
                if (result.listObj) {
                    for (var i = 0; i < result.listObj.length; i++) {
                        var o = result.listObj[i];
                        var status = {'0': '未审核', '1': '审核通过', '2': '已拒绝','3':'已撤销'};
                        trs.push('<tr><td>' + o.controlId + '</td><td>' + o.startTime + '</td><td>' + o.endTime + '</td><td>' + status[o.status] + '</td><td>' + (o.latestEvent || '') + '</td></tr>');
                    }
                }
                $('.controlhistory').html('<span> 历史布控</span> ' +
                    '<div class="his-auto"> <table cellspacing="1" border="1"> <tr><td>布控批次</td><td>起始时间</td><td>结束时间</td><td>状态</td><td>预警信息</td></tr>' +
                    trs.join('') + '</table> </div>');
                $('.controlhistory .his-auto').css('max-height','100px').mCustomScrollbar({
                    theme: 'minimal'
                });
            },
            error: function (result) {
                // mining.utils.alertMsg(result, '获取数据失败，请稍后重试！', 'error');
            }
        });
    }
    function setList($page,graph,data) {
        $ajax.ajax({
            url: url + '/control/methods',
            data:{},
            async: false,
            success: function (result) {
                var mainOptions = [], listOptions = [];
                var getgid=function (key,tId) {
                    for(var i=0;i<graph.nodes().length;i++){
                        var graphkey=graph.nodes()[i].data().data.key;
                        if(tId=='2'&&graph.nodes()[i].data().data.hpzl_hphm)
                            graphkey=graph.nodes()[i].data().data.hpzl_hphm.substr(2);
                        if(tId=='3')
                            key=key+'_passport';
                        if(tId=='4')
                            key=key+"_phoneM";
                        
                        if(graphkey==key){
                            return graph.nodes()[i].data().data.gid;
                        }
                    }
                };
                var method=result.listObj;
                var getMethodById=function (tId,mId,selectData) {
                    var options=[];
                    $.each(method,function (k, v) {
                        if(v.controlTargetId==tId){
                            options.push('<option value="'+v.controlMethodId+'" '+(v.controlMethodId==mId?"selected=true":"")+'> '+v.controlMethod+'</option>');
                            selectData.push({'id':v.controlMethodId,'text':v.controlMethod});
                        }
                    });
                    return options.join('');
                };
                var getSelects=function(methods,tId,selectData){
                    var select=[];
                    $.each(methods,function(k,v){
                        var option=getMethodById(tId,v.id,selectData);
                        select.push('<select class="select" val="'+selectData[0].id+'">' +option + '</select> ');
                    });
                    return select.join('');
                };
                $.each(data.obj.items,function (k, v) {
                    var selectData=[];
                    var selects = getSelects(v.methods, v.targetId,selectData);
                    var item_num= v.number.replace('_vehicle','').replace('1_','大型车_').replace('2_','小型车_');
                    if (v.isMainContorl) {
                        var mli=$('<li targetId="' + v.targetId + '" gid="' + getgid(v.number) + '" key="' + v.number + '">'+
                            '<div class="list-item num-val" title="' +item_num + '">' + item_num  + '</div>'+
                            '<div class="list-item">'+selects+'</div>'+
                            '<div> <button class="list-btnadd"><span class="icon icon-add"></span></button></div><div><span class="icon  btnmap"></span></div>'+
                            '<div><button class="list-btndel"><span class="icon icon-delete3"></span></button></div></li>').data('select_data',selectData);
                        $('.info-main ul', $page).append(mli);
                    } else {
                       var li=$('<li gid="' + getgid(v.number,v.targetId) + '" key="' + v.number + '"  targetId="' + v.targetId + '">'+
                           '<div class="list-item num-val" title="' +item_num + '">' + item_num + '</div><div  class="list-item">' +selects + ' </div>'+
                           '<div> <button class="list-btnadd"><span class="icon icon-add"></span></button></div><div> <span class="icon  btnmap"></span></div>'+
                           '<div><button class="list-btndel"><span class="icon icon-delete3"></span></button></div></li>').data('select_data',selectData);
                        $('.info-list ul', $page).append(li);
                    }
                });
               // $('.info-main ul', $page).append(mainOptions.join(''));
                $('#main-num', $page).text(mainOptions.length);
            //    $('.info-list ul', $page).append(listOptions.join(''));
                $('#list-num', $page).text(listOptions.length);
                //$('.number-info select', $page).select2({minimumResultsForSearch: Infinity});
                getHistoryType();
            },
            error: function (result) {
            }
        });
    }
    function review(obj) {
        var $dlg = $dialog({
            title: '布控审核',
            width: 1200, height: 600,
            padding: 0,
            content: '<div class="createcontrol auditcontrol" cId="' +  obj.id + '">' +
            '<div class="shadow" style="    overflow: hidden;   margin-bottom: 10px;"><div class="in-row"><span class="lbl">布控批次号</span><span id="controlId"></span> </div>' +
            '<div class="in-row"><span class="lbl">管控单位</span><span id="controlUnit"></span></div>' +
            '<div class="in-row"><span class="lbl">布控种类</span><span id="controlType"></span> </div>' +
            '<div class="in-row"><span class="lbl">布控时间</span><span id="time"></span></div>' +
            '<div class="in-row"><span class="lbl">警讯通报人</span><span id="jxtbr"></span> </div>' +
            '<div class="in-row"><span class="lbl">短信报警人</span><span id="dxtbr"></span> </div>' +
            '<div class="in-row"><span class="lbl">布控原因</span><span id="controlReason"></span></div></div>' +
            '<div class="controlgraph"><div class="graph shadow"></div><div class="controlhistory "></div>' +
            '<div class="controlmap hide"><div id="mapChart"></div> ' +
            '<div class="mapbar"><button class="circlesearch"><span class="icon icon-radiussearch"></span></button>'+
           /* '<button class="pathsearch"> <span class="icon icon-route"></span></button> <button class="formatpath"><span class="icon icon-trajectory"></span></button>' +*/
            //'<input class="item" style="padding-right: 20px"> <span class="icon icon-search2" style="    position: relative;left: -20px;"></span> <span class="arrow">&gt;&gt;</span></div> ' +
            '<span class="arrow">&gt;&gt;</span></div> ' +
            '<div class="mapinfo"> <ul></ul></div></div>' +
            '<div class="number-info shadow"><div class="info-main"><label>主布控 <span id="main-num"></span></label> <ul></ul></div>' +
            '<div class="info-list"><label >辅布控 <span id="list-num"></span></label><ul></ul> </div>' +
            '  </div></div>' +
            '<div class="btnbar"><button class="btn" id="btnPassed">通过</button><button class="refusal btn">拒绝</button></div> ' +
            '<div class=" reason-container hide"> <textarea class="item in-reason " style="width: 98%;  padding: 10px;    margin: 5px;" name="" id="reason" cols="30" rows="2" placeholder="请输入拒绝原因"></textarea> ' +
            '<button class="btn btn-ok pull-right" >确定</button></div>'+
            '</div>',
            onshow: function () {
                $page = $(this.node);
                if (obj.detail) {
                    $('.btnbar').addClass('hide');
                }
                else {
                    $('.btnbar').removeClass('hide');
                }
               /* try{ iniMap($page);}
                catch(e){}*/
             //  showMap($page);
                $.ajax({
                    url: url + '/control/info',
                    data: {
                        applicantId: mining.userinfo.user_id,
                        controlId: obj.id
                    },
                    success: function (data) {
                        var getPerson=function (list) {
                            var reStr=[];
                            $.each(list,function (k, v) {
                                reStr.push(v.name);
                            });
                            return reStr.join(',');
                        };
                        if(typeof data =="string")
                            data=JSON.parse(data);
                        $('#controlId').text(data.obj.controlId);
                        $('#controlUnit').text(data.obj.controlUnit);
                        $('#controlType').text(data.obj.controlType);
                        $('#time').text(data.obj.startTime + ' 至 ' + data.obj.endTime);
                        $('#jxtbr').text(getPerson(data.obj.jxtbr));
                        $('#dxtbr').text(getPerson(data.obj.dxtbr));
                        $('#controlReason').text(data.obj.controlReason);
                        if(data.obj.itemsGraph){
                        	//data.obj.itemsGraph = mining.utils.formatSnapshotData({elements:data.obj.itemsGraph});

                            setTimeout(setGraph(data.obj.itemsGraph,$page),2000);
                        }
                        var mainOptions = [], listOptions = [];
                        var getgid=function (key) {
                            if(graph==null) return '';
                            for(var i=0;i<graph.nodes().length;i++){
                                if(graph.nodes()[i].data().data.key==key){
                                    return graph.nodes()[i].data().data.gid;
                                }
                            }
                        };
                        var getMethod=function(methods){
                            var met=[];
                            $.each(methods,function(k,v){
                                met.push(v.name);
                            });
                            return met.join(',');
                        };
                        for (var i = 0; i < data.obj.items.length; i++) {
                            var item = data.obj.items[i];
                            var item_num= item.number.replace('_vehicle','').replace('1_','大型车_').replace('2_','小型车_');
                            var lng=item.area&&item.area.circle&&item.area.circle.point.lng?item.area.circle.point.lng:'';
                            var lat=item.area&&item.area.circle? item.area.circle.point.lat:'';
                            var html = '<li gid="'+getgid(item.number)+'" lng="'+lng+'" lat="'+lat+
                                '" radius="'+(item.area&&item.area.circle? item.area.circle.radius:'')+'" color="'+(item.area?item.area.color:'') +'" targetId="'+item.targetId+'" key="'+ item.number +'">'+
                                ' <span class="num-val" title="' + item_num + '">' + item_num + ' </span> <span>' +getMethod(item.methods)+ ' </span>  <span class="icon  btnmap pull-right"></span></li>';
                            if (item.isMainContorl) {
                                mainOptions.push(html);
                            } else {
                                listOptions.push(html);
                            }
                        }
                        $('.info-main ul', $page).append(mainOptions.join(''));
                        $('#main-num', $page).text(mainOptions.length);
                        $('.info-list ul', $page).append(listOptions.join(''));
                        $('#list-num', $page).text(listOptions.length);
                        getHistoryType();
                        $.each($('.number-info li'),function (k, v) {
                            var evtdata=[];
                            var o=$(v);
                            if(o.attr('lng')){
                                evtdata.push(o.attr('lng'));
                                evtdata.push(o.attr('lat'));
                                evtdata.push(o.attr('radius')/100000);
                                var tempLayer = new Circle(evtdata.join(','), g_LineColor, 2, 0.5, o.attr('color'));
                                map.addOverlay(tempLayer);
                                //显示布控范围的点
                                $ajax.ajax({
                                    url: mining.baseurl.core + '/map/searchCircle',//lng=114.5&lat=38.5&radius=10000
                                    data: {
                                        vertexGeo: JSON.stringify({
                                            lat: parseFloat(o.attr('lat')),
                                            lng: parseFloat(o.attr('lng')),
                                            radius: o.attr('radius') / 1000
                                        }),
                                        labels:'',
                                        keyword:''
                                    },
                                    type:'post',
                                    success: function (result) {
                                        if(!result.v) return;
                                        var length=result.v.length;
                                        for(var i=0;i<length;i++){
                                            var item=result.v[i].geo;
                                            var uPoint = new Point(item.lng, item.lat);
                                            var uHTMLOverLay1 = new HTMLElementOverLay("marker1",uPoint,'<div class="map-point"></div>');
                                            map.addOverlay(uHTMLOverLay1);
                                        }
                                    }
                                });

                                //
                            }

                        });

                    },
                    async: false,
                    error: function (data) {

                    }
                });
                $('.refusal',$page).on('click', function () {
                    $dlg.height(720);
                    $('.reason-container').removeClass('hide');
                    $('.btnbar button').attr('disabled','disabeld');
                });
                $('.number-info', $page).mCustomScrollbar({
                    theme: 'minimal'
                });
                $('.number-info', $page).on('click', '.btnmap', function () {
                   /* showMap($page);
                    var parent=$(this).parents('li');
                    if(parent.attr('lng')){
                        setMapCenter(parent.attr('lng'),parent.attr('lat'));
                    }*/
                });
                $('.mapbar .arrow', $page).on('click', function () {
                    $('.controlmap', $page).animate({width: '1px'}, 1000).addClass('hide');
                });
                $('#btnPassed', $page).on('click', function () {
                    audit({
                        controlId: $('.auditcontrol', $page).attr('cId'),
                        leaderId: mining.userinfo.user_id,
                        status: 1,//（1 – 审核通过， 2 – 审核失败）
                        remark: ''
                    }, function () {
                        obj.fun&&obj.fun();
                    },'审核成功');
                    mining.utils.serverLog(519,$('.auditcontrol', $page).attr('cId'));
                });
                $('.btn-ok',$page).on('click', function () {
                    if($('.in-reason').val()==""){
                        $dialog.alert('拒绝理由不能为空','warning');
                        return;
                    }
                    audit({
                        controlId:  $('.auditcontrol', $page).attr('cId'),
                        leaderId: mining.userinfo.user_id,
                        status: 2,//（1 – 审核通过， 2 – 审核失败）
                        remark: $('#reason').val()
                    }, function () {
                        obj.fun&&obj.fun();
                    },'拒绝成功');
                    mining.utils.serverLog(520,$('.auditcontrol', $page).attr('cId'));

                });

            },
            onclose: function(){
                this.remove();
            }
        }).showModal();

        function audit(data, fun,msg) {
            $ajax.ajax({
                url: url + '/control/approve',
                type: 'post',
                data: data,
                success: function (result) {
                    if (result.statusCode == 200) {
                        $dialog.alert(msg,'success', function () {
                            $dlg.close();
                            fun&&fun();
                        });
                    }
                },
                error: function (e) {
                    $dialog.alert("审核失败",'error');
                },
                complete: function (data) {

                }
            });

        }
    }

    return {
        create: create,
        review: review
    }

});
