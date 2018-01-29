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
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.minginglamp.common.PageHelper;
import com.minginglamp.common.PageInquire;
import com.minginglamp.vo.CheckDeviceListVo;
import com.minginglamp.vo.CheckPlateListVo;
import com.minginglamp.vo.CountCheckLogVo;
import com.minginglamp.vo.CountpersonCheckLogDeptVo;
import com.minginglamp.vo.WarnSearchByCodeVo;

@Service
public class CountPlateCheckService {

	@Autowired
	PageInquire pageInquire;

	@Autowired
	private DwdmService dwdmService;

	@Autowired
	private XzqhService xzqhService;

	@Autowired
	private DictionaryService dictionaryService;

	public List<CountpersonCheckLogDeptVo> countPlateCheckdept(String beginTime, String endTime,String source) {
		List<CountpersonCheckLogDeptVo> list = new ArrayList<CountpersonCheckLogDeptVo>();

		String sqlw1 = this.getQuery(beginTime, endTime, "");

		// 呼市行政区划
		// List<HSxzqh> sjxzqhList = this.xzqhService.listHSxzqh();

		// 核查数量
		String checkCountSql = "select check_address code ,count(1) count from ( select * from  "
					+ " (select policeno pcode,policephone,plate_no idcard_no,SUBSTRING(checkdept,1,6) check_address,create_time from plate_check_log "
					+ " where 1=1 " + sqlw1 + " and source='"+source+"' "
					+ " ) a group by policephone,idcard_no,SUBSTR(create_time,1,10) " + " ) g group by check_address ";
		Log.info("核查数量:{}", checkCountSql);
		ResultSet checkCountResult = pageInquire.findPage(checkCountSql);
		Map<String, Integer> checkCountMap = this.getCountMap(checkCountResult);

		// 比中数量
		String comparCountSql = "select check_address code ,count(1) count from ( select * from  "
					+ " (select policeno pcode,policephone,plate_no idcard_no,SUBSTRING(checkdept,1,6) check_address,create_time from plate_check_log "
					+ " where 1=1 " + sqlw1 + " and source='"+source+"' and tags <> '' and tags is not null "
					+ " ) a group by policephone,idcard_no,SUBSTR(create_time,1,10)  ) g group by check_address ";
			
		Log.info("比中数量:{}", comparCountSql);
		ResultSet comparCountResult = pageInquire.findPage(comparCountSql);
		Map<String, Integer> comparCountMap = this.getCountMap(comparCountResult);

		// 预警数量
		String warnCountSql = "select check_address code,count(1) count from  ( select * from ("
					+ " select policeno pcode,policephone,plate_no idcard_no,SUBSTRING(checkdept,1,6) check_address,tags,create_time from plate_check_log where 1=1 "
					+ sqlw1 + " and personif = '01' and source='"+source+"'"
					+ " ) a group by policephone,idcard_no,SUBSTR(create_time,1,10)" + "  ) g group by check_address";
			
		Log.info("预警数量:{}", warnCountSql);
		ResultSet warnCountResult = pageInquire.findPage(warnCountSql);
		Map<String, Integer> warnCountMap = this.getCountMap(warnCountResult);
		Log.debug(checkCountSql);

		// 设备数量
		String deviceCountSql = "select check_address code,count(1) count FROM ("
					+ " select check_address,policephone FROM ( select pcode,idcard_no,policephone,check_address from "
					+ " (select policeno pcode,plate_no idcard_no,SUBSTRING(checkdept,1,6) check_address,policephone,create_time from plate_check_log where 1=1 "
					+ sqlw1 + " and source='"+source+"'"
					+ " ) a group by policephone,idcard_no,SUBSTR(create_time,1,10) )t1 group by check_address, policephone"
					+ " ) g group by check_address ";
			
		Log.info("设备数量:{}", deviceCountSql);
		ResultSet deviceCountResult = pageInquire.findPage(deviceCountSql);
		Map<String, Integer> deviceCountMap = this.getCountMap(deviceCountResult);

		// - 车辆预警分类统计
		String categoryCountSql = "select AA.分局名称 name,AA.code code,IFNULL(AA.在逃人数,0) zt_count,IFNULL(BB.涉毒人数,0) sd_count,"
					+ " IFNULL(CC.涉访人数,0) sf_count,IFNULL(DD.涉疆人数,0) sj_count,IFNULL(EE.涉恐人数,0) sk_count,IFNULL(FF.涉稳人数,0) sw_count,"
					+ " IFNULL(GG.大庆关注车辆数,0) dq_count"
					+ " from (select p.name 分局名称,p.code code ,j.count 在逃人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ " (select check_address,count(1) count from  " + " (select * from ("
					+ "	select policeno pcode,plate_no idcard_no,SUBSTRING(checkdept,1,6) check_address,tags,policephone,create_time from plate_check_log where 1=1 "
					+ sqlw1 + " and personif = '01' and source='"+source+"' and tags like '%逃%'"
					+ "	) a group by policephone,idcard_no,SUBSTR(create_time,1,10) ) g group by check_address"
					+ "	) j on p.code = j.check_address where p.code <> '150101' order by p.code) AA,"
					// -- 车辆涉毒
					+ "	(select p.code code ,j.count 涉毒人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ "	(select check_address,count(1) count from  "
					+ "	(select * from (select policeno pcode,plate_no idcard_no,SUBSTRING(checkdept,1,6) check_address,tags,policephone,create_time  from plate_check_log where 1=1 "
					+ sqlw1 + " and personif = '01' and source='"+source+"' and tags like '%毒%'"
					+ " ) a group by policephone,idcard_no,SUBSTR(create_time,1,10)" + "	) g group by check_address"
					+ "	) j on p.code = j.check_address where p.code <> '150101' order by p.code) BB,"
					// -- 车辆上访
					+ "	(select p.code code,j.count 涉访人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ "	( select check_address,count(1) count from  " + "	( select * from ("
					+ "	select policeno pcode,plate_no idcard_no,SUBSTRING(checkdept,1,6) check_address,tags,policephone,create_time  from plate_check_log where 1=1 "
					+ sqlw1 + " and personif = '01' and source='"+source+"' and tags like '%访%'"
					+ "	 ) a group by policephone,idcard_no,SUBSTR(create_time,1,10) ) g group by check_address"
					+ "	) j on p.code = j.check_address where p.code <> '150101' order by p.code) CC,"
					// -- 车辆 涉疆
					+ "	(select p.code code,j.count 涉疆人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ "	( select check_address,count(1) count from  " + "	( select * from ("
					+ "	select policeno pcode,plate_no idcard_no,SUBSTRING(checkdept,1,6) check_address,tags,policephone,create_time from plate_check_log where  1=1 "
					+ sqlw1 + " and personif = '01' and source='"+source+"' and tags like '%疆%'"
					+ "	 ) a group by policephone,idcard_no,SUBSTR(create_time,1,10) ) g group by check_address"
					+ "	) j on p.code = j.check_address where p.code <> '150101' order by p.code) DD,"
					// -- 车辆 涉恐
					+ "	(select p.code code ,j.count 涉恐人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ "	(select check_address,count(1) count from  " + "	(select * from ("
					+ "	select policeno pcode,plate_no idcard_no,SUBSTRING(checkdept,1,6) check_address,tags,policephone,create_time from plate_check_log where  1=1 "
					+ sqlw1 + " and personif = '01' and source='"+source+"' and tags like '%恐%'"
					+ "	 ) a group by policephone,idcard_no,SUBSTR(create_time,1,10)	) g group by check_address"
					+ "	) j on p.code = j.check_address where p.code <> '150101' order by p.code) EE,"
					// -- 车辆涉稳
					+ "	(select p.code code ,j.count 涉稳人数 from tb_d_hsxzqh p  LEFT JOIN"
					+ "	(select check_address,count(1) count from  " + "	(select * from ("
					+ "	select policeno pcode,plate_no idcard_no,SUBSTRING(checkdept,1,6) check_address,tags,policephone,create_time from plate_check_log where 1=1 "
					+ sqlw1 + " and personif = '01' and source='"+source+"' and tags like '%稳%'"
					+ "	) a group by policephone,idcard_no,SUBSTR(create_time,1,10) ) g group by check_address"
					+ "	) j on p.code = j.check_address where p.code <> '150101' order by p.code) FF,"
					// -- 大庆关注
					+ "	(select p.code code ,j.count 大庆关注车辆数 from tb_d_hsxzqh p  LEFT JOIN"
					+ "	(select check_address,count(1) count from  " + "	(select * from ("
					+ "	select policeno pcode,plate_no idcard_no,SUBSTRING(checkdept,1,6) check_address,tags,policephone,create_time from plate_check_log where 1=1 "
					+ sqlw1 + " and personif = '01' and source='"+source+"' and tags like '%大庆关注%'"
					+ "	) a group by policephone,idcard_no,SUBSTR(create_time,1,10) ) g group by check_address"
					+ "	) j on p.code = j.check_address where p.code <> '150101' order by p.code) GG"
					+ "	where AA.code = BB.code and BB.code = CC.code and CC.code = DD.code and DD.code = EE.code and EE.code = FF.code and EE.code = GG.code";
			
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
		int dqCountAll = 0;
		int deviceCountAll = 0;

		try {
			while (rs.next()) {
				CountpersonCheckLogDeptVo vo = new CountpersonCheckLogDeptVo();

				vo.setSkCount(rs.getInt("sk_count"));
				vo.setSdCount(rs.getInt("sd_count"));
				vo.setSfCount(rs.getInt("sf_count"));
				vo.setSwCount(rs.getInt("sw_count"));
				vo.setSjCount(rs.getInt("sj_count"));
				vo.setZtCount(rs.getInt("zt_count"));
				vo.setDqCount(rs.getInt("dq_count"));

				String code = rs.getString("code");
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

				skCountAll += rs.getInt("sk_count");
				sdCountAll += rs.getInt("sd_count");
				sfCountAll += rs.getInt("sf_count");
				swCountAll += rs.getInt("sw_count");
				sjCountAll += rs.getInt("sj_count");
				ztCountAll += rs.getInt("zt_count");
				dqCountAll += rs.getInt("dq_count");
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
		vo.setDqCount(dqCountAll);
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

	String getQuery(String beginTime, String endTime, String code) {
		String sqlw = "";
		if (beginTime != null && !"".equals(beginTime) && endTime != null && !"".equals(endTime)) {
			sqlw = " and create_time > '" + beginTime + "' and create_time <= '" + endTime + "'";
		}
		if (code != null && !code.equals("")) {
			sqlw += " and checkdept like '" + code + "%'";
		}
		return sqlw;
	}

	public List<CountCheckLogVo> countCheckByCode(String beginTime, String endTime, String code, String source) {
		List<CountCheckLogVo> list = new ArrayList<CountCheckLogVo>();

		String sqlw1 = this.getQuery(beginTime, endTime, code);

		// 核查数量
		String countSql = "select checkdept code ,count(1) count from ( select * from  "
					+ " (select policeno pcode,plate_no idcard_no,SUBSTRING(checkdept,1,6) check_address,checkdept checkdept,policephone,create_time from plate_check_log "
					+ " where 1=1 " + sqlw1 + " and source='"+source+"' "
					+ " )  a where check_address in (select code from tb_d_hsxzqh) group by policephone,idcard_no,SUBSTR(create_time,1,10) "
					+ " ) g group by checkdept ";
		Log.info("核查数量:{}", countSql);
		ResultSet countResult = pageInquire.findPage(countSql);
		list = this.getCountList(countResult, code);
		return list;
	}

	public List<CountCheckLogVo> countComparByCode(String beginTime, String endTime, String code, String source) {
		List<CountCheckLogVo> list = new ArrayList<CountCheckLogVo>();

		String sqlw1 = this.getQuery(beginTime, endTime, code);

		// 比中数量
		String countSql = "select checkdept code ,count(1) count from ( select * from  "
					+ " (select policeno pcode,plate_no idcard_no,SUBSTRING(checkdept,1,6) check_address,checkdept checkdept,policephone,create_time from plate_check_log "
					+ " where 1=1 " + sqlw1 + " and source='"+source+"' and tags <> '' and tags is not null "
					+ " ) a where check_address in (select code from tb_d_hsxzqh) group by policephone,idcard_no,SUBSTR(create_time,1,10) "
					+ " ) g group by checkdept ";
		Log.info("比中数量:{}", countSql);
		ResultSet countResult = pageInquire.findPage(countSql);
		list = this.getCountList(countResult, code);
		return list;
	}

	public List<CountCheckLogVo> countWarnByCode(String beginTime, String endTime, String code,String source) {
		List<CountCheckLogVo> list = new ArrayList<CountCheckLogVo>();

		String sqlw1 = this.getQuery(beginTime, endTime, code);

		// 预警数量
		String countSql = "select checkdept code,count(1) count from  " + " ( select * from ("
					+ " select policeno pcode,plate_no idcard_no,SUBSTRING(checkdept,1,6) check_address,tags,checkdept checkdept,policephone,create_time from plate_check_log where 1=1 "
					+ sqlw1 + " and personif = '01' and source='"+source+"'"
					+ " ) a where check_address in (select code from tb_d_hsxzqh) group by policephone,idcard_no,SUBSTR(create_time,1,10) "
					+ "  ) g group by checkdept";
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

	private String getSubWarnSqlQuery(String beginTime, String endTime, String code, String type, String source) {
		String countSql = "";
		String sqlw1 = this.getQuery(beginTime, endTime, code);

		String typeSql = "";
		if (type.equals("sfCount")) {
			typeSql = "and tags like '%访%'";
		} else if (type.equals("sjCount")) {
			typeSql = "and tags like '%疆%'";
		} else if (type.equals("swCount")) {
			typeSql = "and tags like '%稳%'";
		} else if (type.equals("skCount")) {
			typeSql = "and tags like '%恐%'";
		} else if (type.equals("sdCount")) {
			typeSql = "and tags like '%毒%'";
		} else if (type.equals("ztCount")) {
			typeSql = "and tags like '%逃%'";
		} else if (type.equals("dqCount")) {
			typeSql = "and tags like '%大庆关注%'";
		}
		countSql = "select checkdept code,count(1) count from (select * from ("
				+ " select policeno pcode,plate_no idcard_no,SUBSTRING(checkdept,1,6) check_address,tags, checkdept,policephone,create_time from plate_check_log where 1=1 "
				+ sqlw1 + " and personif = '01' and source='"+source+"' " + typeSql
				+ " ) a group by policephone,idcard_no,SUBSTR(create_time,1,10) ) g group by checkdept";
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
				if (code != "" && !code.equals("")) {
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

	public List<CheckDeviceListVo> listDeviceByCode(String beginTime, String endTime, String code,String source) {
		List<CheckDeviceListVo> list = new ArrayList<CheckDeviceListVo>();

		String sqlw1 = this.getQuery(beginTime, endTime, code);

		// 设备数量
		String countSql = "select pcode policeno,policephone,police_name,count(1) count "
				+ " FROM ( select pcode,idcard_no,policephone,police_name,check_address from "
				+ " (select policeno pcode,plate_no idcard_no,police_name,SUBSTRING(checkdept,1,6) check_address,policephone,create_time from plate_check_log where 1=1 "
				+ sqlw1
				+ " and source='"+source+"' ) a where check_address in (select code from tb_d_hsxzqh) group by policephone,idcard_no,SUBSTR(create_time,1,10)  )t1 group by policephone";
		Log.info("设备统计:{}", countSql);
		ResultSet rs = pageInquire.findPage(countSql);
		try {
			if (rs != null) {
				while (rs.next()) {
					CheckDeviceListVo vo = new CheckDeviceListVo();
					vo.setPoliceName(rs.getString("police_name"));
					vo.setPoliceNo(rs.getString("policeno"));
					vo.setPolicePhone(rs.getString("policephone"));
					vo.setCount(rs.getInt("count"));
					list.add(vo);
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return list;
	}

	public PageHelper listWarnByCode(WarnSearchByCodeVo warnSearchByCodeVo) {
		PageHelper pageHelper = new PageHelper();

		String sqlw1 = this.getQuery(warnSearchByCodeVo.getBeginTime(), warnSearchByCodeVo.getEndTime(),
				warnSearchByCodeVo.getCode());

		String countSql = "select count(1) count from"
				+ " (select plate_no,policephone  from plate_check_log b where 1=1 " + sqlw1
				+ " and personif = '01' and source='"+warnSearchByCodeVo.getSource()+"'"
				+ " group by  policephone,plate_no,SUBSTR(create_time,1,10) ) t";
		Log.info("预警详情数量:{}", countSql);
		ResultSet rsCount = pageInquire.findPage(countSql);
		int count = this.getTotalCount(rsCount);

		String sql = "select tags,plate_no,name,create_time,SUBSTRING(checkdept,1,6) check_address,"
				+ " (select name from tb_d_dwdm a where a.code = b.checkdept) checkdept,police_name,policephone,sfzh,plate_type"
				+ " from plate_check_log b where 1=1 " + sqlw1 + " and personif = '01' and source='"+warnSearchByCodeVo.getSource()+"'"
				+ "and SUBSTRING(checkdept,1,6) in (select code from tb_d_hsxzqh) group by  policephone,plate_no,SUBSTR(create_time,1,10) ";

		String listSQL = sql + " order by tags desc limit "
				+ (warnSearchByCodeVo.getPageno() - 1) * warnSearchByCodeVo.getSize() + " , "
				+ warnSearchByCodeVo.getSize();

		Log.info("预警详情:{}", listSQL);
		ResultSet rs = pageInquire.findPage(listSQL);
		List<CheckPlateListVo> warnList = this.getWarnList(rs);

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

	public List<CheckPlateListVo> getWarnList(ResultSet rs) {
		List<CheckPlateListVo> list = new ArrayList<CheckPlateListVo>();
		// 呼市行政区划
		Map<String, String> sjxzqhMap = this.xzqhService.listHSxzqhMap();
		JsonNode plateTypeJsonNode = dictionaryService.getPlateType();
		try {
			if (rs != null) {
				while (rs.next()) {
					CheckPlateListVo vo = new CheckPlateListVo();
					vo.setTags(rs.getString("tags"));
					vo.setName(rs.getString("name"));
					vo.setSfzh(rs.getString("sfzh"));

					vo.setPlateNo(rs.getString("plate_no"));
					vo.setCreateTime(rs.getString("create_time"));
					vo.setCheckdept(rs.getString("checkdept"));
					vo.setPoliceName(rs.getString("police_name"));
					vo.setPolicephone(rs.getString("policephone"));
					vo.setCheckAddress(rs.getString("check_address"));
					String checkAddress = rs.getString("check_address");
					if (StringUtils.isNotBlank(checkAddress)) {
						if (sjxzqhMap.containsKey(checkAddress)) {
							checkAddress = sjxzqhMap.get(checkAddress);
						}
					} else {
						checkAddress = "";
					}
					vo.setCheckAddress(checkAddress);
					String platetype = rs.getString("plate_type");
					if (platetype != null && !platetype.equals("")) {
						if (plateTypeJsonNode.get(platetype) != null) {
							platetype = plateTypeJsonNode.get(platetype).asText();
						}
						vo.setPlateType(platetype);
					}
					list.add(vo);
				}
			}
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		return list;
	}
}
