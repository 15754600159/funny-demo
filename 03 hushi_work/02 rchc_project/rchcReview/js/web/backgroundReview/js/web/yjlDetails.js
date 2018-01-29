$(function() {
	//根据身份证号 加载数据
	getData()
})
//根据身份证号 加载数据
function getData() {
	var sfz = sessionStorage.getItem('sfzh')

	$.ajax({
		type: "get",
		url: "http://10.101.139.21:8778/bjhc/task/info/one/" + sfz,
		async: true,
		success: function(data) {
			var data1 = data.msg.details
			var data2 = data.msg.relations
			var sex = ''
			$.each(data1, function(k, v) {
				if(v.sex == 1) {
					sex = '男'
				}else if(v.sex == null){
					sex = ''
				}else{
					sex = '女'
				}
				$('.content').append(
					'<div class="con_jichu clearFloat">' +
					'<h3>基础信息</h3>' +
					'<div class="img-box">' +
					'<img src=http://10.101.5.157/sfz/' + v.idCard + '/0.jpeg onerror="this.src=\'../../img/nav-logo.png\'" />' +
					'</div>' +
					'<div class="person-info">' +
					'<p>' +
					'姓名：<span class="person-name">' + (v.name == null ? '' : v.name) + '</span> 身份证号：' +
					'<span class="person-sfzh">' + v.idCard + '</span> 性别：' +
					'<span class="person-sex">' + sex + '</span>' +
					'</p>' +
					'<p>出生日期：<span class="person-date">' + (v.birthday == null ? '' : v.birthday) + '</span></p>' +
					'</div>' +
					'</div>' ,
					'<div class="con_shehui clearFloat">' +
					'<h3>社会标签</h3>' +
					'<div class="dachu">' +
					'<div class="dachu_div">' +
					'<span class="label label-warning dachu_span">'+v.tag+'</span>' +
					'<p>' +
					'<span>'+(v.tagDetail == null ? '' : v.tagDetail)+'</span>' +
					'</p>' +
					'</div>' +
					'</div>' +
					'</div>',
					'<div class="con_zhixi clearFloat">' +
					'<h3>直系亲属信息</h3>' +
					'</div>'
				);
			});
			$.each(data2, function(k,v) {
				console.log(v)
				if(v.sex == 1) {
					sex = '男'
				}else if(v.sex == null){
					sex = ''
				}else{
					sex = '女'
				}
				$('.con_zhixi>h3').append(
					'<div class="qinshu">' +
					'<div class="qinshu_div">' +
					'<span class="label label-warning qinshu_span">'+v.tag+'</span>' +
					'<p>' +
					'姓名：<span class="person-name">' + (v.name == null ? '' : v.name) + '</span> 身份证号：' +
					'<span class="person-sfzh">' + v.idCard + '</span>' +
					'</p>' +
					'<p>性别：<span class="person-sex">' + sex + '</span></p>' +
					'<p>' +
					'<p>出生日期：<span class="person-date">' + (v.birthday == null ? '' : v.birthday) + '</span></p>' +
					'<p>' +
					'<span>'+(v.tagDetail == null ? '' : v.tagDetail)+'</span>' +
					'</p>' +
					'</div>' +
					'</div>' 
				)
			});
		}
	});
}