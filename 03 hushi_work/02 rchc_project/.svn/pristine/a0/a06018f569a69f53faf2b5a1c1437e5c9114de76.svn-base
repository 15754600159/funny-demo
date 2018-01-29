package com.minginglamp.service;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.mortbay.log.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;
import com.minginglamp.common.PageH;
import com.minginglamp.common.PageHelper;
import com.minginglamp.common.PageInquire;
import com.minginglamp.crud.CarCheckCrud;
import com.minginglamp.crud.CarTagInfoCrud;
import com.minginglamp.crud.PlateCheckLogCrud;
import com.minginglamp.model.CarCheck;
import com.minginglamp.model.Dwdm;
import com.minginglamp.model.PersonCheckLog;
import com.minginglamp.model.PlateCheckLog;
import com.minginglamp.model.PlateTagInfo;
import com.minginglamp.model.XfPerson;
import com.minginglamp.vo.PersonCarUcodeVo;
import com.minginglamp.vo.PersonCarVo;

@Service
public class CarCheckService {

	@Autowired
	CarCheckCrud carCheckCrud;

	@Autowired
	CarTagInfoCrud carTagInfoCrud;
	
	
	@Autowired
	private PlateCheckLogCrud plateCheckLogCrud;
	@Autowired
	private ImportantCarCategoryService importantCarCategoryService;
	
	@Autowired
	XzqhService xzqhService;

	@Autowired
	private DictionaryService dictionaryService;

	@Autowired
	PageInquire pageInquire;

	@Autowired
	private DwdmService dwdmService;
	
	public List<PlateTagInfo> findBy(String plateNo, String tag, String plateType) {

		return carTagInfoCrud.findByPlateNoAndTagAndPlateType(plateNo, tag, plateType);

	}
	
	public PlateCheckLog findById(String id) {

		 String sql = " select * from plate_check_log where 1=1  and id='" + id + "' ";
		 Log.info(sql);
		System.out.println(sql);
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		list = pageInquire.findPageForList(sql);
		Iterator it = list.iterator();
		PlateCheckLog plateCheckLog = null;
		
		
		List<Dwdm> dwdmList = dwdmService.findAll();
    	Map<String,String> dwdmMap =  new HashMap<String,String>();
    	for(Dwdm dwdm : dwdmList){
    		dwdmMap.put(dwdm.getCode(), dwdm.getName());
    	}
    	
		JsonNode sblxJsonNode = dictionaryService.getSblx();
		JsonNode ssbdlyJsonNode = dictionaryService.getSsbdly();
		JsonNode plateTypeJsonNode = dictionaryService.getPlateType();
		while(it.hasNext()){
			Map erMap = (Map)it.next();
			plateCheckLog = new PlateCheckLog();
			plateCheckLog.setId(erMap.get("id")!=null ? erMap.get("id").toString():"");
			//plateCheckLog.setSource(erMap.get("source")!=null ? erMap.get("source").toString():"");
			String sourcename = erMap.get("source")!=null ? erMap.get("source").toString():"";
			if(sblxJsonNode.get(sourcename)!=null &&!"".equals(sourcename))
			{
				plateCheckLog.setSource(sblxJsonNode.get(sourcename).asText());
			}
	//		plateCheckLog.setPlateType(erMap.get("plate_type")!=null ? erMap.get("plate_type").toString():"");
			String platetype = erMap.get("plate_type")!=null ? erMap.get("plate_type").toString():"";
			if(plateTypeJsonNode.get(platetype)!=null&& !"".equals(platetype))
			{
				plateCheckLog.setPlateType(plateTypeJsonNode.get(platetype).asText());
			}
			plateCheckLog.setPlateNo(erMap.get("plate_no")!=null ? erMap.get("plate_no").toString():"");
			plateCheckLog.setTags(erMap.get("tags")!=null ? erMap.get("tags").toString():"");
			plateCheckLog.setTagsContent(erMap.get("tags_content")!=null ? erMap.get("tags_content").toString():"");
			plateCheckLog.setCreateTime(erMap.get("create_time")!=null ? erMap.get("create_time").toString():"");
		//	plateCheckLog.setPushTarget(erMap.get("push_target")!=null ? erMap.get("push_target").toString():"");
			String pushTaget = erMap.get("push_target")!=null ? erMap.get("push_target").toString():"";
			if(!"".equals(pushTaget))
			{
				String[] pushTagetArry = pushTaget.split(",");
				String pushTagetTemp = "";
				for(String push : pushTagetArry){
					if (ssbdlyJsonNode.get(push) != null &&!"".equals(ssbdlyJsonNode.get(push))) {
						push = ssbdlyJsonNode.get(push).asText();
					}
					pushTagetTemp += push+",";
				}
				pushTagetTemp = pushTagetTemp.substring(0,pushTagetTemp.length()-1);
				
				plateCheckLog.setPushTarget(pushTagetTemp);
			}
			plateCheckLog.setSfzh(erMap.get("sfzh")!=null ? erMap.get("sfzh").toString():"");
			plateCheckLog.setPersonif(erMap.get("personif")!=null ? erMap.get("personif").toString():"");
			plateCheckLog.setCzyq(erMap.get("czyq")!=null ? erMap.get("czyq").toString():"");
			plateCheckLog.setCheckaddress(erMap.get("check_address")!=null ? erMap.get("check_address").toString():"");
			plateCheckLog.setLocation(erMap.get("location")!=null ? erMap.get("location").toString():"");
			plateCheckLog.setBirthplace(erMap.get("birthplace")!=null ? erMap.get("birthplace").toString():"");
			plateCheckLog.setLgdw(erMap.get("lg_place")!=null ? erMap.get("lg_place").toString():"");
		//	plateCheckLog.setCheckdept(erMap.get("checkdept")!=null ? erMap.get("checkdept").toString():"");
			String checkDept = erMap.get("checkdept")!=null ? erMap.get("checkdept").toString():"";
			if(dwdmMap.containsKey(checkDept))
			{
				plateCheckLog.setCheckdept(dwdmMap.get(checkDept));
			}
			plateCheckLog.setPoliceno(erMap.get("policeno")!=null ? erMap.get("policeno").toString():"");
			plateCheckLog.setPolicephone(erMap.get("policephone")!=null ? erMap.get("policephone").toString():"");
			plateCheckLog.setPolicename(erMap.get("police_name")!=null ? erMap.get("police_name").toString():"");
			plateCheckLog.setCheckreason(erMap.get("check_reason")!=null ? erMap.get("check_reason").toString():"");
			plateCheckLog.setName(erMap.get("name")!=null ? erMap.get("name").toString():"");
			plateCheckLog.setVehicleType(erMap.get("vehicle_type")!=null ? erMap.get("vehicle_type").toString():"");
			plateCheckLog.setColor(erMap.get("color")!=null ? erMap.get("color").toString():"");
			plateCheckLog.setNation(erMap.get("nation")!=null ? erMap.get("nation").toString():"");
			plateCheckLog.setSex(erMap.get("sex")!=null ? erMap.get("sex").toString():"");
			plateCheckLog.setUpdatejwtflag(erMap.get("update_jwt_flag")!=null ? erMap.get("update_jwt_flag").toString():"");
		}
		return plateCheckLog;

	}

	
/*public Page<PlateCheckLog> findPlateCheckLog(String name,String startTime, String endTime, String source,String ucode,String tags,String tags2,String policename,String policeno,String plateNo,String checkaddress,String plateType,String personif, int page, int pageSize){
		
		Page<PlateCheckLog> plateCheckLogPage = null;
		if("00".equals(personif))
		{
		 plateCheckLogPage = plateCheckLogCrud.findPage(startTime, endTime, source, plateNo,checkaddress,plateType,tags,tags2,ucode,policename,policeno,name,new PageRequest(page, pageSize));
		}else if("01".equals(personif))
		{
		plateCheckLogPage = plateCheckLogCrud.findPageTags(startTime, endTime, source, plateNo,checkaddress, plateType,tags,tags2,personif,ucode,policename,policeno,name,new PageRequest(page, pageSize));
		}

		
		List<Dwdm> dwdmList = dwdmService.findAll();
    	Map<String,String> dwdmMap =  new HashMap<String,String>();
    	for(Dwdm dwdm : dwdmList){
    		dwdmMap.put(dwdm.getCode(), dwdm.getName());
    	}
    	
		JsonNode sblxJsonNode = dictionaryService.getSblx();
		JsonNode ssbdlyJsonNode = dictionaryService.getSsbdly();
		JsonNode plateTypeJsonNode = dictionaryService.getPlateType();
    	if(!plateCheckLogPage.getContent().isEmpty()){
    		for(PlateCheckLog plateCheckLog : plateCheckLogPage.getContent()){
    			if(dwdmMap.containsKey(plateCheckLog.getCheckdept())){
    				plateCheckLog.setCheckdept(dwdmMap.get(plateCheckLog.getCheckdept()));
    			}
    			String platetype = plateCheckLog.getPlateType();
    			if (platetype != null && !platetype.equals("")) {
					if (plateTypeJsonNode.get(platetype) != null) {
						platetype = plateTypeJsonNode.get(platetype).asText();
					}
					plateCheckLog.setPlateType(platetype);
				}
    			String sourceName = plateCheckLog.getSource();
				if (sourceName != null && !sourceName.equals("")) {
					if (sblxJsonNode.get(sourceName) != null) {
						sourceName = sblxJsonNode.get(sourceName).asText();
					}
					plateCheckLog.setSource(sourceName);
				}
				
				String pushTaget = plateCheckLog.getPushTarget();
				if (pushTaget != null && !pushTaget.equals("")) {
					String[] pushTagetArry = pushTaget.split(",");
					String pushTagetTemp = "";
					for(String push : pushTagetArry){
						if (ssbdlyJsonNode.get(push) != null &&!"".equals(ssbdlyJsonNode.get(push))) {
							push = sblxJsonNode.get(push).asText();
						}
						pushTagetTemp += push+",";
					}
					pushTagetTemp = pushTagetTemp.substring(0,pushTagetTemp.length()-1);
					plateCheckLog.setPushTarget(pushTagetTemp);
				}
	    	}
    	}
    	
		
    	return plateCheckLogPage;
    }*/
	
