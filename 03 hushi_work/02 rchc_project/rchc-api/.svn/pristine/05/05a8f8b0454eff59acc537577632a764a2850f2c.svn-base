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
public class CountPersonCheckJJService {

	@Autowired
	private PageInquire pageInquire;

	@Autowired
	private CountPersonCheckService countPersonCheckService;

	public List<CountpersonCheckLogDeptVo> countPersonCheck(String beginTime, String endTime) {

		String sqlw1 = this.countPersonCheckService.getSSQuery(beginTime, endTime, "");
		List<CountpersonCheckLogDeptVo> list = new ArrayList<CountpersonCheckLogDeptVo>();
		// 核查数量
		String checkCountSql = "select check_address code ,count(1) count from person_check_log  " + "where 1=1 "
				+ sqlw1 + " and source='jj' group by check_address ";
		Log.info("核查数量:{}", checkCountSql);
		ResultSet checkCountResult = pageInquire.findPage(checkCountSql);
		Map<String, Integer> checkCountMap = this.countPersonCheckService.getCountMap(checkCountResult);

		// 比中数量
		String comparCountSql = "select check_address code ,count(1) count from person_check_log where 1=1 " + sqlw1
				+ "and source='jj' and tags <> '' and tags <> '无背景' and tags is not null group by check_address ";
		Log.info("比中数量:{}", comparCountSql);
		ResultSet comparCountResult = pageInquire.findPage(comparCountSql);
		Map<String, Integer> comparCountMap = this.countPersonCheckService.getCountMap(comparCountResult);

		// 预警数量
		String warnCountSql = "select check_address code,count(1) count from  person_check_log where 1=1 " + sqlw1
				+ " and personif = '01' and source='jj'  group by check_address";
		Log.info("预警数量:{}", warnCountSql);
		ResultSet warnCountResult = pageInquire.findPage(warnCountSql);
		Map<String, Integer> warnCountMap = this.countPersonCheckService.getCountMap(warnCountResult);
		Log.debug(checkCountSql);

		// 设备数量

		// - 车辆预警分类统计
		String categoryCountSql = "select AA.code name,AA.code code,IFNULL(AA.count,0) zt_count,IFNULL(BB.count,0) sd_count,"
				+ " IFNULL(CC.count,0) sf_count,IFNULL(DD.count,0) sj_count,IFNULL(EE.count,0) sk_count,IFNULL(FF.count,0) sw_count "
				+ "  from (select DISTINCT p.jcz_name code,j.count count from tb_m_jcz_jwt p   LEFT JOIN"
				+ " (select check_address code,count(1) count from person_check_log where 1=1 " + sqlw1
				+ " and personif = '01' and source='jj' and tags like '%逃%' group by check_address) j on p.jcz_name = j.code order by p.jcz_name ) AA,"
				// -- 车辆涉毒
				+ " 	(select DISTINCT p.jcz_name code,j.count count from tb_m_jcz_jwt p   LEFT JOIN"
				+ " (select check_address code,count(1) count from person_check_log where 1=1 " + sqlw1
				+ " and personif = '01' and source='jj' and tags like '%毒%' group by check_address) j on p.jcz_name = j.code order by p.jcz_name ) BB,"
				// -- 车辆上访
				+ " (select DISTINCT p.jcz_name code,j.count count from tb_m_jcz_jwt p   LEFT JOIN"
				+ " (select check_address code,count(1) count from person_check_log where 1=1 " + sqlw1
				+ " and personif = '01' and source='jj' and tags like '%访%' group by check_address) j on p.jcz_name = j.code order by p.jcz_name ) CC,"
				// -- 车辆 涉疆
				+ " (select DISTINCT p.jcz_name code,j.count count from tb_m_jcz_jwt p   LEFT JOIN"
				+ " (select check_address code,count(1) count from person_check_log where 1=1 " + sqlw1
				+ " and personif = '01' and source='jj' and tags like '%疆%' group by check_address) j on p.jcz_name = j.code order by p.jcz_name ) DD,"
				// -- 车辆 涉恐
				+ " (select DISTINCT p.jcz_name code,j.count count from tb_m_jcz_jwt p   LEFT JOIN"
				+ " (select check_address code,count(1) count from person_check_log where 1=1 " + sqlw1
				+ " and personif = '01' and source='jj' and tags like '%恐%' group by check_address) j on p.jcz_name = j.code order by p.jcz_name ) EE,"
				// -- 车辆涉稳
				+ " (select DISTINCT p.jcz_name code,j.count count from tb_m_jcz_jwt p   LEFT JOIN"
				+ " (select check_address code,count(1) count from person_check_log where 1=1 " + sqlw1
				+ " and personif = '01' and source='jj' and tags like '%稳%' group by check_address) j on p.jcz_name = j.code order by p.jcz_name ) FF"
				+ " where AA.code = BB.code and BB.code = CC.code and CC.code = DD.code and DD.code = EE.code and EE.code = FF.code";
		Log.info("警数分类:{}", categoryCountSql);
		ResultSet rs = pageInquire.findPage(categoryCountSql);

		list = this.countPersonCheckService.getList(rs, checkCountMap, comparCountMap, warnCountMap,
				new HashMap<String, Integer>());
		return list;
	}

