define(function (require) {
    var $page = $('.page-role'),
        requestUrl = {
            role_getAll: mining.baseurl.console + '/role/getAll',
            role_getById: mining.baseurl.console + '/role/get',
            role_add: mining.baseurl.console + '/role/add',
            role_del:mining.baseurl.console + '/role/delete',
            role_update: mining.baseurl.console + '/role/update',
            data_getBasic: mining.baseurl.console + '/data/basic',
            data_getSpecific: mining.baseurl.console + '/data/specific',
            data_basic_del:mining.baseurl.console + '/data/basic/delete',
            data_specific_del:mining.baseurl.console + '/data/specific/delete',
            data_basic_update:mining.baseurl.console + '/data/basic/update',
            data_specific_update:mining.baseurl.console + '/data/specific/update',
            data_getLevel: mining.baseurl.console + '/auth/getDataMapping',//获取每个level级别与可见数据的映射
            role_getLevel: mining.baseurl.console + '/auth/getRoleMapping',//获取每个level级别与可见角色的映射
            getLevel: mining.baseurl.console + '/auth/getLevelRange',
            permissions_add:mining.baseurl.console + '/application/addCategory',
            permissions_del:mining.baseurl.console + '/application/deleteCategory',
            permissions_update:mining.baseurl.console + '/application/updateCategory',
            app_get: mining.baseurl.console + '/application',
            app_add:mining.baseurl.console + '/application/addApplication',
            app_del:mining.baseurl.console + '/application/deleteApplication',
            app_update:mining.baseurl.console + '/application/updateApplication',
            getTag:mining.baseurl.console + '/data/specific/todo'

        };
    var dataLevel=[],dataPermissions=[];
    //刷新布局
    var pageResize = function () {
    	$('.d_permissions,.d_role',$page).height($page.height() - 70);
        $('.table_container',$page).height($('.d_permissions,.d_role',$page).height() /2-80);
        //TODO
    };
    Date.prototype.format = function() {
        var month=this.getMonth()+1,date=this.getDate()
        return this.getFullYear()+'-'+(month<10?'0':'')+month+'-'+(date<10?'0':'')+date+' '+this.getHours()+':'+this.getMinutes()+':'+this.getSeconds();
    };
    /* 初始化 */
    var initPage = function () {
        mining.utils.loadPage($page, function () {
            mining.utils.winResize({name: pageResize});
            function getList() {
                $ajax.ajax({
                    url: requestUrl.role_getAll,
                    async: false,
                    success: function (result) {
                        var tr = [];
                        $.each(result.listObj, function (k, v) {
                            tr.push('<tr rid="' + v.id + '" level="' + v.level + '" appId="'+ v.appIDs+'"><td>' + v.name + '</td><td>' + new Date(v.ctime).format() + '</td><td>' + v.username + '</td><td> <a href="javascript://"> <span class="btndel icon icon-delete4"></span> </a> </td></tr>');
                        });
                        $('#tableRole tbody ',$page).html(tr.join(''));
                     /*   $('.role_container').mCustomScrollbar({
                            theme: 'minimal'
                        });*/
                    },
                    error: function (result) {

                    }
                });
            }

            //数据权限
            function iniDataPerm($p) {
                $ajax.ajax({
                    url: requestUrl.getLevel,
                    async: false,
                    success: function (result) {
                        var data = result.listObj;
                        dataLevel=result.listObj;
                        var options = [];
                        $.each(data, function (k, v) {
                            options.push('<option value="' + v + '">' + v + '</option>');
                        });
                        $('select.data_select',$p).html(options.join('')).select2({
                            minimumResultsForSearch: Infinity
                        }).on('change', function () {
                            setListFirst(this.value,$p);
                        });
                    },
                    error: function (result) {

                    }
                });
                $ajax.ajax({
                    url: requestUrl.data_getLevel,
                    async: false,
                    success: function (result) {
                        var data = result.listObj;
                        var lis = [];
                        $.each(data, function (k, v) {
                            var span = [];
                            $.each(v.value, function (index, obj) {
                            //    var label= obj.label?(mining.mappingutils.getLabelName(obj)||obj.label)+'_'+(mining.mappingutils.getTypeName(obj)||obj.type):obj.name;
                                var label= obj.label?(mining.mappingutils.getTypeName(obj)||obj.type):obj.name;
                                span.push('<span>' + label + '</span> &nbsp; &nbsp;');
                            });
                            lis.push('  <li level="' + v.key + '">' + v.key + '.' + span.join('') + '</li> ');
                        });
                       $('.levellist',$p).prop('outerHTML','<ul class="role_control levellist" id="list_perm"> '+lis.join('')+'</ul>');// $('.levellist',$p).html(lis.join(''));
                        $('.levellist', $p).height(100).mCustomScrollbar({
                            theme: 'minimal'
                        });
                    },
                    error: function (result) {

                    }
                });
            }

            //应用权限
            function iniAppPerm($p) {
                $ajax.ajax({
                    url: requestUrl.app_get,
                    async: false,
                    success: function (result) {
                        if(result.listObj){
                            var lis = [];
                            $.each(result.listObj, function (index, obj) {
                                lis.push('<li cId="' + obj.key.id + '" class="category"> <a class="a_check "></a> <b> ' + obj.key.category + '</b></li>');
                                $.each(obj.value, function (k, v) {
                                    lis.push('<li cId='+obj.key.id+' subId="' + v.id + '" class="subcategory" cname="' + v.categoryName + '"> <a class="a_check"></a> ' + v.name + ' ' + v.desc + '</li>');
                                });
                            });
                            $('.app_container',$p).html('<ul id="app_list" class="app_list">'+lis.join('')+'</ul>');
                            $('.app_list', $p).height($page.height()/3-20).mCustomScrollbar({
                                theme: 'minimal'
                            });
                            loadAppList(result.listObj);
                        }
                    },
                    error: function (result) {

                    }
                });

            }

            function setSelect(level) {
                $('.data_select').select2("val", level);
                setListFirst(level,$page);
            }

            function setListFirst(level,$p) {
                var li = $('.levellist li[level=' + level + ']',$p).insertBefore($('.levellist',$p).find('li:first-child'));
            }

            $('#tableRole tbody ',$page).on('click','tr', function () {
                var tr=$(this);
                tr.siblings().removeClass('selected');
               tr.addClass('selected');
                var lev =tr.attr('level');
                setSelect(lev);

                var appId=tr.attr('appId');
                if(appId){
                    $('.app_list li .a_check').removeClass('checked');
                    $('.app_list li').css({'margin-left': '0'});
                    var arrId=appId.split(',');
                    $.each(arrId,function(k,v){
                        $('.app_list li[subid='+v+']',$page).animate({'margin-left': '25px'});
                        $('.app_list li[subid='+v+'] .a_check',$page).addClass('checked');
                    });
                    setCheckAll($page);
                }
            });
            function setCheckAll($p){
                var liAll=   $('.app_list li.category',$p);
                $.each(liAll,function(k,v){
                    var cId= $(v).attr('cId');
                    var sub=$('.app_list li.subcategory[cid='+cId+']',$p);
                    if(sub.length>0){
                        if(sub.length==sub.find('.a_check.checked').length){
                            $(v).find('.a_check').addClass('checked');
                            $(v).animate({'margin-left': '25px'});
                        }
                        else{
                            $(v).find('.a_check').removeClass('checked');
                            $(v).animate({'margin-left': '0'});
                        }
                    }
                });
            }
            $('#tableRole tbody ',$page).off('click','.btndel').on('click','.btndel', function (e) {
                e = e || window.event;
                if(e.preventDefault) {
                    e.preventDefault();
                    e.stopPropagation();
                }else{
                    e.returnValue = false;
                    e.cancelBubble = true;
                }
                var btn=$(this);
                $dialog.confirm({
                    title: '删除群组',
                    content: '您确定要删除该角色吗？',
                    ok: function(){
                        $ajax.ajax({
                            url: requestUrl.role_del,
                            type: 'get',
                            dataType:'json',
                            data:{"id":btn.parents('tr').attr('rid')},
                            success: function (result) {
                                if (result.statusCode == 200) {
                                    $dialog.alert("删除成功",'success',function(){getList();$('#tableRole tr:first',$page).click()});
                                }
                            },
                            error:function(e){
                                $dialog.alert("删除失败,"+ e.message,'error');
                            }
                        });
                    }
                });
            });
            function addEvent($p){
                $('.app_container',$p).off('click','.a_check').on('click', '.a_check', function () {
                    var check = $(this);
                    var checked=false;
                    if (check.hasClass('checked')) {
                        check.removeClass('checked');
                        check.parent().animate({'margin-left': '0'});
                    } else {
                        check.addClass('checked');
                        check.parent().animate({'margin-left': '25px'});
                        checked=true;
                    }
                    if(check.parent().hasClass('category')){
                        if (checked){
                            $('.app_list li[cId=' + check.parent().attr('cId') + '] .a_check',$p).addClass('checked');
                            $('.app_list li[cId=' + check.parent().attr('cId') + ']',$p).animate({'margin-left': '25px'});
                        }
                        else{
                            $('.app_list li[cId='+check.parent().attr('cId')+'] .a_check',$p).removeClass('checked');
                            $('.app_list li[cId=' + check.parent().attr('cId') + ']',$p).animate({'margin-left': '0'});
                        }
                    }
                    setCheckAll($p);
                });
            }

            $('#tab li', $page).on('click', function () {
                $(this).siblings().removeClass('current');
                $(this).addClass('current');
                var key = $(this).attr('key');
                $('.' + key).siblings().addClass('hide')
                $('.' + key).removeClass('hide');

                iniDataPerm($page);
                iniAppPerm($page);
            });
            $('#btnAddRole', $page).off('click').on('click', function () {
                var newdialog = $dialog({
                    title: '设置应用权限 ',
                    content: '<div class="dlg_main page-role"><div class="step1">'+
                    '<div class="row"><div class="col-xs-1 label" style="    position: relative;top: 8px;">创建角色</div> <div class="col-xs-11"> <input type="text" class="role_control roleName" style="width: 50%" /></div></div> '+
                    '<div class="row"><div class="col-xs-1 label">数据权限</div><div class="col-xs-11">   <select class="data_select role_control" style="width: 50%" > </select></div></div>'+
                    '<div class="row"><div class="col-xs-1 label">等级释义 </div> <div class="col-xs-11"><ul class="role_control levellist" > </ul></div> </div>'+
                    '<div style="text-align: center"><button class="btnblue btnNext">下一步</button></div>'+
                    '</div><div class="step2 hide "> '+
                    '<div class="app_container"> <ul id="app_list" class="app_list"> </ul></div> '+
                    '<div style=" position: absolute;bottom: 0;left: 48%;"><button class="btnblue btnSubmit">确定</button></div></div> </div>',
                    width: 650,
                    height:230,
                    onshow: function () {
                        var $dlgPage = $(this.node);
                        iniDataPerm($dlgPage);
                        $('.btnNext',$dlgPage).on('click',function(){
                            $('.step1',$dlgPage).addClass('hide');
                            $('.step2',$dlgPage).removeClass('hide');
                            iniAppPerm($dlgPage);
                            addEvent($dlgPage);
                            newdialog.height(420);
                        });
                        $('.btnSubmit',$dlgPage).on('click',function(){
                            var appId=[];
                            $.each( $('.a_check.checked',$dlgPage),function(k,v){
                                if($(v).parent().attr('subId')){
                                    appId.push($(v).parent().attr('subId'));
                                }
                            });
                            if ($('.roleName', $dlgPage).val() == "") {
                                $dialog.alert("角色名称不能为空");
                                return;
                            }
                            $ajax.ajax({
                                url: requestUrl.role_add,
                                type: 'post',
                                dataType: 'json',
                                data: {
                                    "name":$('.roleName',$dlgPage).val(),
                                    "appIDs":JSON.stringify(appId) ,
                                    "level":$('select.data_select',$dlgPage).val(),
                                    "active": "true",
                                    "user_id": mining.userinfo.user_id
                                },
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("添加角色成功",'success',function(){  newdialog.close().remove();getList()});
                                    }
                                },
                                error:function(e){
                                    $dialog.alert("添加失败,"+ e.message,'error');
                                }
                            });
                        });
                    }

                }).showModal();
            });
            $('.btnSave',$page).on('click',function(){
                var appId=[];
                $.each( $('.a_check.checked',$page),function(k,v){
                    if($(v).parent().attr('subId')){
                        appId.push($(v).parent().attr('subId'));
                    }
                });
                $ajax.ajax({
                    url: requestUrl.role_update,
                    type: 'post',
                    dataType: 'json',
                    data: {
                        id:$('#tableRole tr.selected').attr('rid'),
                        "name":$('#tableRole tr.selected td:first').text(),
                        "appIDs":JSON.stringify(appId) ,
                        "level":$('select.data_select',$page).val(),
                        "active": "true",
                        "user_id":mining.userinfo.user_id
                    },
                    success: function (result) {
                        if (result.statusCode == 200) {
                            $dialog.alert("保存成功",'success',function(){  getList()});
                        }
                    },
                    error:function(e){
                        $dialog.alert("保存失败,"+ e.message,'error');
                    }
                });
            });

            getList();
            addEvent($page);
            $('#tab li:first', $page).click();

            //权限标签
            function loadPermissions() {
                $ajax.ajax({
                    url: requestUrl.data_getBasic,
                    data:{pageSize:10000},
                    success: function (result) {
                        var dataBasic={};
                        $.each(result.listObj, function (k, v) {
                            if(dataBasic[v.label]){
                                dataBasic[v.label].list.push(v);
                            }else{
                                dataBasic[v.label]={list:[v]};
                            }
                        });
                        loadBasicData(dataBasic);
                    },
                    error: function (result) {

                    }
                });
                function loadBasicData(data){
                    var trs = [];
                    for (var obj in data){
                       var length= data[obj].list.length;
                        $.each( data[obj].list,function(k,v){
                            var label=mining.mappingutils.getLabelName(v) || v.label;
                            var td=k==0?'<td rowspan="'+length+'" title="'+label+'" class="txt-center"><b>' + label + '</b></td>':'';
                            trs.push('<tr tId="'+ v.id+'" label="'+ v.label+'" type="'+ v.type+'" level="'+ v.level+'">'+td+'<td > <span class="sptag">' + (mining.mappingutils.getTypeName(v) || v.type) + '</span>  <span>' + v.level +
                                '</span>  <a class="pull-right subbtn btn-del"><span class="icon icon-delete4"></span> </a><a class="pull-right subbtn btn-edit"><span class="icon icon-edit"></span> </a></td></tr>')

                        });
                    }
                    $('#table_basic').html(trs.join(''));
                }
                $ajax.ajax({
                    url: requestUrl.data_getSpecific,
                    data:{pageSize:10000},
                    success: function (result) {
                        var trs = [];
                        var length=result.listObj.length;
                        $.each(result.listObj, function (k, v) {
                            var td=k==0?'<td rowspan="'+length+'" class="txt-center"><b>版本</b> </td>':'';
                            trs.push('<tr tId="'+ v.id+'" tag="'+ v.tag+'" tname="'+ v.name+'"  level="'+ v.level+'">'+td+'<td> <span class="sptag">' + v.name + '</span> <span> ' + v.level + '</span> '+
                                '<a class="pull-right subbtn btn-del"><span class="icon icon-delete4"></span> </a><a class="pull-right subbtn btn-edit"><span class="icon icon-edit"></span> </a> </td></tr>')
                        });
                        $('#table_specific').html(trs.join(''));
                    },
                    error: function (result) {

                    }
                });
                $ajax.ajax({
                    url: requestUrl.role_getLevel,
                    async: false,
                    success: function (result) {
                        var trs = [];
                        $.each(result.listObj, function (k, v) {
                            var span = [];
                            $.each(v.value, function (index, obj) {
                                span.push('<span>' + obj.name + '</span> &nbsp;&nbsp; ')
                            });
                            trs.push('<tr><td class="txt-center">' + v.key + '</td><td>' + span.join('') + '</td></tr>')
                        });
                        $('#table_level tbody').html(trs.join(''));
                        $('.table_container').mCustomScrollbar({  theme: 'minimal'});
                    },
                    error: function (result) {

                    }
                });
            }
            function loadAppList(data) {
                var lis = [];
                $.each(data, function (index, obj) {
                    lis.push('<li cId="' + obj.key.id + '" class="category">  <b> ' + obj.key.category + '</b> <a  class="catbtn btn-edit"> <span class="icon icon-edit"></span></a>'+
                        '  <a  class="catbtn "><span class="icon icon-add subAdd" ></span> </a>  <a  class="catbtn btn-del"> <span class="icon icon-delete4"></span> </a></li>');
                    $.each(obj.value, function (k, v) {
                        lis.push('<li cId="' + obj.key.id + '" subId="' + v.id + '" class="subcategory" cname="' + v.categoryName + '"> '+
                            ' <span class="subname">' + v.name + '</span> &nbsp;&nbsp; <span class="subdesc">' + v.desc + ' </span> '+
                            ' <a  class="subbtn pull-right btn-sub-del"><span class="icon icon-delete4"></span></a> <a  class="subbtn pull-right btn-sub-edit"><span class="icon icon-edit"></span></a>  </li>');
                    });
                });
                $('.app_list_container').html(' <ul id="per_app_list">'+lis.join('')+'</ul>');
                $('#per_app_list').mCustomScrollbar({  theme: 'minimal'});
            }
            $('.data_list',$page).off('click','.btn-del').on('click','.btn-del',function(){
                var id=$(this).parents('tr').attr('tid');
                var url=requestUrl.data_specific_del;
                if($(this).parents('table').attr('id')=='table_basic'){
                    url=requestUrl.data_basic_del;
                }
                $dialog.confirm({
                    title: '删除数据权限',
                    content: '您确定要删除该权限吗？',
                    ok: function(){
                        $ajax.ajax({
                            url:url ,
                            data: {
                                "id":id
                            },
                            success: function (result) {
                                if (result.statusCode == 200) {
                                    $dialog.alert("删除成功",'success',function(){  loadPermissions()});
                                }
                            },
                            error:function(e){
                                $dialog.alert("删除失败,"+ e.message,'error');
                            }
                        });
                    }
                });
            });
            $('.data_list',$page).off('click','.btn-edit').on('click','.btn-edit',function(){
                var tr=$(this).parents('tr');
                var newdialog = $dialog({
                    title: '修改数据权限 ',
                    content: '<div class="dlg_main">'+
                    '<div ><b> 值</b> &nbsp;<select class="role_control select-value" style="width: 100%"></select> </div> '+
                    '<div style="text-align: center; margin-top: 10px"><button class="btnblue btnSubmit">确定</button></div> </div>',
                    width: 300,
                    height:80,
                    onshow: function () {
                        var $dlgPage = $(this.node);
                        $ajax.ajax({
                            url: requestUrl.getLevel,
                            success: function (result) {
                                var option=[];
                                $.each(result.listObj,function(k,v){
                                    option.push('<option value="'+ v+'" '+ (v==tr.attr('level')?" selected=true ":"")+' >'+ v+'</option>')
                                });
                                $('select.select-value',$dlgPage).html(option.join(''));
                                $('select', $dlgPage).select2({
                                    minimumResultsForSearch: Infinity
                                });
                            },
                            error:function(e){

                            }
                        });

                        $('.btnSubmit',$dlgPage).on('click',function(){
                            var data={},url;
                            if (tr.attr('tag')) {
                                url = requestUrl.data_specific_update;
                                data = {
                                    id: tr.attr('tId'),
                                    tag: tr.attr('tag'),
                                    name: tr.attr('tname'),
                                    level: $('select.select-value', $dlgPage).val()
                                };
                            }
                            if(tr.attr('label')){
                                url = requestUrl.data_basic_update;
                                data = {
                                    id: tr.attr('tId'),
                                    label: tr.attr('label'),
                                    type: tr.attr('type'),
                                    level: $('select.select-value', $dlgPage).val()

                                };
                            }
                            $ajax.ajax({
                                url:url,
                                type: 'post',
                                dataType: 'json',
                                data:data,
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("修改成功",'success',function(){ newdialog.close().remove(); loadPermissions()});
                                    }
                                },
                                error:function(e){
                                    $dialog.alert("修改失败,"+ e.message,'error');
                                }
                            });
                        });
                    }

                }).showModal();

            });

            $('#addData',$page).off('click').on('click',function(){
                var newdialog = $dialog({
                    title: '创建数据权限 ',
                    content: '<div class="dlg_main">'+
                    '<div ><b>类型</b> &nbsp; <select class="role_control select-type"><option value="1">版本</option><option value="2">数据模型</option></select> '+
                    ' &nbsp; <select class="role_control select-tag" style="min-width: 200px"></select>  '+
                    ' &nbsp; <select class="role_control select-model hide select-label"></select>  '+
                    '&nbsp; <select class="role_control select-model hide select-label-type"></select> </div> '+
                    '<div style="margin: 10px 0"><b>&nbsp;&nbsp;&nbsp;&nbsp;值</b> &nbsp;<select class="role_control select-value" style="width: 100%"></select> </div> '+
                    '<div style="text-align: center"><button class="btnblue btnSubmit">确定</button></div> </div>',
                    width: 500,
                    height:150,
                    onshow: function () {
                        var $dlgPage = $(this.node);
                        $ajax.ajax({
                            url: requestUrl.getTag,
                            success: function (result) {
                                var option=[];
                                $.each(result.listObj,function(k,v){
                                    option.push('<option value="'+ v.tag+'" >'+ v.tagName+' ( '+new Date( v.time).format()+' )</option>');
                                });
                                $('select.select-tag',$dlgPage).html(option.join(''));
                            },
                            error:function(e){

                            }
                        });
                        $ajax.ajax({
                            url: requestUrl.getLevel,
                            success: function (result) {
                                var option=[];
                                $.each(result.listObj,function(k,v){
                                    option.push('<option value="'+ v+'">'+ v+'</option>')
                                });
                                $('select.select-value',$dlgPage).html(option.join(''));
                            },
                            error:function(e){

                            }
                        });
                        var mapObj=mining.mappingutils.getClassList();
                        var optionLabel=[];
                        for(var obj in mapObj){
                            for(var o in mapObj[obj]){
                                optionLabel.push('<option type="'+obj+'" value="'+mapObj[obj][o].label+'">'+mapObj[obj][o].label_name+'</option>')
                            }
                        }
                        $('select.select-label',$dlgPage).html(optionLabel.join(''));
                        $('select.select-label',$dlgPage).on('change',function(){
                            var type=$(this).find('option:selected').attr('type'),val=$(this).val();
                            var optionType=[];
                            $.each(mapObj[type][val].children,function(k,v){
                              optionType.push('<option value="'+ v.type+'">'+ v.type_name+'</option>');
                            }) ;
                            $('select.select-label-type',$dlgPage).html(optionType.join('')).select2('val',mapObj[type][val].children[0].type);
                        });

                        $('select', $dlgPage).select2({
                            minimumResultsForSearch: Infinity
                        });
                        $('select.select-tag', $dlgPage).select2();
                        $('.select-type',$dlgPage).on('change',function(){
                            if($(this).val()=='1'){
                                $('.select-tag',$dlgPage).removeClass('hide');
                                $('.select-model',$dlgPage).addClass('hide');
                            }else{
                                $('.select-model',$dlgPage).removeClass('hide');
                                $('.select-tag',$dlgPage).addClass('hide');
                                $('select.select-label',$dlgPage).change();
                            }
                        });
                        $('.btnSubmit',$dlgPage).on('click',function(){
                            var data,url;
                            if($('select.select-type',$dlgPage).val()=='1'){
                                url=requestUrl.data_getSpecific;
                                data= {
                                    tag:  $('select.select-tag',$dlgPage).val(),
                                    name: $('select.select-tag option:selected',$dlgPage).text(),
                                    level: $('select.select-value',$dlgPage).val()
                                };

                            }else{
                                url= requestUrl.data_getBasic;
                                data={
                                    label:   $('select.select-label',$dlgPage).val(),
                                    type:   $('select.select-label-type',$dlgPage).val(),
                                    level:  $('select.select-value',$dlgPage).val()
                                };
                            }
                            $ajax.ajax({
                                url:url ,
                                type: 'post',
                                dataType: 'json',
                                data:data,
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("添加成功",'success',function(){ newdialog.close().remove(); loadPermissions()});
                                    }
                                },
                                error:function(e){
                                    $dialog.alert("添加失败,"+ e.message,'error');
                                }
                            });

                        });
                    }

                }).showModal();
            });
            $('#addApp',$page).off('click').on('click',function(){
                var newdialog = $dialog({
                    title: '创建权限 ',
                    content: '<div class="dlg_main">'+
                    '<div ><b>名称</b> &nbsp; <input type="text" class="role_control txtName" style="width: 80%;"/></div> '+
                    '<div style="text-align: center"><button class="btnblue btnSubmit">确定</button></div> </div>',
                    width: 300,
                    height:90,
                    onshow: function () {
                        var $dlgPage = $(this.node);
                        $('.btnSubmit',$dlgPage).on('click',function(){
                            if ($('.txtName',$dlgPage).val() == "") {
                                $dialog.alert("名称不能为空");
                                return;
                            }
                            $ajax.ajax({
                                url: requestUrl.permissions_add,
                                type: 'post',
                                dataType: 'json',
                                data: {
                                    "name":$('.txtName',$dlgPage).val()
                                },
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("添加成功",'success',function(){ newdialog.close().remove();  iniAppPerm($dlgPage)});
                                    }
                                },
                                error:function(e){
                                    $dialog.alert("保存失败,"+ e.message,'error');
                                }
                            });
                        });
                    }

                }).showModal();
            });

            $('.app_list_container',$page).off('click','.btn-edit').on('click','.btn-edit',function(){
                var btn=$(this);
                var newdialog = $dialog({
                    title: '修改权限 ',
                    content: '<div class="dlg_main">'+
                    '<div ><b>名称</b> &nbsp; <input cid="'+btn.parents('li').attr('cid')+'" type="text" class="role_control txtName" style="width: 80%;" value="'+btn.siblings('b').text()+'"/></div> '+
                    '<div style="text-align: center"><button class="btnblue btnSubmit">确定</button></div> </div>',
                    width: 300,
                    height:90,
                    onshow: function () {
                        var $dlgPage = $(this.node);
                        $('.btnSubmit',$dlgPage).on('click',function(){
                            if ($('.txtName',$dlgPage).val() == "") {
                                $dialog.alert("名称不能为空");
                                return;
                            }
                            $ajax.ajax({
                                url: requestUrl.permissions_update,
                                type: 'post',
                                dataType: 'json',
                                data: {
                                    category_id:$('.txtName',$dlgPage).attr('cid'),
                                    "name":$('.txtName',$dlgPage).val()
                                },
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("修改成功",'success',function(){ newdialog.close().remove();  iniAppPerm($dlgPage)});
                                    }
                                },
                                error:function(e){
                                    $dialog.alert("修改失败,"+ e.message,'error');
                                }
                            });
                        });
                    }

                }).showModal();
            });
            $('.app_list_container',$page).off('click','.btn-del').on('click','.btn-del',function(){
                var btn=$(this);
                $dialog.confirm({
                    title: '删除细分',
                    content: '您确定要删除该权限吗？',
                    ok: function(){
                        $ajax.ajax({
                            url: requestUrl.permissions_del,
                            type: 'get',
                            dataType:'json',
                            data:{"category_id":btn.parents('li').attr('cId')},
                            success: function (result) {
                                if (result.statusCode == 200) {
                                    $dialog.alert("删除成功",'success',function(){ iniAppPerm($page)});
                                }
                            },
                            error:function(e){
                                $dialog.alert("删除失败,"+ e.message,'error');
                            }
                        });
                    }
                });
            });
            $('.app_list_container',$page).off('click','.subAdd').on('click','.subAdd',function(){
                var btn=$(this);
                var newdialog = $dialog({
                    title: '创建细分 ',
                    content: '<div class="dlg_main">'+
                    '<div> <b>名称</b> &nbsp; <input type="text" class="role_control txtName" style="width: 80%;"/></div> '+
                    '<div > <b style="    position: relative;bottom: 50px;">描述</b> &nbsp; <textarea name="" id="desc" cols="30" rows="3" class="role_control" style="width: 80%;"></textarea></div> '+
                    '<div style="text-align: center" ><button class="btnblue btnSubmit">确定</button></div> </div>',
                    width: 300,
                    height:150,
                    onshow: function () {
                        var $dlgPage = $(this.node);
                        $('.btnSubmit',$dlgPage).on('click',function(){
                            var cid=btn.parents('li').attr('cid');
                            if ($('.txtName',$dlgPage).val() == "") {
                                $dialog.alert("名称不能为空");
                                return;
                            }
                            $ajax.ajax({
                                url: requestUrl.app_add,
                                type: 'post',
                                dataType: 'json',
                                data: {
                                    "name":$('.txtName',$dlgPage).val(),
                                    category_id: cid,
                                    desc: $('#desc',$dlgPage).val()
                                },
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("添加成功",'success',function(){ newdialog.close().remove();  iniAppPerm($dlgPage)});
                                    }
                                },
                                error:function(e){
                                    $dialog.alert("保存失败,"+ e.message,'error');
                                }
                            });
                        });
                    }

                }).showModal();
            });
            $('.app_list_container',$page).off('click','.btn-sub-edit').on('click','.btn-sub-edit',function(){
                var btn=$(this);
                var newdialog = $dialog({
                    title: '修改细分 ',
                    content: '<div class="dlg_main">'+
                    '<div> <b>名称</b> &nbsp; <input type="text" class="role_control txtName" style="width: 80%;" value="'+btn.siblings('.subname').text()+'"/></div> '+
                    '<div > <b style="    position: relative;bottom: 50px;">描述</b> &nbsp; <textarea name="" id="desc" cols="30" rows="3" class="role_control" style="width: 80%;"></textarea></div> '+
                    '<div style="text-align: center" ><button class="btnblue btnSubmit">确定</button></div> </div>',
                    width: 300,
                    height:150,
                    onshow: function () {
                        var $dlgPage = $(this.node);
                        $('#desc',$dlgPage).val(btn.siblings('.subdesc').text());
                        $('.btnSubmit',$dlgPage).on('click',function(){
                            var cid=btn.parents('li').attr('cid');
                            var subId=btn.parents('li').attr('subId');
                            if ($('.txtName',$dlgPage).val() == "") {
                                $dialog.alert("名称不能为空");
                                return;
                            }
                            $ajax.ajax({
                                url: requestUrl.app_update,
                                type: 'post',
                                dataType: 'json',
                                data: {
                                    app_id:subId,
                                    "name":$('.txtName',$dlgPage).val(),
                                    category_id: cid,
                                    desc: $('#desc',$dlgPage).val()
                                },
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("修改成功",'success',function(){ newdialog.close().remove();  iniAppPerm($dlgPage)});
                                    }
                                },
                                error:function(e){
                                    $dialog.alert("修改失败,"+ e.message,'error');
                                }
                            });
                        });
                    }

                }).showModal();
            });
            $('.app_list_container',$page).off('click','.btn-sub-del').on('click','.btn-sub-del',function(){
                var btn=$(this);
                $dialog.confirm({
                    title: '删除细分',
                    content: '您确定要删除该权限吗？',
                    ok: function(){
                        $ajax.ajax({
                            url: requestUrl.app_del,
                            type: 'get',
                            dataType:'json',
                            data:{"app_id":btn.parents('li').attr('subId')},
                            success: function (result) {
                                if (result.statusCode == 200) {
                                    $dialog.alert("删除成功",'success',function(){ iniAppPerm($page)});
                                }
                            },
                            error:function(e){
                                $dialog.alert("删除失败,"+ e.message,'error');
                            }
                        });
                    }
                });
            });
            loadPermissions()
        });
    }


    return {
        init: initPage
    }
});