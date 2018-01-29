define({
	/**
     * @name 模块扩展配置信息
     * @function
     * @desc 配置完成后的访问地址为 "/core.html#!scopa/" + 模块key。
     * @example 
     * 		  如下myhome访问路径为 "/core.html#!scopa/myhome"
     */
	core: {
		myhome: {
			name: '我的首页',				//模块名称	[选填]
			module: 'app/myhome/myhome',	//js模块路径 [必填]
			template: 'app/myhome/myhome',	//html模板路径 [必填]
			pageattr: {},				//模板html属性 [选填]
			navattr: {					//主导航html属性 [选填]
				index: 1				//主导航顺序 [必填]
			},
			async: false				//是否异步加载 [选填]
		},
		myapp: {
			name: '我的应用',
			module: 'app/myapp/myapp',
			template: 'app/myapp/myapp',
			navattr: {
				index: 2
			},
			async: false
		},
		mygraph: {
			name: '我的图析',
			module: 'app/mygraph/graph',
			template: 'app/mygraph/graph',
			navattr: {
				index: 3
			}
		}
	}
});