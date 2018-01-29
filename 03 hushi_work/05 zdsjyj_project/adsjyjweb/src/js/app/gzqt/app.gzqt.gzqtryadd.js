app.gzqt.gzqtryadd = {
	qtbh: null,
	url: 'pages/gzqt/gzqtryaddWindow.html',

	gzqtonclickform: function() {
		$("#form-gzqtry-add").submit();
	},

	close: function() {
		app.gzqt.gzqtryadd.clear();
		$m.page.closePage(app.gzqt.gzqtryadd.url, 'fade', 'container-wrapper');
	},

	init: function() {
		$('#window-gzqtry-addWindow').addClass('popIn');
		$('#window-gzqtry-addWindow .btn-window-close').on('click', function() {
			$('#window-gzqtry-addWindow').addClass('popOut');
			app.gzqt.gzqtryadd.close();
		});

		app.gzqt.gzqtryadd.initForm();
		$("#gzqtryadd_qtbh").val(app.gzqt.gzqtryadd.qtbh);
		$m('#form-gzqtry-add').validate({
			submitHandler: function(form) {

				var data = $m(form).serializeObject();

				app.api.gzqt.gzqtryadd({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.gzqt.gzqtryadd.close();
						app.gzqt.gzqtrySearch.init();
					},
					error: app.api.error
				});
			},
			rules: {
				sfzh: {
					required: true,
					maxlength: 90
				},
				xm: {
					required: true,
					maxlength: 30
				}
			},
			messages: {
				sfzh: {
					required: "请输入身份证号",
					maxlength: '名称长度不能超过30个汉字'
				},
				xm: {
					required: '请输入姓名',
					maxlength: '代码长度不能超过30个字符'
				}
			}
		});

	},

	clear: function() {
		app.gzqt.gzqtryadd.callback = null;
		app.gzqt.gzqtryadd.vehicles = null;
	},
	initForm: function() { }

};
