define(function(require){
    $(function(){
    	var resultArr = [], aArr = [], bArr = [], cArr = [], serverlog = {};
    	$ajax.ajax({
    		url: staticUrl + '/scopa/bak/serverlog/data.html',
    		async: false,
    		success: function(result){
    			resultArr = result.split(';');
    		}
    	});
    	$('.newtable tbody').html('');
    	for(var i = 0; i < resultArr.length; i++){
    		var _arr = resultArr[i].split('	');
    		aArr.push(_arr[0].trim());
    		try{
    			bArr.push(_arr[1].trim());
    		}catch(e){
    			bArr.push('');
    		}
    		try{
    			cArr.push(_arr[2].trim());
    		}catch(e){
    			cArr.push('');
    		}
    		$('.newtable tbody').append('<tr><td class="txtc">' + (i+1) + '</td><td>' + aArr[i] + '</td><td>' + bArr[i] + '</td><td>' + cArr[i] + '</td></tr>');
    		serverlog['op_'+cArr[i]] = aArr[i];
    		serverlog['con_'+cArr[i]] = bArr[i];
    	}
    	$.each(serverlog, function(i,n){
    		if(mining.utils.isEmpty(parseInt(i.replace('op_','').replace('con_',''))))delete serverlog[i];
    	})
    	console.log(JSON.stringify(serverlog))
    });
});