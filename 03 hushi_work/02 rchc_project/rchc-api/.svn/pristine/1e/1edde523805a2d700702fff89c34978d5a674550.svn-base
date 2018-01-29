package com.minginglamp.service;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.mortbay.log.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.minginglamp.common.PageHelper;
import com.minginglamp.common.PageInquire;
import com.minginglamp.vo.CheckPersonListVo;
import com.minginglamp.vo.CountpersonCheckLogDeptVo;
import com.minginglamp.vo.WarnSearchByCodeVo;

@Service
public class CountPersonCheckJCZService {

	@Autowired
	private PageInquire pageInquire;

	@Autowired
	private CountPersonCheckService countPersonCheckService;

	public List<CountpersonCheckLogDeptVo> countPersonCheck(String beginTime, String endTime, String source) {

		String sqlw1 = this.countPersonCheckService.getDSQuery(beginTime, endTime, "");
		String sqlw2 = this.countPersonCheckService.getSSQuery(beginTime, endTime, "");

		List<CountpersonCheckLogDeptVo> list = new ArrayList<CountpersonCheckLogDeptVo>();
		// 核查数量
		String checkCountSql = "";
		if(StringUtils.isNotBlank(source) && source.equals("jwt")){
			checkCountSql = "select jcz_name code,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ "	checkdept,sfzh,name,tags,create_time,personif,source from "
					+ " (select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
					+ "	case when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') "
					+ "	when qgztry is not null and qgxfd is null then '全国在逃人员' "
					+ "	when qgztry is null and qgxfd is not null then '全国吸毒贩毒人员' end tags,check_time create_time,ryhc_flag personif,check_source source"
					+ "	from jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + sqlw1
					+ " and police_phone  <> '' and (qgztry is not null  or qgxfd is not null )  and  concat(police_phone,idcard_no,SUBSTR(check_time,1,10)) not in"
					+ " (select concat(policephone,sfzh,SUBSTR(create_time,1,10)) from person_check_log where personif = '01' and 1=1 "
					+ sqlw2 + " and source = '"+source+"') and police_phone in (select police_phone from tb_m_jcz_jwt) union all"
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,personif,source from person_check_log"
					+ " where  source = '"+source+"' and policephone is not null " + sqlw2
					+ "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10) ) g group by jcz_name";
		}else{
			checkCountSql = "select jcz_name code,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ "	checkdept,sfzh,name,tags,create_time,personif,source from "
					+ " (select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
					+ "	case when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') "
					+ "	when qgztry is not null and qgxfd is null then '全国在逃人员' "
					+ "	when qgztry is null and qgxfd is not null then '全国吸毒贩毒人员' end tags,check_time create_time,ryhc_flag personif,check_source source"
					+ "	from jwt_check_person_log_1501 e where e.check_source='lte' " + sqlw1
					+ " and police_phone  <> '' and (qgztry is not null  or qgxfd is not null )  and  concat(police_phone,idcard_no,SUBSTR(check_time,1,10)) not in"
					+ " (select concat(policephone,sfzh,SUBSTR(create_time,1,10)) from person_check_log where personif = '01' and 1=1 "
					+ sqlw2 + " and source = '"+source+"') and police_phone in (select police_phone from tb_m_jcz_jwt) union all"
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,personif,source from person_check_log"
					+ " where  source = '"+source+"' and policephone is not null " + sqlw2
					+ "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10) ) g group by jcz_name";
		}
		
		Log.info("核查数量:{}", checkCountSql);
		ResultSet checkCountResult = pageInquire.findPage(checkCountSql);
		Map<String, Integer> checkCountMap = this.countPersonCheckService.getCountMap(checkCountResult);

		// 比中数量
		String comparCountSql = "";
		if(StringUtils.isNotBlank(source) && source.equals("jwt")){
			comparCountSql = "select jcz_name code,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ "	checkdept,sfzh,name,tags,create_time,personif,source from "
					+ " (select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
					+ "	case when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') "
					+ "	when qgztry is not null and qgxfd is null then '全国在逃人员' "
					+ "	when qgztry is null and qgxfd is not null then '全国吸毒贩毒人员' end tags,check_time create_time,ryhc_flag personif,check_source source"
					+ "	from jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + sqlw1
					+ " AND ryhc_tag <> '' AND ryhc_tag IS NOT NULL "
					+ " and police_phone  <> '' and (qgztry is not null  or qgxfd is not null ) and  concat(police_phone,idcard_no,SUBSTR(check_time,1,10)) not in"
					+ " (select concat(policephone,sfzh,SUBSTR(create_time,1,10)) from person_check_log where personif = '01'"
					+ " and 1=1 " + sqlw2
					+ " AND tags <> '' AND tags IS NOT NULL  and source = '"+source+"') and police_phone in (select police_phone from tb_m_jcz_jwt)"
					+ "  union all"
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,personif,source from person_check_log"
					+ " where  source = '"+source+"' and policephone is not null  AND tags <> ''  AND tags <> '无背景'  AND tags IS NOT NULL "
					+ sqlw2 + "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10) ) g group by jcz_name";
		}else{
			comparCountSql = "select jcz_name code,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ "	checkdept,sfzh,name,tags,create_time,personif,source from "
					+ " (select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
					+ "	case when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') "
					+ "	when qgztry is not null and qgxfd is null then '全国在逃人员' "
					+ "	when qgztry is null and qgxfd is not null then '全国吸毒贩毒人员' end tags,check_time create_time,ryhc_flag personif,check_source source"
					+ "	from jwt_check_person_log_1501 e where e.check_source='lte' " + sqlw1
					+ " AND ryhc_tag <> '' AND ryhc_tag IS NOT NULL "
					+ " and police_phone  <> '' and (qgztry is not null  or qgxfd is not null ) and  concat(police_phone,idcard_no,SUBSTR(check_time,1,10)) not in"
					+ " (select concat(policephone,sfzh,SUBSTR(create_time,1,10)) from person_check_log where personif = '01'"
					+ " and 1=1 " + sqlw2
					+ " AND tags <> '' AND tags IS NOT NULL  and source = '"+source+"') and police_phone in (select police_phone from tb_m_jcz_jwt)"
					+ "  union all"
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,personif,source from person_check_log"
					+ " where  source = '"+source+"' and policephone is not null  AND tags <> ''  AND tags <> '无背景'  AND tags IS NOT NULL "
					+ sqlw2 + "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10) ) g group by jcz_name";
		}
		Log.info("比中数量:{}", comparCountSql);
		ResultSet comparCountResult = pageInquire.findPage(comparCountSql);
		Map<String, Integer> comparCountMap = this.countPersonCheckService.getCountMap(comparCountResult);

		// 预警数量
		String warnCountSql = "";
		if(StringUtils.isNotBlank(source) && source.equals("jwt")){
			warnCountSql = "select jcz_name code,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ "	checkdept,sfzh,name,tags,create_time,personif,source from"
					+ "	(select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
					+ "	case when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') "
					+ "	when qgztry is not null and qgxfd is null then '全国在逃人员'"
					+ "	when qgztry is null and qgxfd is not null then '全国吸毒贩毒人员' end tags,check_time create_time,ryhc_flag personif,check_source source"
					+ "	from jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + sqlw1
					+ " and police_phone  <> '' and (qgztry is not null  or qgxfd is not null )  and  concat(police_phone,idcard_no,SUBSTR(check_time,1,10)) not in"
					+ " (select concat(policephone,sfzh,SUBSTR(create_time,1,10)) from person_check_log where personif = '01'"
					+ sqlw2 + " and source = '"+source+"')" + " and police_phone in (select police_phone from tb_m_jcz_jwt)"
					+ "	and police_phone in (select police_phone from tb_m_jcz_jwt)	union all"
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,"
					+ "	create_time,personif,source from person_check_log where  source = '"+source+"' and personif = '01' and policephone is not null "
					+ sqlw2 + "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10)) g group by jcz_name";
			
		}else{
			warnCountSql = "select jcz_name code,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ "	checkdept,sfzh,name,tags,create_time,personif,source from"
					+ "	(select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
					+ "	case when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') "
					+ "	when qgztry is not null and qgxfd is null then '全国在逃人员'"
					+ "	when qgztry is null and qgxfd is not null then '全国吸毒贩毒人员' end tags,check_time create_time,ryhc_flag personif,check_source source"
					+ "	from jwt_check_person_log_1501 e where e.check_source='lte' " + sqlw1
					+ " and police_phone  <> '' and (qgztry is not null  or qgxfd is not null )  and  concat(police_phone,idcard_no,SUBSTR(check_time,1,10)) not in"
					+ " (select concat(policephone,sfzh,SUBSTR(create_time,1,10)) from person_check_log where personif = '01'"
					+ sqlw2 + " and source = '"+source+"')" + " and police_phone in (select police_phone from tb_m_jcz_jwt)"
					+ "	and police_phone in (select police_phone from tb_m_jcz_jwt)	union all"
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,"
					+ "	create_time,personif,source from person_check_log where  source = '"+source+"' and personif = '01' and policephone is not null "
					+ sqlw2 + "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10)) g group by jcz_name";
			
		}
		Log.info("预警数量:{}", warnCountSql);
		ResultSet warnCountResult = pageInquire.findPage(warnCountSql);
		Map<String, Integer> warnCountMap = this.countPersonCheckService.getCountMap(warnCountResult);
		Log.debug(checkCountSql);

		// 设备数量

		// - 车辆预警分类统计
		String categoryCountSql = "";
		if(StringUtils.isNotBlank(source) && source.equals("jwt")){
			categoryCountSql = "select AA.检查站 code,AA.检查站 name,IFNULL(AA.在逃人数,0) zt_count,IFNULL(BB.涉毒人数,0) sd_count,IFNULL(CC.涉访人数,0) sf_count,IFNULL(DD.涉疆人数,0) sj_count,"
					+ "	IFNULL(EE.涉恐人数,0) sk_count,IFNULL(FF.涉稳人数,0) sw_count from"
					// -- 人员核查预警数分类（在逃）统计
					+ "	(select DISTINCT p.jcz_name 检查站,j.count 在逃人数 from tb_m_jcz_jwt p  LEFT JOIN"
					+ "	(select jcz_name,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ "	checkdept,sfzh,name,tags,create_time,personif,source from"
					+ "	(select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
					+ "	case when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') "
					+ "	when qgztry is not null and qgxfd is null then '全国在逃人员' "
					+ "	when qgztry is null and qgxfd is not null then '全国吸毒贩毒人员' end tags,check_time create_time,ryhc_flag personif,check_source source"
					+ "	from jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + sqlw1
					+ " and police_phone  <> '' and (qgztry is not null )  and  concat(police_phone,idcard_no,SUBSTR(check_time,1,10)) not in"
					+ " (select concat(policephone,sfzh,SUBSTR(create_time,1,10)) from person_check_log where personif = '01' "
					+ sqlw2 + " and source = '"+source+"') and police_phone in (select police_phone from tb_m_jcz_jwt) union all"
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,personif,source "
					+ " from person_check_log where  source = '"+source+"' and personif = '01' and tags like '%逃%' and policephone is not null  "
					+ sqlw2 + "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10)" + "	) g group by jcz_name"
					+ "	) j on p.jcz_name = j.jcz_name order by p.jcz_name" + "	) AA,"
					// -- 人员核查预警数分类（涉毒）统计
					+ "	(select DISTINCT p.jcz_name name,j.count 涉毒人数 from tb_m_jcz_jwt p  LEFT JOIN"
					+ "	(select jcz_name,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ "	checkdept,sfzh,name,tags,create_time,personif,source from"
					+ "	(select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
					+ "	case when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') "
					+ "	when qgztry is not null and qgxfd is null then '全国在逃人员' "
					+ "	when qgztry is null and qgxfd is not null then '全国吸毒贩毒人员' end tags,check_time create_time,ryhc_flag personif,check_source source"
					+ "	from jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + sqlw1
					+ " and police_phone  <> '' and (qgxfd is not null )  and  concat(police_phone,idcard_no,SUBSTR(check_time,1,10)) not in"
					+ " (select concat(policephone,sfzh,SUBSTR(create_time,1,10)) from person_check_log where personif = '01' "
					+ sqlw2 + " and source = '"+source+"') and police_phone in (select police_phone from tb_m_jcz_jwt)"
					+ " and police_phone in (select police_phone from tb_m_jcz_jwt)" + "	 union all"
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,personif,source "
					+ " from person_check_log where  source = '"+source+"' and personif = '01' and tags like '%毒%' and policephone is not null "
					+ sqlw2 + "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10)" + "	) g group by jcz_name"
					+ "	) j on p.jcz_name = j.jcz_name order by p.jcz_name" + "	) BB,"
					// -- 人员核查预警数分类（涉访）统计
					+ "	(select DISTINCT p.jcz_name name,j.count 涉访人数 from tb_m_jcz_jwt p  LEFT JOIN"
					+ "	(select jcz_name,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ " checkdept,sfzh,name,tags,create_time,personif,source from ("
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,personif,source "
					+ " from person_check_log where  personif = '01' and tags  like '%访%' and source = '"+source+"' and policephone is not null "
					+ sqlw2 + "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10)" + "	) g group by jcz_name"
					+ "	) j on p.jcz_name = j.jcz_name order by p.jcz_name" + "	) CC,"
					// -- 人员核查预警数分类（涉疆）统计
					+ "	(select DISTINCT p.jcz_name name,j.count 涉疆人数 from tb_m_jcz_jwt p  LEFT JOIN"
					+ "	(select jcz_name,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ "	checkdept,sfzh,name,tags,create_time,personif,source from ("
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,personif,source "
					+ " from person_check_log where  personif = '01' and tags  like '%疆%' and source = '"+source+"' and policephone is not null"
					+ sqlw2 + "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10)" + "	) g group by jcz_name"
					+ "	) j on p.jcz_name = j.jcz_name order by p.jcz_name" + "	) DD,"
					// -- 人员核查预警数分类（涉恐）统计
					+ "	(select DISTINCT p.jcz_name name,j.count 涉恐人数 from tb_m_jcz_jwt p  LEFT JOIN"
					+ "	(select jcz_name,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ "	checkdept,sfzh,name,tags,create_time,personif,source from ("
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,personif,source"
					+ " from person_check_log where  personif = '01' and tags  like '%恐%' and source = '"+source+"' and policephone is not null"
					+ sqlw2 + "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10)" + "	) g group by jcz_name"
					+ "	) j on p.jcz_name = j.jcz_name order by p.jcz_name" + "	) EE,"
					// -- 人员核查预警数分类（涉稳）统计
					+ "	(select DISTINCT p.jcz_name name,j.count 涉稳人数 from tb_m_jcz_jwt p  LEFT JOIN"
					+ "	(select jcz_name,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ "	checkdept,sfzh,name,tags,create_time,personif,source from ("
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,personif,source"
					+ " from person_check_log where  personif = '01' and tags  like '%稳%' and source = '"+source+"' and policephone is not null"
					+ sqlw2 + "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10)" + "	) g group by jcz_name"
					+ "	) j on p.jcz_name = j.jcz_name order by p.jcz_name" + "	) FF"
					+ "	where AA.检查站 = BB.name and BB.name = CC.name and CC.name = DD.name and DD.name = EE.name and EE.name = FF.name";

			
		}else{
			categoryCountSql = "select AA.检查站 code,AA.检查站 name,IFNULL(AA.在逃人数,0) zt_count,IFNULL(BB.涉毒人数,0) sd_count,IFNULL(CC.涉访人数,0) sf_count,IFNULL(DD.涉疆人数,0) sj_count,"
					+ "	IFNULL(EE.涉恐人数,0) sk_count,IFNULL(FF.涉稳人数,0) sw_count from"
					// -- 人员核查预警数分类（在逃）统计
					+ "	(select DISTINCT p.jcz_name 检查站,j.count 在逃人数 from tb_m_jcz_jwt p  LEFT JOIN"
					+ "	(select jcz_name,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ "	checkdept,sfzh,name,tags,create_time,personif,source from"
					+ "	(select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
					+ "	case when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') "
					+ "	when qgztry is not null and qgxfd is null then '全国在逃人员' "
					+ "	when qgztry is null and qgxfd is not null then '全国吸毒贩毒人员' end tags,check_time create_time,ryhc_flag personif,check_source source"
					+ "	from jwt_check_person_log_1501 e where e.check_source='lte' " + sqlw1
					+ " and police_phone  <> '' and (qgztry is not null )  and  concat(police_phone,idcard_no,SUBSTR(check_time,1,10)) not in"
					+ " (select concat(policephone,sfzh,SUBSTR(create_time,1,10)) from person_check_log where personif = '01' "
					+ sqlw2 + " and source = '"+source+"') and police_phone in (select police_phone from tb_m_jcz_jwt) union all"
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,personif,source "
					+ " from person_check_log where  source = '"+source+"' and personif = '01' and tags like '%逃%' and policephone is not null  "
					+ sqlw2 + "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10)" + "	) g group by jcz_name"
					+ "	) j on p.jcz_name = j.jcz_name order by p.jcz_name" + "	) AA,"
					// -- 人员核查预警数分类（涉毒）统计
					+ "	(select DISTINCT p.jcz_name name,j.count 涉毒人数 from tb_m_jcz_jwt p  LEFT JOIN"
					+ "	(select jcz_name,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ "	checkdept,sfzh,name,tags,create_time,personif,source from"
					+ "	(select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
					+ "	case when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') "
					+ "	when qgztry is not null and qgxfd is null then '全国在逃人员' "
					+ "	when qgztry is null and qgxfd is not null then '全国吸毒贩毒人员' end tags,check_time create_time,ryhc_flag personif,check_source source"
					+ "	from jwt_check_person_log_1501 e where e.check_source='lte' " + sqlw1
					+ " and police_phone  <> '' and (qgxfd is not null )  and  concat(police_phone,idcard_no,SUBSTR(check_time,1,10)) not in"
					+ " (select concat(policephone,sfzh,SUBSTR(create_time,1,10)) from person_check_log where personif = '01' "
					+ sqlw2 + " and source = '"+source+"') and police_phone in (select police_phone from tb_m_jcz_jwt)"
					+ " and police_phone in (select police_phone from tb_m_jcz_jwt)" + "	 union all"
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,personif,source "
					+ " from person_check_log where  source = '"+source+"' and personif = '01' and tags like '%毒%' and policephone is not null "
					+ sqlw2 + "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10)" + "	) g group by jcz_name"
					+ "	) j on p.jcz_name = j.jcz_name order by p.jcz_name" + "	) BB,"
					// -- 人员核查预警数分类（涉访）统计
					+ "	(select DISTINCT p.jcz_name name,j.count 涉访人数 from tb_m_jcz_jwt p  LEFT JOIN"
					+ "	(select jcz_name,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ " checkdept,sfzh,name,tags,create_time,personif,source from ("
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,personif,source "
					+ " from person_check_log where  personif = '01' and tags  like '%访%' and source = '"+source+"' and policephone is not null "
					+ sqlw2 + "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10)" + "	) g group by jcz_name"
					+ "	) j on p.jcz_name = j.jcz_name order by p.jcz_name" + "	) CC,"
					// -- 人员核查预警数分类（涉疆）统计
					+ "	(select DISTINCT p.jcz_name name,j.count 涉疆人数 from tb_m_jcz_jwt p  LEFT JOIN"
					+ "	(select jcz_name,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ "	checkdept,sfzh,name,tags,create_time,personif,source from ("
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,personif,source "
					+ " from person_check_log where  personif = '01' and tags  like '%疆%' and source = '"+source+"' and policephone is not null"
					+ sqlw2 + "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10)" + "	) g group by jcz_name"
					+ "	) j on p.jcz_name = j.jcz_name order by p.jcz_name" + "	) DD,"
					// -- 人员核查预警数分类（涉恐）统计
					+ "	(select DISTINCT p.jcz_name name,j.count 涉恐人数 from tb_m_jcz_jwt p  LEFT JOIN"
					+ "	(select jcz_name,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ "	checkdept,sfzh,name,tags,create_time,personif,source from ("
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,personif,source"
					+ " from person_check_log where  personif = '01' and tags  like '%恐%' and source = '"+source+"' and policephone is not null"
					+ sqlw2 + "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10)" + "	) g group by jcz_name"
					+ "	) j on p.jcz_name = j.jcz_name order by p.jcz_name" + "	) EE,"
					// -- 人员核查预警数分类（涉稳）统计
					+ "	(select DISTINCT p.jcz_name name,j.count 涉稳人数 from tb_m_jcz_jwt p  LEFT JOIN"
					+ "	(select jcz_name,count(1) count from "
					+ "	(select policeno,police_name,policephone,(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
					+ "	checkdept,sfzh,name,tags,create_time,personif,source from ("
					+ "	select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,personif,source"
					+ " from person_check_log where  personif = '01' and tags  like '%稳%' and source = '"+source+"' and policephone is not null"
					+ sqlw2 + "	and policephone in (select police_phone from tb_m_jcz_jwt)"
					+ "	) t group by policephone,sfzh,SUBSTR(create_time,1,10)" + "	) g group by jcz_name"
					+ "	) j on p.jcz_name = j.jcz_name order by p.jcz_name" + "	) FF"
					+ "	where AA.检查站 = BB.name and BB.name = CC.name and CC.name = DD.name and DD.name = EE.name and EE.name = FF.name";

			
		}
		Log.info("警数分类:{}", categoryCountSql);
		ResultSet rs = pageInquire.findPage(categoryCountSql);
		list = this.countPersonCheckService.getList(rs, checkCountMap, comparCountMap, warnCountMap,
				new HashMap<String, Integer>());
		return list;
	}

	public PageHelper listDetailsByCode(WarnSearchByCodeVo warnSearchByCodeVo) {
		PageHelper pageHelper = new PageHelper();

		String sqlw1 = this.getDSListQuery(warnSearchByCodeVo);
		String sqlw2 = this.getSSListQuery(warnSearchByCodeVo);

		String countSql = "";
		String source = "";
		if(warnSearchByCodeVo.getSource().equals("jcz")){
			source = "jwt";
		}else{
			source = "lte";
		}
		if(StringUtils.isNotBlank(source) && source.equals("jwt")){
			if (warnSearchByCodeVo.getType().equals("swCount") || warnSearchByCodeVo.getType().equals("sfCount")
					|| warnSearchByCodeVo.getType().equals("skCount") || warnSearchByCodeVo.getType().equals("sjCount")) {
				countSql = "select count(1) count from(	select police_name,pcode,policephone from ("
						+ "	select sfzh,police_name,policeno pcode,policephone,create_time from person_check_log where 1=1 "
						+ sqlw2 + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10) ) t";
			} else {
				countSql = "select count(1) count from(	select police_name,pcode,policephone from" + "	(select "
						+ "	idcard_no sfzh,police_name,pcode,police_phone policephone,check_time create_time"
						+ "	from jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + sqlw1 + " union all"
						+ "	select sfzh,police_name,policeno pcode,policephone,create_time from person_check_log where 1=1 "
						+ sqlw2 + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10) ) t";
			}
		}else{
			if (warnSearchByCodeVo.getType().equals("swCount") || warnSearchByCodeVo.getType().equals("sfCount")
					|| warnSearchByCodeVo.getType().equals("skCount") || warnSearchByCodeVo.getType().equals("sjCount")) {
				countSql = "select count(1) count from(	select police_name,pcode,policephone from ("
						+ "	select sfzh,police_name,policeno pcode,policephone,create_time from person_check_log where 1=1 "
						+ sqlw2 + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10) ) t";
			} else {
				countSql = "select count(1) count from(	select police_name,pcode,policephone from" + "	(select "
						+ "	idcard_no sfzh,police_name,pcode,police_phone policephone,check_time create_time"
						+ "	from jwt_check_person_log_1501 e where e.check_source='lte' " + sqlw1 + " union all"
						+ "	select sfzh,police_name,policeno pcode,policephone,create_time from person_check_log where 1=1 "
						+ sqlw2 + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10) ) t";
			}
		}
		

