app.fxmxgl.qtwjgzpz.check = {
	url: 'pages/fxmxgl/qtwjgzpzCheckWindow.html',
	callback: null,
	vehicles: null,
	open: function(that) {
		var checkId = $(that).parent().parent('tr').data('id'); //记录操作的信息id,以便后面获取数据
		$('.page .qtwjgzpz').data('checkId', checkId);
		$m.page.openPage(app.fxmxgl.qtwjgzpz.check.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.fxmxgl.qtwjgzpz.check.clear();
		$m.page.closePage(app.fxmxgl.qtwjgzpz.check.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-qtwjgzpz-checkWindow').addClass('popIn');
		// 弹框 'x' 点击关闭按钮事件监听
		$('#window-qtwjgzpz-checkWindow .btn-window-close').off('click').on('click', function() {
			$('#window-qtwjgzpz-checkWindow').addClass('popOut');
			app.fxmxgl.qtwjgzpz.check.close();
		});

		app.fxmxgl.qtwjgzpz.check.initForm();

	},
	clear: function() {
		app.fxmxgl.qtwjgzpz.check.callback = null;
		app.fxmxgl.qtwjgzpz.check.vehicles = null;
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
			url: app.api.fxmxgl.qtwjgzXqCxUrl + $('.page .qtwjgzpz').data('checkId') + '/',
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

					// 禁用输入框
					$('input,select', $('#window-qtwjgzpz-checkWindow')).prop('disabled', 'disabled');
				} else {
					app.alert('体挖掘规则详细信息查询失败！');
				}
			},
			error: function(e) {
				console.log('群体挖掘规则详细信息查询出错！')
			}
		});

	}
};
