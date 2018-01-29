define(function (require) {
    var $page = $('.page-method'),
        graphModule = new (require('console/common/graphchart/graphchart'))(),
        requestUrl = {
            getRules: mining.baseurl.console + '/rule/get',
            getBatch: mining.baseurl.console + '/batchShow/all'
        };
    var graph=null;
    require('jqueryui');
    require('select2');
    require('cytoscape-edgehandles');
    require('cytoscape-qtip');
    require('jquery-qtip');
    //刷新布局
    var pageResize = function () {
        //TODO
    }

    /* 初始化 */
    var initPage = function () {
        mining.utils.loadPage($page, function () {
            //	mining.utils.winResize({name:pageResize});
            function getAllRules() {
                $ajax.ajax({
                    url: requestUrl.getRules,
                    async: false,
                    success: function (result) {
                        var listHtml = [];
                        $.each(result.listObj, function (k, v) {
                            listHtml.push('<li class="item" key="' + v.name + '" listType="rule"><span class="icon-' + mining.mappingutils.getName(v) + '"></span> ' + v.cname + '</li>');
                        });
                        $('#listContainer_rule').html(listHtml.join(''));
                        $('#select_status').select2({minimumResultsForSearch: Infinity});
                    },
                    error: function (result) {

                    }
                });
            }

            function getAllBatch() {
                $ajax.ajax({
                    url: requestUrl.getBatch,
                    async: false,
                    success: function (result) {
                        var listHtml = [];
                        $.each(result.listObj, function (k, v) {
                            listHtml.push('<li class="item" key="' + v.name + '" listType="tactics"><span class="icon-' + mining.mappingutils.getName(v) + '"></span> ' + v.cname + '</li>');
                        });
                        $('#listContainer_batch').html(listHtml.join(''));
                    },
                    error: function (result) {

                    }
                });
            }
            function getRule(rule) {
                var trs = [];
               /* for (var i = 1; i < 4; i++) {
                    trs.push('<tr><td>' + i + '</td><td></td><td></td><td></td><td></td><td></td><td></td><td class="edit"><span class="icon icon-edit"></span> </td></tr>');
                }
                $('#table_method tbody', $page).html(trs.join(''));*/
            }

            function setCurrentClass(obj) {
                $(obj).siblings().removeClass('current');
                $(obj).addClass('current');
            }

            function iniPic() {
                 graph = graphModule.init({
                    container: $('#pic'),
                    edgehandles: true,
                  /*  dblclickCallback: function(ev){
                        $('.nodeInfo').html('算子=entity_by_agg 输入：实体=[中间结果]人 事件=[数据源]高铁出行 实体标识=乘客 条件=高铁出行.时间 ');
                        $('.nodeInfo').css({'top':event.clientY+'px','left':event.clientX-100+'px','display':'block'});

                    },*/
                    elements: {
                        nodes: []
                    },

                    style: [
                        {
                            selector: 'node',
                            css: {
                                'content': 'data(name)',
                                'background-color': 'rgba(255, 255, 255, 0)',
                                'font-size':'12px',
                                'font-family': 'Microsoft Yahei',
                                'color': '#707070',
                                'text-valign': 'bottom',
                                'text-halign': 'center'
                            }
                        },
                        {
                            selector: 'node.entity_operator',
                            css: {
                                'width': '60px',
                                'height': '60px',
                                'shape': 'circle'
                            }
                        },
                        {
                            selector: 'node.event_operator',
                            css: {
                                'width': '45px',
                                    'height': '45px',
                                    'shape': 'rectangle',
                                    'background-opacity': 0,
                                    'background-width': '45px',
                                    'background-height': '45px'

                            }
                        },
                        {
                            //实体 node  样式
                            selector: 'node.operator',
                            css: {
                                'width': '120px',
                                'height': '60px',
                                'shape': 'rectangle',
                                'background-opacity': 0,
                                'background-width': '120px',
                                'background-height': '60px'
                            }
                        },
                        {
                            selector: 'edge',
                            css: {
                                //连线宽度
                                'width': 1,
                                //连线的起点 形状、颜色
                                'source-arrow-shape': 'circle',
                                'source-arrow-color': '#7a9ee5',
                                //连线的终点 形状、颜色
                                'target-arrow-shape': 'triangle',
                                'target-arrow-color': '#7a9ee5',
                                //连线的颜色
                                'line-color': '#7a9ee5',
                                //line-style : The style of the edge's line; may be solid, dotted, or dashed.
                                'line-style':'dotted'
                            }
                        },
                        // some style for the ext
                        {
                            //启用 edge 时，鼠标滑过样式
                            selector: '.edgehandles-hover',
                            css: {
                                'background-color': '#7f82c8'
                            }
                        },
                        {
                            //源样式
                            selector: '.edgehandles-source',
                            css: {
                               /* 'border-width': 1,
                                'border-color': '#0e137b'*/
                            }
                        },
                        {	//目标样式
                            selector: '.edgehandles-target',
                            css: {
                                'border-width': 1,
                                'border-color': '#7a9ee5'

                            }
                        },
                        {
                            //预览;拖动时；
                            selector: '.edgehandles-preview, .edgehandles-ghost-edge',
                            css: {
                                'line-color': '#7a9ee5',
                                'line-style': 'dashed',
                                'target-arrow-color': '#7a9ee5',
                                'source-arrow-color': '#7a9ee5'
                            }
                        }
                    ]
                });
             /*   graph.edgehandles({
                    // options go here
                    //圆点的大小
                    handleSize: 10, // the size of the edge handle put on nodes
                    //圆点的颜色
                    handleColor: '#7f82c8', // the colour of the handle and the line drawn from it
                });*/

            }
            function showTip(){
                graph.elements('.operator').qtip({
                    content: function(){
                      return  this.data().data.lineinfo
                    },
                    position: {
                        my: 'top center',
                        at: 'bottom center'
                    },
                    style: {
                        classes: 'qtip-bootstrap',
                        tip: {
                            width: 16,
                            height: 8
                        }
                    }
                });
            }
            var addEvent = function () {
                $('.listContainer', $page).delegate('li', 'click', function (ev) {
                    setCurrentClass(this);

                    if ($(this).attr('listType') == 'rule') {
                        $('.d_rule').removeClass('hidden');
                        $('.d_tactics').addClass('hidden');
                        getRule($(this).attr('key'));
                    }
                });
                //表格 编辑
                $('#table_method', $page).off('click', 'td.edit span').on('click', 'td.edit span', function () {
                    $('.method', $page).css('display', 'none');
                    $('.page', $page).css('display', 'block');
                    iniPic();
                    var tds=$(this).parents('tr').children();
                    $('#btnSave', $page).attr('method-name',tds.eq(1).text()).attr('method-desc',tds.eq(2).text()).attr('method-out',tds.eq(3).text()).attr('method-rule',tds.eq(6).text()).attr('index',$(this).parents('tr').attr('index'));
                });
                $('#btnBack', $page).on('click', function () {
                    $('.method', $page).css('display', 'block');
                    $('.page', $page).css('display', 'none');
                });
                $('#btnAdd', $page).on('click', function () {
                    $('.method', $page).css('display', 'none');
                    $('.page', $page).css('display', 'block');
                    iniPic();
                    var that= $('#btnSave', $page);
                   that.attr('method-name','').attr('method-desc','').attr('method-out','').attr('method-rule','').attr('index','');
                });
                $('#btnSave', $page).on('click', function () {
                    var that=$(this);
                    var mname=that.attr('method-name')?that.attr('method-name'):'',mdesc=that.attr('method-desc')?that.attr('method-desc'):'',mout=that.attr('method-out')?that.attr('method-out'):'',
                        mrule=that.attr('method-rule')?that.attr('method-rule'):'';
                    var $dlg = $dialog({
                        title:'保存战法',
                        content:'<div class="method_dialog"><div class="content"><div class="row"><span>战法名称</span><input type="text" class="control dlg_name" value="'+mname+'"/></div> '+
                        '<div class="row"><span>战法描述</span><input type="text" value="'+mdesc+'" class="control dlg_desc"/></div> <div class="row"><span>战法输出</span><input type="text" value="'+mout+'" class="control dlg_out"/></div>'+
                        '<div class="row"><span>运行规则</span><input type="text" class="control dlg_rule" value="'+mrule+'"/></div>  </div> </div>',
                        width: 400,height:230,
                        cancelValue:'取消',okValue:'确认',
                        ok:function(){
                            $('.method', $page).css('display', 'block');
                            $('.page', $page).css('display', 'none');
                            var time=new Date();
                            ///    /home/workspace/hdfs/unicon_com/12054/
                            if(that.attr('index'))
                            {
                                $('#table_method tbody tr', $page).eq(that.attr('index')-1).html('<td>' + that.attr('index')+ '</td><td>'+$('.dlg_name').val()+'</td><td>'+$('.dlg_desc').val()+'</td><td>'+$('.dlg_out').val()+'</td><td>admin</td><td>'+time.getFullYear()+'.'+(time.getMonth()+1)+'.'+time.getDate()+'</td><td>'+$('.dlg_rule').val()+'</td><td class="edit"><span class="icon icon-edit"></span> </td>');
                            }else{
                                var length=$('#table_method tbody tr', $page).length
                                $('#table_method tbody', $page).append('<tr index="'+(length+1)+'"><td>' + (length+1)+ '</td><td>'+$('.dlg_name').val()+'</td><td>'+$('.dlg_desc').val()+'</td><td>'+$('.dlg_out').val()+'</td><td>admin</td><td>'+time.getFullYear()+'.'+(time.getMonth()+1)+'.'+time.getDate()+'</td><td>'+$('.dlg_rule').val()+'</td><td class="edit"><span class="icon icon-edit"></span> </td></tr>');

                            }
                                                 //  localStorage.setItem( '','');
                        },
                        cancel:function(){}

                    }).showModal();
                               });
                //编辑 弹窗框
                $(document).off('click','.qtip-content .edit').on('click','.qtip-content .edit',function(){
                    var p=$(this).parent();
                    var container= p.parent();
                    var detail={'name':container.find('.op_name').text(),'id':container.attr('nid'),'op_entity':container.find('.op_entity').text(),'op_event':container.find('.op_event').text(),
                    'source':container.find('.source').text(),'source_1':container.find('.source_1').text(),'source_2':container.find('.source_2').text(),
                    'op_1':container.find('.op_1').text(),'op_2':container.find('.op_2').text()};
                   openDialog(p.attr('text'), p.attr('type'),detail,true);

                });
                $(document).off('click','.qtip-content .del').on('click','.qtip-content .del',function(){
                    graphModule.delelements(':selected');
                });
            }

            function setAccordion() {
                var icons = {
                    header: "data-icon down",
                    activeHeader: "data-icon up"
                };
                $("#accordion", $page).accordion({heightStyle: "content", icons: icons, active: 0});
             //   $(".accordion", $page).accordion({heightStyle: "content", icons: icons, active: 0});
            }
            function drop(){
                $("#accordion1 li").draggable({
                    appendTo: "body",
                    helper: "clone"
                });
                $("#pic").droppable({
                    drop: function (event, ui) {
                        var type = ui.draggable.attr('type');
                        var text= ui.draggable.text();
                        if (type == 'filter-operator' || type == 'relation-operator' || type == 'sum') {
                            openDialog(text,type);
                        }
                       else{
                            addNode(text,type);
                        }
                    }
                });
            }
            var getOptions=function(data,selected){
                var op_options=[];
                $.each(data,function(index,item){
                    var select=(selected==item.data().name||selected==item.data().data.name)?'selected="true"':'';
                    op_options.push('<option value="'+item.data().id+'"  x="'+item.data().data.position.x+'" y="'+item.data().data.position.y+'" '+select+'>'+item.data().data.name+'</option>' );
                });
                return op_options.join('');
            }
            function openDialog(typeText,type,detail,flag){
                var evs=graph.$('.event_operator');var ens=graph.$('.entity_operator');
                var  ev_options=getOptions(graph.$('.event_operator'),detail&&detail.op_event?detail.op_event:''),
                en_options=getOptions(graph.$('.entity_operator'),detail&&detail.op_entity?detail.op_entity:'');
                var operators=graph.$('.operator');
                var source=evs.toArray().concat(ens.toArray());
                var name=detail?detail.name:'',id=detail?detail.id:'';

                var title='<div class="title"><span>条件设置</span></div>';
                var toolbar='<div class="toolbar"> <button  id="btnCancel" class="btn">取消</button><button id="btnPrev" class="btn btnstep">上一步</button> <button id="btnNext" class="btn btnstep">下一步</button> <button id="btnOk" class="btn">确定</button>  </div>';
                var step1='<div class="step1"> <div class="row"><span>算子名称</span> <input type="text" class="control opname" value="'+name+'"/> </div><div class="row"><span>实体数据源</span> <select class="control en_select">'+en_options+'</select></div> '+
                    '<div class="row"><span>事件数据源</span> <select class="control ev_select">'+ev_options+'</select></div> <div class="row"><span>实体标识</span> <select class="control"><option>A</option></select></div></div>';

                var unary_relate='<div class="content"> '+step1+
                      '<div class="step2"><div class="topbar">满足 <select class="control"><option>全部</option></select> 以下 <button class="btn">清楚全部</button></div><ul class="list"> '+
                    '<li><select class="control"><option>主体</option></select>的<select class="control"><option>属性</option></select> <select class="control"><option>=</option></select><input type="text"  class="control"/>'+
                    '<button class="btnAdd btn"><span class="icon icon-add"></span></button> <button class="btnRemove btn"><span class="icon icon-delete3"></span></button></li>'+
                    '<li><select class="control"><option>主体</option></select>的<select class="control"><option>属性</option></select> <select class="control"><option>=</option></select><input type="text" class="control"/>'+
                    '<button class="btnAdd btn"><span class="icon icon-add"></span></button> <button class="btnRemove btn"><span class="icon icon-delete3"></span></button></li>'+
                    '</ul> <div class="topbar">描述</div> <textarea  class="multitxt control"></textarea> </div></div>';
                var join_relation='<div class="content only"><div class="row"><span>算子名称</span> <input type="text"  class="control opname"  value="'+name+'"/> </div><div class="row"><span>算子1</span> <select class="control op_select_1">'+getOptions(operators,detail&&detail.op_1?detail.op_1:'')+'</select></div> '+
                    '<div class="row"><span>算子2</span> <select  class="control op_select_2">'+getOptions(operators,detail&&detail.op_2?detail.op_2:'')+'</select></div> </div>';

                var select='<div class="content"><div class="step1"> <div class="row"><span>算子名称</span> <input type="text" class="control opname"  value="'+name+'"/> </div> '+
                    '<div class="row"><span>实体/事件数据源</span> <select class="control source_select">'+  getOptions(source,detail&&detail.source?detail.source:'')+'</select></div></div>'+
                    '<div class="step2"> <div class="topbar tab"><button disabled>条件设定</button><button>类SQL描述</button></div><textarea  class="multitxt control mheight"></textarea></div>'+
                    '<div class="step3"> <table><thead><tr><td><input type="checkbox"/></td><td>字段名</td><td><input type="checkbox"/></td><td>字段名</td></tr></thead>'+
                    '<tbody><tr><td><input type="checkbox"/></td><td>name</td><td><input type="checkbox"/></td><td>name</td></tr></tbody></table></div></div>';
                var select_by_join='<div class="content"><div class="step1"> <div class="row"><span>算子名称</span> <input type="text" class="control opname"  value="'+name+'"/> </div> '+
                    '<div class="row"><span>数据源1</span> <select class="control source_select_1">'+getOptions(source.concat(operators.toArray()),detail&&detail.source_1?detail.source_1:'')+'</select></div><div class="row"><span>数据源2</span> '+
                    '<select class="control source_select_2">'+getOptions(source,detail&&detail.source_2?detail.source_2:'')+'</select></div></div>'+
                    '<div class="step2"> <textarea  class="multitxt control mheight"></textarea></div>'+
                    '<div class="step3"> <table><thead><tr><td><input type="checkbox"/></td><td>字段名</td><td><input type="checkbox"/></td><td>字段名</td></tr></thead>'+
                    '<tbody><tr><td><input type="checkbox"/></td><td>name</td><td><input type="checkbox"/></td><td>name</td></tr></tbody></table></div></div>';
                var event_by_entity='<div class="content"> '+step1+
                    '<div class="step2"> <div class="topbar">描述</div> <textarea  class="multitxt control mheight"></textarea> </div>'+
                    '<div class="step3"> <table><thead><tr><td><input type="checkbox"/></td><td>字段名</td><td><input type="checkbox"/></td><td>字段名</td></tr></thead>'+
                    '<tbody><tr><td><input type="checkbox"/></td><td>name</td><td><input type="checkbox"/></td><td>name</td></tr></tbody></table></div></div>';
                var event_by_agg_entity='<div class="content"> '+step1+
                    '<div class="step2"><ul class="list"> '+
                    '<li><select class="control"><option>主体</option></select>的<select class="control"><option>属性</option></select> <select class="control"><option>=</option></select><input type="text"  class="control"/>'+
                    '<button class="btnAdd btn"><span class="icon icon-add"></span></button> <button class="btnRemove btn"><span class="icon icon-delete3"></span></button></li>'+
                    '<li><select class="control"><option>主体</option></select>的<select class="control"><option>属性</option></select> <select class="control"><option>=</option></select><input type="text" class="control"/>'+
                    '<button class="btnAdd btn"><span class="icon icon-add"></span></button> <button class="btnRemove btn"><span class="icon icon-delete3"></span></button></li>'+
                    '</ul> <div class="topbar">描述</div> <textarea  class="multitxt control"></textarea> </div>'+
                    '<div class="step3"> <table><thead><tr><td><input type="checkbox"/></td><td>字段名</td><td><input type="checkbox"/></td><td>字段名</td></tr></thead>'+
                    '<tbody><tr><td><input type="checkbox"/></td><td>name</td><td><input type="checkbox"/></td><td>name</td></tr></tbody></table></div></div>';
                var getHtml=function(type){
                    var content={'unary_relate':unary_relate,'join_relation':join_relation,'select':select,'event_by_entity':event_by_entity,'event_by_agg_entity':event_by_agg_entity,'select_by_join':select_by_join};
                    if(content[type]){
                        return  '<div class="method_dialog" nid="'+id+'">'+title+content[type]+toolbar+' </div>';
                    }
                };
                var content=getHtml(typeText);
                if(content){
                    var $dlg = $dialog({
                        content:content,
                        width: 800,height:380,
                        onshow: function(){
                            var $page = $(this.node);
                            $('.step1',$page).addClass('show').siblings().addClass('hide');

                            $('.list',$page).mCustomScrollbar({
                                theme: 'minimal'
                            });
                            if($('.content',$page).hasClass('only')){
                                $('.btnstep').css('display','none');
                            }
                            $page.on('click','#btnCancel',function(){
                                $dlg.close().remove();
                            });
                            $page.on('click','#btnNext',function(){
                                var current=$('.show',$page);
                                if(current.hasClass('step1')){
                                    $('.step2',$page).removeClass('hide').addClass('show').siblings().addClass('hide').removeClass('show');
                                }else{
                                    $('.step3',$page).removeClass('hide').addClass('show').siblings().addClass('hide').removeClass('show');
                                }
                            });
                            $page.on('click','#btnPrev',function(){
                                var current=$('.show',$page);
                                if(current.hasClass('step3')){
                                    $('.step2',$page).removeClass('hide').addClass('show').siblings().addClass('hide').removeClass('show');
                                }else{
                                    $('.step1',$page).removeClass('hide').addClass('show').siblings().addClass('hide').removeClass('show');
                                }
                            });
                            $page.on('click','#btnOk',function(){
                                var id= mining.utils.randomInt(0, 99999);
                                var obj=getPositon(typeText,$page);
                                obj.id=id;
                                obj.info=createInfo(typeText,type,$page,id);
                                obj.name=$('.opname',$page).val();
                                if(!flag){
                                    addNode(typeText,type,obj);
                                    addLine($page,id,typeText);
                                }else
                                {
                                   var nodes= graph.elements('.operator');
                                    $.each(nodes,function(index,item){
                                        if(item.data().id==$('.method_dialog',$page).attr('nid'))
                                        {
                                            item.data().data.lineinfo=createInfo(typeText,type,$page,item.data().id);
                                            item.data().name=$('.method_dialog .opname',$page).val()+'('+typeText+')';
                                        }
                                        graphModule.refresh('.operator');
                                    });
                                }
                                $dlg.close().remove();
                            });
                            $page.off('click','.btnAdd').on('click','.btnAdd',function(){
                                $(this).parent().parent().append($(this).parent().clone()) ;
                            });
                            $page.off('click','.btnRemove').on('click','.btnRemove',function(){
                                $(this).parent().remove() ;
                            })
                        }
                    }).showModal();
                }
            }
            function getPositon(typeText,$page){
                var obj={x:0,y:0};
                if (typeText == 'unary_relate' ||typeText=='event_by_entity'||typeText=='event_by_agg_entity') {
                    var ev=$('.ev_select',$page).find("option:selected"),en=$('.en_select',$page).find("option:selected");
                    obj.x=Number(ev.attr('x'))+200;
                    obj.y=ev.attr('y')-(ev.attr('y')-en.attr('y'))/2 ;
                }
                if (typeText == 'join_relation' ) {
                    var op1=$('.op_select_1',$page).find("option:selected"),op2=$('.op_select_2',$page).find("option:selected");
                    obj.x=Number(op1.attr('x'))+200;
                    obj.y=op2.attr('y')-(op2.attr('y')-op1.attr('y'))/2 ;
                }
                if(typeText=='select'){
                    var source=$('.source_select',$page).find("option:selected")
                    obj.x=Number(source.attr('x'))+200;
                    obj.y=source.attr('y')-0;
                }
                if(typeText=='select_by_join'){
                    var source1=$('.source_select_1',$page).find("option:selected"),source2=$('.source_select_2',$page).find("option:selected");
                    obj.x=Number(source1.attr('x'))+200;
                    obj.y=source2.attr('y')-(source2.attr('y')-source1.attr('y'))/2 ;
                }
                return obj;
            }
            function createInfo(text,type,$page,id){
                var condition=[];
                var list= $('.list li',$page);
                $.each(list,function(k,v){
                    var control=$(v).find('.control');
                    var cond=[];
                    $.each(control,function(index,obj){
                        cond.push('<span>'+$(obj).val()+'</span>');
                    });
                    condition.push(cond.join(''));
                });
                var content='';
                if(text=='unary_relate'||text=='event_by_entity'||text=='event_by_agg_entity'){
                    content= '<div><strong>输入：</strong>实体=<span class="op_entity">'+$('.en_select',$page).find("option:selected").text()+'</span></div>'+
                        '<div>事件=<span class="op_event">'+$('.ev_select',$page).find("option:selected").text()+'</span></div>';
                }
                if(text=='join_relation'){
                    content='<div><strong>输入：</strong>算子1=<span class="op_1">'+$('.op_select_1',$page).find("option:selected").text()+'</span></div>'+
                    '<div><strong>输入：</strong>算子2=<span class="op_2">'+$('.op_select_2',$page).find("option:selected").text()+'</span></div>';
                }
                if(text=='select'){
                    content='<div><strong>输入：</strong>数据源=<span class="source">'+$('.source_select',$page).find("option:selected").text()+'</span></div>';
                }
                if(text=='select_by_join'){
                    content='<div><strong>输入：</strong>数据源1=<span class="source_1">'+$('.source_select_1',$page).find("option:selected").text()+'</span></div>'+
                        '<div><strong>输入：</strong>数据源2=<span class="source_2">'+$('.source_select_2',$page).find("option:selected").text()+'</span></div>';
                }
                var info='<div nid="'+id+'"> <div type="'+type+'" text="'+text+'" style=" text-align: right;" ><span class="icon icon-edit edit" ></span><span class="icon icon-delete3 del"></span> </div>'+
                    '<div><strong>算子</strong>=<span class="op_name">'+$('.opname',$page).val()+'</span></div>'+
                    content+
                    '<div>条件='+condition.join(' and ')+'</div></div> </div>';
                return info;
            }
            function addNode(text,type,obj){
                var nodedata = {e: [], v: []};
                nodedata.v.push({
                    gid:obj?obj.id: mining.utils.randomInt(0, 99999),
                    "label": "person",
                    "type": "common",
                    "xm":obj?obj.name+'('+text+')':text,name:obj?obj.name:text,
                    "photoUrl": "../static/scopa/theme/default/images/console/" + type + ".png",
                    "position": {"x":obj?obj.x: event.offsetX, "y": obj?obj.y:event.offsetY},
                    "etype": "entity",lineinfo:obj?obj.info:'',
                    "classes": (function (type) {
                        if (type == 'filter-operator' || type == 'relation-operator' || type == 'sum') {
                            return 'operator';
                        }
                        //添加 class
                        return type.replace('-','_');
                    })(type)
                });
                graphModule.appenddata(nodedata);
                showTip();
            }
            function addLine($page,id,typeText){
                var 	nodedata = {e: [], v: []};
                if (typeText == 'unary_relate' ||typeText=='event_by_entity'||typeText=='event_by_agg_entity') {
                    nodedata.e.push( {
                        gid:  mining.utils.randomInt(0, 99999),
                        etype: 'relation',
                        label: '',
                        from: $('.en_select',$page).val(),
                        to: id
                    },{
                        gid:  mining.utils.randomInt(0, 99999),
                        etype: 'relation',
                        label: '',
                        from:$('.ev_select',$page).val() ,
                        to: id
                    });

                }
                if (typeText == 'join_relation' ) {
                    nodedata.e.push( {
                        gid:  mining.utils.randomInt(0, 99999),
                        etype: 'relation',
                        label: '',
                        from: $('.op_select_1',$page).val(),
                        to: id
                    },{
                        gid:  mining.utils.randomInt(0, 99999),
                        etype: 'relation',
                        label: '',
                        from:$('.op_select_2',$page).val() ,
                        to: id
                    });
                }
                if(typeText=='select'){
                    nodedata.e.push( {
                        gid:  mining.utils.randomInt(0, 99999),
                        etype: 'relation',
                        label: '',
                        from: $('.source_select',$page).val(),
                        to: id
                    });
                }
                if(typeText=='select_by_join'){
                    nodedata.e.push( {
                        gid:  mining.utils.randomInt(0, 99999),
                        etype: 'relation',
                        label: '',
                        from: $('.source_select_1',$page).val(),
                        to: id
                    },{
                        gid:  mining.utils.randomInt(0, 99999),
                        etype: 'relation',
                        label: '',
                        from:$('.source_select_2',$page).val() ,
                        to: id
                    });
                }

                graphModule.appenddata(nodedata);
            }
            var ini = function () {
                getAllRules();
                getAllBatch();
                addEvent();
                setAccordion();
                drop();

                $('#select_status').select2({minimumResultsForSearch: Infinity});
                $('#listContainer_rule li').first().click();


            }
            ini();
        });
    }


    return {
        init: initPage
    }
});