		Log.info("其他详情数量{}:{}", warnSearchByCodeVo.getType(), countSql);
		ResultSet rsCount = pageInquire.findPage(countSql);
		int count = this.countPersonCheckService.getTotalCount(rsCount);

		String sql = "";
		if(StringUtils.isNotBlank(source) && source.equals("jwt")){
			if (warnSearchByCodeVo.getType().equals("swCount") || warnSearchByCodeVo.getType().equals("sfCount")
					|| warnSearchByCodeVo.getType().equals("skCount") || warnSearchByCodeVo.getType().equals("sjCount")) {
				sql = "select tags,tags tags1,name,sfzh,"
						+ "case sex when '1' then '男' when '2' then '女' else '其他' end sex ,"
						+ "	nation,police_name,pcode,policephone,(select name from tb_d_dwdm a where a.code = t.checkdept) checkdept,"
						+ " (select jcz_name from tb_m_jcz_jwt m where m.police_phone = t.policephone) check_address,create_time,check_place,domicile_code from"
						+ "	(select tags,name,sfzh,sex,nation,police_name,policeno pcode,policephone,checkdept,check_address,create_time,"
						+ "	(select name from tb_d_dwdm u where u.code = lg_place) check_place,birthplace domicile_code from person_check_log where 1=1"
						+ sqlw2 + ") t group by policephone,sfzh,SUBSTR(create_time,1,10) ";
			} else {
				sql = "select tags,tags tags1,name,sfzh,"
						+ "case sex when '1' then '男' when '2' then '女' else '其他' end sex ,"
						+ "	nation,police_name,pcode,policephone,(select name from tb_d_dwdm a where a.code = t.checkdept) checkdept,"
						+ " (select jcz_name from tb_m_jcz_jwt m where m.police_phone = t.policephone) check_address,create_time,check_place,domicile_code from"
						+ "	(select case when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') "
						+ "	when qgztry is not null and qgxfd is null then '全国在逃人员' "
						+ "	when qgztry is null and qgxfd is not null then '全国吸毒贩毒人员' end tags,name,idcard_no sfzh,sex,national nation,police_name,pcode,"
						+ "	police_phone policephone,ucode checkdept ,check_address check_address,check_time create_time,check_place,domicile_code"
						+ " from jwt_check_person_log_1501 e where  (e.check_source is null or e.check_source='' or e.check_source='jwt')" + sqlw1 + " union all"
						+ "	select tags,name,sfzh,sex,nation,police_name,policeno pcode,policephone,checkdept,check_address,create_time,"
						+ "	(select name from tb_d_dwdm u where u.code = lg_place) check_place,birthplace domicile_code from person_check_log where 1=1"
						+ sqlw2 + ") t group by policephone,sfzh,SUBSTR(create_time,1,10) ";
			}
		}else{
			if (warnSearchByCodeVo.getType().equals("swCount") || warnSearchByCodeVo.getType().equals("sfCount")
					|| warnSearchByCodeVo.getType().equals("skCount") || warnSearchByCodeVo.getType().equals("sjCount")) {
				sql = "select tags,tags tags1,name,sfzh,"
						+ "case sex when '1' then '男' when '2' then '女' else '其他' end sex ,"
						+ "	nation,police_name,pcode,policephone,(select name from tb_d_dwdm a where a.code = t.checkdept) checkdept,"
						+ " (select jcz_name from tb_m_jcz_jwt m where m.police_phone = t.policephone) check_address,create_time,check_place,domicile_code from"
						+ "	(select tags,name,sfzh,sex,nation,police_name,policeno pcode,policephone,checkdept,check_address,create_time,"
						+ "	(select name from tb_d_dwdm u where u.code = lg_place) check_place,birthplace domicile_code from person_check_log where 1=1"
						+ sqlw2 + ") t group by policephone,sfzh,SUBSTR(create_time,1,10) ";
			} else {
				sql = "select tags,tags tags1,name,sfzh,"
						+ "case sex when '1' then '男' when '2' then '女' else '其他' end sex ,"
						+ "	nation,police_name,pcode,policephone,(select name from tb_d_dwdm a where a.code = t.checkdept) checkdept,"
						+ " (select jcz_name from tb_m_jcz_jwt m where m.police_phone = t.policephone) check_address,create_time,check_place,domicile_code from"
						+ "	(select case when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') "
						+ "	when qgztry is not null and qgxfd is null then '全国在逃人员' "
						+ "	when qgztry is null and qgxfd is not null then '全国吸毒贩毒人员' end tags,name,idcard_no sfzh,sex,national nation,police_name,pcode,"
						+ "	police_phone policephone,ucode checkdept ,check_address check_address,check_time create_time,check_place,domicile_code"
						+ " from jwt_check_person_log_1501 e where  e.check_source='lte' " + sqlw1 + " union all"
						+ "	select tags,name,sfzh,sex,nation,police_name,policeno pcode,policephone,checkdept,check_address,create_time,"
						+ "	(select name from tb_d_dwdm u where u.code = lg_place) check_place,birthplace domicile_code from person_check_log where 1=1"
						+ sqlw2 + ") t group by policephone,sfzh,SUBSTR(create_time,1,10) ";
			}
		}
		

