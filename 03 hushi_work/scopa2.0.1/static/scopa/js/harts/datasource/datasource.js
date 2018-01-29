define(function (require) {
    require('harts/common/json2');
    var $page = $('.page-datasource'),
        requestUrl = {
            //list:mining.testBaseUrl+'/harts/task',
            list:mining.testBaseUrl+'/harts/datasource?withcontent=false',
            detail:mining.testBaseUrl+'/harts/datasource',
            upload:mining.testBaseUrl+'/harts/datasource?action=convert',
            addSource:mining.testBaseUrl+'/harts/datasource/location'
        };
    //刷新布局
    var pageResize = function () {
        //TODO
    };
    var sourceNames = [];
    var hdfsList = [];
    /* 初始化 */
    var initPage = function () {

        mining.utils.loadPage($page, function(){
            mining.utils.winResize({name:pageResize});
            console.info('datasource initPage');
            initDataSourceList();
            addEvent();
            seajs.log('数据源');
        });
    };

    var addEvent = function () {
        //表格 编辑
        $('#table_datasource', $page).off('click', 'td.show').on('click', 'td.show', function () {
            console.log('show');
            var name = $(this).parents('tr').data('name');
            $ajax.ajax({
                url: requestUrl.detail + "/" + name,
                async: false,
                success: function(result){
                    var tr=[];
                    /*
                    $.each(result,function(k,v){
                        var index = k + 1;
                        tr.push('<tr data-name="'+ v.name+'"><td>'+ index+'</td><td>'+ v.name+'</td><td>'+ v.createTime+'</td>' + '<td class="show"><span class="icon icon-show"></span>详细</td></tr>');
                    });
                    */
                    $dialog({
                        title:'数据源详情',
                        content:'<div class="datasource_dialog"><div class="content">' +
                        '<div class="row"><span>名称</span><input type="text" class="control dlg_name" value="'+result.name+'"/></div> '+
                        '<div class="row"><span>创建时间</span><input type="text" value="'+result.createTime+'" class="control dlg_desc"/></div>' +
                        '<div class="row"><span>JSON内容</span><textarea name="rule" id="config" cols="30" rows="10" class="txt">' + result.jsonContent + '</textarea>'+
                        '<div class="row"><span>Cona JSON内容</span><textarea name="rule" id="config" cols="30" rows="10" class="txt">' + result.conaJsonContent + '</textarea></div> '+
                        '<div class="row"><table>' + tr.join('') + '</table></div>'+
                        '</div> </div>',
                        width: 400,height:600,
                        cancelValue:'取消',okValue:'确认',
                        ok:function(){
                        },
                        cancel:function(){}
                    }).showModal();
                },
                error: function(result){

                }
            });

        });

        $('#btnAdd', $page).off('click').on('click', function () {
            console.log('add');
            var optionsStr = "";
            for (var i = 0; i < sourceNames.length; i++) {
                optionsStr += (' <option value=' + sourceNames[i] + '>' + sourceNames[i] + '</option>')
            }
            //$('#sources').html(sourceNames.join(''));
            //console.info($('#sources').html());
            var newdialog = $dialog({
                title:'添加数据文件信息',
                content:'<div class="addForm"><span>数据源</span> <select name="sourceList" id="selectedSource" class="select"> '+
                optionsStr +
                '</select></div> ' +
                '<div class="addForm"> <span>hdfs路径</span><input id="hdfs_path" style="width: 98%;"></div> ',
                width: 400,
                onshow: function () {
                    $('#selectedSource').select2({minimumResultsForSearch: Infinity});
                },
                cancelValue:'取消',
                cancel: function() {
                    newdialog.close().remove();
                },
                okValue:'确认',
                ok: function() {
                    var location_arr = $('#hdfs_path').val().split(',');

                    //var postObj={"name":$('#selectedSource').val(),"location":location_arr};
                    $ajax.ajax({
                        url: requestUrl.addSource + '?name='+$('#selectedSource').val(),
                        type: 'POST',
                        contentType: "application/json",
                        data:JSON.stringify(location_arr),
                        success: function (result) {
                            if (result.statusCode == 200) {
                                $dialog.alert("添加location成功",function(){  newdialog.close().remove();});
                            }
                        },
                        error:function(e){
                            if (e.statusCode == 300)    $dialog.alert("location已经存在",'warning');
                            else
                                $dialog.alert("添加失败，"+e.message,'error');
                        }
                    });
                },
                cancel:function(){}
            }).showModal();
        });


        var jsonList = [];

        $('body').off('change', '#json_upload').on('change', '#json_upload', function (event) {
            var input = event.target;
            var infileName = $('#json_upload').val();

            var file_list = [];


            var reader = new FileReader();

            for (var i = 0; i < event.target.files.length; i++) {
                file_list.push(event.target.files[i].name);
                if(i == 0)
                    reader.readAsText(event.target.files[i],"UTF-8");
            }
            var i = 0;
            reader.onload = function() {
                console.log(reader.result.substring(0, 200));
                jsonList.push(reader.result);
                i++;
                if(i < (event.target.files.length))
                    reader.readAsText(event.target.files[i],"UTF-8");
            }

            var node = document.getElementById('output');
            node.innerText = file_list;
        });

        $('#btnUpload', $page).off('click').on('click', function () {
            console.log('upload');

            var mydialog = $dialog({
                title:'上传',
                content:
                    '<form id= "uploadForm" enctype="multipart/form-data" onsubmit="return false;">' +
                    '<input id="json_upload" type="file" accept="application/json" multiple id="fileBox">' +
                    '<div id="output"></div>' +
                    '</form>'
                ,
                width: 400,height:230,
                cancelValue:'取消',okValue:'确认',
                onshow:function(){

                    /*$('#imfile').on('click',function(){
                        $(this).val('');
                    }).on('change',function(){
                        var path = $("#imfile").val();
                        if(path.endsWith(".json")){
                            $.getJSON(path, function(data){
                                var aa = 0;
                            });
                            jsonList.push(path);
                        }

                        uploadFileAction();
                    });*/
                },
                ok:function(){
                    console.log(jsonList);
                    $ajax.ajax({
                        url: requestUrl.upload,
                        type: 'POST',
                        data:     JSON.stringify(jsonList),
                        contentType: "application/json",
                        async: false,
                        success: function(result){
                            initDataSourceList();
                            $dialog({
                                title:'信息',
                                content:'已添加',
                                okValue:'确认'
                            }).showModal();
                        },
                        error: function(result){
                        }
                    });
                },
                cancel:function(){}
            }).showModal();
        });
    };

    var initDataSourceList = function () {
        console.info('initDataSourceList');
        $ajax.ajax({
            url: requestUrl.list,
            async: true,
            success: function(result){
                console.info('initDataSourceList success');
                sourceNames = [];
                var tr=[];
                $.each(result,function(k,v){
                    var index = k + 1;
                    sourceNames.push(v.name);
                    tr.push('<tr data-name="'+ v.name+'"><td>'+ index+'</td><td>'+ v.id+'</td><td>'+ v.name+'</td><td>'+ v.createTime+'</td>' + '<td class="show"><span class="glyphicon glyphicon-eye-open"></span>详细</td></tr>');
                });
                $('#table_datasource').find('tbody').html(tr.join(''));
            },
            error: function(result){
                console.info('initDataSourceList error');
            }
        });
        console.info('initDataSourceList done');
    };
    return {
        init: initPage
    }

});