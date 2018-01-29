app.fxmxgl.qtwjgzpz.update = {
	url: 'pages/fxmxgl/qtwjgzpzUpdateWindow.html',
	callback: null,
	vehicles: null,
	open: function(that) {
		var updateId = $(that).parent().parent('tr').data('id'); //记录操作的信息id,以便后面获取数据
		$('.page .qtwjgzpz').data('updateId', updateId);
		$m.page.openPage(app.fxmxgl.qtwjgzpz.update.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.fxmxgl.qtwjgzpz.update.clear();
		$m.page.closePage(app.fxmxgl.qtwjgzpz.update.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-qtwjgzpz-updateWindow').addClass('popIn');
		// 弹框 'x' 点击关闭按钮事件监听
		$('#window-qtwjgzpz-updateWindow .btn-window-close').off('click').on('click', function() {
			$('#window-qtwjgzpz-updateWindow').addClass('popOut');
			app.fxmxgl.qtwjgzpz.update.close();
		});

		app.fxmxgl.qtwjgzpz.update.initForm();

		// 弹框 ‘确定’ 按钮点击提交表单事件监听
		$('#btn-ok-rule-update').off('click').on('click', function() {
			var formData = $m('#form-rule-add-main').serializeObject(),
				subRuleElem = $('#form-rule-add-sub > section'),
				updateId = $('.page .qtwjgzpz').data('updateId');

			formData.id = updateId; //id
			formData.rAge = parseInt(formData.rAge); //类型转换
			formData.rAgeStart = parseInt(formData.rAgeStart); //类型转换
			formData.rAgeEnd = parseInt(formData.rAgeEnd); //类型转换
			formData.rLocal = parseInt(formData.rLocal); //类型转换
			formData.rMinsize = parseInt(formData.rMinsize); //类型转换
			// formData.ruleTableList = [];

			subRuleElem.each(function(i) {
				app.fxmxgl.serializeFromWidget($(this), formData, i);
			})
			console.log(formData);

			$.ajax({
				url: app.api.fxmxgl.qtwjgzXgUrl + updateId + '/',
				type: "put",
				data: formData,
				success: function(response) {
					console.log(response);
					if (response.success === 1) {
						app.alert('群体挖掘规则修改成功！');
						app.fxmxgl.qtwjgzpz.update.close(); // 关闭弹窗
						app.fxmxgl.qtwjgzpz.search.SearchInfo(1, 10); // 初始查询
					} else {
						app.alert('群体挖掘规则修改失败！');
					}
				},
				error: function(e) {
					console.log('群体挖掘规则修改出错！')
				}
			});
		})
	},
	clear: function() {
		app.fxmxgl.qtwjgzpz.update.callback = null;
		app.fxmxgl.qtwjgzpz.update.vehicles = null;
	},
	initForm: function() {
		// 初始时间选择框
		// app.time.init();

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
		// app.fxmxgl.testFrom($('#form-rule-add-main'));

		// 初始化输入框内容内容
		$.ajax({
			url: app.api.fxmxgl.qtwjgzXqCxUrl + $('.page .qtwjgzpz').data('updateId') + '/',
			type: "get",
			success: function(response) {
				if (response.success === 1) {
					var ruleTableList = response.msg.ruleTableList;

					$m('#form-rule-add-main').setFormValues(response.msg);
					for (let i = 0, j = ruleTableList.length; i < j; i++) {
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

						ruleTableList[i].fType = ruleTableList[i].ftype;
						ruleTableList[i].fRule = ruleTableList[i].frule;
						$('#form-rule-add-sub').append(tempHtml);
						var subRuleElem = $('#form-rule-add-sub').find('section').eq(i);
						app.fxmxgl.setFormValues(subRuleElem, ruleTableList[i]);

						var fType = subRuleElem.find('select[name="fType"]').val(),
							fRule = subRuleElem.find('select[name="fRule"]').val(),
							limitConditionElem = subRuleElem.find('div.limit-condition'),
							planeElem = subRuleElem.find('div.plane'),
							carElem = subRuleElem.find('div.car'),
							railwayElem = subRuleElem.find('div.railway'),
							innElem = subRuleElem.find('div.inn'),
							internetElem = subRuleElem.find('div.internet');

						switch (fType) {
							case '02': //飞机
								limitConditionElem.css('display', 'none');
								planeElem.css('display', 'block');
								break;
							case '01': //火车
								limitConditionElem.css('display', 'none');
								railwayElem.css('display', 'block');
								break;
							case '00': //汽车
								limitConditionElem.css('display', 'none');
								carElem.css('display', 'block');
								break;
							case '03': //宾馆
								limitConditionElem.css('display', 'none');
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
								break;
							case '04': //网吧
								limitConditionElem.css('display', 'none');
								internetElem.css('display', 'block');
								break;
							default:
								console.log('你选的活动类型不符合！');
						}

					}

				} else {
					app.alert('体挖掘规则详细信息查询失败！');
				}
			},
			error: function(e) {
				console.log('群体挖掘规则详细信息查询出错！')
			}
		});

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
		$('#window-qtwjgzpz-updateWindow button.add-sub-rule').on('click', function() {
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
                            <option value="1">飞机</option>
                            <option value="2">汽车</option>
                            <option value="3">火车</option>
                            <option value="4">宾馆</option>
                            <option value="5">网吧</option>
                        </select>
                    </div>
                </div>
                <div class="control-item">
                    <label>活动规则</label>
                    <div>
                        <select class="select" name="fRule">
                            <option value="1">同行</option>
                            <!-- <option value="2">同屋同住</option>
                            <option value="3">多次同住</option>
                            <option value="4">同上网</option> -->
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
            </section>`

			$('#form-rule-add-sub').append(tempHtml);
		})

		// 删除规则任务子表
		$(document).on('click', '#form-rule-add-sub .delete-sub-rule', function() {
			var subRuleElem = $(this).parent('.col4');

			subRuleElem.remove();
		})

	}
};
