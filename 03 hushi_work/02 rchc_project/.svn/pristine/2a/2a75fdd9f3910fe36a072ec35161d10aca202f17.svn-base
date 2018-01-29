package com.minginglamp.service;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.mortbay.log.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;
import com.minginglamp.common.PageH;
import com.minginglamp.common.PageHelper;
import com.minginglamp.common.PageInquire;
import com.minginglamp.crud.PersonChecLogCrud;
import com.minginglamp.crud.PersonCheckCrud;
import com.minginglamp.crud.PersonCheckMapper;
import com.minginglamp.crud.PersonTagInfoCrud;
import com.minginglamp.model.Dwdm;
import com.minginglamp.model.PersonCheck;
import com.minginglamp.model.PersonCheckLog;
import com.minginglamp.model.PersonTagInfo;
import com.minginglamp.vo.PersonCarUcodeVo;
import com.minginglamp.vo.PersonCarVo;
import com.minginglamp.vo.PersonHjdTjVo;

@Service
public class PersonCheckService {

	@Autowired
	private PersonCheckCrud personCheckCrud;
	
	@Autowired
	private PersonCheckMapper personCheckMapper;
	
	
	@Autowired
	private PersonChecLogCrud personChecLogCrud;
	@Autowired
	private ImportantPersonCategoryService importantPersonCategoryService;
	
	@Autowired
	PageInquire pageInquire;
	
	@Autowired
	private XzqhService xzqhService;
	
	@Autowired
	private DictionaryService dictionaryService;

	@Autowired
	private PersonTagInfoCrud personTagInfoCrud;
	
	@Autowired
	private DwdmService dwdmService;
	
	private static final String TIME_ILLEGAR_MSG = "startTime or endTime format error.need yyyy-MM-dd HH:mm:ss format.";
	
	
	
	public List<PersonTagInfo> findBy(String idcardNo,String ryhcTag){
		
		return personTagInfoCrud.findBySfzhAndTag(idcardNo,ryhcTag);
		
	}
	
	
	/**
	 * 人员实时比对记录查询业务逻辑层
	 * @param startTime
	 * @param endTime
	 * @param sfzh
	 * @param names
	 * @param source
	 * @param ucode
	 * @param ucode1
	 * @param tags
	 * @param tags2
	 * @param policename
	 * @param policeno
	 * @param checkaddress
	 * @param personType
	 * @param personif
	 * @param page
	 * @param pageSize
	 * @return
	 */
	 public PageH findPersonCheckLog(String startTime, String endTime,String sfzh, String names,String source,String ucode,String ucode1,String tags,String tags2,String policename, String policeno,String checkaddress,String personType,String personif,String addressDetails,int page, int pageSize){
	    	
	    	
			if(startTime==null||"".equals(startTime)){
				startTime ="1990-01-01 00:00:00";
			}
			if(endTime==null||"".equals(endTime)){
				endTime ="2100-01-01 00:00:00";
			}
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
			//被核录人条件判断
	    	if(names==null)
	    	{
	    		names = "%%";
	    	}else {
	    		names = "%"+names.trim()+"%";
	    	}
	    	//人员标签条件判断
	    	if(tags==null)
	    	{
	    		tags = "%%";
	    	}else {
	    		tags = "%"+tags.trim()+"%";
	    	}
	    	//预警类型条件判断
	    	if(tags2==null)
	    	{
	    		tags2 = "%%";
	    	}else {
	    		tags2 = "%"+tags2.trim()+"%";
	    	}
	    	//警员姓名条件判断
	    	if(policename==null)
	    	{
	    		policename = "%%";
	    	}else {
	    		policename = "%"+policename.trim()+"%";
	    	}
	    	//警员号条件判断
	    	if(policeno==null)
	    	{
	    		policeno = "%%";
	    	}else {
	    		policeno = "%"+policeno.trim()+"%";
	    	}
	    	//核录地点条件判断
	    	if(checkaddress==null)
	    	{
	    		checkaddress = "%%";
	    	}else {
	    		checkaddress = "%"+checkaddress.trim()+"%";
	    	}
	    	//人员类型条件判断
	    	if(personType==null)
	    	{
	    		personType = "%%";
	    	}else {
	    		personType = "%"+personType.trim()+"%";
	    	}
	    	//身份证号条件判断
			if(sfzh==null){
				sfzh = "%%";
			}else {
				sfzh = sfzh.trim()+"%";
			}
			//核录设备类型来源条件判断
			if(source==null){
				source = "%%";
			}else {
				source = "%"+source.trim()+"%";
			}
			
	    	String ucodesql = "";
	    	if(ucode1==null || ucode1.trim().length()==0 || ucode1.equals("null")){
	    		ucodesql = "checkdept like '%"+ucode +"%'";
	    	}else{
	    		ucodesql = "(checkdept like '%"+ucode +"%' or checkdept like '%"+ucode1+"%')";
	    	}
	    	String sql = "select * from person_check_log where 1=1 "+sqlw;
	    	String sqlcount = "select count(1) c from person_check_log where 1=1 "+sqlw;
	    	List<Map<String,Object>> listcount = null;
	    	List<Map<String,Object>> list = null;
	    	//前端预警类型为全部
	    	if("00".equals(personif)){
	    		sql = sql+"and create_time between '"+ startTime
			    	+"' and '"+endTime+"' and sfzh like '"+ sfzh +"' and source like '"+ source
			    	+"' and tags like '"+tags+"' and check_address like '"+checkaddress+"' and person_type like '"+ personType
			    	+"' and tags like '"+ tags2 +"' and name like '"+names+"' and "+ucodesql+" and police_name like '"+policename+"' and policeno like '"+policeno+"' order by create_time desc limit " + (page) * pageSize
					+ " , " + pageSize;
	    		sqlcount = sqlcount+"and create_time between '"+ startTime
			    	+"' and '"+endTime+"' and sfzh like '"+ sfzh +"' and source like '"+ source
			    	+"' and tags like '"+tags+"' and check_address like '"+checkaddress+"' and person_type like '"+ personType
			    	+"' and tags like '"+ tags2 +"' and name like '"+names+"' and "+ucodesql+" and police_name like '"+policename+"' and policeno like '"+policeno+"'";
	    	//前端预警类型为预警
	    	}else {
	    		sql = sql+"and personif = '01' and create_time between '"+ startTime
			    	+"' and '"+endTime+"' and sfzh like '"+ sfzh +"' and source like '"+ source
			    	+"' and tags like '"+tags+"' and check_address like '"+checkaddress+"' and person_type like '"+ personType
			    	+"' and tags like '"+ tags2 +"' and name like '"+names+"' and "+ucodesql+" and police_name like '"+policename+"' and policeno like '"+policeno+"'"+" order by create_time desc limit " + (page) * pageSize
						+ " , " + pageSize;
	    		sqlcount = sqlcount+"and personif = '01' and create_time between '"+ startTime
			    	+"' and '"+endTime+"' and sfzh like '"+ sfzh +"' and source like '"+ source
			    	+"' and tags like '"+tags+"' and check_address like '"+checkaddress+"' and person_type like '"+ personType
			    	+"' and tags like '"+ tags2 +"' and name like '"+names+"' and "+ucodesql+" and police_name like '"+policename+"' and policeno like '"+policeno+"'";
	    		
	    	}
	    	Log.info("sqlcount:::"+sqlcount);
	    	Log.info("sql:::"+sql);
	    	//查询数据库
    		listcount = pageInquire.findPageForList(sqlcount);
    		list = pageInquire.findPageForList(sql);
    		Iterator itcount = listcount.iterator();
    		int pageCount = 0;
    		while(itcount.hasNext()){
    			Map pageCountMap = (Map)itcount.next();
    			Long lg = (Long)pageCountMap.get("c");
    			pageCount = lg.intValue();
    		//	pageCount = (pageCountMap.get("c").toString());
    		}
    		
    		PageH pageHelper = new PageH();
    		pageHelper.setTotalElements(pageCount);
    		
    		List<Dwdm> dwdmList = dwdmService.findAll();
	    	Map<String,String> dwdmMap =  new HashMap<String,String>();
	    	for(Dwdm dwdm : dwdmList){
	    		dwdmMap.put(dwdm.getCode(), dwdm.getName());
	    	}
	    	//转换非正常字段
			JsonNode nationalJsonNode = dictionaryService.getNational();
			JsonNode sblxJsonNode = dictionaryService.getSblx();
			JsonNode ssbdlyJsonNode = dictionaryService.getSsbdly();	    		
    		
    		Iterator it = list.iterator();
    		List<PersonCheckLog> listpcl = new ArrayList<PersonCheckLog>();
    		while(it.hasNext()){
    			Map erMap = (Map)it.next();
    			PersonCheckLog pcl = new PersonCheckLog();
    			pcl.setName((String)erMap.get("name"));
    			pcl.setId((String)erMap.get("id"));
    			pcl.setCheckdept((String)erMap.get("checkdept"));
    			if(dwdmMap.containsKey(pcl.getCheckdept())){
    				pcl.setCheckdept(dwdmMap.get(pcl.getCheckdept()));
				}
    			pcl.setCreateTime((String)erMap.get("create_time"));
    			pcl.setCheckreason((String)erMap.get("check_reason"));
    			pcl.setSex((String)erMap.get("sex"));
    			String sex = pcl.getSex();
				if (sex != null && !sex.equals("")) {
					if ("1".equals(sex)) {
						sex = "男";
					} else if ("2".equals(sex)) {
						sex = "女";
					}else
					{
						sex = "未知";
					}
				}
				pcl.setSex(sex);
    			
    			pcl.setBirthday((String)erMap.get("birthday"));
    			pcl.setBirthplace((String)erMap.get("birthplace"));
    			pcl.setCheckaddress((String)erMap.get("check_address"));
    			pcl.setCzyq((String)erMap.get("czyq"));
    			pcl.setLgdw((String)erMap.get("lg_place"));
    			pcl.setSfzh((String)erMap.get("sfzh"));
    			pcl.setLocation((String)erMap.get("location"));
    			pcl.setNation((String)erMap.get("nation"));
    			String nation = pcl.getNation();
				if (nation != null && !nation.equals("")) {
					if (nationalJsonNode.get(nation) != null) {
						nation = nationalJsonNode.get(nation).asText();
					}
					pcl.setNation(nation);
				}
    			pcl.setPersonif((String)erMap.get("personif"));
    			pcl.setPersonType((String)erMap.get("person_type"));
    			pcl.setPolicename((String)erMap.get("police_name"));
    			pcl.setPoliceno((String)erMap.get("policeno"));
    			pcl.setPolicephone((String)erMap.get("policephone"));
    			pcl.setPushResult((String)erMap.get("push_result"));
    			pcl.setPushTaget((String)erMap.get("push_taget"));
    			String pushTaget = pcl.getPushTaget();
				if (pushTaget != null && !pushTaget.equals("")) {
					String[] pushTagetArry = pushTaget.split(",");
					String pushTagetTemp = "";
					for(String push : pushTagetArry){
						if (ssbdlyJsonNode.get(push) != null) {
							push = ssbdlyJsonNode.get(push).asText();
						}
						pushTagetTemp += push+",";
					}
					pushTagetTemp = pushTagetTemp.substring(0,pushTagetTemp.length()-1);
					pcl.setPushTaget(pushTagetTemp);
				}
    			pcl.setTags((String)erMap.get("tags"));
    			pcl.setTagsContent((String)erMap.get("tags_content"));
    			pcl.setSource((String)erMap.get("source"));
    			String sourceName = pcl.getSource();
				if (sourceName != null && !sourceName.equals("")) {
					if (sblxJsonNode.get(sourceName) != null) {
						sourceName = sblxJsonNode.get(sourceName).asText();
					}
					pcl.setSource(sourceName);
				}
    			
    			listpcl.add(pcl);
    		}
    		pageHelper.setNumberElements(listpcl.size());
    		pageHelper.setNumber(page);
            int totalpage = 0;
            if(pageCount%pageSize==0){
            	totalpage=pageCount/pageSize;
            }else{
            	totalpage=(pageCount/pageSize)+1;
            }
//            personCheckLogPage = new PageImpl(listpcl,new PageRequest(page, pageSize),pageSize);


    		pageHelper.setPageNo(page);
    		pageHelper.setPageSize(pageSize);
    		pageHelper.setContent(listpcl);
    		pageHelper.setTotalPages(totalpage);
    		pageHelper.setStart(page*pageSize);
    		//add by lyq end
	        return pageHelper;
	    }
	
