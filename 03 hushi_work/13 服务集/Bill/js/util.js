var config = {
    serverHost: '/Bill'
};

var util = {
    request:function (params) {
        // var _this = this;
        $.ajax({
            url:params.url || '',
            // headers:{
            //     'operate_type':1,
            //     'user_token': sessionStorage.getItem('userToken')
            // },
            type:params.type || 'get',
            data:params.data||'',
            dataType:params.type || 'json',
            success:function (res) {
                //console.log(res);
                // if(res.message=== 'login deny'){
                //     alert('session过期，请重新登录!');
                //     location.href = 'http://10.102.6.141/';
                //     return false;
                // }else
                if(res.code === 0){
                    typeof params.success === 'function' && params.success(res.data);
                }else{
                    console.log(res.msg);
                }
            },
            error:function (err) {
                typeof params.error === 'function' && params.error(err.msg);
            }
        })
    },
    getServerUrl:function (url) {
        return  config.serverHost + url;
    }
}
