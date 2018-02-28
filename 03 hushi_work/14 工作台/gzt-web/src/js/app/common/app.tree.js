app.tree = {
	json: [{
		"name": "中科慈航",
		"code": "ZKCH",
		"icon": "icon-tree-root",
		"child": [{
				"name": "广州中科慈航",
				"icon": "icon-tree-open",
				"code": "GZZKCH",
				"parentCode": "ZKCH",
				"child": [{
					"name": "广州中科慈航天河区分行",
					"code": "GZZKCHTQFH",
					"icon": "",
					"parentCode": "GZZKCH",
					"child": []
				}]
			},
			{
				"name": "北京中科慈航",
				"icon": "",
				"code": "BJZKCH",
				"parentCode": "ZKCH",
				"child": [{
					"name": "北京中科慈航中城区分行",
					"code": "BJZKCHZCFH",
					"icon": "",
					"parentCode": "BJZKCH",
					"child": []
				}]
			}
		]
	}, {
		"name": "中科科技",
		"code": "ZKKJ",
		"icon": "icon-tree-root",
		"child": [{
			"name": "广州中科科技",
			"code": "GZZKKJ",
			"icon": "icon-tree-open",
			"parentCode": "ZKKJ",
			"child": [{
				"name": "广州天河中科科技",
				"code": "GZTHZKKJ",
				"icon": "",
				"parentCode": "GZZKKJ",
				"child": []
			}]
		}]
	}],
	init: function(data, rootUL) {

		for (var i = 0; i < data.length; i++) {
			var data2 = data[i];
			if (data[i].icon == 'icon-tree-root') {
				$('#' + rootUL).append('<li data-name="' + data[i].code + '"><div>' +
					'<label class="check"><input type="checkbox" ><span>' + data[i].name + '</span></label>' +
					'</div></li>');
			} else {
				var children = $('li[data-name="' + data[i].parentCode + '"]').children('ul');
				if (children.length == 0) {
					$('li[data-name="' + data[i].parentCode + '"]').append('<ul></ul>')
				}
				$('li[data-name="' + data[i].parentCode + '"] > ul').append(
					'<li data-name="' + data[i].code + '">' +
					'<div>' +
					'<i class="icon ' + data[i].icon + '"></i> ' +
					'<label class="check"><input type="checkbox" name="functionCode" data-code="' + data[i].code + '" data-appid="' +
					data[i].appId + '" value="' + data[i].code + "-" + data[i].appId + '"><span>' + data[i].name +
					'</span></label>' +
					'</div>' +
					'</li>')
			}
			for (var j = 0; j < data[i].child.length; j++) {
				var child = data[i].child[j];
				var children = $('li[data-name="' + child.parentCode + '"]').children('ul');
				if (children.length == 0) {
					$('li[data-name="' + child.parentCode + '"]').append('<ul></ul>')
				}
				$('li[data-name="' + child.parentCode + '"] > ul').append(
					'<li data-name="' + child.code + '">' +
					'<div>' +
					'<label class="check"><input type="checkbox" name="functionCode" data-code="' + child.code + '" data-appid="' +
					child.appId + '"  value="' + child.code + "-" + child.appId + '"><span>' + child.name + '</span></label>' +
					'</div>' +
					'</li>')
				var child2 = data[i].child[j].child;
				app.tree.init(child2)
			}
			app.tree.init(data[i]);
		}

		$('#' + rootUL + ' input').change(function() {
			var checked = this.checked;
			$(this).parent().parent().parent().find('input').each(function() {
				this.checked = checked;
			});
		});

		// $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', '关闭');
		//        $('.tree li.parent_li > span').on('click', function (e) {
		//            var children = $(this).parent('li.parent_li').find(' > ul > li');
		//            if (children.is(':visible')) {
		//                children.hide();
		//                $(this).attr('title', '展开').find(' > i').addClass('icon-tree-open').removeClass('icon-tree-close');
		//            } else {
		//                children.show();
		//                $(this).attr('title', '关闭').find(' > i').addClass('icon-tree-close').removeClass('icon-tree-open');
		//            }
		//            e.stopPropagation();
		//        });

		//        for (var i = 0; i < data.length; i++) {
		//			var data2 = data[i];
		//			if (data[i].icon == 'icon-tree-root') {
		//				$('#rootUL').append('<li data-name="' + data[i].code + '"><div><i class="icon ' + data[i].icon + '"></i> ' + data[i].name  + 
		//					'</div></li>');
		//			} else {
		//				var children = $('li[data-name="' + data[i].parentCode + '"]').children('ul');
		//				if (children.length == 0) {
		//					$('li[data-name="' + data[i].parentCode + '"]').append('<ul></ul>')
		//				}
		//				$('li[data-name="' + data[i].parentCode + '"] > ul').append(
		//					'<li data-name="' + data[i].code + '">' +
		//					'<div>' +
		//					'<i class="icon ' + data[i].icon + '"></i> ' +
		//					data[i].name  +
		//					'</div>' +
		//					'</li>')
		//			}
		//			for (var j = 0; j < data[i].child.length; j++) {
		//				var child = data[i].child[j];
		//				var children = $('li[data-name="' + child.parentCode + '"]').children('ul');
		//				if (children.length == 0) {
		//					$('li[data-name="' + child.parentCode + '"]').append('<ul></ul>')
		//				}
		//				$('li[data-name="' + child.parentCode + '"] > ul').append(
		//					'<li data-name="' + child.code + '">' +
		//					'<div>' +
		//					'<i class="icon ' + child.icon + '"></i> ' +
		//					data[i].name  +
		//					'</div>' +
		//					'</li>')
		//				var child2 = data[i].child[j].child;
		//				app.tree.init(child2)
		//			}
		//			app.tree.init(data[i]);
		//		}
	}
};
