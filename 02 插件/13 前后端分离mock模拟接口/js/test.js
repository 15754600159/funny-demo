/**
 * @desc 如何匹配带参数的url
 * 1. 使用正则去匹配Mock.mock的需要拦截的路径；
 * 2. 当正则中需要加变量的时候，用正则构造函数来生成RegExg变量 https://www.cnblogs.com/zzsdream/articles/5499110.html
 * 3. 正则参考：https://www.cnblogs.com/onepixel/p/5218904.html
 */


$(function () {

    var prefixURL = 'http://10.37.110.159:8081/policeStatistics';
    var ajaxUrl = {
        //今日警情
		getTodayJqCount:  prefixURL + "/com/police/leaderData/getTodayJqCount",
    }

    var ajaxUrlRegRxg = {
        //今日警情
        getTodayJqCount: new RegExp('^' + ajaxUrl.getTodayJqCount + '(\\?|$)'),
    }


    Mock.mock(ajaxUrlRegRxg.ajaxUrlRegRxg, 'get', function () {
        return Mock.mock({
            TodayJqCount: [
                { jqCount: 535, item1: '违法犯罪警情' },
                { jqCount: 510, item1: '纠纷' },
                { jqCount: 634, item1: '交通警情' },
                { jqCount: 735, item1: '群众求助' },
            ]
        });
    });

    $.ajax({
        url: 'http://10.37.110.159:8081/policeStatistics/com/police/leaderData/getTodayJqCount?_1231231',
        type: 'get',
        data: {
            '_': 123123123
        },
        dataType: 'json'
    }).done(function (data, status, xhr) {
        console.log(JSON.stringify(data, null, 4));
    });

})