	public PageH findPlateCheckLog(String name,String startTime, String endTime, String source,String ucode,String tags,String tags2,String policename,String policeno,String plateNo,String checkaddress,String plateType,String personif,String birthplace,String sfzh,int page, int pageSize){
		
		String sqlw = this.getplateQuery(name, startTime, endTime, source, ucode, tags, tags2, policename, policeno, plateNo, checkaddress, plateType, personif,birthplace,sfzh);
		List<Map<String,Object>> listcount = null;
		List<Map<String,Object>> list = null;
		PageH pageHelper = new PageH();
		String sqlCount = "select count(*) c from plate_check_log where 1 = 1"+sqlw;
		
		System.out.println(sqlCount);
		Log.info(sqlCount);
		
		listcount = pageInquire.findPageForList(sqlCount);
		Iterator itcount = listcount.iterator();
		int pageCount = 0;
		while(itcount.hasNext()){
			Map pageCountMap = (Map)itcount.next();
			Long lg = (Long)pageCountMap.get("c");
			pageCount = lg.intValue();
		}
		
		String sql = "select * from plate_check_log where 1 = 1"+sqlw+" order by create_time DESC limit " + (page) * pageSize
						+ " , " + pageSize;
		System.out.println(sql);
		Log.info(sql);
		list = pageInquire.findPageForList(sql);
		Iterator it = list.iterator();
		List<PlateCheckLog> plateCheckLogs = new ArrayList<PlateCheckLog>();
		PlateCheckLog plateCheckLog = null;
		
		
		List<Dwdm> dwdmList = dwdmService.findAll();
    	Map<String,String> dwdmMap =  new HashMap<String,String>();
    	for(Dwdm dwdm : dwdmList){
    		dwdmMap.put(dwdm.getCode(), dwdm.getName());
    	}
    	
		JsonNode sblxJsonNode = dictionaryService.getSblx();
		JsonNode ssbdlyJsonNode = dictionaryService.getSsbdly();
		JsonNode plateTypeJsonNode = dictionaryService.getPlateType();
		while(it.hasNext()){
			Map erMap = (Map)it.next();
			plateCheckLog = new PlateCheckLog();
			plateCheckLog.setId(erMap.get("id")!=null ? erMap.get("id").toString():"");
			//plateCheckLog.setSource(erMap.get("source")!=null ? erMap.get("source").toString():"");
			String sourcename = erMap.get("source")!=null ? erMap.get("source").toString():"";
			if(sblxJsonNode.get(sourcename)!=null &&!"".equals(sourcename))
			{
				plateCheckLog.setSource(sblxJsonNode.get(sourcename).asText());
			}
	//		plateCheckLog.setPlateType(erMap.get("plate_type")!=null ? erMap.get("plate_type").toString():"");
			String platetype = erMap.get("plate_type")!=null ? erMap.get("plate_type").toString():"";
			if(plateTypeJsonNode.get(platetype)!=null&& !"".equals(platetype))
			{
				plateCheckLog.setPlateType(plateTypeJsonNode.get(platetype).asText());
			}
			plateCheckLog.setPlateNo(erMap.get("plate_no")!=null ? erMap.get("plate_no").toString():"");
			plateCheckLog.setTags(erMap.get("tags")!=null ? erMap.get("tags").toString():"");
			plateCheckLog.setTagsContent(erMap.get("tags_content")!=null ? erMap.get("tags_content").toString():"");
			plateCheckLog.setCreateTime(erMap.get("create_time")!=null ? erMap.get("create_time").toString():"");
		//	plateCheckLog.setPushTarget(erMap.get("push_target")!=null ? erMap.get("push_target").toString():"");
			String pushTaget = erMap.get("push_target")!=null ? erMap.get("push_target").toString():"";
			if(!"".equals(pushTaget))
			{
				String[] pushTagetArry = pushTaget.split(",");
				String pushTagetTemp = "";
				for(String push : pushTagetArry){
					if (ssbdlyJsonNode.get(push) != null &&!"".equals(ssbdlyJsonNode.get(push))) {
						push = ssbdlyJsonNode.get(push).asText();
					}
					pushTagetTemp += push+",";
				}
				pushTagetTemp = pushTagetTemp.substring(0,pushTagetTemp.length()-1);
				
				plateCheckLog.setPushTarget(pushTagetTemp);
			}
			plateCheckLog.setSfzh(erMap.get("sfzh")!=null ? erMap.get("sfzh").toString():"");
			plateCheckLog.setPersonif(erMap.get("personif")!=null ? erMap.get("personif").toString():"");
			plateCheckLog.setCzyq(erMap.get("czyq")!=null ? erMap.get("czyq").toString():"");
			plateCheckLog.setCheckaddress(erMap.get("check_address")!=null ? erMap.get("check_address").toString():"");
			plateCheckLog.setLocation(erMap.get("location")!=null ? erMap.get("location").toString():"");
			plateCheckLog.setBirthplace(erMap.get("birthplace")!=null ? erMap.get("birthplace").toString():"");
			plateCheckLog.setLgdw(erMap.get("lg_place")!=null ? erMap.get("lg_place").toString():"");
		//	plateCheckLog.setCheckdept(erMap.get("checkdept")!=null ? erMap.get("checkdept").toString():"");
			String checkDept = erMap.get("checkdept")!=null ? erMap.get("checkdept").toString():"";
			if(dwdmMap.containsKey(checkDept))
			{
				plateCheckLog.setCheckdept(dwdmMap.get(checkDept));
			}
			plateCheckLog.setPoliceno(erMap.get("policeno")!=null ? erMap.get("policeno").toString():"");
			plateCheckLog.setPolicephone(erMap.get("policephone")!=null ? erMap.get("policephone").toString():"");
			plateCheckLog.setPolicename(erMap.get("police_name")!=null ? erMap.get("police_name").toString():"");
			plateCheckLog.setCheckreason(erMap.get("check_reason")!=null ? erMap.get("check_reason").toString():"");
			plateCheckLog.setName(erMap.get("name")!=null ? erMap.get("name").toString():"");
			plateCheckLog.setVehicleType(erMap.get("vehicle_type")!=null ? erMap.get("vehicle_type").toString():"");
			plateCheckLog.setColor(erMap.get("color")!=null ? erMap.get("color").toString():"");
			plateCheckLog.setNation(erMap.get("nation")!=null ? erMap.get("nation").toString():"");
			plateCheckLog.setSex(erMap.get("sex")!=null ? erMap.get("sex").toString():"");
			plateCheckLog.setUpdatejwtflag(erMap.get("update_jwt_flag")!=null ? erMap.get("update_jwt_flag").toString():"");
			plateCheckLogs.add(plateCheckLog);
		}
		
		pageHelper.setTotalElements(pageCount);
		pageHelper.setNumberElements(plateCheckLogs.size());
		pageHelper.setNumber(page);
        int totalpage = 0;
        if(pageCount%pageSize==0){
        	totalpage=pageCount/pageSize;
        }else{
        	totalpage=(pageCount/pageSize)+1;
        }

		pageHelper.setPageNo(page);
		pageHelper.setPageSize(pageSize);
		pageHelper.setContent(plateCheckLogs);
		pageHelper.setTotalPages(totalpage);
		pageHelper.setStart(page*pageSize);
		
		
		return pageHelper;
		
	}
	
