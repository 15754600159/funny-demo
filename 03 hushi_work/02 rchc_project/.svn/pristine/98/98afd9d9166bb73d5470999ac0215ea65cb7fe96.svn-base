package com.minginglamp.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;
import org.mortbay.log.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.minginglamp.common.PageHelper;
import com.minginglamp.common.PageInquire;
import com.minginglamp.vo.CheckDeviceListVo;
import com.minginglamp.vo.CheckPersonListVo;
import com.minginglamp.vo.CountCheckLogVo;
import com.minginglamp.vo.CountpersonCheckLogDeptVo;
import com.minginglamp.vo.WarnSearchByCodeVo;

@Service
public class CountPersonCheckService {

	@Autowired
	private PageInquire pageInquire;

	@Autowired
	private DwdmService dwdmService;

	@Autowired
	private XzqhService xzqhService;

	@Autowired
	private DictionaryService dictionaryService;
	
	@Autowired
	private ImportantPersonCategoryService importantPersonCategoryService;

	public List<CountpersonCheckLogDeptVo> countPersonCheckdept(String beginTime, String endTime, String source) {
		List<CountpersonCheckLogDeptVo> list = new ArrayList<CountpersonCheckLogDeptVo>();

		String sqlw1 = this.getDSQuery(beginTime, endTime, "");
		String sqlw2 = this.getSSQuery(beginTime, endTime, "");

		// 呼市行政区划
		// List<HSxzqh> sjxzqhList = this.xzqhService.listHSxzqh();

		// 核查数量
		/*String checkCountSql = "SELECT checkdept code,count(1) count FROM "
				+ "(SELECT policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source "
				+ " FROM ( SELECT pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
				+ " CONCAT(qgwffz) jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source"
				+ " FROM jwt_check_person_log_1501 e where 1=1 " + sqlw1 + " UNION ALL"
				+ " SELECT policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source "
				+ " FROM person_check_log where 1=1 " + sqlw2 + " and source = 'jwt'"
				+ ") t group by policephone,sfzh,SUBSTR(create_time,1,10)" + ") g group by checkdept";*/
		String checkCountSql = "";
		if(StringUtils.isNotBlank(source) && source.equals("jwt")){
			checkCountSql = "SELECT checkdept code,count(1) count FROM "
					+ "(SELECT policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source "
					+ " FROM ( SELECT pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
					+ " CONCAT(qgwffz) jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source"
					+ " FROM jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + sqlw1 + " UNION ALL"
					+ " SELECT policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source "
					+ " FROM person_check_log where 1=1 " + sqlw2 + " and source = 'jwt'"
					+ ") t group by policephone,sfzh,SUBSTR(create_time,1,10)" + ") g group by checkdept";
		}else{
			checkCountSql = "SELECT checkdept code,count(1) count FROM "
					+ "(SELECT policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source "
					+ " FROM ( SELECT pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
					+ " CONCAT(qgwffz) jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source"
					+ " FROM jwt_check_person_log_1501 e where e.check_source='lte' " + sqlw1 + " UNION ALL"
					+ " SELECT policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source "
					+ " FROM person_check_log where 1=1 " + sqlw2 + " and source = 'lte'"
					+ ") t group by policephone,sfzh,SUBSTR(create_time,1,10)" + ") g group by checkdept";
		}
		
		Log.info("核查数量:{}", checkCountSql);
		ResultSet checkCountResult = pageInquire.findPage(checkCountSql);
		Map<String, Integer> checkCountMap = this.getCountMap(checkCountResult);

		// 比中数量
		/*String comparCountSql = "SELECT checkdept code,count(1) count FROM "
				+ " (SELECT policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source "
				+ " FROM ( SELECT pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
				+ " CONCAT(qgwffz) jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source"
				+ " FROM jwt_check_person_log_1501 e where 1=1 " + sqlw1
				+ " AND ryhc_tag <> '' AND ryhc_tag IS NOT NULL " + " UNION ALL"
				+ " SELECT policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source "
				+ " FROM person_check_log where 1=1 " + sqlw2 + " and source = 'jwt' "
				+ " AND tags <> '' AND tags IS NOT NULL " + ") t group by policephone,sfzh,SUBSTR(create_time,1,10)"
				+ ") g group by checkdept";*/
		String comparCountSql = "";
		if(StringUtils.isNotBlank(source) && source.equals("jwt")){
			comparCountSql = "SELECT checkdept code,count(1) count FROM "
					+ " (SELECT policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source "
					+ " FROM ( SELECT pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
					+ " CONCAT(qgwffz) jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source"
					+ " FROM jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + sqlw1
					+ " AND ryhc_tag <> '' AND ryhc_tag IS NOT NULL " + " UNION ALL"
					+ " SELECT policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source "
					+ " FROM person_check_log where 1=1 " + sqlw2 + " and source = 'jwt' "
					+ " AND tags <> '' AND tags IS NOT NULL " + ") t group by policephone,sfzh,SUBSTR(create_time,1,10)"
					+ ") g group by checkdept";
		}else{
			comparCountSql = "SELECT checkdept code,count(1) count FROM "
					+ " (SELECT policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source "
					+ " FROM ( SELECT pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
					+ " CONCAT(qgwffz) jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source"
					+ " FROM jwt_check_person_log_1501 e where e.check_source='lte' " + sqlw1
					+ " AND ryhc_tag <> '' AND ryhc_tag IS NOT NULL " + " UNION ALL"
					+ " SELECT policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source "
					+ " FROM person_check_log where 1=1 " + sqlw2 + " and source = 'lte' "
					+ " AND tags <> '' AND tags IS NOT NULL " + ") t group by policephone,sfzh,SUBSTR(create_time,1,10)"
					+ ") g group by checkdept";
		}
		Log.info("比中数量:{}", comparCountSql);
		ResultSet comparCountResult = pageInquire.findPage(comparCountSql);
		Map<String, Integer> comparCountMap = this.getCountMap(comparCountResult);

		// 预警数量
		/*String warnCountSql = "SELECT checkdept code,count(1) count "
				+ " FROM (SELECT policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,personif,source "
				+ " FROM (SELECT pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,"
				+ " name,case when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') else "
				+ " IFNULL(qgztry,qgxfd) end tags,check_time create_time,ryhc_flag personif,check_source source"
				+ " FROM jwt_check_person_log_1501 e where 1=1 " + sqlw1
				+ "	AND (qgztry is not null  or qgxfd is not null ) " + "AND concat(pcode,idcard_no) " + "  NOT IN"
				+ " (SELECT concat(policeno,sfzh) FROM person_check_log WHERE personif = '01' " + " and 1=1 " + sqlw2
				+ " and source = 'jwt')" + " UNION ALL"
				+ " SELECT policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,"
				+ "  create_time,personif,source " + " FROM person_check_log where personif = '01' " + sqlw2
				+ " and source = 'jwt'"
				+ ") t  group by policephone,sfzh,SUBSTR(create_time,1,10)) g group by checkdept";*/
		String warnCountSql = "";
		if(StringUtils.isNotBlank(source) && source.equals("jwt")){
			warnCountSql = "SELECT checkdept code,count(1) count "
					+ " FROM (SELECT policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,personif,source "
					+ " FROM (SELECT pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,"
					+ " name,case when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') else "
					+ " IFNULL(qgztry,qgxfd) end tags,check_time create_time,ryhc_flag personif,check_source source"
					+ " FROM jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + sqlw1
					+ "	AND (qgztry is not null  or qgxfd is not null ) " + "AND concat(pcode,idcard_no) " + "  NOT IN"
					+ " (SELECT concat(policeno,sfzh) FROM person_check_log WHERE personif = '01' " + " and 1=1 " + sqlw2
					+ " and source = 'jwt')" + " UNION ALL"
					+ " SELECT policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,"
					+ "  create_time,personif,source " + " FROM person_check_log where personif = '01' " + sqlw2
					+ " and source = 'jwt'"
					+ ") t  group by policephone,sfzh,SUBSTR(create_time,1,10)) g group by checkdept";
		}else{
			warnCountSql = "SELECT checkdept code,count(1) count "
					+ " FROM (SELECT policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,personif,source "
					+ " FROM (SELECT pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,"
					+ " name,case when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') else "
					+ " IFNULL(qgztry,qgxfd) end tags,check_time create_time,ryhc_flag personif,check_source source"
					+ " FROM jwt_check_person_log_1501 e where e.check_source='lte' " + sqlw1
					+ "	AND (qgztry is not null  or qgxfd is not null ) " + "AND concat(pcode,idcard_no) " + "  NOT IN"
					+ " (SELECT concat(policeno,sfzh) FROM person_check_log WHERE personif = '01' " + " and 1=1 " + sqlw2
					+ " and source = 'lte')" + " UNION ALL"
					+ " SELECT policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,"
					+ "  create_time,personif,source " + " FROM person_check_log where personif = '01' " + sqlw2
					+ " and source = 'lte'"
					+ ") t  group by policephone,sfzh,SUBSTR(create_time,1,10)) g group by checkdept";
		}
		Log.info("预警数量:{}", warnCountSql);
		ResultSet warnCountResult = pageInquire.findPage(warnCountSql);
		Map<String, Integer> warnCountMap = this.getCountMap(warnCountResult);

		// 设备数量
		/*String deviceCountSql = "select checkdept code,count(1) count from "
				+ " ( SELECT checkdept checkdept,policephone FROM ("
				+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source from ("
				+ " select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,CONCAT(qgwffz) jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source"
				+ "  from jwt_check_person_log_1501 e where 1=1 " + sqlw1 + " union all"
				+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',"
				+ " personif,source from person_check_log where 1=1 " + sqlw2 + " and source = 'jwt'"
				+ " ) t group by policephone,sfzh,SUBSTR(create_time,1,10))"
				+ " )t1 group by policephone ) g group by checkdept";*/
		String deviceCountSql = "";
		if(StringUtils.isNotBlank(source) && source.equals("jwt")){
			deviceCountSql = "select checkdept code,count(1) count from "
					+ " ( SELECT checkdept checkdept,policephone FROM ("
					+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source from ("
					+ " select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,CONCAT(qgwffz) jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source"
					+ "  from jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + sqlw1 + " union all"
					+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',"
					+ " personif,source from person_check_log where 1=1 " + sqlw2 + " and source = 'jwt'"
					+ " ) t group by policephone,sfzh,SUBSTR(create_time,1,10))"
					+ " )t1 group by policephone ) g group by checkdept";
		}else{
			deviceCountSql = "select checkdept code,count(1) count from "
					+ " ( SELECT checkdept checkdept,policephone FROM ("
					+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source from ("
					+ " select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,CONCAT(qgwffz) jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source"
					+ "  from jwt_check_person_log_1501 e where e.check_source='lte' " + sqlw1 + " union all"
					+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',"
					+ " personif,source from person_check_log where 1=1 " + sqlw2 + " and source = 'lte'"
					+ " ) t group by policephone,sfzh,SUBSTR(create_time,1,10))"
					+ " )t1 group by policephone ) g group by checkdept";
		}
		Log.info("设备数量:{}", deviceCountSql);
		ResultSet deviceCountResult = pageInquire.findPage(deviceCountSql);
		Map<String, Integer> deviceCountMap = this.getCountMap(deviceCountResult);

		// 警数分类
		/*String categoryCountSql = "select AA.name name,AA.code code, IFNULL(AA.在逃人数,0) zt_count,IFNULL(BB.涉毒人数,0) sd_count,"
				+ " IFNULL(CC.涉访人数,0) sf_count,IFNULL(DD.涉疆人数,0) sj_count,IFNULL(EE.涉恐人数,0) sk_count,"
				+ " IFNULL(FF.涉稳人数,0) sw_count FROM "
				// 人员核查预警数分类（在逃）统计
				+ " (select p.name name,p.code code,j.count 在逃人数 from tb_d_hsxzqh p  LEFT JOIN"
				+ " (select checkdept,count(1) count from "
				+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source from ("
				+ " select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,qgztry jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source"
				+ "  from jwt_check_person_log_1501 e where 1=1 " + sqlw1
				+ " and (qgztry is not null) and concat(police_phone,idcard_no) not in "
				+ "     (select concat(policephone,sfzh) from person_check_log where personif = '01' and tags  like '%逃%' "
				+ sqlw2 + " and source = 'jwt')" + " union all"
				+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%逃%' "
				+ sqlw2 + " and source = 'jwt'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
				+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) AA,"

				// -- 人员核查预警数分类（涉毒）统计
				+ " (select p.code code,j.count 涉毒人数 from tb_d_hsxzqh p  LEFT JOIN"
				+ " (select checkdept,count(1) count from "
				+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source from ("
				+ " select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,qgztry jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source"
				+ "  from jwt_check_person_log_1501 e where 1=1 " + sqlw1
				+ " and (qgxfd is not null) and concat(police_phone,idcard_no) not in "
				+ "     (select concat(policephone,sfzh) from person_check_log where personif = '01' and tags  like '%毒%' "
				+ sqlw2 + " and source = 'jwt')" + " union all"
				+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%毒%' "
				+ sqlw2 + " and source = 'jwt'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
				+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) BB,"

				// -- 人员核查预警数分类（涉访）统计
				+ " (select p.code code,j.count 涉访人数 from tb_d_hsxzqh p  LEFT JOIN"
				+ " (select checkdept,count(1) count from "
				+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,'',personif,source from ("
				+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%访%' "
				+ sqlw2 + " and source = 'jwt'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
				+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) CC,"

				// -- 人员核查预警数分类（涉疆）统计
				+ " (select p.code code,j.count 涉疆人数 from tb_d_hsxzqh p  LEFT JOIN"
				+ " (select checkdept,count(1) count from "
				+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,'',personif,source from ("
				+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%疆%' "
				+ sqlw2 + " and source = 'jwt'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
				+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) DD,"

				// -- 人员核查预警数分类（涉恐）统计
				+ " (select p.code code,j.count 涉恐人数 from tb_d_hsxzqh p  LEFT JOIN"
				+ " (select checkdept,count(1) count from "
				+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,'',personif,source from ("
				+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%恐%' "
				+ sqlw2 + " and source = 'jwt'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
				+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) EE,"

				// -- 人员核查预警数分类（涉稳）统计
				+ " (select p.code code ,j.count 涉稳人数 from tb_d_hsxzqh p  LEFT JOIN"
				+ " (select checkdept,count(1) count from "
				+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,'',personif,source from ("
				+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%稳%' "
				+ sqlw2 + " and source = 'jwt'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
				+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) FF"
				+ " where AA.code = BB.code and BB.code = CC.code and CC.code = DD.code and DD.code = EE.code and EE.code = FF.code";
		*/
		String categoryCountSql = "";
		if(StringUtils.isNotBlank(source) && source.equals("jwt")){
			categoryCountSql = "select AA.name name,AA.code code, IFNULL(AA.在逃人数,0) zt_count,IFNULL(BB.涉毒人数,0) sd_count,"
					+ " IFNULL(CC.涉访人数,0) sf_count,IFNULL(DD.涉疆人数,0) sj_count,IFNULL(EE.涉恐人数,0) sk_count,"
					+ " IFNULL(FF.涉稳人数,0) sw_count FROM "
					// 人员核查预警数分类（在逃）统计
					+ " (select p.name name,p.code code,j.count 在逃人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ " (select checkdept,count(1) count from "
					+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source from ("
					+ " select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,qgztry jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source"
					+ "  from jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + sqlw1
					+ " and (qgztry is not null) and concat(police_phone,idcard_no) not in "
					+ "     (select concat(policephone,sfzh) from person_check_log where personif = '01' and tags  like '%逃%' "
					+ sqlw2 + " and source = 'jwt')" + " union all"
					+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%逃%' "
					+ sqlw2 + " and source = 'jwt'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
					+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) AA,"

					// -- 人员核查预警数分类（涉毒）统计
					+ " (select p.code code,j.count 涉毒人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ " (select checkdept,count(1) count from "
					+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source from ("
					+ " select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,qgztry jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source"
					+ "  from jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + sqlw1
					+ " and (qgxfd is not null) and concat(police_phone,idcard_no) not in "
					+ "     (select concat(policephone,sfzh) from person_check_log where personif = '01' and tags  like '%毒%' "
					+ sqlw2 + " and source = 'jwt')" + " union all"
					+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%毒%' "
					+ sqlw2 + " and source = 'jwt'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
					+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) BB,"

					// -- 人员核查预警数分类（涉访）统计
					+ " (select p.code code,j.count 涉访人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ " (select checkdept,count(1) count from "
					+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,'',personif,source from ("
					+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%访%' "
					+ sqlw2 + " and source = 'jwt'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
					+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) CC,"

					// -- 人员核查预警数分类（涉疆）统计
					+ " (select p.code code,j.count 涉疆人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ " (select checkdept,count(1) count from "
					+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,'',personif,source from ("
					+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%疆%' "
					+ sqlw2 + " and source = 'jwt'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
					+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) DD,"

					// -- 人员核查预警数分类（涉恐）统计
					+ " (select p.code code,j.count 涉恐人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ " (select checkdept,count(1) count from "
					+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,'',personif,source from ("
					+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%恐%' "
					+ sqlw2 + " and source = 'jwt'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
					+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) EE,"

					// -- 人员核查预警数分类（涉稳）统计
					+ " (select p.code code ,j.count 涉稳人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ " (select checkdept,count(1) count from "
					+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,'',personif,source from ("
					+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%稳%' "
					+ sqlw2 + " and source = 'jwt'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
					+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) FF"
					+ " where AA.code = BB.code and BB.code = CC.code and CC.code = DD.code and DD.code = EE.code and EE.code = FF.code";
		}else{
			categoryCountSql = "select AA.name name,AA.code code, IFNULL(AA.在逃人数,0) zt_count,IFNULL(BB.涉毒人数,0) sd_count,"
					+ " IFNULL(CC.涉访人数,0) sf_count,IFNULL(DD.涉疆人数,0) sj_count,IFNULL(EE.涉恐人数,0) sk_count,"
					+ " IFNULL(FF.涉稳人数,0) sw_count FROM "
					// 人员核查预警数分类（在逃）统计
					+ " (select p.name name,p.code code,j.count 在逃人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ " (select checkdept,count(1) count from "
					+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source from ("
					+ " select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,qgztry jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source"
					+ "  from jwt_check_person_log_1501 e where e.check_source='lte' " + sqlw1
					+ " and (qgztry is not null) and concat(police_phone,idcard_no) not in "
					+ "     (select concat(policephone,sfzh) from person_check_log where personif = '01' and tags  like '%逃%' "
					+ sqlw2 + " and source = 'lte')" + " union all"
					+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%逃%' "
					+ sqlw2 + " and source = 'lte'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
					+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) AA,"

					// -- 人员核查预警数分类（涉毒）统计
					+ " (select p.code code,j.count 涉毒人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ " (select checkdept,count(1) count from "
					+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source from ("
					+ " select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,qgztry jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source"
					+ "  from jwt_check_person_log_1501 e where e.check_source='lte' " + sqlw1
					+ " and (qgxfd is not null) and concat(police_phone,idcard_no) not in "
					+ "     (select concat(policephone,sfzh) from person_check_log where personif = '01' and tags  like '%毒%' "
					+ sqlw2 + " and source = 'lte')" + " union all"
					+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%毒%' "
					+ sqlw2 + " and source = 'lte'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
					+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) BB,"

					// -- 人员核查预警数分类（涉访）统计
					+ " (select p.code code,j.count 涉访人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ " (select checkdept,count(1) count from "
					+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,'',personif,source from ("
					+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%访%' "
					+ sqlw2 + " and source = 'lte'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
					+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) CC,"

					// -- 人员核查预警数分类（涉疆）统计
					+ " (select p.code code,j.count 涉疆人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ " (select checkdept,count(1) count from "
					+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,'',personif,source from ("
					+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%疆%' "
					+ sqlw2 + " and source = 'lte'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
					+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) DD,"

					// -- 人员核查预警数分类（涉恐）统计
					+ " (select p.code code,j.count 涉恐人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ " (select checkdept,count(1) count from "
					+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,'',personif,source from ("
					+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%恐%' "
					+ sqlw2 + " and source = 'lte'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
					+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) EE,"

					// -- 人员核查预警数分类（涉稳）统计
					+ " (select p.code code ,j.count 涉稳人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ " (select checkdept,count(1) count from "
					+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,'',personif,source from ("
					+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source from person_check_log where personif = '01' and tags  like '%稳%' "
					+ sqlw2 + " and source = 'lte'" + " ) t group by policephone,sfzh,SUBSTR(create_time,1,10)"
					+ " ) g group by checkdept) j on p.code = j.checkdept where p.code <> '150101' order by p.code) FF"
					+ " where AA.code = BB.code and BB.code = CC.code and CC.code = DD.code and DD.code = EE.code and EE.code = FF.code";
		}
		
		Log.info("警数分类:{}", categoryCountSql);
		ResultSet rs = pageInquire.findPage(categoryCountSql);
		list = this.getList(rs, checkCountMap, comparCountMap, warnCountMap, deviceCountMap);
		return list;
	}

	public List<CountpersonCheckLogDeptVo> getList(ResultSet rs, Map<String, Integer> checkCountMap,
			Map<String, Integer> comparCountMap, Map<String, Integer> warnCountMap,
			Map<String, Integer> deviceCountMap) {
		List<CountpersonCheckLogDeptVo> list = new ArrayList<CountpersonCheckLogDeptVo>();
		int skCountAll = 0;
		int sdCountAll = 0;
		int sfCountAll = 0;
		int swCountAll = 0;
		int sjCountAll = 0;
		int ztCountAll = 0;
		int checkCountAll = 0;
		int comparCountAll = 0;
		int warnCountAll = 0;
		int deviceCountAll = 0;
		try {
			while (rs.next()) {
				CountpersonCheckLogDeptVo vo = new CountpersonCheckLogDeptVo();
				String code = rs.getString("code");
				if(StringUtils.isNotBlank(code)){
					vo.setSkCount(rs.getInt("sk_count"));
					vo.setSdCount(rs.getInt("sd_count"));
					vo.setSfCount(rs.getInt("sf_count"));
					vo.setSwCount(rs.getInt("sw_count"));
					vo.setSjCount(rs.getInt("sj_count"));
					vo.setZtCount(rs.getInt("zt_count"));
					
					if ("150100".equals(code)) {
						vo.setName("呼和浩特市公安局");
					} else {
						vo.setName(rs.getString("name"));
					}
					vo.setCode(rs.getString("code"));
					if (checkCountMap.containsKey(code)) {
						vo.setCheckCount(checkCountMap.get(code));
						checkCountAll += checkCountMap.get(code);
					}
					if (comparCountMap.containsKey(code)) {
						vo.setComparCount(comparCountMap.get(code));
						comparCountAll += comparCountMap.get(code);
					}
					if (warnCountMap.containsKey(code)) {
						vo.setWarnCount(warnCountMap.get(code));
						warnCountAll += warnCountMap.get(code);
					}
					if (deviceCountMap.containsKey(code)) {
						vo.setDeviceCount(deviceCountMap.get(code));
						deviceCountAll += deviceCountMap.get(code);
					}
					list.add(vo);
				}
				
				

				skCountAll += rs.getInt("sk_count");
				sdCountAll += rs.getInt("sd_count");
				sfCountAll += rs.getInt("sf_count");
				swCountAll += rs.getInt("sw_count");
				sjCountAll += rs.getInt("sj_count");
				ztCountAll += rs.getInt("zt_count");

			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		CountpersonCheckLogDeptVo vo = new CountpersonCheckLogDeptVo();
		vo.setName("呼和浩特市");
		vo.setCode("");
		vo.setSkCount(skCountAll);
		vo.setSdCount(sdCountAll);
		vo.setSfCount(sfCountAll);
		vo.setSwCount(swCountAll);
		vo.setSjCount(sjCountAll);
		vo.setZtCount(ztCountAll);
		vo.setCheckCount(checkCountAll);
		vo.setComparCount(comparCountAll);
		vo.setWarnCount(warnCountAll);
		vo.setDeviceCount(deviceCountAll);
		list.add(vo);

		return list;
	}

	public Map<String, Integer> getCountMap(ResultSet rs) {
		Map<String, Integer> countMap = new HashMap<String, Integer>();
		try {
			while (rs.next()) {
				String code = rs.getString("code");
				Integer count = rs.getInt("count");
				countMap.put(code, count);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return countMap;
	}

	String getDSQuery(String beginTime, String endTime, String code) {
		String sqlw = "";
		if (StringUtils.isNotBlank(beginTime) && StringUtils.isNotBlank(endTime)) {
			sqlw = " and check_time > '" + beginTime + "' and check_time <= '" + endTime + "'";
		}
		if (StringUtils.isNotBlank(code)) {
			if (code.length() > 6) {
				sqlw += " and ucode = '" + code + "'";
			} else {
				sqlw += " and check_address = '" + code + "'";
			}
		}
		return sqlw;
	}

	String getSSQuery(String beginTime, String endTime, String code) {
		String sqlw = "";
		if (StringUtils.isNotBlank(beginTime) && StringUtils.isNotBlank(endTime)) {
			sqlw = " and create_time > '" + beginTime + "' and create_time <= '" + endTime + "'";
		}
		if (StringUtils.isNotBlank(code)) {
			sqlw += " and checkdept like '" + code + "%'";
		}
		return sqlw;
	}

	public List<CountCheckLogVo> countCheckByCode(String beginTime, String endTime, String code, String source) {
		List<CountCheckLogVo> list = new ArrayList<CountCheckLogVo>();

		String sqlw1 = this.getDSQuery(beginTime, endTime, code);
		String sqlw2 = this.getSSQuery(beginTime, endTime, code);
		// 核查数量
		String countSql = "";
		// if (source.equals("jj")) {
		// countSql = "select check_address code ,count(1) count from
		// person_check_log "
		// + "where 1=1 " + sqlw2 + " and source='jj' group by check_address ";
		// } else {
		String allSql = "";
		if (!StringUtils.isNotBlank(code)) {
			allSql = " where checkdept in (select code from tb_d_hsxzqh)";
		}
		if(StringUtils.isNotBlank(source) && source.equals("jwt")){
			countSql = "select ucode code,count(1) count from "
					+ " (select policeno,policephone,checkdept,sfzh,ucode from ("
					+ " select pcode policeno,police_phone policephone,check_address checkdept,idcard_no sfzh,ucode ucode,check_time create_time"
					+ "  from jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + sqlw1 + " union all"
					+ " select policeno,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,checkdept ucode,create_time  "
					+ " from person_check_log where 1=1 " + sqlw2 + " and source = 'jwt' ) t  " + allSql
					+ " group by policephone,sfzh,SUBSTR(create_time,1,10)" + " ) g group by ucode";
		}else{
			countSql = "select ucode code,count(1) count from "
					+ " (select policeno,policephone,checkdept,sfzh,ucode from ("
					+ " select pcode policeno,police_phone policephone,check_address checkdept,idcard_no sfzh,ucode ucode,check_time create_time"
					+ "  from jwt_check_person_log_1501 e where e.check_source='lte' " + sqlw1 + " union all"
					+ " select policeno,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,checkdept ucode,create_time  "
					+ " from person_check_log where 1=1 " + sqlw2 + " and source = 'lte' ) t  " + allSql
					+ " group by policephone,sfzh,SUBSTR(create_time,1,10)" + " ) g group by ucode";
		}
		
		// }

		Log.info("核查数量:{}", countSql);
		ResultSet countResult = pageInquire.findPage(countSql);
		list = this.getCountList(countResult, code);
		return list;
	}

	public List<CountCheckLogVo> countComparByCode(String beginTime, String endTime, String code, String source) {
		List<CountCheckLogVo> list = new ArrayList<CountCheckLogVo>();

		String sqlw1 = this.getDSQuery(beginTime, endTime, code);
		String sqlw2 = this.getSSQuery(beginTime, endTime, code);

		// 比中数量
		String countSql = "";
		if(StringUtils.isNotBlank(source) && source.equals("jwt")){	
			countSql = "select ucode code,count(1) count from "
					+ " (select policeno,policephone,checkdept,sfzh,ucode from ("
					+ " select pcode policeno,police_phone policephone,check_address checkdept,idcard_no sfzh,ucode ucode,check_time create_time"
					+ "  from jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + sqlw1
					+ " AND ryhc_tag <> '' AND ryhc_tag IS NOT NULL " + " union all"
					+ " select policeno,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,checkdept ucode , create_time "
					+ " from person_check_log where 1=1 " + sqlw2
					+ " and source = 'jwt' AND tags <> '' AND tags IS NOT NULL) t  where checkdept in (select code from tb_d_hsxzqh) group by policephone,sfzh,SUBSTR(create_time,1,10)"
					+ " ) g group by ucode";
		}else{
			countSql = "select ucode code,count(1) count from "
					+ " (select policeno,policephone,checkdept,sfzh,ucode from ("
					+ " select pcode policeno,police_phone policephone,check_address checkdept,idcard_no sfzh,ucode ucode,check_time create_time"
					+ "  from jwt_check_person_log_1501 e where e.check_source='lte' " + sqlw1
					+ " AND ryhc_tag <> '' AND ryhc_tag IS NOT NULL " + " union all"
					+ " select policeno,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,checkdept ucode , create_time "
					+ " from person_check_log where 1=1 " + sqlw2
					+ " and source = 'lte' AND tags <> '' AND tags IS NOT NULL) t  where checkdept in (select code from tb_d_hsxzqh) group by policephone,sfzh,SUBSTR(create_time,1,10)"
					+ " ) g group by ucode";
		}
		Log.info("比中数量:{}", countSql);
		ResultSet countResult = pageInquire.findPage(countSql);
		list = this.getCountList(countResult, code);
		return list;
	}

	public List<CountCheckLogVo> countWarnByCode(String beginTime, String endTime, String code, String source) {
		List<CountCheckLogVo> list = new ArrayList<CountCheckLogVo>();

		String sqlw1 = this.getDSQuery(beginTime, endTime, code);
		String sqlw2 = this.getSSQuery(beginTime, endTime, code);

		// 预警数量
		String countSql = "";
		if(StringUtils.isNotBlank(source) && source.equals("jwt")){	
			countSql = "SELECT ucode code,count(1) count "
					+ " FROM (SELECT policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,personif,source,ucode"
					+ " FROM (SELECT pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,ucode,"
					+ " name,case when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') else "
					+ " IFNULL(qgztry,qgxfd) end tags,check_time create_time,ryhc_flag personif,check_source source"
					+ " FROM jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + sqlw1
					+ "	AND (qgztry is not null  or qgxfd is not null ) " + "AND concat(pcode,idcard_no)  NOT IN"
					+ " (SELECT concat(policeno,sfzh) FROM person_check_log WHERE personif = '01' and 1=1 " + sqlw2
					+ " and source = 'jwt')" + " UNION ALL"
					+ " SELECT policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,checkdept ucode,name,tags,"
					+ "  create_time,personif,source " + " FROM person_check_log where personif = '01' " + sqlw2
					+ " and source = 'jwt'"
					+ ") t  where checkdept in (select code from tb_d_hsxzqh)  group by policephone,sfzh,SUBSTR(create_time,1,10) ) g group by ucode";
		}else{
			countSql = "SELECT ucode code,count(1) count "
					+ " FROM (SELECT policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,personif,source,ucode"
					+ " FROM (SELECT pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,ucode,"
					+ " name,case when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') else "
					+ " IFNULL(qgztry,qgxfd) end tags,check_time create_time,ryhc_flag personif,check_source source"
					+ " FROM jwt_check_person_log_1501 e where e.check_source='lte' " + sqlw1
					+ "	AND (qgztry is not null  or qgxfd is not null ) " + "AND concat(pcode,idcard_no)  NOT IN"
					+ " (SELECT concat(policeno,sfzh) FROM person_check_log WHERE personif = '01' and 1=1 " + sqlw2
					+ " and source = 'lte')" + " UNION ALL"
					+ " SELECT policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,checkdept ucode,name,tags,"
					+ "  create_time,personif,source " + " FROM person_check_log where personif = '01' " + sqlw2
					+ " and source = 'lte'"
					+ ") t  where checkdept in (select code from tb_d_hsxzqh)  group by policephone,sfzh,SUBSTR(create_time,1,10) ) g group by ucode";
		}
		Log.info("预警数量:{}", countSql);
		ResultSet countResult = pageInquire.findPage(countSql);
		list = this.getCountList(countResult, code);
		return list;
	}

	public List<CountCheckLogVo> countSubWarnByCode(String beginTime, String endTime, String code, String type,
			String source) {
		List<CountCheckLogVo> list = new ArrayList<CountCheckLogVo>();
		// 预警数量
		String countSql = this.getSubWarnSqlQuery(beginTime, endTime, code, type, source);
		Log.info("预警细类{}:{}", type, countSql);
		ResultSet countResult = pageInquire.findPage(countSql);
		list = this.getCountList(countResult, code);
		return list;
	}

	private String getSubWarnSqlQuery(String beginTime, String endTime, String code, String type,String source) {
		String countSql = "";
		String sqlw1 = this.getDSQuery(beginTime, endTime, code);
		String sqlw2 = this.getSSQuery(beginTime, endTime, code);
		if(StringUtils.isNotBlank(source) && source.equals("jwt")){
			if (type.equals("ztCount")) {
				countSql = "select ucode code,count(1) count from "
						+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source, ucode from ("
						+ " select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
						+ " qgztry jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source,ucode"
						+ " from jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + sqlw1
						+ " and (qgztry is not null) and concat(police_phone,idcard_no) not in "
						+ " (select concat(policephone,sfzh) from person_check_log where personif = '01' " + sqlw2
						+ " and tags  like '%逃%' " + "  and source = 'jwt')" + " union all"
						+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',"
						+ " personif,source,checkdept ucode from person_check_log where personif = '01' and tags  like '%逃%' "
						+ sqlw2
						+ "	 and source = 'jwt' ) t group by policephone,sfzh,SUBSTR(create_time,1,10) ) g group by ucode";
			} else if (type.equals("sdCount")) {
				countSql = "select ucode code,count(1) count from "
						+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source,ucode from ("
						+ " select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
						+ " qgztry jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source,ucode"
						+ " from jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt')" + sqlw1
						+ " and (qgxfd is not null) and concat(police_phone,idcard_no) not in "
						+ " (select concat(policephone,sfzh) from person_check_log where personif = '01' " + sqlw2
						+ "	and tags  like '%毒%'  and source = 'jwt') union all"
						+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,"
						+ " source,checkdept ucode from person_check_log where personif = '01' and tags  like '%毒%' "
						+ sqlw2
						+ " and source = 'jwt' ) t group by policephone,sfzh,SUBSTR(create_time,1,10)) g group by ucode";
			} else if (type.equals("sfCount") || type.equals("sjCount") || type.equals("swCount")
					|| type.equals("skCount")) {
				String typeSql = "";
				if (type.equals("sfCount")) {
					typeSql = "and tags like '%访%'";
				} else if (type.equals("sjCount")) {
					typeSql = "and tags like '%疆%'";
				} else if (type.equals("swCount")) {
					typeSql = "and tags like '%稳%'";
				} else if (type.equals("skCount")) {
					typeSql = "and tags like '%恐%'";
				}
				countSql = "select ucode code,count(1) count from "
						+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,'',personif,source,ucode from ("
						+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source,"
						+ " checkdept ucode from person_check_log where personif = '01' " + sqlw2 + typeSql
						+ " and source = 'jwt' ) t group by policephone,sfzh,SUBSTR(create_time,1,10) ) g group by ucode";
			}
		}else{
			if (type.equals("ztCount")) {
				countSql = "select ucode code,count(1) count from "
						+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source, ucode from ("
						+ " select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
						+ " qgztry jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source,ucode"
						+ " from jwt_check_person_log_1501 e where e.check_source='lte' " + sqlw1
						+ " and (qgztry is not null) and concat(police_phone,idcard_no) not in "
						+ " (select concat(policephone,sfzh) from person_check_log where personif = '01' " + sqlw2
						+ " and tags  like '%逃%' " + "  and source = 'lte')" + " union all"
						+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',"
						+ " personif,source,checkdept ucode from person_check_log where personif = '01' and tags  like '%逃%' "
						+ sqlw2
						+ "	 and source = 'lte' ) t group by policephone,sfzh,SUBSTR(create_time,1,10) ) g group by ucode";
			} else if (type.equals("sdCount")) {
				countSql = "select ucode code,count(1) count from "
						+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source,ucode from ("
						+ " select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,"
						+ " qgztry jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source,ucode"
						+ " from jwt_check_person_log_1501 e where e.check_source='lte'" + sqlw1
						+ " and (qgxfd is not null) and concat(police_phone,idcard_no) not in "
						+ " (select concat(policephone,sfzh) from person_check_log where personif = '01' " + sqlw2
						+ "	and tags  like '%毒%'  and source = 'lte') union all"
						+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,"
						+ " source,checkdept ucode from person_check_log where personif = '01' and tags  like '%毒%' "
						+ sqlw2
						+ " and source = 'lte' ) t group by policephone,sfzh,SUBSTR(create_time,1,10)) g group by ucode";
			} else if (type.equals("sfCount") || type.equals("sjCount") || type.equals("swCount")
					|| type.equals("skCount")) {
				String typeSql = "";
				if (type.equals("sfCount")) {
					typeSql = "and tags like '%访%'";
				} else if (type.equals("sjCount")) {
					typeSql = "and tags like '%疆%'";
				} else if (type.equals("swCount")) {
					typeSql = "and tags like '%稳%'";
				} else if (type.equals("skCount")) {
					typeSql = "and tags like '%恐%'";
				}
				countSql = "select ucode code,count(1) count from "
						+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,'',personif,source,ucode from ("
						+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',personif,source,"
						+ " checkdept ucode from person_check_log where personif = '01' " + sqlw2 + typeSql
						+ " and source = 'lte' ) t group by policephone,sfzh,SUBSTR(create_time,1,10) ) g group by ucode";
			}
		}	
		
		return countSql;
	}

	public List<CountCheckLogVo> getCountList(ResultSet rs, String countCode) {
		List<CountCheckLogVo> countList = new ArrayList<CountCheckLogVo>();
		CountCheckLogVo unvo = new CountCheckLogVo();
		Map<String, String> map = dwdmService.getDwdmMap(countCode);

		int countAll = 0;
		try {
			while (rs.next()) {
				CountCheckLogVo vo = new CountCheckLogVo();
				String code = rs.getString("code");
				vo.setCode(code);
				vo.setCount(rs.getInt("count"));
				countAll += rs.getInt("count");
				if (code != null && !code.equals("")) {
					if (map.containsKey(code)) {
						vo.setName(map.get(code));
					} else {
						vo.setName(code);
					}
					countList.add(vo);
				} else {
					vo.setName("未知");
					unvo = vo;
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String name = "";
		if (countCode != null && !countCode.equals("")) {
			if ("150100".equals(countCode)) {
				name = "呼和浩特市公安局";
			} else {
				name = xzqhService.getXZQHByCode(countCode);
			}
		} else {
			name = "呼和浩特市";
		}
		CountCheckLogVo countVo = new CountCheckLogVo();
		countVo.setCode(countCode);
		countVo.setName(name);
		countVo.setCount(countAll);
		countList.add(0, countVo);

		if (unvo.getCount() > 0) {
			countList.add(unvo);
		}

		return countList;
	}

	public List<CheckDeviceListVo> listDeviceByCode(String beginTime, String endTime, String code, String source) {
		List<CheckDeviceListVo> list = new ArrayList<CheckDeviceListVo>();

		String sqlw1 = this.getDSQuery(beginTime, endTime, code);
		String sqlw2 = this.getSSQuery(beginTime, endTime, code);
		// 设备数量
		String countSql = "";
		if(StringUtils.isNotBlank(source) && source.equals("jwt")){
			countSql = "SELECT policeno,police_name,policephone,count(1) count FROM ("
					+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source from ("
					+ " select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,CONCAT(qgwffz) jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source"
					+ "  from jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + sqlw1 + " union all"
					+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',"
					+ " personif,source from person_check_log where 1=1 " + sqlw2 + " and source = 'jwt'"
					+ " ) t where checkdept in (select code from tb_d_hsxzqh)  group by policephone,sfzh,SUBSTR(create_time,1,10))"
					+ " )t1 group by policephone";
		}else{
			countSql = "SELECT policeno,police_name,policephone,count(1) count FROM ("
					+ " (select policeno,police_name,policephone,checkdept,sfzh,name,tags,create_time,jwttags,personif,source from ("
					+ " select pcode policeno,police_name,police_phone policephone,check_address checkdept,idcard_no sfzh,name,CONCAT(qgwffz) jwttags,check_time create_time,ryhc_tag tags,ryhc_flag personif,check_source source"
					+ "  from jwt_check_person_log_1501 e where e.check_source='lte' " + sqlw1 + " union all"
					+ " select policeno,police_name,policephone,SUBSTRING(checkdept,1,6) checkdept,sfzh,name,tags,create_time,'',"
					+ " personif,source from person_check_log where 1=1 " + sqlw2 + " and source = 'lte'"
					+ " ) t where checkdept in (select code from tb_d_hsxzqh)  group by policephone,sfzh,SUBSTR(create_time,1,10))"
					+ " )t1 group by policephone";
		}
		
		Log.info("设备统计:{}", countSql);
		ResultSet rs = pageInquire.findPage(countSql);
		try {
			while (rs.next()) {
				CheckDeviceListVo vo = new CheckDeviceListVo();
				vo.setPoliceName(rs.getString("police_name"));
				vo.setPoliceNo(rs.getString("policeno"));
				vo.setPolicePhone(rs.getString("policephone"));
				vo.setCount(rs.getInt("count"));
				list.add(vo);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return list;
	}

	public PageHelper listWarnByCode(WarnSearchByCodeVo warnSearchByCodeVo) {
		PageHelper pageHelper = new PageHelper();
		String dsQuery = this.getDSQuery(warnSearchByCodeVo.getBeginTime(), warnSearchByCodeVo.getEndTime(),
				warnSearchByCodeVo.getCode());
		String ssQuery = this.getSSQuery(warnSearchByCodeVo.getBeginTime(), warnSearchByCodeVo.getEndTime(),
				warnSearchByCodeVo.getCode());
		String countSql = "";
		if(StringUtils.isNotBlank(warnSearchByCodeVo.getSource()) && warnSearchByCodeVo.getSource().equals("jwt")){
			countSql = "select count(1) count from(select sfzh,policephone from"
					+ " (select idcard_no sfzh,police_phone policephone,check_address,check_time create_time,domicile_code"
					+ "  from jwt_check_person_log_1501 e  where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + dsQuery
					+ " and (qgztry is not null  or qgxfd is not null )  and concat(pcode,idcard_no) not in"
					+ " (select concat(policeno,sfzh) from person_check_log where personif = '01' " + ssQuery
					+ " and source = 'jwt')" + " union all"
					+ " select sfzh,policephone,SUBSTRING(checkdept,1,6) check_address,create_time,birthplace domicile_code from person_check_log where personif = '01' "
					+ ssQuery + " and source = 'jwt'"
					+ " ) t  where check_address in (select code from tb_d_hsxzqh)  group by policephone,sfzh,SUBSTR(create_time,1,10) )t1";
		}else{
			countSql = "select count(1) count from(select sfzh,policephone from"
					+ " (select idcard_no sfzh,police_phone policephone,check_address,check_time create_time,domicile_code"
					+ "  from jwt_check_person_log_1501 e  where e.check_source='lte' " + dsQuery
					+ " and (qgztry is not null  or qgxfd is not null )  and concat(pcode,idcard_no) not in"
					+ " (select concat(policeno,sfzh) from person_check_log where personif = '01' " + ssQuery
					+ " and source = 'lte')" + " union all"
					+ " select sfzh,policephone,SUBSTRING(checkdept,1,6) check_address,create_time,birthplace domicile_code from person_check_log where personif = '01' "
					+ ssQuery + " and source = 'lte'"
					+ " ) t  where check_address in (select code from tb_d_hsxzqh)  group by policephone,sfzh,SUBSTR(create_time,1,10) )t1";
		}
		Log.info("预警详情数量:{}", countSql);
		ResultSet rsCount = pageInquire.findPage(countSql);
		int count = this.getTotalCount(rsCount);

		String sql = "";
		if(StringUtils.isNotBlank(warnSearchByCodeVo.getSource()) && warnSearchByCodeVo.getSource().equals("jwt")){
			sql = "select tags,tags tags1 ,name,sfzh,"
					+ " case sex when '1' then '男' when '2' then '女' else '其他' end sex ,"
					+ " nation,create_time,(select name from tb_d_dwdm a where a.code = t.checkdept) checkdept, police_name,policephone,"
					+ " (select name from tb_d_hsxzqh m where m.code = t.check_address) check_address,check_place,domicile_code from"
					+ " ( select case "
					+ " when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') "
					+ " when qgztry is not null and qgxfd is null then '全国在逃人员' "
					+ " when qgztry is null and qgxfd is not null then '全国吸毒贩毒人员' end tags,"
					+ " name,idcard_no sfzh,sex,national nation,check_time create_time,ucode checkdept,police_name ,police_phone policephone,"
					+ " check_address check_address,check_place,domicile_code from jwt_check_person_log_1501 e where (e.check_source is null or e.check_source='' or e.check_source='jwt') " + dsQuery
					+ " and (qgztry is not null  or qgxfd is not null )  and concat(pcode,idcard_no) not in"
					+ " (select concat(policeno,sfzh) from person_check_log where personif = '01' " + ssQuery
					+ " and source = 'jwt')" + " union all"
					+ " select tags,name,sfzh,sex,nation,create_time,checkdept,police_name,policephone,SUBSTRING(checkdept,1,6) check_address,"
					+ " (select name from tb_d_dwdm u where u.code = lg_place) check_place,birthplace domicile_code  from person_check_log "
					+ "where personif = '01' " + ssQuery + " and source = 'jwt'"
					+ " ) t where check_address in (select code from tb_d_hsxzqh)"
					+ " group by policephone,sfzh,SUBSTR(create_time,1,10)";
		}else{
			sql = "select tags,tags tags1 ,name,sfzh,"
					+ " case sex when '1' then '男' when '2' then '女' else '其他' end sex ,"
					+ " nation,create_time,(select name from tb_d_dwdm a where a.code = t.checkdept) checkdept, police_name,policephone,"
					+ " (select name from tb_d_hsxzqh m where m.code = t.check_address) check_address,check_place,domicile_code from"
					+ " ( select case "
					+ " when qgztry is not null and qgxfd is not null then concat('全国在逃人员,','全国吸毒贩毒人员') "
					+ " when qgztry is not null and qgxfd is null then '全国在逃人员' "
					+ " when qgztry is null and qgxfd is not null then '全国吸毒贩毒人员' end tags,"
					+ " name,idcard_no sfzh,sex,national nation,check_time create_time,ucode checkdept,police_name ,police_phone policephone,"
					+ " check_address check_address,check_place,domicile_code from jwt_check_person_log_1501 e where e.check_source='lte' " + dsQuery
					+ " and (qgztry is not null  or qgxfd is not null )  and concat(pcode,idcard_no) not in"
					+ " (select concat(policeno,sfzh) from person_check_log where personif = '01' " + ssQuery
					+ " and source = 'lte')" + " union all"
					+ " select tags,name,sfzh,sex,nation,create_time,checkdept,police_name,policephone,SUBSTRING(checkdept,1,6) check_address,"
					+ " (select name from tb_d_dwdm u where u.code = lg_place) check_place,birthplace domicile_code  from person_check_log "
					+ "where personif = '01' " + ssQuery + " and source = 'lte'"
					+ " ) t where check_address in (select code from tb_d_hsxzqh)"
					+ " group by policephone,sfzh,SUBSTR(create_time,1,10)";
		}
		String listSQL = sql + " order by tags desc limit "
				+ (warnSearchByCodeVo.getPageno() - 1) * warnSearchByCodeVo.getSize() + " , "
				+ warnSearchByCodeVo.getSize();

		Log.info("预警详情:{}", listSQL);
		ResultSet rs = pageInquire.findPage(listSQL);
		List<CheckPersonListVo> warnList = this.getWarnList(rs);

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

	public Integer getTotalCount(ResultSet resultSet) {
		Integer count = 0;
		try {
			if (resultSet.next()) {
				count = Integer.parseInt(resultSet.getString("count"));
			}
		} catch (NumberFormatException e1) {
			e1.printStackTrace();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		return count;
	}

	public List<CheckPersonListVo> getWarnList(ResultSet rs) {
		JsonNode nationalJsonNode = dictionaryService.getNational();
		List<CheckPersonListVo> list = new ArrayList<CheckPersonListVo>();
		Map<String,String> listReHjdqhCategoryMap = this.importantPersonCategoryService.listReHjdqhCategoryMap();
		String domicile_code = "";
		String domicile_name = "";
		String sfzh = "";
		try {
			if (rs != null) {
				while (rs.next()) {
					CheckPersonListVo vo = new CheckPersonListVo();
					vo.setPersonType(rs.getString("tags"));
					vo.setTags(rs.getString("tags1"));
					vo.setName(rs.getString("name"));
					sfzh = rs.getString("sfzh");
					vo.setSfzh(sfzh);
					vo.setSex(rs.getString("sex"));
					String nation = rs.getString("nation");
					if (StringUtils.isNotBlank(nation)) {
						if (nationalJsonNode.get(nation) != null) {
							nation = nationalJsonNode.get(nation).asText();
						}
						vo.setNation(nation);
					} else {
						vo.setNation("");
					}
					vo.setCreateTime(rs.getString("create_time"));
					vo.setCheckdept(rs.getString("checkdept"));
					vo.setPoliceName(rs.getString("police_name"));
					vo.setPolicephone(rs.getString("policephone"));
					vo.setCheckAddress(rs.getString("check_address"));
					vo.setCheckPlace(rs.getString("check_place"));
			
					Pattern pattern = Pattern.compile("[0-9]*"); 
					domicile_code = rs.getString("domicile_code");
					if(null != domicile_code && !"".equals(domicile_code.trim())){
						domicile_name = listReHjdqhCategoryMap.get(domicile_code);
					}else if(null != sfzh && sfzh.length() > 6){
						domicile_name = listReHjdqhCategoryMap.get(sfzh.substring(0,6));
					}
					vo.setHjdPlace(domicile_name);
					list.add(vo);
				}
			}
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		return list;
	}

}
