$(function() {
    // console.log(aAjax());

    $.when(aAjax(), bAjax())
        .then(function(aData, bData) {
            console.log(aData, bData);
            return cAjax(aData, bData);
        })
        .then(function(cData) {
            console.log('我延迟了5秒.......')
            console.log(cData);
            return dAjax(cData);
        })
        .then(function(dData) {
            console.log('我是d的数据', dData);
        })

})



// ajax的promise可以加success
function aAjax() {
    var a = $.ajax({
        url: 'http://k1269.mlamp.co:8008/harts/rule',
        type: 'GET'
    });
    return a;
}

function bAjax() {
    var b = $.ajax({
        url: 'http://k1269.mlamp.co:8008/harts/model',
        type: 'GET',
    });
    return b;
}

function cAjax(aData, bData) {
    var c = $.ajax({
        url: 'http://k1269.mlamp.co:8008/harts/model/mapping',
        type: 'GET'
    });
    return c;
}

function dAjax(cData) {
    var def = $.Deferred();
    //做一些异步操作
    console.log('我是c->d的数据', cData);
    $.ajax({
        url: 'http://k1269.mlamp.co:8008/harts/operator',
        type: 'GET',
        success: function(dData){
            setTimeout(function(){
                def.resolve(dData);
            },5000)
        }
    });
    return def;
}
