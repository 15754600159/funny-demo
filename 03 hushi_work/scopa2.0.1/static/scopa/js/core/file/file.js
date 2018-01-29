define(function(require){
	var $page = $('.page-file'),
		layoutModule = require('./filelayout'),
		listModule = require('./filelist'),
		navtabModule = require('./filenavtabs'),
		toolbarModule = require('./toolbar');
	
	/* 初始化档案 */
    var initPage = function(){
    	$('.archives').addClass('subpage page-file').attr('template', 'core/file');
    	$page = $('.page-file');
    	// var a = require('./testdata');
    	// mining.utils.localStorage(mining.localname.fileSnapshot,a);

    	mining.utils.loadPage($page, function(){
    		$page.data('module', {snapshot:initSnapshot});
    		initSnapshot();
    	});
    	// 权限
        if(!mining.utils.hasRoleForAction('viewFile')){
            $('.toolbar .file-local',$page).addClass('hidden');
        }
        if(!mining.utils.hasRoleForAction('importFile')){
            $('.toolbar .file-import',$page).addClass('hidden');
        }
    }

    var initSnapshot = function(){
		var fileSnapshot = mining.utils.localStorage(mining.localname.fileSnapshot) || {};
		if(!fileSnapshot.navtabs)fileSnapshot.navtabs = {};
		if(!fileSnapshot.filedata)fileSnapshot.filedata = {};
		if(!fileSnapshot.filecount)fileSnapshot.filecount = {};
		// if(!mining.utils.isEmpty(fileSnapshot.navtabs) && (!fileSnapshot.current || fileSnapshot.current.length == 0)){
		// 	$.each(fileSnapshot.navtabs,function(k,v){
		// 		fileSnapshot.current = k;
		// 		return false;
		// 	});
		// }
		// mining.utils.localStorage(mining.localname.fileSnapshot, fileSnapshot);
 
		seajs.log('档案');
		layoutModule.init();
		listModule.init({
			clickCallback: function(data){
				data.itemData.itemType = data.itemType;
				layoutModule.show(data.itemData);
				mining.utils.updateFileData('changeItem',{tabId:data.tabData.tabid,itemId:data.itemData.gid || data.itemData.label.id});
			},
			dblclickCallback: function(data){
				mining.utils.updateFileData('add',{dataArr:[data.itemData],tabType:data.itemType},function(result){
					navtabModule.add(result,true);
				});
			},
			delCallback: function(data){
				var obj = {
					tabId: data.tabData.tabid,
					dataIdArr: []
				};
				$.each(data.itemData,function(i,n){
					obj.dataIdArr.pushOnly(n.gid || n.label.id);
				});
				mining.utils.updateFileData('del',obj);
			}
		});
		navtabModule.init({
			snapshot: fileSnapshot,
			clickCallback: function(data){
				layoutModule.refresh();
				listModule.refresh();
				fileSnapshot = mining.utils.localStorage(mining.localname.fileSnapshot);
				if(data.tabType != 3){
					var item = fileSnapshot.navtabs[data.tabId];
					item.filedata = {};
					item.groupdata = {};
					$.each(item.filelist,function(i,n){
						item.filedata[n] = fileSnapshot.filedata[n];
					});
					$.each(item.grouplist,function(i,n){
						item.groupdata[n] = fileSnapshot.filedata[n];
					});
					
					listModule.refresh(item);
				}else{
					$('.filelist[type="group"]',$page).addClass('hidden');
                	$('.filelist',$page).height('cacl(100% / 2)');
					layoutModule.show(data);
				}
				mining.utils.updateFileData('changeTab',{tabId:data.tabId});
			},
			addCallback: function(data){
				// mining.utils.updateFileData('add',{dataArr:[obj],tabType:'3'});
			},
			delCallback: function(data){
				fileSnapshot = mining.utils.localStorage(mining.localname.fileSnapshot);
				if(data.tabType == '3'){
					var docId = data.gid,
						fileAnalyze = mining.utils.localStorage(mining.localname.fileAnalyze) || {};
	                if(fileAnalyze[docId]){
	                	delete fileAnalyze[docId];
	                }
                	mining.utils.localStorage(mining.localname.fileAnalyze,fileAnalyze);
				}
				var obj = {
					tabId: data.tabId,
					dataIdArr: fileSnapshot.navtabs[data.tabId].filelist.concat(fileSnapshot.navtabs[data.tabId].grouplist)
				};
				mining.utils.updateFileData('del',obj);
				var snapshot = mining.utils.localStorage(mining.localname.fileSnapshot) || {};
				if(mining.utils.isEmpty(snapshot) || mining.utils.isEmpty(snapshot.navtabs)){
					listModule.refresh();
				}
			}
		});
		toolbarModule.init();
	}
    
    return {
    	init: initPage
    }
});