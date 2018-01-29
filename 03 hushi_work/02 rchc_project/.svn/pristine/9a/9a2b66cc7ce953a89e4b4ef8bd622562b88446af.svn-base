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
import com.minginglamp.vo.CheckPlateListVo;
import com.minginglamp.vo.CountpersonCheckLogDeptVo;
import com.minginglamp.vo.WarnSearchByCodeVo;

@Service
public class CountPlateCheckJCZService {

	@Autowired
	PageInquire pageInquire;

	@Autowired
	private CountPlateCheckService countPlateCheckService;

	public List<CountpersonCheckLogDeptVo> countPlateCheckdept(String beginTime, String endTime, String source) {
		List<CountpersonCheckLogDeptVo> list = new ArrayList<CountpersonCheckLogDeptVo>();

		String sqlw1 = this.countPlateCheckService.getQuery(beginTime, endTime, "");
		if(source.equals("jcz")){
			source = "jwt";
		}else{
			source = "lte";
		}
		// 核查数量
		String checkCountSql = "select jcz_name code ,count(1) count from ( "
				+ " select policeno pcode,plate_no idcard_no,create_time,policephone,"
				+ "	(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
				+ "	SUBSTRING(checkdept,1,6) check_address from plate_check_log t where 1=1 " + sqlw1
				+ "	and source='"+source+"' and policephone is not null "
				+ " and t.policephone in (select police_phone from tb_m_jcz_jwt) "
				+ " group by policephone,idcard_no,SUBSTR(create_time,1,10) ) g group by jcz_name ";
		Log.info("核查数量:{}", checkCountSql);
		ResultSet checkCountResult = pageInquire.findPage(checkCountSql);
		Map<String, Integer> checkCountMap = this.countPlateCheckService.getCountMap(checkCountResult);

		// 比中数量
		String comparCountSql = "select jcz_name code ,count(1) count from ( "
				+ " select policeno pcode,plate_no idcard_no,create_time,policephone,"
				+ "	(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
				+ "	SUBSTRING(checkdept,1,6) check_address from plate_check_log t where 1=1 " + sqlw1
				+ "	and source='"+source+"' and policephone is not null  and tags <> '' and tags is not null "
				+ " and t.policephone in (select police_phone from tb_m_jcz_jwt) "
				+ " group by policephone,idcard_no,SUBSTR(create_time,1,10) ) g group by jcz_name ";
		Log.info("比中数量:{}", comparCountSql);
		ResultSet comparCountResult = pageInquire.findPage(comparCountSql);
		Map<String, Integer> comparCountMap = this.countPlateCheckService.getCountMap(comparCountResult);

		// 预警数量
		String warnCountSql = "select  jcz_name code,count(1) count from ( "
				+ " select policeno pcode,plate_no idcard_no,create_time,policephone,"
				+ "	(select jcz_name from tb_m_jcz_jwt l where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,"
				+ "	SUBSTRING(checkdept,1,6) check_address from plate_check_log t where 1=1" + sqlw1
				+ " and source='"+source+"' and personif = '01' and policephone is not null and policephone is not null and tags <> '' and tags is not null "
				+ " and t.policephone in (select police_phone from tb_m_jcz_jwt) "
				+ " group by policephone,idcard_no,SUBSTR(create_time,1,10) ) g group by jcz_name ";
		Log.info("预警数量:{}", warnCountSql);
		ResultSet warnCountResult = pageInquire.findPage(warnCountSql);
		Map<String, Integer> warnCountMap = this.countPlateCheckService.getCountMap(warnCountResult);
		Log.debug(checkCountSql);

		// - 车辆预警分类统计
		String categoryCountSql = "select AA.检查站 code,AA.检查站 name,IFNULL(AA.在逃人数,0) zt_count,IFNULL(BB.涉毒人数,0) sd_count,IFNULL(CC.涉访人数,0) sf_count,"
				+ " IFNULL(DD.涉疆人数,0) sj_count,IFNULL(EE.涉恐人数,0) sk_count,IFNULL(FF.涉稳人数,0) sw_count,IFNULL(GG.大庆关注车辆数,0) dq_count  from "
				+ " (select DISTINCT p.jcz_name 检查站,IFNULL(j.count,0) 在逃人数 from tb_m_jcz_jwt p  LEFT JOIN"
				+ " (select  jcz_name,count(1) count from ("
				+ " select policeno pcode,plate_no idcard_no,create_time,policephone,(select jcz_name from tb_m_jcz_jwt l"
				+ " where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,SUBSTRING(checkdept,1,6) check_address"
				+ " from plate_check_log t where source='"+source+"' " + sqlw1
				+ " and personif = '01' and policephone is not null and tags like '%逃%'"
				+ " and t.policephone in (select police_phone from tb_m_jcz_jwt)"
				+ " group by policephone,idcard_no,SUBSTR(create_time,1,10)" + " ) g group by jcz_name "
				+ " ) j on p.jcz_name = j.jcz_name order by p.jcz_name" + " ) AA,"
				// -- 车辆涉毒
				+ " (select DISTINCT p.jcz_name name,IFNULL(j.count,0) 涉毒人数 from tb_m_jcz_jwt p  LEFT JOIN"
				+ " (select  jcz_name,count(1) count from ("
				+ " select policeno pcode,plate_no idcard_no,create_time,policephone,(select jcz_name from tb_m_jcz_jwt l"
				+ " where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,SUBSTRING(checkdept,1,6) check_address"
				+ " from plate_check_log t where source='"+source+"' " + sqlw1
				+ " and personif = '01' and policephone is not null and tags like '%毒%'"
				+ " and t.policephone in (select police_phone from tb_m_jcz_jwt)"
				+ " group by policephone,idcard_no,SUBSTR(create_time,1,10)" + " ) g group by jcz_name "
				+ " ) j on p.jcz_name = j.jcz_name order by p.jcz_name" + " ) BB,"
				// -- 车辆上访
				+ " (select DISTINCT p.jcz_name name,IFNULL(j.count,0) 涉访人数 from tb_m_jcz_jwt p  LEFT JOIN"
				+ " (select  jcz_name,count(1) count from ("
				+ " select policeno pcode,plate_no idcard_no,create_time,policephone,(select jcz_name from tb_m_jcz_jwt l"
				+ " where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,SUBSTRING(checkdept,1,6) check_address"
				+ " from plate_check_log t  where source='"+source+"' " + sqlw1
				+ " and personif = '01' and policephone is not null and tags like '%访%'"
				+ " and t.policephone in (select police_phone from tb_m_jcz_jwt)"
				+ " group by policephone,idcard_no,SUBSTR(create_time,1,10)" + " ) g group by jcz_name "
				+ " ) j on p.jcz_name = j.jcz_name order by p.jcz_name" + " ) CC,"
				// -- 车辆 涉疆
				+ " (select DISTINCT p.jcz_name name,IFNULL(j.count,0) 涉疆人数 from tb_m_jcz_jwt p  LEFT JOIN"
				+ " (select  jcz_name,count(1) count from ("
				+ " select policeno pcode,plate_no idcard_no,create_time,policephone,(select jcz_name from tb_m_jcz_jwt l"
				+ " where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,SUBSTRING(checkdept,1,6) check_address"
				+ " from plate_check_log t  where source='"+source+"' " + sqlw1
				+ " and source='jwt' and personif = '01' and policephone is not null and tags like '%疆%'"
				+ " and t.policephone in (select police_phone from tb_m_jcz_jwt)"
				+ " group by policephone,idcard_no,SUBSTR(create_time,1,10)" + " ) g group by jcz_name "
				+ " ) j on p.jcz_name = j.jcz_name order by p.jcz_name" + " ) DD,"
				// -- 车辆 涉恐
				+ " (select DISTINCT p.jcz_name name,IFNULL(j.count,0) 涉恐人数 from tb_m_jcz_jwt p  LEFT JOIN"
				+ " (select  jcz_name,count(1) count from ("
				+ " select policeno pcode,plate_no idcard_no,create_time,policephone,(select jcz_name from tb_m_jcz_jwt l"
				+ " where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,SUBSTRING(checkdept,1,6) check_address"
				+ " from plate_check_log t  where source='"+source+"' " + sqlw1
				+ " and personif = '01' and policephone is not null and tags like '%恐%'"
				+ " and t.policephone in (select police_phone from tb_m_jcz_jwt)"
				+ " group by policephone,idcard_no,SUBSTR(create_time,1,10)" + " ) g group by jcz_name "
				+ " ) j on p.jcz_name = j.jcz_name order by p.jcz_name" + " ) EE,"
				// -- 车辆涉稳
				+ " (select DISTINCT p.jcz_name name,IFNULL(j.count,0) 涉稳人数 from tb_m_jcz_jwt p  LEFT JOIN"
				+ " (select  jcz_name,count(1) count from ("
				+ " select policeno pcode,plate_no idcard_no,create_time,policephone,(select jcz_name from tb_m_jcz_jwt l"
				+ " where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,SUBSTRING(checkdept,1,6) check_address"
				+ " from plate_check_log t  where source='"+source+"' " + sqlw1
				+ " and personif = '01' and policephone is not null and tags like '%稳%'"
				+ " and t.policephone in (select police_phone from tb_m_jcz_jwt)"
				+ " group by policephone,idcard_no,SUBSTR(create_time,1,10)" + " ) g group by jcz_name "
				+ " ) j on p.jcz_name = j.jcz_name order by p.jcz_name" + " ) FF,"
				// -- 大庆关注车辆
				+ " (select DISTINCT p.jcz_name name,IFNULL(j.count,0) 大庆关注车辆数 from tb_m_jcz_jwt p  LEFT JOIN"
				+ " (select  jcz_name,count(1) count from ("
				+ " select policeno pcode,plate_no idcard_no,create_time,policephone,(select jcz_name from tb_m_jcz_jwt l"
				+ " where l.police_phone = t.policephone and l.police_phone <> '') jcz_name,SUBSTRING(checkdept,1,6) check_address"
				+ " from plate_check_log t  where source='"+source+"' " + sqlw1
				+ " and personif = '01' and policephone is not null and tags like '%大庆关注%'"
				+ " and t.policephone in (select police_phone from tb_m_jcz_jwt)"
				+ " group by policephone,idcard_no,SUBSTR(create_time,1,10)" + " ) g group by jcz_name "
				+ " ) j on p.jcz_name = j.jcz_name order by p.jcz_name" + " ) GG"
				+ " where AA.检查站 = BB.name and BB.name = CC.name and CC.name = DD.name and DD.name = EE.name and EE.name = FF.name and EE.name = GG.name;";
		Log.info("警数分类:{}", categoryCountSql);
		ResultSet rs = pageInquire.findPage(categoryCountSql);

		list = this.countPlateCheckService.getList(rs, checkCountMap, comparCountMap, warnCountMap,
				new HashMap<String, Integer>());

		return list;
	}

