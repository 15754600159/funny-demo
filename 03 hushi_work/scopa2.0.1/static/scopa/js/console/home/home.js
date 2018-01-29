define(function (require) {
	/*---------- 首页 ----------*/

	var createChart = require('./createChart');
	var $page = $('.page-home'),
	requestUrl =mining.baseurl.console + '/system/all';


	var initPage = function () {
		mining.utils.loadPage($page, function () {
			var setDataInfo = function (data) {
				$.each(data, function (k, obj) {
					$('.' + obj.name).find('.num').text(obj.number);
					$('.' + obj.name).find('.typeNum').text(obj.type.length);

					if(obj.type.length>0)
						createChart($('.' + obj.name).find('.chart')[0], obj.type);
				})
			};
			function  getDataList(){
				$ajax.ajax({
					url: mining.baseurl.cona + '/cona-web/api/v1/origin_tables/statistic',
					async: false,
					success: function(result){
						var tr = [];
						$.each(result, function (k, v) {
							tr.push('<tr><td>' + v.originTableCn + '</td><td>' + v.originTableEn + '</td><td>' + v.incrementalType + '</td>'+
								'<td> '+ v.updateStatus+'</td><td>'+ v.updateDuration+'</td><td>'+ v.finalImportTime+'</td>'+
								'<td>'+ v.importCount+'</td><td>'+ v.totalImportCount+'</td></tr>');
						});
						$('#dataqualityTable tbody ',$page).html(tr.join(''));
					},
					error: function(result){

					}
				});
			}
			var getDataInfo = function () {
				var arrData = [];
				var getParentObj=function(pName){
					if(pName!=null)
					pName=pName.replace('.','_');
					for(var i=0;i<arrData.length;i++){
						if(arrData[i].name==pName)
						return arrData[i];
					}
					return null;
				}
				$ajax.ajax({
					url: requestUrl,
					async: false,
					success: function(result){
						$.each(result.listObj,function(index,obj){
							if(obj.name.indexOf('count')>-1&&obj.parentName==null){
								arrData.push({
									'name': obj.name.replace('.','_'), 'type': [],'description':obj.description,
									'number': obj.strValue
								})
							}else{
								var parent=getParentObj(obj.parentName);
								if(parent!=null){
									parent.type.push({value: obj.strValue, name: obj.description});
								}
							}
						});
						console.log(arrData);
						setDataInfo(arrData);
					},
					error: function(result){

					}
				});

			}
			getDataInfo();
			getDataList();
			$($page).mCustomScrollbar({
				theme: 'minimal'
			});
			var pageResize = function () {
                $('.tableContainer',$page).height(mining.browser.h-570);
			};
			mining.utils.winResize({name: pageResize});
            $('.tableContainer',$page).mCustomScrollbar({
                theme: 'minimal'
            });
			$('.searchbox-btn', $page).off('click').on('click', function () {
			
			});
			$('input[name=reservation]',$page).daterangepicker({
				opens: 'left',
				format:'YYYY-MM-DD',
				timePicker: true,
				applyClass: 'btn-primary',
				clearClass: 'btn-primary'
			}, function(start, end, label, action) {

			}).on('clear.daterangepicker', function(){
				$(this).val('');
			});
		});
	}


	return {
		init: initPage
	}
});