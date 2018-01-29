define(function (require) {
    var $page = $('.page-audit'),
        requestUrl = {
            getList: mining.baseurl.console + '/loader/listlogs'
        };
    require('daterangepicker');
    //刷新布局
    var pageResize = function () {
        $(".list_container", $page).height(mining.browser.h -200);
        //TODO
    };
    Date.prototype.format = function() {
        var month=this.getMonth()+1,date=this.getDate()
        return this.getFullYear()+'-'+(month<10?'0':'')+month+'-'+(date<10?'0':'')+date+' '+this.getHours()+':'+this.getMinutes()+':'+this.getSeconds();
    };
    /* 初始化 */
    var initPage = function () {
        mining.utils.loadPage($page, function () {
            mining.utils.winResize({name: pageResize});
            $('input[name=reservation]',$page).daterangepicker({
                opens: 'left',
                format:'YYYY-MM-DD',
                timePicker: true,
                applyClass: 'btn-primary',
                clearClass: 'btn-primary'
            }, function(start, end, label, action) {
                $('.list_container',$page).attr('pageno',1);
                $('#tableAudit tbody', $page).html('');
               getList();
            }).on('clear.daterangepicker', function(){
                $(this).val('');
            });
            function getList(isScroll) {
                var pageno=$('.list_container',$page).attr('pageno');
                if(!pageno) pageno=1;
                if(isScroll)
                    pageno++;
                var starttime='',endtime='';
                if($('[name=reservation]',$page).val()!=''){
                    starttime=$('[name=daterangepicker_start]').val()+' 00:00:00';
                    endtime=$('[name=daterangepicker_end]').val()+' 23:59:59';
                }
                $ajax.ajax({
                    url: requestUrl.getList,
                    data: {
                        operator: $('.searchbox-ipt', $page).val(), fromDate: starttime, toDate: endtime,
                        pageNo: pageno,
                        pageSize: 30
                    },
                    success: function (result) {
                        var trs = [];
                        $.each(result.listObj, function (index, obj) {
                            trs.push('<tr><td>' + obj.operator + '</td><td>' +(new Date(obj.startTime)).format()+ '</td><td width="30%" title="'+obj.inputPath+'">'+obj.inputPath+'</td><td>'+obj.tagname+'</td><td>'+obj.sumNum+'</td><td>'+obj.description+'</td></tr>')
                        });
                        if(result.listObj.length>0){
                            if(isScroll){
                                $('.list_container',$page).attr('pageno',Number(pageno)+1);
                                $('#tableAudit tbody').append(trs.join(''));
                            }else{
                                $('#tableAudit tbody').html(trs.join(''));
                                $('.list_container',$page).attr('pageno',1);
                            }
                        }
                    },
                    error: function (result) {

                    }
                });
            }
           getList();
            $(".list_container", $page).mCustomScrollbar({
                theme: 'minimal',
                callbacks: {
                    onTotalScroll: function () {
                        getList(true);
                    }
                }
            });
            $('.searchbox-btn', $page).off('click').on('click', function () {
                $('.list_container',$page).attr('pageno',1);
                $('#tableAudit tbody', $page).html('');
                getList();
            });
        });
    };


    return {
        init: initPage
    }
});
