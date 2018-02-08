$(function(){
    $.getScript("http://10.102.5.151:8445/js/watermark.js");
    $.getScript("http://10.102.5.151:8444/js/note.js");
	
    //账单模板下载
    $('.mubanload').on('click',function(){
    	console.info("111");
        window.location = 'http://10.101.139.21:7878/BillAnaly/downTemplate';
    });

    //上传文件
    $('.upload').on('change','input[type="file"]',function(){
        var filePath = $(this).val();
        $('.text-input').val(' '+filePath.split('\\')[2]);
    });
    var zhmsg = '';
    $('.test').click(function(){
    	console.info(JSON.stringify('{"key":"select_gx"}'));
    	$.ajax({
			type: "post",
	       	url:"/rest",
	      	async: true,
			data: '{"key":"select_gx"}',
			dataType:"json",
			contentType: "application/json",
			success:function(data){
				//console.info("成功");
				console.info(data);
			},
			error:function(e){
				$.confirm({
			        title: '提示',
			        content: '申请失败',
			        buttons: {
			            确定: function () {
			            	//window.location.href="/hs_gongan/mult/lkbkzlxx/getSimple/1/1/{'lkzlbh':'','lkzljb':'','zljsdw':'','zlfbsj1':'','zlfbsj2':'','bbkrzjhm':'','bbkrxm':''}";
			            }
			        }
			    })
			}
		});
    });
    $('.daoru').click(function(){
    	console.info("8888");
        var text = $('.text-input').val();
        if(text){
			//$('.daoru')
            $('#identifier').modal({keyboard:false});
            var int1 = setInterval(function(){
                $('#loading').append('<span class="loadingspan">.&nbsp;</span>');
            },500);
            var int2 = setInterval(function(){
                $('.loadingspan').empty();
            },1500);
        };
        console.info(77);
        $('#file').ajaxSubmit({
            url:'http://10.101.139.21:7878/BillAnaly/uploadFile',
            success: function(data) {
				var num = 1;
                var $textarea = $('.text-area').append('<span>数据：</span></br>');
                $.each(data,function(i,e){
					zhmsg = e.zhmsg;
                    $textarea.append(num+'、[ 第'+e.lineNum+'行 ]'+' '+e.label+': ');
                    if(e.details){
                        $.each(e.details,function(m,n){
                            if(m != e.details.length-1){
                                $textarea.append('<span>' + n + '，' + '</span>');
                            }else{
                                $textarea.append('<span>' + n + '</span>');
                            }
                        })
                    }
                    $textarea.append('<br/>');
                    num ++;
					$('.search').css('top','-60%');
					$('.text-div').show();
					$('#identifier').modal('hide');
					clearInterval(int1);
					clearInterval(int2);
                })
				if(zhmsg){
					$('.totuxi').click(function(){
//						window.open('http://10.102.5.151/core.html?cookieSessionId='+getCookie('user_token')+'&module=newsearch#!scopa/graph/key/'+zhmsg);
						window.open('http://yp.hsga.nn/core.html?username=014591#!scopa/graph/key/'+zhmsg);
					});
				}

            }
        });		

    });

});

function getCookie(name){
	var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return decodeURIComponent(arr[2]);
	else
		return null;
}
