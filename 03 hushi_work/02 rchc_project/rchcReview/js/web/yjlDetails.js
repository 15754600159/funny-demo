$(function() {
	//根据身份证号 加载数据
	getData()
})
//根据身份证号 加载数据
function getData() {
	var sfz = location.href.split('?')[1]

	$.ajax({
		type: "get",
		url: "http://10.101.139.22:9897/task/info/one/" + sfz,
		async: true,
		success: function(data) {
			var data1 = data.msg.details
			var data2 = data.msg.relations
			console.log(data)
			var sex = ''
			
				if(data1.sex == 1 || data1.sex == '男') {
					sex = '男'
				} else if(data1.sex == 2 || data1.sex == '女') {
					sex = '女'
				} else {
					sex = ''
				}
				var txt = data1.tagDetail
				if(txt == '' || txt == null){
					txts == '';
				}else{
					var reg = /({|})*("|")*/g
					var source = /source/g
					var info = /info/g
					var fields = /(fields:)*/g
					var txt = txt.replace(reg,'').replace(source,'信息来源').replace(info,'信息出处').replace(fields,'')
					//console.log(txt.split(','))
					var txt1 = txt.split(',')[3].split(' ')[0]
					//console.log(txt1)
					var txts = txt.split(',')[1]+'<br />'+txt.split(',')[2]+'<br />'+txt1+'<br />';
					//console.log(txts)
				}
				
				$('.content').append(
					'<div class="con_jichu clearFloat">' +
					'<h3>基础信息</h3>' +
					'<div class="img-box">' +
					'<img src=http://10.101.5.175/sfz/' + data1.idCard + '/0.jpeg />' +
					'</div>' +
					'<div class="person-info">' +
					'<p>' +
					'姓名：<span class="person-name">' + (data1.name == null ? '' : data1.name) + '</span> 身份证号：' +
					'<span class="person-sfzh">' + (data1.idCard == undefined ? '' : data1.idCard) + '</span> 性别：' +
					'<span class="person-sex">' + sex + '</span>' +
					'民族：<span class="person-nation">' + (data1.nation == null ? '' : data1.nation) + '</span>' +
					'</p>' +
					'<p>' +
					'出生日期：<span class="person-date">' + (data1.birthday == null ? '' : data1.birthday.split(' ')[0]) + '</span>' +
					'出生地：<span class="person-place">' + (data1.birthplace == null ? '' : data1.birthplace) + '</span>' +
					'</p>' +
					'</div>' +
					'</div>',
					'<div class="con_shehui clearFloat">' +
					'<h3>社会标签</h3>' +
					'<div class="dachu">' +
					'<div class="dachu_div">' +
					'<span class="label label-warning dachu_span">' + data1.tag + '</span>' +
					'<p>' +
					'<span>'+(data1.tagDetail == null ? '' : (txts == undefined ? '' : txts))+'</span>' +
					'</p>' +
					'</div>' +
					'</div>' +
					'</div>',
					'<div class="con_zhixi clearFloat">' +
					'<h3>直系亲属信息</h3>' +
					'</div>'
				);
			
			$.each(data2, function(k, v) {
				var txt = v.tagDetail
				if(txt == '' || txt == null){
					txts == '';
				}else{
					var reg = /({|})*("|")*/g
					var source = /source/g
					var info = /info/g
					var fields = /(fields:)*/g
					var txt = txt.replace(reg,'').replace(source,'信息来源').replace(info,'信息出处').replace(fields,'')
					//console.log(txt.split(','))
					var txt1 = txt.split(',')[3].split(' ')[0]
					var txts = '<br />'+'<br />'+txt.split(',')[1]+'<br />'+txt.split(',')[2]+'<br />'+txt1;
				}
				
				//console.log(v)
				if(v.sex == 1 || v.sex == '男') {
					sex = '男'
				} else if(v.sex == 2 || v.sex == '女') {
					sex = '女'
				} else {
					sex = ''
				}
				$('.con_zhixi>h3').append(
					'<div class="qinshu">' +
					'<div class="qinshu_div">' +
					'<span class="label label-warning qinshu_span">' + v.tag + '</span>' +
					'<p>' +
					'姓名：<span class="person-name">' + (v.name == null ? '' : v.name) + '</span> 身份证号：' +
					'<span class="person-sfzh">' + (v.idCard == undefined ? '' : v.idCard) + '</span>' +
					'民族：<span class="person-nation">' + (v.nation == null ? '' : v.nation) + '</span>' +
					'</p>' +
					'<p>性别：<span class="person-sex">' + sex + '</span></p>' +
					'<p>' +
					'<p>出生日期：<span class="person-date">' + (v.birthday == null ? '' : v.birthday.split(' ')[0]) + '</span></p>' +
					'<p>' +
					'<span>'+(v.tagDetail == null ? '' : txts)+'</span>' +
					'</p>' +
					'</div>' +
					'</div>'
				)
			});
		}
	});
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
		url:"http://10.101.139.22:9897/card/"+jobid+'/'+idcard,
		async:true,
		success: function (data) {
			console.log(data)
		}
	});
}
*/









