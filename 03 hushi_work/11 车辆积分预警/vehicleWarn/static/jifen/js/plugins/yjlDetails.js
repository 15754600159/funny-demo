$(function() {
	//根据身份证号 加载数据
	getData()
})
//根据身份证号 加载数据
function initInfo(data){
	$('.content').append(
        '<div class="con_jichu clearFloat">' +
        '<div class="img-box">' +
        '<img src=http://10.102.5.151:8777/sfz/' + data.sfzh + '/0.jpeg />' +
        '</div>' +
        '<div class="person-info">' +
        '<p>' +
        '姓名：<span class="person-name">' + (data.xm == null ? '' : data.xm) + '</span>'+
        '身份证号：' +
        '<span class="person-sfzh">' + (data.sfzh == undefined ? '' : data.sfzh) + '</span> ' +
        '关系类型：<span>车主</span>'+
        '</p>' +
        '</div>' +
        '</div>',
        '<div class="con_shehui clearFloat">' +
       // '<h3 class="chezhu">标签信息</h3>'
        '<div class="dachu">' +
        '<div class="dachu_div cydw">' +
        '<span class="label label-warning dachu_span">从业单位</span>' +
        '<p>' +
        '<span>'+ data.cydw +'</span>' +
        '</p>' +
        '</div>' +
        '<div class="dachu_div yhdc">' +
        '<span class="label label-warning dachu_span">一户多车</span>' +
        '<p>' +
        '<span><b>所属车辆车牌号:</b>'+data.cphm_all+'</span>' +
        '</p>' +
        '</div>' +
        '<div class="dachu_div lsdc">' +
        '<span class="label label-warning dachu_span">历史打处</span>' +
        '<p>' +
        '<span>'+ data.ajlx +'</span>' +
        '<span>'+ data.wfss +'</span>' +
        '</p>' +
        '</div>' +
        '<div class="dachu_div aqjy">' +
        '<span class="label label-warning dachu_span">本次打处</span>' +
        '<p>' +
        '<span>'+ data.aqjy +'</span>' +
        '</p>' +
        '</div>' +
        '<div class="dachu_div zdrylb">' +
        '<span class="label label-warning dachu_span">重点人员类别</span>' +
        '<p>' +
        '<span><b>重点人员细类:</b>'+ data.zdryxl +'</span>' +
        '<span><b>重点人员细类代码:</b>'+ data.zdryxldm +'</span>' +
        '<span><b>重点人员类别标记:</b>'+ data.zdrylbbj +'</span>' +
        '<span><b>重点人员类别标记代码:</b>'+ data.zdrylbbjdm +'</span>' +
        '</p>' +
        '</div>' +
      /*  '<div class="dachu_div yrcls">' +
        '<span class="label label-warning dachu_span">车辆数</span>' +
        '<p>' +
        '<span><b>一人车辆数:</b>'+ data.yrcls +'</span>' +
        '</p>' +
        '</div>' +*/
        '<div class="dachu_div czcdb">' +
        '<span class="label label-warning dachu_span">出租车代表</span>' +
        '<p>' +
        '<span>'+ data.czcdb +'</span>' +
        '</p>' +
        '</div>' +
        '<div class="dachu_div cjbg">' +
        '<span class="label label-warning dachu_span">参加本次罢工</span>' +
        '<p>' +
        '<span><b>参加罢工:</b>'+ data.cjbg +'</span>' +
        '</p>' +
        '</div>' +
        '<div class="dachu_div gjfjtg">' +
        '<span class="label label-warning dachu_span">公交分局提供人员</span>' +
        '<p>' +
        '<span><b>公交分局提供:</b>'+ data.gjfjtg +'</span>' +
        '</p>' +
        '</div>' +
        '</div>' +
        '</div>',
        '<div class="con_zhixi clearFloat" id="other">' +
        '</div>'
    );
    $.each(data,function () {
        if(data.ajlx==null && data.wfss==null) $('.lsdc').hide();
        if(data.cydw==null)$('.cydw').hide();
        if(data.aqjy==null)$('.aqjy').hide();
        if(data.zdryxl==null && data.zdryxldm==null && data.zdrylbbj==null && data.zdrylbbjdm==null)$('.zdrylb').hide();
       // if(data.cphm_all==null)$('.yrcls').hide();
        if(data.czcdb==null)$('.czcdb').hide();
        if(data.gjfjtg==null)$('.gjfjtg').hide();
        if(data.cjbg==null)$('.cjbg').hide();
    })
}
function initOtherPeople(other) {
	$.each(other,function (k,data) {
        $('#other').append(
            '<div class="other clearFloat">'+
            '<div class="img-box">' +
            '<img src=http://10.102.5.151:8777/sfz/' + data.gxr_sfzh + '/0.jpeg />' +
            '</div>' +
            '<div class="person-info">' +
            '<p>' +
            '姓名：<span class="person-name">' + (data.gxr_xm == null ? '' : data.gxr_xm) + '</span>'+
            '身份证号：' +
            '<span class="person-sfzh">' + (data.gxr_sfzh == undefined ? '' : data.gxr_sfzh) + '</span> ' +
            '关系类型：<span>'+data.type+'</span>'+
            '</p>' +
            '</div>'+
            '</div>'+
            '<div class="con_shehui clearFloat">' +
            '<div class="dachu">' +
            '<div class="dachu_div cydw'+k+'">' +
            '<span class="label label-warning dachu_span">从业单位</span>' +
            '<p>' +
            '<span>'+ data.cydw +'</span>' +
            '</p>' +
            '</div>' +
            '<div class="dachu_div yhdc'+k+'">' +
            '<span class="label label-warning dachu_span">一户多车</span>' +
            '<p>' +
            '<span><b>所属车辆车牌号:</b>'+ data.cphm_all+'</span>' +
            '</p>' +
            '</div>' +
            '<div class="dachu_div lsdc'+k+'">' +
            '<span class="label label-warning dachu_span">历史打处</span>' +
            '<p>' +
            '<span>'+ data.ajlx +'</span>' +
            '<span>'+ data.wfss +'</span>' +
            '</p>' +
            '</div>' +
            '<div class="dachu_div aqjy'+k+'">' +
            '<span class="label label-warning dachu_span">本次打处</span>' +
            '<p>' +
            '<span>'+ data.aqjy +'</span>' +
            '</p>' +
            '</div>' +
            '<div class="dachu_div zdrylb'+k+'">' +
            '<span class="label label-warning dachu_span">重点人员类别</span>' +
            '<p>' +
            '<span><b>重点人员细类:</b>'+ data.zdryxl +'</span>' +
            '<span><b>重点人员细类代码:</b>'+ data.zdryxldm +'</span>' +
            '<span><b>重点人员类别标记:</b>'+ data.zdrylbbj +'</span>' +
            '<span><b>重点人员类别标记代码:</b>'+ data.zdrylbbjdm +'</span>' +
            '</p>' +
            '</div>' +
         /*   '<div class="dachu_div yrcls'+k+'">' +
            '<span class="label label-warning dachu_span">车辆数</span>' +
            '<p>' +
            '<span><b>一人车辆数:</b>'+ data.yrcls +'</span>' +
            '</p>' +
            '</div>' +*/
            '<div class="dachu_div czcdb'+k+'">' +
            '<span class="label label-warning dachu_span">出租车代表</span>' +
            '<p>' +
            '<span>'+ data.czcdb +'</span>' +
            '</p>' +
            '</div>' +
            '<div class="dachu_div cjbg'+k+'">' +
            '<span class="label label-warning dachu_span">参加本次罢工</span>' +
            '<p>' +
            '<span><b>参加罢工:</b>'+ data.cjbg +'</span>' +
            '</p>' +
            '</div>' +
            '<div class="dachu_div gjfjtg'+k+'">' +
            '<span class="label label-warning dachu_span">公交分局提供人员</span>' +
            '<p>' +
            '<span><b>公交分局提供:</b>'+ data.gjfjtg +'</span>' +
            '</p>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
        if(data.ajlx==null && data.wfss==null) $('.lsdc'+k).hide();
        if(data.cydw==null)$('.cydw'+k).hide();
        if(data.aqjy==null)$('.aqjy'+k).hide();
        if(data.zdryxl==null && data.zdryxldm==null && data.zdrylbbj==null && data.zdrylbbjdm==null)$('.zdrylb'+k).hide();
        if(data.cphm_all==null)$('.yhdc'+k).hide();
        if(data.czcdb==null)$('.czcdb'+k).hide();
        if(data.gjfjtg==null)$('.gjfjtg'+k).hide();
        if(data.cjbg==null)$('.cjbg'+k).hide();
       // if(data.yrcls==null)$('.yrcls'+k).hide();
    })
}
function getData() {
	var sfz = location.href.split('?')[1]
	var id = sfz.split('=')[1];
	$.ajax({
		type: "get",
		url: "/bg/listdetail?sfzh=" + id,
		async: true,
		success: function(data) {
			var dataOwner = data[1][0];
			var dataOther = data[0];
			initInfo(dataOwner);
			initOtherPeople(dataOther);
		}
	});
}










