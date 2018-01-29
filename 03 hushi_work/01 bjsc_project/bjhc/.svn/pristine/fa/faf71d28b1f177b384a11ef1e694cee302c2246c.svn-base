$(function() {
	//弹框1
	dialog();
	//背景核查
	beiJing()
	//模板下载
	MoBan()
	//按回车
	$(document).on('keyup',function (event) {
		var e = event || event.srcElement
		
		if(e.keyCode == 13) {
			$('#beijing').click()
		}
	})
	
	var userId = location.href.split('=')[1]
	sessionStorage.setItem('sessionId',userId)
})
//背景核查
function beiJing() {
	$('#beijing').on('click', function() {
		var sfzh = $.trim($('.form-control').val())
		var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i //18位身份证号
		var reg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/ //15位身份证号

		if(reg.test(sfzh) || reg1.test(sfzh)) {
			location.href = 'subview/taskDetail.html?'+sfzh
		} else if(sfzh == '') {
			alert('请输入18位或15位有效身份证号')
		} else {
			alert('请输入正确的身份证号')
		}

	})
}
//模板下载
function MoBan() {
	$('#moban').on('click',function () {
		location.href = 'http://10.101.139.21:8777/xls/template.xls'
	})
}
//弹框1
function dialog() {
	$('.hecha_input').val('');
	$('.liulan_file').val('');
	$('#shangchuan').on('click', function() {
		$('.tankuang').show();
	})
	$('.close').on('click', function() {
		$('.tankuang').hide();
	})
	$('.ok').on('click', function() {

		if($('.hecha_input').val() == '') {
			$('.panduan').show();
			//$(this).attr('disabled',false)
			return false;
		} else {
			$('.panduan').hide();
		}
		if($('.liulan_file').val() == '') {
			$('.panfile').show()
			//$(this).attr('disabled',false)
			return false;
		} else {
			$('.panfile').hide()
		}

		$('#liulan-form').ajaxSubmit({
			url: 'http://10.101.139.21:8777/bjhc/task/info/check/',
			success: function(data) {
				console.log(data)
				var total = data.msg.success
				var seq = data.msg.data

				$('.tankuang1_success').text(data.msg.success)
				$('.tankuang1_fail').text(data.msg.failed)
				$('.tankuang1').show()
				$('.tankuang').hide()
				$('.ok1').on('click', function() {
					var success = Number(data.msg.success)+Number(data.msg.failed)
					
					if(success > 5000) {
						alert('不能上传超过5000条的数据!!!')
						return false;
					}else{
						if(data.success == 1) {
							//上传获取数据
							getData()
						}else{
							alert('上传失败')
							return false;
						}
						//获取数据
						function getData() {
							var taskName = $('.hecha_input').val();
							var taskTotal = total
							var taskSeq = seq
							var userId = location.href.split('=')[1]
	
							$.ajax({
								type: "post",
								url: "http://10.101.139.21:8777/bjhc/task/info/add",
								data: {
									name: taskName,
									count: taskTotal,
									sessionId: userId,
									seq: taskSeq
								},
								async: true,
								success: function(data) {
									console.log(data)
								}
							});
	
						}
						location.href = 'taskManagement.html'
					}
					
				})
				$('.esc1').on('click', function() {
					$('.tankuang1').hide()
					$('.tankuang').show()
					$('.ok').attr('disabled',false)
				})
			}
		}).submit(function() {
			return false;
		});
		$(this).attr('disabled',true)
	})
	$('.esc').on('click', function() {
		location.href = 'backgroundReciew.html'
	})
}
