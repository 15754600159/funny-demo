app.ztjc = {

    // 加载人员类别的树
	initPersonCategoryTree: function(treeDomSelector) {
		const treeContainer = $(treeDomSelector);
		app.api.ztjc.getPersonCategoryDict({
			success: function(result) {
				// console.log(result);

				let zTreeObj,
					zTreeOnClick = function(event, treeId, treeNode) {
						// console.log(treeNode)
						// console.log(event.currentTarget);
						const treeDom = $(event.currentTarget);
						treeDom.siblings('.node-name').val(treeNode.name);
						treeDom.siblings('.node-code').val(treeNode.code);
					},
					setting = {
						data: {
							simpleData: {
								enable: true,
								idKey: "code", //子节点
								pIdKey: "pcode" //父节点
							},
							key: {
								name: "name" // 节点名字
							}
						},
						callback: {
							onClick: zTreeOnClick
						}
					},
					zNodes = result.msg;
				zTreeObj = $.fn.zTree.init(treeContainer.find(".personCategory-tree-dom"), setting, zNodes);

			}
		});

		// 树选择输入框的点击 涉事类别
		treeContainer.find('.node-name').off('click').on('click', function(event) {
			const that = $(this);
			that.siblings('.personCategory-tree-dom').css('display', 'block');
			const hideTreeDomFunc = function(event) {
				const target = $(event.target);
				if (!(target.hasClass('tree-dom') || target.parents('.tree-dom').length > 0)) {
					$(document).off('click', hideTreeDomFunc);
					that.siblings('.personCategory-tree-dom').css('display', 'none');
				}
			};
			setTimeout(function() {
				$(document).on('click', hideTreeDomFunc);
			}, 1)

		});
		// 输入框之后 x 删除框内内容
		treeContainer.find('.glyphicon-remove').off('click').on('click', function() {
			const that = $(this);
			that.siblings('.node-name, .node-code').val('');
		});
    },
    

}
