app.fxmxgl = {
	// 表单自动填值 测试用
	testFrom: function(formElem) {
		formElem.find('input[type="text"]').val('test form submit');
		formElem.find('input[type="number"]').val(2);
		formElem.find('input[type="number"][name*="End"]').val(3);
		formElem.find('select option:nth-child(2)').prop("selected", true);;
		formElem.find('input.form_datetime[name*="Start"]').val('2017-09-06 09:09:32');
		formElem.find('input.form_datetime[name*="End"]').val('2017-09-20 09:09:32');

		formElem.find('input[type="text"][name*="Name"]').val('testForSubmit' + Math.random().toFixed(2) * 100); //任务名 可具体表单具体调整
	},

	// 序列化 一般容器中的 表单控件
	serializeFromWidget: function(container, formObject, i) {
		var formObject = formObject || {},
			input_selectElem = container.find('input[type="text"],select'),
			checkboxElem = container.find('input[type="checkbox"]');

		input_selectElem.each(function() {
			let key = $(this).attr('name'),
				value = $(this).val();
			formObject['ruleTableList[' + i + '].' + key] = value;
		})
		checkboxElem.each(function() {
			let key = $(this).attr('name'),
				value = $(this).is(':checked');
			formObject['ruleTableList[' + i + '].' + key] = value;
		})

		return formObject;
	},

	// 将后台返回值填入表单输入框
	setFormValues: function(elem, formObject) {
		var input_selectElem = elem.find('input, select'),
			checkboxElem = elem.find('input[type="checkbox"]');
		input_selectElem.each(function() {
			let name = $(this).attr('name');

			$(this).val(formObject[name]);
		})
		checkboxElem.each(function() {
			let name = $(this).attr('name');

			$(this).prop('checked', formObject[name]);
		})
	},

};
