package com.minginglamp.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.minginglamp.common.PageH;
import com.minginglamp.common.PageInquire;
import com.minginglamp.model.ZaPerson;
import com.minginglamp.sharding.PageResponse;
import com.minginglamp.sharding.ShardingUtils;
import com.minginglamp.utils.DateUtils;

@Service
public class ZaPersonService {
	
		private static final String SHARDING_COLUMN = "sysdate";
        private static final String TABLE_PREFIX = "za_v_r_person_jzl_1501";
        private static final String DATE_BOUNDARY = "2017080";
	@Autowired
	PageInquire pageInquire;
	
	@Autowired 
	DwdmService dwdmService;
	
	@Autowired
	ImportantPersonCategoryService importantPersonCategoryService;
	
	@Autowired
	DictionaryService dictionaryService;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
  
	public PageH findPagetable(String fname, String fnation,String fcardtype,String fcardnum,String fregion,String faddress,String fregperson,String beginTime,String endTime,String fcompanynum,
			String forgid,String fcollecttype,String sjly,String flibcode,String jczbs, int pageno,int size)
	{
		Map<String,String> subHjdqhMap = this.importantPersonCategoryService.listReHjdqhCategoryMap();
		JsonNode nationalJsonNode = dictionaryService.getNational();
		JsonNode libCodeJsonNode = dictionaryService.getLibCode();
		String sqlw = this.getQuery(fname, fnation, fcardtype, fcardnum, fregion, faddress, fregperson, beginTime, endTime, fcompanynum, forgid, fcollecttype, sjly,flibcode, jczbs);
		
		PageRequest pageReq = new PageRequest(pageno,size);
		String columnsStr = " * ";
		if (beginTime != null&&!"".equals(beginTime)&&endTime!= null&&!"".equals(endTime)) {
			/*//sqlw = sqlw + " and sysdate between '" + beginTime + "' and '" + endTime + "'";
			beginTime =beginTime;
			endTime = endTime;*/
		}else
		{
		 beginTime = "1900-01-01 00:00:00";
		 endTime = "2200-01-01 00:00:00";
		}
		String whereStr = " 1=1 "+sqlw;
		PageResponse queryResp = ShardingUtils.queryPage(jdbcTemplate, pageReq, columnsStr, beginTime, endTime, whereStr,SHARDING_COLUMN,TABLE_PREFIX,DATE_BOUNDARY);
		List<Map<String, Object>> listmaps =queryResp.getList();
		 PageH ph =new PageH();
		List<ZaPerson> zaPersons = new ArrayList<ZaPerson>(); 
		ZaPerson zaPerson = null;
		Map<String,Object> maps = null;
		for(int i = 0;i<listmaps.size();i++)
		{
			maps = listmaps.get(i);
			zaPerson = new ZaPerson();
			zaPerson.setFpersonid(maps.get("f_personid").toString());
			zaPerson.setFname(maps.get("f_name").toString());
			zaPerson.setFsex(maps.get("f_sex").toString());
			zaPerson.setFbirthday(maps.get("f_birthday").toString());
		//	zaPerson.setFnation(erMap.get("f_nation")!=null ? erMap.get("f_nation").toString():"");
			String nation = maps.get("f_nation").toString();
			if (nation != null && !nation.equals("")) {
				if(nationalJsonNode.get(nation)!=null){
					nation = nationalJsonNode.get(nation).asText();
					zaPerson.setFnation(nation);
				}
				
			}else
			{
				zaPerson.setFnation("未知");
			}
		//	zaPerson.setFcardtype(erMap.get("f_cardtype")!=null ? erMap.get("f_cardtype").toString():"");
			zaPerson.setFcardtype("身份证");
			zaPerson.setFcardnum(maps.get("f_cardnum").toString());
		//	zaPerson.setFregion(erMap.get("f_region")!=null ? erMap.get("f_region").toString():"");
			String region = maps.get("f_region").toString();
			if(region!=null && !"".equals(region))
			{
				zaPerson.setFregion(subHjdqhMap.get(region));
			}else
			{
				zaPerson.setFregion("未知");
			}
			
			zaPerson.setFaddress(maps.get("f_address").toString());
			zaPerson.setFregperson(maps.get("f_regperson").toString());
			zaPerson.setFregtime(maps.get("f_regtime").toString());
			zaPerson.setFreglinktype(maps.get("f_reglinktype").toString());
			zaPerson.setFuploadtime(maps.get("f_uploadtime").toString());
			zaPerson.setFcompanynum(maps.get("f_companynum").toString());
			zaPerson.setFterminalnum(maps.get("f_terminalnum").toString());
			zaPerson.setFversion(maps.get("f_version").toString());
			zaPerson.setFnameqp(maps.get("f_name_qp").toString());
		//	zaPerson.setForgid(erMap.get("f_orgid")!=null ? erMap.get("f_orgid").toString():"");
			String orgid = maps.get("f_orgid").toString();
			if(orgid!=null && !"".equals(orgid))
			{
				Map<String, String>  dwdmMap =dwdmService.getDwdmMap(orgid);
				zaPerson.setForgid(dwdmMap.get(orgid));
			}else
			{
				zaPerson.setForgid("未知");
			}
			
			//zaPerson.setFcollecttype(erMap.get("f_collecttype")!=null ? erMap.get("f_collecttype").toString():"");
			String collecttype = maps.get("f_collecttype").toString();
			if("0".equals(collecttype))
			{
				zaPerson.setFcollecttype("机读");
			}else if("1".equals(collecttype))
			{
				zaPerson.setFcollecttype("手工");
			}else
			{
				zaPerson.setFcollecttype("未知");
			}
			zaPerson.setSysdate(maps.get("sysdate").toString());
			//zaPerson.setSjly(erMap.get("sjly")!=null ? erMap.get("sjly").toString():"");
			String fsjly = maps.get("sjly").toString();
			if("1".equals(fsjly))
			{
				zaPerson.setSjly("汽车站");
			}else if("3".equals(fsjly))
			{
				zaPerson.setSjly("火车站");
			}else if("4".equals(fsjly))
			{
				zaPerson.setSjly("飞机场");
			}else
			{
				zaPerson.setSjly("未知");
			}
			
			String fjczbs = maps.get("jczbs").toString();
			if("0".equals(fjczbs))
			{
				zaPerson.setJczbs("进站");
			}else if("1".equals(fjczbs))
			{
				zaPerson.setJczbs("出站");
			}else
			{
				zaPerson.setJczbs("未知");
			}
			
			Object libCo = maps.get("f_lib_code");
			String libCode = "";
			if(libCo!=null&&libCo!=""){
				libCode = maps.get("f_lib_code").toString();
			}
			if (libCode != null && !libCode.equals("")) {
				if(libCodeJsonNode.get(libCode)!=null){
					libCode = libCodeJsonNode.get(libCode).asText();
					zaPerson.setFlibcode(libCode);
				}else{
					zaPerson.setFlibcode(libCode);
				}
			}else
			{
				zaPerson.setFlibcode("");
			}
			
			zaPersons.add(zaPerson);
		}
		
         
          ph.setContent(zaPersons);
          ph.setTotalPages(queryResp.getTotalPages());
          ph.setTotalElements(queryResp.getTotalCount());
          ph.setNumber(pageno);
          ph.setNumberElements(queryResp.getCurrentsize());
          ph.setPageSize(size);
          
		return ph;
		
	}
  
