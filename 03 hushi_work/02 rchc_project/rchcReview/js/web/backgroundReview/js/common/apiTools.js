var amGloable = amGloable || {};
var host = host || false;
var baseUrl = host || "http://"+location.host+ "/rest";

amGloable.api = {
	//高危人员流入乘车
  	lrc: new Api({
  		url: baseUrl + "/personGwry/gwryLrlcByTime/lr/train"
  	}),
  	//高危人员乘机流入
  	lrj: new Api({
  		url: baseUrl + "/personGwry/gwryLrlcByTime/lr/flight"
  	}),
  	//高危人员乘车流出
  	lcc: new Api({
  		url: baseUrl + "/personGwry/gwryLrlcByTime/lc/train"
  	}),
  	//高危人员乘机流出
  	lcj: new Api({
  		url: baseUrl + "/personGwry/gwryLrlcByTime/lc/flight"
  	}),
  	//高危人员流入，乘车乘机
  	lrcj: new Api({
  		url: baseUrl + "/personGwry/gwryLrlcByTime/lr/tf"
  	}),
  	//高危人员流出，乘车乘机
  	lccj: new Api({
  		url: baseUrl + "/personGwry/gwryLrlcByTime/lc/tf"
  	}),
	//人员区域分析接口
  	areaAnalysis: new Api({
  		url: baseUrl + "/personAreaAnalysis"
  	}),
	//高危人员落脚点
  	gwryljd: new Api({
  		url: baseUrl + "/personGwry/gwryLjd/hotel"
  	}),
	//码表：旅店编码
  	codeLdAll: new Api({
  		url: baseUrl + "/code/ldAll"
  	}),
	//码表：网吧编号
  	codeWbAll: new Api({
  		url: baseUrl + "/code/wbAll"
  	}),
	//案件总览
  	anjianOverview: new Api({
  		url: baseUrl + "/anjian/OverView"
  	}),
	//案件特征分析
	anjianFeature: new Api({
		url: baseUrl + "/anjian/Fetures"
	}),
	//码表：案件所属分局
	codeAjssfj: new Api({
  		url: baseUrl + "/code/pcsfjList1"
  	}),
	//码表：案件所属派出所
	codeAjsspcs: new Api({
  		url: baseUrl + "/code/pcsfjList2"
  	}),
	//码表：所有案件所属派出所
	codePcsFjAll: new Api({
  		url: baseUrl + "/code/pcsfjAll"
  	}),
	//码表：一级案件类别
	codeAjlbList1: new Api({
  		url: baseUrl + "/code/ajlbList1"
  	}),
	//码表：二级，三级案件类别
	codeAjlbList2: new Api({
  		url: baseUrl + "/code/ajlbList2"
  	}),
	//码表：二级，三级案件类别
	anjianAreaAnalysis: new Api({
  		url: baseUrl + "/anjian/AreaAnalysis"
  	}),
	//案件涉案人员分析
    anjianSheAnRen: new Api({
        url: baseUrl + "/anjian/SheAnRen"
    }),
    //案件受害人员分析
    anjianShouHaiRen: new Api({
        url: baseUrl + "/anjian/ShouHaiRenFetures"
    }),
	//码表：籍贯，省
    codeJgAll1: new Api({
        url: baseUrl + "/code/jgAll1"
    }),
    //码表：民族
    codeMzAll: new Api({
        url: baseUrl + "/code/mzAll"
    }),
    //码表：学历
    codeWhcdAll: new Api({
        url: baseUrl + "/code/whcdAll"
    }),
    //码表：职业类别
    codeZylbAll: new Api({
        url: baseUrl + "/code/zylbAll"
    }),
    //码表：重点人员细类
    codeZdryxlAll: new Api({
        url: baseUrl + "/code/zdryxlAll"
    }),
    //码表：所有案件类别
    codeAjlbAll: new Api({
        url: baseUrl + "/code/ajlbAll"
    }),
    //案件分类：
    anjianFenLei: new Api({
        url: baseUrl + "/anjian/FengLei"
    }),
    //涉案人员地域分析：
    SheAnRenDiYu: new Api({
    	url: baseUrl + "/anjian/SheAnRenDiYu"
	}),
	//案件趋势分析
	anjianQushi: new Api({
        url: baseUrl + "/anjian/QuShi"
    }),
    //码表：交通违章-涉案车辆分析
    SheAnCheLiang: new Api({
        url: baseUrl + "/weizhang/SheAnCheLiang"
    }),
    //码表：处理机关-公安机关机构
    codeGxsAll: new Api({
        url: baseUrl + "/code/gxsAll"
    }),
    //码表：机动车使用性质
    codeJdcsyxzAll: new Api({
        url: baseUrl + "/code/jdcsyxzAll"
    }),
    //码表：机动车辆类型
    codeCllxAll: new Api({
        url : baseUrl + "/code/cllxAll"
    }),
    //码表：交通事故违法行为
    codeJtsgwfxwAll : new Api({
        url: baseUrl + "/code/jtsgwfxwAll"
    }),
	//码表：发案地域
    codeFadyAll : new Api({
        url: baseUrl + "/code/fadyAll"
    }),
	//码表：发案场所
    codeFacsAll : new Api({
        url: baseUrl + "/code/facsAll"
    }),
	//码表：联动案件第一级
	codeLdajLev1: new Api({
        url: baseUrl + "/code/ldajListLev1"
    }),
	//码表：联动案件第二级
	codeLdajLev2: new Api({
        url: baseUrl + "/code/ldajListLev2"
    }),
	//码表：联动案件第三级
	codeLdajLev3: new Api({
        url: baseUrl + "/code/ldajListLev3"
    })
};

amGloable.tools = {
	toEntry: function(obj){
		for(var i in obj)
			return {"key":i,"value":obj[i]};
	},
    clearNull: function(s){
        switch(s){
            case '':
            case 'null':
            case null:
            case undefined:
                s = "";
                break;
            default:
                break;
        }
        return s;
    },
	hash: {
		get: function(isSearch){
			var str = isSearch ? location.search: location.hash;
			var kvs = str.substring(1).split("&");
			var ret = {};
			for(var i = 0;i<kvs.length;i++){
				var item = kvs[i].split("=");
				if(item[1] == null){
					continue;
				}
				ret[item[0]] = item[1];
			}
			return ret;
		},
		set: function(data, isSearch){
			if(isSearch)
				location.href = "?" + $.param(data);
			else
				location.href = "#" + $.param(data);
		},
		add: function(){},
		remove: function(){}
	}
};