	public PageHelper listWarnByCode(WarnSearchByCodeVo warnSearchByCodeVo) {
		PageHelper pageHelper = new PageHelper();

		String sqlw1 = this.countPlateCheckService.getQuery(warnSearchByCodeVo.getBeginTime(),
				warnSearchByCodeVo.getEndTime(), "");
		String codeSql = "";
		if (StringUtils.isNotBlank(warnSearchByCodeVo.getCode())) {
			codeSql = " where jcz_name = '" + warnSearchByCodeVo.getCode() + "' OR jcz_name like '%"
					+ warnSearchByCodeVo.getCode() + "%' ";
		}

		String countSql = "select count(1) count from"
				+ " (select plate_no,policephone  from plate_check_log b where 1=1 " + sqlw1
				+ " and personif = '01' and source='jwt' and policephone in (select police_phone from tb_m_jcz_jwt  "
				+ codeSql + ") group by plate_no,policephone,SUBSTR(create_time,1,10)) t";
		Log.info("预警详情数量:{}", countSql);
		ResultSet rsCount = pageInquire.findPage(countSql);
		int count = this.countPlateCheckService.getTotalCount(rsCount);

		String sql = "select tags,plate_no,name,create_time,check_address,"
				+ "	(select name from tb_d_dwdm a where a.code = b.checkdept) checkdept,police_name,policephone,sfzh,plate_type "
				+ "	from plate_check_log b where 1=1 " + sqlw1 + " and personif = '01' and source='jwt' "
				+ "	and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ")"
				+ "	group by plate_no,policephone,SUBSTR(create_time,1,10)";

