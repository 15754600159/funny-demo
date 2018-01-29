package com.minginglamp.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.mortbay.log.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;
import com.minginglamp.common.PageHelper;
import com.minginglamp.common.PageInquire;
import com.minginglamp.crud.SfLocalPersonCrud;
import com.minginglamp.model.SfLocalPerson;
import com.minginglamp.utils.ResultMsg;
import com.minginglamp.vo.LocalPersonVo;

@Service
public class SfLocalPersonService {

	@Autowired
	SfLocalPersonCrud sfLocalPersonCrud;
	@Autowired
	PageInquire pageInquire;
	@Autowired
	private DictionaryService dictionaryService;
	
	@Autowired
	private ImportantPersonCategoryService importantPersonCategoryService;
	@Transactional
	public SfLocalPerson save(SfLocalPerson sfLocalPerson) {
		return sfLocalPersonCrud.save(sfLocalPerson);

	}
	
	 public List<String> findReason(String dataType)
	    {
		  String sql ="select DISTINCT  f_ssyj from sf_v_zdgk_zdry_jk_1500 where f_ssyj <> '' and f_ssyj is not null";
			if(dataType!=null && !"".equals(dataType))
			{
		   sql = "select DISTINCT f_ssyj from sf_v_zdgk_zdry_jk_1500 where f_ssyj <> '' "
		 		+ "and f_ssyj is not null and f_data_type = '"+dataType+"'";
			}
			System.out.println(sql);
			ResultSet rs = pageInquire.findPage(sql);
			List<String> reasons = new ArrayList<String>();
			try {
				while (rs.next()) {
					
					String  reason = rs.getString("f_ssyj") ;
					reasons.add(reason);	
				}
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		     return reasons;
	    }
	
	 public List<String> findDataType()
	    {
		  String sql ="select DISTINCT  f_data_type from sf_v_zdgk_zdry_jk_1500 "
		  		+ "where f_data_type <> '' and f_data_type is not null";
			System.out.println(sql);
			ResultSet rs = pageInquire.findPage(sql);
			List<String> dataTypes = new ArrayList<String>();
			try {
				while (rs.next()) {
					
					String  dataType = rs.getString("f_data_type") ;
					dataTypes.add(dataType);	
				}
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		     return dataTypes;
	    }
	 
		@Transactional
		public int count(SfLocalPerson sfLocalPerson) {
			String sqlc = " select count(*) c from sf_v_zdgk_zdry_jk_1500 where f_gmsfhm = '"
					+ sfLocalPerson.getFgmsfhm() + "' and f_inputno	 ='" + sfLocalPerson.getFinputno()
					+ "' and f_data_type='" + sfLocalPerson.getFdataType() + "'";
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
		
		
	public PageHelper findPage(int pageno, int size, String name, String idcardNo,String national,
			String reason, String beginTime, String endTime, String dataType,String importName, String currentUserNo) {
		JsonNode nationalJsonNode = dictionaryService.getNational();
		Map<String,String> categoryHjdqhMap = this.importantPersonCategoryService.listHjdqhCategoryMap();
		Map<String,String> listUcodeMap = this.importantPersonCategoryService.listUcodeMap();
		int count = 0;
		PageHelper pageHelper = new PageHelper();
		String sqlw = "";

		if (name != null && !"".equals(name)) {
			sqlw = sqlw + " and f_xm like '%" + name + "%'";
		}

		if (idcardNo != null && !"".equals(idcardNo)) {
			sqlw = sqlw + " and f_gmsfhm like '%" + idcardNo + "%'";
		}
		
		if (dataType != null && !"".equals(dataType)) {
			sqlw = sqlw + " and f_data_type like '%" + dataType + "%'";
		}

		if (national != null && !"".equals(national)) {
			sqlw = sqlw + " and f_mzdm = '" + national + "'";
		}

		if (reason != null && !"".equals(reason)) {
			sqlw = sqlw + " and f_ssyj like '%" + reason + "%'";
		}

		if (beginTime != null && !"".equals(beginTime) && endTime != null && !"".equals(endTime)) {
			sqlw = sqlw + " and sysdate between '" + beginTime + "' and '" + endTime + "'";
		}

		if (importName != null && !"".equals(importName)) {
			sqlw = sqlw + " and f_inputperson like '%" + importName + "%'";
		}


		String sqlc = "";
		if("000000".equals(currentUserNo))
		{
			sqlc = " select count(*) c from sf_v_zdgk_zdry_jk_1500 where 1=1 " + sqlw;
		}else{
		sqlc = " select count(*) c from sf_v_zdgk_zdry_jk_1500 where 1=1 " + sqlw
				+ " and (f_zxbs='0' or (f_zxbs='1' and f_inputno = '" + currentUserNo + "'))";
		}
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

		/*
		 * String sql = " select * from local_concern_persons where 1=1 " + sqlw
		 * + " limit " + (pageno - 1) * size + " , " + size;
		 */
		String sql = "";
        if("000000".equals(currentUserNo))
        {
        	 sql = " select * from sf_v_zdgk_zdry_jk_1500 where 1=1  " + sqlw
     				+ " limit "+ (pageno - 1) * size + " , " + size;
        	
        }else
        {
		 sql = " select * from sf_v_zdgk_zdry_jk_1500 where 1=1  " + sqlw
				+ " and (f_zxbs='0' or (f_zxbs='1' and f_inputno = '" + currentUserNo + "')) limit "
				+ (pageno - 1) * size + " , " + size;
        }
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		List<SfLocalPerson> sfLocalPersons = new ArrayList<SfLocalPerson>();
		SfLocalPerson sfLocalPerson = null;
		try {
			//ResultSetMetaData md = rs.getMetaData();
			//int columnCount = md.getColumnCount();
			while (rs.next()) {
			//	for (int i = 1; i <= columnCount; i++) {

					sfLocalPerson = new SfLocalPerson();
					sfLocalPerson.setId(Integer.parseInt(rs.getString("id")));
					sfLocalPerson.setFid(rs.getString("f_id"));
					sfLocalPerson.setFzdrybm(rs.getString("f_zdrybm"));
					sfLocalPerson.setFxm(rs.getString("f_xm"));
					sfLocalPerson.setFgmsfhm(rs.getString("f_gmsfhm"));
					//sfLocalPerson.setFxbdm(rs.getString("f_xbdm"));
					String sex = rs.getString("f_xbdm");
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
					sfLocalPerson.setFxbdm(sex);
					//sfLocalPerson.setFmzdm(rs.getString("f_mzdm"));
					String nation = rs.getString("f_mzdm");
					if (nation != null && !nation.equals("")) {
						if (nationalJsonNode.get(nation) != null) {
							nation = nationalJsonNode.get(nation).asText();
						}
						sfLocalPerson.setFmzdm(nation);
					}
					sfLocalPerson.setFcsrq(rs.getString("f_csrq"));
					//sfLocalPerson.setFhjdzSsxqdm(rs.getString("f_hjdz_ssxqdm"));
					String hjddz = rs.getString("f_hjdz_ssxqdm");
					if(hjddz!=null && !"".equals(hjddz))
					{
						if(categoryHjdqhMap.containsKey(hjddz))
						{
							hjddz = categoryHjdqhMap.get(hjddz);
						}else
						{
							 hjddz = rs.getString("f_hjdz_ssxqdm");
						}
					}
					sfLocalPerson.setFhjdzSsxqdm(hjddz);
					sfLocalPerson.setFhjdzQhnxxdz(rs.getString("f_hjdz_qhnxxdz"));
					sfLocalPerson.setFglbf(rs.getString("f_glbf"));
					sfLocalPerson.setFlgly(rs.getString("f_lgly"));
					sfLocalPerson.setFssyj(rs.getString("f_ssyj"));
					sfLocalPerson.setFgkys(rs.getString("f_gkys"));
					sfLocalPerson.setFjjzk(rs.getString("f_jjzk"));
					sfLocalPerson.setFgldw(rs.getString("f_gldw"));
				//	sfLocalPerson.setFlgdw(rs.getString("f_lgdw"));
					String flgdw = listUcodeMap.get(rs.getString("f_lgdw"));
					sfLocalPerson.setFlgdw(flgdw);
					sfLocalPerson.setFsalx(rs.getString("f_salx"));
					sfLocalPerson.setFzdrylx(rs.getString("f_zdrylx"));
					sfLocalPerson.setFlgr(rs.getString("f_lgr"));
					sfLocalPerson.setFlgrlxfs(rs.getString("f_lgrlxfs"));
					sfLocalPerson.setFlgrq(rs.getString("f_lgrq"));
					sfLocalPerson.setFmemo(rs.getString("f_memo"));
					sfLocalPerson.setFzxbs(rs.getString("f_zxbs"));
					sfLocalPerson.setFzxyy(rs.getString("f_zxyy"));
					sfLocalPerson.setFzxsj(rs.getString("f_zxsj"));
					sfLocalPerson.setFgkzt(rs.getString("f_gkzt"));
					sfLocalPerson.setFlinkway(rs.getString("f_linkway"));
					sfLocalPerson.setFdeadline(rs.getString("f_deadline"));
				//	sfLocalPerson.setFdealtype();
					String fdealtype = rs.getString("f_dealtype");
					if("1".equals(fdealtype))
					{
					//	sfLocalPerson.setd();
						sfLocalPerson.setFdealtype("按主办人报警");
					}else if("2".equals(fdealtype))
					{
						sfLocalPerson.setFdealtype("按数据归属报警");
					}else
					{
						sfLocalPerson.setFdealtype("未知");
					}
					sfLocalPerson.setFalarmmethod(rs.getString("f_alarmmethod"));
					sfLocalPerson.setFinputno(rs.getString("f_inputno"));
					sfLocalPerson.setFinputperson(rs.getString("f_inputperson"));
					sfLocalPerson.setFinputtime(rs.getString("f_inputtime"));
					sfLocalPerson.setFinputorgid(rs.getString("f_inputorgid"));
					sfLocalPerson.setFopeperson(rs.getString("f_opeperson"));
					sfLocalPerson.setFopetime(rs.getString("f_opetime"));
					sfLocalPerson.setFaffectregion(rs.getString("f_affectregion"));
					sfLocalPerson.setFffrygz(rs.getString("f_ffrygz"));
					sfLocalPerson.setFlxfs(rs.getString("f_lxfs"));
					sfLocalPerson.setFxzdq(rs.getString("f_xzdq"));
					sfLocalPerson.setFxzdz(rs.getString("f_xzdz"));
					sfLocalPerson.setFbusType(rs.getString("f_bus_type"));
					sfLocalPerson.setSysdate(rs.getString("sysdate"));
					sfLocalPerson.setFdataType(rs.getString("f_data_type"));
			//	}
				sfLocalPersons.add(sfLocalPerson);

			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		int totalpage = 0;
		if (count % size == 0) {
			totalpage = count / size;
		} else {
			totalpage = (count / size) + 1;
		}
		pageHelper.setPageNo(pageno);
		pageHelper.setPageSize(size);
		pageHelper.setResult(sfLocalPersons);
		pageHelper.setTotalPage(totalpage);
		pageHelper.setTotal(count);

		return pageHelper;

	}
	
	@Transactional
	public ResultMsg update(String id,String importNo,String importName,String currentUserNo,String currentUserName)
	{
		ResultMsg msg = null ;
		String sql ="update sf_v_zdgk_zdry_jk_1500 set  f_zxbs = '1' where id= '"+id+"'";
		System.out.println(sql);
		int rs = pageInquire.excuteUpdate(sql);
				if(rs==1)
				{
					msg= msg.success("更新成功");
				}else if(rs==0)
				{
					msg = msg.error("更新失败");
				}
		return msg;
	}
	
	  @Transactional
	public ResultMsg updateReset(String id,String importNo,String importName,String currentUserNo,String currentUserName)
	{
		ResultMsg msg = null ;
		String sql ="update sf_v_zdgk_zdry_jk_1500 set  f_zxbs = '0' where id= '"+id+"'";
		int rs = pageInquire.excuteUpdate(sql);
				if(rs==1)
				{
					msg= msg.success("更新成功");
				}else if(rs==0)
				{
					msg = msg.error("更新失败");
				}
		
		return msg;
	}
	  
	  
	        @Transactional
			public ResultMsg updatePerson(String id, String name, String idcardNo,String sex, String national,String hjdqPlace, 
					String hjdqAddress,String xzPlace,String xzAddress,String lgPlace, String lgPerson,String reason,String dealRequest,String bdEndtime,String dataType){
				ResultMsg msg = null ;
				int count = sfLocalPersonCrud.updateLocalPerson(id, name, idcardNo, sex, national, hjdqPlace, hjdqAddress, xzPlace, xzAddress, lgPlace, lgPerson, reason, dealRequest,bdEndtime,dataType);
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
	    			ids +=  id + ",";
	    		}
	    		ids = ids.substring(0, ids.length() - 1);

	    		/*String sql = "select COUNT(*) c from sf_v_zdgk_zdry_jk_1500 where f_inputNo <> '"
	    				+ localPersonVo.getCurrentUserNo()
	    				+ "' and f_id in (" + ids + ") ";
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
	    			}*/
	    			// 1撤销 0默认
	    			String updateSql = "update sf_v_zdgk_zdry_jk_1500 set f_zxbs = '" + localPersonVo.getCxSign()
	    					+ "' WHERE id in (" + ids + ") ";
	    			System.out.println("-----------"+updateSql);
	    			Log.info("修改1撤销 0默认:{}", updateSql);
	    			int rs = pageInquire.excuteUpdate(updateSql);
	    			if (rs > 0) {
	    				msg = ResultMsg.success("更新成功");
	    			} else if (rs == 0) {
	    				msg = ResultMsg.error("更新失败");
	    			}

	    			return msg;
/*
	    		} catch (NumberFormatException e) {
	    			// TODO Auto-generated catch block
	    			e.printStackTrace();
	    		} catch (SQLException e) {
	    			// TODO Auto-generated catch block
	    			e.printStackTrace();
	    		}

	    		return msg;*/
	    	}

	    	@Transactional
	    	public ResultMsg batchUpdateBdTime(LocalPersonVo localPersonVo) {
	    		ResultMsg msg = null;
	    		String ids = "";
	    		for (String id : localPersonVo.getIds()) {
	    			ids += "'" + id + "',";
	    		}
	    		ids = ids.substring(0, ids.length() - 1);

	    		/*String sql = "select COUNT(*) c from sf_v_zdgk_zdry_jk_1500 where f_inputNo <> '"
	    				+ localPersonVo.getCurrentUserNo()
	    				+ "' and f_id in (" + ids + ") ";
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
	    			}*/
	    			String updateSql = "update sf_v_zdgk_zdry_jk_1500 set f_deadline = '" + localPersonVo.getBdDndtime()
	    					+ "' WHERE id in (" + ids
	    					+ ") ";
	    			Log.info("修改修改时间:{}", updateSql);
	    			int rs = pageInquire.excuteUpdate(updateSql);
	    			if (rs > 0) {
	    				msg = ResultMsg.success("更新成功");
	    			} else if (rs == 0) {
	    				msg = ResultMsg.error("更新失败");
	    			}

	    			return msg;
/*
	    		} catch (NumberFormatException e) {
	    			// TODO Auto-generated catch block
	    			e.printStackTrace();
	    		} catch (SQLException e) {
	    			// TODO Auto-generated catch block
	    			e.printStackTrace();
	    		}

	    		return msg;*/
	    	}

}
