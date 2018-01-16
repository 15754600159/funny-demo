app.time = {
	init: function () {
		$(".form_datetime").datetimepicker({
			language: 'zh-CN',
			format: 'yyyy-mm-dd hh:ii:ss',
			weekStart: 1,
			todayBtn: 1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
			showSecond: 1,
			minuteStep: 1,
			bootcssVer: 3
		});
	},
	last: function () {
		var date = new Date();
		var dates = new Date(date.getTime() - 7 * 24 * 3600 * 1000);
		var year = dates.getFullYear();
		var month = dates.getMonth() + 1;
		var day = dates.getDate();
		var hour = dates.getHours();
		if (Number(month) < 10) {
			month = "0" + month;
		}
		if (Number(day) < 10) {
			day = "0" + day;
		}
		if (Number(hour) < 10) {
			hour = "0" + hour;
		}
		var sec = year + '-' + month + '-' + day + ' ' + '00:00:00';
		return sec;
	},
	now: function () {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();
		if (Number(month) < 10) {
			month = "0" + month;
		}
		if (Number(day) < 10) {
			day = "0" + day;
		}
		if (Number(hour) < 10) {
			hour = "0" + hour;
		}
		if (Number(minute) < 10) {
			minute = "0" + minute;
		}
		if (Number(second) < 10) {
			second = "0" + second;
		}
		var noww = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
		return noww;
	},
	jiaoyan: function (time1, time2) {
		var stringTime = time1;
		var stringTime2 = time2;

		var timestamp2 = Date.parse(new Date(stringTime));
		timestamp2 = timestamp2 / 1000;
		var timestamp3 = Date.parse(new Date(stringTime2));
		timestamp3 = timestamp3 / 1000;
		var time = 1;
		if (timestamp2 > timestamp3) {
			alert("开始时间必须小于结束时间")
			return time;
		}
		// 2014-07-10 10:21:12的时间戳为：1404958872
		// console.log(stringTime + "的时间戳为：" + timestamp2);
	},
	last100year: function () {
		var date = new Date();
		var dates = new Date(date.getTime() - 100 * 365 * 24 * 3600 * 1000);
		var year = dates.getFullYear();
		var month = dates.getMonth() + 1;
		var day = dates.getDate();
		var hour = dates.getHours();
		if (Number(month) < 10) {
			month = "0" + month;
		}
		if (Number(day) < 10) {
			day = "0" + day;
		}
		if (Number(hour) < 10) {
			hour = "0" + hour;
		}
		var sec = year + '-' + month + '-' + day + ' ' + '00:00:00';
		return sec;
	}
};