	private String getplateQuery(String name,String startTime, String endTime, String source,String ucode,String tags,String tags2,String policename,String policeno,String plateNo,String checkaddress,String plateType,String personif,String addressDetails,String sfzh) {
		
		
		String sqlw = "";
		
		if (addressDetails != null&&!"".equals(addressDetails)) {
			String[] addressArry = addressDetails.split("-");
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
				
				sqlw = sqlw + " and (birthplace in ("+codea+") OR birthplace like '%"
						+ addressArry[1] + "%')";
				System.out.println("null===="+sqlw);
				}else if(!"null".equals(addressArry[0]))
				{
					sqlw = sqlw + " and (birthplace like '%" + addressArry[0] + "%' OR birthplace like '%"
							+ addressArry[1] + "%')";
				}
			} else {
				sqlw = sqlw + " and birthplace like '%" + addressDetails + "%'";
			}
		}
		if(name!=null && !"".equals(name))
		{
			sqlw = sqlw +" and name like '%"+name+"%'";
		}
		if (startTime != null&&!"".equals(startTime)&&endTime!= null&&!"".equals(endTime)) {
			sqlw = sqlw + " and create_time between '" + startTime + "' and '" + endTime + "'";
		}
		if(source!=null && !"".equals(source))
		{
			sqlw = sqlw +" and source = '"+source+"'";
		}
		if (ucode != null&&!"".equals(ucode)) {
			String[] ucodeArry = ucode.split("-");
			if (ucodeArry.length > 1) {
				String code = ucodeArry[0].trim().replaceAll("0*$", "");
				sqlw = sqlw + " and (checkdept like '" + code  + "%' OR checkdept = '" + ucodeArry[1] + "')";
			} else {
				sqlw = sqlw + " and checkdept like '%" + ucode + "%'";
			}
		}
		if(tags!=null && !"".equals(tags))
		{
			sqlw = sqlw +" and tags like '%"+tags+"%'";
		}
		if(tags2!=null && !"".equals(tags2))
		{
			sqlw = sqlw +" and tags like '%"+tags2+"%'";
		}
		if(policename!=null && !"".equals(policename))
		{
			sqlw = sqlw +" and police_name like '%"+policename+"%'";
		}
		if(policeno!=null && !"".equals(policeno))
		{
			sqlw = sqlw +" and policeno like '"+policeno+"%'";
		}
		
		
		
		if(plateNo!=null && !"".equals(plateNo))
		{
			sqlw = sqlw +" and plate_no like '%"+plateNo+"%'";
		}
		if(checkaddress!=null && !"".equals(checkaddress))
		{
			sqlw = sqlw +" and check_address like '%"+checkaddress+"%'";
		}
		if(plateType!=null && !"".equals(plateType))
		{
			sqlw = sqlw +" and plate_type like '%"+plateType+"%'";
		}
		if(personif!=null && !"".equals(personif)&&"01".equals(personif))
		{
			sqlw = sqlw +" and personif = '"+personif+"'";
		}
		if(sfzh!=null && !"".equals(sfzh))
		{
			sqlw = sqlw +" and sfzh like '"+sfzh+"%'";
		}
				return sqlw;
		
	}
	@Transactional
	public CarCheck save(CarCheck carCheck) {
		return carCheckCrud.save(carCheck);

	}

	/**
	 * 分层统计逻辑业务层
	 * @param checkAddress
	 * @return
	 */
	public List<PersonCarUcodeVo> tjUcode(String checkAddress, String beginTime, String endTime) {
		 
		 List<PersonCarUcodeVo> results = new ArrayList<PersonCarUcodeVo>();
		 
		 Map<String, String> map = new HashMap<String,String>();
		 String sqlu="select code,name from tb_d_dwdm";
		 ResultSet result = pageInquire.findPage(sqlu);
		 
		 
		 ResultSetMetaData rsmd;
		try {
			rsmd = result.getMetaData();
			int count = rsmd.getColumnCount();
			while (result.next()) {
	        for (int i = 1; i <= count; i++) {  
	        	String key =result.getString("code");
	            String value = result.getString("name");  
	            map.put(key, value);  
	        } 
		}
			
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}  
		String querysql ="";
		if(checkAddress!=null&&!checkAddress.equals("")&&!checkAddress.equals("null")){
			querysql = "and check_address= '"+ checkAddress + "'";
		}else if(checkAddress.equals("null")){
			querysql = "and (check_address is null or check_address = '')";
		}
		 
		// String sql="select ucode u,check_address ck,tb.name nm,count(*) c from jwt_check_cars_log_1501 
		//jw left join tb_d_dwdm tb on jw.ucode=tb.code where 1=1 and check_address= '"+checkAddress+"' GROUP BY ucode";
		String sql = "select ucode u,check_address ck,count(*) c from jwt_check_cars_log_1501 jw where 1=1 "+ querysql +" and check_time between '" + beginTime + "' and '" + endTime + "' GROUP BY ucode";
		 System.out.println("======================"+sql);
		 ResultSet rs = pageInquire.findPage(sql);
		 PersonCarUcodeVo personCarUcodeVo = null;
		
		
			try {
			// ResultSetMetaData md = rs.getMetaData();
			// int columnCount = md.getColumnCount();
				while (rs.next()) {
				// for (int i = 1; i <= columnCount; i++) {
						personCarUcodeVo = new PersonCarUcodeVo();
						personCarUcodeVo.setUcode(rs.getString("u"));
						personCarUcodeVo.setCheckAddress(rs.getString("ck"));
						String name = map.get(rs.getString("u"));
						if (personCarUcodeVo.getUcode() != null && personCarUcodeVo.getUcode().equals("150100000000")) {
							name = xzqhService.getXZQHByCode("150100");
						}
						personCarUcodeVo.setName(name == null?"未知":name); 
						personCarUcodeVo.setCount(Integer.parseInt(rs.getString("c")));

				// }
					
					results.add(personCarUcodeVo);
                    
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			 return results;
	 }
	
	public List<PersonCarUcodeVo> tjUcodeCompare(String checkAddress, String beginTime, String endTime) {
		 
		 List<PersonCarUcodeVo> results = new ArrayList<PersonCarUcodeVo>();
		 
		 Map<String, String> map = new HashMap<String,String>();
		 String sqlu="select code,name from tb_d_dwdm";
		 ResultSet result = pageInquire.findPage(sqlu);
		 
		 
		 ResultSetMetaData rsmd;
		try {
			rsmd = result.getMetaData();
			int count = rsmd.getColumnCount();
			while (result.next()) {
	        for (int i = 1; i <= count; i++) {  
	        	String key =result.getString("code");
	            String value = result.getString("name");  
	            map.put(key, value);  
	        } 
		}
			
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}  
		
		String querysql ="";
		if(checkAddress!=null&&!checkAddress.equals("")&&!checkAddress.equals("null")){
			querysql = "and check_address= '"+ checkAddress + "'";
		}else if(checkAddress.equals("null")){
			querysql = "and (check_address is null or check_address = '')";
		}
		 
		// String sql="select ucode u,check_address ck,tb.name nm,count(*) c from jwt_check_cars_log_1501 
		//jw left join tb_d_dwdm tb on jw.ucode=tb.code where 1=1 and check_address= '"+checkAddress+"' GROUP BY ucode";
		String sql = "select ucode u,check_address ck,count(*) c from jwt_check_cars_log_1501 jw where 1=1 and  clhc_tag <> '' and clhc_tag is not null "+querysql+" and check_time between '" + beginTime + "' and '" + endTime + "' GROUP BY ucode";
		 System.out.println("======================"+sql);
		 ResultSet rs = pageInquire.findPage(sql);
		 PersonCarUcodeVo personCarUcodeVo = null;
		
		
			try {
			// ResultSetMetaData md = rs.getMetaData();
			// int columnCount = md.getColumnCount();
				while (rs.next()) {
				// for (int i = 1; i <= columnCount; i++) {
						personCarUcodeVo = new PersonCarUcodeVo();
						personCarUcodeVo.setUcode(rs.getString("u"));
						personCarUcodeVo.setCheckAddress(rs.getString("ck"));
						personCarUcodeVo.setName(map.get(rs.getString("u")));
						personCarUcodeVo.setCount(Integer.parseInt(rs.getString("c")));

				// }
					
					results.add(personCarUcodeVo);
                   
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			 return results;
	 }

	private String getQuery(String carBrand, String plateNo, String pcode, String ucode, String ownerName,String beginTime,
			String endTime, String plateType, String policeName, String checkAddress, String checkSource) {
		String sqlw = "";
		if (carBrand != null && !"".equals(carBrand)) {
			sqlw = sqlw + " and t.plate_type = '" + carBrand + "'";
		}
		if (plateNo != null && !"".equals(plateNo)) {
			sqlw = sqlw + " and t.plate_no like '%" + plateNo + "%'";
		}
		
		if (pcode != null && !"".equals(pcode)) {
			sqlw = sqlw + " and t.pcode like '%" + pcode + "%'";
		}
		
		if (ucode != null&&!"".equals(ucode)) {
			String[] ucodeArry = ucode.split("-");
			if (ucodeArry.length > 1) {
				String code = ucodeArry[0].trim().replaceAll("0*$", "");
				sqlw = sqlw + " and (t.ucode like '" + code  + "%' OR t.ucode = '" + ucodeArry[1] + "')";
			} else {
				sqlw = sqlw + " and t.ucode like '%" + ucode + "%'";
			}
		}
		if (ownerName != null && !"".equals(ownerName)) {
			sqlw = sqlw + " and t.owner_name= '" + ownerName + "'";
		}
		if (beginTime != null && !"".equals(beginTime) && endTime != null && !"".equals(endTime)) {
			sqlw = sqlw + " and t.check_time between '" + beginTime + "' and '" + endTime + "'";
		}

		if (plateType != null && !"".equals(plateType)) {
			sqlw = sqlw + " and t.plate_type = '" + plateType + "'";
		}

		if (policeName != null && !"".equals(policeName)) {
			sqlw = sqlw + " and t.police_name= '" + policeName + "'";
		}
		if (checkAddress != null && !"".equals(checkAddress)) {
			sqlw = sqlw + " and t.check_address= '" + checkAddress + "'";
		}
		/*if (checkSource != null && !"".equals(checkSource)) {
			sqlw = sqlw + " and t.check_source= '" + checkSource + "'";
		}*/

		return sqlw;

	}

	public PageHelper findPage(String carBrand, String plateNo, String pcode, String ucode,String ownerName, String beginTime,
			String endTime, String plateType, String policeName, String checkAddress, String checkSource, int pageno,
			int size) {
		String sqlw = this.getQuery(carBrand, plateNo, pcode, ucode, ownerName,beginTime, endTime, plateType, policeName,
				checkAddress, checkSource);
		int count = 0;
		int totalpage = 0;
		PageHelper pageHelper = new PageHelper();
		List<CarCheck> carChecks = new ArrayList<CarCheck>();

		if(!"jwt".equals(checkSource)&&!"".equals(checkSource))
		{
			
		}else{
		String sqlc = " select count(*) c from jwt_check_cars_log_1501 t where 1=1 "
				+ sqlw;
		System.out.println(sqlc);
		ResultSet resultSet = pageInquire.findPage(sqlc);

		try {
			if (resultSet.next()) {
				count = Integer.parseInt(resultSet.getString("c"));
			}
		} catch (NumberFormatException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		String sql = " select * from jwt_check_cars_log_1501 t where 1=1 " + sqlw
				+ "  ORDER BY t.check_time desc limit " + (pageno - 1) * size + " , " + size;
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		
		CarCheck carCheck = null;

		JsonNode plateTypeJsonNode = dictionaryService.getPlateType();
		try {
			ResultSetMetaData md = rs.getMetaData();
			int columnCount = md.getColumnCount();
			while (rs.next()) {
				for (int i = 1; i <= columnCount; i++) {

					carCheck = new CarCheck();
					carCheck.setPcode(rs.getString("pcode"));
					carCheck.setPoliceName(rs.getString("police_name"));
					carCheck.setPolicePhone(rs.getString("police_phone"));
					carCheck.setUcode(rs.getString("ucode"));
					carCheck.setPlateNo(rs.getString("plate_no"));
					carCheck.setBodyColor(rs.getString("body_color"));
					carCheck.setCarBrand(rs.getString("car_brand"));
					String platetype = rs.getString("plate_type");
					if (platetype != null && !platetype.equals("")) {
						if (plateTypeJsonNode.get(platetype) != null) {
							platetype = plateTypeJsonNode.get(platetype).asText();
						}
						carCheck.setPlateType(platetype);
					}

					carCheck.setRegisterAddress(rs.getString("register_address"));
					carCheck.setOwnerIdcardNo(rs.getString("owner_idcard_no"));
					carCheck.setOwnerName(rs.getString("owner_name"));
					carCheck.setOwnerPhone(rs.getString("owner_phone"));
					carCheck.setCheckTime(rs.getString("check_time"));
					carCheck.setQueryType(rs.getString("query_type"));
					carCheck.setQueryPlace(rs.getString("query_place"));
					carCheck.setCheckAddress(rs.getString("check_address"));
					carCheck.setQgbdqjdc(rs.getString("qgbdqjdc"));
					carCheck.setCheckReason(rs.getString("check_reason"));
					//carCheck.setCheckSource(rs.getString("check_source"));
					carCheck.setLocalFlag(rs.getString("local_flag"));
					carCheck.setCheckLocation(rs.getString("check_location"));
					carCheck.setCheckPlace(rs.getString("check_place"));
					carCheck.setCheckFlag(rs.getString("check_flag"));
					carCheck.setClchTag(rs.getString("clhc_tag"));
					carCheck.setClhcFlag(rs.getString("clhc_flag"));
					carCheck.setCheckSource("警务通");

				}
				carChecks.add(carCheck);

			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
		
		if (count % size == 0) {
			totalpage = count / size;
		} else {
			totalpage = (count / size) + 1;
		}
		pageHelper.setPageNo(pageno);
		pageHelper.setPageSize(size);
		pageHelper.setResult(carChecks);
		pageHelper.setTotalPage(totalpage);
		pageHelper.setTotal(count);

		return pageHelper;

	}

	public List<CarCheck> findByParamper(String carBrand, String plateNo, String pcode, String ucode,String ownerName,String beginTime,
			String endTime, String plateType, String policeName, String checkAddress, String checkSource) {
		String sqlw = this.getQuery(carBrand, plateNo, pcode, ucode,ownerName, beginTime, endTime, plateType, policeName,
				checkAddress, checkSource);
		String sql = " select *, dw.name as dwname from jwt_check_cars_log_1501 t left join tb_d_dwdm dw  on t.ucode = dw.code "
				+ " where 1=1 " + sqlw + " ORDER BY t.check_time desc limit 0,10000 ";

		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		List<CarCheck> carChecks = this.getCarCheck(rs);
		return carChecks;

	}

	private String getCompareQuery(String carBrand, String plateNo, String pcode, String ucode, String beginTime,
			String endTime, String plateType, String policeName, String checkPlace, String checkAddress, String clchTag,String clchTag2,String personif,
			String dataType,String ownerName,String checkSource) {
		String sqlw = "";
		if (checkSource != null&&!"".equals(checkSource)) {
			if("jwt".equals(checkSource)){
				sqlw = sqlw + "and (t.check_source is null or t.check_source='' or t.check_source='jwt')";
			}else if("lte".equals(checkSource)){
				sqlw = sqlw + "and t.check_source='lte'";
			}else{
				
			}
		}
		if (carBrand != null && !"".equals(carBrand)) {
			sqlw = sqlw + " and t.plate_type = '" + carBrand + "'";
		}
		if (plateNo != null && !"".equals(plateNo)) {
			sqlw = sqlw + " and t.plate_no = '" + plateNo + "'";
		}
		if (pcode != null && !"".equals(pcode)) {
			sqlw = sqlw + " and t.pcode = '" + pcode + "'";
		}
		if (ucode != null&&!"".equals(ucode)) {
			String[] ucodeArry = ucode.split("-");
			if (ucodeArry.length > 1) {
				String code = ucodeArry[0].trim().replaceAll("0*$", "");
				sqlw = sqlw + " and (t.ucode like '" + code  + "%' OR t.ucode = '" + ucodeArry[1] + "')";
			} else {
				sqlw = sqlw + " and t.ucode like '%" + ucode + "%'";
			}
		}
		if (beginTime != null && !"".equals(beginTime) && endTime != null && !"".equals(endTime)) {
			sqlw = sqlw + " and t.check_time between '" + beginTime + "' and '" + endTime + "'";
		}

		if (plateType != null && !"".equals(plateType)) {
			sqlw = sqlw + " and t.plate_type = '" + plateType + "'";
		}

		if (policeName != null && !"".equals(policeName)) {
			sqlw = sqlw + " and t.police_name like '%" + policeName + "%'";
		}
		if (checkPlace != null && !"".equals(checkPlace)) {
			if ("-1".equals(checkPlace)) {
				sqlw = sqlw + " and t.check_place IS NULL";
			} else {
				sqlw = sqlw + " and t.check_place = '" + checkPlace + "'";
			}
		}
		if (checkAddress != null && !"".equals(checkAddress)) {
			sqlw = sqlw + " and t.check_address= '" + checkAddress + "'";
		}
		
		if (clchTag != null && !"".equals(clchTag)) {
			sqlw = sqlw + " and t.clhc_tag like '%" + clchTag + "%'";
		}
		
		if (clchTag2 != null && !"".equals(clchTag2)) {
			sqlw = sqlw + " and t.clhc_tag like '%" + clchTag2 + "%'";
		}
		if (personif != null && !"".equals(personif)&&"1".equals(personif)) {
			sqlw = sqlw + " and t.clhc_flag = '" + personif + "'";
		}
		
		if (dataType != null && !"".equals(dataType)) {
			sqlw = sqlw + " and t.data_type like '%" + dataType + "%'";
		}
		
		if (ownerName != null && !"".equals(ownerName)) {
			sqlw = sqlw + " and t.owner_name like '%" + ownerName + "%'";
		}

		return sqlw;
	}

	public PageHelper findPageCompare(String carBrand, String plateNo, String pcode, String ucode, String beginTime,
			String endTime, String plateType, String policeName, String checkPlace, String checkAddress, String clchTag,String clchTag2,String personif,
			String dataType,String ownerName,String checkSource ,int pageno, int size) {
		JsonNode plateTypeJsonNode = dictionaryService.getPlateType();
		JsonNode bodyColorJsonNode = dictionaryService.getBodyColor();
		String sqlw = this.getCompareQuery(carBrand, plateNo, pcode, ucode, beginTime, endTime, plateType, policeName,
				checkPlace, checkAddress, clchTag,clchTag2, personif,dataType,ownerName,checkSource);
		int count = 0;
		PageHelper pageHelper = new PageHelper();
		List<CarCheck> carChecks = new ArrayList<CarCheck>();
		/*if(!"jwt".equals(checkSource)&&!"".equals(checkSource))
		{
			
		}else
		{*/
		String sqlc = " select count(*) c from jwt_check_cars_log_1501 t where 1=1 "
				+ sqlw;
		System.out.println(sqlc);
		ResultSet resultSet = pageInquire.findPage(sqlc);

		try {
			if (resultSet.next()) {
				count = Integer.parseInt(resultSet.getString("c"));
			}
		} catch (NumberFormatException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		Map<String,String> categoryMap = this.importantCarCategoryService.listCategoryMap();
		Map<String,String> subCategoryMap = this.importantCarCategoryService.listSubCategoryMap();
		Map<String, String> listHSxzqhMap = this.xzqhService.listHSxzqhMap();

		String sql = " select * from jwt_check_cars_log_1501 t where 1=1 "
				+ sqlw + "  ORDER BY t.check_time desc limit " + (pageno - 1) * size + " , " + size;
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		String qgbdqjdc = "";
		String clhc_tag = "";
		CarCheck carCheck = null;
		try {
			ResultSetMetaData md = rs.getMetaData();
			int columnCount = md.getColumnCount();
			while (rs.next()) {
				for (int i = 1; i <= columnCount; i++) {

					carCheck = new CarCheck();
					carCheck.setPcode(rs.getString("pcode"));
					carCheck.setPoliceName(rs.getString("police_name"));
					carCheck.setPolicePhone(rs.getString("police_phone"));
					carCheck.setUcode(rs.getString("ucode"));
					
					String orgid = rs.getString("ucode");
					if(orgid!=null && !"".equals(orgid))
					{
						Map<String, String>  dwdmMap =dwdmService.getDwdmMap(orgid);
						carCheck.setUcode(dwdmMap.get(orgid));
					}else
					{
						carCheck.setUcode("未知");
					}
					carCheck.setPlateNo(rs.getString("plate_no"));
				//	carCheck.setBodyColor(rs.getString("body_color"));
					String bodycolor = rs.getString("body_color");
					if (bodycolor != null && !bodycolor.equals("")) {
						if (bodyColorJsonNode.get(bodycolor) != null) {
							bodycolor = bodyColorJsonNode.get(bodycolor).asText();
						}
						carCheck.setBodyColor(bodycolor);
					}
					
					carCheck.setCarBrand(rs.getString("car_brand"));
				//	carCheck.setPlateType(rs.getString("plate_type"));
				   String platetype = rs.getString("plate_type");
					if (platetype != null && !platetype.equals("")) {
						if (plateTypeJsonNode.get(platetype) != null) {
							platetype = plateTypeJsonNode.get(platetype).asText();
						}
						carCheck.setPlateType(platetype);
					}
					carCheck.setRegisterAddress(rs.getString("register_address"));
					carCheck.setOwnerIdcardNo(rs.getString("owner_idcard_no"));
					carCheck.setOwnerName(rs.getString("owner_name"));
					carCheck.setOwnerPhone(rs.getString("owner_phone"));
					carCheck.setCheckTime(rs.getString("check_time"));
					carCheck.setQueryType(rs.getString("query_type"));
					carCheck.setQueryPlace(rs.getString("query_place"));
				//	carCheck.setCheckAddress(rs.getString("check_address"));
					String checkaddress = rs.getString("check_address");
					if (checkaddress != null && !"".equals(checkaddress)) {
						carCheck.setCheckAddress(listHSxzqhMap.get(checkaddress));
					}else
					{
						carCheck.setCheckAddress("未知");
					}
					
					//融合警务通标签与人车核查标签
					qgbdqjdc = rs.getString("qgbdqjdc");
					clhc_tag = rs.getString("clhc_tag");
					clhc_tag = getTagNameArryStr(categoryMap, clhc_tag);
					
					if(null != qgbdqjdc && !"".equals(qgbdqjdc)) {
						qgbdqjdc = "全国本地抢劫盗窃车辆";
						clhc_tag = clhc_tag+","+qgbdqjdc;
					}else {
						qgbdqjdc = "";
					}
					carCheck.setQgbdqjdc(qgbdqjdc);
					carCheck.setCheckReason(rs.getString("check_reason"));
					carCheck.setLocalFlag(rs.getString("local_flag"));
					carCheck.setCheckLocation(rs.getString("check_location"));
					carCheck.setCheckPlace(rs.getString("check_place"));
					carCheck.setCheckFlag(rs.getString("check_flag"));
					carCheck.setCheckSource("jwt".equals(checkSource)?"警务通":"LTE");
					// carCheck.setClchTag(rs.getString("clhc_tag"));
					 
					carCheck.setClchTag(clhc_tag);

					String datatype = getTagNameArryStr(subCategoryMap, rs.getString("data_type"));
					carCheck.setDataType(datatype);
					
					carCheck.setClhcFlag(rs.getString("clhc_flag"));

				}
				carChecks.add(carCheck);

			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		/*}*/
		int totalpage = 0;
		if (count % size == 0) {
			totalpage = count / size;
		} else {
			totalpage = (count / size) + 1;
		}
		pageHelper.setPageNo(pageno);
		pageHelper.setPageSize(size);
		pageHelper.setResult(carChecks);
		pageHelper.setTotalPage(totalpage);
		pageHelper.setTotal(count);

		return pageHelper;

	}
	
	public List<CarCheck> findByParamperCompare(String carBrand, String plateNo, String pcode, String ucode,
			String beginTime, String endTime, String plateType, String policeName, String checkPlace,
			String checkAddress, String clchTag, String clchTag2,String personif,String dataType,String ownerName) {
		String sqlw = this.getCompareQuery(carBrand, plateNo, pcode, ucode, beginTime, endTime, plateType, policeName,
				checkPlace, checkAddress, clchTag, clchTag2,personif,dataType,ownerName,"");

		String sql = " select *, dw.name as dwname from jwt_check_cars_log_1501 t left join tb_d_dwdm dw on t.ucode = dw.code "
				+ " where 1=1 and t.clhc_tag <> '' and t.clhc_tag is not null "
				+ sqlw + " ORDER BY t.check_time desc limit 0,10000 ";
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		List<CarCheck> carChecks = this.getCarCheck(rs);

		return carChecks;

	}

	private List<CarCheck> getCarCheck(ResultSet rs) {
		Map<String, String> categoryMap = this.importantCarCategoryService.listCategoryMap();
		Map<String, String> subCategoryMap = this.importantCarCategoryService.listSubCategoryMap();
		Map<String, String> listHSxzqhMap = this.xzqhService.listHSxzqhMap();
		JsonNode plateTypeJsonNode = dictionaryService.getPlateType();
		JsonNode bodyColorJsonNode = dictionaryService.getBodyColor();

		List<CarCheck> carChecks = new ArrayList<CarCheck>();
		CarCheck carCheck = null;
		try {
			while (rs.next()) {
				carCheck = new CarCheck();
				carCheck.setPcode(rs.getString("pcode"));

				carCheck.setPoliceName(rs.getString("police_name"));
				carCheck.setPolicePhone(rs.getString("police_phone"));
				carCheck.setUcode(rs.getString("dwname"));
				carCheck.setPlateNo(rs.getString("plate_no"));
				String bodycolor = rs.getString("body_color");
				if (bodycolor != null && !bodycolor.equals("")) {
					if (bodyColorJsonNode.get(bodycolor) != null) {
						bodycolor = bodyColorJsonNode.get(bodycolor).asText();
					}
					carCheck.setBodyColor(bodycolor);
				}
				carCheck.setCarBrand(rs.getString("car_brand"));
				String platetype = rs.getString("plate_type");
				if (platetype != null && !platetype.equals("")) {
					if(plateTypeJsonNode.get(platetype)!=null){
						platetype = plateTypeJsonNode.get(platetype).asText();
					}
					carCheck.setPlateType(platetype);
				}
				carCheck.setRegisterAddress(rs.getString("register_address"));
				carCheck.setOwnerIdcardNo(rs.getString("owner_idcard_no"));
				carCheck.setOwnerName(rs.getString("owner_name"));
				carCheck.setOwnerPhone(rs.getString("owner_phone"));
				carCheck.setCheckTime(rs.getString("check_time"));
				carCheck.setQueryType(rs.getString("query_type"));
				carCheck.setQueryPlace(rs.getString("query_place"));
				String checkaddress = rs.getString("check_address");
				if (checkaddress != null && !"".equals(checkaddress)) {
					carCheck.setCheckAddress(listHSxzqhMap.get(checkaddress));
				}
				carCheck.setQgbdqjdc(rs.getString("qgbdqjdc"));
				carCheck.setCheckReason(rs.getString("check_reason"));
				carCheck.setCheckSource(rs.getString("check_source"));
				carCheck.setLocalFlag(rs.getString("local_flag"));
				carCheck.setCheckLocation(rs.getString("check_location"));
				carCheck.setCheckPlace(rs.getString("check_place"));
				carCheck.setCheckFlag(rs.getString("check_flag"));
				carCheck.setClhcFlag(rs.getString("clhc_flag"));

				String clhcTag = getTagNameArryStr(categoryMap, rs.getString("clhc_tag"));
				carCheck.setClchTag(clhcTag);

				String datatype = getTagNameArryStr(subCategoryMap, rs.getString("data_type"));
				carCheck.setDataType(datatype);
				carChecks.add(carCheck);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return carChecks;
	}

	private String getTagNameArryStr(Map<String, String> categoryMap, String categorys) {
		String categoryStr = "";
		if (categorys != null && !categorys.equals("")) {
			String[] categoryArray = categorys.split(", ");
			for (String categoryTemp : categoryArray) {
				categoryTemp = categoryTemp.trim();
				if (categoryMap.containsKey(categoryTemp)) {
					categoryStr += categoryMap.get(categoryTemp) + ",";
				}else
				{
					categoryStr += categoryTemp+ ",";
				}
			}
			if (!categoryStr.equals("")) {
				categoryStr = categoryStr.substring(0, categoryStr.length() - 1);
			}
		}
		return categoryStr;

	}

	public List<CarCheck> findByPlateNo(String plateNo) {
		return carCheckCrud.findByPlateNo(plateNo);
		
	}

	public List<CarCheck> findByPlateNosql(String plateNo) {
		String sql = " select * from jwt_check_cars_log_1501 where 1=1  and plate_no='" + plateNo + "' ";
		Log.info(sql);
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		List<CarCheck> carChecks = new ArrayList<CarCheck>();
		CarCheck carCheck = null;
		try {
			ResultSetMetaData md = rs.getMetaData();
			int columnCount = md.getColumnCount();
			while (rs.next()) {
				for (int i = 1; i <= columnCount; i++) {

					carCheck = new CarCheck();
					carCheck.setPcode(rs.getString("pcode"));
					carCheck.setPoliceName(rs.getString("police_name"));
					carCheck.setPolicePhone(rs.getString("police_phone"));
					carCheck.setUcode(rs.getString("ucode"));
					carCheck.setPlateNo(rs.getString("plate_no"));
					carCheck.setBodyColor(rs.getString("body_color"));
					carCheck.setCarBrand(rs.getString("car_brand"));
					carCheck.setPlateType(rs.getString("plate_type"));
					carCheck.setRegisterAddress(rs.getString("register_address"));
					carCheck.setOwnerIdcardNo(rs.getString("owner_idcard_no"));
					carCheck.setOwnerName(rs.getString("owner_name"));
					carCheck.setOwnerPhone(rs.getString("owner_phone"));
					carCheck.setCheckTime(rs.getString("check_time"));
					carCheck.setQueryType(rs.getString("query_type"));
					carCheck.setQueryPlace(rs.getString("query_place"));
					carCheck.setCheckAddress(rs.getString("check_address"));
					carCheck.setQgbdqjdc(rs.getString("qgbdqjdc"));
					carCheck.setCheckReason(rs.getString("check_reason"));
					carCheck.setLocalFlag(rs.getString("local_flag"));
					carCheck.setCheckLocation(rs.getString("check_location"));
					carCheck.setCheckPlace(rs.getString("check_place"));
					carCheck.setCheckFlag(rs.getString("check_flag"));
					carCheck.setClchTag(rs.getString("clhc_tag"));
					carCheck.setClhcFlag(rs.getString("clhc_flag"));
				}
				carChecks.add(carCheck);

			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return carChecks;

	}



	public List<List<PersonCarVo>> Infofind(String beginTime, String endTime, String ucode, String policeName) {

		List<List<PersonCarVo>> results = new ArrayList<List<PersonCarVo>>();

		
		String sqlw = "";
		if (beginTime != null && !"".equals(beginTime) && endTime != null && !"".equals(endTime)) {
			sqlw = sqlw + " and check_time between '" + beginTime + "' and '" + endTime + "'";
		}
		if (ucode != null && !"".equals(ucode)) {
			sqlw = sqlw + " and ucode= '" + ucode + "'";
		}
		if (policeName != null && !"".equals(policeName)) {
			sqlw = sqlw + " and police_name= '" + policeName + "'";
		}
		
		Map<String, String> map = new HashMap<String,String>();
		 String sqlu="select check_address qp,COUNT(*) c from jwt_check_cars_log_1501 where 1=1 and clhc_tag <> '' and clhc_tag is not null "+sqlw+" GROUP BY check_address ";
		 ResultSet result = pageInquire.findPage(sqlu);
		 
		 
		 ResultSetMetaData rsmd;
		try {
			rsmd = result.getMetaData();
			int count = rsmd.getColumnCount();
			while (result.next()) {
	        for (int i = 1; i <= count; i++) {  
	        	String key =result.getString("qp");
	            String value = result.getString("c");  
	            map.put(key, value);  
	        } 
		}
			
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		
		String sql = "select check_address qp,tb.name nm,COUNT(*) c from jwt_check_cars_log_1501 jw "
				+ "left join tb_d_hsxzqh tb on jw.check_address=tb.code where 1=1 "+sqlw+" GROUP BY check_address";
		ResultSet rs = pageInquire.findPage(sql);
		List<PersonCarVo> personCarVos = new ArrayList<PersonCarVo>();
		PersonCarVo personCarVo = null;

		ResultSetMetaData md;
		try {
			md = rs.getMetaData();
			// int columnCount = md.getColumnCount();
			PersonCarVo unkonwnPersonCar = new PersonCarVo();
			while (rs.next()) {
				// for (int i = 1; i <= columnCount; i++) {
					personCarVo = new PersonCarVo();
					personCarVo.setQueryPlace(rs.getString("qp"));
					personCarVo.setCountQp(Integer.parseInt(rs.getString("c")));
					
					String codeName = rs.getString("nm");
					if (codeName == null && personCarVo.getQueryPlace()!=null) {
						codeName = xzqhService.getXZQHByCode(personCarVo.getQueryPlace());
					}
				if (personCarVo.getQueryPlace() != null && personCarVo.getQueryPlace().equals("150100")) {
					codeName = xzqhService.getXZQHByCode(personCarVo.getQueryPlace());
				}
					personCarVo.setCodeName(codeName == null?"未知":codeName);
					
					if(map.get(rs.getString("qp"))!=null&&!"".equals(map.get(rs.getString("qp")))){
						personCarVo.setCountQpCompare(Integer.parseInt(map.get(rs.getString("qp"))));
					}
					
					if(personCarVo.getQueryPlace()!=null&&!personCarVo.getQueryPlace().equals("")){
						personCarVos.add(personCarVo);
					}else{
						// 未知排序在最后
						unkonwnPersonCar = personCarVo;
					}
				// }

			}
			if(unkonwnPersonCar.getCountQp()!=0){
				personCarVos.add(unkonwnPersonCar);
			}
			
			results.add(personCarVos);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		String sqlp = "select plate_type pt,COUNT(*) c from jwt_check_cars_log_1501 where 1=1" + sqlw
				+ " GROUP BY plate_type ";
		ResultSet resultSet = pageInquire.findPage(sqlp);
		List<PersonCarVo> personCarVos1 = new ArrayList<PersonCarVo>();
		PersonCarVo personCarVo1 = null;

		ResultSetMetaData md1;
		try {
			md1 = resultSet.getMetaData();
			int columnCount1 = md1.getColumnCount();

			while (resultSet.next()) {
				for (int i = 1; i <= columnCount1; i++) {
					personCarVo1 = new PersonCarVo();
					personCarVo1.setPlateType(resultSet.getString("pt"));
					personCarVo1.setCountPlt(Integer.parseInt(resultSet.getString("c")));
				}

				personCarVos1.add(personCarVo1);

			}
			results.add(personCarVos1);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		// 合计
		List<PersonCarVo> personCarVos3 = new ArrayList<PersonCarVo>();
		String sqlTotalCompare = "select COUNT(*) c from jwt_check_cars_log_1501 where 1=1 and clhc_tag <> '' and clhc_tag is not null  " + sqlw;
		String sqlTotal = "select COUNT(*) c from jwt_check_cars_log_1501 jw where 1=1 " + sqlw;
		ResultSet rsTotalCompare = pageInquire.findPage(sqlTotalCompare);
		ResultSet rsTotal = pageInquire.findPage(sqlTotal);
		try {
			// 全部 
			personCarVo = new PersonCarVo();
			while (rsTotalCompare.next()) {
				personCarVo.setCountQpCompare(Integer.parseInt(rsTotalCompare.getString("c")));
			}
			while (rsTotal.next()) {
				personCarVo.setCountQp(Integer.parseInt(rsTotal.getString("c")));
			}
			personCarVo.setCodeName("全部");
			personCarVos3.add(personCarVo);
			results.add(personCarVos3);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return results;
	}

}
