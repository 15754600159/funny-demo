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
import com.minginglamp.vo.CheckPersonListVo;
import com.minginglamp.vo.CountpersonCheckLogDeptVo;
import com.minginglamp.vo.WarnSearchByCodeVo;

@Service
public class CountPersonCheckXFJService {
	@Autowired
	private PageInquire pageInquire;
	@Autowired
	private CountPersonCheckService countPersonCheckService;
	@Autowired
	private ImportantPersonCategoryService importantPersonCategoryService;
	
	public List<CountpersonCheckLogDeptVo> countPersonCheck(String beginTime, String endTime){
		String sqlw1 = this.getXFJQuery(beginTime, endTime, "");
		List<CountpersonCheckLogDeptVo> list = new ArrayList<CountpersonCheckLogDeptVo>();
		// 核查数量
		String checkCountSql = "SELECT stationname code,count(1) count FROM nmxf_id_person_2017 " + "where 1=1 "
				+ sqlw1 + "  group by stationname ";
		Log.info("核查数量:{}", checkCountSql);
		ResultSet checkCountResult = pageInquire.findPage(checkCountSql);
		Map<String, Integer> checkCountMap = this.countPersonCheckService.getCountMap(checkCountResult);
		
		// 比中数量
		String comparCountSql = "SELECT stationname code,count(1) count FROM nmxf_id_person_2017 where 1=1 " + sqlw1
				+ "and dubious <> '0' AND dubious <> '' AND dubious is not null group by stationname ";
		Log.info("比中数量:{}", comparCountSql);
		ResultSet comparCountResult = pageInquire.findPage(comparCountSql);
		Map<String, Integer> comparCountMap = this.countPersonCheckService.getCountMap(comparCountResult);
		
		// 预警数量
		String warnCountSql = "SELECT stationname code,count(1) count FROM nmxf_id_person_2017 where 1=1 " + sqlw1
				+ "and dubious <> '0' AND dubious <> '' AND dubious is not null group by stationname ";
		Log.info("预警数量:{}", warnCountSql);
		ResultSet warnCountResult = pageInquire.findPage(warnCountSql);
		Map<String, Integer> warnCountMap = this.countPersonCheckService.getCountMap(warnCountResult);
		Log.debug(checkCountSql);
		
		
		// - 信访预警分类统计
		String categoryCountSql = "select ifnull(EE.code,'') name,ifnull(EE.code,'') code,AA.count sk_count,BB.count sw_count,CC.count zt_count,DD.count sd_count,EE.count sf_count,0 sj_count from "
				+ "(select stationname code,count(1) count from nmxf_id_person_2017 a where dubious = '1' " + sqlw1+") AA,"
				+ "(select stationname code,count(1) count from nmxf_id_person_2017 b where dubious = '2' " + sqlw1+") BB,"
				+ "(select stationname code,count(1) count from nmxf_id_person_2017 c where dubious = '3' " + sqlw1+") CC,"
				+ "(select stationname code,count(1) count from nmxf_id_person_2017 d where dubious = '4' " + sqlw1+") DD,"
				+ "(select stationname code,count(1) count from nmxf_id_person_2017 e where dubious = '7' " + sqlw1+") EE";
		Log.info("警数分类:{}", categoryCountSql);
		ResultSet rs = pageInquire.findPage(categoryCountSql);
		list = this.countPersonCheckService.getList(rs, checkCountMap, comparCountMap, warnCountMap,
				new HashMap<String, Integer>());
		return list;
	}
	
