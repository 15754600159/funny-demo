app.fxmxgl.qtwjgzpz.add = {
	url: 'pages/fxmxgl/qtwjgzpzAddWindow.html',
	callback: null,
	vehicles: null,
	open: function() {
		$m.page.openPage(app.fxmxgl.qtwjgzpz.add.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.fxmxgl.qtwjgzpz.add.clear();
		$m.page.closePage(app.fxmxgl.qtwjgzpz.add.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-qtwjgzpz-addWindow').addClass('popIn');
		// 弹框 'x' 点击关闭按钮事件监听
		$('#window-qtwjgzpz-addWindow .btn-window-close').off('click').on('click', function() {
			$('#window-qtwjgzpz-addWindow').addClass('popOut');
			app.fxmxgl.qtwjgzpz.add.close();
		});

		app.fxmxgl.qtwjgzpz.add.initForm();

		// 弹框 ‘确定’ 按钮点击提交表单事件监听
		$('#btn-ok-rule-add').off('click').on('click', function() {
			var formData = $m('#form-rule-add-main').serializeObject(),
				subRuleElem = $('#form-rule-add-sub > section');

			//	formData.rAgeStart = null;
			// formData.rAge = parseInt(formData.rAge); //类型转换
			// formData.rAgeStart = parseInt(formData.rAgeStart); //类型转换
			// formData.rAgeEnd = parseInt(formData.rAgeEnd); //类型转换
			// formData.rLocal = parseInt(formData.rLocal); //类型转换
			// formData.rMinsize = parseInt(formData.rMinsize); //类型转换
			// formData.ruleTableList = [];

			subRuleElem.each(function(i) {
				app.fxmxgl.serializeFromWidget($(this), formData, i);
			})
			console.log(formData);

			$.ajax({
				url: app.api.fxmxgl.qtwjgzXzUrl,
				type: "post",
				data: formData,
				success: function(response) {
					console.log(response);
					if (response.success === 1) {
						app.alert('群体挖掘规则新增成功！');
						app.fxmxgl.qtwjgzpz.add.close(); // 关闭弹窗
						app.fxmxgl.qtwjgzpz.search.SearchInfo(1, 10); // 初始查询
					} else {
						app.alert('群体挖掘规则新增失败！');
					}
				},
				error: function(e) {
					console.log('群体挖掘规则新增出错！')
				}
			});
		})
	},
	clear: function() {
		app.fxmxgl.qtwjgzpz.add.callback = null;
		app.fxmxgl.qtwjgzpz.add.vehicles = null;
	},
	initForm: function() {
		// 初始时间选择框
		app.time.init();

		// 初始化页面下拉框的内容
		var mbJsonStr = sessionStorage.getItem('mbObject'),
			mbObject = JSON.parse(mbJsonStr);

		app.select.init($('#form-rule-add-main select[name="rStatus"]'), mbObject.RULE_STATUS);
		app.select.init($('#form-rule-add-main select[name="rHuji"]'), mbObject.tb_d_qgxzqh);
		app.select.init($('#form-rule-add-main select[name="rMinzu"]'), mbObject.nation);
		app.select.init($('#form-rule-add-main select[name="rXingbie"]'), mbObject.sex);
		app.select.init($('#form-rule-add-main select[name="rXiaqu"]'), mbObject.tb_d_qgxzqh);
		app.select.init($('#form-rule-add-main select[name="rRylb"]'), mbObject.tb_d_zdryxl);
		app.select.init($('#form-rule-add-main select[name="rHdcslx"]'), mbObject.RULE_TYPE);
		app.select.init($('#form-rule-add-main select[name="rCfd"]'), mbObject.tb_d_qgxzqh);
		app.select.init($('#form-rule-add-main select[name="rMdd"]'), mbObject.tb_d_qgxzqh);

		// dev 表单测试用 (测试完请注释)
		app.fxmxgl.testFrom($('#form-rule-add-main'));

		// 规则任务子表 下拉框的联动
		$(document).on('change', '#form-rule-add-sub select[name="fType"]', function() {
			var fType = $(this).val(),
				subRuleElem = $(this).parents('section.col4'),
				fRuleSelect = subRuleElem.find('select[name="fRule"]'),
				limitConditionElem = subRuleElem.find('div.limit-condition'),
				planeElem = subRuleElem.find('div.plane'),
				carElem = subRuleElem.find('div.car'),
				railwayElem = subRuleElem.find('div.railway'),
				innElem = subRuleElem.find('div.inn'),
				internetElem = subRuleElem.find('div.internet');

			switch (fType) {
				case '02': //飞机
					fRuleSelect.empty().append('<option value="01">同行</option>');
					limitConditionElem.css('display', 'none');
					planeElem.css('display', 'block');
					break;
				case '01': //火车
					fRuleSelect.empty().append('<option value="01">同行</option>');
					limitConditionElem.css('display', 'none');
					railwayElem.css('display', 'block');
					break;
				case '00': //汽车
					fRuleSelect.empty().append('<option value="01">同行</option>');
					limitConditionElem.css('display', 'none');
					carElem.css('display', 'block');
					break;
				case '03': //宾馆
					fRuleSelect.empty().append('<option value="02">同屋同住</option><option value="03">多次同住</option>');
					limitConditionElem.css('display', 'none');
					// innElem.css('display', 'block');
					break;
				case '04': //网吧
					fRuleSelect.empty().append('<option value="04">同上网</option>');
					limitConditionElem.css('display', 'none');
					internetElem.css('display', 'block');
					break;
				default:
					console.log('你选的活动类型不符合！');
			}
		});

		$(document).on('change', '#form-rule-add-sub select[name="fRule"]', function() {
			var fRule = $(this).val(),
				subRuleElem = $(this).parents('section.col4'),
				fType = subRuleElem.find('select[name="fType"]').val(),
				limitConditionElem = subRuleElem.find('div.limit-condition'),
				innElem = subRuleElem.find('div.inn');

			if (fType !== '03') { //宾馆
				return;
			}

			switch (fRule) {
				case '02': //同屋居住
					limitConditionElem.css('display', 'none');
					break;
				case '03': //多次同住
					limitConditionElem.css('display', 'none');
					innElem.css('display', 'block');
					break;
				default:
					console.log('你选的活动类型不符合！');
			}
		})

		// 新增规则任务子表
		$('#window-qtwjgzpz-addWindow button.add-sub-rule').on('click', function() {
			if ($('#form-rule-add-sub .col4').length >= 5) {
				app.alert('最多只能增加5个规则任务子表！');
				return;
			}
			var tempHtml =
				`<section class="h-box col4">
                <div class="control-item">
                    <label>活动类型</label>
                    <div>
                        <select class="select" name="fType">
                            <option value="02">飞机</option>
                            <option value="01">火车</option>
                            <option value="00">汽车</option>
                            <option value="03">宾馆</option>
                            <option value="04">网吧</option>
                        </select>
                    </div>
                </div>
                <div class="control-item">
                    <label>活动规则</label>
                    <div>
                        <select class="select" name="fRule">
                            <option value="01">同行</option>
                            <!-- <option value="02">同屋同住</option>
                            <option value="03">多次同住</option>
                            <option value="04">同上网</option> -->
                        </select>
                    </div>
                </div>
                <div class="control-item limit-condition plane">
                    <label>飞机同行次数</label>
                    <div>
                        <input type="text" class="input" name="minhangCishu">
                    </div>
                </div>
                <div class="control-item limit-condition plane">
                    <label>飞机值机间隔</label>
                    <div>
                        <input type="text" class="input" name="minhangZjjg">
                    </div>
                </div>
                <div class="control-item limit-condition railway" style="display: none;">
                    <div>
                        <label class="check">
                            <input type="checkbox" name="tieluCfdsfxt" value="1">
                            <span>铁路-出发地是否相同</span>
                        </label>
                    </div>
                </div>
                <div class="control-item limit-condition railway" style="display: none;">
                    <div>
                        <label class="check">
                            <input type="checkbox" name="tieluMddsfxt" value="1">
                            <span>铁路-目的地是否相同</span>
                        </label>
                    </div>
                </div>
                <div class="control-item limit-condition railway" style="display: none;">
                    <div>
                        <label class="check">
                            <input type="checkbox" name="tieluTcc" value="1">
                            <span>铁路-是否同车次</span>
                        </label>
                    </div>
                </div>
                <div class="control-item limit-condition inn" style="display: none;">
                    <label>旅店-多次同住次数</label>
                    <div>
                        <input type="text" class="input" name="lvdianDctzcs">
                    </div>
                </div>
                <div class="control-item limit-condition inn" style="display: none;">
                    <label>旅店-入住时间间隔</label>
                    <div>
                        <input type="text" class="input" name="lvdianRuzhusjjg">
                    </div>
                </div>
                <div class="control-item limit-condition inn" style="display: none;">
                    <label>旅店-离开时间间隔</label>
                    <div>
                        <input type="text" class="input" name="lvdianLikaisjjg">
                    </div>
                </div>
                <div class="control-item limit-condition internet" style="display: none;">
                    <label>上网间隔</label>
                    <div>
                        <input type="text" class="input" name="lvdianRuzhusjjg">
                    </div>
                </div>
                <div class="control-item limit-condition internet" style="display: none;">
                    <label>下网间隔</label>
                    <div>
                        <input type="text" class="input" name="lvdianLikaisjjg">
                    </div>
                </div>
                <div class="control-item limit-condition car" style="display: none;">
                    <div>
                        <label class="check">
                            <input type="checkbox" name="qicheCfdsfxt" value="1">
                            <span>汽车-出发地是否相同</span>
                        </label>
                    </div>
                </div>
                <div class="control-item limit-condition car" style="display: none;">
                    <div>
                        <label class="check">
                        <input type="checkbox" name="qicheMddsfxt" value="1">
                        <span>汽车-目的地是否相同</span>
                    </label>
                    </div>
                </div>
                <div class="control-item limit-condition car" style="display: none;">
                    <div>
                        <label class="check">
                        <input type="checkbox" name="qicheTcc" value="1">
                        <span>汽车-是否同车次</span>
                    </label>
                    </div>
                </div>
                <div class="delete-sub-rule">X</div>
            </section>`;

			$('#form-rule-add-sub').append(tempHtml);
		})

		// 删除规则任务子表
		$(document).on('click', '#form-rule-add-sub .delete-sub-rule', function() {
			var subRuleElem = $(this).parent('.col4');

			subRuleElem.remove();
		})

	}
};
