package com.minginglamp.sharding;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.jdbc.core.JdbcTemplate;

import lombok.extern.java.Log;

@Log
public class ShardingUtils {
//	private static final String SHARDING_COLUMN = "sysdate";
//private static final String TABLE_PREFIX = "za_v_r_person_jzl_1501";

//	private static final String DATE_BOUNDARY = "2017080";

	
	public static PageResponse queryPage(JdbcTemplate jdbcTemplate, PageRequest pageReq,
			String columnsStr, String lowerTime, String upperTime,
			String whereStr,String SHARDING_COLUMN,String TABLE_PREFIX,String DATE_BOUNDARY) {
		// 计算所有在时间范围内的表，按照日期排序
		List<String> allShardingTables = getShardingTables(jdbcTemplate.getDataSource(),TABLE_PREFIX);
		Set<String> shardingTables = new TreeSet<String>();
		if (allShardingTables != null && allShardingTables.size() > 0) {
			String lowerSuffix = genSuffix(lowerTime);
			String upperSuffix = genSuffix(upperTime);
			for (String each : allShardingTables) {
				if (TABLE_PREFIX.equals(each)) {
					if (lowerSuffix.compareTo(DATE_BOUNDARY) < 0) {
						shardingTables.add(TABLE_PREFIX);
					}
					continue;
				}
				String suffix = each.substring(TABLE_PREFIX.length() + 1);
				if (suffix.compareTo(lowerSuffix) >= 0 && suffix.compareTo(upperSuffix) <= 0) {
					shardingTables.add(each);
				}
			}
		}
		// 查询每一个表的符合条件的行数
		
		int totalCnt = 0;
		TreeMap<String, Integer> countMap = new TreeMap<String, Integer>();
		for (String table : shardingTables) {
			long startTime = System.currentTimeMillis();
			StringBuilder sqlCount = new StringBuilder();
			sqlCount.append("select count(1) from ").append(table).append(" where ")
					.append(SHARDING_COLUMN).append(" between '").append(lowerTime).append("' and '")
					.append(upperTime).append("' and ").append(whereStr).append(" order by ").append(SHARDING_COLUMN);
			log.info(sqlCount.toString());
			Integer cnt = jdbcTemplate.queryForObject(sqlCount.toString(), Integer.class);
			countMap.put(table, cnt);
			totalCnt += cnt;
			long endTime = System.currentTimeMillis();
			log.info("sql执行时间："+(endTime-startTime)+"ms");
		}
		
		
		//根据分页参数计算要查询的表和范围
		TreeMap<String, Integer> qualifiedTableMap = new TreeMap<>();
		int pageStart = pageReq.getPageNumber()* pageReq.getPageSize();
		int pageEnd = (pageReq.getPageNumber() + 1) * pageReq.getPageSize() - 1;
		int cntDurationLower = 0;
		int cntDurationUpper = -1;
		for(Map.Entry<String, Integer> cntEntry : countMap.entrySet()){
			cntDurationLower = cntDurationUpper+1;
			cntDurationUpper += cntEntry.getValue();
			if(pageStart >= cntDurationLower && pageStart <=cntDurationUpper ){
				qualifiedTableMap.putIfAbsent(cntEntry.getKey(), pageStart - cntDurationLower);
			}
			if(pageEnd >= cntDurationLower && pageEnd <= cntDurationUpper ){
				qualifiedTableMap.putIfAbsent(cntEntry.getKey(), 0);
			}
			if(cntDurationLower >= pageStart && cntDurationUpper <= pageEnd){
				qualifiedTableMap.putIfAbsent(cntEntry.getKey(), 0);
			}
		}
		
		//查询每一个表，然后取出前面的
		int pageSize = pageReq.getPageSize();
		List<Map<String, Object>> allResult = new ArrayList<Map<String, Object>>();
		for (Map.Entry<String, Integer> entry : qualifiedTableMap.entrySet()) {
			long startTime = System.currentTimeMillis();
			StringBuilder sql = new StringBuilder();
			String table = entry.getKey();
			Integer limitStart = entry.getValue();
			if(pageSize>=9999){
				if(totalCnt>=9999){
					sql.append("select ").append(columnsStr).append(" from ").append(table).append("  where ")
					.append(SHARDING_COLUMN).append(" between '").append(lowerTime).append("' and '")
					.append(upperTime).append("' and ").append(whereStr).append(" order by ").append(SHARDING_COLUMN)
					.append(" limit ").append(limitStart).append(",").append(pageSize);
				}else{
					sql.append("select ").append(columnsStr).append(" from ").append(table).append("  where ")
					.append(SHARDING_COLUMN).append(" between '").append(lowerTime).append("' and '")
					.append(upperTime).append("' and ").append(whereStr).append(" order by ").append(SHARDING_COLUMN);
				}
			}else{
				sql.append("select ").append(columnsStr).append(" from ").append(table).append("  where ")
				.append(SHARDING_COLUMN).append(" between '").append(lowerTime).append("' and '")
				.append(upperTime).append("' and ").append(whereStr).append(" order by ").append(SHARDING_COLUMN)
				.append(" limit ").append(limitStart).append(",").append(pageSize);
			}
			
			log.info(sql.toString());
			List<Map<String, Object>> singleTableResult = jdbcTemplate.queryForList(sql.toString());
			allResult.addAll(singleTableResult);
			long endTime = System.currentTimeMillis();
			log.info("sql执行时间："+(endTime-startTime)+"ms");
		}
		
		List<Map<String, Object>> subList = null;
		if(allResult.size() > pageSize){
			subList = allResult.subList(0, pageSize);
		}else{
			subList = allResult;
		}
		
		PageResponse ret = new PageResponse(pageReq.getPageNumber(), pageReq.getPageSize(), totalCnt,subList.size(), subList);
		
		return ret;
	}

