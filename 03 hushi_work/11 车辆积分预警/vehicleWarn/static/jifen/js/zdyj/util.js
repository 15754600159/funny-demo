define(function (require,exports) {
    var config = {
        serverHost:'/case'
    };
    var util = {
        storeCookie:function (user_token) {
          sessionStorage.setItem('user_token',user_token)
        },
        getCookie:function () {
            sessionStorage.getItem('user_token')
        },
        getUrlParam:function (name) {
            var reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
            var result = window.location.search.substring(1).match(reg);
            return result ? decodeURIComponent(result[2]) : null;
        },
        request:function (params) {
            // var _this = this;
            $.ajax({
                url:params.url || '',
                type:params.type || 'get',
                data:params.data||'',
                dataType:params.type || 'json',
                contentType:'application/json',
                success:function (res) {
                         params.success(res);
                },
                error:function (err) {
                    typeof params.error === 'function' && params.error(err.msg);
                }
            })
        },
        search:function () {
            $('.search-logo').click(function () {
                searchResult();
            });
            //触发回车按钮的事件
            $(document).keydown(function (e) {
                if(e.which == 13){
                    searchResult();
                }
            });
            function searchResult() {
                var result = $('#keyword').val();
                if(result==''){
                    alert('请输入搜索的关键字');
                    return false;
                }
                $('#jifen_tbody tr').hide().filter(":contains('"+result+"')").show();
            }
        },
        getServerUrl:function (url) {
            return  config.serverHost + url;
        }
    };
    exports.util = util;
    exports.config = config;
})
