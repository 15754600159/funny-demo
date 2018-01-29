app.container = {
	init: function(host) {
		// 获取动态预警ajax
		var swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			slidesPerView: 4,
			paginationClickable: true,
			spaceBetween: 30,
			prevButton: '.swiper-button-prev',
			nextButton: '.swiper-button-next',
		});
		$.ajax({
			type: "get",
			url: host + "/zx/group/yidong/persons?yjsjks=&yjsjjs=&qtbh=&sfzh=&xm=&pageNo=1&pageSize=10",
			dataType: "json",
			success: function(response) {
				var data = response.msg.result;
				var list;
				for (var i = 0; i < data.length; i++) {
					var yjjb = app.map.yjjb(data[i].yjjb);
					list = '<tr><td><img src=' + yjjb + '></td>' +
						'<td>' + data[i].xm + '</td>' +
						'<td>' + data[i].sfzh + '</td>' +
						'<td>' + data[i].hdlx + ' </td>' +
						'<td>' + data[i].hdsj + ' </td>' +
						'<td class="pop">' + data[i].ydxq + '</td>' +
						'<td>' + data[i].yjsj + '</td></tr>';
					$('.dynamic').append(list);
				}
			}
		});
		// 获取异动群体
		$.ajax({
			type: "get",
			url: host + "/zx/group/yidong/groups?yjsjks=&yjsjjs=&qtbh=&qtmc=&qtlx=&pageNo=1&pageSize=10",
			dataType: "json",
			success: function(response) {
				var data = response.msg.result;
				for (var i = 0; i < data.length; i++) {
					var list = '<div class="swiper-slide ">' +
						'<div class="slide-img">' +
						'<img src="images/slide-img.png">' +
						'</div>' +
						'<div class="slide-botton">' +
						'<div class="jin">' +
						'<img src="images/jing.png">' +
						'<span>' + data[i].qtmc + '</span>' +
						'</div>' +
						'<div class="botton-con">' +
						'<p><span>' + data[i].ydrs + '</span>人' + data[i].hdlx + '</p>' +
						'</div></div></div>';
					$('.swiper-wrapper').append(list);
				}
				var swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					slidesPerView: 4,
					paginationClickable: true,
					spaceBetween: 30,
					prevButton: '.swiper-button-prev',
					nextButton: '.swiper-button-next',
				});
			}
		});
		// 获取群体排行
		$.ajax({
			type: "get",
			url: host + "/zx/group/yidong/group-ranking?pageNo=1&pageSize=10",
			dataType: "json",
			success: function(response) {
				var data = response.msg.result;
				for (var i = 0; i < data.length; i++) {
					var qtph = app.map.qtph(data[i].yjjb);
					var list = '<tr><td><img src=' + qtph + '></td>' +
						'<td>' + data[i].qtmc + '</td>' +
						'<td>' + data[i].rc + ' </td>' +
						'<td>' + data[i].rs + '</td></tr>';
					$('.pops').append(list);
				}
			}
		});
	}
};
