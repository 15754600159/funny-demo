app.date = {
	shortDate: function(string) {
		var date = $m.date.toDate(string, 'yyyy-MM-dd');
		var now = new Date();

		var pattern = 'yyyy-MM-dd';
		if (date.getFullYear() === now.getFullYear()) {
			pattern = 'MM-dd';
			if (date.getMonth() === now.getMonth()) {
				if (date.getDate() === now.getDate()) {
					pattern = '今天';
				} else if (date.getDate() + 1 === now.getDate()) {
					pattern = '昨天';
				} else if (date.getDate() - 1 === now.getDate()) {
					pattern = '明天';
				}
			}
		}
		return $m.date.toString(date, pattern);
	},
	formatTimeLineDateTime: function(string) {
		var date = $m.date.toDate(string, 'yyyy-MM-dd HH:mm:ss');
		var now = new Date();

		var pattern = 'yyyy-MM-dd<br>HH:mm:ss';
		if (date.getFullYear() === now.getFullYear()) {
			pattern = 'MM-dd<br>HH:mm:ss';
			if (date.getMonth() === now.getMonth()) {
				if (date.getDate() === now.getDate()) {
					pattern = '今天<br>HH:mm:ss';
				} else if (date.getDate() + 1 === now.getDate()) {
					pattern = '昨天<br>HH:mm:ss';
				}
			}
		}
		return $m.date.toString(date, pattern);
	},
	formatDateTime: function(dateString) {
		var formatedDate = '';
		if (dateString) {
			var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
			formatedDate = (dateString + '').replace(pattern, '$1-$2-$3 $4:$5:$6');
		}
		return formatedDate;
	},
	formatDateTimeT: function(dateString) {
		var formatedDate = '';
		if (dateString) {
			formatedDate = dateString.substring(0, 19).replace('T', ' ');
		}
		return formatedDate;
	}
};
