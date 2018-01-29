package com.minginglamp.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.mortbay.log.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.minginglamp.common.PageHelper;
import com.minginglamp.model.ZaPerson;
import com.minginglamp.sharding.PageResponse;
import com.minginglamp.sharding.ShardingUtils;
import com.minginglamp.vo.CheckPersonListVo;
import com.minginglamp.vo.CountpersonCheckLogDeptVo;
import com.minginglamp.vo.WarnSearchByCodeVo;
@Service
public class CountPersonCheckZJService {
	private static final String SHARDING_COLUMN = "sysdate";
    private static final String TABLE_PREFIX = "za_v_r_person_jzl_1501";
    private static final String DATE_BOUNDARY = "2017080";
	@Autowired
	private JdbcTemplate jdbcTemplate;
	@Autowired
	ImportantPersonCategoryService importantPersonCategoryService;
	@Autowired 
	DwdmService dwdmService;
	@Autowired
	DictionaryService dictionaryService;
	@SuppressWarnings("unused")
	public List<CountpersonCheckLogDeptVo> countPersonCheckdept(
			String beginTime, String endTime, String source) {
		List<CountpersonCheckLogDeptVo> list = new ArrayList<CountpersonCheckLogDeptVo>();
		if(beginTime==""&&beginTime==null){
			beginTime = "1900-01-01 00:00:00";
		}
		if(endTime==""&&endTime==null){
			endTime = "2100-01-01 00:00:00";
		}
//		Log.info("预警数量:{}");		
		List<Map<String, Object>> queryRespCheck = ShardingUtils
				.queryPageTj(jdbcTemplate,beginTime, endTime,SHARDING_COLUMN,TABLE_PREFIX,DATE_BOUNDARY,"check");
		//System.out.println("测试数据："+queryRespCs.get(0).get("f_companyname"));
		Map<String, Integer> checkCountMap = this.getCountMap(queryRespCheck);
		
		/*Map<String, Integer> checkCountMap = ShardingUtils
				.queryPageTj(jdbcTemplate,beginTime, endTime,SHARDING_COLUMN,TABLE_PREFIX,DATE_BOUNDARY,"check");*/
	
//		Log.info("比中数量:{}");
		List<Map<String, Object>> queryRespCompar = ShardingUtils
				.queryPageTj(jdbcTemplate,beginTime, endTime,SHARDING_COLUMN,TABLE_PREFIX,DATE_BOUNDARY,"compar");
		Map<String, Integer> comparCountMap = this.getCountMap(queryRespCompar);
		/*Map<String, Integer> comparCountMap = ShardingUtils
				.queryPageTj(jdbcTemplate,beginTime, endTime,SHARDING_COLUMN,TABLE_PREFIX,DATE_BOUNDARY,"compar");*/
	
//		Log.info("预警数量:{}");
		List<Map<String, Object>> queryRespWarn = ShardingUtils
				.queryPageTj(jdbcTemplate,beginTime, endTime,SHARDING_COLUMN,TABLE_PREFIX,DATE_BOUNDARY,"warn");
		Map<String, Integer> warnCountMap = this.getCountMap(queryRespWarn);
		/*Map<String, Integer> warnCountMap = ShardingUtils
				.queryPageTj(jdbcTemplate,beginTime, endTime,SHARDING_COLUMN,TABLE_PREFIX,DATE_BOUNDARY,"warn");*/
		
//		Log.info("警数分类:{}");
		List<Map<String, Object>> queryRespCategory = ShardingUtils
				.queryPageTj(jdbcTemplate,beginTime, endTime,SHARDING_COLUMN,TABLE_PREFIX,DATE_BOUNDARY,"category");
		System.out.println("测试数据："+queryRespCategory.get(0).get("f_companyname"));
		
		
//		Log.info("进出站数量:{}");
		List<Map<String, Object>> queryRespJzcz = ShardingUtils
				.queryPageTj(jdbcTemplate,beginTime, endTime,SHARDING_COLUMN,TABLE_PREFIX,DATE_BOUNDARY,"jzcz");
		System.out.println("测试数据："+queryRespJzcz.get(0).get("f_companyname"));
		
		
		//list = this.getList(rs, checkCountMap, comparCountMap, warnCountMap, deviceCountMap);
		list = this.getList(checkCountMap, comparCountMap, warnCountMap, queryRespCategory, queryRespJzcz);
		return list;
	}
	public Map<String, Integer> getCountMap(List<Map<String, Object>> queryRespCs) {
		//queryRespCs.get(0).get("f_companyname")
		Map<String, Integer> countMap = new HashMap<String, Integer>();
		for(Map<String, Object> query : queryRespCs){
			String code = (String) query.get("f_companyname");
			Integer cnt = Integer.valueOf(query.get("count").toString());
			//Integer count =  Integer.parseInt((String) query.get("count"));
			countMap.put(code, cnt);
		}
		return countMap;
	}
	public List<CountpersonCheckLogDeptVo> getList(Map<String, Integer> checkCountMap,
			Map<String, Integer> comparCountMap, Map<String, Integer> warnCountMap, List<Map<String, Object>> queryRespCategory,
			List<Map<String, Object>> queryRespJzcz) {
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
		int jzCountAll = 0;
		int czCountAll = 0;
		try {
			Map<String, Integer> queryRespCzMap = new HashMap<String, Integer>();
			for(Map<String, Object> query2 : queryRespJzcz){
				String code = (String) query2.get("f_companyname");
				Integer czcnt = Integer.valueOf(query2.get("出站").toString());
				//Integer count =  Integer.parseInt((String) query.get("count"));
				queryRespCzMap.put(code, czcnt);
			}
			Map<String, Integer> queryRespJzMap = new HashMap<String, Integer>();
			for(Map<String, Object> query1 : queryRespJzcz){
				String code = (String) query1.get("f_companyname");
				Integer jzcnt = Integer.valueOf(query1.get("进站").toString());
				//Integer count =  Integer.parseInt((String) query.get("count"));
				queryRespJzMap.put(code, jzcnt);
			}
			for(Map<String, Object> query : queryRespCategory){
				CountpersonCheckLogDeptVo vo = new CountpersonCheckLogDeptVo();
				String code = (String) query.get("f_companyname");
				//Integer cnt = Integer.valueOf(query.get("count").toString());
				vo.setSkCount(Integer.valueOf(query.get("恐").toString()));
				vo.setSdCount(Integer.valueOf(query.get("毒").toString()));
				vo.setSfCount(Integer.valueOf(query.get("访").toString()));
				vo.setSwCount(Integer.valueOf(query.get("稳").toString()));
				vo.setSjCount(0);
				vo.setZtCount(Integer.valueOf(query.get("逃").toString()));
				skCountAll += Integer.valueOf(query.get("恐").toString());
				sdCountAll += Integer.valueOf(query.get("毒").toString());
				sfCountAll += Integer.valueOf(query.get("访").toString());
				swCountAll += Integer.valueOf(query.get("稳").toString());
				sjCountAll += 0;
				ztCountAll += Integer.valueOf(query.get("逃").toString());
				
				if ("150100".equals(code)) {
					vo.setName("呼和浩特市公安局");
				} else {
					vo.setName(code);
				}
				vo.setCode(code);
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
				
				if(queryRespJzMap.containsKey(code)){
					vo.setJzCount(queryRespJzMap.get(code));
					jzCountAll += queryRespJzMap.get(code);
				}
				
				
				if(queryRespCzMap.containsKey(code)){
					vo.setCzCount(queryRespCzMap.get(code));
					czCountAll += queryRespCzMap.get(code);
				}
				
				list.add(vo);
			}
		} catch (Exception e) {
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
		vo.setJzCount(jzCountAll);
		vo.setCzCount(czCountAll);
		list.add(vo);

		return list;
	}
	
	public PageHelper listDetailsByCode(WarnSearchByCodeVo warnSearchByCodeVo) {
		PageHelper pageHelper = new PageHelper();
		if (warnSearchByCodeVo.getBeginTime() != null&&!"".equals(warnSearchByCodeVo.getBeginTime())&&warnSearchByCodeVo.getEndTime()!= null&&!"".equals(warnSearchByCodeVo.getEndTime())) {
		}else
		{
		warnSearchByCodeVo.setBeginTime("1900-01-01 00:00:00");
		warnSearchByCodeVo.setEndTime("2200-01-01 00:00:00");
		}
		String sql1 = " 1=1 ";
		if(StringUtils.isNotBlank(warnSearchByCodeVo.getCode())){
			sql1 = " f_companyname = '"+warnSearchByCodeVo.getCode()+"' ";
		}
		
		String sql2 = "";
		if(warnSearchByCodeVo.getType().equals("checkCount")){
			sql2 = "";
		}else if(warnSearchByCodeVo.getType().equals("comparCount")){
			sql2 = " and f_isalarm is not null ";
		}else if(warnSearchByCodeVo.getType().equals("warnCount")){
			sql2 = " and f_lib_code in ('A_0101','A_0201','C_0101','C_0201','C_0203','C_0206','C_0207','C_0209','D_0301','D_0401','D_0501') ";
		}else if(warnSearchByCodeVo.getType().equals("ztCount")){
			sql2 = " and  f_lib_code in ('A_0101') ";
		}else if(warnSearchByCodeVo.getType().equals("sdCount")){
			sql2 = " and  f_lib_code in ('A_0201','C_0203') ";
		}else if(warnSearchByCodeVo.getType().equals("sfCount")){
			sql2 = " and  f_lib_code in ('C_0201','C_0206','C_0209','D_0301','D_0401','D_0501') ";
		}else if(warnSearchByCodeVo.getType().equals("sjCount")){
			sql2 = " and  f_lib_code in ('O(∩_∩)O')";
		}else if(warnSearchByCodeVo.getType().equals("skCount")){
			sql2 = " and  f_lib_code in ('C_0207') ";
		}else if(warnSearchByCodeVo.getType().equals("swCount")){
			sql2 = " and  f_lib_code in ('C_0101') ";
		}else if(warnSearchByCodeVo.getType().equals("jzCount")){
			sql2 = " and jczbs=0 ";
		}else if(warnSearchByCodeVo.getType().equals("czCount")){
			sql2 = " and jczbs=1 ";
		}
		
		String whereStr = sql1+sql2;
		String ColStr = " * ";
		PageRequest pageReq = new PageRequest(warnSearchByCodeVo.getPageno()-1,warnSearchByCodeVo.getSize());
		PageResponse queryResp = ShardingUtils.queryPage(jdbcTemplate, pageReq, ColStr, warnSearchByCodeVo.getBeginTime(), warnSearchByCodeVo.getEndTime(), whereStr,SHARDING_COLUMN,TABLE_PREFIX,DATE_BOUNDARY);
		Map<String,String> subHjdqhMap = this.importantPersonCategoryService.listHjdqhCategoryMap();
		JsonNode nationalJsonNode = dictionaryService.getNational();
		JsonNode libCodeJsonNode = dictionaryService.getLibCode();
		
		List<CheckPersonListVo> zaList = new ArrayList<CheckPersonListVo>();
		List<ZaPerson> zaPersons = new ArrayList<ZaPerson>(); 
		List<Map<String, Object>> listmaps =queryResp.getList();
		CheckPersonListVo vo = null;
		Map<String,Object> maps = null;
		for(int i = 0;i<listmaps.size();i++)
		{
			maps = listmaps.get(i);
			vo = new CheckPersonListVo();
			vo.setName(maps.get("f_name").toString());
			vo.setSex(maps.get("f_sex").toString().equals("1")?"男":"女");
			String nation = maps.get("f_nation").toString();
			if (nation != null && !nation.equals("")) {
				if(nationalJsonNode.get(nation)!=null){
					nation = nationalJsonNode.get(nation).asText();
					vo.setNation(nation);
				}
				
			}else
			{
				vo.setNation("未知");
			}
			Object libCo = maps.get("f_lib_code");
			String libCode = "";
			if(libCo!=null&&libCo!=""){
				libCode = maps.get("f_lib_code").toString();
			}
			if (libCode != null && !libCode.equals("")) {
				if(libCodeJsonNode.get(libCode)!=null){
					libCode = libCodeJsonNode.get(libCode).asText();
					vo.setPersonType(libCode);
					vo.setTags(libCode);
				}
				
			}else
			{
				vo.setTags("无背景");
				vo.setPersonType("");
			}
			vo.setSfzh(maps.get("f_cardnum").toString());
			
			String region = maps.get("f_region").toString();
			if(region!=null && !"".equals(region))
			{
				vo.setHjdPlace(subHjdqhMap.get(region));
			}else
			{
				vo.setHjdPlace("未知");
			}
			vo.setPoliceName(maps.get("f_regperson").toString());
			String orgid = maps.get("f_orgid").toString();
			if(orgid!=null && !"".equals(orgid))
			{
				Map<String, String>  dwdmMap =dwdmService.getDwdmMap(orgid);
				vo.setCheckAddress(dwdmMap.get(orgid));
			}else
			{
				vo.setCheckAddress("未知");
			}
			vo.setPolicephone(maps.get("f_reglinktype").toString());
			vo.setCheckdept(maps.get("f_companyname").toString());
			vo.setCreateTime(maps.get("sysdate").toString());

			zaList.add(vo);
		}
		
		pageHelper.setPageNo(warnSearchByCodeVo.getPageno());
		pageHelper.setPageSize(warnSearchByCodeVo.getSize());
		pageHelper.setResult(zaList);
		pageHelper.setTotalPage(queryResp.getTotalPages());
		pageHelper.setTotal(queryResp.getTotalCount());
		
		return pageHelper;
	}


}
