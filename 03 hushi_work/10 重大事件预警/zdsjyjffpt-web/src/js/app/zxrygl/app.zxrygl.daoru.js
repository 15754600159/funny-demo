app.zxrygl.daoru = {
    pageno:0,
    id:null,
    url: 'pages/sdryzxgl/daoru.html',
	init: function() {
		$('#window-zxrygl-addWindow').addClass('popIn');
		$('#window-zxrygl-addWindow .btn-window-close').on('click', function() {
			$('#window-zxrygl-addWindow').addClass('popOut');
			app.zxrygl.daoru.close();
		});
		$('#btn-ok-person-excel').on('click', function() {
			app.zxrygl.daoru.updata();
		});
		app.time.init();
    },
    close: function() {
		app.zxrygl.daoru.clear();
		$m.page.closePage(app.zxrygl.daoru.url, 'fade', 'container-wrapper');
    }, 
    clear: function() {
		app.zxrygl.daoru.id = null;
    },
    updata: function() {
		var excelname = $('#excel-import').val();
        if (excelname!= '') {
            var reg = /^.*\.(?:xls|xlsx)$/i;//文件名可以带空格
            if (!reg.test(excelname)) {//校验不通过
                alert("请上传excel格式的文件!"); 
                return;
            }
        }else{
            $('.error').removeClass('hide');
            return;
        }
        var userName ="";
        var userNo = "";
        $('form.uploadfj').ajaxSubmit({ 
            url: app.api.url+"/localperson/info/check",
            type: 'POST',
            data:{'importNo':userNo,'importName':userName},
            dataType: 'json',
            success: function (result) {
                if(result.success=='1'){
                    app.zxrygl.daoru.close();
                    app.zxrygl.bdgzry.initSearchForm();
                }else{
                    alert('导入失败');
                    app.zxrygl.daoru.close();
                }
            },
            error: function (result) {
               
            }
        });
	},
};
