package com.minginglamp.service;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.mortbay.log.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.minginglamp.common.PageHelper;
import com.minginglamp.common.PageInquire;
import com.minginglamp.crud.LocalPersonCrud;
import com.minginglamp.model.LocalConcernPersons;
import com.minginglamp.utils.ResultMsg;
import com.minginglamp.vo.LocalPersonVo;

@Service
public class LocalPersonService {

	
	@Autowired
	PageInquire pageInquire;
	
	@Autowired
	LocalPersonCrud localPersonCrud;
	
	@Transactional
	public LocalConcernPersons save(LocalConcernPersons localConcernPerson) {
		return localPersonCrud.save(localConcernPerson);

	}
	
	 public List<String> findDataType()
	    {
		  String sql ="select DISTINCT  data_type from local_concern_persons "
		  		+ "where data_type <> '' and data_type is not null";
			System.out.println(sql);
			ResultSet rs = pageInquire.findPage(sql);
			List<String> dataTypes = new ArrayList<String>();
			try {
				while (rs.next()) {
					
					String  dataType = rs.getString("data_type") ;
					dataTypes.add(dataType);	
				}
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		     return dataTypes;
	    }
	
	 public List<String> findReason(String dataType)
	    {
		  String sql ="select DISTINCT  reason from local_concern_persons where reason <> '' and reason is not null";
			if(dataType!=null && !"".equals(dataType))
			{
		   sql = "select DISTINCT reason from local_concern_persons where reason <> '' "
		 		+ "and reason is not null and data_type = '"+dataType+"'";
			}
			System.out.println(sql);
			ResultSet rs = pageInquire.findPage(sql);
			List<String> reasons = new ArrayList<String>();
			try {
				while (rs.next()) {
					
					String  reason = rs.getString("reason") ;
					reasons.add(reason);	
				}
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		     return reasons;
	    }
	 
	@Transactional
	public int count(LocalConcernPersons localConcernPerson) {
		String sqlc = " select count(*) c from local_concern_persons where idcard_no = '"
				+ localConcernPerson.getIdcardNo() + "' and import_no ='" + localConcernPerson.getImportNo()
				+ "' and data_type='" + localConcernPerson.getDataType() + "'";
		System.out.println(sqlc);
		ResultSet resultSet = pageInquire.findPage(sqlc);
		int conunt = 0;
		try {
			while (resultSet.next()) {
				conunt = Integer.parseInt(resultSet.getString("c"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return conunt;

	}

	public PageHelper findPage(int pageno,int size,String name,String idcardNo,String sex,String national,String hjdqPlace,String hjdqAddress,
			           String xzPlace,String xzAddress,String lgPlace,String lgPerson,
			           String reason,String dealRequest,String beginTime,String endTime,String importNo,String dataType,String importName,String currentUserNo) {
		
		int count = 0;
		PageHelper pageHelper = new PageHelper();
		String sqlw = "";
		
		if (name!= null&&!"".equals(name)) {
			sqlw = sqlw + " and name like '%" + name + "%'";
		}
		
		if (idcardNo!= null&&!"".equals(idcardNo)) {
			sqlw = sqlw + " and idcard_no like '%" + idcardNo + "%'";
		}
		if (sex!= null&&!"".equals(sex)) {
			sqlw = sqlw + " and sex = '" + sex + "'";
		}
		if (dataType!= null&&!"".equals(dataType)) {
			sqlw = sqlw + " and data_type like '%" + dataType + "%'";
		}
		
		if (national != null&&!"".equals(national)) {
			sqlw = sqlw + " and national like '%" + national + "%'";
		}
		if (hjdqPlace != null&&!"".equals(hjdqPlace)) {
			sqlw = sqlw + " and hjdq_place like '%" + hjdqPlace + "%'";
		}
		
		if (hjdqAddress != null&&!"".equals(hjdqAddress)) {
			sqlw = sqlw + " and hjdq_address like '%" + hjdqAddress + "%'";
		}
		
		if (xzPlace != null&&!"".equals(xzPlace)) {
			sqlw = sqlw + " and xz_place like '%" + xzPlace + "%'";
		}
		if (xzAddress != null&&!"".equals(xzAddress)) {
			sqlw = sqlw + " and xz_address like '%" + xzAddress + "%'";
		}
		if (lgPlace != null&&!"".equals(lgPlace)) {
			sqlw = sqlw + " and lg_place like '%" + lgPlace + "%'";
		}
		if (lgPerson != null&&!"".equals(lgPerson)) {
			sqlw = sqlw + " and lg_person like '%" + lgPerson + "%'";
		}
		if (reason != null&&!"".equals(reason)) {
			sqlw = sqlw + " and reason like '%" + reason + "%'";
		}
		if (dealRequest != null&&!"".equals(dealRequest)) {
			sqlw = sqlw + " and deal_request like '%" + dealRequest + "%'";
		}
		
		if (beginTime != null&&!"".equals(beginTime)&&endTime!= null&&!"".equals(endTime)) {
			sqlw = sqlw + " and import_time between '" + beginTime + "' and '" + endTime + "'";
		}
		
		if (importName != null&&!"".equals(importName)) {
			sqlw = sqlw + " and import_name like '%" + importName + "%'";
		}
		
		if (importNo != null&&!"".equals(importNo)) {
			sqlw = sqlw + " and import_no like '%" + importNo + "%'";
		}
		
		String sqlc =  " select count(*) c from local_concern_persons where 1=1 " + sqlw + " and (cx_sign='0' or (cx_sign='1' and import_no = '"+currentUserNo+"'))" ;
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

		/*String sql = " select * from local_concern_persons where 1=1 " + sqlw + " limit " + (pageno - 1) * size
				+ " , " + size;*/
		
		String sql = " select * from local_concern_persons where 1=1  " + sqlw + " and (cx_sign='0' or (cx_sign='1' and import_no = '"+currentUserNo+"')) limit " + (pageno - 1) * size
				+ " , " + size; 
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		List<LocalConcernPersons> localConcernPersons = new ArrayList<LocalConcernPersons>();
		LocalConcernPersons localConcernPerson = null;
		try {
			ResultSetMetaData md = rs.getMetaData();
			int columnCount = md.getColumnCount();
			while (rs.next()) { 
				for (int i = 1; i <= columnCount; i++) {

					localConcernPerson = new LocalConcernPersons();
					
					localConcernPerson.setId(rs.getString("id"));
	            	localConcernPerson.setIdcardNo(rs.getString("idcard_no"));
	            	localConcernPerson.setName(rs.getString("name"));
	            	localConcernPerson.setSex(rs.getString("sex"));
	            	localConcernPerson.setNational(rs.getString("national"));
	            	localConcernPerson.setHjdqPlace(rs.getString("hjdq_place"));
	            	localConcernPerson.setHjdqAddress(rs.getString("hjdq_address"));
	            	localConcernPerson.setXzPlace(rs.getString("xz_place"));
	            	localConcernPerson.setXzAddress(rs.getString("xz_address"));
	            	localConcernPerson.setLgPlace(rs.getString("lg_place"));
	            	localConcernPerson.setLgPerson(rs.getString("lg_person"));
	            	localConcernPerson.setReason(rs.getString("reason"));
	            	localConcernPerson.setDealRequest(rs.getString("deal_request"));
	            	localConcernPerson.setDataType(rs.getString("data_type"));
	            	localConcernPerson.setImportNo(rs.getString("import_no"));
	            	localConcernPerson.setImportName(rs.getString("import_name"));
	            	localConcernPerson.setImportTime(rs.getString("import_time"));
	            	localConcernPerson.setBdEndtime(rs.getString("bd_endtime"));
	            	localConcernPerson.setCxSign(rs.getString("cx_sign"));
				}
				localConcernPersons.add(localConcernPerson);

			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        int totalpage = 0;
        if(count%size==0)
        {
        	totalpage=count/size;
        }else{
        	totalpage=(count/size)+1;
        }
		pageHelper.setPageNo(pageno);
		pageHelper.setPageSize(size);
		pageHelper.setResult(localConcernPersons);
		pageHelper.setTotalPage(totalpage);
		pageHelper.setTotal(count);

		return pageHelper;
		
	}
	
	public ResultMsg update(String id,String importNo,String importName,String currentUserNo,String currentUserName)
	{
		ResultMsg msg = null ;
		if(importNo.equals(currentUserNo)&&importName.equals(currentUserName))
		{
		
		String sql ="update local_concern_persons set  cx_sign = '1' where Id= '"+id+"'";
		int rs = pageInquire.excuteUpdate(sql);
				if(rs==1)
				{
					msg= msg.success("更新成功");
				}else if(rs==0)
				{
					msg = msg.error("更新失败");
				}
		}
		return msg;
	}
	
	  @Transactional
	public ResultMsg updateReset(String id,String importNo,String importName,String currentUserNo,String currentUserName)
	{
		ResultMsg msg = null ;
		if(importNo.equals(currentUserNo)&&importName.equals(currentUserName))
		{
		String sql ="update local_concern_persons set  cx_sign = '0' where Id= '"+id+"'";
		int rs = pageInquire.excuteUpdate(sql);
				if(rs==1)
				{
					msg= msg.success("更新成功");
				}else if(rs==0)
				{
					msg = msg.error("更新失败");
				}
		}
		
		return msg;
	}
	     
	   /* @Transactional
		public ResultMsg updatePerson(String id,String name,String idcardNo,String sex,String national,String hjdqPlace,String hjdqAddress,String xzPlace,String xzAddress,String lgPlace,String lgPerson,String reason,
					                    String dealRequest,String bdEndtime,String dataType){
			ResultMsg msg = null ;
			String sql ="update local_concern_persons set name='"+name+"' , idcard_no='"+idcardNo+"' , sex='"+sex+"' , national='"+national+"' , hjdq_place='"+hjdqPlace+"' , hjdq_address='"+hjdqAddress+"' , xz_place='"+xzPlace+"' , xz_address='"+xzAddress+"' "
	   		+ ", lg_place='"+lgPlace+"' , lg_person='"+lgPerson+"' , reason='"+reason+"' , deal_request='"+dealRequest+"' , bd_endtime='"+bdEndtime+"' , data_type='"+dataType+"' where Id='"+id+"'";
			System.out.println("==========sql:"+sql);
			int rs = pageInquire.excuteUpdate(sql);	
			if(rs==1)
				{
					msg= msg.success("更新成功");
				}else if(rs==0)
				{
					msg = msg.error("更新失败");
				}
				
				return msg;
			}*/
	  
	    @Transactional
		public ResultMsg updatePerson(String id,String name,String idcardNo,String sex,String national,String hjdqPlace,String hjdqAddress,String xzPlace,String xzAddress,String lgPlace,String lgPerson,String reason,
					                    String dealRequest,String bdEndtime,String dataType){
			ResultMsg msg = null ;
			int count = localPersonCrud.updateLocalPerson(id, name, idcardNo, sex, national, hjdqPlace, hjdqAddress, xzPlace, xzAddress, lgPlace, lgPerson, reason, dealRequest,bdEndtime,dataType);
			if(count==1)
				{
					msg= msg.success("更新成功");
				}else if(count==0)
				{
					msg = msg.error("更新失败");
				}
				
				return msg;
			}

	/**
	 * 
	 * @param idArry
	 * @param currentUserNo
	 * @param cxSign
	 *            0 默认 1撤销
	 * @return
	 */
	@Transactional
	public ResultMsg batchUpdateReset(LocalPersonVo localPersonVo) {
		ResultMsg msg = null;
		String ids = "";
		for (String id : localPersonVo.getIds()) {
			ids += "'" + id + "',";
		}
		ids = ids.substring(0, ids.length() - 1);

		String sql = "select COUNT(*) c from local_concern_persons where import_no <> '"
				+ localPersonVo.getCurrentUserNo()
				+ "' and id in (" + ids + ") ";
		Log.debug(sql);
		ResultSet result = pageInquire.findPage(sql);
		int count = 0;
		try {
			if (result.next()) {
				count = Integer.parseInt(result.getString("c"));
			}
			if (count > 0) {
				Log.debug("只能撤销当前登录人 导入的数据");
				msg = ResultMsg.error("只能撤销当前登录人 导入的数据");
				return msg;
			}
			// 1撤销 0默认
			String updateSql = "update local_concern_persons set cx_sign = '" + localPersonVo.getCxSign()
					+ "' WHERE id in (" + ids + ") ";
			int rs = pageInquire.excuteUpdate(updateSql);
			if (rs > 0) {
				msg = ResultMsg.success("更新成功");
			} else if (rs == 0) {
				msg = ResultMsg.error("更新失败");
			}

			return msg;

		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return msg;
	}

	@Transactional
	public ResultMsg batchUpdateBdTime(LocalPersonVo localPersonVo) {
		ResultMsg msg = null;
		String ids = "";
		for (String id : localPersonVo.getIds()) {
			ids += "'" + id + "',";
		}
		ids = ids.substring(0, ids.length() - 1);

		String sql = "select COUNT(*) c from local_concern_persons where import_no <> '"
				+ localPersonVo.getCurrentUserNo()
				+ "' and id in (" + ids + ") ";
		Log.debug(sql);
		ResultSet result = pageInquire.findPage(sql);
		int count = 0;
		try {
			if (result.next()) {
				count = Integer.parseInt(result.getString("c"));
			}
			if (count > 0) {
				Log.debug("只能修改当前登录人 导入的数据");
				msg = ResultMsg.error("只能修改当前登录人 导入的数据");
				return msg;
			}
			String updateSql = "update local_concern_persons set bd_endtime = '" + localPersonVo.getBdDndtime()
					+ "' WHERE id in (" + ids
					+ ") ";
			int rs = pageInquire.excuteUpdate(updateSql);
			if (rs > 0) {
				msg = ResultMsg.success("更新成功");
			} else if (rs == 0) {
				msg = ResultMsg.error("更新失败");
			}

			return msg;

		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return msg;
	}

}