		String listSQL = sql + " order by tags desc limit "
				+ (warnSearchByCodeVo.getPageno() - 1) * warnSearchByCodeVo.getSize() + " , "
				+ warnSearchByCodeVo.getSize();

		Log.info("预警详情:{}", listSQL);
		ResultSet rs = pageInquire.findPage(listSQL);
		List<CheckPlateListVo> warnList = this.countPlateCheckService.getWarnList(rs);

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

	public PageHelper listDetailsByCode(WarnSearchByCodeVo warnSearchByCodeVo) {
		PageHelper pageHelper = new PageHelper();

		String qqQuery = this.getListQuery(warnSearchByCodeVo);

		String countSql = "select count(1) count from"
				+ " (select plate_no,policephone  from plate_check_log b where 1=1 " + qqQuery
				+ " group by plate_no,policephone,SUBSTR(create_time,1,10)) t";
		Log.info("其他详情数量{}:{}", warnSearchByCodeVo.getType(), countSql);
		ResultSet rsCount = pageInquire.findPage(countSql);
		int count = this.countPlateCheckService.getTotalCount(rsCount);

		String sql = "select tags,plate_no,name,create_time,check_address,"
				+ "	(select name from tb_d_dwdm a where a.code = b.checkdept) checkdept,police_name,policephone,sfzh,plate_type "
				+ "	from plate_check_log b where 1=1 " + qqQuery
				+ "	group by plate_no,policephone,SUBSTR(create_time,1,10)";

		String listSQL = sql + " order by tags desc limit "
				+ (warnSearchByCodeVo.getPageno() - 1) * warnSearchByCodeVo.getSize() + " , "
				+ warnSearchByCodeVo.getSize();

		Log.info("其他详情列表{}:{}", warnSearchByCodeVo.getType(), listSQL);
		ResultSet rs = pageInquire.findPage(listSQL);
		List<CheckPlateListVo> warnList = this.countPlateCheckService.getWarnList(rs);

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

	public String getListQuery(WarnSearchByCodeVo warnSearchByCodeVo) {
		String sql = "";
		String source = "";
		if(warnSearchByCodeVo.getSource().equals("jcz")){
			source = "jwt";
		}else{
			source = "lte";
		}
		String sqlw1 = this.countPlateCheckService.getQuery(warnSearchByCodeVo.getBeginTime(),
				warnSearchByCodeVo.getEndTime(), "");
		String codeSql = "";
		if (StringUtils.isNotBlank(warnSearchByCodeVo.getCode())) {
			codeSql = " where jcz_name = '" + warnSearchByCodeVo.getCode() + "' OR jcz_name like '%"
					+ warnSearchByCodeVo.getCode() + "%' ";
		}

		if (warnSearchByCodeVo.getType().equals("checkCount")) {
			sql = sqlw1 + " and source='"+source+"' and policephone is not null "
					+ " and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ")";
		} else if (warnSearchByCodeVo.getType().equals("comparCount")) {
			sql = sqlw1 + "	and source='"+source+"' and policephone is not null  and tags <> '' and tags is not null "
					+ " and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ") ";
		} else if (warnSearchByCodeVo.getType().equals("warnCount")) {
			sql = sqlw1
					+ " and source='"+source+"' and personif = '01' and policephone is not null and tags <> '' and tags is not null "
					+ " and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ")";
		} else if (warnSearchByCodeVo.getType().equals("ztCount")) {
			sql = sqlw1 + " and source='"+source+"' and personif = '01' and policephone is not null and tags like '%逃%'"
					+ " and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ")";
		} else if (warnSearchByCodeVo.getType().equals("sdCount")) {
			sql = sqlw1 + " and source='"+source+"' and personif = '01' and policephone is not null and tags like '%毒%'"
					+ " and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ")";
		} else if (warnSearchByCodeVo.getType().equals("sfCount")) {
			sql = sqlw1 + " and source='"+source+"' and personif = '01' and policephone is not null and tags like '%访%'"
					+ " and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ")";
		} else if (warnSearchByCodeVo.getType().equals("sjCount")) {
			sql = sqlw1 + " and source='"+source+"' and personif = '01' and policephone is not null and tags like '%疆%'"
					+ " and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ")";
		} else if (warnSearchByCodeVo.getType().equals("skCount")) {
			sql = sqlw1 + " and source='"+source+"' and personif = '01' and policephone is not null and tags like '%恐%'"
					+ " and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ")";
		} else if (warnSearchByCodeVo.getType().equals("swCount")) {
			sql = sqlw1 + " and source='"+source+"' and personif = '01' and policephone is not null and tags like '%稳%'"
					+ " and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ")";
		} else if (warnSearchByCodeVo.getType().equals("dqCount")) {
			sql = sqlw1 + "  and source='"+source+"' and personif = '01' and policephone is not null and tags like '%大庆关注%'"
					+ " and policephone in (select police_phone from tb_m_jcz_jwt " + codeSql + ")";
		}

		return sql;
	}

}