	public PageH findPage(String fname, String fnation,String fcardtype,String fcardnum,String fregion,String faddress,String fregperson,String beginTime,String endTime,String fcompanynum,
			String forgid,String fcollecttype,String sjly,String flibcode, String jczbs, int pageno,int size) {
		Map<String,String> subHjdqhMap = this.importantPersonCategoryService.listHjdqhCategoryMap();
		JsonNode nationalJsonNode = dictionaryService.getNational();
	//	Map<String, String>  dwdmMap =dwdmService.getDwdmMap(code)
		//拼接sql
		String sqlw = this.getQuery(fname, fnation, fcardtype, fcardnum, fregion, faddress, fregperson, beginTime, endTime, fcompanynum, forgid, fcollecttype, sjly,flibcode,jczbs);
		List<Map<String,Object>> listcount = null;
		List<Map<String,Object>> list = null;
		PageH pageHelper = new PageH();
		
		String sqlCount = "select count(*) c from za_v_r_person_jzl_1501 where 1 = 1"+sqlw;
		
		System.out.println(sqlCount);
		
		listcount = pageInquire.findPageForList(sqlCount);
		Iterator itcount = listcount.iterator();
		int pageCount = 0;
		while(itcount.hasNext()){
			Map pageCountMap = (Map)itcount.next();
			Long lg = (Long)pageCountMap.get("c");
			pageCount = lg.intValue();
		}
		
		String sql = "select * from za_v_r_person_jzl_1501 where 1 = 1"+sqlw+" limit " + (pageno) * size
						+ " , " + size;
		System.out.println(sql);
		list = pageInquire.findPageForList(sql);
		Iterator it = list.iterator();
		List<ZaPerson> zaPersons = new ArrayList<ZaPerson>();
		ZaPerson zaPerson = null;
		while(it.hasNext()){
			Map erMap = (Map)it.next();
			zaPerson = new ZaPerson();
			zaPerson.setFpersonid(erMap.get("f_personid")!=null ? erMap.get("f_personid").toString():"");
			zaPerson.setFname(erMap.get("f_name")!=null ? erMap.get("f_name").toString():"");
			zaPerson.setFsex(erMap.get("f_sex")!=null ? erMap.get("f_sex").toString():"");
			zaPerson.setFbirthday(erMap.get("f_birthday")!=null ? erMap.get("f_birthday").toString():"");
		//	zaPerson.setFnation(erMap.get("f_nation")!=null ? erMap.get("f_nation").toString():"");
			String nation = erMap.get("f_nation")!=null ? erMap.get("f_nation").toString():"";
			if (nation != null && !nation.equals("")) {
				if(nationalJsonNode.get(nation)!=null){
					nation = nationalJsonNode.get(nation).asText();
					zaPerson.setFnation(nation);
				}
				
			}else
			{
				zaPerson.setFnation("未知");
			}
		//	zaPerson.setFcardtype(erMap.get("f_cardtype")!=null ? erMap.get("f_cardtype").toString():"");
			zaPerson.setFcardtype("身份证");
			zaPerson.setFcardnum(erMap.get("f_cardnum")!=null ? erMap.get("f_cardnum").toString():"");
		//	zaPerson.setFregion(erMap.get("f_region")!=null ? erMap.get("f_region").toString():"");
			String region = erMap.get("f_region")!=null ? erMap.get("f_region").toString():"";
			if(region!=null && !"".equals(region))
			{
				zaPerson.setFregion(subHjdqhMap.get(region));
			}else
			{
				zaPerson.setFregion("未知");
			}
			
			zaPerson.setFaddress(erMap.get("f_address")!=null ? erMap.get("f_address").toString():"");
			zaPerson.setFregperson(erMap.get("f_regperson")!=null ? erMap.get("f_regperson").toString():"");
			zaPerson.setFregtime(erMap.get("f_regtime")!=null ? erMap.get("f_regtime").toString():"");
			zaPerson.setFreglinktype(erMap.get("f_reglinktype")!=null ? erMap.get("f_reglinktype").toString():"");
			zaPerson.setFuploadtime(erMap.get("f_uploadtime")!=null ? erMap.get("f_uploadtime").toString():"");
			zaPerson.setFcompanynum(erMap.get("f_companynum")!=null ? erMap.get("f_companynum").toString():"");
			zaPerson.setFterminalnum(erMap.get("f_terminalnum")!=null ? erMap.get("f_terminalnum").toString():"");
			zaPerson.setFversion(erMap.get("f_version")!=null ? erMap.get("f_version").toString():"");
			zaPerson.setFnameqp(erMap.get("f_name_qp")!=null ? erMap.get("f_name_qp").toString():"");
		//	zaPerson.setForgid(erMap.get("f_orgid")!=null ? erMap.get("f_orgid").toString():"");
			String orgid = erMap.get("f_orgid")!=null ? erMap.get("f_orgid").toString():"";
			if(orgid!=null && !"".equals(orgid))
			{
				Map<String, String>  dwdmMap =dwdmService.getDwdmMap(orgid);
				zaPerson.setForgid(dwdmMap.get(orgid));
			}else
			{
				zaPerson.setForgid("未知");
			}
			
			//zaPerson.setFcollecttype(erMap.get("f_collecttype")!=null ? erMap.get("f_collecttype").toString():"");
			String collecttype = erMap.get("f_collecttype")!=null ? erMap.get("f_collecttype").toString():"";
			if("0".equals(collecttype))
			{
				zaPerson.setFcollecttype("机读");
			}else if("1".equals(collecttype))
			{
				zaPerson.setFcollecttype("手工");
			}else
			{
				zaPerson.setFcollecttype("未知");
			}
			zaPerson.setSysdate(erMap.get("sysdate")!=null ? erMap.get("sysdate").toString():"");
			//zaPerson.setSjly(erMap.get("sjly")!=null ? erMap.get("sjly").toString():"");
			String fsjly = erMap.get("sjly")!=null ? erMap.get("sjly").toString():"";
			if("1".equals(fsjly))
			{
				zaPerson.setSjly("汽车站");
			}else if("3".equals(fsjly))
			{
				zaPerson.setSjly("火车站");
			}else if("4".equals(fsjly))
			{
				zaPerson.setSjly("飞机场");
			}else
			{
				zaPerson.setSjly("未知");
			}
			
			String fjczbs = erMap.get("jczbs")!=null ? erMap.get("jczbs").toString():"";
			if("0".equals(fjczbs))
			{
				zaPerson.setJczbs("进站");
			}else if("1".equals(fjczbs))
			{
				zaPerson.setJczbs("出站");
			}else
			{
				zaPerson.setJczbs("未知");
			}
			zaPersons.add(zaPerson);
			
		}
		
		pageHelper.setTotalElements(pageCount);
		pageHelper.setNumberElements(zaPersons.size());
		pageHelper.setNumber(pageno);
        int totalpage = 0;
        if(pageCount%size==0){
        	totalpage=pageCount/size;
        }else{
        	totalpage=(pageCount/size)+1;
        }

		pageHelper.setPageNo(pageno);
		pageHelper.setPageSize(size);
		pageHelper.setContent(zaPersons);
		pageHelper.setTotalPages(totalpage);
		pageHelper.setStart(pageno*size);
		
		
		return pageHelper;
		
	}
	
	
	private String getQuery(String fname, String fnation,String fcardtype,String fcardnum,String fregion,String faddress,String fregperson,String beginTime,String endTime,String fcompanynum,
			String forgid,String fcollecttype,String sjly,String flibcode,String jczbs) {
		
		String sqlw = "";
		if(flibcode!=null && !"".equals(flibcode)){
			sqlw = sqlw +" and f_lib_code like '%"+flibcode+"%'";
		}
		if(fname!=null && !"".equals(fname))
		{
			sqlw = sqlw +" and f_name like '%"+fname+"%'";
		}
		if(fnation!=null && !"".equals(fnation))
		{
			sqlw = sqlw +" and f_nation = '"+fnation+"'";
		}
		
		if(fcardtype!=null && !"".equals(fcardtype))
		{
			sqlw = sqlw +" and f_cardtype = '"+fcardtype+"'";
		}
		if(fcardnum!=null && !"".equals(fcardnum))
		{
			sqlw = sqlw +" and f_cardnum like '%"+fcardnum+"%'";
		}
		if (fregion != null&&!"".equals(fregion)) {
			String[] addressArry = fregion.split("-");
			if (addressArry.length > 1) {
				
				if("null".equals(addressArry[0])){
				String sqla = "select CODE from t_d_qgxzqh where NAME like '%"+addressArry[1]+"%'";
				
				System.out.println(sqla);
				ResultSet resultSet = pageInquire.findPage(sqla);
                 String codea ="";
				try {
					if (resultSet.next()) {
						codea += "'"+resultSet.getString("CODE")+"',";
					}else if(!resultSet.next())
					{
						codea+="'',";
					}
					codea = codea.substring(0, codea.length()-1);
				} catch (NumberFormatException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				
				sqlw = sqlw + " and (f_region in ("+codea+") OR f_region like '%"
						+ addressArry[1] + "%')";
				System.out.println("null===="+sqlw);
				}else if(!"null".equals(addressArry[0]))
				{
					String zaddress = addressArry[0].trim().replaceAll("0*$", "");
					sqlw = sqlw + " and (f_region like '" + zaddress + "%' OR f_region like '%"
							+ addressArry[1] + "%')";
				}
			} else {
				sqlw = sqlw + " and f_region like '%" + fregion + "%'";
			}
		}
		if(faddress!=null && !"".equals(faddress))
		{
			sqlw = sqlw +" and f_address like '%"+faddress+"%'";
		}
		if(fregperson!=null && !"".equals(fregperson))
		{
			sqlw = sqlw +" and f_regperson like '%"+fregperson+"%'";
		}
		
		
		if(fcompanynum!=null && !"".equals(fcompanynum))
		{
			sqlw = sqlw +" and f_companynum like '%"+fcompanynum+"%'";
		}
		if(forgid!=null && !"".equals(forgid))
		{
			sqlw = sqlw +" and f_orgid like '%"+forgid+"%'";
		}
		if(fcollecttype!=null && !"".equals(fcollecttype))
		{
			sqlw = sqlw +" and f_collecttype = '"+fcollecttype+"'";
		}
		
		if(sjly!=null && !"".equals(sjly))
		{
			sqlw = sqlw +" and sjly = '"+sjly+"'";
		}
		
		if(jczbs!=null && !"".equals(jczbs))
		{
			sqlw = sqlw +" and jczbs = '"+jczbs+"'";
		}
				return sqlw;
		
	}


}