	public PageHelper listDetailsByCode(WarnSearchByCodeVo warnSearchByCodeVo) {
		PageHelper pageHelper = new PageHelper();

		String ssQuery = this.getSSListQuery(warnSearchByCodeVo);

		String countSql = "select count(1) count from"
				+ " (select tags,tags tags1,name,sfzh,sex,nation,create_time,checkdept,police_name,policephone,check_address from person_check_log "
				+ " where 1=1 " + ssQuery + " ) t ";

		Log.info("其他详情数量{}:{}", warnSearchByCodeVo.getType(), countSql);
		ResultSet rsCount = pageInquire.findPage(countSql);
		int count = this.countPersonCheckService.getTotalCount(rsCount);

		String sql = "select tags,tags1 ,name,sfzh,"
				+ " case sex when '1' then '男' when '2' then '女' else '其他' end sex ,"
				+ " nation,create_time, checkdept, police_name,policephone,check_address,check_place,domicile_code from"
				+ " (select tags,tags tags1,name,sfzh,sex,nation,create_time,checkdept,police_name,policephone,check_address,"
				+ " (select name from tb_d_dwdm u where u.code = lg_place) check_place,birthplace domicile_code  from person_check_log "
				+ " where 1=1 " + ssQuery + ") t ";

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

	public String getSSListQuery(WarnSearchByCodeVo warnSearchByCodeVo) {
		String sql = "";

		String ssQuery = "";
		if (StringUtils.isNotBlank(warnSearchByCodeVo.getBeginTime())
				&& StringUtils.isNotBlank(warnSearchByCodeVo.getEndTime())) {
			ssQuery = " and create_time > '" + warnSearchByCodeVo.getBeginTime() + "' and create_time < '"
					+ warnSearchByCodeVo.getEndTime() + "'";
		}
		if (StringUtils.isNotBlank(warnSearchByCodeVo.getCode())) {
			ssQuery += " and check_address = '" + warnSearchByCodeVo.getCode() + "'";
		} else {
			ssQuery += " and check_address in (select jcz_name from tb_m_jcz_jwt) ";
		}

		if (warnSearchByCodeVo.getType().equals("checkCount")) {
			sql = ssQuery + "  and source = 'jj' ";
		} else if (warnSearchByCodeVo.getType().equals("comparCount")) {
			sql = ssQuery + "  and source = 'jj' and tags <> '' and tags <> '无背景' and tags is not null ";
		} else if (warnSearchByCodeVo.getType().equals("warnCount")) {
			sql = ssQuery + "  and source = 'jj' and personif = '01' ";
		} else if (warnSearchByCodeVo.getType().equals("ztCount")) {
			sql = ssQuery + "  and source = 'jj' and personif = '01' and tags like '%逃%' ";
		} else if (warnSearchByCodeVo.getType().equals("sdCount")) {
			sql = ssQuery + "  and source = 'jj' and personif = '01' and tags like '%毒%' ";
		} else if (warnSearchByCodeVo.getType().equals("sfCount")) {
			sql = ssQuery + "  and source = 'jj' and personif = '01' and tags like '%访%' ";
		} else if (warnSearchByCodeVo.getType().equals("sjCount")) {
			sql = ssQuery + "  and source = 'jj' and personif = '01' and tags like '%疆%' ";
		} else if (warnSearchByCodeVo.getType().equals("skCount")) {
			sql = ssQuery + "  and source = 'jj' and personif = '01' and tags like '%恐%' ";
		} else if (warnSearchByCodeVo.getType().equals("swCount")) {
			sql = ssQuery + "  and source = 'jj' and personif = '01' and tags like '%稳%' ";
		}

		return sql;
	}
}
