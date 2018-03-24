const urls = ['/zdsjyj/dict/getDictByTypes', '/zdsjyj/dict/getDictPersonCategory', '/qbxsDict/listSslb'],
    p1 = $.get( app.api.url + urls[0], { types: app.constants.zdsjyj_dict_array.join(',') } ),
    p2 = $.get(app.api.url + urls[1]),
    p3 = $.get(app.api.url + urls[2]);
    
Promise.all([p1, p2, p3])
    .then(function(datas) {
        console.log(datas);
    })
    .catch(function(error) {
        console.log(error);
    })