$(function() {
	//弹框1
	dialog();
	//背景核查
	beiJing()
	//按回车
	$(document).on('keyup',function (event) {
		var e = event || event.srcElement
		
		if(e.keyCode == 13) {
			$('#beijing').click()
		}
	})
})
//背景核查
function beiJing() {
	$('#beijing').on('click', function() {
		var sfzh = $.trim($('.form-control').val())
		var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i //18位身份证号
		var reg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/ //15位身份证号

		if(reg.test(sfzh) || reg1.test(sfzh)) {
			location.href = 'subview/taskDetail.html'
			sessionStorage.setItem('sfzh', sfzh)
		} else if(sfzh == '') {
			alert('请输入18位或15位有效身份证号')
		} else {
			alert('请输入正确的身份证号')
		}

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
			return false;
		} else {
			$('.panduan').hide();
		}
		if($('.liulan_file').val() == '') {
			$('.panfile').show()
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

						$.ajax({
							type: "post",
							url: "http://10.101.139.21:8777/bjhc/task/info/add",
							data: {
								name: taskName,
								count: taskTotal,
								sessionId: 1,
								seq: taskSeq
							},
							async: true,
							success: function(data) {

							}
						});

					}
					location.href = 'taskManagement.html'
				})
				$('.esc1').on('click', function() {
					$('.tankuang1').hide()
					$('.tankuang').show()
				})
			}
		}).submit(function() {
			return false;
		});

	})
	$('.esc').on('click', function() {
		location.href = 'backgroundReciew.html'
	})
}