	public PageHelper listDetailsByCode(WarnSearchByCodeVo warnSearchByCodeVo){
		PageHelper pageHelper = new PageHelper();
		String xfQuery = this.getSSListQuery(warnSearchByCodeVo);
		String countSql = "select t.count from"
				+ " ( SELECT createtime,stationname code,count(1) count FROM nmxf_id_person_2017"
				+ " where 1=1 " + xfQuery + " ) t ";
		Log.info("其他详情数量{}:{}", warnSearchByCodeVo.getType(), countSql);
		ResultSet rsCount = pageInquire.findPage(countSql);
		int count = this.countPersonCheckService.getTotalCount(rsCount);
		
		String sql = "select *,(select name from zd_cardtype z where z.code=dubious) tags from nmxf_id_person_2017 "
				+ " where 1=1 " + xfQuery ; 
		String listSQL = sql + " order by tags desc limit "
				+ (warnSearchByCodeVo.getPageno() - 1) * warnSearchByCodeVo.getSize() + " , "
				+ warnSearchByCodeVo.getSize();
		Log.info("其他详情列表{}:{}", warnSearchByCodeVo.getType(), listSQL);
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
	public List<CheckPersonListVo> getWarnList(ResultSet rs) {
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
					vo.setName(rs.getString("name"));
					sfzh = rs.getString("cardno");
					vo.setSfzh(sfzh);
					vo.setSex(rs.getString("sex"));
					vo.setNation(rs.getString("nation"));
					vo.setCreateTime(rs.getString("createtime"));
					vo.setCheckdept(rs.getString("stationname"));
					vo.setCheckAddress(rs.getString("address"));
			
					Pattern pattern = Pattern.compile("[0-9]*"); 
					domicile_code = rs.getString("areacode");
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
	
	public String getSSListQuery(WarnSearchByCodeVo warnSearchByCodeVo) {
		String sql = "";

		String xfQuery = "";
		if (StringUtils.isNotBlank(warnSearchByCodeVo.getBeginTime())
				&& StringUtils.isNotBlank(warnSearchByCodeVo.getEndTime())) {
			xfQuery = " and createtime > '" + warnSearchByCodeVo.getBeginTime() + "' and createtime <= '" + warnSearchByCodeVo.getEndTime() + "'";
		}
		if (StringUtils.isNotBlank(warnSearchByCodeVo.getCode())) {
			xfQuery += " and stationname = '" + warnSearchByCodeVo.getCode() + "'";
		}

		if (warnSearchByCodeVo.getType().equals("checkCount")) {
			sql = xfQuery;
		} else if (warnSearchByCodeVo.getType().equals("comparCount")) {
			sql = xfQuery + "  and dubious <> '0' AND dubious <> '' AND dubious is not null ";
		} else if (warnSearchByCodeVo.getType().equals("warnCount")) {
			sql = xfQuery + "  and dubious <> '0' AND dubious <> '' AND dubious is not null ";
		} else if (warnSearchByCodeVo.getType().equals("ztCount")) {
			sql = xfQuery + "  and dubious = '3' ";
		} else if (warnSearchByCodeVo.getType().equals("sdCount")) {
			sql = xfQuery + "  and dubious = '4' ";
		} else if (warnSearchByCodeVo.getType().equals("sfCount")) {
			sql = xfQuery + "  and dubious = '7' ";
		} else if (warnSearchByCodeVo.getType().equals("sjCount")) {
			//没有涉疆数据，10是数据库无效数据，一般不会存在
			sql = xfQuery + "  and dubious = '10' ";
		} else if (warnSearchByCodeVo.getType().equals("skCount")) {
			sql = xfQuery + "  and dubious = '1' ";
		} else if (warnSearchByCodeVo.getType().equals("swCount")) {
			sql = xfQuery + "  and dubious = '2' ";
		}

		return sql;
	}
	private String getXFJQuery(String beginTime, String endTime, String code) {
		String sqlw = "";
		if (StringUtils.isNotBlank(beginTime) && StringUtils.isNotBlank(endTime)) {
			sqlw = " and createtime > '" + beginTime + "' and createtime <= '" + endTime + "'";
		}
		if (StringUtils.isNotBlank(code)) {
			sqlw += " and stationname like '" + code + "%'";
		}
		return sqlw;
	}
}