	public List<PersonHjdTjVo> InfofindByHjd(String beginTime,String endTime, String ucode, String policeName,String domicile,String domicileChinese)
	{
		
		
		/*String sql ="select domicile dc, count(*) c from jwt_check_person_log_1501 jw  where 1=1 and domicile like '内蒙%' GROUP BY domicile";
		 ResultSet rs = pageInquire.findPage(sql);
		 PersonHjdTjVo personHjdTjVo = null;
		 List<PersonHjdTjVo> personHjdTjVos = new ArrayList<PersonHjdTjVo>();
		
			try {
				 ResultSetMetaData md = rs.getMetaData();
					int columnCount = md.getColumnCount();
				while (rs.next()) {
					for (int i = 1; i <= columnCount; i++) {
						personHjdTjVo = new PersonHjdTjVo();
						personHjdTjVo.setDomicile(rs.getString("dc"));
						personHjdTjVo.setCount(Integer.parseInt(rs.getString("c")));

					}
					personHjdTjVos.add(personHjdTjVo);
				}
			
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			  return personHjdTjVos;*/
		
		String sql = "select id, domicile from jwt_check_person_log_1501";
		 Map<Integer, String> map = new HashMap<Integer,String>();
		 ResultSet result = pageInquire.findPage(sql);
		 
		 
		 ResultSetMetaData rsmd;
		try {
			rsmd = result.getMetaData();
			int count = rsmd.getColumnCount();
			while (result.next()) {
	        for (int i = 1; i <= count; i++) {  
	        	int key =Integer.parseInt(result.getString("id"));
	            String value = result.getString("domicile");  
	            map.put(key, value);  
	        } 
		}
			
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} 
		String  domiciles = "";
	 for (Map.Entry<Integer, String> entry : map.entrySet()) {
			         int  id =    entry.getKey() ;
			         domiciles  = entry.getValue();
			      //   domiciles.i
			        
		 }
			 return null;
			  
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
		
		// String sql="select ucode u,check_address ck,tb.name nm,count(*) c from jwt_check_person_log_1501 jw "
		// 		+ "left join tb_d_dwdm tb on jw.ucode=tb.code where 1=1 and check_address= '"+checkAddress+"' GROUP BY ucode";
		
		String sql = "select ucode u,check_address ck,count(*) c from jwt_check_person_log_1501 jw  where 1=1 "+querysql+
				" and check_time between '" + beginTime + "' and '" + endTime + "' GROUP BY ucode";
		 System.out.println("======================"+sql);
		 ResultSet rs = pageInquire.findPage(sql);
		 PersonCarUcodeVo personCarUcodeVo = null;
		
			try {
				 ResultSetMetaData md = rs.getMetaData();
					int columnCount = md.getColumnCount();
				while (rs.next()) {
					for (int i = 1; i <= columnCount; i++) {
						personCarUcodeVo = new PersonCarUcodeVo();
						personCarUcodeVo.setUcode(rs.getString("u"));
						personCarUcodeVo.setCheckAddress(rs.getString("ck"));
						String name = map.get(rs.getString("u"));
						if (personCarUcodeVo.getUcode() != null && personCarUcodeVo.getUcode().equals("150100000000")) {
							name = xzqhService.getXZQHByCode("150100");
						}
						personCarUcodeVo.setName(name == null?"未知":name); 
						personCarUcodeVo.setCount(Integer.parseInt(rs.getString("c")));

					}
					
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
		
		String sql = "select ucode u,check_address ck,count(*) c from jwt_check_person_log_1501 jw  where 1=1 and ryhc_tag <> '' and ryhc_tag is not null "
				+ querysql +" and check_time between '" + beginTime + "' and '" + endTime + "' GROUP BY ucode";
		 System.out.println("======================"+sql);
		 ResultSet rs = pageInquire.findPage(sql);
		 PersonCarUcodeVo personCarUcodeVo = null;
		
			try {
				 ResultSetMetaData md = rs.getMetaData();
					int columnCount = md.getColumnCount();
				while (rs.next()) {
					for (int i = 1; i <= columnCount; i++) {
						personCarUcodeVo = new PersonCarUcodeVo();
						personCarUcodeVo.setUcode(rs.getString("u"));
						personCarUcodeVo.setCheckAddress(rs.getString("ck"));
						personCarUcodeVo.setName((map.get(rs.getString("u"))));
						personCarUcodeVo.setCount(Integer.parseInt(rs.getString("c")));

					}
					
					results.add(personCarUcodeVo);
                   
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			 return results;
	 }
	 
	 public List<PersonCheck> findByIdcardNo(String  idcardNo)
	 {
		return personCheckCrud.findByIdcardNo(idcardNo);
		 
	 }
	 
	 public List<PersonCheckLog> findBySfzh(String  idcardNo)
	 {
		 List<Dwdm> dwdmList = dwdmService.findAll();
	    	Map<String,String> dwdmMap =  new HashMap<String,String>();
	    	for(Dwdm dwdm : dwdmList){
	    		dwdmMap.put(dwdm.getCode(), dwdm.getName());
	    	}
		//转换非正常字段
			JsonNode nationalJsonNode = dictionaryService.getNational();
			JsonNode sblxJsonNode = dictionaryService.getSblx();
			JsonNode ssbdlyJsonNode = dictionaryService.getSsbdly();
		//return personChecLogCrud.findBySfzh(idcardNo);
		 String sql = " select * from person_check_log where 1=1  and sfzh='" + idcardNo + "' ";
		 Log.info(sql);
		System.out.println(sql);
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		//ResultSet rs = pageInquire.findPage(sql);
		//List<PersonCheckLog> personCheckLogs = new ArrayList<PersonCheckLog>();
		//PersonCheckLog personCheckLog = null;
		list = pageInquire.findPageForList(sql);
		
		Iterator it = list.iterator();
		List<PersonCheckLog> listpcl = new ArrayList<PersonCheckLog>();
		while(it.hasNext()){
			Map erMap = (Map)it.next();
			PersonCheckLog pcl = new PersonCheckLog();
			pcl.setName((String)erMap.get("name"));
			pcl.setId((String)erMap.get("id"));
			pcl.setCheckdept((String)erMap.get("checkdept"));
			if(dwdmMap.containsKey(pcl.getCheckdept())){
				pcl.setCheckdept(dwdmMap.get(pcl.getCheckdept()));
			}
			pcl.setCreateTime((String)erMap.get("create_time"));
			pcl.setCheckreason((String)erMap.get("check_reason"));
			pcl.setSex((String)erMap.get("sex"));
			String sex = pcl.getSex();
			if (sex != null && !sex.equals("")) {
				if ("1".equals(sex)) {
					sex = "男";
				} else if ("2".equals(sex)) {
					sex = "女";
				}else
				{
					sex = "未知";
				}
			}
			pcl.setSex(sex);
			
			pcl.setBirthday((String)erMap.get("birthday"));
			pcl.setBirthplace((String)erMap.get("birthplace"));
			pcl.setCheckaddress((String)erMap.get("check_address"));
			pcl.setCzyq((String)erMap.get("czyq"));
			pcl.setLgdw((String)erMap.get("lgdw"));
			pcl.setSfzh((String)erMap.get("sfzh"));
			pcl.setLocation((String)erMap.get("location"));
			pcl.setNation((String)erMap.get("nation"));
			String nation = pcl.getNation();
			if (nation != null && !nation.equals("")) {
				if (nationalJsonNode.get(nation) != null) {
					nation = nationalJsonNode.get(nation).asText();
				}
				pcl.setNation(nation);
			}
			pcl.setPersonif((String)erMap.get("personif"));
			pcl.setPersonType((String)erMap.get("person_type"));
			pcl.setPolicename((String)erMap.get("police_name"));
			pcl.setPoliceno((String)erMap.get("policeno"));
			pcl.setPolicephone((String)erMap.get("policephone"));
			pcl.setPushResult((String)erMap.get("push_result"));
			pcl.setPushTaget((String)erMap.get("push_taget"));
			String pushTaget = pcl.getPushTaget();
			if (pushTaget != null && !pushTaget.equals("")) {
				String[] pushTagetArry = pushTaget.split(",");
				String pushTagetTemp = "";
				for(String push : pushTagetArry){
					if (ssbdlyJsonNode.get(push) != null) {
						push = ssbdlyJsonNode.get(push).asText();
					}
					pushTagetTemp += push+",";
				}
				pushTagetTemp = pushTagetTemp.substring(0,pushTagetTemp.length()-1);
				pcl.setPushTaget(pushTagetTemp);
			}
			pcl.setTags((String)erMap.get("tags"));
			pcl.setTagsContent((String)erMap.get("tags_content"));
			pcl.setSource((String)erMap.get("source"));
			String sourceName = pcl.getSource();
			if (sourceName != null && !sourceName.equals("")) {
				if (sblxJsonNode.get(sourceName) != null) {
					sourceName = sblxJsonNode.get(sourceName).asText();
				}
				pcl.setSource(sourceName);
			}
			
			listpcl.add(pcl);
		}
		return listpcl;
	 }
	 public List<PersonCheck> findByIdcardNosql(String  idcardNo)
	 {
		 Map<String, String> subCategoryMap = this.importantPersonCategoryService.listSubCategoryMap();
			Map<String,String>   ucodeMap = this.importantPersonCategoryService.listUcodeMap();
			JsonNode nationalJsonNode = dictionaryService.getNational();
			Map<String, String> listHSxzqhMap = this.xzqhService.listHSxzqhMap();
		 String sql = " select * from jwt_check_person_log_1501 where 1=1  and idcard_no='" + idcardNo + "' ";
			Log.info(sql);
			System.out.println(sql);
			ResultSet rs = pageInquire.findPage(sql);
			List<PersonCheck> personChecks = new ArrayList<PersonCheck>();
			PersonCheck personCheck = null;
			try {
				ResultSetMetaData md = rs.getMetaData();
				int columnCount = md.getColumnCount();
				while (rs.next()) {
					for (int i = 1; i <= columnCount; i++) {

						personCheck = new PersonCheck();
						personCheck.setPcode(rs.getString("pcode"));
						personCheck.setPoliceName(rs.getString("police_name"));
						personCheck.setPolicePhone(rs.getString("police_phone"));
						String ucodeperson = ucodeMap.get(rs.getString("ucode"));
						personCheck.setUcode(ucodeperson);
						personCheck.setIdcardNo(rs.getString("idcard_no"));
						personCheck.setName(rs.getString("name"));
						
						String csrq =rs.getString("idcard_no").substring(6, 14);
						personCheck.setPersoncsrq(csrq);
						//personCheck.setSex(rs.getString("sex"));
						String sex = rs.getString("sex");
						if (sex != null && !sex.equals("")) {
							if ("1".equals(sex)) {
								sex = "男";
							} else if ("2".equals(sex)) {
								sex = "女";
							}
						}
						personCheck.setSex(sex);
					//	personCheck.setNational(rs.getString("national"));
						String nation = rs.getString("national");
						if (nation != null && !nation.equals("")) {
							if(nationalJsonNode.get(nation)!=null){
								nation = nationalJsonNode.get(nation).asText();
							}
							personCheck.setNational(nation);
						}
						personCheck.setAddressDetails(rs.getString("address_details"));
						personCheck.setDomicile(rs.getString("domicile"));
						// personCheck.setPersonneltype(rs.getString("personneltype"));
						String persontype = getTagNameArryStr(subCategoryMap, rs.getString("personneltype"));
						personCheck.setPersonneltype(persontype);
						personCheck.setCheckTime(rs.getString("check_time"));
						personCheck.setQueryType(rs.getString("query_type"));
						personCheck.setQueryPlace(rs.getString("query_place"));
					//	personCheck.setCheckAddress(rs.getString("check_address"));
						String checkaddress = rs.getString("check_address");
						if (checkaddress != null && !"".equals(checkaddress)) {
							personCheck.setCheckAddress(listHSxzqhMap.get(checkaddress));
						}
						personCheck.setQgztry(rs.getString("qgztry"));
						personCheck.setQgwffz(rs.getString("qgwffz"));
						personCheck.setQgxfd(rs.getString("qgxfd"));
						personCheck.setBdzdry(rs.getString("bdzdry"));
						personCheck.setCheckReason(rs.getString("check_reason"));
						//personCheck.setCheckSource(rs.getString("check_source"));
						personCheck.setLocalFlag(rs.getString("local_flag"));
						personCheck.setCheckLocation(rs.getString("check_location"));
						personCheck.setCheckPlace(rs.getString("check_place"));
						personCheck.setCheckFlag(rs.getString("check_flag"));
						personCheck.setRyhcFlag(rs.getString("ryhc_flag"));
						personCheck.setRyhcTag(rs.getString("ryhc_tag"));
						personCheck.setCheckSource("警务通");
						
					}
					}
				personChecks.add(personCheck);

	
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			return personChecks;

		 
	 }

	private String getCompareQuery(String name, String idcardNo, String pcode, String national, String beginTime,
			String endTime, String ucode, String addressDetails, String personneltype, String policeName,
			String checkPlace, String checkReason, String checkAddress, String ryhcTag,String ryhcTag2,String personif,String checkSource) {
		String sqlw = "";
		if (name != null&&!"".equals(name)) {
			sqlw = sqlw + " and t.name like '%" + name + "%'";
		}
		if (idcardNo!= null&&!"".equals(idcardNo)) {
			sqlw = sqlw + " and t.idcard_no like '" + idcardNo + "%'";
		}
		if (pcode!= null&&!"".equals(pcode)) {
			sqlw = sqlw + " and t.pcode = '" + pcode + "'";
		}
		if (national!= null&&!"".equals(national)) {
			sqlw = sqlw + " and t.national= '" + national + "'";
		}
		if (beginTime != null&&!"".equals(beginTime)&&endTime!= null&&!"".equals(endTime)) {
			sqlw = sqlw + " and t.check_time between '" + beginTime + "' and '" + endTime + "'";
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
		if (checkSource != null&&!"".equals(checkSource)) {
			if("jwt".equals(checkSource)){
				sqlw = sqlw + "and (t.check_source is null or t.check_source='' or t.check_source='jwt')";
			}else if("lte".equals(checkSource)){
				sqlw = sqlw + "and t.check_source='lte'";
			}else{
				
			}
		}
		
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
				
				sqlw = sqlw + " and (t.domicile in ("+codea+") OR t.domicile like '%"
						+ addressArry[1] + "%')";
				System.out.println("null===="+sqlw);
				}else if(!"null".equals(addressArry[0]))
				{
					sqlw = sqlw + " and (t.domicile like '%" + addressArry[0] + "%' OR t.domicile like '%"
							+ addressArry[1] + "%')";
				}
			} else {
				sqlw = sqlw + " and t.domicile like '%" + addressDetails + "%'";
			}
		}
		
		if (personneltype != null&&!"".equals(personneltype)) {
			sqlw = sqlw + " and t.personneltype like '%" + personneltype + "%'";
		}
		
		if (policeName!= null&&!"".equals(policeName)) {
			sqlw = sqlw + " and t.police_name like '" + policeName + "%'";
		}
		if (checkPlace!= null&&!"".equals(checkPlace)) {
			if ("-1".equals(checkPlace)) {
				sqlw = sqlw + " and t.check_place IS NULL";
			} else {
				sqlw = sqlw + " and t.check_place = '" + checkPlace + "'";
			}
		}
		
		if (checkReason!= null&&!"".equals(checkReason)) {
			sqlw = sqlw + " and t.check_reason like '%" + checkReason + "%'";
		}
		
		if (checkAddress != null && !"".equals(checkAddress)) {
			sqlw = sqlw + " and t.check_address= '" + checkAddress + "'";
		}
		
		if (ryhcTag != null && !"".equals(ryhcTag)) {
			sqlw = sqlw + " and t.ryhc_tag like '%" + ryhcTag + "%'";
		}
		if (ryhcTag2 != null && !"".equals(ryhcTag2)) {
			sqlw = sqlw + " and t.ryhc_tag like '%" + ryhcTag2 + "%'";
		}
		if (personif != null && !"".equals(personif)&&"1".equals(personif)) {
			sqlw = sqlw + " and (t.ryhc_tag like '%涉稳%' or  t.ryhc_tag like '%疆%' or t.ryhc_tag like '%访%' or t.ryhc_tag like '%毒%' or t.ryhc_tag like '%恐%' or t.ryhc_tag like '%逃%') ";
		}
		
		return sqlw;
	}

	public PageHelper findPageCompare(String name, String idcardNo, String pcode, String national, String beginTime,
			String endTime, String ucode, String addressDetails, String personneltype, String policeName,
			String checkPlace, String checkReason, String checkAddress, String ryhcTag,String ryhcTag2,String personif,String checkSource,int pageno, int size) {
		
		// 拼接
		String sqlw = getCompareQuery(name, idcardNo, pcode, national, beginTime, endTime, ucode, addressDetails,
				personneltype, policeName, checkPlace, checkReason, checkAddress, ryhcTag,ryhcTag2,personif,checkSource);
		int count = 0;
		PageHelper pageHelper = new PageHelper();
		List<PersonCheck> personChecks = new ArrayList<PersonCheck>();
		/*if(!"jwt".equals(checkSource)&&!"".equals(checkSource))
		{
			
		}else
		{*/
		String sqlc = " select count(*) c from jwt_check_person_log_1501 t where 1=1 "
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
		
		Map<String,String> categoryMap = this.importantPersonCategoryService.listCategoryMap();
		Map<String,String> subCategoryMap = this.importantPersonCategoryService.listSubCategoryMap();
		JsonNode nationalJsonNode = dictionaryService.getNational();
		Map<String, String> listHSxzqhMap = this.xzqhService.listHSxzqhMap();
		Map<String,String> listReHjdqhCategoryMap = this.importantPersonCategoryService.listReHjdqhCategoryMap();

		String sql = " select * from jwt_check_person_log_1501 t where 1=1 "
				+ sqlw + "  ORDER BY t.check_time desc limit " + (pageno - 1) * size
				+ " , " + size;
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		PersonCheck personCheck = null;
		String qgztry = "";//警务通在逃标签
		String qgwffz = "";
		String qgxfd  = "";
		String bdzdry = "";
		String ryhc_tag = "";//人车核查后台标签
		String domicile = "";//户籍地
		String domicile_code = "";//户籍地代码
		String domicile_name = "";
		String idcardno = "";
		try {
			ResultSetMetaData md = rs.getMetaData();
			// int columnCount = md.getColumnCount();
			while (rs.next()) { 
				// for (int i = 1; i <= columnCount; i++) {

				personCheck = new PersonCheck();
				personCheck.setPcode(rs.getString("pcode"));
				personCheck.setPoliceName(rs.getString("police_name"));
				personCheck.setPolicePhone(rs.getString("police_phone"));
				//TODO
			//	personCheck.setUcode(rs.getString("ucode"));
				
				String orgid = rs.getString("ucode");
				if(orgid!=null && !"".equals(orgid))
				{
					Map<String, String>  dwdmMap =dwdmService.getDwdmMap(orgid);
					personCheck.setUcode(dwdmMap.get(orgid));
				}else
				{
					personCheck.setUcode("未知");
				}
				idcardno = rs.getString("idcard_no");
				personCheck.setIdcardNo(idcardno);
				personCheck.setName(rs.getString("name"));
			//	personCheck.setSex(rs.getString("sex"));
				String fsex = rs.getString("sex");
				if("1".equals(fsex))
				{
					personCheck.setSex("男");
				}else if("2".equals(fsex))
				{
					personCheck.setSex("女");
				}else if("".equals(fsex)||fsex==null)
				{
					personCheck.setSex("未知");
				}else
				{
					personCheck.setSex(fsex);
				}
				//personCheck.setNational(rs.getString("national"));
				
				String nation = rs.getString("national");
				if (nation != null && !nation.equals("")) {
					if(nationalJsonNode.get(nation)!=null){
						nation = nationalJsonNode.get(nation).asText();
						personCheck.setNational(nation);
					}
					
				}else
				{
					personCheck.setNational("未知");
				}
				personCheck.setAddressDetails(rs.getString("address_details"));
				//listReHjdqhCategoryMap
				domicile = rs.getString("domicile");
				Pattern pattern = Pattern.compile("[0-9]*"); 
				domicile_code = rs.getString("domicile_code");
				if(null != domicile_code && !"".equals(domicile_code.trim())){
					domicile_name = listReHjdqhCategoryMap.get(domicile_code);
				}else if(null != domicile && !"".equals(domicile) && pattern.matcher(domicile.replace("/", "")).matches()) {
					domicile_name = listReHjdqhCategoryMap.get(domicile);
				}else if(null != domicile && !"".equals(domicile) && !pattern.matcher(domicile.replace("/", "")).matches()) {
					domicile_name = domicile.replace("/", "");
				}else if(null != idcardno && idcardno.length() > 6){
					domicile_name = listReHjdqhCategoryMap.get(idcardno.substring(0,6));
				}
			    
				personCheck.setDomicile(domicile_name);

				personCheck.setCheckTime(rs.getString("check_time"));
				personCheck.setQueryType(rs.getString("query_type"));
				personCheck.setQueryPlace(rs.getString("query_place"));
			//	personCheck.setCheckAddress(rs.getString("check_address"));
				String checkaddress = rs.getString("check_address");
				if (checkaddress != null && !"".equals(checkaddress)) {
					personCheck.setCheckAddress(listHSxzqhMap.get(checkaddress));
				}else
				{
					personCheck.setCheckAddress("未知");
				}
				
				//合并警务通比对标签与人车核查比对标签
				ryhc_tag = rs.getString("ryhc_tag");
				qgztry = rs.getString("qgztry");
				qgwffz = rs.getString("qgwffz");
				qgxfd  = rs.getString("qgxfd");
				bdzdry = rs.getString("bdzdry");
				if(null != qgztry && !"".equals(qgztry.trim())) {
					qgztry = "全国在逃人员";
					ryhc_tag = ryhc_tag+","+qgztry;
				}else {
					qgztry = "";
				}
				if(null != qgwffz && !"".equals(qgwffz.trim())) {
					qgwffz = "全国违法犯罪人员";
					ryhc_tag = ryhc_tag+","+qgwffz;
				}else {
					qgwffz = "";
				}
				if(null != qgxfd && !"".equals(qgxfd.trim())) {
					qgxfd = "全国吸贩毒人员";
					ryhc_tag = ryhc_tag+","+qgxfd;
				}else {
					qgxfd = "";
				}
				if(null != bdzdry && !"".equals(bdzdry.trim())) {
					bdzdry = "本地重点人员";
					ryhc_tag = ryhc_tag+","+bdzdry;
				}else {
					bdzdry = "";
				}

				
				personCheck.setQgztry(qgztry);
				personCheck.setQgwffz(qgwffz);
				personCheck.setQgxfd(qgxfd);
				personCheck.setBdzdry(bdzdry);
				personCheck.setCheckReason(rs.getString("check_reason"));
				personCheck.setLocalFlag(rs.getString("local_flag"));
				personCheck.setCheckLocation(rs.getString("check_location"));
				personCheck.setCheckPlace(rs.getString("check_place"));
				personCheck.setCheckFlag(rs.getString("check_flag"));
				
				String ryhctag = getTagNameArryStr(categoryMap, ryhc_tag);
				personCheck.setRyhcTag(ryhctag);
				if((rs.getString("ryhc_tag")!=null&&!"".equals(rs.getString("ryhc_tag"))&&((rs.getString("ryhc_tag").contains("疆"))||(rs.getString("ryhc_tag").contains("涉稳"))||(rs.getString("ryhc_tag").contains("访"))||(rs.getString("ryhc_tag").contains("涉毒"))||(rs.getString("ryhc_tag").contains("逃"))||(rs.getString("ryhc_tag").contains("涉恐")))))
				{
					personCheck.setRyhcFlag("1");
				}else
				{
					personCheck.setRyhcFlag("0");
				}
			//	personCheck.setRyhcFlag(rs.getString("ryhc_flag"));
				personCheck.setCheckSource("jwt".equals(checkSource)?"警务通":"LTE");

				

				String persontype = getTagNameArryStr(subCategoryMap, rs.getString("personneltype"));
				personCheck.setPersonneltype(persontype);
				//}
				personChecks.add(personCheck);

			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		/*}*/
        int totalpage = 0;
        if(count%size==0)
        {
        	totalpage=count/size;
        }else{
        	totalpage=(count/size)+1;
        }
		pageHelper.setPageNo(pageno);
		pageHelper.setPageSize(size);
		pageHelper.setResult(personChecks);
		pageHelper.setTotalPage(totalpage);
		pageHelper.setTotal(count);

		return pageHelper;

	}

	
    public List<PersonCheck> findByParamperCompare(String name, String idcardNo, String pcode, String national,
			String beginTime, String endTime, String ucode, String addressDetails, String personneltype,
			String policeName, String checkPlace, String checkReason, String checkAddress, String ryhcTag,String ryhcTag2,String personif) {

		String sqlw = getCompareQuery(name, idcardNo, pcode, national, beginTime, endTime, ucode, addressDetails,
				personneltype, policeName, checkPlace, checkReason, checkAddress, ryhcTag,ryhcTag2,personif,"");

		String sql = " select t.*, dw.name as dwname from jwt_check_person_log_1501 t left join tb_d_dwdm dw on t.ucode = dw.code "
				+ " where 1=1 and t.ryhc_tag <> '' and t.ryhc_tag is not null " + sqlw + " ORDER BY t.check_time desc limit 0,10000 ";
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		List<PersonCheck> personChecks = this.getPersonCheck(rs);

		return personChecks;

	}

	private List<PersonCheck> getPersonCheck(ResultSet rs) {
		Map<String, String> categoryMap = this.importantPersonCategoryService.listCategoryMap();
		Map<String, String> subCategoryMap = this.importantPersonCategoryService.listSubCategoryMap();
		JsonNode nationalJsonNode = dictionaryService.getNational();
		Map<String, String> listHSxzqhMap = this.xzqhService.listHSxzqhMap();
		
		List<PersonCheck> personChecks = new ArrayList<PersonCheck>();
		PersonCheck personCheck = null;
		String qgztry = "";
		String qgwffz = "";
		String qgxfd  = "";
		String bdzdry = "";
		try {
			if(rs!=null){
				while (rs.next()) {
					personCheck = new PersonCheck();
					personCheck.setPcode(rs.getString("pcode"));
					personCheck.setPoliceName(rs.getString("police_name"));
					personCheck.setPolicePhone(rs.getString("police_phone"));
					personCheck.setUcode(rs.getString("dwname"));

					personCheck.setIdcardNo(rs.getString("idcard_no"));
					personCheck.setName(rs.getString("name"));
					String sex = rs.getString("sex");
					if (sex != null && !sex.equals("")) {
						if ("1".equals(sex)) {
							sex = "男";
						} else if ("2".equals(sex)) {
							sex = "女";
						}
					}
					personCheck.setSex(sex);

					String nation = rs.getString("national");
					if (nation != null && !nation.equals("")) {
						if(nationalJsonNode.get(nation)!=null){
							nation = nationalJsonNode.get(nation).asText();
						}
						personCheck.setNational(nation);
					}
					personCheck.setAddressDetails(rs.getString("address_details"));
					personCheck.setDomicile(rs.getString("domicile"));
					personCheck.setCheckTime(rs.getString("check_time"));
					personCheck.setQueryType(rs.getString("query_type"));
					personCheck.setQueryPlace(rs.getString("query_place"));

					String checkaddress = rs.getString("check_address");
					if (checkaddress != null && !"".equals(checkaddress)) {
						personCheck.setCheckAddress(listHSxzqhMap.get(checkaddress));
					}
					personCheck.setQgztry(rs.getString("qgztry"));
					personCheck.setQgwffz(rs.getString("qgwffz"));
					personCheck.setQgxfd(rs.getString("qgxfd"));
					personCheck.setBdzdry(rs.getString("bdzdry"));
					personCheck.setCheckReason(rs.getString("check_reason"));
					personCheck.setCheckSource(rs.getString("check_source"));
					personCheck.setLocalFlag(rs.getString("local_flag"));
					personCheck.setCheckLocation(rs.getString("check_location"));
					personCheck.setCheckPlace(rs.getString("check_place"));
					personCheck.setCheckFlag(rs.getString("check_flag"));
					personCheck.setRyhcFlag(rs.getString("ryhc_flag"));

					//组装警务通标签和人车核查后台标签
				
					String ryhctag = getTagNameArryStr(categoryMap, rs.getString("ryhc_tag"));
					personCheck.setRyhcTag(ryhctag);

					String persontype = getTagNameArryStr(subCategoryMap, rs.getString("personneltype"));
					personCheck.setPersonneltype(persontype);

					personChecks.add(personCheck);
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return personChecks;
	}

	private String getTagNameArryStr(Map<String, String> categoryMap, String categorys) {
		String categoryStr = "";
		if (categorys != null && !categorys.equals("")) {
			String[] categoryArray = categorys.split(", ");
			for (String categoryTemp : categoryArray) {
				categoryTemp = categoryTemp.trim();
				if (categoryMap.containsKey(categoryTemp)) {
					categoryStr += categoryMap.get(categoryTemp) + ",";
				}else{
					categoryStr += categoryTemp+","; 
				}
			}
			if (!categoryStr.equals("")) {
				categoryStr = categoryStr.substring(0, categoryStr.length() - 1);
			}
		}
		return categoryStr;

	}

	private String getQuery(String name, String idcardNo, String pcode, String national, String beginTime,
			String endTime, String ucode, String addressDetails, String personneltype, String policeName,
			String checkAddress, String checkReason, String checkSource) {
		String sqlw = "";
		if (name != null&&!"".equals(name)) {
			sqlw = sqlw + " and t.name like '%" + name + "%'";
		}
		if (idcardNo!= null&&!"".equals(idcardNo)) {
			sqlw = sqlw + " and t.idcard_no like '%" + idcardNo + "%'";
		}
		
		if (pcode!= null&&!"".equals(pcode)) {
			sqlw = sqlw + " and t.pcode like '%" + pcode + "%'";
		}
		if (national!= null&&!"".equals(national)) {
			sqlw = sqlw + " and t.national= '" + national + "'";
		}
		if (beginTime != null&&!"".equals(beginTime)&&endTime!= null&&!"".equals(endTime)) {
			sqlw = sqlw + " and t.check_time between '" + beginTime + "' and '" + endTime + "'";
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
					}
					codea = codea.substring(0, codea.length()-1);
				} catch (NumberFormatException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				
				sqlw = sqlw + " and (t.domicile in ("+codea+") OR t.domicile like '%"
						+ addressArry[1] + "%')";
				}else if(!"null".equals(addressArry[0]))
				{
					sqlw = sqlw + " and (t.domicile like '%" + addressArry[0] + "%' OR t.domicile like '%"
							+ addressArry[1] + "%')";
				}
			} else {
				sqlw = sqlw + " and t.domicile like '%" + addressDetails + "%'";
			}
		}
		
		if (personneltype != null&&!"".equals(personneltype)) {
			sqlw = sqlw + " and t.personneltype= '" + personneltype + "'";
		}
		
		if (policeName!= null&&!"".equals(policeName)) {
			sqlw = sqlw + " and t.police_name like '%" + policeName + "%'";
		}
		if (checkAddress!= null&&!"".equals(checkAddress)) {
			sqlw = sqlw + " and t.check_address = '" + checkAddress + "'";
		}
		
		if (checkReason!= null&&!"".equals(checkReason)) {
			sqlw = sqlw + " and t.check_reason like '%" + checkReason + "%'";
		}

		/*if (checkSource != null && !"".equals(checkSource)) {
			sqlw = sqlw + " and t.check_source= '" + checkSource + "'";
		}*/
		return sqlw;
	}

	public PageHelper findPage(String name, String idcardNo, String pcode, String national, String beginTime,
			String endTime, String ucode, String addressDetails, String personneltype, String policeName,
			String checkAddress, String checkReason, String checkSource, int pageno, int size) {
		Map<String, String> listHSxzqhMap = this.xzqhService.listHSxzqhMap();
		String sqlw = this.getQuery(name, idcardNo, pcode, national, beginTime, endTime, ucode, addressDetails,
				personneltype, policeName, checkAddress, checkReason, checkSource);
		int count = 0;
		int totalpage = 0;
		PageHelper pageHelper = new PageHelper();
		List<PersonCheck> personChecks = new ArrayList<PersonCheck>();
		if(!"jwt".equals(checkSource)&&!"".equals(checkSource))
		{
			
		}else
		{
		String sqlc = " select count(*) c from jwt_check_person_log_1501 t where 1=1 " + sqlw;
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

		String sql = " select * from jwt_check_person_log_1501 t where 1=1 " + sqlw
				+ "  ORDER BY t.check_time desc limit " + (pageno - 1) * size
				+ " , " + size;
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		
		PersonCheck personCheck = null;

		Map<String, String> subCategoryMap = this.importantPersonCategoryService.listSubCategoryMap();
		Map<String,String>   ucodeMap = this.importantPersonCategoryService.listUcodeMap();
		JsonNode nationalJsonNode = dictionaryService.getNational();
		try {
			ResultSetMetaData md = rs.getMetaData();
			int columnCount = md.getColumnCount();
			while (rs.next()) { 
				for (int i = 1; i <= columnCount; i++) {

					personCheck = new PersonCheck();
					personCheck.setPcode(rs.getString("pcode"));
					personCheck.setPoliceName(rs.getString("police_name"));
					personCheck.setPolicePhone(rs.getString("police_phone"));
					String ucodeperson = ucodeMap.get(rs.getString("ucode"));
					personCheck.setUcode(ucodeperson);
					personCheck.setIdcardNo(rs.getString("idcard_no"));
					personCheck.setName(rs.getString("name"));
					
					String csrq =rs.getString("idcard_no").substring(6, 14);
					personCheck.setPersoncsrq(csrq);
					//personCheck.setSex(rs.getString("sex"));
					String sex = rs.getString("sex");
					if (sex != null && !sex.equals("")) {
						if ("1".equals(sex)) {
							sex = "男";
						} else if ("2".equals(sex)) {
							sex = "女";
						}
					}
					personCheck.setSex(sex);
				//	personCheck.setNational(rs.getString("national"));
					String nation = rs.getString("national");
					if (nation != null && !nation.equals("")) {
						if(nationalJsonNode.get(nation)!=null){
							nation = nationalJsonNode.get(nation).asText();
						}
						personCheck.setNational(nation);
					}
					personCheck.setAddressDetails(rs.getString("address_details"));
					personCheck.setDomicile(rs.getString("domicile"));
					// personCheck.setPersonneltype(rs.getString("personneltype"));
					String persontype = getTagNameArryStr(subCategoryMap, rs.getString("personneltype"));
					personCheck.setPersonneltype(persontype);
					personCheck.setCheckTime(rs.getString("check_time"));
					personCheck.setQueryType(rs.getString("query_type"));
					personCheck.setQueryPlace(rs.getString("query_place"));
				//	personCheck.setCheckAddress(rs.getString("check_address"));
					String checkaddress = rs.getString("check_address");
					if (checkaddress != null && !"".equals(checkaddress)) {
						personCheck.setCheckAddress(listHSxzqhMap.get(checkaddress));
					}
					personCheck.setQgztry(rs.getString("qgztry"));
					personCheck.setQgwffz(rs.getString("qgwffz"));
					personCheck.setQgxfd(rs.getString("qgxfd"));
					personCheck.setBdzdry(rs.getString("bdzdry"));
					personCheck.setCheckReason(rs.getString("check_reason"));
					//personCheck.setCheckSource(rs.getString("check_source"));
					personCheck.setLocalFlag(rs.getString("local_flag"));
					personCheck.setCheckLocation(rs.getString("check_location"));
					personCheck.setCheckPlace(rs.getString("check_place"));
					personCheck.setCheckFlag(rs.getString("check_flag"));
					personCheck.setRyhcFlag(rs.getString("ryhc_flag"));
					personCheck.setRyhcTag(rs.getString("ryhc_tag"));
					personCheck.setCheckSource("警务通");
					
				}
				personChecks.add(personCheck);

			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
        if(count%size==0)
        {
        	totalpage=count/size;
        }else{
        	totalpage=(count/size)+1;
        }
		pageHelper.setPageNo(pageno);
		pageHelper.setPageSize(size);
		pageHelper.setResult(personChecks);
		pageHelper.setTotalPage(totalpage);
		pageHelper.setTotal(count);
		
		return pageHelper;

	}
	
	/*public List<PersonCheck> findByParamper(String name, String idcardNo, String pcode, String national,
			String beginTime, String endTime, String ucode, String addressDetails, String personneltype,
			String policeName, String checkAddress, String checkReason, String checkSource) {
		String sqlw = this.getQuery(name, idcardNo, pcode, national, beginTime, endTime, ucode, addressDetails,
				personneltype, policeName, checkAddress, checkReason, checkSource);

		String sql = "  select t.*, dw.name as dwname from jwt_check_person_log_1501 t left join tb_d_dwdm dw on t.ucode = dw.code"
				+ " where 1=1 " + sqlw + " ORDER BY check_time desc limit 0,10000 ";
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		List<PersonCheck> personChecks = getPersonCheck(rs);
		return personChecks;

	}*/

	public List<List<PersonCarVo>> Infofind(String beginTime, String endTime, String ucode, String policeName,
			String domicile, String domicileChinese) {

		List<List<PersonCarVo>> results = new ArrayList<List<PersonCarVo>>();

		String sqlw = "";
		if (beginTime != null && !"".equals(beginTime) && endTime != null && !"".equals(endTime)) {
			sqlw = sqlw + " and check_time between '" + beginTime + "' and '" + endTime + "'";
		}
		if (policeName != null && !"".equals(policeName)) {
			sqlw = sqlw + " and police_name= '" + policeName + "'";
		}

		if (ucode != null && !"".equals(ucode)) {
			sqlw = sqlw + " and ucode= '" + ucode + "'";
		}

		if (domicile != null && !"".equals(domicile)) {
			if (domicileChinese != null && !"".equals(domicileChinese)) {
				sqlw = sqlw + " and (domicile= '" + domicile + "' or " + "domicile='" + domicileChinese + "')";
			} else {
				sqlw = sqlw + " and domicile= '" + domicile + "'";
			}
		}

		Map<String, String> map = new HashMap<String, String>();
		String sqlu = "select check_address qp,COUNT(*) c from jwt_check_person_log_1501 where 1=1 and ryhc_tag <> '' and ryhc_tag is not null "
				+ sqlw + " GROUP BY check_address ";
		Log.debug(sqlu);
		System.out.println(sqlu);
		ResultSet result = pageInquire.findPage(sqlu);

		ResultSetMetaData rsmd;
		try {
			rsmd = result.getMetaData();
			int count = rsmd.getColumnCount();
			while (result.next()) {
				for (int i = 1; i <= count; i++) {
					String key = result.getString("qp");
					String value = result.getString("c");
					map.put(key, value);
				}
			}

		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		// String sql ="select ucode qp,COUNT(*) c from
		// jwt_check_person_log_1501 where 1=1 "+sqlw+" GROUP BY ucode ";
		String sql = "select check_address qp,tb.name nm,COUNT(*) c from jwt_check_person_log_1501 jw left join tb_d_hsxzqh tb on jw.check_address=tb.code "
				+ "where 1=1 " + sqlw + " GROUP BY check_address";
		Log.debug(sql);
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
					
					if (map.get(rs.getString("qp")) != null && !"".equals(map.get(rs.getString("qp")))) {
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

		String sqlp = "select personneltype pt,COUNT(*) c from jwt_check_person_log_1501 where 1=1" + sqlw
				+ " GROUP BY personneltype ";
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
					personCarVo1.setPersonneltype(resultSet.getString("pt"));
					personCarVo1.setCountPt(Integer.parseInt(resultSet.getString("c")));
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
		String sqlTotalCompare = "select COUNT(*) c from jwt_check_person_log_1501 where 1=1 and ryhc_tag <> '' and ryhc_tag is not null " + sqlw;
		String sqlTotal = "select COUNT(*) c from jwt_check_person_log_1501 jw where 1=1 " + sqlw;
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
	
	public List<PersonCarVo> domicileCount(String beginTime, String endTime) {
		List<PersonCarVo> personCarList = new ArrayList<PersonCarVo>();
		String sqlw = "";
		if (beginTime != null && !"".equals(beginTime) && endTime != null && !"".equals(endTime)) {
			sqlw = sqlw + " and check_time between '" + beginTime + "' and '" + endTime + "'";
		}
		String sql = "select t1.code code,t1.name name,t1.total tatal,t2.compar_count compar_count from "
				+ " (select ifnull(qg.code,'0000') code, qg.name name,COUNT(*) total from jwt_check_person_log_1501 jw "
				+ " left join t_d_qgxzqh qg on concat(substring(jw.domicile_code,1,2),'0000') = qg.code "
				+ " WHERE 1=1 " + sqlw + " group by substring(jw.domicile_code,1,2)) t1 LEFT JOIN "
				+ " (select concat(substring(domicile_code,1,2),'0000') code,COUNT(*) compar_count from jwt_check_person_log_1501  "
				+ " where 1=1 " + sqlw + " and ryhc_tag <> '' and ryhc_tag is not null "
				+ " GROUP BY substring(domicile_code,1,2)) t2 on t1.code =  t2.code "; 
		Log.debug(sql);
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		personCarList = this.getPersonCar(rs);
		
		String totalSql = "select t1.code, '合计' as name, total tatal,t2.compar_count compar_count from "
				+ " (select 'total' as code, COUNT(*) total from jwt_check_person_log_1501 jw "
				+ " WHERE 1=1 " + sqlw + ") t1 LEFT JOIN "
				+ " (select 'total' as code,COUNT(*) compar_count from jwt_check_person_log_1501  "
				+ " where 1=1 " + sqlw + " and ryhc_tag <> '' and ryhc_tag is not null ) t2 on t1.code =  t2.code ";

		Log.debug(sql);
		System.out.println(totalSql);
		List<PersonCarVo> totalList = new ArrayList<PersonCarVo>();
		ResultSet totalrs = pageInquire.findPage(totalSql);
		totalList = this.getPersonCar(totalrs);
		personCarList.addAll(totalList);

		return personCarList;
	}

	public List<PersonCarVo> domicileCountByProvince(String code, String beginTime, String endTime) {
		List<PersonCarVo> personCarList = new ArrayList<PersonCarVo>();
		String sqlw = "";
		if (beginTime != null && !"".equals(beginTime) && endTime != null && !"".equals(endTime)) {
			sqlw = sqlw + " and check_time between '" + beginTime + "' and '" + endTime + "'";
		}
		if (code != null && !"".equals(code) && !code.equals("null") && !code.equals("total")) {
			sqlw += " and substring(domicile_code,1,2) = " + code.substring(0, 2);
		} else if (code.equals("null")) {
			sqlw += "and (domicile_code is null or domicile_code = '')";
		}
		
		String nameParm = "qg.name";
		if(code.equals("total")){
			nameParm = "ifnull(qg.remark,qg.name)";
		}

		String sql = "select t1.code code,t1.name name,t1.total tatal,t2.compar_count compar_count from"
				+ " (select concat(substring(jw.domicile_code,1,4),'00') code, " + nameParm
				+ " name,COUNT(*) total from jwt_check_person_log_1501 jw "
				+ " left join t_d_qgxzqh qg on concat(substring(jw.domicile_code,1,4),'00') = qg.code " + " WHERE 1=1 "
				+ sqlw + " group by substring(jw.domicile_code,1,4)) t1 " + " LEFT JOIN "
				+ " (select concat(substring(domicile_code,1,4),'00') code,COUNT(*) compar_count "
				+ " from jwt_check_person_log_1501  where 1=1 and ryhc_tag <> '' and ryhc_tag is not null " + sqlw
				+ " GROUP BY substring(domicile_code,1,4)) t2 on t1.code =  t2.code";
		Log.debug(sql);
		ResultSet rs = pageInquire.findPage(sql);
		personCarList = this.getPersonCar(rs);

		return personCarList;
	}

	public List<PersonCarVo> domicileCountByCity(String code, String beginTime, String endTime) {
		List<PersonCarVo> personCarList = new ArrayList<PersonCarVo>();
		String sqlw = "";
		if (beginTime != null && !"".equals(beginTime) && endTime != null && !"".equals(endTime)) {
			sqlw = sqlw + " and check_time between '" + beginTime + "' and '" + endTime + "'";
		}
		if (code != null && !"".equals(code)) {
			sqlw += " and substring(domicile_code,1,4) = " + code.substring(0, 4);
		}
		String sql = "select t1.code code,t1.name name,t1.total tatal,t2.compar_count compar_count from"
				+ " (select jw.domicile_code code, qg.name name,COUNT(*) total from jwt_check_person_log_1501 jw  "
				+ " left join t_d_qgxzqh qg on jw.domicile_code = qg.code  " + " WHERE 1=1 " + sqlw
				+ " group by jw.domicile_code) t1 " + " LEFT JOIN  (select domicile_code code,COUNT(*) compar_count  "
				+ " from jwt_check_person_log_1501  where 1=1 and ryhc_tag <> '' and ryhc_tag is not null " + sqlw
				+ " GROUP BY domicile_code) t2 on t1.code =  t2.code";

		Log.debug(sql);
		ResultSet rs = pageInquire.findPage(sql);
		personCarList = this.getPersonCar(rs);

		return personCarList;
	}

	private List<PersonCarVo> getPersonCar(ResultSet rs) {
		List<PersonCarVo> personCarList = new ArrayList<PersonCarVo>();
		PersonCarVo personCarVo = null;
		try {
			PersonCarVo unkonwnPersonCar = new PersonCarVo();
			while (rs.next()) {
				personCarVo = new PersonCarVo();
				personCarVo.setQueryPlace(rs.getString("code"));
				String codeName = rs.getString("name");
				personCarVo.setCodeName(codeName == null ? "未知" : codeName);

				String comparCount = rs.getString("compar_count");
				comparCount = comparCount == null ? "0" : comparCount;
				personCarVo.setCountQpCompare(Integer.parseInt(comparCount));

				personCarVo.setCountQp(Integer.parseInt(rs.getString("tatal")));

				if (personCarVo.getQueryPlace() != null && !personCarVo.getQueryPlace().equals("")
						&& !personCarVo.getQueryPlace().equals("0000") && !personCarVo.getQueryPlace().equals("00")) {
					personCarList.add(personCarVo);
				} else {
					// 未知排序在最后
					unkonwnPersonCar = personCarVo;
				}
			}
			if (unkonwnPersonCar.getCountQp() != 0) {
				personCarList.add(unkonwnPersonCar);
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return personCarList;
	}

	/**
	 * select分页
	 * 
	 * @param map
	 * @return
	 */
	public List<PersonCheck> findPersonCheck(Map<String, String[]> map) {
		int pageno = Integer.parseInt(map.get("pageno")[0]);
		int size = Integer.parseInt(map.get("size")[0]);
		String name = "";
		String sqlw = "1";
		String idcardNo = "";
		String national = "";
		String beginTime = "";
		String endTime = "";
		String checkPlace = "";
		String addressDetails = "";
		String personneltype = "";
		String policeName = "";
		String queryPlace = "";
		String checkReason = "";
		if (map.get("name") != null && !"".equals(map.get("name")[0])) {
			name = map.get("name")[0];
			sqlw = sqlw + "and name like '%" + name + "%'";
		}
		if (map.get("idcardNo") != null && !"".equals(map.get("idcardNo")[0])) {
			idcardNo = map.get("idcardNo")[0];
			sqlw = sqlw + " and idcard_no like '%" + idcardNo + "%'";
		}
		if (map.get("national") != null && !"".equals(map.get("national")[0])) {
			national = map.get("national")[0];
			sqlw = sqlw + " and national= '" + national + "'";
		}
		if (map.get("beginTime") != null && !"".equals(map.get("beginTime")[0]) && map.get("endTime") != null
				&& !"".equals(map.get("endTime")[0])) {
			beginTime = map.get("beginTime")[0];
			endTime = map.get("endTime")[0];
			sqlw = sqlw + " and check_time between '" + beginTime + "' and '" + endTime + "'";
		}

		if (map.get("checkPlace") != null && !"".equals(map.get("checkPlace")[0])) {
			checkPlace = map.get("checkPlace")[0];
			sqlw = sqlw + " and check_place like '%" + checkPlace + "%'";
		}
		if (map.get("addressDetails") != null && !"".equals(map.get("addressDetails")[0])) {
			addressDetails = map.get("addressDetails")[0];
			sqlw = sqlw + " and address_details = '" + addressDetails + "'";
		}

		if (map.get("personneltype") != null && !"".equals(map.get("personneltype")[0])) {
			personneltype = map.get("personneltype")[0];
			sqlw = sqlw + " and personneltype= '" + personneltype + "'";
		}

		if (map.get("policeName") != null && !"".equals(map.get("policeName")[0])) {
			policeName = map.get("policeName")[0];
			sqlw = sqlw + " and police_name= '" + policeName + "'";
		}

		if (map.get("queryPlace") != null && !"".equals(map.get("queryPlace")[0])) {
			queryPlace = map.get("queryPlace")[0];
			sqlw = sqlw + " and query_place like '%" + queryPlace + "%'";
		}

		if (map.get("checkReason") != null && !"".equals(map.get("checkReason")[0])) {
			checkReason = map.get("checkReason")[0];
			sqlw = sqlw + " and check_reason like '%" + checkReason + "%'";
		}

		String sql = sqlw + " limit " + (pageno - 1) * size + " , " + size;

		return personCheckMapper.findPersonCheck(sql);

	}
	@Transactional
	public PersonCheck save(PersonCheck personCheck) {
		return personCheckCrud.save(personCheck);

	}

	@Transactional
	public int deleteById(int id) throws Exception {
		
		return personCheckCrud.deleteById(id);
	
	}
	
		
		/**
		 * 查询
		 * @return
		 */
		
	  public List<PersonCheck> findAll()
	  {
		return personCheckCrud.findAll();
		  
	  }


}
