app.zxrygl.bdgzlook = {
    pageno: 0,
    statu: null,
    id:null,
    url: 'pages/sdryzxgl/bdzqWindow.html',
    lookurl: "pages/sdryzxgl/bdgzlook.html",
    init: function () {
        app.time.init();
        $('#window-zxrygl-addWindow').addClass('popIn');
        $('#window-zxrygl-addWindow .btn-window-close').on('click', function () {
            $('#window-zxrygl-addWindow').addClass('popOut');
            app.zxrygl.bdgzlook.close();
        });
        $('#btn-ok-person-excel').on('click', function () {
            app.zxrygl.bdgzlook.updata();
            app.zxrygl.bdgzlook.close();
        });
        app.zxrygl.bdgzlook.chakan();
    },
    close: function() {
		app.zxrygl.add.clear();
		$m.page.closePage(app.zxrygl.bdgzlook.lookurl, 'fade', 'container-wrapper');
    },
    clear: function() {
        app.zxrygl.bdgzlook.statu = null;
        app.zxrygl.bdgzlook.id = null;
	},
    chakan: function () {
        if (app.zxrygl.bdgzlook.statu == 'ck') {
            var allinput = $(".contents .input-item").find("input");
            var allselect = $(".contents .input-item").find("select");
            $(allselect).attr("disabled","disabled")
            $(allinput).attr("disabled", "disabled");
            $(".chakan").css("display","none");
            app.api.bdgzry.chakan({
                data: {
                    fid: app.zxrygl.bdgzlook.id
                },
                success: function(result) {
                    var data = result.msg;
                    $("#f-xm").val(data.fxm);
                    $("#f-sfzh").val(data.fgmsfzhm);
                    $("#f-mz").append("<option value='"+data.fmzdm+"'  selected='selected'>-"+data.fmzdm+"-</option>");
                    $("#f-fmzdm").val(data.fxbdm);
                    $("#f-lgdw").val(data.flgmc);
                    $("#f-sy").val(data.fssyj);
                    $("#f-czyq").val(data.fdealtype);
                    $(".jzrq").val(data.fdeadline)

                }
            });
        };
        if (app.zxrygl.bdgzlook.statu == 'ss') {
            app.api.bdgzry.chakan({
                data: {
                    fid: app.zxrygl.bdgzlook.id
                },
                success: function(result) {
                    var data = result.msg;
                    $("#f-xm").val(data.fxm);
                    $("#f-sfzh").val(data.fgmsfzhm);
                    $("#f-mz").append("<option value='"+data.fmzdm+"'  selected='selected'>-"+data.fmzdm+"-</option>");
                    $("#f-fmzdm").val(data.fxbdm);
                    $("#f-lgdw").val(data.flgmc);
                    $("#f-sy").val(data.fssyj);
                    $("#f-czyq").val(data.fdealtype);
                    $(".jzrq").val(data.fdeadline)

                }
            });
        };      
    },
    updata: function() {
        var xm =  $("#f-xm").val();
        var idcardNo =  $("#f-sfzh").val();
        var national =  $("#f-mz").val();
        var sex = $("#f-fmzdm").val();
        var lgPlace =  $("#f-lgdw").val();
        var reason = $("#f-sy").val();
        var dealRequest = $("#f-czyq").val();
        var bdEndtime = $(".jzrq").val();
        app.api.bdgzry.xiugai({
            data: {
            id:app.zxrygl.bdgzlook.id,
               xm:xm,
               idcardNo:idcardNo,
               national:national,
               sex:sex,
               lgPlace:lgPlace,
               reason:reason,
               dealRequest:dealRequest,
               bdEndtime:bdEndtime
            },
            success: function(result) {
                console.info(result)
                app.zxrygl.bdgzry.initSearchForm();

            }
        });

    },

};
8