		String listSQL = sql + " order by tags desc limit "
				+ (warnSearchByCodeVo.getPageno() - 1) * warnSearchByCodeVo.getSize() + " , "
				+ warnSearchByCodeVo.getSize();

		Log.info("其他详情列表{}:{}", warnSearchByCodeVo.getType(), listSQL);
		ResultSet rs = pageInquire.findPage(listSQL);
		List<CheckPersonListVo> warnList = this.countPersonCheckService.getWarnList(rs);

		int totalpage = 0;
		if (count % warnSearchByCodeVo.getSize() == 0) {
			totalpage = count / warnSearchByCodeVo.getSize();
		} else {
			totalpage = (count / warnSearchByCodeVo.getSize()) + 1;
		}
		pageHelper.setPageNo(warnSearchByCodeVo.getPageno());
		pageHelper.setPageSize(warnSearchByCodeVo.getSize());
		pageHelper.setResult(warnList);
		pageHelper.setTotalPage(totalpage);
		pageHelper.setTotal(count);

		return pageHelper;
	}

	public String getDSListQuery(WarnSearchByCodeVo warnSearchByCodeVo) {
		String sql = "";
		String source = "";
		if(warnSearchByCodeVo.getSource().equals("jcz")){
			source = "jwt";
		}else{
			source = "lte";
		}
		String sqlw1 = this.countPersonCheckService.getDSQuery(warnSearchByCodeVo.getBeginTime(),
				warnSearchByCodeVo.getEndTime(), "");
		String sqlw2 = this.countPersonCheckService.getSSQuery(warnSearchByCodeVo.getBeginTime(),
				warnSearchByCodeVo.getEndTime(), "");
		String codeSql = "";
		if (StringUtils.isNotBlank(warnSearchByCodeVo.getCode())) {
			codeSql = " where jcz_name = '" + warnSearchByCodeVo.getCode() + "' OR jcz_name like '%"
					+ warnSearchByCodeVo.getCode() + "%' ";
		}

		if (warnSearchByCodeVo.getType().equals("checkCount")) {
			sql = sqlw1 + " and (qgztry is not null  or qgxfd is not null )"
					+ " and police_phone  <> '' and (qgztry is not null  or qgxfd is not null )  and concat(police_phone,idcard_no,SUBSTR(check_time,1,10)) not in"
					+ " (select concat(policephone,sfzh,SUBSTR(create_time,1,10)) from person_check_log where personif = '01'"
					+ sqlw2 + " and source = '"+source+"')" + " and police_phone in (select police_phone from tb_m_jcz_jwt"
					+ codeSql + " )";
		} else if (warnSearchByCodeVo.getType().equals("comparCount")) {
			sql = sqlw1
					+ " AND ryhc_tag <> '' AND ryhc_tag IS NOT NULL  and (qgztry is not null  or qgxfd is not null )"
					+ " and police_phone  <> '' and (qgztry is not null  or qgxfd is not null )  and concat(police_phone,idcard_no,SUBSTR(check_time,1,10)) not in"
					+ " (select concat(policephone,sfzh,SUBSTR(create_time,1,10)) from person_check_log where personif = '01'"
					+ sqlw2 + " and source = '"+source+"')" + " and police_phone in (select police_phone from tb_m_jcz_jwt"
					+ codeSql + " )";
		} else if (warnSearchByCodeVo.getType().equals("warnCount")) {
			sql = sqlw1
					+ " AND police_phone  <> '' and (qgztry is not null  or qgxfd is not null)  and concat(police_phone,idcard_no,SUBSTR(check_time,1,10)) not in"
					+ " (select concat(policephone,sfzh,SUBSTR(create_time,1,10)) from person_check_log where personif = '01' "
					+ sqlw2 + " and source = '"+source+"') and police_phone in (select police_phone from tb_m_jcz_jwt"
					+ codeSql + ")";
		} else if (warnSearchByCodeVo.getType().equals("sdCount")) {
			sql = sqlw1
					+ " and police_phone  <> '' and (qgxfd is not null )  and concat(police_phone,idcard_no,SUBSTR(check_time,1,10)) not in"
					+ " (select concat(policephone,sfzh,SUBSTR(create_time,1,10)) from person_check_log where personif = '01' "
					+ sqlw2 + " and source = '"+source+"') and police_phone in (select police_phone from tb_m_jcz_jwt"
					+ codeSql + ")";
		} else if (warnSearchByCodeVo.getType().equals("ztCount")) {
			sql = sqlw1
					+ " and police_phone  <> '' and (qgztry is not null )  and concat(police_phone,idcard_no,SUBSTR(check_time,1,10)) not in"
					+ "	(select concat(policephone,sfzh,SUBSTR(create_time,1,10)) from person_check_log where personif = '01' "
					+ sqlw2 + " and source = '"+source+"') and police_phone in (select police_phone from tb_m_jcz_jwt"
					+ codeSql + ")";
		}

		return sql;
	}

	public String getSSListQuery(WarnSearchByCodeVo warnSearchByCodeVo) {
		String sql = "";
		String source = "";
		if(warnSearchByCodeVo.getSource().equals("jcz")){
			source = "jwt";
		}else{
			source = "lte";
		}
		String sqlw2 = this.countPersonCheckService.getSSQuery(warnSearchByCodeVo.getBeginTime(),
				warnSearchByCodeVo.getEndTime(), "");
		String codeSql = "";
		if (StringUtils.isNotBlank(warnSearchByCodeVo.getCode())) {
			codeSql = " where jcz_name = '" + warnSearchByCodeVo.getCode() + "' OR jcz_name like '%"
					+ warnSearchByCodeVo.getCode() + "%' ";
		}

		if (warnSearchByCodeVo.getType().equals("checkCount")) {
			sql = " and source = '"+source+"' and policephone is not null " + sqlw2
					+ " and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ") ";
		} else if (warnSearchByCodeVo.getType().equals("comparCount")) {
			sql = " and source = '"+source+"' and policephone is not null " + sqlw2
					+ "AND tags <> ''  AND tags <> '无背景'  AND tags IS NOT NULL and policephone in (select police_phone from tb_m_jcz_jwt "
					+ codeSql + ") ";
		} else if (warnSearchByCodeVo.getType().equals("warnCount")) {
			sql = "	and source = '"+source+"' and personif = '01' and policephone is not null  " + sqlw2
					+ "	and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ")";
		} else if (warnSearchByCodeVo.getType().equals("ztCount")) {
			sql = "	and source = '"+source+"' and personif = '01' and tags like '%逃%' and policephone is not null  " + sqlw2
					+ "	and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ")";
		} else if (warnSearchByCodeVo.getType().equals("sdCount")) {
			sql = "	and source = '"+source+"' and personif = '01' and tags like '%毒%' and policephone is not null " + sqlw2
					+ "	and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ")";
		} else if (warnSearchByCodeVo.getType().equals("sfCount")) {
			sql = "	and  personif = '01' and tags  like '%访%' and source = '"+source+"' and policephone is not null " + sqlw2
					+ "	and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ")";
		} else if (warnSearchByCodeVo.getType().equals("sjCount")) {
			sql = "	and personif = '01' and tags  like '%疆%' and source = '"+source+"' and policephone is not null" + sqlw2
					+ "	and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ")";
		} else if (warnSearchByCodeVo.getType().equals("skCount")) {
			sql = "	and  personif = '01' and tags  like '%恐%' and source = '"+source+"' and policephone is not null" + sqlw2
					+ "	and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ")";
		} else if (warnSearchByCodeVo.getType().equals("swCount")) {
			sql = "	and  personif = '01' and tags  like '%稳%' and source = '"+source+"' and policephone is not null" + sqlw2
					+ "	and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ")";
		}

		return sql;
	}
}
