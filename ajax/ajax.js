$(function(){

	ruleAjax();

	function ruleAjax() {
              $.ajax({
                  url: 'http://k1269.mlamp.co:8008/harts/rule',
                  type: 'GET',
                  success: function(data) {
                      console.log(data);
                      var dataArr = [
					    {
					        "id":1,
					        "name":"铁路同行",
					        "category":"normal",
					        "status":"Ready",
					        "createTime":"17/04/06 22:37:12",
					        "description":"铁路同行战法,代号1",
					        "models":[
					            "ds1->TrainEvent:train_event",
					            "ds2->TrainEvent:passporttrain_event"
					        ],
					        "predef":[
					            "val dm = ds1.union(ds2)"
					        ],
					        "content":"UnaryRelate dm Freq count(*) [ccrq,cc,fz,dz,cxh] (cphrate(cph,cph',spsj,spsj')<15 AND cphdiff(cph,cph')<5 OR cphdiff(cph,cph')<2) AND timediffinlong(spsj,spsj')<181",
					        "display":"test"
					    },
					    {
					        "id":2,
					        "name":"同屋同住",
					        "category":"normal",
					        "status":"Ready",
					        "createTime":"17/04/06 22:37:12",
					        "description":"同屋同住战法,代号2",
					        "models":[
					            "ds1->HotelEvent:hotel_event",
					            "ds2->HotelEvent:passporthotel_event"
					        ],
					        "predef":[
					            "val dm = ds1.union(ds2)"
					        ],
					        "content":"UnaryRelate dm Freq count(*) [lddm,fjh,rzrq] 5 timediffinlong(rzsj,rzsj')<3601",
					        "display":"test"
					    },
					    {
					        "id":3,
					        "name":"多次同住",
					        "category":"normal",
					        "status":"Ready",
					        "createTime":"17/04/06 22:37:12",
					        "description":"多次同住战法,代号3",
					        "models":[
					            "ds1->HotelEvent:hotel_event",
					            "ds2->HotelEvent:passporthotel_event"
					        ],
					        "predef":[
					            "val dm = ds1.union(ds2)"
					        ],
					        "content":"UnaryRelate dm Freq count(rzrq) [lddm,rzrq] timediffinlong(rzsj,rzsj')<601 Agg count(rzrq)>=2",
					        "display":"test"
					    },
					    {
					        "id":4,
					        "name":"民航同行",
					        "category":"normal",
					        "status":"Ready",
					        "createTime":"17/04/06 22:37:12",
					        "description":"民航同行战法,代号4",
					        "models":[
					            "ds1->FlightLGEvent:flightLG_event",
					            "ds2->FlightLGEvent:passportflightLG_event"
					        ],
					        "predef":[
					            "val dm = ds1.union(ds2)"
					        ],
					        "content":"CombineAnd{UnaryRelate dm Freq count(*) [hbh,lgsj] UnaryRelate dm Freq count(*) [hbh,lgsj] diff(djh,djh')<6",
					        "display":"test"
					    }
				]
                  },
                  error: function(data) {
                      seajs.log(data);
                  }
              }); 
          }

          function modelAjax() {
              $.ajax({
                  url: 'http://k1269.mlamp.co:8008/harts/model',
                  type: 'GET',
                  success: function(data) {
                      console.log(data);
                      var dataArr = [
					    {
					        "id":1,
					        "name":"TrainEvent",
					        "category":"event",
					        "createTime":"17/04/06 22:37:03",
					        "description":"",
					        "jsonContent":"{"name":"TrainEvent","schema":{"entity_id":"key","time":"ccrq"},"fields":["spsj","key","fz","dz","cxh","cph","ccrq","cc"],"sources":[{"name":["train_event"],"fields":["eTRAIN_spsj","key","eTRAIN_fz","eTRAIN_dz","eTRAIN_cxh","eTRAIN_cph","ccrq","eTRAIN_cc"]},{"name":["passporttrain_event"],"fields":["ePASSPORTTRAIN_spsj","key","ePASSPORTTRAIN_fz","ePASSPORTTRAIN_dz","ePASSPORTTRAIN_cxh","ePASSPORTTRAIN_cph","ccrq","ePASSPORTTRAIN_cc"]}]}"
					    },
					    {
					        "id":2,
					        "name":"HotelEvent",
					        "category":"event",
					        "createTime":"17/04/06 22:37:03",
					        "description":"",
					        "jsonContent":"{"name":"HotelEvent","schema":{"entity_id":"key","time":"rzsj"},"fields":["rzsj","fjh","key","lddm","rzrq"],"sources":[{"name":["hotel_event"],"fields":["rzsj","eHOTEL_fjh","key","lddm","timetodate(rzsj)"]},{"name":["passporthotel_event"],"fields":["rzsj","ePASSPORTHOTEL_fjh","key","lddm","timetodate(rzsj)"]}]}"
					    },
					    {
					        "id":3,
					        "name":"FlightLGEvent",
					        "category":"event",
					        "createTime":"17/04/06 22:37:04",
					        "description":"",
					        "jsonContent":"{"name":"FlightLGEvent","schema":{"entity_id":"key","time":"lgsj"},"fields":["key","hbh","djh","hbrq","lgsj"],"sources":[{"name":["flightLG_event"],"fields":["key","hbh","eFLIGHTlg_djh","hbrq","eFLIGHTlg_lgsj"]},{"name":["passportflightLG_event"],"fields":["key","hbh","ePASSPORTFLIGHTlg_djh","hbrq","ePASSPORTFLIGHTlg_lgsj"]}]}"
					    }
					];
                  },
                  error: function(data) {
                      seajs.log(data);
                  }
              }); 
          }

          function modelMappingAjax() {
              $.ajax({
                  url: 'http://k1269.mlamp.co:8008/harts/model/mapping',
                  type: 'GET',
                  success: function(data) {
                      console.log(data);
                      var dataArr = [
			    {
			        "name":"TrainEvent",
			        "showName":"事件_火车",
			        "category":"event",
			        "field":[
			            {
			                "name":"spsj",
			                "showName":"售票时间"
			            },
			            {
			                "name":"key",
			                "showName":"公民身份证号"
			            },
			            {
			                "name":"fz",
			                "showName":"发站"
			            },
			            {
			                "name":"dz",
			                "showName":"到站"
			            },
			            {
			                "name":"cxh",
			                "showName":"车厢号"
			            },
			            {
			                "name":"cph",
			                "showName":"车票号"
			            },
			            {
			                "name":"ccrq",
			                "showName":"乘车日期"
			            },
			            {
			                "name":"cc",
			                "showName":"车次"
			            }
			        ]
			    },
			    {
			        "name":"HotelEvent",
			        "showName":"事件_住宿",
			        "category":"event",
			        "field":[
			            {
			                "name":"rzsj",
			                "showName":"入住时间"
			            },
			            {
			                "name":"fjh",
			                "showName":"房间号"
			            },
			            {
			                "name":"key",
			                "showName":"证件号码"
			            },
			            {
			                "name":"lddm",
			                "showName":"旅店代码"
			            },
			            {
			                "name":"rzrq",
			                "showName":"timetodate(rzsj)"
			            }
			        ]
			    },
			    {
			        "name":"FlightLGEvent",
			        "showName":"事件_空港离港",
			        "category":"event",
			        "field":[
			            {
			                "name":"key",
			                "showName":"证件号码"
			            },
			            {
			                "name":"hbh",
			                "showName":"航班号"
			            },
			            {
			                "name":"djh",
			                "showName":"登机号"
			            },
			            {
			                "name":"hbrq",
			                "showName":"航班日期"
			            },
			            {
			                "name":"lgsj",
			                "showName":"离港时间"
			            }
			        ]
			    }
			];
                  },
                  error: function(data) {
                      seajs.log(data);
                  }
              }); 
          }

          function operatorAjax() {
              $.ajax({
                  url: 'http://k1269.mlamp.co:8008/harts/operator',
                  type: 'GET',
                  success: function(data) {
                      console.log(data);
                      var dataArr = [
					    {
					        "name":"contains",
					        "showName":"包含",
					        "category":"filter"
					    },
					    {
					        "name":"equals",
					        "showName":"相等",
					        "category":"filter"
					    },
					    {
					        "name":"between",
					        "showName":"区间",
					        "category":"filter"
					    },
					    {
					        "name":"equals",
					        "showName":"相等",
					        "category":"compare"
					    },
					    {
					        "name":"timediffinlong",
					        "showName":"时间值相差",
					        "fieldCount":"1",
					        "udfType":"constrain",
					        "returnType":"Long",
					        "category":"compare",
					        "fieldType":"Long"
					    },
					    {
					        "name":"mintimeinlong",
					        "showName":"最早时间值",
					        "fieldCount":"1",
					        "udfType":"constrain",
					        "returnType":"Long",
					        "category":"compare",
					        "fieldType":"Long"
					    },
					    {
					        "name":"timediff",
					        "showName":"时间戳相差",
					        "fieldCount":"1",
					        "udfType":"constrain",
					        "returnType":"Long",
					        "category":"compare",
					        "fieldType":"Timestamp"
					    },
					    {
					        "name":"mintime",
					        "showName":"最早时间戳",
					        "fieldCount":"1",
					        "udfType":"constrain",
					        "returnType":"Timestamp",
					        "category":"compare",
					        "fieldType":"Timestamp"
					    },
					    {
					        "name":"seatdiff",
					        "showName":"座位号相差",
					        "fieldCount":"1",
					        "udfType":"constrain",
					        "returnType":"Long",
					        "category":"compare",
					        "fieldType":"String"
					    },
					    {
					        "name":"cphdiff",
					        "showName":"车票号相差",
					        "fieldCount":"1",
					        "udfType":"constrain",
					        "returnType":"Long",
					        "category":"compare",
					        "fieldType":"String"
					    },
					    {
					        "name":"diff",
					        "showName":"相差",
					        "fieldCount":"1",
					        "udfType":"constrain",
					        "returnType":"Long",
					        "category":"compare",
					        "fieldType":"String"
					    },
					    {
					        "name":"cphrate",
					        "showName":"车票号频率",
					        "fieldCount":"2",
					        "udfType":"constrain",
					        "returnType":"Double",
					        "category":"compare",
					        "fieldType":"String,Long"
					    },
					    {
					        "name":"absrate",
					        "showName":"绝对值比率",
					        "fieldCount":"2",
					        "udfType":"constrain",
					        "returnType":"Double",
					        "category":"compare",
					        "fieldType":"Long,Long"
					    }
					];
                  },
                  error: function(data) {
                      seajs.log(data);
                  }
              }); 
          }
})