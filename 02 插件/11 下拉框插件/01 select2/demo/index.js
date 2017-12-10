/**
 * 1. 入门: http://www.jianshu.com/p/61fb01b6d0f4  
 * 2. api: https://select2.org/
 * 3. 中文api: http://blog.csdn.net/StoneEpigraph/article/details/76409408
 */

$(function() {

    var data = [
        { id: 0, text: 'enhancement' }, 
        { id: 1, text: 'bug' }, 
        { id: 2, text: 'duplicate' }, 
        { id: 3, text: 'invalid' }, 
        { id: 4, text: 'wontfix' },
        { id: 5, text: 'duplicate' }, 
        { id: 6, text: 'invalid' }, 
        { id: 7, text: 'wontfix' }
    ];

    $( '.example' ).select2({
        data: data,
        placeholder:'请选择',
        allowClear:true,
        multiple: true,
        // width: 'style',
        width: '400px',
    })



})