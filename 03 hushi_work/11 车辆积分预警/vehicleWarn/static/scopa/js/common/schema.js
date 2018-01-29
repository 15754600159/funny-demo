define("scopa/common/schema", [], {
	statusCode: "200",
	obj: {
		uniqueVersion: "213_tuning",
		objList: {
			vehicle_other: {
				icon_mapping: "entity-graphicon-car",
				type_name: "其它车辆类型",
				show_normal: "VEHICLE_hphm",
				key_mapping: "VEHICLE_hpzl,VEHICLE_hphm",
				label: "vehicle",
				element_type: "entity",
				groupby: "VEHICLE_zwpp,VEHICLE_cllxmc",
				type: "other",
				title: "VEHICLE_hphm,VEHICLE_cllxmc",
				menu: "vehicle_relation",
				minor_prop: "VEHICLE_clflmc,VEHICLE_jdcsyr,VEHICLE_syxzmc,VEHICLE_zwpp,VEHICLE_clxh,VEHICLE_ywpp,VEHICLE_gcjkmc,VEHICLE_zzgmc,VEHICLE_zzcmc,VEHICLE_clsbdh,VEHICLE_csysmc,VEHICLE_ccdjrq,VEHICLE_zjdjrq,VEHICLE_jyyxqz,VEHICLE_qzbfqz,VEHICLE_glbmmc,VEHICLE_fprq,VEHICLE_fxszrq,VEHICLE_fdjzsrq,VEHICLE_fhgzrq,VEHICLE_bxzzrq,VEHICLE_rlzlmc,VEHICLE_pl,VEHICLE_gl,VEHICLE_zxxs,VEHICLE_cwkc,VEHICLE_cwkk,VEHICLE_cwkg,VEHICLE_hxnbcd,VEHICLE_hxnbkd,VEHICLE_hxnbgd,VEHICLE_gbthps,VEHICLE_zs,VEHICLE_zj,VEHICLE_qlj,VEHICLE_hlj,VEHICLE_ltgg,VEHICLE_lts,VEHICLE_zzl,VEHICLE_zbzl,VEHICLE_hdzzl,VEHICLE_hdzk,VEHICLE_zqyzzl,VEHICLE_jssqpzkrs,VEHICLE_jsshpzkrs,VEHICLE_xsdw,VEHICLE_xsjg,VEHICLE_xsrq,VEHICLE_clyt,VEHICLE_cllxmc,VEHICLE_jszh,VEHICLE_zjcx,VEHICLE_fzjg",
				gen_key_type: "base64",
				primary_prop: "VEHICLE_hphm,VEHICLE_hpzl_mc,VEHICLE_cllxmc,VEHICLE_fdjh,VEHICLE_fdjxh",
				icon_prop: "",
				timeline: "VEHICLE_ccdjrq",
				show_bigger: "VEHICLE_hphm,VEHICLE_cllxmc",
				fields: "hpzl_hphm,key,type,VEHICLE_bxzzrq,VEHICLE_ccdjrq,VEHICLE_clflmc,VEHICLE_cllxmc,VEHICLE_cllxmcS,VEHICLE_clsbdh,VEHICLE_clxh,VEHICLE_clyt,VEHICLE_csysmc,VEHICLE_cwkc,VEHICLE_cwkg,VEHICLE_cwkk,VEHICLE_fdjh,VEHICLE_fdjxh,VEHICLE_fdjzsrq,VEHICLE_fhgzrq,VEHICLE_fprq,VEHICLE_fxszrq,VEHICLE_fzjg,VEHICLE_gbthps,VEHICLE_gcjkmc,VEHICLE_gl,VEHICLE_glbmmc,VEHICLE_hdzk,VEHICLE_hdzzl,VEHICLE_hlj,VEHICLE_hphm,VEHICLE_hpzl,VEHICLE_hpzl_mc,VEHICLE_hxnbcd,VEHICLE_hxnbgd,VEHICLE_hxnbkd,VEHICLE_jdcsyr,VEHICLE_jsshpzkrs,VEHICLE_jssqpzkrs,VEHICLE_jszh,VEHICLE_jyyxqz,VEHICLE_ltgg,VEHICLE_lts,VEHICLE_pl,VEHICLE_qlj,VEHICLE_qzbfqz,VEHICLE_rlzlmc,VEHICLE_syxzmc,VEHICLE_xsdw,VEHICLE_xsjg,VEHICLE_xsrq,VEHICLE_ywpp,VEHICLE_zbzl,VEHICLE_zj,VEHICLE_zjcx,VEHICLE_zjdjrq,VEHICLE_zqyzzl,VEHICLE_zs,VEHICLE_zwpp,VEHICLE_zxxs,VEHICLE_zzcmc,VEHICLE_zzgmc,VEHICLE_zzl",
				label_name: "车",
				key_prop: "key"
			},
			person_browser_relation_other: {
				icon_mapping: "relation-graphicon-browser_account2",
				type_name: "人_浏览器账号关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "browser",
				label: "person_browser_relation",
				element_type: "relation",
				groupby: "rBROWSER_cjsj",
				type: "other",
				title: "type,zh",
				minor_prop: "rBROWSER_cjsj",
				primary_prop: "type,zh,sfzh",
				icon_prop: "",
				timeline: "rBROWSER_cjsj",
				object_property: "key_label_2",
				show_bigger: "type",
				fields: "key_label_1,key_label_2,rBROWSER_cjsj,sfzh,type,zh",
				label_name: "人_浏览器账号关系",
				subject_property: "sfzh"
			},
			passportinternetcafe_event_other: {
				icon_mapping: "event-graphicon-huzhaowangba",
				type_name: "事件_护照网吧",
				subject_label: "passport",
				object_label: "internetcafe",
				label: "passportinternetcafe_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,ePASSPORTINTERNETCAFE_xm",
				minor_prop: "ePASSPORTINTERNETCAFE_xm,ePASSPORTINTERNETCAFE_zjlx,ePASSPORTINTERNETCAFE_kh,zjhm,ePASSPORTINTERNETCAFE_swip,ePASSPORTINTERNETCAFE_swlx,ePASSPORTINTERNETCAFE_xwsj,wbbm,ePASSPORTINTERNETCAFE_wbdz,ePASSPORTINTERNETCAFE_gxdwmc",
				entity_label: "internetcafe",
				primary_prop: "ePASSPORTINTERNETCAFE_wbmc,ePASSPORTINTERNETCAFE_xm,ePASSPORTINTERNETCAFE_xwsj",
				icon_prop: "",
				entity_properties: "wbbm",
				timeline: "swsj",
				object_property: "key_label_2",
				fields: "ePASSPORTINTERNETCAFE_gxdwmc,ePASSPORTINTERNETCAFE_jqmc,ePASSPORTINTERNETCAFE_kh,ePASSPORTINTERNETCAFE_swip,ePASSPORTINTERNETCAFE_swlx,ePASSPORTINTERNETCAFE_wbdz,ePASSPORTINTERNETCAFE_wbmc,ePASSPORTINTERNETCAFE_xm,ePASSPORTINTERNETCAFE_xwsj,ePASSPORTINTERNETCAFE_zjlx,ePASSPORTINTERNETCAFE_zjlx_dm,key,key_label_2,swsj,type,wbbm,zjhm",
				label_name: "事件_护照网吧",
				subject_property: "key"
			},
			person_bankNO_relation_other: {
				icon_mapping: "relation-graphicon-renzhanghusuoshu",
				type_name: "人_银行账号关系",
				subject_label: "person",
				show_normal: "type",
				key_mapping: "",
				object_label: "bankNO",
				label: "person_bankNO_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,rBANKno_blrxm",
				minor_prop: "rBANKno_blrzjlx,rBANKno_khh,rBANKno_khsj",
				gen_key_type: "string",
				primary_prop: "rBANKno_blrxm,zjhm,zh",
				icon_prop: "",
				timeline: "rBANKno_khsj",
				object_property: "key_label_2",
				show_bigger: "type",
				fields: "key_label_1,key_label_2,rBANKno_blrxm,rBANKno_blrzjlx,rBANKno_khh,rBANKno_khsj,type,zh,zjhm",
				label_name: "人_银行账号关系",
				subject_property: "zjhm"
			},
			email_event_other: {
				icon_mapping: "event-graphicon-email2",
				type_name: "事件_email",
				subject_label: "vehicle",
				object_label: "vehicle",
				label: "email_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,fxrdz",
				minor_prop: "eEMAIL_csr,eEMAIL_msr,eEMAIL_bjzh,eEMAIL_yjid,eEMAIL_yjzt,eEMAIL_yjnr,eEMAIL_ckzt",
				entity_label: "vehicle",
				primary_prop: "fxrdz,yjfssj,sxrdz",
				icon_prop: "",
				entity_properties: "",
				timeline: "yjfssj",
				object_property: "",
				fields: "eEMAIL_bjzh,eEMAIL_ckzt,eEMAIL_csr,eEMAIL_msr,eEMAIL_yjid,eEMAIL_yjnr,eEMAIL_yjzt,fxrdz,key,key_label_2,sxrdz,type,yjfssj",
				label_name: "事件_email",
				subject_property: ""
			},
			takecashatm_event_other: {
				icon_mapping: "event-graphicon-quxian",
				type_name: "事件_ATM取现",
				subject_label: "bankNO",
				show_normal: "qkzh",
				key_mapping: "",
				object_label: "atm",
				label: "takecashatm_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,qkzh",
				minor_prop: "qksj,atmid,geo,eTAKECASHATM_atmjd,eTAKECASHATM_atmwd",
				gen_key_type: "string",
				properties_display: "qksj,qkzh,eTAKECASHATM_atmmc,eTAKECASHATM_qxed",
				entity_label: "atm",
				primary_prop: "qkzh,eTAKECASHATM_atmmc,eTAKECASHATM_qxed",
				icon_prop: "",
				entity_properties: "atmid",
				timeline: "qksj",
				object_property: "key_label_2",
				show_bigger: "qkzh",
				fields: "atmid,eTAKECASHATM_atmjd,eTAKECASHATM_atmmc,eTAKECASHATM_atmwd,eTAKECASHATM_qxed,geo,key_label_1,key_label_2,qksj,qkzh,type",
				label_name: "事件_ATM取现",
				subject_property: "key_label_1"
			},
			vehicle_event_other: {
				icon_mapping: "event-graphicon-paccancy2",
				type_name: "事件_违章车辆",
				subject_label: "vehicle",
				object_label: "vehicle",
				label: "vehicle_event",
				element_type: "event",
				groupby: "eVEHICLE_cfzlmc",
				type: "other",
				title: "type,eVEHICLE_hphm",
				minor_prop: "eVEHICLE_jtfsmc,eVEHICLE_sgdjmc,eVEHICLE_wfdz,eVEHICLE_wfxwmc,eVEHICLE_wfjfs,wfbh,wfsj,eVEHICLE_cljgmc,eVEHICLE_fxjgmc,eVEHICLE_fkje,eVEHICLE_dsr,eVEHICLE_dh,eVEHICLE_jdcsyr,eVEHICLE_zsxxdj,eVEHICLE_zsxzqh,eVEHICLE_sfzh,eVEHICLE_zjcx,eVEHICLE_clflmc,eVEHICLE_jdcsyxzmc,eVEHICLE_fzjg,eVEHICLE_dabh,eVEHICLE_zqmj,eVEHICLE_jkfsmc",
				entity_label: "vehicle",
				primary_prop: "eVEHICLE_dsr,eVEHICLE_hphm,eVEHICLE_cfzlmc,wfsj",
				icon_prop: "",
				entity_properties: "",
				timeline: "wfsj",
				object_property: "key_label_2",
				fields: "eVEHICLE_cfzlmc,eVEHICLE_clflmc,eVEHICLE_cljgmc,eVEHICLE_dabh,eVEHICLE_dh,eVEHICLE_dsr,eVEHICLE_fkje,eVEHICLE_fxjgmc,eVEHICLE_fzjg,eVEHICLE_hphm,eVEHICLE_hpzl,eVEHICLE_hpzlmc,eVEHICLE_jdcsyr,eVEHICLE_jdcsyxzmc,eVEHICLE_jkfsmc,eVEHICLE_jtfsmc,eVEHICLE_sfzh,eVEHICLE_sgdjmc,eVEHICLE_wfdz,eVEHICLE_wfjfs,eVEHICLE_wfxwmc,eVEHICLE_zjcx,eVEHICLE_zqmj,eVEHICLE_zsxxdj,eVEHICLE_zsxzqh,hpzl_hphm,key,key_label_2,type,wfbh,wfsj",
				label_name: "事件_违章车辆",
				subject_property: "key"
			},
			phoneM_other: {
				icon_mapping: "entity-graphicon-cell_phone_mac",
				type_name: "手机(mac)",
				show_normal: "PHONEM_xh",
				key_mapping: "zdmac",
				label: "phoneM",
				element_type: "entity",
				groupby: "PHONEM_xh",
				type: "other",
				title: "PHONEM_xh,PHONEM_csmc",
				menu: "",
				minor_prop: "PHONEM_sbmc,PHONEM_lymac,PHONEM_tzms,zdmac",
				gen_key_type: "string",
				primary_prop: "PHONEM_xh,PHONEM_csmc,PHONEM_imei",
				icon_prop: "",
				timeline: "",
				show_bigger: "PHONEM_xh,PHONEM_csmc",
				fields: "key,PHONEM_csmc,PHONEM_imei,PHONEM_lymac,PHONEM_sbmc,PHONEM_tzms,PHONEM_xh,type,zdmac",
				label_name: "手机M",
				key_prop: "key"
			},
			weibopublish_event_other: {
				icon_mapping: "event-graphicon-micro_blog_staterelease2",
				type_name: "事件_微博状态发布",
				subject_label: "weibo",
				object_label: "vehicle",
				label: "weibopublish_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,zhlx_fbzzh",
				minor_prop: "eWEIBOPUBLISH_bwid,eWEIBOPUBLISH_nr,eWEIBOPUBLISH_dzs,eWEIBOPUBLISH_pls,eWEIBOPUBLISH_zfs,eWEIBOPUBLISH_ysbwid,eWEIBOPUBLISH_xgbwid,eWEIBOPUBLISH_wbhtxx,eWEIBOPUBLISH_cjzh,eWEIBOPUBLISH_xxlx",
				entity_label: "vehicle",
				primary_prop: "eWEIBOPUBLISH_fbzid,eWEIBOPUBLISH_fbznc,eWEIBOPUBLISH_fbzzh",
				icon_prop: "",
				entity_properties: "",
				timeline: "sj",
				object_property: "",
				fields: "eWEIBOPUBLISH_bwid,eWEIBOPUBLISH_cjzh,eWEIBOPUBLISH_dzs,eWEIBOPUBLISH_fbzid,eWEIBOPUBLISH_fbznc,eWEIBOPUBLISH_fbzzh,eWEIBOPUBLISH_nr,eWEIBOPUBLISH_pls,eWEIBOPUBLISH_wbhtxx,eWEIBOPUBLISH_xgbwid,eWEIBOPUBLISH_xxlx,eWEIBOPUBLISH_ysbwid,eWEIBOPUBLISH_zfs,eWEIBOPUBLISH_zhlx,key,sj,type,zhlx_fbzzh",
				label_name: "事件_微博状态发布",
				subject_property: "key"
			},
			internetcafe_event_other: {
				icon_mapping: "event-graphicon-wangba2",
				type_name: "事件_网吧",
				subject_label: "person",
				object_label: "internetcafe",
				label: "internetcafe_event",
				element_type: "event",
				groupby: "eINTERNETCAFE_zjlx_dm",
				type: "other",
				title: "type,eINTERNETCAFE_wbmc",
				minor_prop: "eINTERNETCAFE_xm,eINTERNETCAFE_zjlx,eINTERNETCAFE_zjlx_dm,eINTERNETCAFE_kh,eINTERNETCAFE_swip,eINTERNETCAFE_swlx,eINTERNETCAFE_jqmc,wbbm,eINTERNETCAFE_wbdz,eINTERNETCAFE_gxdwmc",
				properties_display: "",
				entity_label: "internetcafe",
				primary_prop: "eINTERNETCAFE_wbmc,swsj,eINTERNETCAFE_xwsj",
				icon_prop: "",
				entity_properties: "wbbm",
				if_display: "true",
				timeline: "swsj",
				object_property: "key_label_2",
				fields: "eINTERNETCAFE_gxdwmc,eINTERNETCAFE_jqmc,eINTERNETCAFE_kh,eINTERNETCAFE_swip,eINTERNETCAFE_swlx,eINTERNETCAFE_wbdz,eINTERNETCAFE_wbmc,eINTERNETCAFE_xm,eINTERNETCAFE_xwsj,eINTERNETCAFE_zjlx,eINTERNETCAFE_zjlx_dm,key,key_label_1,key_label_2,swsj,type,wbbm",
				label_name: "事件_网吧",
				subject_property: "key"
			},
			sms_event_other: {
				icon_mapping: "event-graphicon-mobile_sms",
				type_name: "事件_手机sms",
				subject_label: "vehicle",
				object_label: "vehicle",
				label: "sms_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,zzh",
				minor_prop: "eSMS_bddz,eSMS_ckzt,eSMS_ccwz,eSMS_jsxxnr",
				entity_label: "vehicle",
				primary_prop: "zzh,fssj,dfzh",
				icon_prop: "",
				entity_properties: "",
				timeline: "fssj",
				object_property: "",
				fields: "dfzh,eSMS_bddz,eSMS_ccwz,eSMS_ckzt,eSMS_jsxxnr,fssj,key,key_label_2,type,zzh",
				label_name: "事件_手机sms",
				subject_property: ""
			},
			phone_phoneNO_relation_other: {
				icon_mapping: "relation-graphicon-cell_phone",
				type_name: "手机终端_手机号关系",
				subject_label: "phoneI",
				show_normal: "type",
				object_label: "phoneNO",
				label: "phone_phoneNO_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,imei",
				minor_prop: "rPHONEPHONENO_cjsj",
				primary_prop: "imei,sjhm",
				icon_prop: "",
				timeline: "rPHONEPHONENO_cjsj",
				object_property: "key_label_2",
				show_bigger: "type,imei",
				fields: "imei,key_label_1,key_label_2,rPHONEPHONENO_cjsj,sjhm,type",
				label_name: "手机终端_手机号",
				subject_property: "key_label_1"
			},
			browser_other: {
				icon_mapping: "entity-graphicon-browser_account",
				type_name: "浏览器帐号",
				show_normal: "BROWSER_yhnc",
				key_mapping: "zh",
				label: "browser",
				element_type: "entity",
				groupby: "",
				type: "other",
				title: "BROWSER_yhnc,zh",
				menu: "",
				minor_prop: "BROWSER_xb,BROWSER_nl,BROWSER_csny,BROWSER_gjdm,BROWSER_xzqh,BROWSER_yzbm,BROWSER_lxdz,BROWSER_rjmc,BROWSER_cjsj",
				gen_key_type: "string",
				primary_prop: "BROWSER_yhnc,zh,BROWSER_mm",
				icon_prop: "",
				timeline: "",
				show_bigger: "BROWSER_yhnc,zh",
				fields: "BROWSER_cjsj,BROWSER_csny,BROWSER_gjdm,BROWSER_lxdz,BROWSER_mm,BROWSER_nl,BROWSER_rjmc,BROWSER_xb,BROWSER_xzqh,BROWSER_yhnc,BROWSER_yzbm,key,type,zh",
				label_name: "浏览器帐号",
				key_prop: "key"
			},
			weibo_other: {
				icon_mapping: "entity-graphicon-micro_blog_account",
				type_name: "微博账号",
				show_normal: "WEIBO_yhnc",
				key_mapping: "WEIBO_zhlx,WEIBO_zh",
				label: "weibo",
				element_type: "entity",
				groupby: "",
				type: "other",
				title: "WEIBO_yhnc,WEIBO_zh",
				menu: "",
				minor_prop: "WEIBO_xb,WEIBO_nl,WEIBO_csny,WEIBO_fssl,WEIBO_byyx,WEIBO_gjdm,WEIBO_cs,WEIBO_xzqh,WEIBO_lzbm,WEIBO_lxdz,WEIBO_gxqm,WEIBO_gzsl,WEIBO_grsm,WEIBO_sxsl,WEIBO_xx,WEIBO_zymc,WEIBO_bwsl,WEIBO_azrq,WEIBO_cjsj",
				gen_key_type: "string",
				primary_prop: "WEIBO_zh,WEIBO_yhnc,WEIBO_zsm,WEIBO_mm",
				icon_prop: "",
				timeline: "WEIBO_azrq",
				show_bigger: "WEIBO_yhnc,WEIBO_zh",
				fields: "key,type,WEIBO_azrq,WEIBO_bwsl,WEIBO_byyx,WEIBO_cjsj,WEIBO_cs,WEIBO_csny,WEIBO_fssl,WEIBO_gjdm,WEIBO_grsm,WEIBO_gxqm,WEIBO_gzsl,WEIBO_lxdz,WEIBO_lzbm,WEIBO_mm,WEIBO_nl,WEIBO_sxsl,WEIBO_xb,WEIBO_xx,WEIBO_xzqh,WEIBO_yhnc,WEIBO_zh,WEIBO_zhlx,WEIBO_zsm,WEIBO_zymc,zhlx_zh",
				label_name: "微博账号",
				key_prop: "key"
			},
			immigration_event_other: {
				icon_mapping: "",
				type_name: "事件_出入境",
				subject_label: "vehicle",
				object_label: "vehicle",
				label: "immigration_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,eIMMIGRATION_xm",
				minor_prop: "eIMMIGRATION_crkamc,crkadm,eIMMIGRATION_qwd,eIMMIGRATION_qwddm,eIMMIGRATION_cfdssxq,eIMMIGRATION_crjsy,eIMMIGRATION_crjsydm",
				entity_label: "vehicle",
				primary_prop: "eIMMIGRATION_xm,eIMMIGRATION_qwd,crjsj",
				icon_prop: "",
				entity_properties: "",
				timeline: "crjsj",
				object_property: "",
				fields: "crjsj,crkadm,eIMMIGRATION_cfdssxq,eIMMIGRATION_crjsy,eIMMIGRATION_crjsydm,eIMMIGRATION_crkamc,eIMMIGRATION_qwd,eIMMIGRATION_qwddm,eIMMIGRATION_xm,key,key_label_2,type,zjhm",
				label_name: "事件_immigration",
				subject_property: ""
			},
			warning_other: {
				icon_mapping: "entity-graphicon-public_security_intelligence",
				type_name: "警情",
				show_normal: "WARNING_jqmc",
				key_mapping: "sjdbh",
				label: "warning",
				element_type: "entity",
				groupby: "WARNING_jjlx",
				type: "other",
				title: "WARNING_jqmc,WARNING_jqjbmc",
				menu: "",
				minor_prop: "WARNING_cjqk,WARNING_barxm,WARNING_bafsmc,WARNING_barlxdh,WARNING_barxb,WARNING_barzjhm,WARNING_bardw,WARNING_barcsrq,WARNING_bargjmc,WARNING_barmzmc,WARNING_barzjdm,WARNING_cjsj,WARNING_clbz,WARNING_clyj,WARNING_cjryj,WARNING_fasjks,WARNING_fasjjs,WARNING_fxdd,WARNING_fxsj,WARNING_faxz,WARNING_gabh,WARNING_jyaq,WARNING_jjdwmc,WARNING_jjdd,WARNING_jjfbh,WARNING_jjrxm,WARNING_jsdw,WARNING_jjsj,WARNING_lasj,WARNING_ldyj,WARNING_psrq,WARNING_sfwt,WARNING_szcsrq,WARNING_szdw,WARNING_szlxdh,WARNING_szxm,WARNING_szxb,WARNING_sznl,WARNING_szmz,WARNING_szzjhm,WARNING_szzy,WARNING_szzz,WARNING_slbh,WARNING_slnf,WARNING_ssrs,WARNING_qzjg,WARNING_swrs,WARNING_sszj,WARNING_tbrxm,WARNING_tbsj,WARNING_zbx,WARNING_zby,WARNING_xzqhmc,WARNING_ajlbmc,WARNING_ajlxmc,WARNING_ajlymc,WARNING_ajxlmc,WARNING_ajxzmc,WARNING_ajbh,WARNING_ajaymc,WARNING_afdzlbmc,WARNING_afdzlxmc,WARNING_barzz,WARNING_basj,WARNING_bjdh,WARNING_bjrxm,WARNING_bjxq,sjdbh",
				gen_key_type: "string",
				primary_prop: "WARNING_jqmc,WARNING_jqjbmc,WARNING_jjlx,WARNING_basj",
				icon_prop: "",
				timeline: "WARNING_fasjks",
				show_bigger: "WARNING_jqmc,WARNING_jqjbmc",
				fields: "geo,key,sjdbh,type,WARNING_afdzlbmc,WARNING_afdzlxmc,WARNING_ajaymc,WARNING_ajbh,WARNING_ajlbmc,WARNING_ajlxmc,WARNING_ajlymc,WARNING_ajxlmc,WARNING_ajxzmc,WARNING_bafsmc,WARNING_barcsrq,WARNING_bardw,WARNING_bargjmc,WARNING_barlxdh,WARNING_barmzmc,WARNING_barxb,WARNING_barxm,WARNING_barzjdm,WARNING_barzjhm,WARNING_barzz,WARNING_basj,WARNING_bjdh,WARNING_bjrxm,WARNING_bjxq,WARNING_chujingshijian,WARNING_cjqk,WARNING_cjryj,WARNING_cjsj,WARNING_clbz,WARNING_clyj,WARNING_fasjjs,WARNING_fasjks,WARNING_faxz,WARNING_fxdd,WARNING_fxsj,WARNING_gabh,WARNING_jjdd,WARNING_jjdwmc,WARNING_jjfbh,WARNING_jjlx,WARNING_jjrxm,WARNING_jjsj,WARNING_jqjbmc,WARNING_jqmc,WARNING_jsdw,WARNING_jyaq,WARNING_lasj,WARNING_ldyj,WARNING_psrq,WARNING_qzjg,WARNING_sfwt,WARNING_slbh,WARNING_slnf,WARNING_ssrs,WARNING_sszj,WARNING_swrs,WARNING_szcsrq,WARNING_szdw,WARNING_szlxdh,WARNING_szmz,WARNING_sznl,WARNING_szxb,WARNING_szxm,WARNING_szzjdm,WARNING_szzjhm,WARNING_szzy,WARNING_szzz,WARNING_tbrxm,WARNING_tbsj,WARNING_xzqhmc,WARNING_zbx,WARNING_zby",
				label_name: "警情",
				key_prop: "key"
			},
			qqwx_qqwxgroup_relation_other: {
				icon_mapping: "relation-graphicon-group_members",
				type_name: "群_群成员关系",
				subject_label: "qqwxG",
				show_normal: "type",
				object_label: "qqwx",
				label: "qqwx_qqwxgroup_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,rQQWXGROUP_qzzh",
				minor_prop: "rQQWXGROUP_qcyid,rQQWXGROUP_qcyzh,rQQWXGROUP_qcync,rQQWXGROUP_qcybz",
				primary_prop: "type,rQQWXGROUP_qzzh,rQQWXGROUP_zhlx,rQQWXGROUP_qzmc",
				icon_prop: "",
				timeline: "",
				object_property: "key_label_2",
				show_bigger: "type",
				fields: "key_label_1,key_label_2,rQQWXGROUP_qcybz,rQQWXGROUP_qcyid,rQQWXGROUP_qcync,rQQWXGROUP_qcyzh,rQQWXGROUP_qzmc,rQQWXGROUP_qzzh,rQQWXGROUP_zhlx,type,zhlx_qcyzh,zhlx_qzzh",
				label_name: "群_群成员关系",
				subject_property: "key_label_1"
			},
			person_phoneM_relation_other: {
				icon_mapping: "relation-graphicon-renshouji-m-guanxi",
				type_name: "人_手机M关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "phoneM",
				label: "person_phoneM_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,sfzh",
				minor_prop: "zdmac,rPHONEM_cjsj",
				primary_prop: "sfzh",
				icon_prop: "",
				timeline: "rPHONEM_cjsj",
				object_property: "key_label_2",
				show_bigger: "type,sfzh",
				fields: "key_label_1,key_label_2,rPHONEM_cjsj,sfzh,type,zdmac",
				label_name: "人_手机M关系",
				subject_property: "sfzh"
			},
			household_community_household: {
				icon_mapping: "entity-graphicon-collective-household",
				type_name: "集体户",
				show_normal: "HOUSEHOLD_hlx_mc",
				key_mapping: "HOUSEHOLD_hlx,HOUSEHOLD_hh",
				label: "household",
				element_type: "entity",
				groupby: "",
				type: "community_household",
				title: "HOUSEHOLD_hlx_mc,HOUSEHOLD_hh",
				menu: "",
				minor_prop: "HOUSEHOLD_nzfbs,HOUSEHOLD_xz,HOUSEHOLD_ssssxq,HOUSEHOLD_rybh",
				gen_key_type: "string",
				primary_prop: "HOUSEHOLD_hlx_mc,HOUSEHOLD_hh,HOUSEHOLD_hkxz",
				icon_prop: "",
				timeline: "",
				show_bigger: "HOUSEHOLD_hlx_mc,HOUSEHOLD_hh",
				fields: "hlx_hh,HOUSEHOLD_hh,HOUSEHOLD_hkxz,HOUSEHOLD_hlx,HOUSEHOLD_hlx_mc,HOUSEHOLD_nzfbs,HOUSEHOLD_rybh,HOUSEHOLD_ssssxq,HOUSEHOLD_xz,key,type",
				label_name: "户口",
				key_prop: "key"
			},
			flightLG_event_other: {
				icon_mapping: "event-graphicon-departures",
				type_name: "事件_空港离港",
				subject_label: "vehicle",
				object_label: "vehicle",
				label: "flightLG_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,hbh",
				minor_prop: "eFLIGHTlg_zwm,eFLIGHTlg_ywm,eFLIGHTlg_zjlx,eFLIGHTlg_zwh,eFLIGHTlg_djh,eFLIGHTlg_xlzjs,eFLIGHTlg_xlzzl,eFLIGHTlg_jgsj,eFLIGHTlg_lgsj,eFLIGHTlg_cyhkgs,eFLIGHTlg_ysdhhm",
				entity_label: "vehicle",
				primary_prop: "hbh,hbrq,eFLIGHTlg_djjc,eFLIGHTlg_ddjc",
				icon_prop: "",
				entity_properties: "",
				timeline: "hbrq",
				object_property: "",
				fields: "eFLIGHTlg_cyhkgs,eFLIGHTlg_ddjc,eFLIGHTlg_djh,eFLIGHTlg_djjc,eFLIGHTlg_jgsj,eFLIGHTlg_lgsj,eFLIGHTlg_xdhhm,eFLIGHTlg_xlzjs,eFLIGHTlg_xlzzl,eFLIGHTlg_ysdhhm,eFLIGHTlg_ywm,eFLIGHTlg_zjlx,eFLIGHTlg_zwh,eFLIGHTlg_zwm,hbh,hbrq,key,key_label_1,key_label_2,type",
				label_name: "事件_空港离港",
				subject_property: ""
			},
			vehicle_big_vehicle: {
				icon_mapping: "entity-graphicon-big-car",
				type_name: "大型车",
				show_normal: "VEHICLE_hphm",
				key_mapping: "VEHICLE_hpzl,VEHICLE_hphm",
				label: "vehicle",
				element_type: "entity",
				groupby: "VEHICLE_zwpp,VEHICLE_cllxmc",
				type: "big_vehicle",
				menu: "vehicle_relation",
				title: "VEHICLE_hphm,VEHICLE_cllxmc",
				minor_prop: "VEHICLE_jdcsyr,VEHICLE_syxzmc,VEHICLE_zwpp,VEHICLE_clxh,VEHICLE_ywpp,VEHICLE_gcjkmc,VEHICLE_zzgmc,VEHICLE_zjdjrq,VEHICLE_jyyxqz,VEHICLE_qzbfqz,VEHICLE_glbmmc,VEHICLE_fprq,VEHICLE_fxszrq,VEHICLE_fdjzsrq,VEHICLE_fhgzrq,VEHICLE_bxzzrq,VEHICLE_rlzlmc,VEHICLE_pl,VEHICLE_gl,VEHICLE_zxxs,VEHICLE_cwkc,VEHICLE_cwkk,VEHICLE_cwkg,VEHICLE_hxnbcd,VEHICLE_hxnbkd,VEHICLE_hxnbgd,VEHICLE_gbthps,VEHICLE_zs,VEHICLE_zj,VEHICLE_qlj,VEHICLE_hlj,VEHICLE_ltgg,VEHICLE_lts,VEHICLE_zzl,VEHICLE_zbzl,VEHICLE_hdzzl,VEHICLE_hdzk,VEHICLE_zqyzzl,VEHICLE_jssqpzkrs,VEHICLE_jsshpzkrs,VEHICLE_xsdw,VEHICLE_xsjg,VEHICLE_xsrq,VEHICLE_clyt,VEHICLE_jszh,VEHICLE_fzjg,VEHICLE_zjcx",
				gen_key_type: "base64",
				primary_prop: "VEHICLE_hphm,VEHICLE_hpzl_mc,VEHICLE_cllxmc,VEHICLE_fdjh,VEHICLE_fdjxh",
				icon_prop: "",
				timeline: "VEHICLE_ccdjrq",
				show_bigger: "VEHICLE_hphm,VEHICLE_cllxmc",
				fields: "hpzl_hphm,key,type,VEHICLE_bxzzrq,VEHICLE_ccdjrq,VEHICLE_clflmc,VEHICLE_cllxmc,VEHICLE_cllxmcS,VEHICLE_clsbdh,VEHICLE_clxh,VEHICLE_clyt,VEHICLE_csysmc,VEHICLE_cwkc,VEHICLE_cwkg,VEHICLE_cwkk,VEHICLE_fdjh,VEHICLE_fdjxh,VEHICLE_fdjzsrq,VEHICLE_fhgzrq,VEHICLE_fprq,VEHICLE_fxszrq,VEHICLE_fzjg,VEHICLE_gbthps,VEHICLE_gcjkmc,VEHICLE_gl,VEHICLE_glbmmc,VEHICLE_hdzk,VEHICLE_hdzzl,VEHICLE_hlj,VEHICLE_hphm,VEHICLE_hpzl,VEHICLE_hpzl_mc,VEHICLE_hxnbcd,VEHICLE_hxnbgd,VEHICLE_hxnbkd,VEHICLE_jdcsyr,VEHICLE_jsshpzkrs,VEHICLE_jssqpzkrs,VEHICLE_jszh,VEHICLE_jyyxqz,VEHICLE_ltgg,VEHICLE_lts,VEHICLE_pl,VEHICLE_qlj,VEHICLE_qzbfqz,VEHICLE_rlzlmc,VEHICLE_syxzmc,VEHICLE_xsdw,VEHICLE_xsjg,VEHICLE_xsrq,VEHICLE_ywpp,VEHICLE_zbzl,VEHICLE_zj,VEHICLE_zjcx,VEHICLE_zjdjrq,VEHICLE_zqyzzl,VEHICLE_zs,VEHICLE_zwpp,VEHICLE_zxxs,VEHICLE_zzcmc,VEHICLE_zzgmc,VEHICLE_zzl",
				label_name: "车",
				key_prop: "key"
			},
			atm_other: {
				icon_mapping: "entity-graphicon-atm",
				type_name: "ATM机",
				show_normal: "atmid",
				key_mapping: "atmid",
				label: "atm",
				element_type: "entity",
				groupby: "",
				type: "other",
				title: "atmid,ATM_wzqy",
				menu: "",
				minor_prop: "ATM_zzs,geo,ATM_jd,ATM_wd",
				gen_key_type: "string",
				primary_prop: "atmid,ATM_wzqy",
				icon_prop: "",
				timeline: "",
				show_bigger: "atmid,type",
				fields: "atmid,ATM_jd,ATM_wd,ATM_wzqy,ATM_zzs,geo,key,type",
				label_name: "ATM机",
				key_prop: "key"
			},
			spouse_relation_other: {
				icon_mapping: "relation-graphicon-mate",
				type_name: "配偶关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "person",
				label: "spouse_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,ztsfhm",
				minor_prop: "rSPOUSE_ztxm,rSPOUSE_xb,rSPOUSE_mz,rSPOUSE_poxm",
				primary_prop: "type,ztsfhm,pogmsfhm",
				icon_prop: "",
				timeline: "",
				object_property: "pogmsfhm",
				show_bigger: "type",
				fields: "key_label_1,key_label_2,pogmsfhm,rSPOUSE_mz,rSPOUSE_poxm,rSPOUSE_xb,rSPOUSE_ztxm,type,ztsfhm",
				label_name: "配偶关系",
				subject_property: "ztsfhm"
			},
			warningCase_relation_other: {
				icon_mapping: "relation-graphicon-police_case",
				type_name: "警案关系",
				subject_label: "warning",
				show_normal: "type",
				object_label: "case",
				label: "warningCase_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,sjdbh",
				minor_prop: "rWARNINGCASE_bafs,rWARNINGCASE_jjsj,rWARNINGCASE_lasj,sjdbh",
				primary_prop: "ajbh,rWARNINGCASE_ajly,rWARNINGCASE_ajxz",
				icon_prop: "",
				timeline: "rWARNINGCASE_jjsj",
				object_property: "key_label_2",
				show_bigger: "type",
				fields: "ajbh,key_label_1,key_label_2,rWARNINGCASE_ajly,rWARNINGCASE_ajxz,rWARNINGCASE_bafs,rWARNINGCASE_jjsj,rWARNINGCASE_lasj,sjdbh,type",
				label_name: "警案关系",
				subject_property: "key_label_1"
			},
			qqwxpublish_event_other: {
				icon_mapping: "event-graphicon-qq_and_wechat_staterelease",
				type_name: "事件_QQ微信状态发布",
				subject_label: "qqwx",
				object_label: "vehicle",
				label: "qqwxpublish_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,zhlx_fbzzh",
				minor_prop: "eQQWXPUBLISH_xxlx,eQQWXPUBLISH_nr,eQQWXPUBLISH_dzs,eQQWXPUBLISH_zfs,eQQWXPUBLISH_pls,sj,eQQWXPUBLISH_cjzh",
				entity_label: "vehicle",
				primary_prop: "eQQWXPUBLISH_fbzid,eQQWXPUBLISH_fbznc,eQQWXPUBLISH_zhlx,eQQWXPUBLISH_fbzzh",
				icon_prop: "",
				entity_properties: "",
				timeline: "sj",
				object_property: "",
				fields: "eQQWXPUBLISH_cjzh,eQQWXPUBLISH_dzs,eQQWXPUBLISH_fbzid,eQQWXPUBLISH_fbznc,eQQWXPUBLISH_fbzzh,eQQWXPUBLISH_nr,eQQWXPUBLISH_pls,eQQWXPUBLISH_xxlx,eQQWXPUBLISH_zfs,eQQWXPUBLISH_zhlx,key,sj,type,zhlx_fbzzh",
				label_name: "事件_QQ微信状态发布",
				subject_property: "key"
			},
			passporthotel_event_other: {
				icon_mapping: "event-graphicon-huzhaozhusu",
				type_name: "事件_护照住宿",
				subject_label: "passport",
				object_label: "hotel",
				label: "passporthotel_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,ePASSPORTHOTEL_xm",
				minor_prop: "ePASSPORTHOTEL_xm,ePASSPORTHOTEL_lkid,ePASSPORTHOTEL_tfsj,zjhm,lddm,ePASSPORTHOTEL_ldxz,ePASSPORTHOTEL_qtscsj,ePASSPORTHOTEL_xz,ePASSPORTHOTEL_hylx,ePASSPORTHOTEL_gxdwmc,ePASSPORTHOTEL_ssxmc",
				entity_label: "hotel",
				primary_prop: "rzsj,ePASSPORTHOTEL_fjh,ePASSPORTHOTEL_ldmc",
				icon_prop: "",
				entity_properties: "lddm",
				object_property: "key_label_2",
				timeline: "rzsj",
				fields: "ePASSPORTHOTEL_fjh,ePASSPORTHOTEL_gxdwmc,ePASSPORTHOTEL_hylx,ePASSPORTHOTEL_ldmc,ePASSPORTHOTEL_ldxz,ePASSPORTHOTEL_lkid,ePASSPORTHOTEL_qtscsj,ePASSPORTHOTEL_ssxmc,ePASSPORTHOTEL_tfsj,ePASSPORTHOTEL_xm,ePASSPORTHOTEL_xz,ePASSPORTHOTEL_zjlxdm,key,key_label_2,lddm,rzsj,type,zjhm",
				label_name: "事件_护照住宿",
				subject_property: "key"
			},
			vehicle_small_vehicle: {
				icon_mapping: "entity-graphicon-small-car",
				type_name: "小型车",
				show_normal: "hpzl_hphm",
				key_mapping: "VEHICLE_hpzl,VEHICLE_hphm",
				label: "vehicle",
				element_type: "entity",
				groupby: "VEHICLE_zwpp,VEHICLE_cllxmc",
				type: "small_vehicle",
				menu: "vehicle_relation",
				title: "VEHICLE_hphm,VEHICLE_cllxmc",
				minor_prop: "VEHICLE_clflmc,VEHICLE_jdcsyr,VEHICLE_syxzmc,VEHICLE_zwpp,VEHICLE_clxh,VEHICLE_ywpp,VEHICLE_gcjkmc,VEHICLE_zzgmc,VEHICLE_zzcmc,VEHICLE_clsbdh,VEHICLE_csysmc,VEHICLE_ccdjrq,VEHICLE_zjdjrq,VEHICLE_jyyxqz,VEHICLE_glbmmc,VEHICLE_fprq,VEHICLE_fxszrq,VEHICLE_fdjzsrq,VEHICLE_fhgzrq,VEHICLE_bxzzrq,VEHICLE_rlzlmc,VEHICLE_pl,VEHICLE_gl,VEHICLE_zxxs,VEHICLE_cwkc,VEHICLE_cwkk,VEHICLE_cwkg,VEHICLE_hxnbcd,VEHICLE_hxnbkd,VEHICLE_hxnbgd,VEHICLE_zs,VEHICLE_zj,VEHICLE_qlj,VEHICLE_hlj,VEHICLE_ltgg,VEHICLE_lts,VEHICLE_zzl,VEHICLE_zbzl,VEHICLE_hdzzl,VEHICLE_hdzk,VEHICLE_zqyzzl,VEHICLE_gbthps,VEHICLE_jssqpzkrs,VEHICLE_jsshpzkrs,VEHICLE_xsdw,VEHICLE_xsjg,VEHICLE_xsrq,VEHICLE_clyt,VEHICLE_qzbfqz,VEHICLE_jszh,VEHICLE_zjcx,VEHICLE_fzjg",
				gen_key_type: "base64",
				primary_prop: "VEHICLE_hphm,VEHICLE_hpzl_mc,VEHICLE_cllxmc,VEHICLE_fdjh,VEHICLE_fdjxh",
				icon_prop: "",
				timeline: "VEHICLE_ccdjrq",
				show_bigger: "VEHICLE_hphm,VEHICLE_cllxmc",
				fields: "hpzl_hphm,key,type,VEHICLE_bxzzrq,VEHICLE_ccdjrq,VEHICLE_clflmc,VEHICLE_cllxmc,VEHICLE_cllxmcS,VEHICLE_clsbdh,VEHICLE_clxh,VEHICLE_clyt,VEHICLE_csysmc,VEHICLE_cwkc,VEHICLE_cwkg,VEHICLE_cwkk,VEHICLE_fdjh,VEHICLE_fdjxh,VEHICLE_fdjzsrq,VEHICLE_fhgzrq,VEHICLE_fprq,VEHICLE_fxszrq,VEHICLE_fzjg,VEHICLE_gbthps,VEHICLE_gcjkmc,VEHICLE_gl,VEHICLE_glbmmc,VEHICLE_hdzk,VEHICLE_hdzzl,VEHICLE_hlj,VEHICLE_hphm,VEHICLE_hpzl,VEHICLE_hpzl_mc,VEHICLE_hxnbcd,VEHICLE_hxnbgd,VEHICLE_hxnbkd,VEHICLE_jdcsyr,VEHICLE_jsshpzkrs,VEHICLE_jssqpzkrs,VEHICLE_jszh,VEHICLE_jyyxqz,VEHICLE_ltgg,VEHICLE_lts,VEHICLE_pl,VEHICLE_qlj,VEHICLE_qzbfqz,VEHICLE_rlzlmc,VEHICLE_syxzmc,VEHICLE_xsdw,VEHICLE_xsjg,VEHICLE_xsrq,VEHICLE_ywpp,VEHICLE_zbzl,VEHICLE_zj,VEHICLE_zjcx,VEHICLE_zjdjrq,VEHICLE_zqyzzl,VEHICLE_zs,VEHICLE_zwpp,VEHICLE_zxxs,VEHICLE_zzcmc,VEHICLE_zzgmc,VEHICLE_zzl",
				label_name: "车",
				key_prop: "key"
			},
			passportflightDP_event_other: {
				icon_mapping: "event-graphicon-huzhaodingpiao",
				type_name: "事件_护照空港订票",
				subject_label: "vehicle",
				object_label: "vehicle",
				label: "passportflightDP_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,hbh",
				minor_prop: "ePASSPORTFLIGHTdp_cyhkgs,ePASSPORTFLIGHTdp_ddsj,ePASSPORTFLIGHTdp_zcw,ePASSPORTFLIGHTdp_pnrcjrq,ePASSPORTFLIGHTdp_bdrkmc,ePASSPORTFLIGHTdp_zwm,ePASSPORTFLIGHTdp_ywm,ePASSPORTFLIGHTdp_zjlx,zjhm",
				entity_label: "vehicle",
				primary_prop: "hbh,ePASSPORTFLIGHTdp_djjc,ePASSPORTFLIGHTdp_ddjc,cfsj",
				icon_prop: "",
				entity_properties: "",
				timeline: "cfsj",
				object_property: "",
				fields: "cfsj,ePASSPORTFLIGHTdp_bdrkmc,ePASSPORTFLIGHTdp_cyhkgs,ePASSPORTFLIGHTdp_ddjc,ePASSPORTFLIGHTdp_ddsj,ePASSPORTFLIGHTdp_djjc,ePASSPORTFLIGHTdp_pnrcjrq,ePASSPORTFLIGHTdp_ywm,ePASSPORTFLIGHTdp_zcw,ePASSPORTFLIGHTdp_zjlx,ePASSPORTFLIGHTdp_zwm,hbh,key,key_label_2,type,zjhm",
				label_name: "事件_护照空港订票",
				subject_property: ""
			},
			weiboSMS_event_other: {
				icon_mapping: "event-graphicon-micro_blog_privateletter",
				type_name: "事件_微博私信",
				subject_label: "vehicle",
				object_label: "vehicle",
				label: "weiboSMS_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,eWEIBOsms_fxrzh",
				minor_prop: "eWEIBOsms_sxnr,eWEIBOsms_bddz,eWEIBOsms_sxid",
				entity_label: "vehicle",
				primary_prop: "eWEIBOsms_fxrzh,fssj,eWEIBOsms_sxrzh",
				icon_prop: "",
				entity_properties: "",
				timeline: "fssj",
				object_property: "",
				fields: "eWEIBOsms_bddz,eWEIBOsms_bjzh,eWEIBOsms_fxrzh,eWEIBOsms_sxid,eWEIBOsms_sxnr,eWEIBOsms_sxrzh,eWEIBOsms_zhlx,fssj,key,key_label_2,type,zhlx_fxrzh,zhlx_sxrzh",
				label_name: "事件_微博私信",
				subject_property: ""
			},
			guardian1_relation_other: {
				icon_mapping: "relation-graphicon-guardian",
				type_name: "监护人1关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "person",
				label: "guardian1_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,ztsfhm",
				minor_prop: "rGUARDIA1_mz,rGUARDIA1_xb,rGUARDIA1_jhr1xm,jhr1gmsfhm,rGUARDIA1_jhr1gx",
				primary_prop: "type,rGUARDIA1_ztxm,ztsfhm",
				icon_prop: "",
				timeline: "",
				object_property: "jhr1gmsfhm",
				show_bigger: "type",
				fields: "jhr1gmsfhm,key_label_1,key_label_2,rGUARDIA1_jhr1gx,rGUARDIA1_jhr1xm,rGUARDIA1_mz,rGUARDIA1_xb,rGUARDIA1_ztxm,type,ztsfhm",
				label_name: "监护人1关系",
				subject_property: "ztsfhm"
			},
			phone_relation_other: {
				icon_mapping: "relation-graphicon-cell_phonenumber",
				type_name: "通话关系",
				subject_label: "phoneNO",
				show_normal: "type",
				key_mapping: "",
				object_label: "phoneNO",
				label: "phone_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,bjhm",
				minor_prop: "time,ePHONE_thsc,ePHONE_thjssj,ePHONE_bddz,ePHONE_dfgsd,ePHONE_fwh,ePHONE_jmzt,ePHONE_jzh,ePHONE_thd,ePHONE_lxrxm,ePHONE_thzt,ePHONE_xqh,ePHONE_thddqh",
				gen_key_type: "string",
				primary_prop: "bjhm,dfhm,ePHONE_hjlx,ePHONE_thlx",
				icon_prop: "",
				timeline: "time",
				object_property: "key_label_2",
				show_bigger: "type",
				fields: "bjhm,dfhm,ePHONE_bddz,ePHONE_dfgsd,ePHONE_fwh,ePHONE_hjlx,ePHONE_jmzt,ePHONE_jzh,ePHONE_lxrxm,ePHONE_thd,ePHONE_thddqh,ePHONE_thjssj,ePHONE_thlx,ePHONE_thsc,ePHONE_thzt,ePHONE_xqh,key_label_1,key_label_2,time,type",
				label_name: "通话关系",
				subject_property: "key_label_1"
			},
			passporttrain_event_other: {
				icon_mapping: "event-graphicon-huzhaohuoche",
				type_name: "事件_护照火车",
				subject_label: "passport",
				object_label: "trainNumber",
				label: "passporttrain_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,new_cc",
				minor_prop: "ePASSPORTTRAIN_xm,zjhm,ePASSPORTTRAIN_cph,ePASSPORTTRAIN_spckh,ePASSPORTTRAIN_spczh,ePASSPORTTRAIN_spczjc,ePASSPORTTRAIN_spsj,ePASSPORTTRAIN_spczybh,ePASSPORTTRAIN_cxh,ePASSPORTTRAIN_zwh",
				properties_display: "",
				entity_label: "trainNumber",
				primary_prop: "new_cc,ePASSPORTTRAIN_fz,ePASSPORTTRAIN_dz,ccrq",
				icon_prop: "",
				entity_properties: "key_label_2",
				if_display: "true",
				object_property: "key_label_2",
				timeline: "ccrq",
				fields: "ccrq,ePASSPORTTRAIN_cc,ePASSPORTTRAIN_cph,ePASSPORTTRAIN_cxh,ePASSPORTTRAIN_dz,ePASSPORTTRAIN_fz,ePASSPORTTRAIN_spckh,ePASSPORTTRAIN_spczh,ePASSPORTTRAIN_spczjc,ePASSPORTTRAIN_spczybh,ePASSPORTTRAIN_spsj,ePASSPORTTRAIN_xm,ePASSPORTTRAIN_zjid,ePASSPORTTRAIN_zwh,key,key_label_2,new_cc,type,zjhm",
				label_name: "事件_护照火车",
				subject_property: "key"
			},
			person_phone_relation_other: {
				icon_mapping: "relation-graphicon-cell_phone",
				type_name: "人_手机关系",
				subject_label: "person",
				show_normal: "sfzh",
				object_label: "phoneI",
				label: "person_phone_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,sfzh",
				minor_prop: "imei,rPHONE_cjsj",
				primary_prop: "sfzh",
				icon_prop: "",
				timeline: "rPHONE_cjsj",
				object_property: "key_label_2",
				show_bigger: "sfzh",
				fields: "imei,key_label_1,key_label_2,rPHONE_cjsj,sfzh,type",
				label_name: "人_手机关系",
				subject_property: "sfzh"
			},
			person_email_relation_other: {
				icon_mapping: "relation-graphicon-email",
				type_name: "人_邮箱账号关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "email",
				label: "person_email_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,zh",
				minor_prop: "sfzh,rEMAIL_cjsj",
				primary_prop: "type,zh",
				icon_prop: "",
				timeline: "rEMAIL_cjsj",
				object_property: "key_label_2",
				show_bigger: "type",
				fields: "key_label_1,key_label_2,rEMAIL_cjsj,sfzh,type,zh",
				label_name: "人_邮箱账号关系",
				subject_property: "sfzh"
			},
			warningReport_relation_other: {
				icon_mapping: "relation-graphicon-people_reported_the_cas",
				type_name: "人报警情关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "warning",
				label: "warningReport_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,rWARNINGREPORT_barxm",
				minor_prop: "rWARNINGREPORT_basj,rWARNINGREPORT_barlxdh,rWARNINGREPORT_barzjlx,barzjhm",
				primary_prop: "type,rWARNINGREPORT_barxm,sjdbh",
				icon_prop: "",
				timeline: "rWARNINGREPORT_basj",
				object_property: "key_label_2",
				show_bigger: "type",
				fields: "barzjhm,key_label_1,key_label_2,rWARNINGREPORT_barlxdh,rWARNINGREPORT_barxm,rWARNINGREPORT_barzjlx,rWARNINGREPORT_basj,sjdbh,type",
				label_name: "人报警情关系",
				subject_property: "barzjhm"
			},
			person_weibo_relation_other: {
				icon_mapping: "",
				type_name: "人_微博账号关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "weibo",
				label: "person_weibo_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,rWEIBO_zh",
				minor_prop: "",
				entity_label: "vehicle",
				primary_prop: "rWEIBO_zh,sfzh",
				icon_prop: "",
				entity_properties: "",
				timeline: "",
				object_property: "key_label_2",
				show_bigger: "type",
				fields: "key_label_1,key_label_2,rWEIBO_cjsj,rWEIBO_zh,rWEIBO_zhlx,sfzh,type,zhlx_zh",
				label_name: "人_微博账号关系",
				subject_property: "sfzh"
			},
			wifi_event_other: {
				icon_mapping: "event-graphicon-event-nowifi",
				type_name: "事件_wifi",
				subject_label: "phoneM",
				object_label: "wifi",
				label: "wifi_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,eWIFI_COLLECTION_EQUIPMENT_ADRESS",
				minor_prop: "CAPTURE_TIME,eWIFI_AP_CHANNEL,eWIFI_AP_FIELD_STRENGTH,eWIFI_AP_SSID,eWIFI_COLLECTION_EQUIPMENT_LONGITUDE,eWIFI_COLLECTION_EQUIPMENT_LATITUDE,eWIFI_ENCRYPT_ALGORITHM_TYPE",
				entity_label: "wifi",
				primary_prop: "AP_MAC,COLLECTION_EQUIPMENT_ID,eWIFI_COLLECTION_EQUIPMENT_ADRESS",
				icon_prop: "",
				entity_properties: "COLLECTION_EQUIPMENT_ID",
				timeline: "CAPTURE_TIME",
				object_property: "key_label_2",
				fields: "AP_MAC,CAPTURE_TIME,COLLECTION_EQUIPMENT_ID,eWIFI_AP_CHANNEL,eWIFI_AP_FIELD_STRENGTH,eWIFI_AP_SSID,eWIFI_COLLECTION_EQUIPMENT_ADRESS,eWIFI_COLLECTION_EQUIPMENT_LATITUDE,eWIFI_COLLECTION_EQUIPMENT_LONGITUDE,eWIFI_ENCRYPT_ALGORITHM_TYPE,eWIFI_NETBAR_WACODE,eWIFI_X_COORDINATE,eWIFI_Y_COORDINATE,key,key_label_2,type",
				label_name: "事件_wifi",
				subject_property: "key"
			},
			taobao_other: {
				icon_mapping: "entity-graphicon-taobao_account",
				type_name: "淘宝帐号",
				show_normal: "TAOBAO_yhnc",
				key_mapping: "zh",
				label: "taobao",
				element_type: "entity",
				groupby: "TAOBAO_cs",
				type: "other",
				title: "TAOBAO_yhnc,zh,TAOBAO_zsm",
				menu: "",
				minor_prop: "TAOBAO_xb,TAOBAO_nl,TAOBAO_zymc,TAOBAO_byyx,TAOBAO_csny,TAOBAO_grsm,TAOBAO_gxqm,TAOBAO_lxdz,TAOBAO_gjdm,TAOBAO_cs,TAOBAO_xzqh,TAOBAO_yzbm,TAOBAO_yxdz,TAOBAO_rjlx,TAOBAO_azrq,TAOBAO_cjsj",
				gen_key_type: "string",
				primary_prop: "TAOBAO_yhnc,zh,TAOBAO_zsm,TAOBAO_mm",
				icon_prop: "",
				timeline: "TAOBAO_azrq",
				show_bigger: "TAOBAO_yhnc,zh",
				fields: "key,TAOBAO_azrq,TAOBAO_byyx,TAOBAO_cjsj,TAOBAO_cs,TAOBAO_csny,TAOBAO_gjdm,TAOBAO_grsm,TAOBAO_gxqm,TAOBAO_lxdz,TAOBAO_mm,TAOBAO_nl,TAOBAO_rjlx,TAOBAO_xb,TAOBAO_xzqh,TAOBAO_yhnc,TAOBAO_yxdz,TAOBAO_yzbm,TAOBAO_zsm,TAOBAO_zymc,type,zh",
				label_name: "淘宝帐号",
				key_prop: "key"
			},
			internetcafe_other: {
				icon_mapping: "entity-graphicon-wangba",
				type_name: "网吧",
				show_normal: "INTERNETCAFE_wbmc",
				key_mapping: "wbbzid",
				label: "internetcafe",
				element_type: "entity",
				groupby: "",
				type: "other",
				title: "INTERNETCAFE_wbmc,wbbzid",
				menu: "",
				minor_prop: "INTERNETCAFE_wbip,INTERNETCAFE_jrfwyysdm,INTERNETCAFE_gxdwmc,INTERNETCAFE_wbssxqh,INTERNETCAFE_ztdm,INTERNETCAFE_yrksj",
				gen_key_type: "string",
				primary_prop: "INTERNETCAFE_wbmc,wbbzid,INTERNETCAFE_wbxz",
				icon_prop: "",
				timeline: "INTERNETCAFE_yrksj",
				show_bigger: "INTERNETCAFE_wbmc",
				fields: "geo,INTERNETCAFE_gxdwmc,INTERNETCAFE_jrfwyysdm,INTERNETCAFE_wbip,INTERNETCAFE_wbmc,INTERNETCAFE_wbssxqh,INTERNETCAFE_wbxz,INTERNETCAFE_yrksj,INTERNETCAFE_zbx,INTERNETCAFE_zby,INTERNETCAFE_ztdm,key,type,wbbzid",
				label_name: "网吧",
				key_prop: "key"
			},
			ip_other: {
				icon_mapping: "entity-graphicon-IP",
				type_name: "IP",
				show_normal: "ip",
				key_mapping: "ip",
				label: "ip",
				element_type: "entity",
				groupby: "",
				type: "other",
				title: "ip",
				menu: "",
				minor_prop: "IP_ssyys,geo,IP_xzqy,IP_jd,IP_wd",
				gen_key_type: "string",
				primary_prop: "ip,IP_wzmc",
				icon_prop: "",
				timeline: "",
				show_bigger: "ip",
				fields: "geo,ip,IP_jd,IP_ssyys,IP_wd,IP_wzmc,IP_xzqy,key,type",
				label_name: "IP",
				key_prop: "key"
			},
			case_other: {
				icon_mapping: "entity-graphicon-case",
				type_name: "案件",
				show_normal: "CASE_ajmc",
				key_mapping: "ajbh",
				label: "case",
				element_type: "entity",
				groupby: "CASE_ajlymc,CASE_ajlbmc",
				type: "other",
				title: "CASE_ajmc",
				menu: "criminal_relation",
				minor_prop: "CASE_ajbz,CASE_ajlbmc,CASE_ajlxmc,CASE_barq,CASE_basj,CASE_barlxdh,CASE_bafs,CASE_jyaq,CASE_falb,CASE_slrq,CASE_ay,CASE_smbz,CASE_larq,CASE_lalx,CASE_ladw,CASE_parq,CASE_palx,CASE_padw,CASE_jarq,CASE_jalx,CASE_xyrbz,CASE_shrbz,CASE_shrlb,CASE_shjg,CASE_shcd,CASE_shxs,CASE_shrq,CASE_xztqmc,CASE_xzcsmc,CASE_xzsjimc,CASE_xzrqmc,CASE_xzsjmc,CASE_xzwpmc,CASE_ybsdmc,CASE_qrfsmc,CASE_qrsdmc,CASE_blxpsdmc,CASE_qqsdmc,CASE_qzsdmc,CASE_fhsdmc,CASE_wzmjsdmc,CASE_lyjsjsdmc,CASE_qtsdmc,CASE_afdyxfx,CASE_ajqymc,CASE_gjlymc,CASE_xzfsmc,CASE_fyfsmc,CASE_zadj,CASE_zafsmc,CASE_zagcfx,CASE_zagjmc,CASE_zarssx,CASE_zarsxx,CASE_sfwdrza,CASE_sflcza,CASE_hdfwfx,CASE_lcfwfx,CASE_bz,CASE_faxz,CASE_fabwmc,CASE_fasjks,CASE_fasjjs,CASE_fxdd,CASE_fxsj,CASE_fzztmc,CASE_gjxsmc,CASE_sszrq,CASE_afcsmc,CASE_gzdw,CASE_jjdw,CASE_jjdd,CASE_jjry,CASE_jjsj,CASE_tlyxrq,CASE_zsgj,CASE_zsyy,CASE_jjss,CASE_saje,CASE_stfsmc,CASE_sytxgj,CASE_xwtdmc,CASE_xzdxmc,CASE_zzxsmc",
				gen_key_type: "string",
				primary_prop: "CASE_ajmc,ajbh,CASE_ajlymc,CASE_ajztmc",
				icon_prop: "",
				timeline: "CASE_basj",
				show_bigger: "CASE_ajmc,ajbh",
				fields: "ajbh,CASE_afcsmc,CASE_afdyxfx,CASE_ajbz,CASE_ajlbmc,CASE_ajlxmc,CASE_ajlymc,CASE_ajmc,CASE_ajqymc,CASE_ajztmc,CASE_ay,CASE_bafs,CASE_barlxdh,CASE_barq,CASE_basj,CASE_blxpsdmc,CASE_bmjb,CASE_bz,CASE_cdfsmc,CASE_czbs,CASE_fabwmc,CASE_falb,CASE_fasjjs,CASE_fasjks,CASE_faxz,CASE_fhsdmc,CASE_fxdd,CASE_fxsj,CASE_fyfsmc,CASE_fzztmc,CASE_gjlymc,CASE_gjxsmc,CASE_gzdw,CASE_hddq,CASE_hdfwfx,CASE_jalx,CASE_jarq,CASE_jjdd,CASE_jjdw,CASE_jjry,CASE_jjsj,CASE_jjss,CASE_jyaq,CASE_ladw,CASE_lalx,CASE_larq,CASE_lcfwfx,CASE_lyjsjsdmc,CASE_padw,CASE_palx,CASE_parq,CASE_qqsdmc,CASE_qrfsmc,CASE_qrsdmc,CASE_qtsdmc,CASE_qzsdmc,CASE_saje,CASE_sflcza,CASE_sfwdrza,CASE_shcd,CASE_shjg,CASE_shrbz,CASE_shrlb,CASE_shrq,CASE_shxs,CASE_slrq,CASE_smbz,CASE_sszrq,CASE_stfsmc,CASE_sytxgj,CASE_tlfsmc,CASE_tlyxrq,CASE_wzmjsdmc,CASE_xwtdmc,CASE_xyrbz,CASE_xzcsmc,CASE_xzdxmc,CASE_xzfsmc,CASE_xzrqmc,CASE_xzsjimc,CASE_xzsjmc,CASE_xztqmc,CASE_xzwpmc,CASE_ybsdmc,CASE_zadj,CASE_zafsmc,CASE_zagcfx,CASE_zagjmc,CASE_zarssx,CASE_zarsxx,CASE_zsgj,CASE_zsyy,CASE_zzxsmc,key,type",
				label_name: "案件",
				key_prop: "key"
			},
			person_qqwx_relation_other: {
				icon_mapping: "relation-graphicon-qq_and_wechat_number2",
				type_name: "人_QQ微信号关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "qqwx",
				label: "person_qqwx_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,sfzh",
				minor_prop: "rQQWX_cjsj",
				primary_prop: "rQQWX_zhlx,rQQWX_zh,sfzh",
				icon_prop: "",
				timeline: "rQQWX_cjsj",
				object_property: "key_label_2",
				show_bigger: "type",
				fields: "key_label_1,key_label_2,rQQWX_cjsj,rQQWX_zh,rQQWX_zhlx,sfzh,type,zhlx_zh",
				label_name: "人_QQ微信号关系",
				subject_property: "sfzh"
			},
			sms_relation_other: {
				icon_mapping: "relation-graphicon-email",
				type_name: "短信关系",
				subject_label: "phoneNO",
				show_normal: "type",
				key_mapping: "",
				object_label: "phoneNO",
				label: "sms_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,zzh",
				minor_prop: "time,eSMS_jsxxnr,eSMS_ckzt,eSMS_ccwz,eSMS_bddz",
				gen_key_type: "string",
				primary_prop: "type,zzh,dfzh",
				icon_prop: "",
				timeline: "time",
				object_property: "key_label_2",
				show_bigger: "type",
				fields: "dfzh,eSMS_bddz,eSMS_ccwz,eSMS_ckzt,eSMS_jsxxnr,key_label_1,key_label_2,time,type,zzh",
				label_name: "短信关系",
				subject_property: "key_label_1"
			},
			guardian2_relation_other: {
				icon_mapping: "relation-graphicon-guardian",
				type_name: "监护人2关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "person",
				label: "guardian2_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,ztsfhm",
				minor_prop: "rGUARDIA2_mz,rGUARDIA2_xb,rGUARDIA2_jhr2xm,jhr2gmsfhm,rGUARDIA2_jhr2gx",
				primary_prop: "type,rGUARDIA2_ztxm,ztsfhm",
				icon_prop: "",
				timeline: "",
				object_property: "jhr2gmsfhm",
				show_bigger: "type",
				fields: "jhr2gmsfhm,key_label_1,key_label_2,rGUARDIA2_jhr2gx,rGUARDIA2_jhr2xm,rGUARDIA2_mz,rGUARDIA2_xb,rGUARDIA2_ztxm,type,ztsfhm",
				label_name: "监护人2关系",
				subject_property: "ztsfhm"
			},
			acounttransin_event_other: {
				icon_mapping: "event-graphicon-chuzhangjiaoyi",
				type_name: "事件_账户汇入交易",
				show_normal: "zzh",
				key_mapping: "",
				label: "acounttransin_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,zzh",
				minor_prop: "jysj,eACOUNTTRANSin_jyhye",
				gen_key_type: "string",
				primary_prop: "zzh,eACOUNTTRANSin_jyfs,dfzh,eACOUNTTRANSin_jye",
				icon_prop: "",
				timeline: "jysj",
				show_bigger: "zzh",
				fields: "dfzh,eACOUNTTRANSin_jye,eACOUNTTRANSin_jyfs,eACOUNTTRANSin_jyhye,jysj,key_label_1,key_label_2,type,zzh",
				label_name: "事件_账户汇入交易"
			},
			person_phoneNO_relation_other: {
				icon_mapping: "relation-graphicon-cell_phonenumber",
				type_name: "人_手机号关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "phoneNO",
				label: "person_phoneNO_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,sjhm",
				minor_prop: "rPHONEno_cjsj",
				primary_prop: "sjhm,sfzh",
				icon_prop: "",
				timeline: "rPHONEno_cjsj",
				object_property: "key_label_2",
				show_bigger: "type",
				fields: "key_label_1,key_label_2,rPHONEno_cjsj,sfzh,sjhm,type",
				label_name: "人_手机号关系",
				subject_property: "sfzh"
			},
			bankNO_bankNO_relation_other: {
				icon_mapping: "relation-graphicon-zhanghuduizhanghu",
				type_name: "账号交易关系",
				subject_label: "bankNO",
				show_normal: "type",
				key_mapping: "",
				object_label: "bankNO",
				label: "bankNO_bankNO_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,zzh",
				minor_prop: "rBANKnoBANKno_jycs",
				gen_key_type: "string",
				primary_prop: "zzh,rBANKnoBANKno_jysj,dfzh",
				icon_prop: "",
				timeline: "rBANKnoBANKno_jysj",
				object_property: "key_label_2",
				show_bigger: "type",
				fields: "dfzh,key_label_1,key_label_2,rBANKnoBANKno_jycs,rBANKnoBANKno_jysj,type,zzh",
				label_name: "账号交易关系",
				subject_property: "key_label_1"
			},
			vehicle_relation_other: {
				icon_mapping: "relation-graphicon-car2",
				type_name: "人车关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "vehicle",
				label: "vehicle_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,rVEHICLE_hphm",
				minor_prop: "rVEHICLE_fzjg,rVEHICLE_cllx,rVEHICLE_fdjh,rVEHICLE_hdfs,rVEHICLE_blhpcs,rVEHICLE_blxszcs",
				primary_prop: "rVEHICLE_hphm,rVEHICLE_hpzl_mc,ztrsfzh",
				icon_prop: "",
				timeline: "",
				object_property: "key_label_2",
				show_bigger: "type",
				fields: "hpzl_hphm,key_label_1,key_label_2,rVEHICLE_blhpcs,rVEHICLE_blxszcs,rVEHICLE_cllx,rVEHICLE_fdjh,rVEHICLE_fxszrq,rVEHICLE_fzjg,rVEHICLE_glxq,rVEHICLE_hdfs,rVEHICLE_hphm,rVEHICLE_hpzl,rVEHICLE_hpzl_mc,type,ztrsfzh",
				label_name: "人车关系",
				subject_property: "ztrsfzh"
			},
			mother_relation_other: {
				icon_mapping: "relation-graphicon-mother_child",
				type_name: "母子关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "person",
				label: "mother_relation",
				element_type: "relation",
				groupby: "rMOTHER_mqxm",
				type: "other",
				title: "type,ztsfhm",
				minor_prop: "rMOTHER_xb,rMOTHER_mz,rMOTHER_mqxm",
				primary_prop: "type,ztsfhm,mqgmsfhm",
				icon_prop: "",
				timeline: "",
				object_property: "mqgmsfhm",
				show_bigger: "type",
				fields: "key_label_1,key_label_2,mqgmsfhm,rMOTHER_mqxm,rMOTHER_mz,rMOTHER_xb,rMOTHER_ztxm,type,ztsfhm",
				label_name: "母子关系",
				subject_property: "ztsfhm"
			},
			person_taobao_relation_other: {
				icon_mapping: "relation-graphicon-taobao",
				type_name: "人_淘宝账号关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "taobao",
				label: "person_taobao_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,sfzh",
				minor_prop: "sfzh,rTAOBAO_cjsj",
				primary_prop: "type,zh",
				icon_prop: "",
				timeline: "rTAOBAO_cjsj",
				object_property: "key_label_2",
				show_bigger: "type",
				fields: "key_label_1,key_label_2,rTAOBAO_cjsj,sfzh,type,zh",
				label_name: "人_淘宝账号关系",
				subject_property: "sfzh"
			},
			tbsearch_event_other: {
				icon_mapping: "event-graphicon-taobao_search",
				type_name: "事件_淘宝搜索",
				subject_label: "vehicle",
				object_label: "vehicle",
				label: "tbsearch_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,zh",
				minor_prop: "gjc",
				entity_label: "vehicle",
				primary_prop: "zh,sj",
				icon_prop: "",
				entity_properties: "",
				timeline: "sj",
				object_property: "",
				fields: "gjc,key,key_label_2,sj,type,zh",
				label_name: "事件_淘宝搜索",
				subject_property: ""
			},
			passportflightLG_event_other: {
				icon_mapping: "event-graphicon-huzhaokonggangligang",
				type_name: "事件_护照空港离港",
				subject_label: "vehicle",
				object_label: "vehicle",
				label: "passportflightLG_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,hbh",
				minor_prop: "ePASSPORTFLIGHTlg_zwm,ePASSPORTFLIGHTlg_ywm,ePASSPORTFLIGHTlg_zwh,ePASSPORTFLIGHTlg_zjlx,zjhm,ePASSPORTFLIGHTlg_cyhkgs,ePASSPORTFLIGHTlg_jgsj,ePASSPORTFLIGHTlg_xlzjs,ePASSPORTFLIGHTlg_xlzzl,ePASSPORTFLIGHTlg_ysdhhm,ePASSPORTFLIGHTlg_xdhhm",
				entity_label: "vehicle",
				primary_prop: "hbh,ePASSPORTFLIGHTlg_djjc,ePASSPORTFLIGHTlg_ddjc,ePASSPORTFLIGHTlg_lgsj",
				icon_prop: "",
				entity_properties: "",
				timeline: "ePASSPORTFLIGHTlg_lgsj",
				object_property: "",
				fields: "ePASSPORTFLIGHTlg_cyhkgs,ePASSPORTFLIGHTlg_ddjc,ePASSPORTFLIGHTlg_djh,ePASSPORTFLIGHTlg_djjc,ePASSPORTFLIGHTlg_jgsj,ePASSPORTFLIGHTlg_lgsj,ePASSPORTFLIGHTlg_xdhhm,ePASSPORTFLIGHTlg_xlzjs,ePASSPORTFLIGHTlg_xlzzl,ePASSPORTFLIGHTlg_ysdhhm,ePASSPORTFLIGHTlg_ywm,ePASSPORTFLIGHTlg_zjlx,ePASSPORTFLIGHTlg_zwh,ePASSPORTFLIGHTlg_zwm,hbh,hbrq,key,key_label_2,type,zjhm",
				label_name: "事件_护照空港离港",
				subject_property: ""
			},
			criminalVehicle_relation_other: {
				icon_mapping: "relation-graphicon-paccancy",
				type_name: "人车违章",
				subject_label: "person",
				show_normal: "type",
				object_label: "vehicle",
				label: "criminalVehicle_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,rCriminalVehicle_hphm",
				minor_prop: "rCriminalVehicle_clflmc,rCriminalVehicle_sgdjmc,rCriminalVehicle_wfxwmc,rCriminalVehicle_wfsj,rCriminalVehicle_wfjfs,rCriminalVehicle_wfdz,rCriminalVehicle_fkje,rCriminalVehicle_fxjgmc,rCriminalVehicle_cljgmc,rCriminalVehicle_zqmj,rCriminalVehicle_jkfsmc,rCriminalVehicle_cfzlmc",
				primary_prop: "rCriminalVehicle_hpzl_mc,rCriminalVehicle_hphm,ztrsfzh,rCriminalVehicle_cfzlmc",
				icon_prop: "",
				object_property: "key_label_2",
				timeline: "rCriminalVehicle_wfsj",
				show_bigger: "type",
				fields: "hpzl_hphm,key_label_1,key_label_2,rCriminalVehicle_cfzl,rCriminalVehicle_cfzlmc,rCriminalVehicle_clfl,rCriminalVehicle_clflmc,rCriminalVehicle_cljgmc,rCriminalVehicle_fkje,rCriminalVehicle_fxjgmc,rCriminalVehicle_hphm,rCriminalVehicle_hpzl,rCriminalVehicle_hpzl_mc,rCriminalVehicle_jkfsmc,rCriminalVehicle_sgdj,rCriminalVehicle_sgdjmc,rCriminalVehicle_wfbh,rCriminalVehicle_wfdz,rCriminalVehicle_wfjfs,rCriminalVehicle_wfsj,rCriminalVehicle_wfxwbh,rCriminalVehicle_wfxwmc,rCriminalVehicle_zqmj,type,ztrsfzh",
				label_name: "人车违章",
				subject_property: "ztrsfzh"
			},
			phoneI_other: {
				icon_mapping: "entity-graphicon-cell_phone_imei",
				type_name: "手机(imei)",
				show_normal: "PHONEI_sbmc,imei",
				key_mapping: "imei",
				label: "phoneI",
				element_type: "entity",
				groupby: "PHONEI_sbmc,imei",
				type: "other",
				title: "PHONEI_sbmc",
				menu: "",
				minor_prop: "PHONEI_zdmac,PHONEI_tzms,PHONEI_lymac,PHONEI_csmc,PHONEI_cjsj",
				gen_key_type: "string",
				primary_prop: "PHONEI_sbmc,imei,PHONEI_xh",
				icon_prop: "",
				timeline: "",
				show_bigger: "PHONEI_sbmc,imei",
				fields: "imei,key,PHONEI_ajbq,PHONEI_cjsj,PHONEI_csmc,PHONEI_drsj,PHONEI_dryh,PHONEI_lymac,PHONEI_lywj,PHONEI_sbmc,PHONEI_tzms,PHONEI_xh,PHONEI_zdmac,type",
				label_name: "手机I",
				key_prop: "key"
			},
			basestation_other: {
				icon_mapping: "entity-graphicon-jizhan",
				type_name: "基站",
				show_normal: "BASESTATION_jzzwm,BASESTATION_jzzh",
				key_mapping: "BASESTATION_yysbm,BASESTATION_wzq,BASESTATION_xq",
				label: "basestation",
				element_type: "entity",
				groupby: "",
				type: "other",
				title: "type",
				menu: "",
				minor_prop: "BASESTATION_wzq,BASESTATION_xq,BASESTATION_xqlx,BASESTATION_xqfglx,BASESTATION_jd,BASESTATION_wd,BASESTATION_yysbm,BASESTATION_xzdw,BASESTATION_jzdj,BASESTATION_sqh,BASESTATION_dm,BASESTATION_sqdz,BASESTATION_fgqyms,BASESTATION_fghjlx,BASESTATION_sf,BASESTATION_cs,BASESTATION_jzhbgd,BASESTATION_wylx,BASESTATION_wlms,BASESTATION_ktqk",
				gen_key_type: "string",
				primary_prop: "BASESTATION_jzzh,BASESTATION_jzzwm,BASESTATION_jzjtdz",
				icon_prop: "",
				timeline: "",
				show_bigger: "BASESTATION_jzzwm,BASESTATION_jzzh",
				fields: "BASESTATION_cs,BASESTATION_dm,BASESTATION_fghjlx,BASESTATION_fgqyms,BASESTATION_jd,BASESTATION_jzdj,BASESTATION_jzhbgd,BASESTATION_jzjtdz,BASESTATION_jzzh,BASESTATION_jzzwm,BASESTATION_ktqk,BASESTATION_sf,BASESTATION_sqdz,BASESTATION_sqh,BASESTATION_sqlx,BASESTATION_sqzwm,BASESTATION_wd,BASESTATION_wlms,BASESTATION_wylx,BASESTATION_wzq,BASESTATION_xq,BASESTATION_xqfglx,BASESTATION_xqlx,BASESTATION_xzdw,BASESTATION_yysbm,geo,key,type,yysbm_wzq_xq",
				label_name: "基站",
				key_prop: "key"
			},
			authentication_phoneM_relation_other: {
				type_name: "人_手机M关系",
				object_property: "key_label_2",
				label: "authentication_phoneM_relation",
				element_type: "relation",
				type: "other",
				fields: "key_label_1,key_label_2,rAUTHENTICATIONm_cjsj,rAUTHENTICATIONm_rzlx,rAUTHENTICATIONm_rzzh,rzlx_rzzh,type,zdmac",
				label_name: "认证_手机M关系",
				subject_property: "rzlx_rzzh"
			},
			flight_other: {
				icon_mapping: "entity-graphicon-flights",
				type_name: "航班",
				show_normal: "hbh",
				key_mapping: "hbh",
				label: "flight",
				element_type: "entity",
				groupby: "",
				type: "other",
				title: "hbh",
				menu: "",
				minor_prop: "FLIGHT_cyhkgs",
				gen_key_type: "string",
				primary_prop: "hbh",
				icon_prop: "",
				timeline: "",
				show_bigger: "hbh",
				fields: "FLIGHT_cyhkgs,hbh,key,type",
				label_name: "航班",
				key_prop: "key"
			},
			household_other: {
				icon_mapping: "entity-graphicon-organization",
				type_name: "其它户类别",
				show_normal: "HOUSEHOLD_hlx_mc",
				key_mapping: "HOUSEHOLD_hlx,HOUSEHOLD_hh",
				label: "household",
				element_type: "entity",
				groupby: "",
				type: "other",
				title: "HOUSEHOLD_hlx_mc,HOUSEHOLD_hh",
				menu: "",
				minor_prop: "HOUSEHOLD_nzfbs,HOUSEHOLD_ssssxq,HOUSEHOLD_xz,HOUSEHOLD_rybh",
				gen_key_type: "string",
				primary_prop: "HOUSEHOLD_hlx_mc,HOUSEHOLD_hh,HOUSEHOLD_hkxz",
				icon_prop: "",
				timeline: "",
				show_bigger: "HOUSEHOLD_hlx_mc,HOUSEHOLD_hh",
				fields: "hlx_hh,HOUSEHOLD_hh,HOUSEHOLD_hkxz,HOUSEHOLD_hlx,HOUSEHOLD_hlx_mc,HOUSEHOLD_nzfbs,HOUSEHOLD_rybh,HOUSEHOLD_ssssxq,HOUSEHOLD_xz,key,type",
				label_name: "户口",
				key_prop: "key"
			},
			bankNO_other: {
				icon_mapping: "entity-graphicon-account",
				type_name: "银行账户",
				show_normal: "BANKno_hm,yhzh",
				key_mapping: "yhzh",
				label: "bankNO",
				element_type: "entity",
				groupby: "BANKno_khh",
				type: "other",
				title: "BANKno_hm,yhzh",
				menu: "",
				minor_prop: "BANKno_khh,BANKno_khrq,BANKno_zhye,BANKno_zjlx,BANKno_zjhm",
				gen_key_type: "string",
				primary_prop: "yhzh,BANKno_hm,BANKno_zhlx",
				icon_prop: "",
				timeline: "BANKno_khrq",
				show_bigger: "BANKno_hm,yhzh",
				fields: "BANKno_hm,BANKno_khh,BANKno_khrq,BANKno_zhlx,BANKno_zhye,BANKno_zjhm,BANKno_zjlx,key,type,yhzh",
				label_name: "银行账户",
				key_prop: "key"
			},
			qqwx_event_other: {
				icon_mapping: "event-graphicon-qq_and_wechat_chat",
				type_name: "事件_QQ微信聊天",
				subject_label: "qqwx",
				object_label: "qqwx",
				label: "qqwx_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,zhlx_zzh",
				minor_prop: "eQQWX_ltjlid,eQQWX_jsxxnr",
				entity_label: "vehicle",
				primary_prop: "eQQWX_zzh,eQQWX_dfzh,fssj",
				icon_prop: "",
				entity_properties: "",
				object_property: "key_label_2",
				timeline: "fssj",
				fields: "eQQWX_bddz,eQQWX_dfnc,eQQWX_dfyhid,eQQWX_dfzh,eQQWX_jsxxnr,eQQWX_ltjlid,eQQWX_nc,eQQWX_zhlx,eQQWX_zzh,fssj,key,key_label_2,type,zhlx_dfzh,zhlx_zzh",
				label_name: "事件_QQ微信聊天",
				subject_property: "key"
			},
			trafficmonitor_event_other: {
				icon_mapping: "event-graphicon-checkpoint",
				type_name: "事件_卡口",
				subject_label: "vehicle",
				object_label: "vehicle",
				label: "trafficmonitor_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "eTRAFFICMONITOR_kkmc,kkbh",
				minor_prop: "eTRAFFICMONITOR_hpzl,eTRAFFICMONITOR_hpys,eTRAFFICMONITOR_xscdbh,eTRAFFICMONITOR_xsfx,eTRAFFICMONITOR_xssd,kkbh,eTRAFFICMONITOR_zpip,eTRAFFICMONITOR_zplja,eTRAFFICMONITOR_zpljb,eTRAFFICMONITOR_zpljb1,eTRAFFICMONITOR_zpljc,eTRAFFICMONITOR_zpljc1,eTRAFFICMONITOR_zpsbid,eTRAFFICMONITOR_zjid",
				properties_display: "",
				entity_label: "vehicle",
				primary_prop: "eTRAFFICMONITOR_kkmc,tgkksj,eTRAFFICMONITOR_hphm",
				icon_prop: "",
				entity_properties: "",
				if_display: "true",
				object_property: "key_label_2",
				timeline: "tgkksj",
				fields: "eTRAFFICMONITOR_hphm,eTRAFFICMONITOR_hpys,eTRAFFICMONITOR_hpzl,eTRAFFICMONITOR_hpzl_mc,eTRAFFICMONITOR_kkmc,eTRAFFICMONITOR_xscdbh,eTRAFFICMONITOR_xsfx,eTRAFFICMONITOR_xssd,eTRAFFICMONITOR_zjid,eTRAFFICMONITOR_zpip,eTRAFFICMONITOR_zplja,eTRAFFICMONITOR_zpljb,eTRAFFICMONITOR_zpljb1,eTRAFFICMONITOR_zpljc,eTRAFFICMONITOR_zpljc1,eTRAFFICMONITOR_zpsbid,hpzl_hphm,key,key_label_2,kkbh,tgkksj,type",
				label_name: "事件_卡口",
				subject_property: "key"
			},
			caseReport_relation_other: {
				icon_mapping: "relation-graphicon-human_alarm",
				type_name: "人报案件关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "case",
				label: "caseReport_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,rCASEREPORT_barxm",
				minor_prop: "rCASEREPORT_barlxdh,rCASEREPORT_barzjlx,barzjhm,rCASEREPORT_basj,rCASEREPORT_lasj",
				primary_prop: "type,rCASEREPORT_barxm,ajbh",
				icon_prop: "",
				object_property: "key_label_2",
				timeline: "rCASEREPORT_basj",
				show_bigger: "type",
				fields: "ajbh,barzjhm,key_label_1,key_label_2,rCASEREPORT_barlxdh,rCASEREPORT_barxm,rCASEREPORT_barzjlx,rCASEREPORT_basj,rCASEREPORT_lasj,type",
				label_name: "人报案件关系",
				subject_property: "barzjhm"
			},
			train_event_other: {
				icon_mapping: "event-graphicon-huoche",
				type_name: "事件_火车",
				subject_label: "person",
				object_label: "trainNumber",
				label: "train_event",
				element_type: "event",
				groupby: "new_cc",
				type: "other",
				title: "type,new_cc",
				minor_prop: "eTRAIN_xm,eTRAIN_cph,eTRAIN_cxh,eTRAIN_zwh,eTRAIN_spsj",
				properties_display: "ccrq,eTRAIN_cxh,eTRAIN_fz",
				entity_label: "trainNumber",
				primary_prop: "new_cc,eTRAIN_fz,eTRAIN_dz,ccrq",
				icon_prop: "",
				entity_properties: "key_label_2",
				if_display: "true",
				timeline: "ccrq",
				object_property: "key_label_2",
				fields: "ccrq,eTRAIN_cc,eTRAIN_cph,eTRAIN_cxh,eTRAIN_dz,eTRAIN_fz,eTRAIN_spckh,eTRAIN_spczh,eTRAIN_spczjc,eTRAIN_spczybh,eTRAIN_spsj,eTRAIN_xm,eTRAIN_zjid,eTRAIN_zwh,key,key_label_1,key_label_2,new_cc,type",
				label_name: "事件_火车",
				subject_property: "key"
			},
			household_relation_other: {
				icon_mapping: "relation-graphicon-relatives",
				type_name: "人户关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "household",
				label: "household_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,ztrsfzh",
				minor_prop: "rHOUSEHOLD_ssssxq,rHOUSEHOLD_qrrq,rHOUSEHOLD_qrlb,rHOUSEHOLD_lzgjdq,rHOUSEHOLD_qcrq,rHOUSEHOLD_qcdssxq,rHOUSEHOLD_qwdxz,rHOUSEHOLD_bdrq,rHOUSEHOLD_bdlb,rHOUSEHOLD_bdsj,rHOUSEHOLD_qczxlb,rHOUSEHOLD_qwgjdq,rHOUSEHOLD_qwdssxq,rHOUSEHOLD_qcdxz",
				primary_prop: "ztrsfzh,rHOUSEHOLD_hlx_mc,rHOUSEHOLD_hh,rHOUSEHOLD_yhzgx",
				icon_prop: "",
				object_property: "key_label_2",
				timeline: "rHOUSEHOLD_bdsj",
				show_bigger: "type",
				fields: "hlx_hh,key_label_1,key_label_2,rHOUSEHOLD_bdlb,rHOUSEHOLD_bdrq,rHOUSEHOLD_bdsj,rHOUSEHOLD_hh,rHOUSEHOLD_hlx,rHOUSEHOLD_hlx_mc,rHOUSEHOLD_lzgjdq,rHOUSEHOLD_qcdssxq,rHOUSEHOLD_qcdxz,rHOUSEHOLD_qcrq,rHOUSEHOLD_qczxlb,rHOUSEHOLD_qrlb,rHOUSEHOLD_qrrq,rHOUSEHOLD_qwdssxq,rHOUSEHOLD_qwdxz,rHOUSEHOLD_qwgjdq,rHOUSEHOLD_ssssxq,rHOUSEHOLD_yhzgx,type,ztrsfzh",
				label_name: "人户关系",
				subject_property: "ztrsfzh"
			},
			wifi_other: {
				icon_mapping: "entity-graphicon-wifi",
				type_name: "wifi",
				show_normal: "COLLECTION_EQUIPMENT_ID",
				key_mapping: "COLLECTION_EQUIPMENT_ID",
				label: "wifi",
				element_type: "entity",
				groupby: "",
				type: "other",
				title: "WIFI_OLLECTION_EQUIPMENT_NAME,COLLECTION_EQUIPMENT_ID",
				menu: "",
				minor_prop: "WIFI_COLLECTION_EQUIPMENT_ADRESS,WIFI_COLLECTION_RADIUS,WIFI_UPLOAD_TIME_INTERVAL,WIFI_NETBAR_WACODE,WIFI_SECURITY_SOFTWARE_ORGCODE,WIFI_COLLECTION_EQUIPMENT_LATITUDE,WIFI_COLLECTION_EQUIPMENT_LONGITUDE",
				gen_key_type: "string",
				primary_prop: "WIFI_OLLECTION_EQUIPMENT_NAME,COLLECTION_EQUIPMENT_ID",
				icon_prop: "",
				timeline: "",
				show_bigger: "WIFI_COLLECTION_EQUIPMENT_TYPE,COLLECTION_EQUIPMENT_ID",
				fields: "COLLECTION_EQUIPMENT_ID,geo,key,type,WIFI_COLLECTION_EQUIPMENT_ADRESS,WIFI_COLLECTION_EQUIPMENT_LATITUDE,WIFI_COLLECTION_EQUIPMENT_LONGITUDE,WIFI_COLLECTION_EQUIPMENT_TYPE,WIFI_COLLECTION_RADIUS,WIFI_NETBAR_WACODE,WIFI_OLLECTION_EQUIPMENT_NAME,WIFI_SECURITY_SOFTWARE_ORGCODE,WIFI_UPLOAD_TIME_INTERVAL",
				label_name: "wifi",
				key_prop: "key"
			},
			passport_other: {
				icon_mapping: "entity-graphicon-huzhao",
				type_name: "护照",
				show_normal: "PASSPORT_zjlx,zjhm",
				key_mapping: "zjhm",
				label: "passport",
				element_type: "entity",
				groupby: "",
				type: "other",
				title: "PASSPORT_zjlx,zjhm",
				menu: "",
				minor_prop: "PASSPORT_sfzh,PASSPORT_xb,PASSPORT_csrq,PASSPORT_jg,PASSPORT_mz,PASSPORT_pcs,PASSPORT_xmpy,PASSPORT_hkqh,PASSPORT_qfrq",
				gen_key_type: "string",
				primary_prop: "PASSPORT_xm,PASSPORT_zjlx,zjhm",
				icon_prop: "",
				timeline: "PASSPORT_qfrq",
				show_bigger: "PASSPORT_zjlx,zjhm",
				fields: "key,PASSPORT_csd,PASSPORT_csrq,PASSPORT_hkqh,PASSPORT_jg,PASSPORT_mz,PASSPORT_pcs,PASSPORT_qfrq,PASSPORT_sfzh,PASSPORT_xb,PASSPORT_xbdm,PASSPORT_xm,PASSPORT_xmpy,PASSPORT_zjlx,PASSPORT_zjlxdm,PASSPORT_zjyxqx,type,zjhm",
				label_name: "护照",
				key_prop: "key"
			},
			person_passport_relation_other: {
				icon_mapping: "relation-graphicon-renhuzhaoguanxi",
				type_name: "人_护照关系",
				subject_label: "vehicle",
				show_normal: "type",
				object_label: "vehicle",
				label: "person_passport_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,sfzh",
				minor_prop: "rPASSPORT_zjlx,rPASSPORT_zjlxdm,rPASSPORT_zjyxqx,rPASSPORT_qfrq",
				primary_prop: "zjhm,sfzh",
				icon_prop: "",
				object_property: "",
				timeline: "rPASSPORT_qfrq",
				show_bigger: "type,sfzh",
				fields: "key_label_1,key_label_2,rPASSPORT_qfrq,rPASSPORT_zjlx,rPASSPORT_zjlxdm,rPASSPORT_zjyxqx,sfzh,type,zjhm",
				label_name: "人_护照关系",
				subject_property: ""
			},
			household_family_household: {
				icon_mapping: "entity-graphicon-families",
				type_name: "家庭户",
				show_normal: "HOUSEHOLD_hlx_mc",
				key_mapping: "HOUSEHOLD_hlx,HOUSEHOLD_hh",
				label: "household",
				element_type: "entity",
				groupby: "",
				type: "family_household",
				title: "HOUSEHOLD_hlx_mc,HOUSEHOLD_hh",
				menu: "",
				minor_prop: "HOUSEHOLD_nzfbs,HOUSEHOLD_ssssxq,HOUSEHOLD_xz,HOUSEHOLD_rybh",
				gen_key_type: "string",
				primary_prop: "HOUSEHOLD_hlx_mc,HOUSEHOLD_hh,HOUSEHOLD_hkxz",
				icon_prop: "",
				timeline: "",
				show_bigger: "HOUSEHOLD_hlx_mc,HOUSEHOLD_hh",
				fields: "hlx_hh,HOUSEHOLD_hh,HOUSEHOLD_hkxz,HOUSEHOLD_hlx,HOUSEHOLD_hlx_mc,HOUSEHOLD_nzfbs,HOUSEHOLD_rybh,HOUSEHOLD_ssssxq,HOUSEHOLD_xz,key,type",
				label_name: "户口",
				key_prop: "key"
			},
			phoneM_phoneNO_relation_other: {
				icon_mapping: "relation-graphicon-cell_phone",
				type_name: "手机终端M_手机号关系",
				subject_label: "phoneM",
				show_normal: "type",
				object_label: "phoneNO",
				label: "phoneM_phoneNO_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,sjhm",
				minor_prop: "rPHONEmPHONENO_cjsj",
				primary_prop: "zdmac,sjhm",
				icon_prop: "",
				timeline: "rPHONEmPHONENO_cjsj",
				object_property: "key_label_2",
				show_bigger: "type,sjhm",
				fields: "key_label_1,key_label_2,rPHONEmPHONENO_cjsj,sjhm,type,zdmac",
				label_name: "手机终端M_手机号",
				subject_property: "key_label_1"
			},
			criminal_relation_other: {
				icon_mapping: "relation-graphicon-people_involved_in_the_case",
				type_name: "人案参与关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "case",
				label: "criminal_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,gmsfzhm",
				minor_prop: "rESCAPEE_ajlb,rESCAPEE_ladwxc,rESCAPEE_lasj,rESCAPEE_tjlbh,rESCAPEE_tprq,rESCAPEE_rbkcxsj",
				primary_prop: "type,ajbh,gmsfzhm",
				icon_prop: "",
				timeline: "rESCAPEE_lasj",
				object_property: "key_label_2",
				show_bigger: "type",
				fields: "ajbh,gmsfzhm,key_label_1,key_label_2,rESCAPEE_ajlb,rESCAPEE_ladwxc,rESCAPEE_lasj,rESCAPEE_rbkcxsj,rESCAPEE_tjlbh,rESCAPEE_tprq,type",
				label_name: "人案参与关系",
				subject_property: "gmsfzhm"
			},
			phonewifi_event_other: {
				icon_mapping: "event-graphicon-mobilephone_company_wifi",
				type_name: "事件_手机连wifi",
				subject_label: "phoneM",
				object_label: "wifi",
				label: "phonewifi_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,sjmac",
				minor_prop: "ePHONEWIFI_csID,ljsj",
				entity_label: "phoneM",
				primary_prop: "sjmac,apmac,ePHONEWIFI_csmc",
				icon_prop: "",
				entity_properties: "",
				timeline: "ljsj",
				object_property: "key_label_2",
				fields: "apmac,ePHONEWIFI_csID,ePHONEWIFI_csmc,key,key_label_2,ljsj,sjmac,type",
				label_name: "事件_手机连wifi",
				subject_property: "key"
			},
			person_other: {
				icon_mapping: "entity-graphicon-human",
				type_name: "普通人",
				show_normal: "PERSON_xm",
				key_mapping: "PERSON_zjhm",
				label: "person",
				element_type: "entity",
				groupby: "PERSON_xb,PERSON_mz,PERSON_zdrlx",
				type: "other",
				title: "PERSON_xm,key",
				menu: "",
				minor_prop: "PERSON_hzh,PERSON_cym,PERSON_ch,PERSON_csrq,PERSON_csdxz,PERSON_xzdxz,PERSON_nl,PERSON_wwxm,PERSON_hyzk,PERSON_whcd,PERSON_wxdj,PERSON_flglb,PERSON_sjzdrybh,PERSON_bjzdrybh,PERSON_nrbjzdryksj,PERSON_ZDRYLBBJ,PERSON_ywxds,PERSON_lydpzl,PERSON_zsdpzl,PERSON_mgqlkjb,PERSON_zjlasj,PERSON_jlxzsj,PERSON_jlcxsj,PERSON_jlbgsj,PERSON_wfrybh,PERSON_jsh,PERSON_sxzm,PERSON_zxf,PERSON_xq,PERSON_ztrybh,PERSON_tprq,PERSON_grgs,PERSON_YXX,PERSON_tssf,PERSON_hjdz,PERSON_jggjdq,PERSON_jgssxq,PERSON_zjxy,PERSON_xx,PERSON_dna,PERSON_zwbh,PERSON_sg,PERSON_tx,PERSON_ky,PERSON_sfly,PERSON_lx,PERSON_zcxh,PERSON_tbtsbj,PERSON_zzmm,PERSON_zy,PERSON_gzdw,PERSON_lxdh,PERSON_sjhm,PERSON_dzyx,PERSON_sfzqfrq,PERSON_sfzyxrq,PERSON_xdcs,PERSON_jszzt,PERSON_jzqx,PERSON_xcjszg,PERSON_xczgzjcx,PERSON_fzjg,PERSON_fzrq,PERSON_zjcx,PERSON_zxbh,PERSON_yxqs,PERSON_yxqz,PERSON_swrq,PERSON_swzxlb,PERSON_zxbs,PERSON_zxrq,PERSON_hjdqh",
				gen_key_type: "string",
				primary_prop: "PERSON_xb,PERSON_mz,PERSON_zdrlx,key,PERSON_xm",
				icon_prop: "",
				timeline: "PERSON_csrq",
				show_bigger: "PERSON_xm,key",
				fields: "key,key_label,PERSON_bjzdrybh,PERSON_ch,PERSON_csdxz,PERSON_csrq,PERSON_cym,PERSON_dna,PERSON_dzyx,PERSON_flglb,PERSON_fzjg,PERSON_fzrq,PERSON_grgs,PERSON_gzdw,PERSON_hjdqh,PERSON_hjdz,PERSON_hyzk,PERSON_hzh,PERSON_jggjdq,PERSON_jgssxq,PERSON_jlbgsj,PERSON_jlcxsj,PERSON_jlxzsj,PERSON_jsh,PERSON_jszzt,PERSON_jzqx,PERSON_ky,PERSON_lx,PERSON_lxdh,PERSON_lydpzl,PERSON_mgqlkjb,PERSON_mz,PERSON_nl,PERSON_nrbjzdryksj,PERSON_rxid,PERSON_sfly,PERSON_sfzqfrq,PERSON_sfzyxrq,PERSON_sg,PERSON_sjhm,PERSON_sjzdrybh,PERSON_swrq,PERSON_swzxlb,PERSON_sxzm,PERSON_tbtsbj,PERSON_tprq,PERSON_tssf,PERSON_tx,PERSON_wfrybh,PERSON_whcd,PERSON_wwxm,PERSON_wxdj,PERSON_xb,PERSON_xcjszg,PERSON_xczgzjcx,PERSON_xdcs,PERSON_xm,PERSON_xq,PERSON_xx,PERSON_xzdxz,PERSON_ywxds,PERSON_yxqs,PERSON_yxqz,PERSON_YXX,PERSON_zcxh,PERSON_zdrlx,PERSON_ZDRYLBBJ,PERSON_zjcx,PERSON_zjhm,PERSON_zjlasj,PERSON_zjlx,PERSON_zjxy,PERSON_zsdpzl,PERSON_ztrybh,PERSON_zwbh,PERSON_zxbh,PERSON_zxbs,PERSON_zxf,PERSON_zxrq,PERSON_zy,PERSON_zzmm,type",
				label_name: "人",
				key_prop: "key"
			},
			urlbrowse_event_other: {
				icon_mapping: "event-graphicon-url_view",
				type_name: "事件_URL浏览",
				subject_label: "vehicle",
				object_label: "vehicle",
				label: "urlbrowse_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,urldz",
				minor_prop: "eURLBROWSE_wybt,eURLBROWSE_llqlx,eURLBROWSE_cjsj",
				entity_label: "vehicle",
				primary_prop: "urldz,fwsj,key",
				icon_prop: "",
				entity_properties: "",
				timeline: "fwsj",
				object_property: "",
				fields: "eURLBROWSE_cjsj,eURLBROWSE_llqlx,eURLBROWSE_wybt,fwsj,key,key_label_1,key_label_2,type,urldz",
				label_name: "事件_URL浏览",
				subject_property: ""
			},
			phoneNO_other: {
				icon_mapping: "entity-graphicon-telephone",
				type_name: "电话号码",
				show_normal: "dhhm",
				key_mapping: "dhhm",
				label: "phoneNO",
				element_type: "entity",
				groupby: "type",
				type: "other",
				title: "dhhm",
				menu: "",
				minor_prop: "PHONEno_cjsj,PHONEno_drsj,PHONEno_dryh,PHONEno_lywj,PHONEno_ajbq",
				gen_key_type: "string",
				primary_prop: "dhhm,PHONEno_imsi",
				icon_prop: "",
				timeline: "PHONEno_cjsj",
				show_bigger: "dhhm",
				fields: "dhhm,key,PHONEno_ajbq,PHONEno_cjsj,PHONEno_drsj,PHONEno_dryh,PHONEno_imsi,PHONEno_lywj,type",
				label_name: "电话号码",
				key_prop: "key"
			},
			custom_relation_other: {
				icon_mapping: "relation-graphicon-the-part-of",
				type_name: "自定义关系",
				subject_label: "passport",
				show_normal: "relation_name",
				key_mapping: "",
				object_label: "passport",
				label: "custom_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "key_label_1,key_label_2",
				minor_prop: "key_label_1,key_label_2",
				gen_key_type: "string",
				primary_prop: "relation_name,type",
				icon_prop: "",
				timeline: "",
				object_property: "key_label_2",
				show_bigger: "relation_name",
				fields: "is_strong_relation,key_label_1,key_label_2,relation_name,type",
				label_name: "自定义关系",
				subject_property: "key_label_1"
			},
			weibo_weibofriend_relation_other: {
				icon_mapping: "",
				type_name: "微博好友关系",
				subject_label: "weibo",
				show_normal: "",
				object_label: "weibo",
				label: "weibo_weibofriend_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "",
				minor_prop: "",
				primary_prop: "",
				icon_prop: "",
				timeline: "",
				object_property: "key_label_2",
				show_bigger: "",
				fields: "key_label_1,key_label_2,rWEIBOfriend_gzfs,rWEIBOfriend_hybz,rWEIBOfriend_hyfzxx,rWEIBOfriend_hync,rWEIBOfriend_hyzh,rWEIBOfriend_zh,rWEIBOfriend_zhlx,rWEIBOfriend_zy,type,zhlx_hyzh,zhlx_zh",
				label_name: "微博好友关系",
				subject_property: "key_label_1"
			},
			person_non_eventful_person: {
				icon_mapping: "entity-graphicon-qiankezhongdianren",
				type_name: "前科重点人",
				show_normal: "PERSON_xm",
				key_mapping: "PERSON_zjhm",
				label: "person",
				element_type: "entity",
				groupby: "PERSON_xb,PERSON_mz,PERSON_zdrlx",
				type: "non_eventful_person",
				title: "PERSON_xm,key",
				menu: "criminal_relation",
				minor_prop: "PERSON_ch,PERSON_cym,PERSON_csrq,PERSON_csdxz,PERSON_hyzk,PERSON_nl,PERSON_whcd,PERSON_wwxm,PERSON_hzh,PERSON_mgqlkjb,PERSON_wxdj,PERSON_sjzdrybh,PERSON_bjzdrybh,PERSON_nrbjzdryksj,PERSON_ZDRYLBBJ,PERSON_jlxzsj,PERSON_jlbgsj,PERSON_jlcxsj,PERSON_ywxds,PERSON_lydpzl,PERSON_zsdpzl,PERSON_xdcs,PERSON_flglb,PERSON_zjlasj,PERSON_wfrybh,PERSON_sxzm,PERSON_zxf,PERSON_xq,PERSON_jsh,PERSON_ztrybh,PERSON_tprq,PERSON_grgs,PERSON_YXX,PERSON_tssf,PERSON_dna,PERSON_hjdz,PERSON_hjdqh,PERSON_jggjdq,PERSON_jgssxq,PERSON_ky,PERSON_lx,PERSON_sg,PERSON_tx,PERSON_xx,PERSON_sfly,PERSON_tbtsbj,PERSON_zcxh,PERSON_zjxy,PERSON_zzmm,PERSON_zwbh,PERSON_gzdw,PERSON_dzyx,PERSON_zy,PERSON_lxdh,PERSON_sjhm,PERSON_sfzqfrq,PERSON_sfzyxrq,PERSON_jszzt,PERSON_jzqx,PERSON_fzrq,PERSON_fzjg,PERSON_yxqs,PERSON_yxqz,PERSON_zjcx,PERSON_xcjszg,PERSON_xczgzjcx,PERSON_zxbh,PERSON_swrq,PERSON_swzxlb,PERSON_zxbs,PERSON_zxrq,PERSON_xzdxz",
				gen_key_type: "string",
				primary_prop: "PERSON_xm,PERSON_xb,PERSON_mz,PERSON_zjhm,PERSON_zdrlx",
				icon_prop: "",
				timeline: "PERSON_csrq",
				show_bigger: "PERSON_xm,key",
				fields: "key,key_label,PERSON_bjzdrybh,PERSON_ch,PERSON_csdxz,PERSON_csrq,PERSON_cym,PERSON_dna,PERSON_dzyx,PERSON_flglb,PERSON_fzjg,PERSON_fzrq,PERSON_grgs,PERSON_gzdw,PERSON_hjdqh,PERSON_hjdz,PERSON_hyzk,PERSON_hzh,PERSON_jggjdq,PERSON_jgssxq,PERSON_jlbgsj,PERSON_jlcxsj,PERSON_jlxzsj,PERSON_jsh,PERSON_jszzt,PERSON_jzqx,PERSON_ky,PERSON_lx,PERSON_lxdh,PERSON_lydpzl,PERSON_mgqlkjb,PERSON_mz,PERSON_nl,PERSON_nrbjzdryksj,PERSON_rxid,PERSON_sfly,PERSON_sfzqfrq,PERSON_sfzyxrq,PERSON_sg,PERSON_sjhm,PERSON_sjzdrybh,PERSON_swrq,PERSON_swzxlb,PERSON_sxzm,PERSON_tbtsbj,PERSON_tprq,PERSON_tssf,PERSON_tx,PERSON_wfrybh,PERSON_whcd,PERSON_wwxm,PERSON_wxdj,PERSON_xb,PERSON_xcjszg,PERSON_xczgzjcx,PERSON_xdcs,PERSON_xm,PERSON_xq,PERSON_xx,PERSON_xzdxz,PERSON_ywxds,PERSON_yxqs,PERSON_yxqz,PERSON_YXX,PERSON_zcxh,PERSON_zdrlx,PERSON_ZDRYLBBJ,PERSON_zjcx,PERSON_zjhm,PERSON_zjlasj,PERSON_zjlx,PERSON_zjxy,PERSON_zsdpzl,PERSON_ztrybh,PERSON_zwbh,PERSON_zxbh,PERSON_zxbs,PERSON_zxf,PERSON_zxrq,PERSON_zy,PERSON_zzmm,type",
				label_name: "人",
				key_prop: "key"
			},
			acountlogin_event_other: {
				icon_mapping: "event-graphicon-wnagyindenglu",
				type_name: "事件_网银登陆",
				subject_label: "passport",
				show_normal: "dlzh",
				key_mapping: "",
				object_label: "passport",
				label: "acountlogin_event",
				element_type: "event",
				groupby: "dlip",
				type: "other",
				title: "type,dlzh",
				minor_prop: "dlsj,eACOUNLOGIN_tcsj,geo,eACOUNLOGIN_dlipjd,eACOUNLOGIN_dlipwd",
				gen_key_type: "string",
				entity_label: "passport",
				primary_prop: "eACOUNLOGIN_zhm,dlip,eACOUNLOGIN_dlsc",
				icon_prop: "",
				entity_properties: "",
				timeline: "dlsj",
				show_bigger: "dlzh,eACOUNLOGIN_zhm",
				fields: "dlip,dlsj,dlzh,eACOUNLOGIN_dlipjd,eACOUNLOGIN_dlipwd,eACOUNLOGIN_dlsc,eACOUNLOGIN_tcsj,eACOUNLOGIN_zhm,geo,key_label_1,key_label_2,type",
				label_name: "事件_网银登陆"
			},
			father_relation_other: {
				icon_mapping: "relation-graphicon-father_child",
				type_name: "父子关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "person",
				label: "father_relation",
				element_type: "relation",
				groupby: "rFATHER_fqxm",
				type: "other",
				title: "type,rFATHER_ztxm",
				minor_prop: "rFATHER_ztxm,rFATHER_mz,rFATHER_xb,rFATHER_fqxm",
				primary_prop: "type,ztsfhm,fqgmsfhm",
				icon_prop: "",
				timeline: "",
				object_property: "fqgmsfhm",
				show_bigger: "type",
				fields: "fqgmsfhm,key_label_1,key_label_2,rFATHER_fqxm,rFATHER_mz,rFATHER_xb,rFATHER_ztxm,type,ztsfhm",
				label_name: "父子关系",
				subject_property: "ztsfhm"
			},
			hotel_event_other: {
				icon_mapping: "event-graphicon-accommodation",
				type_name: "事件_住宿",
				subject_label: "person",
				object_label: "hotel",
				label: "hotel_event",
				element_type: "event",
				groupby: "key,eHOTEL_ldmc",
				type: "other",
				title: "eHOTEL_ldmc,eHOTEL_ldxz",
				minor_prop: "eHOTEL_xm,eHOTEL_lkid,rzsj,eHOTEL_qtscsj,eHOTEL_tfsj,lddm,eHOTEL_hylx,eHOTEL_ldxz,eHOTEL_gxdwmc,eHOTEL_xz,key",
				properties_display: "eHOTEL_xm,eHOTEL_hylx,eHOTEL_ldxz",
				entity_label: "hotel",
				primary_prop: "eHOTEL_ldmc,eHOTEL_fjh,eHOTEL_ssxmc",
				icon_prop: "",
				entity_properties: "lddm",
				if_display: "true",
				timeline: "rzsj",
				object_property: "key_label_2",
				fields: "eHOTEL_fjh,eHOTEL_gxdwmc,eHOTEL_hylx,eHOTEL_ldmc,eHOTEL_ldxz,eHOTEL_lkid,eHOTEL_qtscsj,eHOTEL_ssxmc,eHOTEL_tfsj,eHOTEL_xm,eHOTEL_xz,eHOTEL_zjlxdm,key,key_label_1,key_label_2,lddm,rzsj,type",
				label_name: "事件_住宿",
				subject_property: "key"
			},
			victim_relation_other: {
				icon_mapping: "relation-graphicon-victimsof_the_case",
				type_name: "人案受害关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "case",
				label: "victim_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,sfzh",
				minor_prop: "rVICTIM_shdd,rVICTIM_shcd,rVICTIM_shjg,rVICTIM_zsgj,rVICTIM_zsyy,rVICTIM_bmjb",
				primary_prop: "type,ajbh,sfzh",
				icon_prop: "",
				timeline: "",
				object_property: "key_label_2",
				show_bigger: "type,rVICTIM_shdd",
				fields: "ajbh,key_label_1,key_label_2,rVICTIM_bmjb,rVICTIM_shcd,rVICTIM_shdd,rVICTIM_shjg,rVICTIM_zsgj,rVICTIM_zsyy,sfzh,type",
				label_name: "人案受害关系",
				subject_property: "sfzh"
			},
			phone_event_other: {
				icon_mapping: "event-graphicon-communication",
				type_name: "事件_打电话",
				subject_label: "phoneNO",
				object_label: "phoneNO",
				label: "phone_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,bjhm",
				minor_prop: "ePHONE_lxrxm,ePHONE_thzt,ePHONE_bddz,ePHONE_thjssj,ePHONE_thsc,ePHONE_jmzt,ePHONE_hjlx,ePHONE_dfgsd,ePHONE_thddqh,ePHONE_thlx,ePHONE_thd,ePHONE_fwh,ePHONE_jzh,ePHONE_xqh,bjhm,ePHONE_yysbm_wzq_xq",
				properties_display: "",
				entity_label: "basestation",
				primary_prop: "bjhm,thkssj,dfhm",
				icon_prop: "",
				entity_properties: "ePHONE_yysbm_wzq_xq",
				timeline: "thkssj",
				object_property: "key_label_2",
				fields: "bjhm,dfhm,ePHONE_ajbq,ePHONE_bddz,ePHONE_dfgsd,ePHONE_drsj,ePHONE_dryh,ePHONE_fwh,ePHONE_hjlx,ePHONE_jmzt,ePHONE_jzh,ePHONE_lxrxm,ePHONE_lywj,ePHONE_thd,ePHONE_thddqh,ePHONE_thjssj,ePHONE_thlx,ePHONE_thsc,ePHONE_thzt,ePHONE_xqh,ePHONE_yysbm_wzq_xq,key,key_label_2,thkssj,type",
				label_name: "事件_打电话",
				subject_property: "key"
			},
			qqwx_qqwxfriend_relation_other: {
				icon_mapping: "relation-graphicon-qq_and_wechat_friends",
				type_name: "QQ及微信好友关系",
				subject_label: "qqwx",
				show_normal: "type",
				object_label: "qqwx",
				label: "qqwx_qqwxfriend_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,rQQWXfriend_zh",
				minor_prop: "rQQWXfriend_hync,rQQWXfriend_hybz,rQQWXfriend_hyfzxx",
				primary_prop: "rQQWXfriend_zh,rQQWXfriend_zhlx,rQQWXfriend_hyzh",
				icon_prop: "",
				timeline: "",
				object_property: "key_label_2",
				show_bigger: "type",
				fields: "key_label_1,key_label_2,rQQWXfriend_hybz,rQQWXfriend_hyfzxx,rQQWXfriend_hync,rQQWXfriend_hyzh,rQQWXfriend_zh,rQQWXfriend_zhlx,type,zhlx_hyzh,zhlx_zh",
				label_name: "QQ及微信好友关系",
				subject_property: "key_label_1"
			},
			tbitembrowse_event_other: {
				icon_mapping: "event-graphicon-taobao_view",
				type_name: "事件_淘宝商品浏览",
				subject_label: "vehicle",
				object_label: "vehicle",
				label: "tbitembrowse_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,zh",
				minor_prop: "eTBITEMBROWSE_spid,eTBITEMBROWSE_spnrms,eTBITEMBROWSE_sply,eTBITEMBROWSE_xsl,eTBITEMBROWSE_jg,eTBITEMBROWSE_wz",
				entity_label: "vehicle",
				primary_prop: "zh,spmc,sj",
				icon_prop: "",
				entity_properties: "",
				object_property: "",
				timeline: "sj",
				fields: "eTBITEMBROWSE_jg,eTBITEMBROWSE_spid,eTBITEMBROWSE_sply,eTBITEMBROWSE_spnrms,eTBITEMBROWSE_wz,eTBITEMBROWSE_xsl,key,key_label_2,sj,spmc,type,zh",
				label_name: "事件_淘宝商品浏览",
				subject_property: ""
			},
			acounttransout_event_other: {
				icon_mapping: "event-graphicon-ruzhangjiaoyi",
				type_name: "事件_账户汇出交易",
				show_normal: "zzh",
				key_mapping: "",
				label: "acounttransout_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,zzh",
				minor_prop: "jysj,eACOUNTTRANSout_jyhye",
				gen_key_type: "string",
				primary_prop: "zzh,eACOUNTTRANSout_jyfs,dfzh,eACOUNTTRANSout_jye",
				icon_prop: "",
				timeline: "jysj",
				show_bigger: "zzh",
				fields: "dfzh,eACOUNTTRANSout_jye,eACOUNTTRANSout_jyfs,eACOUNTTRANSout_jyhye,jysj,key_label_1,key_label_2,type,zzh",
				label_name: "事件_账户汇出交易"
			},
			hotel_other: {
				icon_mapping: "entity-graphicon-hotel",
				type_name: "旅馆",
				show_normal: "HOTEL_ldmc,lddm",
				key_mapping: "lddm",
				label: "hotel",
				element_type: "entity",
				groupby: "",
				type: "other",
				menu: "",
				title: "HOTEL_ldmc,HOTEL_ldxz",
				minor_prop: "HOTEL_ldzl,HOTEL_lddj,HOTEL_ldsyz,HOTEL_fddbr,HOTEL_frsfz,HOTEL_frhjd,HOTEL_zjl,HOTEL_zazrr,HOTEL_babdh,HOTEL_djrq,HOTEL_fjs,HOTEL_bzf,HOTEL_cws,HOTEL_drf,HOTEL_srf,HOTEL_tf,HOTEL_hylx,HOTEL_cyrs,HOTEL_bars,HOTEL_lxdh,HOTEL_qyxz,HOTEL_gxdwmc,HOTEL_gxdwdh,HOTEL_ssjwq,HOTEL_ssfjdm,HOTEL_sspcsdm,HOTEL_ssxmc,HOTEL_bdrksj,HOTEL_zt,HOTEL_ztbgrq,HOTEL_zxbz",
				gen_key_type: "string",
				primary_prop: "HOTEL_ldmc,HOTEL_ldxz,lddm,HOTEL_ldxj",
				icon_prop: "",
				timeline: "HOTEL_djrq",
				show_bigger: "HOTEL_ldmc,HOTEL_ldxz,lddm",
				fields: "geo,HOTEL_babdh,HOTEL_bars,HOTEL_bdrksj,HOTEL_bzf,HOTEL_cws,HOTEL_cyrs,HOTEL_djrq,HOTEL_drf,HOTEL_fddbr,HOTEL_fjs,HOTEL_frhjd,HOTEL_frsfz,HOTEL_gxdwdh,HOTEL_gxdwmc,HOTEL_hylx,HOTEL_lddj,HOTEL_ldmc,HOTEL_ldsyz,HOTEL_ldxj,HOTEL_ldxz,HOTEL_ldzl,HOTEL_lxdh,HOTEL_qyxz,HOTEL_srf,HOTEL_ssfjdm,HOTEL_ssjwq,HOTEL_sspcsdm,HOTEL_ssxmc,HOTEL_tf,HOTEL_zazrr,HOTEL_zbx,HOTEL_zby,HOTEL_zjl,HOTEL_zt,HOTEL_ztbgrq,HOTEL_zxbz,key,lddm,type",
				label_name: "旅馆",
				key_prop: "key,lddm"
			},
			flightDP_event_other: {
				icon_mapping: "event-graphicon-booking",
				type_name: "事件_空港订票",
				subject_label: "person",
				object_label: "flight",
				label: "flightDP_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,hbh",
				minor_prop: "cfsj,eFLIGHTdp_ddsj",
				entity_label: "flight",
				primary_prop: "hbh,eFLIGHTdp_djjc,eFLIGHTdp_ddjc",
				icon_prop: "",
				entity_properties: "key_label_2",
				timeline: "eFLIGHTdp_bdrkmc",
				object_property: "key_label_2",
				fields: "cfsj,eFLIGHTdp_bdrkmc,eFLIGHTdp_cyhkgs,eFLIGHTdp_ddjc,eFLIGHTdp_ddsj,eFLIGHTdp_djjc,eFLIGHTdp_pnrcjrq,eFLIGHTdp_ywm,eFLIGHTdp_zcw,eFLIGHTdp_zjlx,eFLIGHTdp_zwm,hbh,key,key_label_1,key_label_2,type",
				label_name: "事件_空港订票",
				subject_property: "key"
			},
			harts_other: {
				type_name: "隐性关系",
				object_property: "to_key",
				label: "harts",
				element_type: "relation",
				type: "other",
				fields: "frequencies,from_key,rule_ids,time_list,to_key",
				label_name: "隐性关系",
				subject_property: "from_key"
			},
			email_other: {
				icon_mapping: "entity-graphicon-email_accounts",
				type_name: "邮箱帐号",
				show_normal: "EMAIL_yxdz",
				key_mapping: "zh",
				label: "email",
				element_type: "entity",
				groupby: "",
				type: "other",
				title: "EMAIL_yhnc,EMAIL_yxdz",
				menu: "",
				minor_prop: "EMAIL_xb,EMAIL_nl,EMAIL_csny,EMAIL_byyx,EMAIL_mm,EMAIL_gjdm,EMAIL_cs,EMAIL_xzqh,EMAIL_lxdz,EMAIL_gxqm,EMAIL_grsm,EMAIL_rjmc,EMAIL_azrq,EMAIL_cjsj,EMAIL_zymc",
				gen_key_type: "string",
				primary_prop: "zh,EMAIL_yxdz,EMAIL_yhnc,EMAIL_zsm",
				icon_prop: "",
				timeline: "EMAIL_azrq",
				show_bigger: "EMAIL_yxdz,zh",
				fields: "EMAIL_azrq,EMAIL_byyx,EMAIL_cjsj,EMAIL_cs,EMAIL_csny,EMAIL_gjdm,EMAIL_grsm,EMAIL_gxqm,EMAIL_lxdz,EMAIL_mm,EMAIL_nl,EMAIL_rjmc,EMAIL_xb,EMAIL_xx,EMAIL_xzqh,EMAIL_yhnc,EMAIL_yxdz,EMAIL_yzbm,EMAIL_zsm,EMAIL_zymc,key,type,zh",
				label_name: "邮箱帐号",
				key_prop: "key"
			},
			qqwx_other: {
				icon_mapping: "entity-graphicon-qq_and_wechat_number",
				type_name: "QQ及微信号",
				show_normal: "QQWX_zhlx,QQWX_zh",
				key_mapping: "QQWX_zh,QQWX_zhlx",
				label: "qqwx",
				element_type: "entity",
				groupby: "",
				type: "other",
				title: "QQWX_zhlx,QQWX_zh",
				menu: "",
				minor_prop: "QQWX_xb,QQWX_csny,QQWX_byyx,QQWX_zymc,QQWX_gjdm,QQWX_cs,QQWX_grsm,QQWX_gxqm,QQWX_lxdz,QQWX_nl,QQWX_xx,QQWX_mm,QQWX_yxdz,QQWX_xzqh,QQWX_yzbm,QQWX_azrq,QQWX_cjsj",
				gen_key_type: "string",
				primary_prop: "QQWX_zhlx,QQWX_zh,QQWX_yhnc,QQWX_zsm",
				icon_prop: "",
				timeline: "QQWX_azrq",
				show_bigger: "QQWX_zhlx,QQWX_zh",
				fields: "key,QQWX_azrq,QQWX_byyx,QQWX_cjsj,QQWX_cs,QQWX_csny,QQWX_gjdm,QQWX_grsm,QQWX_gxqm,QQWX_lxdz,QQWX_mm,QQWX_nl,QQWX_xb,QQWX_xx,QQWX_xzqh,QQWX_yhnc,QQWX_yxdz,QQWX_yzbm,QQWX_zh,QQWX_zhlx,QQWX_zsm,QQWX_zymc,type,zhlx_zh",
				label_name: "QQ及微信号",
				key_prop: "key"
			},
			qqwxG_other: {
				icon_mapping: "entity-graphicon-qq_and_wechat_group_number",
				type_name: "QQ及微信群号",
				show_normal: "QQWXg_qzmc",
				key_mapping: "QQWXg_zhlx,QQWXg_qzid",
				label: "qqwxG",
				element_type: "entity",
				groupby: "",
				type: "other",
				title: "QQWXg_qzid,QQWXg_qzmc,zhlx_qzid",
				menu: "",
				minor_prop: "QQWXg_cjzzh,QQWXg_cjznc,QQWXg_rs,QQWXg_zdcys,QQWXg_qgg,QQWXg_qjj",
				gen_key_type: "string",
				primary_prop: "QQWXg_qzid,QQWXg_qzmc,QQWXg_cjzzh",
				icon_prop: "",
				timeline: "",
				show_bigger: "QQWXg_qzid,QQWXg_qzmc",
				fields: "key,QQWXg_cjzid,QQWXg_cjznc,QQWXg_cjzzh,QQWXg_qgg,QQWXg_qjj,QQWXg_qzid,QQWXg_qzmc,QQWXg_rs,QQWXg_zdcys,QQWXg_zhlx,type,zhlx_qzid",
				label_name: "QQ及微信群号",
				key_prop: "key"
			},
			victimWarning_relation_other: {
				icon_mapping: "relation-graphicon-victim_warning_instance",
				type_name: "受害人_警情关系",
				subject_label: "person",
				show_normal: "type",
				object_label: "warning",
				label: "victimWarning_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,sjdbh",
				minor_prop: "rVICTIMWARNING_basj,rVICTIMWARNING_szxm,rVICTIMWARNING_szzjlx,szzjhm,rVICTIMWARNING_szlxdh,sjdbh",
				primary_prop: "rVICTIMWARNING_szxm,sjdbh,type",
				icon_prop: "",
				timeline: "rVICTIMWARNING_basj",
				object_property: "key_label_2",
				show_bigger: "type",
				fields: "key_label_1,key_label_2,rVICTIMWARNING_basj,rVICTIMWARNING_szlxdh,rVICTIMWARNING_szxm,rVICTIMWARNING_szzjlx,sjdbh,szzjhm,type",
				label_name: "受害人_警情关系",
				subject_property: "szzjhm"
			},
			phoneContact_relation_other: {
				icon_mapping: "relation-graphicon-telephone_directory",
				type_name: "电话通讯录关系",
				subject_label: "phoneNO",
				show_normal: "type",
				object_label: "phoneNO",
				label: "phoneContact_relation",
				element_type: "relation",
				groupby: "",
				type: "other",
				title: "type,zjsjh",
				minor_prop: "",
				primary_prop: "zjsjh,dfsjh",
				icon_prop: "",
				timeline: "",
				object_property: "key_label_2",
				show_bigger: "type,zjsjh",
				fields: "dfsjh,key_label_1,key_label_2,type,zjsjh",
				label_name: "电话通讯录关系",
				subject_property: "zjsjh"
			},
			person_non_cri_person: {
				icon_mapping: "entity-graphicon-feiqiankezhongdianren",
				type_name: "非前科重点人",
				show_normal: "PERSON_xm",
				key_mapping: "PERSON_zjhm",
				label: "person",
				element_type: "entity",
				groupby: "PERSON_xb,PERSON_mz,PERSON_zdrlx",
				type: "non_cri_person",
				menu: "criminal_relation",
				title: "PERSON_xm,key",
				minor_prop: "PERSON_ch,PERSON_cym,PERSON_csrq,PERSON_csdxz,PERSON_hyzk,PERSON_xzdxz,PERSON_hzh,PERSON_nl,PERSON_wwxm,PERSON_whcd,PERSON_wxdj,PERSON_flglb,PERSON_sjzdrybh,PERSON_bjzdrybh,PERSON_nrbjzdryksj,PERSON_ZDRYLBBJ,PERSON_mgqlkjb,PERSON_ywxds,PERSON_lydpzl,PERSON_zsdpzl,PERSON_xdcs,PERSON_zjlasj,PERSON_wfrybh,PERSON_sxzm,PERSON_xq,PERSON_zxf,PERSON_jsh,PERSON_jlxzsj,PERSON_jlbgsj,PERSON_jlcxsj,PERSON_ztrybh,PERSON_tprq,PERSON_grgs,PERSON_YXX,PERSON_tssf,PERSON_jggjdq,PERSON_jgssxq,PERSON_hjdqh,PERSON_sfzqfrq,PERSON_sfzyxrq,PERSON_sfly,PERSON_sg,PERSON_tx,PERSON_ky,PERSON_dna,PERSON_xx,PERSON_lx,PERSON_zcxh,PERSON_gzdw,PERSON_hjdz,PERSON_zjxy,PERSON_dzyx,PERSON_lxdh,PERSON_sjhm,PERSON_zy,PERSON_zzmm,PERSON_tbtsbj,PERSON_jszzt,PERSON_jzqx,PERSON_fzjg,PERSON_fzrq,PERSON_xcjszg,PERSON_xczgzjcx,PERSON_zjcx,PERSON_zxbh,PERSON_zwbh,PERSON_yxqs,PERSON_yxqz,PERSON_swrq,PERSON_swzxlb,PERSON_zxbs,PERSON_zxrq,PERSON_zdrlx",
				gen_key_type: "string",
				primary_prop: "PERSON_xm,PERSON_xb,PERSON_mz,PERSON_zjhm,PERSON_zdrlx",
				icon_prop: "",
				timeline: "PERSON_csrq",
				show_bigger: "PERSON_xm,key",
				fields: "key,key_label,PERSON_bjzdrybh,PERSON_ch,PERSON_csdxz,PERSON_csrq,PERSON_cym,PERSON_dna,PERSON_dzyx,PERSON_flglb,PERSON_fzjg,PERSON_fzrq,PERSON_grgs,PERSON_gzdw,PERSON_hjdqh,PERSON_hjdz,PERSON_hyzk,PERSON_hzh,PERSON_jggjdq,PERSON_jgssxq,PERSON_jlbgsj,PERSON_jlcxsj,PERSON_jlxzsj,PERSON_jsh,PERSON_jszzt,PERSON_jzqx,PERSON_ky,PERSON_lx,PERSON_lxdh,PERSON_lydpzl,PERSON_mgqlkjb,PERSON_mz,PERSON_nl,PERSON_nrbjzdryksj,PERSON_rxid,PERSON_sfly,PERSON_sfzqfrq,PERSON_sfzyxrq,PERSON_sg,PERSON_sjhm,PERSON_sjzdrybh,PERSON_swrq,PERSON_swzxlb,PERSON_sxzm,PERSON_tbtsbj,PERSON_tprq,PERSON_tssf,PERSON_tx,PERSON_wfrybh,PERSON_whcd,PERSON_wwxm,PERSON_wxdj,PERSON_xb,PERSON_xcjszg,PERSON_xczgzjcx,PERSON_xdcs,PERSON_xm,PERSON_xq,PERSON_xx,PERSON_xzdxz,PERSON_ywxds,PERSON_yxqs,PERSON_yxqz,PERSON_YXX,PERSON_zcxh,PERSON_zdrlx,PERSON_ZDRYLBBJ,PERSON_zjcx,PERSON_zjhm,PERSON_zjlasj,PERSON_zjlx,PERSON_zjxy,PERSON_zsdpzl,PERSON_ztrybh,PERSON_zwbh,PERSON_zxbh,PERSON_zxbs,PERSON_zxf,PERSON_zxrq,PERSON_zy,PERSON_zzmm,type",
				label_name: "人",
				key_prop: "key"
			},
			trainNumber_other: {
				icon_mapping: "entity-graphicon-huochecheci",
				type_name: "车次",
				show_normal: "new_cc",
				key_mapping: "new_cc",
				label: "trainNumber",
				element_type: "entity",
				groupby: "new_cc",
				type: "other",
				title: "new_cc",
				menu: "",
				minor_prop: "TRAINNUMBER_cc",
				gen_key_type: "string",
				primary_prop: "new_cc",
				icon_prop: "",
				timeline: "",
				show_bigger: "new_cc",
				fields: "key,new_cc,TRAINNUMBER_cc,type",
				label_name: "车次",
				key_prop: "key"
			},
			qqwxG_event_other: {
				icon_mapping: "event-graphicon-qq_and_wechat_groupchat",
				type_name: "事件_QQ微信群聊天",
				subject_label: "qqwx",
				object_label: "qqwxG",
				label: "qqwxG_event",
				element_type: "event",
				groupby: "",
				type: "other",
				title: "type,zhlx_qzid",
				minor_prop: "eQQWXg_qzmc,eQQWXg_bddz,fssj,eQQWXg_jsxxnr,eQQWXg_ltjlid",
				entity_label: "vehicle",
				primary_prop: "eQQWXg_zhlx,eQQWXg_zzh,eQQWXg_qzid",
				icon_prop: "",
				entity_properties: "",
				timeline: "fssj",
				object_property: "key_label_2",
				fields: "eQQWXg_bddz,eQQWXg_jsxxnr,eQQWXg_ltjlid,eQQWXg_qzid,eQQWXg_qzmc,eQQWXg_zhlx,eQQWXg_zzh,fssj,key,key_label_2,type,zhlx_qzid,zhlx_zzh",
				label_name: "事件_QQ微信群聊天",
				subject_property: "key"
			}
		},
		propertyMapping: {
			eFLIGHTdp_zwm: {
				time_format: "",
				name: "中文名",
				data_type: "string"
			},
			BANKno_zhlx: {
				time_format: "",
				name: "账户类型",
				data_type: "string"
			},
			eTRAIN_dz: {
				time_format: "",
				name: "到站",
				data_type: "string"
			},
			VEHICLE_ywpp: {
				time_format: "",
				name: "英文品牌",
				data_type: "string"
			},
			eSMS_jsxxnr: {
				time_format: "",
				name: "即时信息内容",
				data_type: "string"
			},
			CASE_smbz: {
				time_format: "",
				name: "涉密标志",
				data_type: "string"
			},
			rAUTHENTICATIONm_rzzh: {
				time_format: "",
				name: "认证账号",
				data_type: "string"
			},
			eEMAIL_msr: {
				time_format: "",
				name: "密送人",
				data_type: "string"
			},
			zjhm: {
				time_format: "",
				name: "证件号码",
				data_type: "string"
			},
			rWEIBO_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			PERSON_zjxy: {
				time_format: "",
				name: "宗教信仰",
				data_type: "string"
			},
			rWEIBOfriend_zhlx: {
				time_format: "",
				name: "账号类型",
				data_type: "string"
			},
			WARNING_szlxdh: {
				time_format: "",
				name: "事主联系电话",
				data_type: "string"
			},
			EMAIL_cs: {
				time_format: "",
				name: "城市",
				data_type: "string"
			},
			sxrzh: {
				time_format: "",
				name: "收信人账号",
				data_type: "string"
			},
			WEIBO_zymc: {
				time_format: "",
				name: "职业名称",
				data_type: "string"
			},
			ePASSPORTTRAIN_spczybh: {
				time_format: "",
				name: "售票操作员编号",
				data_type: "string"
			},
			WARNING_afdzlbmc: {
				time_format: "",
				name: "案发地址类别名称",
				data_type: "string"
			},
			VEHICLE_cllxmc: {
				time_format: "",
				name: "车辆类型名称",
				data_type: "string"
			},
			eINTERNETCAFE_zjlx_dm: {
				time_format: "",
				name: "证件类型代码",
				data_type: "string"
			},
			PHONEno_ajbq: {
				time_format: "",
				name: "案件标签",
				data_type: "string"
			},
			CASE_zsyy: {
				time_format: "",
				name: "致死原因",
				data_type: "string"
			},
			ePASSPORTFLIGHTlg_zwh: {
				time_format: "",
				name: "座位号",
				data_type: "string"
			},
			eQQWX_dfyhid: {
				time_format: "",
				name: "对方用户ID",
				data_type: "string"
			},
			ePASSPORTFLIGHTdp_zjlx: {
				time_format: "",
				name: "证件类型",
				data_type: "string"
			},
			PERSON_zdrlx: {
				time_format: "",
				name: "重点人类型",
				data_type: "string"
			},
			rCriminalVehicle_cfzl: {
				time_format: "",
				name: "处罚种类",
				data_type: "string"
			},
			WARNING_barxm: {
				time_format: "",
				name: "报案人姓名",
				data_type: "string"
			},
			eFLIGHTlg_djh: {
				time_format: "",
				name: "登机号",
				data_type: "string"
			},
			eWEIBOPUBLISH_zhlx: {
				time_format: "",
				name: "账号类型",
				data_type: "string"
			},
			rVEHICLE_glxq: {
				time_format: "",
				name: "管理辖区",
				data_type: "string"
			},
			eWIFI_COLLECTION_EQUIPMENT_LONGITUDE: {
				time_format: "",
				name: "采集设备经度",
				data_type: "string"
			},
			eWEIBOsms_sxrzh: {
				time_format: "",
				name: "收信人账号",
				data_type: "string"
			},
			rQQWX_zh: {
				time_format: "",
				name: "账号",
				data_type: "string"
			},
			szzjhm: {
				time_format: "",
				name: "事主证件号码",
				data_type: "string"
			},
			CASE_ajqymc: {
				time_format: "",
				name: "案件区域名称",
				data_type: "string"
			},
			HOTEL_gxdwdh: {
				time_format: "",
				name: "管辖单位电话",
				data_type: "string"
			},
			PHONEI_xh: {
				time_format: "",
				name: "型号",
				data_type: "string"
			},
			rWEIBOfriend_hybz: {
				time_format: "",
				name: "好友备注",
				data_type: "string"
			},
			ePASSPORTFLIGHTlg_zwm: {
				time_format: "",
				name: "中文名",
				data_type: "string"
			},
			eQQWXg_qzmc: {
				time_format: "",
				name: "群组名称",
				data_type: "string"
			},
			eVEHICLE_dh: {
				time_format: "",
				name: "电话",
				data_type: "string"
			},
			CASE_fasjks: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "发案时间开始",
				data_type: "time"
			},
			VEHICLE_gl: {
				time_format: "",
				name: "功率",
				data_type: "string"
			},
			eTRAIN_fz: {
				time_format: "",
				name: "发站",
				data_type: "string"
			},
			PERSON_hjdqh: {
				time_format: "",
				name: "户籍地区划",
				data_type: "string"
			},
			rWEIBOfriend_gzfs: {
				time_format: "",
				name: "关注方式",
				data_type: "string"
			},
			rGUARDIA2_ztxm: {
				time_format: "",
				name: "主体姓名",
				data_type: "string"
			},
			VEHICLE_rlzlmc: {
				time_format: "",
				name: "燃料种类名称",
				data_type: "string"
			},
			PERSON_rxid: {
				time_format: "",
				name: "人像ID",
				data_type: "string"
			},
			PERSON_xczgzjcx: {
				time_format: "",
				name: "校车资格准驾车型",
				data_type: "string"
			},
			eHOTEL_xm: {
				time_format: "",
				name: "姓名",
				data_type: "string"
			},
			eQQWX_zhlx: {
				time_format: "",
				name: "账号类型",
				data_type: "string"
			},
			QQWX_zymc: {
				time_format: "",
				name: "职业名称",
				data_type: "string"
			},
			CASE_stfsmc: {
				time_format: "",
				name: "试探方式名称",
				data_type: "string"
			},
			CASE_shxs: {
				time_format: "",
				name: "受害形式",
				data_type: "string"
			},
			WARNING_barxb: {
				time_format: "",
				name: "报案人性别",
				data_type: "string"
			},
			eHOTEL_gxdwmc: {
				time_format: "",
				name: "管辖单位名称",
				data_type: "string"
			},
			TAOBAO_mm: {
				time_format: "",
				name: "密码",
				data_type: "string"
			},
			QQWXg_qzmc: {
				time_format: "",
				name: "群组名称",
				data_type: "string"
			},
			eHOTEL_xz: {
				time_format: "",
				name: "详址",
				data_type: "string"
			},
			PERSON_YXX: {
				time_format: "",
				name: "有效性",
				data_type: "string"
			},
			PERSON_jlxzsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "记录新增时间",
				data_type: "time"
			},
			WARNING_faxz: {
				time_format: "",
				name: "发案详址",
				data_type: "string"
			},
			zhlx_fxrzh: {
				time_format: "",
				name: "账号类型+发信人账号",
				data_type: "string"
			},
			ePASSPORTFLIGHTdp_ywm: {
				time_format: "",
				name: "英文名",
				data_type: "string"
			},
			HOUSEHOLD_nzfbs: {
				time_format: "",
				name: "农转非标识",
				data_type: "string"
			},
			CASE_fasjjs: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "发案时间结束",
				data_type: "time"
			},
			rCASEREPORT_basj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "报案时间",
				data_type: "time"
			},
			WIFI_zxcq: {
				time_format: "",
				name: "最新场强",
				data_type: "string"
			},
			TAOBAO_nl: {
				time_format: "",
				name: "年龄",
				data_type: "string"
			},
			key_label: {
				time_format: "",
				name: "后缀主键",
				data_type: "string"
			},
			CASE_xzfsmc: {
				time_format: "",
				name: "销赃方式名称",
				data_type: "string"
			},
			WEIBO_zhlx: {
				time_format: "",
				name: "账号类型",
				data_type: "string"
			},
			PASSPORT_xbdm: {
				time_format: "",
				name: "性别代码",
				data_type: "string"
			},
			eWIFI_COLLECTION_EQUIPMENT_LATITUDE: {
				time_format: "",
				name: "采集设备纬度",
				data_type: "string"
			},
			VEHICLE_gbthps: {
				time_format: "",
				name: "钢板弹簧片数",
				data_type: "string"
			},
			BASESTATION_jd: {
				time_format: "",
				name: "经度",
				data_type: "string"
			},
			rGUARDIA2_jhr2gx: {
				time_format: "",
				name: "监护人二监护关系",
				data_type: "string"
			},
			rBANKno_khh: {
				time_format: "",
				name: "开户行",
				data_type: "string"
			},
			VEHICLE_hdzk: {
				time_format: "",
				name: "核定载客",
				data_type: "string"
			},
			CASE_zarssx: {
				time_format: "",
				name: "作案人数上限",
				data_type: "string"
			},
			rHOUSEHOLD_bdsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "变动时间",
				data_type: "time"
			},
			rQQWXfriend_hyfzxx: {
				time_format: "",
				name: "好友分组信息",
				data_type: "string"
			},
			zhlx_dfzh: {
				time_format: "",
				name: "账号类型+对方账号",
				data_type: "string"
			},
			ePASSPORTHOTEL_ldmc: {
				time_format: "",
				name: "旅店名称",
				data_type: "string"
			},
			CASE_parq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "破案日期",
				data_type: "time"
			},
			QQWX_zhlx: {
				time_format: "",
				name: "账号类型",
				data_type: "string"
			},
			VEHICLE_clyt: {
				time_format: "",
				name: "车辆用途",
				data_type: "string"
			},
			eVEHICLE_zsxzqh: {
				time_format: "",
				name: "住所行政区划",
				data_type: "string"
			},
			CASE_sflcza: {
				time_format: "",
				name: "是否流窜作案",
				data_type: "string"
			},
			PERSON_sjhm: {
				time_format: "",
				name: "手机号码",
				data_type: "string"
			},
			VEHICLE_clxh: {
				time_format: "",
				name: "车辆型号",
				data_type: "string"
			},
			QQWX_zsm: {
				time_format: "",
				name: "真实名",
				data_type: "string"
			},
			spmc: {
				time_format: "",
				name: "商品名称",
				data_type: "string"
			},
			eFLIGHTlg_xdhhm: {
				time_format: "",
				name: "在原始电话号码中提取电话号码",
				data_type: "string"
			},
			WARNING_slbh: {
				time_format: "",
				name: "受理编号",
				data_type: "string"
			},
			CASE_lcfwfx: {
				time_format: "",
				name: "流窜范围分析",
				data_type: "string"
			},
			eFLIGHTdp_pnrcjrq: {
				time_format: "yyyy-MM-dd",
				name: "PNR创建日期",
				data_type: "date"
			},
			rHOUSEHOLD_bdrq: {
				time_format: "yyyy-MM-dd",
				name: "变动日期",
				data_type: "date"
			},
			VEHICLE_fzjg: {
				time_format: "",
				name: "发证机关",
				data_type: "string"
			},
			zhlx_hyzh: {
				time_format: "",
				name: "账号类型+好友账号",
				data_type: "string"
			},
			PERSON_jcflx: {
				time_format: "",
				name: "基础分类(细)",
				data_type: "string"
			},
			WIFI_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			PHONEM_tzms: {
				time_format: "",
				name: "特征描述",
				data_type: "string"
			},
			rWEIBOfriend_zy: {
				time_format: "",
				name: "主页",
				data_type: "string"
			},
			TAOBAO_gjdm: {
				time_format: "",
				name: "国家代号",
				data_type: "string"
			},
			eFLIGHTdp_ddjc: {
				time_format: "",
				name: "到达机场",
				data_type: "string"
			},
			TAOBAO_xzqh: {
				time_format: "",
				name: "行政区划",
				data_type: "string"
			},
			PERSON_zy: {
				time_format: "",
				name: "职业",
				data_type: "string"
			},
			BASESTATION_dm: {
				time_format: "",
				name: "地貌(覆盖)",
				data_type: "string"
			},
			eVEHICLE_hpzlmc: {
				time_format: "",
				name: "号牌种类名称",
				data_type: "string"
			},
			eQQWX_bddz: {
				time_format: "",
				name: "本地动作",
				data_type: "string"
			},
			eSMS_ccwz: {
				time_format: "",
				name: "存储位置",
				data_type: "string"
			},
			CASE_jjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "接警时间",
				data_type: "time"
			},
			eACOUNTTRANSout_jyfs: {
				time_format: "",
				name: "交易方式",
				data_type: "string"
			},
			eTRAFFICMONITOR_zpip: {
				time_format: "",
				name: "照片IP",
				data_type: "string"
			},
			rWEIBOfriend_zh: {
				time_format: "",
				name: "账号",
				data_type: "string"
			},
			dhhm: {
				time_format: "",
				name: "电话号码",
				data_type: "string"
			},
			BASESTATION_xzdw: {
				time_format: "",
				name: "行政单位",
				data_type: "string"
			},
			CASE_jjss: {
				time_format: "",
				name: "经济损失",
				data_type: "string"
			},
			WEIBO_cs: {
				time_format: "",
				name: "城市",
				data_type: "string"
			},
			CASE_qzsdmc: {
				time_format: "",
				name: "欺诈手段名称",
				data_type: "string"
			},
			eVEHICLE_clflmc: {
				time_format: "",
				name: "车辆分类名称",
				data_type: "string"
			},
			VEHICLE_hpzl_mc: {
				time_format: "",
				name: "号牌种类名称",
				data_type: "string"
			},
			WARNING_zbx: {
				time_format: "",
				name: "坐标X",
				data_type: "string"
			},
			WARNING_zby: {
				time_format: "",
				name: "坐标Y",
				data_type: "string"
			},
			WEIBO_bwsl: {
				time_format: "",
				name: "博文数量",
				data_type: "string"
			},
			BASESTATION_cs: {
				time_format: "",
				name: "城市",
				data_type: "string"
			},
			eFLIGHTlg_ywm: {
				time_format: "",
				name: "英文名",
				data_type: "string"
			},
			WIFI_COLLECTION_EQUIPMENT_LONGITUDE: {
				time_format: "",
				name: "采集设备经度",
				data_type: "string"
			},
			WIFI_COLLECTION_RADIUS: {
				time_format: "",
				name: "采集半径",
				data_type: "string"
			},
			eQQWXg_qzid: {
				time_format: "",
				name: "群组ID",
				data_type: "string"
			},
			WARNING_chujingshijian: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "处警时间",
				data_type: "time"
			},
			INTERNETCAFE_zbx: {
				time_format: "",
				name: "坐标X",
				data_type: "string"
			},
			BASESTATION_wlms: {
				time_format: "",
				name: "网络模式",
				data_type: "string"
			},
			BROWSER_rjmc: {
				time_format: "",
				name: "软件名称",
				data_type: "string"
			},
			ePASSPORTTRAIN_spczjc: {
				time_format: "",
				name: "售票车站简称",
				data_type: "string"
			},
			ePHONE_thjssj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "通话结束时间",
				data_type: "time"
			},
			eACOUNLOGIN_dlipjd: {
				time_format: "",
				name: "登陆ip经度",
				data_type: "string"
			},
			WIFI_wd_jd: {
				time_format: "",
				name: "纬度+经度",
				data_type: "geo"
			},
			eTRAIN_cc: {
				time_format: "",
				name: "车次",
				data_type: "string"
			},
			VEHICLE_cwkk: {
				time_format: "",
				name: "车外廓宽",
				data_type: "string"
			},
			VEHICLE_cwkg: {
				time_format: "",
				name: "车外廓高",
				data_type: "string"
			},
			CASE_ajmc: {
				time_format: "",
				name: "案件名称",
				data_type: "string"
			},
			IP_wd: {
				time_format: "",
				name: "IP位置纬度",
				data_type: "string"
			},
			PERSON_xq: {
				time_format: "",
				name: "刑期",
				data_type: "string"
			},
			VEHICLE_bxzzrq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "保险终止日期",
				data_type: "time"
			},
			CASE_jjry: {
				time_format: "",
				name: "接警人员",
				data_type: "string"
			},
			PERSON_swzxlb: {
				time_format: "",
				name: "死亡注销类别",
				data_type: "string"
			},
			rGUARDIA2_mz: {
				time_format: "",
				name: "民族",
				data_type: "string"
			},
			PHONEI_zdmac: {
				time_format: "",
				name: "终端MAC地址",
				data_type: "string"
			},
			WARNING_szzjdm: {
				time_format: "",
				name: "事主证件代码",
				data_type: "string"
			},
			PERSON_jlbgsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "记录变更时间",
				data_type: "time"
			},
			PERSON_xx: {
				time_format: "",
				name: "血型",
				data_type: "string"
			},
			crjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "出入境时间",
				data_type: "time"
			},
			fxrzh: {
				time_format: "",
				name: "发信人账号",
				data_type: "string"
			},
			QQWXg_qzid: {
				time_format: "",
				name: "群组ID",
				data_type: "string"
			},
			INTERNETCAFE_zby: {
				time_format: "",
				name: "坐标Y",
				data_type: "string"
			},
			ePHONEWIFI_csID: {
				time_format: "",
				name: "场所ID",
				data_type: "string"
			},
			PERSON_yxqs: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "有效期始",
				data_type: "time"
			},
			INTERNETCAFE_wbssxqh: {
				time_format: "",
				name: "网吧省市县区号",
				data_type: "string"
			},
			rGUARDIA1_jhr1xm: {
				time_format: "",
				name: "监护人一姓名",
				data_type: "string"
			},
			eWEIBOsms_sxid: {
				time_format: "",
				name: "私信ID",
				data_type: "string"
			},
			eWEIBOPUBLISH_ysbwid: {
				time_format: "",
				name: "原始博文ID",
				data_type: "string"
			},
			TAOBAO_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			TAOBAO_yhnc: {
				time_format: "",
				name: "用户昵称",
				data_type: "string"
			},
			PERSON_xb: {
				time_format: "",
				name: "性别",
				data_type: "string"
			},
			PHONEI_csmc: {
				time_format: "",
				name: "厂商名称",
				data_type: "string"
			},
			eWEIBOPUBLISH_fbzid: {
				time_format: "",
				name: "发布者ID",
				data_type: "string"
			},
			CASE_shrq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "受害日期",
				data_type: "time"
			},
			zhlx_qcyzh: {
				time_format: "",
				name: "账号类型+群成员账号",
				data_type: "string"
			},
			PERSON_xm: {
				time_format: "",
				name: "姓名",
				data_type: "string"
			},
			WARNING_bjrxm: {
				time_format: "",
				name: "报警人姓名",
				data_type: "string"
			},
			WARNING_barmzmc: {
				time_format: "",
				name: "报案人民族名称",
				data_type: "string"
			},
			dlsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "登陆时间",
				data_type: "time"
			},
			VEHICLE_cwkc: {
				time_format: "",
				name: "车外廓长",
				data_type: "string"
			},
			rHOUSEHOLD_qwdssxq: {
				time_format: "",
				name: "迁往地省市县(区)",
				data_type: "string"
			},
			PERSON_yxqz: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "有效期止",
				data_type: "time"
			},
			imei: {
				time_format: "",
				name: "IMEI/ESN/MEID",
				data_type: "string"
			},
			WEIBO_byyx: {
				time_format: "",
				name: "毕业院校",
				data_type: "string"
			},
			EMAIL_gxqm: {
				time_format: "",
				name: "个性签名",
				data_type: "string"
			},
			BASESTATION_sqh: {
				time_format: "",
				name: "扇区号",
				data_type: "string"
			},
			eWEIBOsms_fxrzh: {
				time_format: "",
				name: "发信人账号",
				data_type: "string"
			},
			eSMS_ckzt: {
				time_format: "",
				name: "查看状态",
				data_type: "string"
			},
			QQWX_azrq: {
				time_format: "yyyy-MM-dd",
				name: "安装日期",
				data_type: "date"
			},
			PERSON_grgs: {
				time_format: "",
				name: "个人概述",
				data_type: "string"
			},
			CASE_palx: {
				time_format: "",
				name: "破案类型",
				data_type: "string"
			},
			BASESTATION_sqdz: {
				time_format: "",
				name: "扇区地址",
				data_type: "string"
			},
			rQQWXfriend_hybz: {
				time_format: "",
				name: "好友备注",
				data_type: "string"
			},
			WARNING_szzy: {
				time_format: "",
				name: "事主职业",
				data_type: "string"
			},
			PERSON_sfly: {
				time_format: "",
				name: "是否聋哑",
				data_type: "string"
			},
			BANKno_zjhm: {
				time_format: "",
				name: "证件号码",
				data_type: "string"
			},
			rQQWXfriend_zhlx: {
				time_format: "",
				name: "账号类型",
				data_type: "string"
			},
			WARNING_szzz: {
				time_format: "",
				name: "事主住址",
				data_type: "string"
			},
			rHOUSEHOLD_lzgjdq: {
				time_format: "",
				name: "来自国家(地区)",
				data_type: "string"
			},
			ePASSPORTFLIGHTdp_ddjc: {
				time_format: "",
				name: "到达机场",
				data_type: "string"
			},
			VEHICLE_gcjkmc: {
				time_format: "",
				name: "国产/进口名称",
				data_type: "string"
			},
			rWARNINGREPORT_barxm: {
				time_format: "",
				name: "报案人姓名",
				data_type: "string"
			},
			eWEIBOPUBLISH_bwid: {
				time_format: "",
				name: "博文ID",
				data_type: "string"
			},
			PHONEM_sbmc: {
				time_format: "",
				name: "设备名称",
				data_type: "string"
			},
			rCriminalVehicle_sgdj: {
				time_format: "",
				name: "事故等级",
				data_type: "string"
			},
			ATM_wd: {
				time_format: "",
				name: "维度",
				data_type: "string"
			},
			eEMAIL_ckzt: {
				time_format: "",
				name: "查看状态",
				data_type: "string"
			},
			eINTERNETCAFE_swlx: {
				time_format: "",
				name: "上网类型",
				data_type: "string"
			},
			dfhm: {
				time_format: "",
				name: "对方号码",
				data_type: "string"
			},
			rFATHER_fqxm: {
				time_format: "",
				name: "父亲姓名",
				data_type: "string"
			},
			zjsjh: {
				time_format: "",
				name: "自己手机号",
				data_type: "string"
			},
			zzh: {
				time_format: "",
				name: "主账号",
				data_type: "string"
			},
			WARNING_szzjhm: {
				time_format: "",
				name: "事主证件号码",
				data_type: "string"
			},
			eHOTEL_tfsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "退房时间",
				data_type: "time"
			},
			CASE_xzsjimc: {
				time_format: "",
				name: "选择时机名称",
				data_type: "string"
			},
			zhlx_sxrzh: {
				time_format: "",
				name: "账号类型+收信人账号",
				data_type: "string"
			},
			HOTEL_sspcsdm: {
				time_format: "",
				name: "所属派出所代码",
				data_type: "string"
			},
			rESCAPEE_tprq: {
				time_format: "yyyy-MM-dd",
				name: "逃跑日期",
				data_type: "date"
			},
			eINTERNETCAFE_swip: {
				time_format: "",
				name: "上网IP",
				data_type: "string"
			},
			eWEIBOPUBLISH_zfs: {
				time_format: "",
				name: "转发数",
				data_type: "string"
			},
			WARNING_cjryj: {
				time_format: "",
				name: "处警人意见",
				data_type: "string"
			},
			EMAIL_mm: {
				time_format: "",
				name: "密码",
				data_type: "string"
			},
			ePHONE_thlx: {
				time_format: "",
				name: "通话类型",
				data_type: "string"
			},
			zhlx_zzh: {
				time_format: "",
				name: "账号类型+主账号",
				data_type: "string"
			},
			ePASSPORTINTERNETCAFE_jqmc: {
				time_format: "",
				name: "机器名称",
				data_type: "string"
			},
			ePASSPORTINTERNETCAFE_kh: {
				time_format: "",
				name: "卡号",
				data_type: "string"
			},
			BROWSER_csny: {
				time_format: "yyyy-MM-dd",
				name: "出生年月",
				data_type: "date"
			},
			eIMMIGRATION_qwd: {
				time_format: "",
				name: "前往地",
				data_type: "string"
			},
			eACOUNTTRANSout_jye: {
				time_format: "",
				name: "交易额",
				data_type: "string"
			},
			rHOUSEHOLD_bdlb: {
				time_format: "",
				name: "变动类别",
				data_type: "string"
			},
			PERSON_mgqlkjb: {
				time_format: "",
				name: "敏感期列控级别",
				data_type: "string"
			},
			ePASSPORTTRAIN_spsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "售票时间",
				data_type: "time"
			},
			CASE_lyjsjsdmc: {
				time_format: "",
				name: "利用计算机手段名称",
				data_type: "string"
			},
			PERSON_whcd: {
				time_format: "",
				name: "文化程度",
				data_type: "string"
			},
			ePASSPORTFLIGHTlg_xlzjs: {
				time_format: "",
				name: "行李总件数",
				data_type: "string"
			},
			BASESTATION_jzhbgd: {
				time_format: "",
				name: "基站海拔高度",
				data_type: "string"
			},
			ePHONE_lxrxm: {
				time_format: "",
				name: "联系人姓名",
				data_type: "string"
			},
			EMAIL_nl: {
				time_format: "",
				name: "年龄",
				data_type: "string"
			},
			BANKno_khrq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "开户日期",
				data_type: "time"
			},
			eWIFI_ENCRYPT_ALGORITHM_TYPE: {
				time_format: "",
				name: "热点加密类型",
				data_type: "string"
			},
			HOTEL_zjl: {
				time_format: "",
				name: "总经理",
				data_type: "string"
			},
			rCriminalVehicle_fxjgmc: {
				time_format: "",
				name: "发现机关名称",
				data_type: "string"
			},
			eVEHICLE_zjcx: {
				time_format: "",
				name: "准驾车型",
				data_type: "string"
			},
			eINTERNETCAFE_kh: {
				time_format: "",
				name: "卡号",
				data_type: "string"
			},
			VEHICLE_jszh: {
				time_format: "",
				name: "驾驶证号",
				data_type: "string"
			},
			BASESTATION_wzq: {
				time_format: "",
				name: "位置区",
				data_type: "string"
			},
			TAOBAO_grsm: {
				time_format: "",
				name: "个人说明",
				data_type: "string"
			},
			rQQWXGROUP_qcybz: {
				time_format: "",
				name: "群成员备注",
				data_type: "string"
			},
			ePASSPORTFLIGHTdp_zcw: {
				time_format: "",
				name: "子舱位",
				data_type: "string"
			},
			eVEHICLE_zsxxdj: {
				time_format: "",
				name: "住所详细地址",
				data_type: "string"
			},
			BANKno_zjlx: {
				time_format: "",
				name: "证件类型",
				data_type: "string"
			},
			VEHICLE_zzl: {
				time_format: "",
				name: "总质量",
				data_type: "string"
			},
			rFATHER_xb: {
				time_format: "",
				name: "性别",
				data_type: "string"
			},
			rSPOUSE_ztxm: {
				time_format: "",
				name: "主体姓名",
				data_type: "string"
			},
			rCriminalVehicle_wfxwmc: {
				time_format: "",
				name: "违法行为名称",
				data_type: "string"
			},
			eWEIBOPUBLISH_fbznc: {
				time_format: "",
				name: "发布者昵称",
				data_type: "string"
			},
			PERSON_zxf: {
				time_format: "",
				name: "重刑犯",
				data_type: "string"
			},
			WEIBO_gzsl: {
				time_format: "",
				name: "关注数量",
				data_type: "string"
			},
			CASE_bmjb: {
				time_format: "",
				name: "保密级别",
				data_type: "string"
			},
			rCriminalVehicle_wfsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "违法时间",
				data_type: "time"
			},
			kkbh: {
				time_format: "",
				name: "卡口编号",
				data_type: "string"
			},
			VEHICLE_glbmmc: {
				time_format: "",
				name: "管理部门名称",
				data_type: "string"
			},
			WARNING_ajxzmc: {
				time_format: "",
				name: "案件性质名称",
				data_type: "string"
			},
			dlzh: {
				time_format: "",
				name: "登陆账号",
				data_type: "string"
			},
			CASE_xzsjmc: {
				time_format: "",
				name: "选择时间名称",
				data_type: "string"
			},
			BASESTATION_wylx: {
				time_format: "",
				name: "网元类型",
				data_type: "string"
			},
			BROWSER_lxdz: {
				time_format: "",
				name: "联系地址",
				data_type: "string"
			},
			TAOBAO_xb: {
				time_format: "",
				name: "性别",
				data_type: "string"
			},
			EMAIL_zsm: {
				time_format: "",
				name: "真实名",
				data_type: "string"
			},
			PASSPORT_zjlxdm: {
				time_format: "",
				name: "证件类型代码",
				data_type: "string"
			},
			PASSPORT_zjlx: {
				time_format: "",
				name: "证件类型",
				data_type: "string"
			},
			CASE_xzwpmc: {
				time_format: "",
				name: "选择物品名称",
				data_type: "string"
			},
			WARNING_psrq: {
				time_format: "yyyy-MM-dd",
				name: "批示日期",
				data_type: "date"
			},
			eSMS_ajbq: {
				time_format: "",
				name: "案件标签",
				data_type: "string"
			},
			rQQWXfriend_zh: {
				time_format: "",
				name: "账号",
				data_type: "string"
			},
			rAUTHENTICATIONm_rzlx: {
				time_format: "",
				name: "认证类型",
				data_type: "string"
			},
			sjhm: {
				time_format: "",
				name: "手机号码",
				data_type: "string"
			},
			HOUSEHOLD_hlx: {
				time_format: "",
				name: "户类型",
				data_type: "string"
			},
			QQWX_yxdz: {
				time_format: "",
				name: "邮箱地址",
				data_type: "string"
			},
			WARNING_szxb: {
				time_format: "",
				name: "事主性别",
				data_type: "string"
			},
			WIFI_NETBAR_WACODE: {
				time_format: "",
				name: "场所编号",
				data_type: "string"
			},
			BANKno_hm: {
				time_format: "",
				name: "户名",
				data_type: "string"
			},
			eFLIGHTdp_ddsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "到达时间",
				data_type: "time"
			},
			eTBITEMBROWSE_jg: {
				time_format: "",
				name: "价格",
				data_type: "string"
			},
			WARNING_szxm: {
				time_format: "",
				name: "事主姓名",
				data_type: "string"
			},
			WIFI_OLLECTION_EQUIPMENT_NAME: {
				time_format: "",
				name: "采集设备名称",
				data_type: "string"
			},
			rQQWXGROUP_qcyid: {
				time_format: "",
				name: "群成员ID",
				data_type: "string"
			},
			eACOUNLOGIN_dlsc: {
				time_format: "",
				name: "登陆时长",
				data_type: "string"
			},
			rESCAPEE_ladwxc: {
				time_format: "",
				name: "立案单位详称",
				data_type: "string"
			},
			HOTEL_djrq: {
				time_format: "yyyy-MM-dd",
				name: "登记日期",
				data_type: "date"
			},
			PERSON_ywxds: {
				time_format: "",
				name: "有无吸毒史",
				data_type: "string"
			},
			eQQWX_dfnc: {
				time_format: "",
				name: "对方昵称",
				data_type: "string"
			},
			PHONEI_lywj: {
				time_format: "",
				name: "来源文件",
				data_type: "string"
			},
			CASE_larq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "立案日期",
				data_type: "time"
			},
			eTRAIN_spczybh: {
				time_format: "",
				name: "售票操作员编号",
				data_type: "string"
			},
			QQWXg_cjzzh: {
				time_format: "",
				name: "创建者账号",
				data_type: "string"
			},
			EMAIL_byyx: {
				time_format: "",
				name: "毕业院校",
				data_type: "string"
			},
			WEIBO_gxqm: {
				time_format: "",
				name: "个性签名",
				data_type: "string"
			},
			ePASSPORTINTERNETCAFE_wbdz: {
				time_format: "",
				name: "网吧地址",
				data_type: "string"
			},
			WARNING_ajlymc: {
				time_format: "",
				name: "案件来源名称",
				data_type: "string"
			},
			HOTEL_ssjwq: {
				time_format: "",
				name: "所属警务区",
				data_type: "string"
			},
			CAPTURE_TIME: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			CASE_hddq: {
				time_format: "",
				name: "活动地区",
				data_type: "string"
			},
			eQQWXPUBLISH_cjzh: {
				time_format: "",
				name: "采集账号",
				data_type: "string"
			},
			eURLBROWSE_wybt: {
				time_format: "",
				name: "网页标题",
				data_type: "string"
			},
			PHONEI_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			ePHONE_drsj: {
				time_format: "",
				name: "导入时间",
				data_type: "string"
			},
			PHONEno_imsi: {
				time_format: "",
				name: "SIM卡IMSI",
				data_type: "string"
			},
			VEHICLE_clflmc: {
				time_format: "",
				name: "车辆分类名称",
				data_type: "string"
			},
			CASE_shjg: {
				time_format: "",
				name: "受害经过",
				data_type: "string"
			},
			eWEIBOPUBLISH_xgbwid: {
				time_format: "",
				name: "相关博文ID",
				data_type: "string"
			},
			rPHONEmPHONENO_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			WARNING_ajaymc: {
				time_format: "",
				name: "案件案由名称",
				data_type: "string"
			},
			BASESTATION_sqzwm: {
				time_format: "",
				name: "扇区中文名",
				data_type: "string"
			},
			CASE_slrq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "受理日期",
				data_type: "time"
			},
			eTRAIN_spckh: {
				time_format: "",
				name: "售票窗口号",
				data_type: "string"
			},
			eEMAIL_bjzh: {
				time_format: "",
				name: "本机账号",
				data_type: "string"
			},
			eFLIGHTlg_xlzjs: {
				time_format: "",
				name: "行李总件数",
				data_type: "string"
			},
			eTRAFFICMONITOR_hphm: {
				time_format: "",
				name: "号牌号码",
				data_type: "string"
			},
			PASSPORT_csd: {
				time_format: "",
				name: "出生地",
				data_type: "string"
			},
			ajbh: {
				time_format: "",
				name: "案件编号",
				data_type: "string"
			},
			eTRAFFICMONITOR_zpljc: {
				time_format: "",
				name: "照片路径C",
				data_type: "string"
			},
			WARNING_basj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "报案时间",
				data_type: "time"
			},
			ePHONE_thsc: {
				time_format: "",
				name: "通话时长",
				data_type: "string"
			},
			ePHONE_thddqh: {
				time_format: "",
				name: "通话地点区号",
				data_type: "string"
			},
			eTRAFFICMONITOR_zplja: {
				time_format: "",
				name: "照片路径A",
				data_type: "string"
			},
			eTRAFFICMONITOR_zpljb: {
				time_format: "",
				name: "照片路径B",
				data_type: "string"
			},
			ePHONE_jmzt: {
				time_format: "",
				name: "加密状态",
				data_type: "string"
			},
			rWARNINGREPORT_barzjlx: {
				time_format: "",
				name: "报案人证件类型",
				data_type: "string"
			},
			VEHICLE_zzgmc: {
				time_format: "",
				name: "制造国名称",
				data_type: "string"
			},
			eIMMIGRATION_cfdssxq: {
				time_format: "",
				name: "出发地所属辖区",
				data_type: "string"
			},
			WEIBO_lxdz: {
				time_format: "",
				name: "联系地址",
				data_type: "string"
			},
			TAOBAO_yzbm: {
				time_format: "",
				name: "邮政编码",
				data_type: "string"
			},
			CASE_ajbz: {
				time_format: "",
				name: "案件标志",
				data_type: "string"
			},
			BASESTATION_sqlx: {
				time_format: "",
				name: "扇区类型",
				data_type: "string"
			},
			WARNING_bjdh: {
				time_format: "",
				name: "报警电话",
				data_type: "string"
			},
			eWEIBOPUBLISH_pls: {
				time_format: "",
				name: "评论数",
				data_type: "string"
			},
			IP_ssyys: {
				time_format: "",
				name: "IP所属运营商",
				data_type: "string"
			},
			VEHICLE_csysmc: {
				time_format: "",
				name: "车身颜色名称",
				data_type: "string"
			},
			ztsfhm: {
				time_format: "",
				name: "主体身份号码",
				data_type: "string"
			},
			CASE_padw: {
				time_format: "",
				name: "破案单位",
				data_type: "string"
			},
			CASE_ajlymc: {
				time_format: "",
				name: "案件来源名称",
				data_type: "string"
			},
			TAOBAO_lxdz: {
				time_format: "",
				name: "联系地址",
				data_type: "string"
			},
			rCriminalVehicle_clflmc: {
				time_format: "",
				name: "车辆分类名称",
				data_type: "string"
			},
			eTRAIN_zwh: {
				time_format: "",
				name: "座位号",
				data_type: "string"
			},
			rMOTHER_mqxm: {
				time_format: "",
				name: "母亲姓名",
				data_type: "string"
			},
			HOTEL_qyxz: {
				time_format: "",
				name: "企业性质",
				data_type: "string"
			},
			new_cc: {
				time_format: "",
				name: "车次号",
				data_type: "string"
			},
			EMAIL_grsm: {
				time_format: "",
				name: "个人说明",
				data_type: "string"
			},
			EMAIL_xzqh: {
				time_format: "",
				name: "行政区划",
				data_type: "string"
			},
			BASESTATION_xq: {
				time_format: "",
				name: "小区",
				data_type: "string"
			},
			ePHONE_jzh: {
				time_format: "",
				name: "基站号",
				data_type: "string"
			},
			WARNING_fxsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "发现时间",
				data_type: "time"
			},
			ePASSPORTFLIGHTdp_ddsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "到达时间",
				data_type: "time"
			},
			eTRAFFICMONITOR_zjid: {
				time_format: "",
				name: "主键ID",
				data_type: "string"
			},
			rCriminalVehicle_wfjfs: {
				time_format: "",
				name: "违法记分数",
				data_type: "string"
			},
			rCriminalVehicle_fkje: {
				time_format: "",
				name: "罚款金额",
				data_type: "string"
			},
			VEHICLE_hxnbkd: {
				time_format: "",
				name: "货箱内部宽度",
				data_type: "string"
			},
			CASE_xyrbz: {
				time_format: "",
				name: "嫌疑人标志",
				data_type: "string"
			},
			HOTEL_zbx: {
				time_format: "",
				name: "坐标X",
				data_type: "string"
			},
			PASSPORT_qfrq: {
				time_format: "yyyy-MM-dd",
				name: "签发日期",
				data_type: "date"
			},
			HOTEL_zby: {
				time_format: "",
				name: "坐标Y",
				data_type: "string"
			},
			rMOTHER_mz: {
				time_format: "",
				name: "民族",
				data_type: "string"
			},
			eFLIGHTlg_cyhkgs: {
				time_format: "",
				name: "承运航空公司",
				data_type: "string"
			},
			ePASSPORTTRAIN_xm: {
				time_format: "",
				name: "姓名",
				data_type: "string"
			},
			eINTERNETCAFE_wbmc: {
				time_format: "",
				name: "网吧名称",
				data_type: "string"
			},
			eFLIGHTdp_zcw: {
				time_format: "",
				name: "子舱位",
				data_type: "string"
			},
			AP_MAC: {
				time_format: "",
				name: "MAC地址",
				data_type: "string"
			},
			rGUARDIA2_jhr2xm: {
				time_format: "",
				name: "	监护人二姓名",
				data_type: "string"
			},
			PERSON_zxbh: {
				time_format: "",
				name: "证芯编号",
				data_type: "string"
			},
			CASE_xzdxmc: {
				time_format: "",
				name: "选择对象名称",
				data_type: "string"
			},
			CASE_jjdw: {
				time_format: "",
				name: "接警单位",
				data_type: "string"
			},
			CASE_zsgj: {
				time_format: "",
				name: "致死工具",
				data_type: "string"
			},
			WIFI_zt: {
				time_format: "",
				name: "状态",
				data_type: "string"
			},
			VEHICLE_fdjzsrq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "发登记证书日期",
				data_type: "time"
			},
			BROWSER_yzbm: {
				time_format: "",
				name: "邮政编码",
				data_type: "string"
			},
			PERSON_hyzk: {
				time_format: "",
				name: "婚姻状况",
				data_type: "string"
			},
			eEMAIL_csr: {
				time_format: "",
				name: "抄送人",
				data_type: "string"
			},
			key_label_1: {
				time_format: "",
				name: "后缀主键1",
				data_type: "string"
			},
			key_label_2: {
				time_format: "",
				name: "后缀主键2",
				data_type: "string"
			},
			PERSON_zxbs: {
				time_format: "",
				name: "注销标识",
				data_type: "string"
			},
			eQQWX_nc: {
				time_format: "",
				name: "昵称",
				data_type: "string"
			},
			WARNING_zby_zbx: {
				time_format: "",
				name: "坐标Y+坐标X",
				data_type: "geo"
			},
			eVEHICLE_wfxwmc: {
				time_format: "",
				name: "违法行为名称",
				data_type: "string"
			},
			ATM_wzqy: {
				time_format: "",
				name: "位置区域",
				data_type: "string"
			},
			CASE_jarq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "结案日期",
				data_type: "time"
			},
			CASE_cdfsmc: {
				time_format: "",
				name: "藏毒方式名称",
				data_type: "string"
			},
			HOTEL_bzf: {
				time_format: "",
				name: "标准房",
				data_type: "string"
			},
			VEHICLE_jyyxqz: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "检验有效期止",
				data_type: "time"
			},
			EMAIL_xb: {
				time_format: "",
				name: "性别",
				data_type: "string"
			},
			CASE_xzcsmc: {
				time_format: "",
				name: "选择处所名称",
				data_type: "string"
			},
			CASE_jjdd: {
				time_format: "",
				name: "接警地点",
				data_type: "string"
			},
			PERSON_swrq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "死亡日期",
				data_type: "time"
			},
			CASE_jyaq: {
				time_format: "",
				name: "简要案情",
				data_type: "string"
			},
			WARNING_sznl: {
				time_format: "",
				name: "事主年龄",
				data_type: "string"
			},
			sxrdz: {
				time_format: "",
				name: "收信人地址",
				data_type: "string"
			},
			WARNING_bardw: {
				time_format: "",
				name: "报案人单位",
				data_type: "string"
			},
			CASE_lalx: {
				time_format: "",
				name: "立案类型",
				data_type: "string"
			},
			VEHICLE_jsshpzkrs: {
				time_format: "",
				name: "驾驶室后排载客人数",
				data_type: "string"
			},
			eSMS_lywj: {
				time_format: "",
				name: "来源文件",
				data_type: "string"
			},
			ePASSPORTFLIGHTlg_ddjc: {
				time_format: "",
				name: "到达机场",
				data_type: "string"
			},
			PASSPORT_xmpy: {
				time_format: "",
				name: "姓名拼音",
				data_type: "string"
			},
			to_key: {
				time_format: "",
				name: "接收人",
				data_type: "string"
			},
			BASESTATION_xqfglx: {
				time_format: "",
				name: "小区覆盖类型",
				data_type: "string"
			},
			EMAIL_xx: {
				time_format: "",
				name: "血型",
				data_type: "string"
			},
			eFLIGHTdp_cyhkgs: {
				time_format: "",
				name: "承运航空公司",
				data_type: "string"
			},
			rzsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "入住时间",
				data_type: "time"
			},
			ePHONE_dryh: {
				time_format: "",
				name: "导入用户",
				data_type: "string"
			},
			EMAIL_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			WARNING_ldyj: {
				time_format: "",
				name: "领导意见",
				data_type: "string"
			},
			WEIBO_sxsl: {
				time_format: "",
				name: "私信数量",
				data_type: "string"
			},
			hbh: {
				time_format: "",
				name: "航班号",
				data_type: "string"
			},
			rSPOUSE_xb: {
				time_format: "",
				name: "性别",
				data_type: "string"
			},
			ATM_jd: {
				time_format: "",
				name: "经度",
				data_type: "string"
			},
			EMAIL_yhnc: {
				time_format: "",
				name: "用户昵称",
				data_type: "string"
			},
			ccrq: {
				time_format: "yyyy-MM-dd",
				name: "乘车日期",
				data_type: "date"
			},
			WARNING_bargjmc: {
				time_format: "",
				name: "报案人国籍名称",
				data_type: "string"
			},
			PERSON_wfrybh: {
				time_format: "",
				name: "违法人员编号",
				data_type: "string"
			},
			eTRAFFICMONITOR_hpzl_mc: {
				time_format: "",
				name: "号牌种类名称",
				data_type: "string"
			},
			PHONEM_xh: {
				time_format: "",
				name: "型号",
				data_type: "string"
			},
			EMAIL_gjdm: {
				time_format: "",
				name: "国家代号",
				data_type: "string"
			},
			PHONEI_sbmc: {
				time_format: "",
				name: "设备名称",
				data_type: "string"
			},
			rCriminalVehicle_hpzl_mc: {
				time_format: "",
				name: "号牌种类名称",
				data_type: "string"
			},
			rWARNINGCASE_jjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "接警时间",
				data_type: "time"
			},
			VEHICLE_hxnbgd: {
				time_format: "",
				name: "货箱内部高度",
				data_type: "string"
			},
			CASE_zagjmc: {
				time_format: "",
				name: "作案工具名称",
				data_type: "string"
			},
			eTRAIN_zjid: {
				time_format: "",
				name: "主键ID",
				data_type: "string"
			},
			PERSON_lydpzl: {
				time_format: "",
				name: "滥用毒品种类",
				data_type: "string"
			},
			VEHICLE_qzbfqz: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "强制报废期止",
				data_type: "time"
			},
			CASE_shcd: {
				time_format: "",
				name: "受害程度",
				data_type: "string"
			},
			BASESTATION_ktqk: {
				time_format: "",
				name: "开通情况",
				data_type: "string"
			},
			WIFI_UPLOAD_TIME_INTERVAL: {
				time_format: "",
				name: "上传数据间隔时间",
				data_type: "string"
			},
			BASESTATION_wd: {
				time_format: "",
				name: "纬度",
				data_type: "string"
			},
			HOTEL_bdrksj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "本地入库时间",
				data_type: "time"
			},
			BASESTATION_fghjlx: {
				time_format: "",
				name: "覆盖环境类型",
				data_type: "string"
			},
			fwsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "访问时间",
				data_type: "time"
			},
			ePASSPORTINTERNETCAFE_wbmc: {
				time_format: "",
				name: "网吧名称",
				data_type: "string"
			},
			rHOUSEHOLD_yhzgx: {
				time_format: "",
				name: "与户主关系",
				data_type: "string"
			},
			rWEIBOfriend_hync: {
				time_format: "",
				name: "好友昵称",
				data_type: "string"
			},
			eTAKECASHATM_atmwd: {
				time_format: "",
				name: "ATM纬度",
				data_type: "string"
			},
			rWARNINGCASE_ajly: {
				time_format: "",
				name: "案件来源",
				data_type: "string"
			},
			eVEHICLE_hphm: {
				time_format: "",
				name: "号牌号码",
				data_type: "string"
			},
			eWIFI_NETBAR_WACODE: {
				time_format: "",
				name: "场所编号",
				data_type: "string"
			},
			BASESTATION_fgqyms: {
				time_format: "",
				name: "覆盖区域描述",
				data_type: "string"
			},
			PHONEM_imei: {
				time_format: "",
				name: "IMEI/ESN/MEID",
				data_type: "string"
			},
			QQWX_gxqm: {
				time_format: "",
				name: "个性签名",
				data_type: "string"
			},
			eTRAIN_cph: {
				time_format: "",
				name: "车票号",
				data_type: "string"
			},
			WARNING_szmz: {
				time_format: "",
				name: "事主民族",
				data_type: "string"
			},
			ePASSPORTFLIGHTdp_cyhkgs: {
				time_format: "",
				name: "承运航空公司",
				data_type: "string"
			},
			rEMAIL_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			eTRAFFICMONITOR_xsfx: {
				time_format: "",
				name: "行驶方向",
				data_type: "string"
			},
			ePHONE_bddz: {
				time_format: "",
				name: "本地动作",
				data_type: "string"
			},
			HOTEL_hylx: {
				time_format: "",
				name: "行业类型",
				data_type: "string"
			},
			rVEHICLE_blhpcs: {
				time_format: "",
				name: "补领号牌次数",
				data_type: "string"
			},
			rCriminalVehicle_wfxwbh: {
				time_format: "",
				name: "违法行为编号",
				data_type: "string"
			},
			time: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "通话开始时间",
				data_type: "time"
			},
			WIFI_wd: {
				time_format: "",
				name: "纬度",
				data_type: "string"
			},
			QQWXg_qgg: {
				time_format: "",
				name: "群公告",
				data_type: "string"
			},
			VEHICLE_zzcmc: {
				time_format: "",
				name: "制造厂名称",
				data_type: "string"
			},
			WARNING_jjdwmc: {
				time_format: "",
				name: "接警单位名称",
				data_type: "string"
			},
			zdmac: {
				time_format: "",
				name: "终端MAC地址",
				data_type: "string"
			},
			WARNING_jjfbh: {
				time_format: "",
				name: "接警副编号",
				data_type: "string"
			},
			HOTEL_drf: {
				time_format: "",
				name: "单人房",
				data_type: "string"
			},
			eTRAIN_spsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "售票时间",
				data_type: "time"
			},
			HOTEL_gxdwmc: {
				time_format: "",
				name: "管辖单位名称",
				data_type: "string"
			},
			rTAOBAO_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			ePHONE_thzt: {
				time_format: "",
				name: "通话状态",
				data_type: "string"
			},
			eFLIGHTdp_djjc: {
				time_format: "",
				name: "登机机场",
				data_type: "string"
			},
			eINTERNETCAFE_gxdwmc: {
				time_format: "",
				name: "管辖单位名称",
				data_type: "string"
			},
			eWIFI_AP_CHANNEL: {
				time_format: "",
				name: "热点频道",
				data_type: "string"
			},
			HOTEL_lddj: {
				time_format: "",
				name: "旅店等级",
				data_type: "string"
			},
			dfzh: {
				time_format: "",
				name: "对方账号",
				data_type: "string"
			},
			PHONEno_lywj: {
				time_format: "",
				name: "来源文件",
				data_type: "string"
			},
			QQWXg_qjj: {
				time_format: "",
				name: "群简介",
				data_type: "string"
			},
			ztrsfzh: {
				time_format: "",
				name: "主体人身份证号",
				data_type: "string"
			},
			rCriminalVehicle_sgdjmc: {
				time_format: "",
				name: "事故等级_名称",
				data_type: "string"
			},
			eFLIGHTlg_ysdhhm: {
				time_format: "",
				name: "电话号码原始",
				data_type: "string"
			},
			eQQWXPUBLISH_dzs: {
				time_format: "",
				name: "点赞数",
				data_type: "string"
			},
			TAOBAO_csny: {
				time_format: "yyyy-MM-dd",
				name: "出生年月",
				data_type: "date"
			},
			TAOBAO_cs: {
				time_format: "",
				name: "城市",
				data_type: "string"
			},
			eWEIBOPUBLISH_nr: {
				time_format: "",
				name: "内容",
				data_type: "string"
			},
			WARNING_ajlbmc: {
				time_format: "",
				name: "案件类别名称",
				data_type: "string"
			},
			ePASSPORTHOTEL_zjlxdm: {
				time_format: "",
				name: "证件类型代码",
				data_type: "string"
			},
			hpzl_hphm: {
				time_format: "",
				name: "号牌种类+号牌号码",
				data_type: "string"
			},
			HOTEL_zxbz: {
				time_format: "",
				name: "注销标志",
				data_type: "string"
			},
			ePASSPORTFLIGHTlg_lgsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "离港时间",
				data_type: "time"
			},
			ePASSPORTHOTEL_hylx: {
				time_format: "",
				name: "行业类型",
				data_type: "string"
			},
			PERSON_flglb: {
				time_format: "",
				name: "法轮功类别",
				data_type: "string"
			},
			PERSON_zzmm: {
				time_format: "",
				name: "政治面貌",
				data_type: "string"
			},
			WARNING_jjrxm: {
				time_format: "",
				name: "接警人姓名",
				data_type: "string"
			},
			rWEIBOfriend_hyzh: {
				time_format: "",
				name: "好友账号",
				data_type: "string"
			},
			WARNING_barcsrq: {
				time_format: "yyyy-MM-dd",
				name: "报案人出生日期",
				data_type: "date"
			},
			VEHICLE_hxnbcd: {
				time_format: "",
				name: "货箱内部长度",
				data_type: "string"
			},
			apmac: {
				time_format: "",
				name: "APMAC地址",
				data_type: "string"
			},
			VEHICLE_clsbdh: {
				time_format: "",
				name: "车辆识别代号",
				data_type: "string"
			},
			CASE_faxz: {
				time_format: "",
				name: "发案详址",
				data_type: "string"
			},
			eQQWXPUBLISH_zfs: {
				time_format: "",
				name: "转发数",
				data_type: "string"
			},
			BASESTATION_sf: {
				time_format: "",
				name: "省份",
				data_type: "string"
			},
			ePASSPORTFLIGHTlg_ysdhhm: {
				time_format: "",
				name: "电话号码原始",
				data_type: "string"
			},
			WIFI_COLLECTION_EQUIPMENT_TYPE: {
				time_format: "",
				name: "采集设备类型",
				data_type: "string"
			},
			CASE_jalx: {
				time_format: "",
				name: "结案类型",
				data_type: "string"
			},
			VEHICLE_zbzl: {
				time_format: "",
				name: "整备质量",
				data_type: "string"
			},
			eINTERNETCAFE_wbdz: {
				time_format: "",
				name: "网吧地址",
				data_type: "string"
			},
			PERSON_jggjdq: {
				time_format: "",
				name: "	籍贯国家(地区)",
				data_type: "string"
			},
			WEIBO_azrq: {
				time_format: "yyyy-MM-dd",
				name: "安装日期",
				data_type: "date"
			},
			eVEHICLE_cfzlmc: {
				time_format: "",
				name: "处罚种类名称",
				data_type: "string"
			},
			eQQWXg_bddz: {
				time_format: "",
				name: "本地动作",
				data_type: "string"
			},
			BASESTATION_jzdj: {
				time_format: "",
				name: "基站等级",
				data_type: "string"
			},
			wfbh: {
				time_format: "",
				name: "违法编号",
				data_type: "string"
			},
			eHOTEL_ldxz: {
				time_format: "",
				name: "旅店详址",
				data_type: "string"
			},
			VEHICLE_fhgzrq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "发合格证日期",
				data_type: "time"
			},
			PHONEno_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			tgkksj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "通过卡口时间",
				data_type: "time"
			},
			rule_ids: {
				time_format: "",
				name: "规则",
				data_type: "string"
			},
			WIFI_zdcq: {
				time_format: "",
				name: "最大场强",
				data_type: "string"
			},
			WARNING_afdzlxmc: {
				time_format: "",
				name: "案发地址类型名称",
				data_type: "string"
			},
			PERSON_fzjg: {
				time_format: "",
				name: "发证机关",
				data_type: "string"
			},
			ePHONE_yysbm_wzq_xq: {
				time_format: "",
				name: "运营商编码+位置区+小区",
				data_type: "string"
			},
			eWIFI_AP_SSID: {
				time_format: "",
				name: "热点SSID",
				data_type: "string"
			},
			QQWX_byyx: {
				time_format: "",
				name: "毕业院校",
				data_type: "string"
			},
			swsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "上网时间",
				data_type: "time"
			},
			ePASSPORTFLIGHTlg_zjlx: {
				time_format: "",
				name: "证件类型",
				data_type: "string"
			},
			eFLIGHTdp_zjlx: {
				time_format: "",
				name: "证件类型",
				data_type: "string"
			},
			PERSON_sfzyxrq: {
				time_format: "yyyy-MM-dd",
				name: "身份证有效期限",
				data_type: "date"
			},
			CASE_gzdw: {
				time_format: "",
				name: "工作单位",
				data_type: "string"
			},
			CASE_ladw: {
				time_format: "",
				name: "立案单位",
				data_type: "string"
			},
			rGUARDIA2_xb: {
				time_format: "",
				name: "性别",
				data_type: "string"
			},
			rMOTHER_xb: {
				time_format: "",
				name: "性别",
				data_type: "string"
			},
			eWEIBOsms_sxnr: {
				time_format: "",
				name: "私信内容",
				data_type: "string"
			},
			rVEHICLE_hphm: {
				time_format: "",
				name: "号牌号码",
				data_type: "string"
			},
			rCriminalVehicle_wfbh: {
				time_format: "",
				name: "违法编号",
				data_type: "string"
			},
			WARNING_clyj: {
				time_format: "",
				name: "处理意见",
				data_type: "string"
			},
			TAOBAO_rjlx: {
				time_format: "",
				name: "软件类型",
				data_type: "string"
			},
			eTRAFFICMONITOR_xscdbh: {
				time_format: "",
				name: "行驶车道编号",
				data_type: "string"
			},
			CASE_blxpsdmc: {
				time_format: "",
				name: "暴力胁迫手段名称",
				data_type: "string"
			},
			WARNING_sszj: {
				time_format: "",
				name: "损失总价",
				data_type: "string"
			},
			PERSON_cym: {
				time_format: "",
				name: "曾用名",
				data_type: "string"
			},
			eFLIGHTdp_ywm: {
				time_format: "",
				name: "英文名",
				data_type: "string"
			},
			rESCAPEE_ajlb: {
				time_format: "",
				name: "案件类别",
				data_type: "string"
			},
			eTRAFFICMONITOR_hpzl: {
				time_format: "",
				name: "号牌种类",
				data_type: "string"
			},
			WARNING_jqmc: {
				time_format: "",
				name: "警情名称",
				data_type: "string"
			},
			CASE_fzztmc: {
				time_format: "",
				name: "犯罪主体名称",
				data_type: "string"
			},
			eHOTEL_lkid: {
				time_format: "",
				name: "旅客ID",
				data_type: "string"
			},
			WARNING_qzjg: {
				time_format: "",
				name: "签章结果",
				data_type: "string"
			},
			hyzh: {
				time_format: "",
				name: "好友账号",
				data_type: "string"
			},
			rWARNINGCASE_lasj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "立案时间",
				data_type: "time"
			},
			eFLIGHTlg_xlzzl: {
				time_format: "",
				name: "行李总重量",
				data_type: "string"
			},
			rCriminalVehicle_cljgmc: {
				time_format: "",
				name: "处理机关名称",
				data_type: "string"
			},
			rCriminalVehicle_wfdz: {
				time_format: "",
				name: "违法地址",
				data_type: "string"
			},
			ePASSPORTINTERNETCAFE_xm: {
				time_format: "",
				name: "姓名",
				data_type: "string"
			},
			PERSON_ZDRYLBBJ: {
				time_format: "",
				name: "重点人员类别标记",
				data_type: "string"
			},
			fssj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "发送时间",
				data_type: "time"
			},
			jysj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "交易时间",
				data_type: "time"
			},
			rBANKno_blrzjlx: {
				time_format: "",
				name: "办理人证件类型",
				data_type: "string"
			},
			ATM_zzs: {
				time_format: "",
				name: "制造商",
				data_type: "string"
			},
			WARNING_szdw: {
				time_format: "",
				name: "事主单位",
				data_type: "string"
			},
			eINTERNETCAFE_jqmc: {
				time_format: "",
				name: "机器名称",
				data_type: "string"
			},
			WARNING_tbrxm: {
				time_format: "",
				name: "填表人姓名",
				data_type: "string"
			},
			HOTEL_srf: {
				time_format: "",
				name: "双人房",
				data_type: "string"
			},
			eQQWX_zzh: {
				time_format: "",
				name: "主账号",
				data_type: "string"
			},
			WARNING_barlxdh: {
				time_format: "",
				name: "报案人联系电话",
				data_type: "string"
			},
			eINTERNETCAFE_xm: {
				time_format: "",
				name: "姓名",
				data_type: "string"
			},
			rHOUSEHOLD_hlx: {
				time_format: "",
				name: "户类型",
				data_type: "string"
			},
			rPHONEPHONENO_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			ePASSPORTFLIGHTlg_jgsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "进港时间",
				data_type: "time"
			},
			PERSON_ztrybh: {
				time_format: "",
				name: "在逃人员编号",
				data_type: "string"
			},
			eACOUNTTRANSin_jyfs: {
				time_format: "",
				name: "交易方式",
				data_type: "string"
			},
			ePASSPORTHOTEL_qtscsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "前台生成时间",
				data_type: "time"
			},
			eTRAFFICMONITOR_hpys: {
				time_format: "",
				name: "号牌颜色",
				data_type: "string"
			},
			rQQWX_zhlx: {
				time_format: "",
				name: "账号类型",
				data_type: "string"
			},
			rHOUSEHOLD_hh: {
				time_format: "",
				name: "户号",
				data_type: "string"
			},
			frequencies: {
				time_format: "",
				name: "频次",
				data_type: "string"
			},
			rBROWSER_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			rCriminalVehicle_clfl: {
				time_format: "",
				name: "车辆分类",
				data_type: "string"
			},
			rCASEREPORT_barlxdh: {
				time_format: "",
				name: "报案人联系电话",
				data_type: "string"
			},
			rVEHICLE_fdjh: {
				time_format: "",
				name: "发动机号",
				data_type: "string"
			},
			WARNING_fxdd: {
				time_format: "",
				name: "发现地点",
				data_type: "string"
			},
			rWARNINGCASE_bafs: {
				time_format: "",
				name: "报案方式",
				data_type: "string"
			},
			ePASSPORTFLIGHTlg_djh: {
				time_format: "",
				name: "登机号",
				data_type: "string"
			},
			HOTEL_ldmc: {
				time_format: "",
				name: "旅店名称",
				data_type: "string"
			},
			ePASSPORTHOTEL_gxdwmc: {
				time_format: "",
				name: "管辖单位名称",
				data_type: "string"
			},
			ePASSPORTFLIGHTlg_djjc: {
				time_format: "",
				name: "登机机场",
				data_type: "string"
			},
			TAOBAO_zymc: {
				time_format: "",
				name: "职业名称",
				data_type: "string"
			},
			rVICTIM_shdd: {
				time_format: "",
				name: "受害地点",
				data_type: "string"
			},
			eTBITEMBROWSE_spid: {
				time_format: "",
				name: "商品ID",
				data_type: "string"
			},
			BASESTATION_yysbm: {
				time_format: "",
				name: "运营商编码",
				data_type: "string"
			},
			CASE_qrsdmc: {
				time_format: "",
				name: "侵入手段名称",
				data_type: "string"
			},
			CASE_bz: {
				time_format: "",
				name: "备注",
				data_type: "string"
			},
			WARNING_cjqk: {
				time_format: "",
				name: "处警情况",
				data_type: "string"
			},
			wbbzid: {
				time_format: "",
				name: "网吧标准ID",
				data_type: "string"
			},
			eWEIBOsms_bjzh: {
				time_format: "",
				name: "本机账号",
				data_type: "string"
			},
			rHOUSEHOLD_ssssxq: {
				time_format: "",
				name: "所属省市县区",
				data_type: "string"
			},
			rzlx_rzzh: {
				time_format: "",
				name: "认证类型+认证账号",
				data_type: "string"
			},
			PERSON_dzyx: {
				time_format: "",
				name: "电子邮箱",
				data_type: "string"
			},
			WEIBO_yhnc: {
				time_format: "",
				name: "用户昵称",
				data_type: "string"
			},
			ePASSPORTTRAIN_spckh: {
				time_format: "",
				name: "售票窗口号",
				data_type: "string"
			},
			rPHONEcontact_txlid: {
				time_format: "",
				name: "通讯录ID",
				data_type: "string"
			},
			WEIBO_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			ePASSPORTFLIGHTdp_zwm: {
				time_format: "",
				name: "中文名",
				data_type: "string"
			},
			ePASSPORTFLIGHTdp_pnrcjrq: {
				time_format: "yyyy-MM-dd",
				name: "PNR创建日期",
				data_type: "date"
			},
			eVEHICLE_jkfsmc: {
				time_format: "",
				name: "交款方式名称",
				data_type: "string"
			},
			eTAKECASHATM_atmmc: {
				time_format: "",
				name: "ATM机名称",
				data_type: "string"
			},
			ePASSPORTFLIGHTdp_bdrkmc: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "本地入库时间",
				data_type: "time"
			},
			rGUARDIA1_xb: {
				time_format: "",
				name: "性别",
				data_type: "string"
			},
			rVICTIM_shcd: {
				time_format: "",
				name: "受害程度",
				data_type: "string"
			},
			lddm: {
				time_format: "",
				name: "旅店代码",
				data_type: "string"
			},
			BANKno_khh: {
				time_format: "",
				name: "开户行",
				data_type: "string"
			},
			eVEHICLE_jdcsyr: {
				time_format: "",
				name: "机动车所有人",
				data_type: "string"
			},
			CASE_sfwdrza: {
				time_format: "",
				name: "是否外地人作案",
				data_type: "string"
			},
			VEHICLE_xsjg: {
				time_format: "",
				name: "销售价格",
				data_type: "string"
			},
			QQWX_yhnc: {
				time_format: "",
				name: "用户昵称",
				data_type: "string"
			},
			WARNING_ssrs: {
				time_format: "",
				name: "受伤人数",
				data_type: "string"
			},
			eFLIGHTlg_zwh: {
				time_format: "",
				name: "座位号",
				data_type: "string"
			},
			rESCAPEE_rbkcxsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "入部库撤销时间",
				data_type: "time"
			},
			IP_wzmc: {
				time_format: "",
				name: "IP位置名称",
				data_type: "string"
			},
			rQQWXfriend_hyzh: {
				time_format: "",
				name: "好友账号",
				data_type: "string"
			},
			CASE_saje: {
				time_format: "",
				name: "涉案金额",
				data_type: "string"
			},
			rWEIBO_zhlx: {
				time_format: "",
				name: "账号类型",
				data_type: "string"
			},
			VEHICLE_cllxmcS: {
				time_format: "",
				name: "车辆类型名称S",
				data_type: "string"
			},
			EMAIL_csny: {
				time_format: "yyyy-MM-dd",
				name: "出生年月",
				data_type: "date"
			},
			eTAKECASHATM_atmjd: {
				time_format: "",
				name: "ATM经度",
				data_type: "string"
			},
			eQQWXPUBLISH_fbzzh: {
				time_format: "",
				name: "发布者账号",
				data_type: "string"
			},
			INTERNETCAFE_yrksj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "源入库时间",
				data_type: "time"
			},
			PHONEI_tzms: {
				time_format: "",
				name: "特征描述",
				data_type: "string"
			},
			PERSON_dna: {
				time_format: "",
				name: "DNA",
				data_type: "string"
			},
			WARNING_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "处警时间",
				data_type: "time"
			},
			cc: {
				time_format: "",
				name: "车次",
				data_type: "string"
			},
			wbbm: {
				time_format: "",
				name: "网吧编码",
				data_type: "string"
			},
			ePASSPORTFLIGHTlg_cyhkgs: {
				time_format: "",
				name: "承运航空公司",
				data_type: "string"
			},
			rCriminalVehicle_zqmj: {
				time_format: "",
				name: "执勤民警",
				data_type: "string"
			},
			rWARNINGREPORT_barlxdh: {
				time_format: "",
				name: "报案人联系电话",
				data_type: "string"
			},
			HOTEL_fjs: {
				time_format: "",
				name: "房间数",
				data_type: "string"
			},
			ljsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "连接时间",
				data_type: "time"
			},
			WIFI_jd: {
				time_format: "",
				name: "经度",
				data_type: "string"
			},
			ePASSPORTHOTEL_xz: {
				time_format: "",
				name: "详址",
				data_type: "string"
			},
			rVICTIMWARNING_szzjlx: {
				time_format: "",
				name: "事主证件类型",
				data_type: "string"
			},
			QQWX_cs: {
				time_format: "",
				name: "城市",
				data_type: "string"
			},
			rWARNINGCASE_ajxz: {
				time_format: "",
				name: "案件性质",
				data_type: "string"
			},
			VEHICLE_jdcsyr: {
				time_format: "",
				name: "机动车所有人",
				data_type: "string"
			},
			eFLIGHTlg_zjlx: {
				time_format: "",
				name: "证件类型",
				data_type: "string"
			},
			PERSON_zxrq: {
				time_format: "yyyy-MM-dd",
				name: "注销日期",
				data_type: "date"
			},
			HOTEL_zt: {
				time_format: "",
				name: "状态",
				data_type: "string"
			},
			CASE_shrlb: {
				time_format: "",
				name: "受害人类别",
				data_type: "string"
			},
			eHOTEL_fjh: {
				time_format: "",
				name: "房间号",
				data_type: "string"
			},
			CASE_tlfsmc: {
				time_format: "",
				name: "逃离方式名称",
				data_type: "string"
			},
			eTRAFFICMONITOR_xssd: {
				time_format: "",
				name: "行驶速度",
				data_type: "string"
			},
			HOTEL_babdh: {
				time_format: "",
				name: "保安部电话",
				data_type: "string"
			},
			eFLIGHTlg_zwm: {
				time_format: "",
				name: "中文名",
				data_type: "string"
			},
			CASE_ay: {
				time_format: "",
				name: "案由",
				data_type: "string"
			},
			ePASSPORTTRAIN_fz: {
				time_format: "",
				name: "发站",
				data_type: "string"
			},
			CASE_ajlbmc: {
				time_format: "",
				name: "案件类别名称",
				data_type: "string"
			},
			PERSON_fzrq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "发证日期",
				data_type: "time"
			},
			eEMAIL_yjzt: {
				time_format: "",
				name: "邮件主题",
				data_type: "string"
			},
			eTRAFFICMONITOR_kkmc: {
				time_format: "",
				name: "卡口名称",
				data_type: "string"
			},
			WIFI_COLLECTION_EQUIPMENT_LATITUDE: {
				time_format: "",
				name: "采集设备纬度",
				data_type: "string"
			},
			eQQWXg_zhlx: {
				time_format: "",
				name: "账号类型",
				data_type: "string"
			},
			hbrq: {
				time_format: "yyyy-MM-dd",
				name: "航班日期",
				data_type: "date"
			},
			WARNING_jqjbmc: {
				time_format: "",
				name: "警情级别名称",
				data_type: "string"
			},
			CASE_ajztmc: {
				time_format: "",
				name: "案件状态名称",
				data_type: "string"
			},
			QQWX_gjdm: {
				time_format: "",
				name: "国家代号",
				data_type: "string"
			},
			eQQWXPUBLISH_zhlx: {
				time_format: "",
				name: "账号类型",
				data_type: "string"
			},
			PERSON_jgssxq: {
				time_format: "",
				name: "籍贯省市县(区)",
				data_type: "string"
			},
			rPHONE_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			QQWXg_zhlx: {
				time_format: "",
				name: "账号类型",
				data_type: "string"
			},
			WARNING_sfwt: {
				time_format: "",
				name: "是否委托",
				data_type: "string"
			},
			ePHONE_ajbq: {
				time_format: "",
				name: "案件标签",
				data_type: "string"
			},
			dfsjh: {
				time_format: "",
				name: "对方手机号",
				data_type: "string"
			},
			PERSON_tprq: {
				time_format: "yyyy-MM-dd",
				name: "逃跑日期",
				data_type: "date"
			},
			CASE_qqsdmc: {
				time_format: "",
				name: "窃取手段名称",
				data_type: "string"
			},
			rCASEREPORT_barxm: {
				time_format: "",
				name: "报案人姓名",
				data_type: "string"
			},
			CASE_gjlymc: {
				time_format: "",
				name: "工具来源名称",
				data_type: "string"
			},
			INTERNETCAFE_gxdwmc: {
				time_format: "",
				name: "管辖单位名称",
				data_type: "string"
			},
			BROWSER_xb: {
				time_format: "",
				name: "性别",
				data_type: "string"
			},
			eVEHICLE_jdcsyxzmc: {
				time_format: "",
				name: "机动车使用性质名称",
				data_type: "string"
			},
			rVICTIM_zsgj: {
				time_format: "",
				name: "致死工具",
				data_type: "string"
			},
			CASE_hdfwfx: {
				time_format: "",
				name: "活动范围分析",
				data_type: "string"
			},
			rCriminalVehicle_cfzlmc: {
				time_format: "",
				name: "处罚种类名称",
				data_type: "string"
			},
			rCriminalVehicle_hpzl: {
				time_format: "",
				name: "号牌种类",
				data_type: "string"
			},
			PERSON_wwxm: {
				time_format: "",
				name: "外文姓名",
				data_type: "string"
			},
			atmid: {
				time_format: "",
				name: "atm机编号",
				data_type: "string"
			},
			QQWX_grsm: {
				time_format: "",
				name: "个人说明",
				data_type: "string"
			},
			CASE_wzmjsdmc: {
				time_format: "",
				name: "伪装灭迹手段名称",
				data_type: "string"
			},
			HOTEL_frsfz: {
				time_format: "",
				name: "法人身份证",
				data_type: "string"
			},
			eFLIGHTlg_lgsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "离港时间",
				data_type: "time"
			},
			WIFI_COLLECTION_EQUIPMENT_ADRESS: {
				time_format: "",
				name: "设备地址",
				data_type: "string"
			},
			QQWXg_zdcys: {
				time_format: "",
				name: "最大成员数",
				data_type: "string"
			},
			ePHONE_hjlx: {
				time_format: "",
				name: "呼叫类型",
				data_type: "string"
			},
			CASE_falb: {
				time_format: "",
				name: "副案类别",
				data_type: "string"
			},
			QQWX_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			rVEHICLE_hdfs: {
				time_format: "",
				name: "获得方式",
				data_type: "string"
			},
			VEHICLE_lts: {
				time_format: "",
				name: "轮胎数",
				data_type: "string"
			},
			rHOUSEHOLD_qrlb: {
				time_format: "",
				name: "迁入类别",
				data_type: "string"
			},
			WARNING_barzjdm: {
				time_format: "",
				name: "报案人证件代码",
				data_type: "string"
			},
			VEHICLE_hlj: {
				time_format: "",
				name: "后轮距",
				data_type: "string"
			},
			eVEHICLE_hpzl: {
				time_format: "",
				name: "号牌种类",
				data_type: "string"
			},
			ePASSPORTINTERNETCAFE_zjlx_dm: {
				time_format: "",
				name: "证件类型代码",
				data_type: "string"
			},
			QQWX_xzqh: {
				time_format: "",
				name: "行政区划",
				data_type: "string"
			},
			rQQWXGROUP_qzzh: {
				time_format: "",
				name: "群组账号",
				data_type: "string"
			},
			VEHICLE_xsdw: {
				time_format: "",
				name: "销售单位",
				data_type: "string"
			},
			VEHICLE_syxzmc: {
				time_format: "",
				name: "机动车使用性质名称",
				data_type: "string"
			},
			CASE_fyfsmc: {
				time_format: "",
				name: "贩运方式名称",
				data_type: "string"
			},
			PERSON_hzh: {
				time_format: "",
				name: "护照号",
				data_type: "string"
			},
			PHONEI_ajbq: {
				time_format: "",
				name: "案件标签",
				data_type: "string"
			},
			rVICTIM_shjg: {
				time_format: "",
				name: "受害经过",
				data_type: "string"
			},
			eTRAIN_spczjc: {
				time_format: "",
				name: "售票车站简称",
				data_type: "string"
			},
			urldz: {
				time_format: "",
				name: "URL地址",
				data_type: "string"
			},
			CASE_afdyxfx: {
				time_format: "",
				name: "案犯地域性判断",
				data_type: "string"
			},
			PHONEI_lymac: {
				time_format: "",
				name: "蓝牙MAC地址",
				data_type: "string"
			},
			PERSON_jlcxsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "记录撤销时间",
				data_type: "time"
			},
			rESCAPEE_lasj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "立案时间",
				data_type: "time"
			},
			eACOUNTTRANSout_jyhye: {
				time_format: "",
				name: "交易后余额",
				data_type: "string"
			},
			sfzh: {
				time_format: "",
				name: "身份证号",
				data_type: "string"
			},
			ePASSPORTFLIGHTlg_ywm: {
				time_format: "",
				name: "英文名",
				data_type: "string"
			},
			time_list: {
				time_format: "",
				name: "时间列表",
				data_type: "string"
			},
			jhr1gmsfhm: {
				time_format: "",
				name: "监护人一公民身份号码",
				data_type: "string"
			},
			HOUSEHOLD_rybh: {
				time_format: "",
				name: "人员编号",
				data_type: "string"
			},
			eWIFI_COLLECTION_EQUIPMENT_ADRESS: {
				time_format: "",
				name: "设备地址",
				data_type: "string"
			},
			eWEIBOsms_bddz: {
				time_format: "",
				name: "本地动作",
				data_type: "string"
			},
			VEHICLE_qlj: {
				time_format: "",
				name: "前轮距",
				data_type: "string"
			},
			CASE_qtsdmc: {
				time_format: "",
				name: "其他手段名称",
				data_type: "string"
			},
			eWEIBOPUBLISH_wbhtxx: {
				time_format: "",
				name: "微博话题信息",
				data_type: "string"
			},
			zhlx_zh: {
				time_format: "",
				name: "账号类型+账号",
				data_type: "string"
			},
			eQQWXg_zzh: {
				time_format: "",
				name: "主账号",
				data_type: "string"
			},
			QQWXg_rs: {
				time_format: "",
				name: "人数",
				data_type: "string"
			},
			rVICTIMWARNING_szxm: {
				time_format: "",
				name: "事主姓名",
				data_type: "string"
			},
			PERSON_sfzqfrq: {
				time_format: "yyyy-MM-dd",
				name: "身份证签发日期",
				data_type: "date"
			},
			PERSON_wxdj: {
				time_format: "",
				name: "危险等级",
				data_type: "string"
			},
			BROWSER_mm: {
				time_format: "",
				name: "密码",
				data_type: "string"
			},
			sjmac: {
				time_format: "",
				name: "手机MAC",
				data_type: "string"
			},
			TAOBAO_azrq: {
				time_format: "yyyy-MM-dd",
				name: "安装日期",
				data_type: "date"
			},
			VEHICLE_fdjh: {
				time_format: "",
				name: "发动机号",
				data_type: "string"
			},
			PERSON_jsh: {
				time_format: "",
				name: "监室号",
				data_type: "string"
			},
			ip: {
				time_format: "",
				name: "IP",
				data_type: "string"
			},
			HOUSEHOLD_ssssxq: {
				time_format: "",
				name: "所属省市县区",
				data_type: "string"
			},
			WARNING_ajxlmc: {
				time_format: "",
				name: "案件细类名称",
				data_type: "string"
			},
			ePASSPORTHOTEL_tfsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "退房时间",
				data_type: "time"
			},
			HOUSEHOLD_xz: {
				time_format: "",
				name: "详址",
				data_type: "string"
			},
			PASSPORT_jg: {
				time_format: "",
				name: "籍贯",
				data_type: "string"
			},
			PERSON_nrbjzdryksj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "纳入部级重点人员库时间",
				data_type: "time"
			},
			VEHICLE_xsrq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "销售日期",
				data_type: "time"
			},
			CASE_zafsmc: {
				time_format: "",
				name: "作案方式名称",
				data_type: "string"
			},
			PASSPORT_mz: {
				time_format: "",
				name: "民族",
				data_type: "string"
			},
			rHOUSEHOLD_qcrq: {
				time_format: "yyyy-MM-dd",
				name: "迁出日期",
				data_type: "date"
			},
			VEHICLE_hdzzl: {
				time_format: "",
				name: "核定载质量",
				data_type: "string"
			},
			WEIBO_lzbm: {
				time_format: "",
				name: "邮政编码",
				data_type: "string"
			},
			CASE_sszrq: {
				time_format: "",
				name: "所属责任区",
				data_type: "string"
			},
			WARNING_barzjhm: {
				time_format: "",
				name: "报案人证件号码",
				data_type: "string"
			},
			VEHICLE_jssqpzkrs: {
				time_format: "",
				name: "驾驶室前排载客人数",
				data_type: "string"
			},
			CASE_shrbz: {
				time_format: "",
				name: "受害人标志",
				data_type: "string"
			},
			WARNING_swrs: {
				time_format: "",
				name: "死亡人数",
				data_type: "string"
			},
			ePHONE_fwh: {
				time_format: "",
				name: "蜂窝号",
				data_type: "string"
			},
			wfsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "违法时间",
				data_type: "time"
			},
			CASE_sytxgj: {
				time_format: "",
				name: "使用通讯工具",
				data_type: "string"
			},
			BASESTATION_jzjtdz: {
				time_format: "",
				name: "基站所处位置具体地址",
				data_type: "string"
			},
			HOTEL_tf: {
				time_format: "",
				name: "套房",
				data_type: "string"
			},
			CASE_czbs: {
				time_format: "",
				name: "操作标识",
				data_type: "string"
			},
			eACOUNLOGIN_zhm: {
				time_format: "",
				name: "账户名",
				data_type: "string"
			},
			mqgmsfhm: {
				time_format: "",
				name: "母亲公民身份号码",
				data_type: "string"
			},
			rWEIBOfriend_hyfzxx: {
				time_format: "",
				name: "好友分组信息",
				data_type: "string"
			},
			eFLIGHTlg_ddjc: {
				time_format: "",
				name: "到达机场",
				data_type: "string"
			},
			HOTEL_ssxmc: {
				time_format: "",
				name: "省市县名称",
				data_type: "string"
			},
			VEHICLE_hpzl: {
				time_format: "",
				name: "号牌种类",
				data_type: "string"
			},
			WEIBO_csny: {
				time_format: "yyyy-MM-dd",
				name: "出生年月",
				data_type: "date"
			},
			CASE_basj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "报案时间",
				data_type: "time"
			},
			BASESTATION_jzzwm: {
				time_format: "",
				name: "基站中文名(中文名称)",
				data_type: "string"
			},
			eTRAFFICMONITOR_zpsbid: {
				time_format: "",
				name: "照片设备ID",
				data_type: "string"
			},
			eWIFI_Y_COORDINATE: {
				time_format: "",
				name: "Y坐标",
				data_type: "string"
			},
			rSPOUSE_mz: {
				time_format: "",
				name: "民族",
				data_type: "string"
			},
			ePHONEWIFI_csmc: {
				time_format: "",
				name: "场所名称",
				data_type: "string"
			},
			rQQWXGROUP_qzmc: {
				time_format: "",
				name: "群组名称",
				data_type: "string"
			},
			ePASSPORTINTERNETCAFE_gxdwmc: {
				time_format: "",
				name: "管辖单位名称",
				data_type: "string"
			},
			WIFI_cjsbdw: {
				time_format: "",
				name: "采集设备单位",
				data_type: "string"
			},
			rGUARDIA1_mz: {
				time_format: "",
				name: "民族",
				data_type: "string"
			},
			eVEHICLE_wfdz: {
				time_format: "",
				name: "违法地址",
				data_type: "string"
			},
			eWEIBOPUBLISH_xxlx: {
				time_format: "",
				name: "消息类型",
				data_type: "string"
			},
			PERSON_ch: {
				time_format: "",
				name: "绰号",
				data_type: "string"
			},
			PERSON_lxdh: {
				time_format: "",
				name: "联系电话",
				data_type: "string"
			},
			BROWSER_nl: {
				time_format: "",
				name: "年龄",
				data_type: "string"
			},
			HOTEL_frhjd: {
				time_format: "",
				name: "法人户籍地",
				data_type: "string"
			},
			eACOUNLOGIN_tcsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "退出时间",
				data_type: "time"
			},
			eVEHICLE_fxjgmc: {
				time_format: "",
				name: "发现机关名称",
				data_type: "string"
			},
			CASE_barq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "报案日期",
				data_type: "time"
			},
			zhlx_qzzh: {
				time_format: "",
				name: "账号类型+群组账号",
				data_type: "string"
			},
			rHOUSEHOLD_qrrq: {
				time_format: "yyyy-MM-dd",
				name: "迁入日期",
				data_type: "date"
			},
			rBANKnoBANKno_jycs: {
				time_format: "",
				name: "交易次数",
				data_type: "string"
			},
			WARNING_ajlxmc: {
				time_format: "",
				name: "案件类型名称",
				data_type: "string"
			},
			PERSON_csrq: {
				time_format: "yyyy-MM-dd",
				name: "出生日期",
				data_type: "date"
			},
			QQWX_mm: {
				time_format: "",
				name: "密码",
				data_type: "string"
			},
			from_key: {
				time_format: "",
				name: "出发人",
				data_type: "string"
			},
			PERSON_zjlasj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "最近立案时间",
				data_type: "time"
			},
			PASSPORT_sfzh: {
				time_format: "",
				name: "身份证号",
				data_type: "string"
			},
			eTRAIN_xm: {
				time_format: "",
				name: "姓名",
				data_type: "string"
			},
			HOTEL_ssfjdm: {
				time_format: "",
				name: "所属分局代码",
				data_type: "string"
			},
			VEHICLE_zwpp: {
				time_format: "",
				name: "中文品牌",
				data_type: "string"
			},
			CASE_qrfsmc: {
				time_format: "",
				name: "侵入方式名称",
				data_type: "string"
			},
			rCASEREPORT_lasj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "立案时间",
				data_type: "time"
			},
			eURLBROWSE_llqlx: {
				time_format: "",
				name: "浏览器类型",
				data_type: "string"
			},
			PHONEM_lymac: {
				time_format: "",
				name: "蓝牙MAC地址",
				data_type: "string"
			},
			rHOUSEHOLD_qwgjdq: {
				time_format: "",
				name: "迁往国家(地区)",
				data_type: "string"
			},
			rVEHICLE_hpzl: {
				time_format: "",
				name: "号牌种类",
				data_type: "string"
			},
			rVICTIMWARNING_szlxdh: {
				time_format: "",
				name: "事主联系电话",
				data_type: "string"
			},
			QQWX_nl: {
				time_format: "",
				name: "年龄",
				data_type: "string"
			},
			CASE_fxsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "发现时间",
				data_type: "time"
			},
			WARNING_jjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "接警时间",
				data_type: "time"
			},
			WARNING_jsdw: {
				time_format: "",
				name: "接受单位",
				data_type: "string"
			},
			ePASSPORTTRAIN_dz: {
				time_format: "",
				name: "到站",
				data_type: "string"
			},
			VEHICLE_fxszrq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "发行驶证日期",
				data_type: "time"
			},
			rPASSPORT_qfrq: {
				time_format: "yyyy-MM-dd",
				name: "签发日期",
				data_type: "date"
			},
			qksj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "取款时间",
				data_type: "time"
			},
			PERSON_csdxz: {
				time_format: "",
				name: "出生地详址",
				data_type: "string"
			},
			CASE_zagcfx: {
				time_format: "",
				name: "作案过程分析",
				data_type: "string"
			},
			ePASSPORTTRAIN_cxh: {
				time_format: "",
				name: "车厢号",
				data_type: "string"
			},
			rVICTIMWARNING_basj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "报案时间",
				data_type: "time"
			},
			HOTEL_cyrs: {
				time_format: "",
				name: "从业人数",
				data_type: "string"
			},
			cfsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "出发时间",
				data_type: "time"
			},
			FLIGHT_cyhkgs: {
				time_format: "",
				name: "承运航空公司",
				data_type: "string"
			},
			rPASSPORT_zjlxdm: {
				time_format: "",
				name: "证件类型代码",
				data_type: "string"
			},
			WEIBO_zsm: {
				time_format: "",
				name: "真实名",
				data_type: "string"
			},
			EMAIL_rjmc: {
				time_format: "",
				name: "软件名称",
				data_type: "string"
			},
			eVEHICLE_zqmj: {
				time_format: "",
				name: "执勤民警",
				data_type: "string"
			},
			yysbm_wzq_xq: {
				time_format: "",
				name: "运营商编码+位置区+小区",
				data_type: "string"
			},
			WEIBO_zh: {
				time_format: "",
				name: "账号",
				data_type: "string"
			},
			CASE_tlyxrq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "停留有效日期",
				data_type: "time"
			},
			thkssj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "通话开始时间",
				data_type: "time"
			},
			eWEIBOsms_zhlx: {
				time_format: "",
				name: "账号类型",
				data_type: "string"
			},
			CASE_zzxsmc: {
				time_format: "",
				name: "组织形式名称",
				data_type: "string"
			},
			eHOTEL_ldmc: {
				time_format: "",
				name: "旅店名称",
				data_type: "string"
			},
			ePASSPORTINTERNETCAFE_zjlx: {
				time_format: "",
				name: "证件类型",
				data_type: "string"
			},
			ePASSPORTTRAIN_cc: {
				time_format: "",
				name: "车次",
				data_type: "string"
			},
			TAOBAO_yxdz: {
				time_format: "",
				name: "邮箱地址",
				data_type: "string"
			},
			INTERNETCAFE_wbxz: {
				time_format: "",
				name: "网吧详址",
				data_type: "string"
			},
			eTRAIN_cxh: {
				time_format: "",
				name: "车厢号",
				data_type: "string"
			},
			relation_name: {
				time_format: "",
				name: "关系名称",
				data_type: "string"
			},
			eIMMIGRATION_xm: {
				time_format: "",
				name: "姓名",
				data_type: "string"
			},
			PHONEno_dryh: {
				time_format: "",
				name: "导入用户",
				data_type: "string"
			},
			ePASSPORTFLIGHTlg_xdhhm: {
				time_format: "",
				name: "在原始电话号码中提取电话号码",
				data_type: "string"
			},
			rVEHICLE_fxszrq: {
				time_format: "yyyy-MM-dd",
				name: "发行驶证日期",
				data_type: "date"
			},
			eVEHICLE_wfjfs: {
				time_format: "",
				name: "违法记分数",
				data_type: "string"
			},
			rPHONEno_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			VEHICLE_ccdjrq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "初次登记日期",
				data_type: "time"
			},
			rSPOUSE_poxm: {
				time_format: "",
				name: "配偶姓名",
				data_type: "string"
			},
			BASESTATION_jzzh: {
				time_format: "",
				name: "基站站号(网元编码)",
				data_type: "string"
			},
			eEMAIL_yjnr: {
				time_format: "",
				name: "邮件内容",
				data_type: "string"
			},
			HOTEL_lxdh: {
				time_format: "",
				name: "联系电话",
				data_type: "string"
			},
			VEHICLE_zjcx: {
				time_format: "",
				name: "准驾车型",
				data_type: "string"
			},
			rWEIBO_zh: {
				time_format: "",
				name: "账号",
				data_type: "string"
			},
			PERSON_zjhm: {
				time_format: "",
				name: "证件号码",
				data_type: "string"
			},
			rHOUSEHOLD_qcdssxq: {
				time_format: "",
				name: "迁出地省市县(区)",
				data_type: "string"
			},
			VEHICLE_zqyzzl: {
				time_format: "",
				name: "准牵引总质量",
				data_type: "string"
			},
			PERSON_nl: {
				time_format: "",
				name: "年龄",
				data_type: "string"
			},
			PERSON_sjzdrybh: {
				time_format: "",
				name: "省级重点人员编号",
				data_type: "string"
			},
			rQQWXGROUP_qcync: {
				time_format: "",
				name: "群成员昵称",
				data_type: "string"
			},
			QQWX_lxdz: {
				time_format: "",
				name: "联系地址",
				data_type: "string"
			},
			eACOUNTTRANSin_jyhye: {
				time_format: "",
				name: "交易后余额",
				data_type: "string"
			},
			PERSON_mz: {
				time_format: "",
				name: "民族",
				data_type: "string"
			},
			crkadm: {
				time_format: "",
				name: "出入口岸代码",
				data_type: "string"
			},
			PERSON_zwbh: {
				time_format: "",
				name: "指纹编号",
				data_type: "string"
			},
			eIMMIGRATION_crkamc: {
				time_format: "",
				name: "出入口岸名称",
				data_type: "string"
			},
			WEIBO_xb: {
				time_format: "",
				name: "性别",
				data_type: "string"
			},
			CASE_xwtdmc: {
				time_format: "",
				name: "行为特点名称",
				data_type: "string"
			},
			HOTEL_cws: {
				time_format: "",
				name: "床位数",
				data_type: "string"
			},
			zhlx_fbzzh: {
				time_format: "",
				name: "账号类型+发布者账号",
				data_type: "string"
			},
			WEIBO_xx: {
				time_format: "",
				name: "血型",
				data_type: "string"
			},
			WARNING_gabh: {
				time_format: "",
				name: "公安编号",
				data_type: "string"
			},
			rMOTHER_ztxm: {
				time_format: "",
				name: "主体姓名",
				data_type: "string"
			},
			eQQWXPUBLISH_fbzid: {
				time_format: "",
				name: "发布者ID",
				data_type: "string"
			},
			HOTEL_bars: {
				time_format: "",
				name: "保安人数",
				data_type: "string"
			},
			PERSON_lx: {
				time_format: "",
				name: "脸型",
				data_type: "string"
			},
			yhzh: {
				time_format: "",
				name: "银行账户",
				data_type: "string"
			},
			eTAKECASHATM_qxed: {
				time_format: "",
				name: "取现额度",
				data_type: "string"
			},
			PERSON_jszzt: {
				time_format: "",
				name: "驾驶证状态",
				data_type: "string"
			},
			HOTEL_ldsyz: {
				time_format: "",
				name: "旅店所有制",
				data_type: "string"
			},
			PERSON_zcxh: {
				time_format: "",
				name: "足长/鞋号",
				data_type: "string"
			},
			eIMMIGRATION_crjsydm: {
				time_format: "",
				name: "出入境事由代码",
				data_type: "string"
			},
			rQQWXGROUP_zhlx: {
				time_format: "",
				name: "账号类型",
				data_type: "string"
			},
			eSMS_bddz: {
				time_format: "",
				name: "本地动作",
				data_type: "string"
			},
			is_strong_relation: {
				time_format: "",
				name: "是否强关系",
				data_type: "string"
			},
			eINTERNETCAFE_xwsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "下网时间",
				data_type: "time"
			},
			EMAIL_azrq: {
				time_format: "yyyy-MM-dd",
				name: "安装日期",
				data_type: "date"
			},
			sj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "时间",
				data_type: "time"
			},
			eVEHICLE_fkje: {
				time_format: "",
				name: "罚款金额",
				data_type: "string"
			},
			fqgmsfhm: {
				time_format: "",
				name: "父亲公民身份号码",
				data_type: "string"
			},
			ePASSPORTHOTEL_fjh: {
				time_format: "",
				name: "房间号",
				data_type: "string"
			},
			eACOUNLOGIN_dlipwd: {
				time_format: "",
				name: "登陆ip纬度",
				data_type: "string"
			},
			eQQWX_dfzh: {
				time_format: "",
				name: "对方账号",
				data_type: "string"
			},
			key: {
				time_format: "",
				name: "主键",
				data_type: "string"
			},
			eVEHICLE_sfzh: {
				time_format: "",
				name: "驾驶证号",
				data_type: "string"
			},
			QQWX_yzbm: {
				time_format: "",
				name: "邮政编码",
				data_type: "string"
			},
			PERSON_ky: {
				time_format: "",
				name: "口音",
				data_type: "string"
			},
			WARNING_jjlx: {
				time_format: "",
				name: "接警类型",
				data_type: "string"
			},
			CASE_zadj: {
				time_format: "",
				name: "作案动机",
				data_type: "string"
			},
			eVEHICLE_sgdjmc: {
				time_format: "",
				name: "事故等级名称",
				data_type: "string"
			},
			eFLIGHTdp_bdrkmc: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "本地入库时间",
				data_type: "time"
			},
			CASE_gjxsmc: {
				time_format: "",
				name: "勾结形式名称",
				data_type: "string"
			},
			rFATHER_ztxm: {
				time_format: "",
				name: "主体姓名",
				data_type: "string"
			},
			eQQWXg_ltjlid: {
				time_format: "",
				name: "聊天记录ID",
				data_type: "string"
			},
			PERSON_zjcx: {
				time_format: "",
				name: "准驾车型",
				data_type: "string"
			},
			eHOTEL_ssxmc: {
				time_format: "",
				name: "省市县名称",
				data_type: "string"
			},
			xb1: {
				time_format: "",
				name: "性别1",
				data_type: "string"
			},
			rAUTHENTICATIONm_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			ePHONE_xqh: {
				time_format: "",
				name: "小区号",
				data_type: "string"
			},
			rBANKno_khsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "开户时间",
				data_type: "time"
			},
			xb2: {
				time_format: "",
				name: "性别2",
				data_type: "string"
			},
			PASSPORT_pcs: {
				time_format: "",
				name: "派出所",
				data_type: "string"
			},
			hlx_hh: {
				time_format: "",
				name: "户类型+户号",
				data_type: "string"
			},
			VEHICLE_fdjxh: {
				time_format: "",
				name: "发动机型号",
				data_type: "string"
			},
			WARNING_xzqhmc: {
				time_format: "",
				name: "行政区划名称",
				data_type: "string"
			},
			eTBITEMBROWSE_spnrms: {
				time_format: "",
				name: "商品内容描述",
				data_type: "string"
			},
			HOTEL_ldxz: {
				time_format: "",
				name: "旅店详址",
				data_type: "string"
			},
			rVEHICLE_fzjg: {
				time_format: "",
				name: "发证机关",
				data_type: "string"
			},
			rVICTIM_zsyy: {
				time_format: "",
				name: "致死原因",
				data_type: "string"
			},
			CASE_fhsdmc: {
				time_format: "",
				name: "妨害手段名称",
				data_type: "string"
			},
			HOTEL_ztbgrq: {
				time_format: "yyyy-MM-dd",
				name: "状态变更日期",
				data_type: "date"
			},
			eVEHICLE_dsr: {
				time_format: "",
				name: "当事人",
				data_type: "string"
			},
			EMAIL_zymc: {
				time_format: "",
				name: "职业名称",
				data_type: "string"
			},
			HOTEL_ldzl: {
				time_format: "",
				name: "旅店种类",
				data_type: "string"
			},
			rCASEREPORT_barzjlx: {
				time_format: "",
				name: "报案人证件类型",
				data_type: "string"
			},
			WARNING_ajbh: {
				time_format: "",
				name: "案件编号",
				data_type: "string"
			},
			WARNING_lasj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "立案时间",
				data_type: "time"
			},
			HOTEL_fddbr: {
				time_format: "",
				name: "法定代表人",
				data_type: "string"
			},
			CASE_fabwmc: {
				time_format: "",
				name: "发案部位名称",
				data_type: "string"
			},
			VEHICLE_pl: {
				time_format: "",
				name: "排量",
				data_type: "string"
			},
			TAOBAO_gxqm: {
				time_format: "",
				name: "个性签名",
				data_type: "string"
			},
			CASE_afcsmc: {
				time_format: "",
				name: "案发场所名称",
				data_type: "string"
			},
			eWEIBOPUBLISH_dzs: {
				time_format: "",
				name: "点赞数",
				data_type: "string"
			},
			ePASSPORTHOTEL_lkid: {
				time_format: "",
				name: "旅客ID",
				data_type: "string"
			},
			PHONEI_dryh: {
				time_format: "",
				name: "导入用户",
				data_type: "string"
			},
			ePASSPORTTRAIN_cph: {
				time_format: "",
				name: "车票号",
				data_type: "string"
			},
			eWIFI_AP_FIELD_STRENGTH: {
				time_format: "",
				name: "热点场强",
				data_type: "string"
			},
			PHONEM_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			WIFI_SECURITY_SOFTWARE_ORGCODE: {
				time_format: "",
				name: "安全厂商组织机构代码",
				data_type: "string"
			},
			PERSON_xzdxz: {
				time_format: "",
				name: "现住地详址",
				data_type: "string"
			},
			rFATHER_mz: {
				time_format: "",
				name: "民族",
				data_type: "string"
			},
			eTBITEMBROWSE_xsl: {
				time_format: "",
				name: "销售量",
				data_type: "string"
			},
			TRAINNUMBER_cc: {
				time_format: "",
				name: "车次",
				data_type: "string"
			},
			WEIBO_fssl: {
				time_format: "",
				name: "粉丝数量",
				data_type: "string"
			},
			jhr2gmsfhm: {
				time_format: "",
				name: "监护人二公民身份号码",
				data_type: "string"
			},
			ePASSPORTTRAIN_spczh: {
				time_format: "",
				name: "售票车站号",
				data_type: "string"
			},
			ePASSPORTINTERNETCAFE_xwsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "下网时间",
				data_type: "time"
			},
			VEHICLE_zjdjrq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "最近定检日期",
				data_type: "time"
			},
			PHONEno_drsj: {
				time_format: "",
				name: "导入时间",
				data_type: "string"
			},
			WARNING_clbz: {
				time_format: "",
				name: "处理标志",
				data_type: "string"
			},
			CASE_ajlxmc: {
				time_format: "",
				name: "案件类型名称",
				data_type: "string"
			},
			eQQWXPUBLISH_fbznc: {
				time_format: "",
				name: "发布者昵称",
				data_type: "string"
			},
			barzjhm: {
				time_format: "",
				name: "报案人证件号码",
				data_type: "string"
			},
			rBANKno_blrxm: {
				time_format: "",
				name: "办理人姓名",
				data_type: "string"
			},
			HOTEL_ldxj: {
				time_format: "",
				name: "旅店星级",
				data_type: "string"
			},
			PERSON_jzqx: {
				time_format: "",
				name: "驾证期限",
				data_type: "string"
			},
			ePHONE_thd: {
				time_format: "",
				name: "通话地",
				data_type: "string"
			},
			xb: {
				time_format: "",
				name: "性别",
				data_type: "string"
			},
			QQWX_xb: {
				time_format: "",
				name: "性别",
				data_type: "string"
			},
			WIFI_lxr: {
				time_format: "",
				name: "联系人",
				data_type: "string"
			},
			rGUARDIA1_jhr1gx: {
				time_format: "",
				name: "监护人一关系",
				data_type: "string"
			},
			yjfssj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "邮件发送时间",
				data_type: "time"
			},
			eWEIBOPUBLISH_fbzzh: {
				time_format: "",
				name: "发布者账号",
				data_type: "string"
			},
			rVEHICLE_hpzl_mc: {
				time_format: "",
				name: "号牌种类名称",
				data_type: "string"
			},
			QQWX_xx: {
				time_format: "",
				name: "血型",
				data_type: "string"
			},
			eIMMIGRATION_qwddm: {
				time_format: "",
				name: "前往地代码",
				data_type: "string"
			},
			VEHICLE_zxxs: {
				time_format: "",
				name: "转向形式名称",
				data_type: "string"
			},
			qkzh: {
				time_format: "",
				name: "取款账户",
				data_type: "string"
			},
			PERSON_hjdz: {
				time_format: "",
				name: "户籍地址",
				data_type: "string"
			},
			QQWX_csny: {
				time_format: "yyyy-MM-dd",
				name: "出生年月",
				data_type: "date"
			},
			TAOBAO_zsm: {
				time_format: "",
				name: "真实名",
				data_type: "string"
			},
			PERSON_tbtsbj: {
				time_format: "",
				name: "体表特殊标记",
				data_type: "string"
			},
			PASSPORT_hkqh: {
				time_format: "",
				name: "户口区号",
				data_type: "string"
			},
			rPHONEcontact_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			eVEHICLE_jtfsmc: {
				time_format: "",
				name: "交通方式名称",
				data_type: "string"
			},
			ePASSPORTINTERNETCAFE_swlx: {
				time_format: "",
				name: "上网类型",
				data_type: "string"
			},
			type: {
				time_format: "",
				name: "类型",
				data_type: "string"
			},
			PASSPORT_zjyxqx: {
				time_format: "yyyy-MM-dd",
				name: "证件有效期限",
				data_type: "date"
			},
			CASE_barlxdh: {
				time_format: "",
				name: "报案人联系电话",
				data_type: "string"
			},
			BROWSER_xzqh: {
				time_format: "",
				name: "行政区划",
				data_type: "string"
			},
			CASE_bafs: {
				time_format: "",
				name: "报案方式",
				data_type: "string"
			},
			CASE_zarsxx: {
				time_format: "",
				name: "作案人数下限",
				data_type: "string"
			},
			rPHONEM_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			ePASSPORTHOTEL_ldxz: {
				time_format: "",
				name: "旅店详址",
				data_type: "string"
			},
			eQQWXPUBLISH_xxlx: {
				time_format: "",
				name: "消息类型",
				data_type: "string"
			},
			WIFI_dh: {
				time_format: "",
				name: "电话",
				data_type: "string"
			},
			rHOUSEHOLD_hlx_mc: {
				time_format: "",
				name: "户类型名称",
				data_type: "string"
			},
			eVEHICLE_dabh: {
				time_format: "",
				name: "档案编号",
				data_type: "string"
			},
			rQQWX_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			eIMMIGRATION_crjsy: {
				time_format: "",
				name: "出入境事由",
				data_type: "string"
			},
			QQWX_zh: {
				time_format: "",
				name: "账号",
				data_type: "string"
			},
			HOUSEHOLD_hh: {
				time_format: "",
				name: "户号",
				data_type: "string"
			},
			zh: {
				time_format: "",
				name: "账号",
				data_type: "string"
			},
			rESCAPEE_tjlbh: {
				time_format: "",
				name: "通缉令编号",
				data_type: "string"
			},
			PHONEM_csmc: {
				time_format: "",
				name: "厂商名称",
				data_type: "string"
			},
			eQQWX_jsxxnr: {
				time_format: "",
				name: "即时信息内容",
				data_type: "string"
			},
			VEHICLE_fprq: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "发牌日期",
				data_type: "time"
			},
			HOTEL_zazrr: {
				time_format: "",
				name: "治安责任人",
				data_type: "string"
			},
			WIFI_dq: {
				time_format: "",
				name: "地区",
				data_type: "string"
			},
			rVEHICLE_cllx: {
				time_format: "",
				name: "车辆类型",
				data_type: "string"
			},
			INTERNETCAFE_ztdm: {
				time_format: "",
				name: "上网场所服务状态代码",
				data_type: "string"
			},
			eHOTEL_hylx: {
				time_format: "",
				name: "行业类型",
				data_type: "string"
			},
			CASE_xztqmc: {
				time_format: "",
				name: "选择天气名称",
				data_type: "string"
			},
			eHOTEL_qtscsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "前台生成时间",
				data_type: "time"
			},
			PERSON_bjzdrybh: {
				time_format: "",
				name: "部级重点人员编号",
				data_type: "string"
			},
			eTBITEMBROWSE_wz: {
				time_format: "",
				name: "网址",
				data_type: "string"
			},
			rVICTIM_bmjb: {
				time_format: "",
				name: "保密级别",
				data_type: "string"
			},
			QQWXg_cjznc: {
				time_format: "",
				name: "创建者昵称",
				data_type: "string"
			},
			VEHICLE_ltgg: {
				time_format: "",
				name: "轮胎规格",
				data_type: "string"
			},
			ePHONE_dfgsd: {
				time_format: "",
				name: "对方归属地",
				data_type: "string"
			},
			geo: {
				time_format: "",
				name: "地理坐标",
				data_type: "geo"
			},
			rHOUSEHOLD_qczxlb: {
				time_format: "",
				name: "迁出注销类别",
				data_type: "string"
			},
			rPASSPORT_zjyxqx: {
				time_format: "yyyy-MM-dd",
				name: "证件有效期限",
				data_type: "date"
			},
			EMAIL_lxdz: {
				time_format: "",
				name: "联系地址",
				data_type: "string"
			},
			EMAIL_yzbm: {
				time_format: "",
				name: "邮政编码",
				data_type: "string"
			},
			INTERNETCAFE_wbmc: {
				time_format: "",
				name: "网吧名称",
				data_type: "string"
			},
			eSMS_drsj: {
				time_format: "",
				name: "导入时间",
				data_type: "string"
			},
			PERSON_tx: {
				time_format: "",
				name: "体型",
				data_type: "string"
			},
			eURLBROWSE_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			IP_xzqy: {
				time_format: "",
				name: "IP行政区域",
				data_type: "string"
			},
			PERSON_zsdpzl: {
				time_format: "",
				name: "注射毒品种类",
				data_type: "string"
			},
			CASE_fxdd: {
				time_format: "",
				name: "发现地点",
				data_type: "string"
			},
			rCriminalVehicle_hphm: {
				time_format: "",
				name: "号牌号码",
				data_type: "string"
			},
			WARNING_jjdd: {
				time_format: "",
				name: "接警地点",
				data_type: "string"
			},
			bjhm: {
				time_format: "",
				name: "本机号码",
				data_type: "string"
			},
			rHOUSEHOLD_qwdxz: {
				time_format: "",
				name: "迁往地详址",
				data_type: "string"
			},
			WARNING_jyaq: {
				time_format: "",
				name: "简要案情",
				data_type: "string"
			},
			eEMAIL_yjid: {
				time_format: "",
				name: "邮件ID",
				data_type: "string"
			},
			pogmsfhm: {
				time_format: "",
				name: "配偶公民身份号码",
				data_type: "string"
			},
			ePASSPORTFLIGHTlg_xlzzl: {
				time_format: "",
				name: "行李总重量",
				data_type: "string"
			},
			WARNING_slnf: {
				time_format: "",
				name: "受理年份",
				data_type: "string"
			},
			COLLECTION_EQUIPMENT_ID: {
				time_format: "",
				name: "采集设备编号",
				data_type: "string"
			},
			eHOTEL_zjlxdm: {
				time_format: "",
				name: "证件类型代码",
				data_type: "string"
			},
			sjdbh: {
				time_format: "",
				name: "事件单编号",
				data_type: "string"
			},
			eQQWX_ltjlid: {
				time_format: "",
				name: "聊天记录ID",
				data_type: "string"
			},
			IP_jd: {
				time_format: "",
				name: "IP位置经度",
				data_type: "string"
			},
			WEIBO_nl: {
				time_format: "",
				name: "年龄",
				data_type: "string"
			},
			PERSON_tssf: {
				time_format: "",
				name: "特殊身份",
				data_type: "string"
			},
			rVEHICLE_blxszcs: {
				time_format: "",
				name: "补领行驶证次数",
				data_type: "string"
			},
			eQQWXg_jsxxnr: {
				time_format: "",
				name: "即时信息内容",
				data_type: "string"
			},
			eINTERNETCAFE_zjlx: {
				time_format: "",
				name: "证件类型",
				data_type: "string"
			},
			EMAIL_yxdz: {
				time_format: "",
				name: "邮箱地址",
				data_type: "string"
			},
			dlip: {
				time_format: "",
				name: "登陆IP",
				data_type: "string"
			},
			gmsfzhm: {
				time_format: "",
				name: "公民身份证号码",
				data_type: "string"
			},
			HOUSEHOLD_hkxz: {
				time_format: "",
				name: "户口性质",
				data_type: "string"
			},
			eQQWXPUBLISH_pls: {
				time_format: "",
				name: "评论数",
				data_type: "string"
			},
			BANKno_zhye: {
				time_format: "",
				name: "账户余额",
				data_type: "string"
			},
			zhlx_qzid: {
				time_format: "",
				name: "账号类型+群组ID",
				data_type: "string"
			},
			CASE_xzrqmc: {
				time_format: "",
				name: "选择日期名称",
				data_type: "string"
			},
			eSMS_dryh: {
				time_format: "",
				name: "导入用户",
				data_type: "string"
			},
			BROWSER_cjsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "采集时间",
				data_type: "time"
			},
			PHONEI_drsj: {
				time_format: "",
				name: "导入时间",
				data_type: "string"
			},
			WEIBO_xzqh: {
				time_format: "",
				name: "行政区划",
				data_type: "string"
			},
			ePASSPORTHOTEL_ssxmc: {
				time_format: "",
				name: "省市县名称",
				data_type: "string"
			},
			PASSPORT_xb: {
				time_format: "",
				name: "性别",
				data_type: "string"
			},
			ePASSPORTTRAIN_zjid: {
				time_format: "",
				name: "主键ID",
				data_type: "string"
			},
			PERSON_sg: {
				time_format: "",
				name: "身高",
				data_type: "string"
			},
			VEHICLE_hphm: {
				time_format: "",
				name: "号牌号码",
				data_type: "string"
			},
			rQQWXGROUP_qcyzh: {
				time_format: "",
				name: "群成员账号",
				data_type: "string"
			},
			eWIFI_X_COORDINATE: {
				time_format: "",
				name: "X坐标",
				data_type: "string"
			},
			eACOUNTTRANSin_jye: {
				time_format: "",
				name: "交易额",
				data_type: "string"
			},
			WARNING_bjxq: {
				time_format: "",
				name: "报警详情",
				data_type: "string"
			},
			ePASSPORTHOTEL_xm: {
				time_format: "",
				name: "姓名",
				data_type: "string"
			},
			WEIBO_mm: {
				time_format: "",
				name: "密码",
				data_type: "string"
			},
			ePASSPORTFLIGHTdp_djjc: {
				time_format: "",
				name: "登机机场",
				data_type: "string"
			},
			INTERNETCAFE_jrfwyysdm: {
				time_format: "",
				name: "接入服务运营商代码",
				data_type: "string"
			},
			fxrdz: {
				time_format: "",
				name: "发信人地址",
				data_type: "string"
			},
			ePASSPORTINTERNETCAFE_swip: {
				time_format: "",
				name: "上网IP",
				data_type: "string"
			},
			ePHONE_lywj: {
				time_format: "",
				name: "来源文件",
				data_type: "string"
			},
			HOUSEHOLD_hlx_mc: {
				time_format: "",
				name: "户类型名称",
				data_type: "string"
			},
			eTBITEMBROWSE_sply: {
				time_format: "",
				name: "商品来源",
				data_type: "string"
			},
			PERSON_zjlx: {
				time_format: "",
				name: "证件类型",
				data_type: "string"
			},
			TAOBAO_byyx: {
				time_format: "",
				name: "毕业院校",
				data_type: "string"
			},
			WEIBO_grsm: {
				time_format: "",
				name: "个人说明",
				data_type: "string"
			},
			WARNING_bafsmc: {
				time_format: "",
				name: "报案方式名称",
				data_type: "string"
			},
			eTRAIN_spczh: {
				time_format: "",
				name: "售票车站号",
				data_type: "string"
			},
			BROWSER_yhnc: {
				time_format: "",
				name: "用户昵称",
				data_type: "string"
			},
			PERSON_gzdw: {
				time_format: "",
				name: "工作单位",
				data_type: "string"
			},
			PERSON_xcjszg: {
				time_format: "",
				name: "校车驾驶资格",
				data_type: "string"
			},
			WARNING_szcsrq: {
				time_format: "yyyy-MM-dd",
				name: "事主出生日期",
				data_type: "date"
			},
			eWEIBOPUBLISH_cjzh: {
				time_format: "",
				name: "采集账号",
				data_type: "string"
			},
			ePASSPORTTRAIN_zwh: {
				time_format: "",
				name: "座位号",
				data_type: "string"
			},
			rPASSPORT_zjlx: {
				time_format: "",
				name: "证件类型",
				data_type: "string"
			},
			rBANKnoBANKno_jysj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "交易时间",
				data_type: "time"
			},
			WARNING_fasjjs: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "发案时间结束",
				data_type: "time"
			},
			PERSON_sxzm: {
				time_format: "",
				name: "涉嫌罪名",
				data_type: "string"
			},
			rHOUSEHOLD_qcdxz: {
				time_format: "",
				name: "迁出地详址",
				data_type: "string"
			},
			INTERNETCAFE_wbip: {
				time_format: "",
				name: "出口IP地址",
				data_type: "string"
			},
			PERSON_xdcs: {
				time_format: "",
				name: "吸毒场所",
				data_type: "string"
			},
			rQQWXfriend_hync: {
				time_format: "",
				name: "好友昵称",
				data_type: "string"
			},
			eFLIGHTlg_djjc: {
				time_format: "",
				name: "登机机场",
				data_type: "string"
			},
			rCriminalVehicle_jkfsmc: {
				time_format: "",
				name: "交款方式名称",
				data_type: "string"
			},
			PASSPORT_csrq: {
				time_format: "yyyy-MM-dd",
				name: "出生日期",
				data_type: "date"
			},
			WARNING_fasjks: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "发案时间开始",
				data_type: "time"
			},
			gjc: {
				time_format: "",
				name: "关键词",
				data_type: "string"
			},
			BROWSER_gjdm: {
				time_format: "",
				name: "国家代号",
				data_type: "string"
			},
			eTRAFFICMONITOR_zpljc1: {
				time_format: "",
				name: "照片路径C1",
				data_type: "string"
			},
			eVEHICLE_fzjg: {
				time_format: "",
				name: "发证机关",
				data_type: "string"
			},
			WARNING_tbsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "填表时间",
				data_type: "time"
			},
			QQWXg_cjzid: {
				time_format: "",
				name: "创建者ID",
				data_type: "string"
			},
			VEHICLE_zs: {
				time_format: "",
				name: "轴数",
				data_type: "string"
			},
			WEIBO_gjdm: {
				time_format: "",
				name: "国家代号",
				data_type: "string"
			},
			eQQWXPUBLISH_nr: {
				time_format: "",
				name: "内容",
				data_type: "string"
			},
			rWARNINGREPORT_basj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "报案时间",
				data_type: "time"
			},
			BASESTATION_xqlx: {
				time_format: "",
				name: "小区类型",
				data_type: "string"
			},
			eTRAFFICMONITOR_zpljb1: {
				time_format: "",
				name: "照片路径B1",
				data_type: "string"
			},
			CASE_ybsdmc: {
				time_format: "",
				name: "预备手段名称",
				data_type: "string"
			},
			PASSPORT_xm: {
				time_format: "",
				name: "姓名",
				data_type: "string"
			},
			eFLIGHTlg_jgsj: {
				time_format: "yyyy-MM-dd HH:mm:ss",
				name: "进港时间",
				data_type: "time"
			},
			eVEHICLE_cljgmc: {
				time_format: "",
				name: "处理机关名称",
				data_type: "string"
			},
			WARNING_barzz: {
				time_format: "",
				name: "报案人住址",
				data_type: "string"
			},
			VEHICLE_zj: {
				time_format: "",
				name: "轴距",
				data_type: "string"
			},
			rGUARDIA1_ztxm: {
				time_format: "",
				name: "主体姓名",
				data_type: "string"
			}
		},
		empty: !1
	}
});