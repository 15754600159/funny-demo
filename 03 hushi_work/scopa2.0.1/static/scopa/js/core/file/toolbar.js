define(function(require, exports, module){
     var fontMin = 12,
          fontMax = 16,
          size = 12,
          navtabModule = require('./filenavtabs'),
          listModule = require('./filelist'),
          showModule = require('core/common/showelement'),
          fileanalyzeModule = require('./fileanalyze'),
          layoutModule = require('./filelayout'),
          $toolbar = $('.page-file .toolbar');

     var toolbarAction = function(){
     	var $toolbar = $('.page-file .toolbar'),
               $page = $('.page-file')

     	// 前进
     	$('.file-redo',$toolbar).off('click').on('click',function(){
               openFileHistory('forward');
               mining.utils.serverLog(445);
          });

          // 后退
          $('.file-undo',$toolbar).off('click').on('click',function(){
               openFileHistory('backward');
               mining.utils.serverLog(446);
          });

     	// 到图析
     	$('.file-tograph',$toolbar).off('click').on('click',function(e){
               mining.utils.stopBubble(e);
               var dd = $('.page-file .content-box').data('data'),
                    etype = mining.mappingutils.getType(dd);
               if(mining.utils.isEmpty(dd) || mining.utils.isEmpty(etype)){
               	 dd = {};
               }else if(etype == 'relation'){
               	var edd = mining.utils.clone(dd),
               		esdd = mining.utils.clone(dd.source),
               		etdd = mining.utils.clone(dd.target);
               	
               	delete edd.source;
               	delete edd.target;
	               	dd = {
	               		e: [dd],
	               		v: [esdd,etdd]
	               	}
               }else{
               	dd = {
               		v: [dd]
               	}
               }
               showModule.show(dd, 'graph');
               mining.utils.serverLog(447);
          });

     	// 到地图
     	$('.file-tomap',$toolbar).off('click').on('click',function(e){
               mining.utils.stopBubble(e);
               var snapshotName = mining.localname.mapSnapshot,
                    snapshotData = mining.utils.localStorage(snapshotName) || [],
                    dd = $('.page-file .content-box').data('data'),
                    etype = mining.mappingutils.getType(dd),
                    transferDataArr = [];
               if(mining.utils.isEmpty(dd) || mining.utils.isEmpty(etype)){
                     dd = {};
               }else if(etype == 'relation'){

                    var edd = mining.utils.clone(dd),
                         esdd = mining.utils.clone(dd.source),
                         etdd = mining.utils.clone(dd.target);
                    
                    delete edd.source;
                    delete edd.target;
                    // transferDataArr.push($.extend(dd, {source: dd.source, target: dd.target}));
                    dd = $.extend(dd, {source: dd.source, target: dd.target});
               }else{
                    // dd = {
                    //      v: [dd]
                    // }
                    // transferDataArr.push(dd);
               }
               snapshotData.pushOnly(dd);
               mining.utils.localStorage(snapshotName, snapshotData);
               mining.utils.hashChange('map');
               mining.utils.serverLog(448);
               // TODO:send to map
               // showModule.show(dragon2.json().elements, 'map');
          });

     	// 文档列表
     	$('.file-local',$toolbar).off('click').on('click',function(){
               fileanalyzeModule.opList();
               mining.utils.serverLog(449);
          });


     	// 上传文档
          $('.file-import',$toolbar).off('click').on('click',function(){
               $dialog({
                    title:'导入文件',
                    width:280,
                    height:50,
                    content:fileanalyzeModule.getTmp('importfile'),
                    okValue: '确定',
                    ok: function(){
                         fileanalyzeModule.uploadFile();
                    },
                    cancelValue: '取消',
                    cancel: true,
                    onclose: function(){}
               }).showModal();
               mining.utils.serverLog(450);
          });
     	// 分析文档
          $('.file-analyze',$toolbar).off('click').on('click',function(){
               var $navCurrent = $('.filenavtabs .tabslist .tab-panel.active');
               if($navCurrent.attr('data-type') == '3'){
                    var docId = $navCurrent.attr('gid');
                    // if($.inArray(docId, fileanalyzed) == -1){fileanalyzed.push(docId);}
                    fileanalyzeModule.anaFile(docId);
               }else{
                    $dialog.alert('请先进入需要分析的文档');
               }
               mining.utils.serverLog(451);
          });
          // 保存文档
     	$('.file-save',$toolbar).off('click').on('click',function(){
               var $navCurrent = $('.filenavtabs .tabslist .tab-panel.active');
               if($navCurrent.attr('data-type') == '3'){
                    var docId = $navCurrent.attr('gid');
                    fileanalyzeModule.saveFile(docId);
               }else{
                    $dialog.alert('请先进入需要保存的文档');
               }
               mining.utils.serverLog(452);
          });

          // 清除已保存的分析数据
          $('.file-delete',$toolbar).off('click').on('click',function(){
               var $navCurrent = $('.filenavtabs .tabslist .tab-panel.active');
               if($navCurrent.attr('data-type') == '3'){
                    var docId = $navCurrent.attr('gid');
                    fileanalyzeModule.clearFile(docId);
               }else{
                    $dialog.alert('请先进入需要清除分析数据的文档');
               }
               mining.utils.serverLog(453);
          });
	}

     var openFileHistory = function(type){
          var fileHistory = mining.utils.localStorage(mining.localname.fileHistory) || {current:0, list:[]},
               snapshot = null;
          
          if(!mining.utils.isEmpty(fileHistory)){
               if(type == 'forward' && fileHistory.current < fileHistory.list.length - 1){
                    snapshot = fileHistory.list[++fileHistory.current];
               }else if(type == 'backward' && fileHistory.current > 0){
                    snapshot = fileHistory.list[--fileHistory.current];
               }
               if(mining.utils.isEmpty(snapshot)) return;
               // mining.utils.openSnapshot(graph, snapshot);

               // var currentId = snapshot.current,
               //      navCurrentData = snapshot.navtabs[currentId],
               //      itemCurrentId = navCurrentData.current,
               //      currentData = snapshot.filedata[itemCurrentId]; 
           
               listModule.refresh();
               if(snapshot){
                    mining.utils.localStorage(mining.localname.fileSnapshot,snapshot);
                    navtabModule.refresh(snapshot);
               }
               mining.utils.localStorage(mining.localname.fileHistory, fileHistory);
          }
     }

     return {
          init: toolbarAction
     }
});