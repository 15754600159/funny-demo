package com.minginglamp.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.minginglamp.common.PageH;
import com.minginglamp.common.PageInquire;
import com.minginglamp.crud.XfPersonCurd;
import com.minginglamp.model.XfPerson;

@Service
public class XfPersonService {
	
	@Autowired
	PageInquire pageInquire;
	@Autowired
	XfPersonCurd xfPersonCurd;
	
	
	@Autowired
	private ImportantPersonCategoryService importantPersonCategoryService;
	
	
			public XfPerson findByPersonId(String personid)
			{
				return xfPersonCurd.findByPersonid(personid);
				
			}
	
	public PageH findPage(String name,String sex, String nation,String dubious,String dubious2,String address,String cardno,String beginTime,String endTime,String stationid,
			String  stationname,String areacode,int pageno,int size) {
	Map<String,String> subHjdqhMap = this.importantPersonCategoryService.listHjdqhCategoryMap();
		Map<String,String> subcardTypeMap = this.importantPersonCategoryService.listcardTypeMap();
		String sqlw = this.getQuery(name, sex, nation, dubious,dubious2, address, cardno, beginTime, endTime, stationid, stationname, areacode);
		List<Map<String,Object>> listcount = null;
		List<Map<String,Object>> list = null;
		PageH pageHelper = new PageH();
		String sqlCount = "select count(*) c from nmxf_id_person_2017 where 1 = 1"+sqlw;
		
		System.out.println(sqlCount);
		
		listcount = pageInquire.findPageForList(sqlCount);
		Iterator itcount = listcount.iterator();
		int pageCount = 0;
		while(itcount.hasNext()){
			Map pageCountMap = (Map)itcount.next();
			Long lg = (Long)pageCountMap.get("c");
			pageCount = lg.intValue();
		}
		
		String sql = "select * from nmxf_id_person_2017 where 1 = 1"+sqlw+" limit " + (pageno) * size
						+ " , " + size;
		System.out.println(sql);
		list = pageInquire.findPageForList(sql);
		Iterator it = list.iterator();
		List<XfPerson> xfpersons = new ArrayList<XfPerson>();
		XfPerson xfPerson = null;
		while(it.hasNext()){
			Map erMap = (Map)it.next();
			xfPerson = new XfPerson();
			xfPerson.setPersonid(erMap.get("personid")!=null ? erMap.get("personid").toString():"");
			xfPerson.setName(erMap.get("name")!=null ? erMap.get("name").toString():"");
			xfPerson.setSex(erMap.get("sex")!=null ? erMap.get("sex").toString():"");
			xfPerson.setNation(erMap.get("nation")!=null ? erMap.get("nation").toString():"");
			xfPerson.setBirthday(erMap.get("birthday")!=null ? erMap.get("birthday").toString():"");
			xfPerson.setAddress(erMap.get("address")!=null ? erMap.get("address").toString():"");
			xfPerson.setCardno(erMap.get("cardno")!=null ? erMap.get("cardno").toString():"");
			xfPerson.setSigngov(erMap.get("signgov")!=null ? erMap.get("signgov").toString():"");
			xfPerson.setLimiteddate(erMap.get("limiteddate")!=null ? erMap.get("limiteddate").toString():"");
			xfPerson.setEntrytime(erMap.get("entrytime")!=null ? erMap.get("entrytime").toString():"");
			xfPerson.setCreatetime(erMap.get("createtime")!=null ? erMap.get("createtime").toString():"");
			//xfPerson.setDubious(erMap.get("dubious")!=null ? erMap.get("dubious").toString():"");
			String dubiou = erMap.get("dubious")!=null ? erMap.get("dubious").toString():"";
			
			String dubiouValue = "";
		    if(!"".equals(dubiou)&&dubiou!=null)
		    {
		    	dubiouValue = subcardTypeMap.get(dubiou);
		    }else
		    {
		    	dubiouValue = "未知";
		    }
		    if("1".equals(dubiou)||"2".equals(dubiou)||"3".equals(dubiou)||"4".equals(dubiou)||"7".equals(dubiou))
		    {
		    	xfPerson.setPersonif("1");
		    }else
		    {
		    	xfPerson.setPersonif("0");
		    }
		    xfPerson.setDubious(dubiouValue);
			xfPerson.setIsdispatched(erMap.get("isdispatched")!=null ? erMap.get("isdispatched").toString():"");
			xfPerson.setPositionid(erMap.get("positionid")!=null ? erMap.get("positionid").toString():"");
			xfPerson.setPositionname(erMap.get("positionname")!=null ? erMap.get("positionname").toString():"");
			xfPerson.setResemblance(erMap.get("resemblance")!=null ? erMap.get("resemblance").toString():"");
		//	xfPerson.setCheckresult(erMap.get("checkresult")!=null ? erMap.get("checkresult").toString():"");
			String checkResult = erMap.get("checkresult")!=null ? erMap.get("checkresult").toString():"";
			if("-1".equals(checkResult))
			{
				xfPerson.setCheckresult("未必对");
			}else if("0".equals(checkResult))
			{
				xfPerson.setCheckresult("比对未通过");
			}else if("1".equals(checkResult))
			{
				xfPerson.setCheckresult("比对通过");
			}else if("2".equals(checkResult))
			{
				xfPerson.setCheckresult("重点人员报警");
			}else if("3".equals(checkResult))
			{
				xfPerson.setCheckresult("无证人员登记");
			}
			
			xfPerson.setSbjd(erMap.get("sbjd")!=null ? erMap.get("sbjd").toString():"");
			xfPerson.setSbwd(erMap.get("sbwd")!=null ? erMap.get("sbwd").toString():"");
			xfPerson.setZfspath(erMap.get("zfspath")!=null ? erMap.get("zfspath").toString():"");
			xfPerson.setNote(erMap.get("note")!=null ? erMap.get("note").toString():"");
			xfPerson.setNationality(erMap.get("nationality")!=null ? erMap.get("nationality").toString():"");
			xfPerson.setCardtype(erMap.get("cardtype")!=null ? erMap.get("cardtype").toString():"");
			xfPerson.setDirection(erMap.get("direction")!=null ? erMap.get("direction").toString():"");
			xfPerson.setStationid(erMap.get("stationid")!=null ? erMap.get("stationid").toString():"");
			xfPerson.setStationname(erMap.get("stationname")!=null ? erMap.get("stationname").toString():"");
		//	xfPerson.setAreacode(erMap.get("areacode")!=null ? erMap.get("areacode").toString():"");
			String arecode = erMap.get("areacode")!=null ? erMap.get("areacode").toString():"";
			String arecodevalue = "";
			if(arecode!=null && !"".equals(arecode))
			{
				arecodevalue =subHjdqhMap.get(arecode);
			}else
			{
				arecodevalue = "未知";
			}
			xfPerson.setAreacode(arecodevalue);
			xfPerson.setSysdate(erMap.get("sysdate")!=null ? erMap.get("sysdate").toString():"");
			xfpersons.add(xfPerson);
		}
		
		pageHelper.setTotalElements(pageCount);
		pageHelper.setNumberElements(xfpersons.size());
		pageHelper.setNumber(pageno);
        int totalpage = 0;
        if(pageCount%size==0){
        	totalpage=pageCount/size;
        }else{
        	totalpage=(pageCount/size)+1;
        }

		pageHelper.setPageNo(pageno);
		pageHelper.setPageSize(size);
		pageHelper.setContent(xfpersons);
		pageHelper.setTotalPages(totalpage);
		pageHelper.setStart(pageno*size);
		
		
		return pageHelper;
		
	}
	
	
	private String getQuery(String name,String sex, String nation,String dubious,String dubious2,String address,String cardno,String beginTime,String endTime,String stationid,
			String  stationname,String areacode) {
		
		String sqlw = "";
		if(name!=null && !"".equals(name))
		{
			sqlw = sqlw +" and name like '%"+name+"%'";
		}
		if(sex!=null && !"".equals(sex))
		{
			sqlw = sqlw +" and sex = '"+sex+"'";
		}
		
		if(nation!=null && !"".equals(nation))
		{
			sqlw = sqlw +" and nation = '"+nation+"'";
		}
		if(dubious!=null && !"".equals(dubious))
		{
			sqlw = sqlw +" and dubious = '"+dubious+"'";
		}
		if(dubious2!=null && !"".equals(dubious2)&&"1".equals(dubious2))
		{
			sqlw = sqlw +" and dubious in ('1','2','3','4','7') ";
		}
		if(address!=null && !"".equals(address))
		{
			sqlw = sqlw +" and address like '%"+address+"%'";
		}
		if(cardno!=null && !"".equals(cardno))
		{
			sqlw = sqlw +" and cardno like '%"+cardno+"%'";
		}
		/*if(cardno!=null && !"".equals(cardno))
		{
			sqlw = sqlw +" and cardno like '%"+cardno+"%'";
		}*/
		
		if (beginTime != null&&!"".equals(beginTime)&&endTime!= null&&!"".equals(endTime)) {
			sqlw = sqlw + " and sysdate between '" + beginTime + "' and '" + endTime + "'";
		}
		
		if(stationid!=null && !"".equals(stationid))
		{
			sqlw = sqlw +" and stationid like '%"+stationid+"%'";
		}
		if(stationname!=null && !"".equals(stationname))
		{
			sqlw = sqlw +" and stationname like '%"+stationname+"%'";
		}
		/*if(areacode!=null && !"".equals(areacode))
		{
			sqlw = sqlw +" and areacode like '%"+areacode+"%'";
		}*/
		if (areacode != null&&!"".equals(areacode)) {
			String[] addressArry = areacode.split("-");
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
				
				sqlw = sqlw + " and (areacode in ("+codea+") OR areacode like '%"
						+ addressArry[1] + "%')";
				System.out.println("null===="+sqlw);
				}else if(!"null".equals(addressArry[0]))
				{
					String faddress = addressArry[0].trim().replaceAll("0*$", "");
					sqlw = sqlw + " and (areacode like '%" + faddress + "%' OR areacode like '%"
							+ addressArry[1] + "%')";
				}
			} else {
				sqlw = sqlw + " and areacode like '%" + areacode + "%'";
			}
		}
				return sqlw;
		
	}

}