	public static List<Map<String, Object>> queryPageTj(JdbcTemplate jdbcTemplate,
			String lowerTime, String upperTime,String SHARDING_COLUMN,String TABLE_PREFIX,String DATE_BOUNDARY,String type) {
		// 计算所有在时间范围内的表，按照日期排序
		List<String> allShardingTables = getShardingTables(jdbcTemplate.getDataSource(),TABLE_PREFIX);
		Set<String> shardingTables = new TreeSet<String>();
		if (allShardingTables != null && allShardingTables.size() > 0) {
			String lowerSuffix = genSuffix(lowerTime);
			String upperSuffix = genSuffix(upperTime);
			for (String each : allShardingTables) {
				if (TABLE_PREFIX.equals(each)) {
					if (lowerSuffix.compareTo(DATE_BOUNDARY) < 0) {
						shardingTables.add(TABLE_PREFIX);
					}
					continue;
				}
				String suffix = each.substring(TABLE_PREFIX.length() + 1);
				if (suffix.compareTo(lowerSuffix) >= 0 && suffix.compareTo(upperSuffix) <= 0) {
					shardingTables.add(each);
				}
			}
		}
		StringBuilder leftsql = new StringBuilder();
		leftsql.append("select f_companyname FROM tb_d_company where f_yxx=0");
		List<Map<String, Object>> leftCompany = jdbcTemplate.queryForList(leftsql.toString());
		
		//查询每一个表，然后取出前面的
		List<Map<String, Object>> tablesResult = new ArrayList<Map<String, Object>>();
		for (String table : shardingTables) {
			long startTime = System.currentTimeMillis();
			StringBuilder sql = new StringBuilder();
			if(type=="check"){
				String checksql1 = "SELECT f_companyname,case when c.count is NULL then 0 else c.count end count FROM tb_d_company a LEFT JOIN (select f_companyname com,count(1) count from ";
				String checksql2 = " GROUP BY f_companyname) c ON a.f_companyname=c.com where a.f_yxx='0' ";
				sql.append(checksql1).append(table).append("  where ")
				.append(SHARDING_COLUMN).append(" between").append(" '"+lowerTime+"' ").append("and")
				.append(" '"+upperTime+"' ").append(checksql2);
				
				log.info(sql.toString());
				List<Map<String, Object>> singleTableResult = jdbcTemplate.queryForList(sql.toString());
				
				if(tablesResult.size() == 0){
					tablesResult = singleTableResult;
				}else{
					for(Map<String, Object> a :tablesResult){
						String companyname = (String) a.get("f_companyname");
						for(Map<String, Object> b :singleTableResult){
							String bcompanyname = (String) b.get("f_companyname");
							if(companyname.equals(bcompanyname)){
								a.put("count", Integer.valueOf(a.get("count").toString())+Integer.valueOf(b.get("count").toString()));
							}
						}
					}
				}
			}else if(type=="compar"){
				String comparsql1 = "SELECT f_companyname,case when c.count is NULL then 0 else c.count end count FROM tb_d_company a LEFT JOIN (select f_companyname com,count(1) count from ";
				String comparsql2 = " and f_isalarm is not NULL GROUP BY f_companyname) c ON a.f_companyname=c.com where a.f_yxx='0' ";
				sql.append(comparsql1).append(table).append("  where ")
				.append(SHARDING_COLUMN).append(" between").append(" '"+lowerTime+"' ").append("and")
				.append(" '"+upperTime+"' ").append(comparsql2);
				
				log.info(sql.toString());
				List<Map<String, Object>> singleTableResult = jdbcTemplate.queryForList(sql.toString());
				
				if(tablesResult.size() == 0){
					tablesResult = singleTableResult;
				}else{
					for(Map<String, Object> a :tablesResult){
						String companyname = (String) a.get("f_companyname");
						for(Map<String, Object> b :singleTableResult){
							String bcompanyname = (String) b.get("f_companyname");
							if(companyname.equals(bcompanyname)){
								a.put("count", Integer.valueOf(a.get("count").toString())+Integer.valueOf(b.get("count").toString()));
							}
						}
					}
				}
			}else if(type=="warn"){
				String warnsql1 = "SELECT f_companyname,case when c.count is NULL then 0 else c.count end count FROM tb_d_company a LEFT JOIN	(select f_companyname com,count(1) count from ";
				String warnsql2 = " and f_lib_code in ('A_0101','A_0201','C_0101','C_0201','C_0203','C_0206','C_0207','C_0209','D_0301','D_0401','D_0501') GROUP BY f_companyname) c ON a.f_companyname=c.com where a.f_yxx='0'";
				sql.append(warnsql1).append(table).append("  where ")
				.append(SHARDING_COLUMN).append(" between").append(" '"+lowerTime+"' ").append("and")
				.append(" '"+upperTime+"' ").append(warnsql2);

				log.info(sql.toString());
				List<Map<String, Object>> singleTableResult = jdbcTemplate.queryForList(sql.toString());
				
				if(tablesResult.size() == 0){
					tablesResult = singleTableResult;
				}else{
					for(Map<String, Object> a :tablesResult){
						String companyname = (String) a.get("f_companyname");
						for(Map<String, Object> b :singleTableResult){
							String bcompanyname = (String) b.get("f_companyname");
							if(companyname.equals(bcompanyname)){
								a.put("count", Integer.valueOf(a.get("count").toString())+Integer.valueOf(b.get("count").toString()));
							}
						}
					}
				}
			}else if(type=="category"){
				String categorysql1 = "select AA.f_companyname,AA.count '逃',BB.count '访',CC.count '毒',DD.count '恐',EE.count '稳' FROM ";
				String ztsql1 = "(SELECT f_companyname,case when c.count is NULL then 0 else c.count end count FROM tb_d_company a LEFT JOIN (select f_companyname com,count(1) count from ";
				String ztsql2 = " and f_lib_code in ('A_0101') GROUP BY f_companyname) c ON a.f_companyname=c.com where a.f_yxx=0) AA, ";
				String sfsql1 = "(SELECT f_companyname,case when c.count is NULL then 0 else c.count end count FROM tb_d_company a LEFT JOIN	(select f_companyname com,count(1) count from ";
				String sfsql2 = " and f_lib_code in ('C_0201','C_0206','C_0209','D_0301','D_0401','D_0501') GROUP BY f_companyname) c ON a.f_companyname=c.com where a.f_yxx=0) BB,";
				String sdsql1 = "(SELECT f_companyname,case when c.count is NULL then 0 else c.count end count FROM tb_d_company a LEFT JOIN	(select f_companyname com,count(1) count from ";
				String sdsql2 = " and f_lib_code in ('A_0201','C_0203') GROUP BY f_companyname) c ON a.f_companyname=c.com where a.f_yxx=0) CC,";
				String sksql1 = "(SELECT f_companyname,case when c.count is NULL then 0 else c.count end count FROM tb_d_company a LEFT JOIN	(select f_companyname com,count(1) count from ";
				String sksql2 = " and f_lib_code in ('C_0207') GROUP BY f_companyname) c ON a.f_companyname=c.com where a.f_yxx=0) DD,";
				String swsql1 = "(SELECT f_companyname,case when c.count is NULL then 0 else c.count end count FROM tb_d_company a LEFT JOIN	(select f_companyname com,count(1) count from ";
				String swsql2 = " and f_lib_code in ('C_0101') GROUP BY f_companyname) c ON a.f_companyname=c.com where a.f_yxx=0) EE ";
				String categorysql2 = "WHERE AA.f_companyname=BB.f_companyname AND BB.f_companyname=CC.f_companyname AND CC.f_companyname=DD.f_companyname AND DD.f_companyname=EE.f_companyname";
				sql.append(categorysql1)
				.append(ztsql1).append(table).append("  where ").append(SHARDING_COLUMN).append(" between").append(" '"+lowerTime+"' ").append("and").append(" '"+upperTime+"' ").append(ztsql2)
				.append(sfsql1).append(table).append("  where ").append(SHARDING_COLUMN).append(" between").append(" '"+lowerTime+"' ").append("and").append(" '"+upperTime+"' ").append(sfsql2)
				.append(sdsql1).append(table).append("  where ").append(SHARDING_COLUMN).append(" between").append(" '"+lowerTime+"' ").append("and").append(" '"+upperTime+"' ").append(sdsql2)
				.append(sksql1).append(table).append("  where ").append(SHARDING_COLUMN).append(" between").append(" '"+lowerTime+"' ").append("and").append(" '"+upperTime+"' ").append(sksql2)
				.append(swsql1).append(table).append("  where ").append(SHARDING_COLUMN).append(" between").append(" '"+lowerTime+"' ").append("and").append(" '"+upperTime+"' ").append(swsql2)
				.append(categorysql2);

				log.info(sql.toString());
				List<Map<String, Object>> singleTableResult = jdbcTemplate.queryForList(sql.toString());
				
				if(tablesResult.size() == 0){
					tablesResult = singleTableResult;
				}else{
					for(Map<String, Object> a :tablesResult){
						String companyname = (String) a.get("f_companyname");
						//a.get("恐") = Integer.valueOf(a.get("恐").toString())+;
						for(Map<String, Object> b :singleTableResult){
							String bcompanyname = (String) b.get("f_companyname");
							if(companyname.equals(bcompanyname)){
								a.put("恐", Integer.valueOf(a.get("恐").toString())+Integer.valueOf(b.get("恐").toString()));
								a.put("毒", Integer.valueOf(a.get("毒").toString())+Integer.valueOf(b.get("毒").toString()));
								a.put("访", Integer.valueOf(a.get("访").toString())+Integer.valueOf(b.get("访").toString()));
								a.put("稳", Integer.valueOf(a.get("稳").toString())+Integer.valueOf(b.get("稳").toString()));
								a.put("逃", Integer.valueOf(a.get("逃").toString())+Integer.valueOf(b.get("逃").toString()));
							}
						}
					}
				}
			}else if(type=="jzcz"){ 
				String jzczsql1 = "select AA.f_companyname,AA.count '进站',BB.count '出站' FROM ";
				String jzsql1 = "(SELECT f_companyname,case when c.count is NULL then 0 else c.count end count FROM tb_d_company a LEFT JOIN (select f_companyname com,count(1) count from ";
				String jzsql2 = " and jczbs=0 GROUP BY f_companyname) c ON a.f_companyname=c.com where a.f_yxx=0) AA,";
				String czsql1 = "(SELECT f_companyname,case when c.count is NULL then 0 else c.count end count FROM tb_d_company a LEFT JOIN (select f_companyname com,count(1) count from ";
				String czsql2 = " and jczbs=1 GROUP BY f_companyname) c ON a.f_companyname=c.com where a.f_yxx=0) BB ";
				String jzczsql2 = "where AA.f_companyname=BB.f_companyname";
				sql.append(jzczsql1)
				.append(jzsql1).append(table).append("  where ").append(SHARDING_COLUMN).append(" between").append(" '"+lowerTime+"' ").append("and").append(" '"+upperTime+"' ").append(jzsql2)
				.append(czsql1).append(table).append("  where ").append(SHARDING_COLUMN).append(" between").append(" '"+lowerTime+"' ").append("and").append(" '"+upperTime+"' ").append(czsql2)
				.append(jzczsql2);
				
				log.info(sql.toString());
				List<Map<String, Object>> singleTableResult = jdbcTemplate.queryForList(sql.toString());
				
				if(tablesResult.size() == 0){
					tablesResult = singleTableResult;
				}else{
					for(Map<String, Object> a :tablesResult){
						String companyname = (String) a.get("f_companyname");
						for(Map<String, Object> b :singleTableResult){
							String bcompanyname = (String) b.get("f_companyname");
							if(companyname.equals(bcompanyname)){
								a.put("进站", Integer.valueOf(a.get("进站").toString())+Integer.valueOf(b.get("进站").toString()));
								a.put("出站", Integer.valueOf(a.get("出站").toString())+Integer.valueOf(b.get("出站").toString()));
							}
						}
					}
				}
			} else{
				sql.append("select * from ").append(table).append("  where ")
				.append(SHARDING_COLUMN).append(" between '").append(lowerTime).append("' and '")
				.append(upperTime);
			}
			long endTime = System.currentTimeMillis();
			log.info("sql执行时间："+(endTime-startTime)+"ms");
		}
				
		return tablesResult;
	}

	public static Map<String, Integer> getCountMap(List<Map<String, Object>> queryRespCs) {
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
	private static List<String> getShardingTables(DataSource ds,String TABLE_PREFIX) {
		List<String> result = new ArrayList<String>();
		Connection conn;
		try {
			conn = ds.getConnection();
			DatabaseMetaData md = conn.getMetaData();
			ResultSet rs = md.getTables(null, null, TABLE_PREFIX + "%", null);
			while (rs.next()) {
				result.add(rs.getString(3));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * yyyy-MM-dd HH:mm:ss format
	 * 
	 * @param dateString
	 * @return
	 */
	private static String genSuffix(String dateString) {
		String yearLower = dateString.substring(0, 4);
		String monthLower = dateString.substring(5, 7);
		String dayLower = dateString.substring(8, 9);
		String lowerPoint = yearLower + monthLower + dayLower;
		return lowerPoint;
	}
}
