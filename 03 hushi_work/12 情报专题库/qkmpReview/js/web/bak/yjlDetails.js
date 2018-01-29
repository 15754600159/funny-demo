$(function() {
	//根据身份证号 加载数据
	getData()
})
//根据身份证号 加载数据
function getData() {
	//var sfz = location.href.split('?')[1]
	var sfz = GetQueryString('sfzh');
	$.ajax({
		type: "get",
		url: bjhchost+ "/task/info/one/" + sfz,
		async: true,
		success: function(data) {
			var data1 = data.msg.details
			var data2 = data.msg.relations
			console.log(data)
			
			var htmlDetail = getHtmlDetail(data1);
			$('.content').append(
				'<div class="own-info-box">' +
				htmlDetail +
				'<br style="clear:both;">' +
			'</div>' +
			'<div class="immediate-family-list">' +
				'<h3>直系亲属信息</h3>' +
			'</div>' 
			);
			
			$.each(data2, function(k, v) {
				
				var familyDetail = getHtmlDetail(v);
				$('.immediate-family-list').append(
					'<div class="family-info-box">' +
					familyDetail + 
					// <!-- 本人标签信息end -->
					'</div>'
				)
			});
		}
	});
}

function getHtmlDetail(data){
	
	var sex = ''
		
	if(data.sex == 1 || data.sex == '男') {
		sex = '男'
	} else if(data.sex == 2 || data.sex == '女') {
		sex = '女'
	} else {
		sex = ''
	}
	var txt = data.tagDetail
	var txts = '';
	
	var tag = data.tag==null||data.tag=='null'?'' : data.tag;
	var tagDangerHtml = '';
	var tagWarningHtml = '';
	var tagInfoHtml = '';
	if(tag){
		var tagArr = tag.split(",");
		if(tagArr.length > 0){
			var i = 0;
			for(i=0;i<tagArr.length;i++){
				tagDangerHtml += '<span class="label label-danger">'+ tagArr[i] +'</span>';
				tagWarningHtml += '<span class="label label-warning">'+ tagArr[i] +'</span>';
				tagInfoHtml += '<span class="label label-info">'+ tagArr[i] +'</span>';
			}
		}
	}
	tagDangerHtml = tagDangerHtml == "" ? '<span class="label label-danger">无数据</span>' :tagDangerHtml;
	tagWarningHtml = tagWarningHtml == "" ? '<span class="label label-warning">无数据</span>' :tagWarningHtml;
	tagInfoHtml = tagInfoHtml == "" ? '<span class="label label-info">无数据</span>' :tagInfoHtml;
	
    var zyHtml = '';
	var zyStr = (data.zy2==null||data.zy2=='null'?'' : data.zy2)+"";
	if(zyStr && zyStr.trim()!=''){
		if(isJSON(zyStr)){
			var zyArray = JSON.parse(zyStr);
			var i;
			for(i = 0; i<zyArray.length; i++){
				var zyinfo = zyArray[i].fields;
				var infoStr = "";
				/*$.each(zyinfo,function(index,item){
					infoStr+= index + ":" + item + " ";
				});*/
				zyHtml += '<span class="label label-default">'+zyArray[i].tag+ ' ' +infoStr + '</span>'
			}
		}else{
			zyHtml = '<span class="label label-default">'+zyStr+'</span>'
		}
	}else{
		zyHtml = '<span class="label label-default">无数据</span>'
	}
	
	var shbzHtml = getSpanHtml(data.shbz);
	var shsxHtml = getSpanHtml(data.shsx);
	
	var strHtml = '<div class="img-box"><img style="height: 250px;" src="http://10.100.9.60:9082/dzda/rygk/RequestPhoto.jsp?sfzh=' + data.idCard + '"/></div>' +
	'<div class="detail-box">' +
	'<div class="person-info">' +
		'<div class="person-info-row row">' +
			'<div class="col-md-4">姓名：<span class="person-name">' + (data.name == null ? '' : data.name) + '</span></div>' +
			'<div class="col-md-8">身份证号：<span class="person-sfzh">' + (data.idCard == undefined ? '' : data.idCard) + '</span></div>' +
		'</div>' +
		'<div class="person-info-row row">' +
			'<div class="col-md-4">性别：<span class="person-sex">' + sex + '</span></div>' +
			'<div class="col-md-8">户籍地：<span class="person-domicile">' + (data.birthplace == null ? '' : data.birthplace) + '</span></div>' +
		'</div>' +
		'<div class="person-info-row row">' +
			'<div class="col-md-4">民族：<span class="person-nation">' + (dataJx(data.nation,mzMap)) + '</span></div>' +
			'<div class="col-md-8">现住地：<span class="person-residence">' + (data.xzz == null ? '' : data.xzz) + '</span></div>' +
		'</div>' +
		'<div class="person-info-row row">' +
			'<div class="col-md-12">职业：<span class="person-occupation">' + (data.zy1 == null||data.zy1 == 'null' ? '' : data.zy1) + '</span></div>' +
		'</div>' +
	'</div>' +
	'<div class="occupation">' +
		'职业：' +zyHtml +
		'</span>' +
	'</div>' +
	'<div class="person-attribute">' +
		'<div class="social-attr">' +
			'基础社会属性：' + shsxHtml +
		'</div>' +
		'<div class="security-person">' +
			'社会保障人员：' + shbzHtml +
		'</div>' +
	'</div>' +
	'</div>' +
	'<div class="tags row">' +
		'<div class="col-md-2 col-md-offset-1">红色标签：</div>' +
		'<div class="col-md-9 labels">' + tagDangerHtml +
		'</div>' +
		'<div class="col-md-2 col-md-offset-1">黄色标签：</div>' +
		'<div class="col-md-9 labels">' + tagWarningHtml +
		'</div>' +
		'<div class="col-md-2 col-md-offset-1">蓝色标签：</div>' +
		'<div class="col-md-9 labels">' + tagInfoHtml +
		'</div>' +
	'</div>';
	
	return strHtml;
	
}

function getSpanHtml(spanStr){
	var spanHtml = "";
	if(spanStr&&spanStr!="null"){
		var tagArr = spanStr.split(",");
		if(tagArr.length > 0){
			var i = 0;
			for(i=0;i<tagArr.length;i++){
				spanHtml += '<span class="label label-default">'+ tagArr[i] +'</span>';
			}
		}
	}else{
		spanHtml ='<span class="label label-default">无数据</span>';
	}
	return spanHtml;
}

function isJSON(str) {
	try {
		JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
/*//任务详情数据
function TaskSfz() {
	var jobid = location.href.split('?')[2]
	var idcard = location.href.split('?')[1]
	if(jobid == undefined) {
		return false;
	}
	
	$.ajax({
		type:"get",
		url:"http://10.101.139.21:8777/bjhc/card/"+jobid+'/'+idcard,
		async:true,
		success: function (data) {
			console.log(data)
		}
	});
}
*/









