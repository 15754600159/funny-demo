define(function(require, exports, module) {

	/*
	 * 动画效果
	 */

	function Cartoon(time, count, alg, callback) {
		this.time = time || 2000;
		this.count = count || 100;
		var alg = typeof(alg) == "string" ? alg : "";
		if (/^(uniform|acc|dec|accdec|arc-acc|arc-dec|arc-accdec)$/i.test(alg)) this.alg = alg.toLowerCase();
		else this.alg = "arc-dec";
		this.callback = callback;
		this.timer = null;
		// this.doms = [];
	};
	/*
	 * @param {number} time 执行时间，并不是完全等于设置的时间，不用浏览器效果可能不同，需要配合count调节，缺省1000
	 * @param {number} count 变化的次数，缺省100
	 * @param {string} alg 运动类型，缺省arc-dec
	 * @param {string} uniform 匀速
	 * @param {string} acc 匀加速
	 * @param {string} dec 圆弧加速
	 * @param {string} accdec 匀加速
	 * @param {string} arc-acc 圆弧减速
	 * @param {string} arc-dec 先匀加速后匀减速
	 * @param {string} arc-accdec 圆弧先加速后减速
	 */
	Cartoon.prototype = {
		run: function(callback, onStop) { //控制执行时机
			var self = this;
			var count = 1;
			this.timer = setInterval(function() {
				if (count > self.count) {
					self.stop();
					if (typeof(onStop) == "function") onStop();
				} else {
					switch (self.alg) {
						case "uniform":
							callback(count / self.count);
							break;
						case "acc":
							var s = 0.002 * 0.5 * (count / self.count * 1000) * (count / self.count * 1000);
							callback(s / 1000);
							break;
						case "dec":
							var s = 2 * (count / self.count * 1000) - 0.002 * 0.5 * (count / self.count * 1000) * (count / self.count * 1000);
							callback(s / 1000);
							break;
						case "accdec":
							var t = (count / self.count * 1000);
							if (t < 500) {
								var s = 0.5 * 0.004 * t * t;
							} else {
								t -= 500;
								var s = 500 + 2 * t - 0.004 * 0.5 * t * t;
							};
							callback(s / 1000);
							break;
						case "arc-acc":
							var x = count / self.count * 1000;
							var y = 1000 - Math.pow(1000000 - x * x, 0.5);
							callback(y / 1000);
							break;
						case "arc-dec":
							var x = 1000 - count / self.count * 1000;
							var y = Math.pow(1000000 - x * x, 0.5);
							callback(y / 1000);
							break;
						case "arc-accdec":
							var x = (count / self.count * 1000);
							if (x < 500) {
								var y = 500 - (Math.pow(250000 - x * x, 0.5));
							} else {
								x = 1000 - x;
								var y = 500 + Math.pow(250000 - x * x, 0.5);
							};
							callback(y / 1000);
							break;
						default:
							break;
					};
					count += 1;
				}
			}, parseInt(this.time / this.count) == 0 ? 1 : parseInt(this.time / this.count));
			return this;
		},
		stop: function() { //停止动画
			clearInterval(this.timer);
			if (typeof(this.callback) == "function") this.callback();
			return this;
		},
		init: function() { //位置初始化,生成dom
			this.stop();
		}

	}




	function runWay() {
		var doms = $('#' + domBox).find('.' + domClass);
		$.each(doms, function() {
			if ($(this).attr('data-flow') == 'oneway') {
				runOneWay(this);
			} else {
				runBothWay(this);
			}
		});
	}
	var C1 = new Cartoon(500, 100, 'uniform');

	function runOneWay() { //执行动画
		var doms = $('#' + domBox).find('.' + domClass + '[data-flow="oneway"]');
		C1.run(function(x) {
				$.each(doms, function() {
					var domIndex = $(this).attr('data-index');
					var domPos = posArr[domIndex];
					$(this).css({
						'top': domPos.x1 + (domPos.x2 - domPos.x1) * x,
						'left': domPos.y1 + (domPos.y2 - domPos.y1) * x
					});
				});

			},
			function() {
				runOneWay();
			});

	}
	var C2 = new Cartoon(500, 100, 'uniform');

	function runBothWay() { //执行动画
		var doms = $('#' + domBox).find('.' + domClass + '[data-flow="bothway"]');

		C2.run(function(x) {
				$.each(doms, function() {
					var domIndex = $(this).attr('data-index');
					var domPos = posArr[domIndex];
					$(this).css({
						'left': domPos.x1 + (domPos.x2 - domPos.x1) * x,
						'top': domPos.y1 + (domPos.y2 - domPos.y1) * x
					});
				});

			},
			function() {
				C2.run(function(x) {
						$.each(doms, function() {
							var domIndex = $(this).attr('data-index');
							var domPos = posArr[domIndex];
							$(this).css({
								'left': domPos.x2 + (domPos.x1 - domPos.x2) * x,
								'top': domPos.y2 + (domPos.y1 - domPos.y2) * x
							});
						});
					},
					function() {
						runBothWay();
					});
			});
	}
	function runBothWay2() { //执行动画
		var doms = $('#' + domBox).find('.' + domClass + '[data-flow="oneway"]');

		C2.run(function(x) {
				$.each(doms, function() {
					var domIndex = $(this).attr('data-index');
					var domPos = posArr[domIndex];
					$(this).css({
						'left': domPos.x1 + (domPos.x2 - domPos.x1) * x,
						'top': domPos.y1 + (domPos.y2 - domPos.y1) * x
					});
				});

			},
			function() {
				runBothWay2();
			});
	}
			var domBox = 'dataflowbox',
			domClass = 'dataflow-node',
			dom1 = '<span class="dataflow-node dataflow-node1"></span>',
			dom2 = '<span class="dataflow-node dataflow-node2"></span>';
			var posArr = [];
	var initDataFlow = function(pos) {
		$('#dataflowbox').remove();
		$('#graphChart').after('<div class="dataflowbox" id="dataflowbox"></div>');
		$('#dataflowbox').width($('#graphChart').width()).height($('#graphChart').height());
		posArr = pos;
		/*posArr = [{
			x1: 400,
			y1: 400,
			x2: 100,
			y2: 100,
			d: 'bothway'
		},{
			x1: 400,
			y1: 400,
			x2: 700,
			y2: 100,
			d: 'bothway'
		}];*/
		$.each(posArr, function(i) {
			var dom = '';
			if (this.d == 'oneway') {
				dom = dom1;
			} else {
				dom = dom2;
			}
			dom = $(dom).css({
				'top': this.x1,
				'left': this.y1
			}).attr('data-flow', this.d).attr('data-index', i);

			$('#' + domBox).append(dom);
		});
	}

	var runDataFlow = function(pos) {
		initDataFlow(pos);
		if(pos[0].d == 'oneway'){
			runBothWay2()		
		}else{
			runBothWay();
		}
	}

	var stopDataFlow = function() {
		C2.stop();
		$('#dataflowbox').remove();
	}

	return {
		init: initDataFlow,
		run: runDataFlow,
		stop: stopDataFlow
	}

});