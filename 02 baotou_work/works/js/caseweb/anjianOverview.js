var controller = {
    pager: {
        from: 1,
        size: 15
    },
    init: function(){
		//日历
        amGloable.common.initCalender();
		//下拉框
		this.bindSelect();
		//this.bindAjlb();
		amGloable.common.initLdaj($('#ajlb_dm1'),$('#ajlb_dm2'),$('#ajlb_dm'));
		
		this.findButton();
        this.paginationQuery(this.pager.from, this.pager.size, this.pagination);
    },
    getParams: function(from,size){
        var _basj = $('#reservation').val().split(',');
        var _ajssfj_dm = $('#ajssfj_dm').val();
        var _ajsspcs_dm = $('#ajsspcs_dm').val();
        var _ajlb_dm1 = $('#ajlb_dm1').val();
        var _ajlb_dm2 = $('#ajlb_dm2').val();
        var _ajlb_dm  = $('#ajlb_dm').val();
       
        var opt = {};
        opt._type = _type;
        opt.beginTime = _basj[0];
        opt.endTime = _basj[1];
        if(_ajssfj_dm) {opt.ajlx = _ajssfj_dm;}
        opt.from = from,
        opt.size1 = size;

        return $.param(opt);
    },
    /**
     * 分页控件
     * @param total
     */
    pagination: function(total) {
        var _this = controller;
        return BootstrapPagination($("#pagination"), {
            layoutScheme: "lefttext,pagesizelist,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
            //记录总数。
            total: total || 0,
            //分页尺寸。指示每页最多显示的记录数量。
            pageSize: _this.pager.size,
            //当前页索引编号。从其开始（从0开始）的整数。
            pageIndex: 0,
            //指示分页导航栏中最多显示的页索引数量。
            pageGroupSize: 10,
            //位于导航条左侧的输出信息格式化字符串
            leftFormateString: "本页{count}条记录/共{total}条记录",
            //位于导航条右侧的输出信息格式化字符串
            rightFormateString: "第{pageNumber}页/共{totalPages}页",
            //页码文本格式化字符串。
            pageNumberFormateString: "{pageNumber}",
            //分页尺寸输出格式化字符串
            pageSizeListFormateString: "每页显示{pageSize}条记录",
            //上一页导航按钮文本。
            prevPageText: "上一页",
            //下一页导航按钮文本。
            nextPageText: "下一页",
            //上一组分页导航按钮文本。
            prevGroupPageText: "上一组",
            //下一组分页导航按钮文本。
            nextGroupPageText: "下一组",
            //首页导航按钮文本。
            firstPageText: "首页",
            //尾页导航按钮文本。
            lastPageText: "尾页",
            //设置页码输入框中显示的提示文本。
            pageInputPlaceholder: "GO",
            //接受用户输入内容的延迟时间。单位：毫秒
            pageInputTimeout: 800,
            //分页尺寸列表。
            pageSizeList: [5, 10, 20, 50, 100, 200],
            //当分页更改后引发此事件。
            pageChanged: function (pageIndex, pageSize) {
				var from = pageIndex * pageSize;
                _this.paginationQuery(from,pageSize);
            }
        });
    },
    /**
     * 分页器查询
     * @param pageIndex 当前页数
     * @param pageSize 每页显示条数
     */
    paginationQuery: function(pageIndex,pageSize, pagination){
        var _this = this;
        amGloable.api.anjianOverview.get(_this.getParams(pageIndex, pageSize), function(ret){
            var data = ret.data;
            var $tableBody = $('#tableBody').empty();
            $.each(data, function(i, item){
                var row = "<tr>\
                    <td>"+amGloable.tools.clearNull(item.ajbh)+"</td>\
                    <td>"+amGloable.tools.clearNull(item.ajly)+"</td>\
                    <td>"+amGloable.tools.clearNull(item.ajmj)+"</td>\
                    <td>"+amGloable.tools.clearNull(item.ajmc)+"</td>\
                    <td>"+amGloable.tools.clearNull(item.ajlb_dm)+"</td>\
                    <td>"+amGloable.tools.clearNull(item.ajlb_mc)+"</td>\
                    <td>"+amGloable.tools.clearNull(item.jyaq)+"</td>\
                    <td>"+amGloable.tools.clearNull(item.basj)+"</td>\
                    <td>"+amGloable.tools.clearNull(item.lasj)+"</td>\
                </tr>";
                $('#tableBody').append(row);
            });
            //分页条
            pagination && pagination(ret.total);
        });
    },
	//查询按钮事件绑定
	findButton: function(){
		var _this = this;
		$('#query').click(function(){
			_this.paginationQuery(_this.pager.from, _this.pager.size, _this.pagination);
		});
	},
	bindSelect: function(){
		//案件所属分局下拉框数据绑定
		var $select1 = $('#ajssfj_dm').empty().append('<option value="">案件所属分局</option>');
		var $select2 = $('#ajsspcs_dm');
		var map = {};
		amGloable.api.codeAjssfj.get("", function(data){
			$.each(data, function(i, item){
				map[item.code] = item.id;
				var key = item.code;
				var value = item.value || item.name;
				$select1.append('<option value="'+key+'">'+value+'</option>');
			});
		});
		//分局onchange事件
		$select1.change(function(){
			$select2.empty().append('<option value="">案件所属派出所</option>');
			amGloable.api.codeAjsspcs.get("code="+map[this.value], function(data){
				$.each(data, function(i, item){
					var key = item.code;
					var value = item.value || item.name;
					$select2.append('<option value="'+key+'">'+value+'</option>');
				});
			});
		});
	}
};

$(function(){
    controller.init();
});