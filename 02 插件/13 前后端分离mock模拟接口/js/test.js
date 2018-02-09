$(function () {

    Mock.mock('http://test.com', 'get', function () {
        return Mock.mock({
            "user|1-3": [
                {
                    'name': '@cname',
                    'id': 88
                }
            ]
        });
    });

    $.ajax({
        url: 'http://test.com',
        type: 'get',
        dataType: 'json'
    }).done(function (data, status, xhr) {
        console.log(JSON.stringify(data, null, 4));
    });

})