package com.minginglamp.action;


import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.minginglamp.common.PageH;
import com.minginglamp.common.PageHelper;
import com.minginglamp.model.PersonCheck;
import com.minginglamp.model.PersonCheckLog;
import com.minginglamp.model.PersonTagInfo;
import com.minginglamp.service.PersonCheckService;
import com.minginglamp.utils.ExcelOperations;
import com.minginglamp.utils.ResultMsg;
import com.minginglamp.vo.PersonCarUcodeVo;
import com.minginglamp.vo.PersonCarVo;
import com.minginglamp.vo.PersonCheckVo;
import com.minginglamp.vo.PersonHjdTjVo;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/personcheck/info")
@Slf4j
public class PersonCheckAction {

	private static final String TIME_ILLEGAR_MSG = "startTime or endTime format error.need yyyy-MM-dd HH:mm:ss format.";

	@Autowired
	private PersonCheckService personCheckService;
	
	@Autowired
	private ResourceLoader resourceLoader;
	
	 @Value("${xls.personcheck}")
	 private String template;
	 
	@Value("${xls.personCompare}")
	private String compareTemplate;

	 @Value("${xls.personInfoFind}")
	 private String personInfoTemplate;

	@Value("${xls.domicileCount}")
	private String domicileCountTemplate;
	
	@Value("${xls.ryssbd}")
	private String ryssbdTemplate;

	/**
	 * 条件查询
	 * @param request
	 * @param response
	 * @return
	 */
/*	 @RequestMapping(value = "overview", method = RequestMethod.POST)
	public PageHelper overview(HttpServletRequest request,HttpServletResponse response) {
		    Map<String, String[]> map = request.getParameterMap();
	    String test = request.getParameter("name");
		    
	        PageHelper pageHelper = new PageHelper();
     //    String mm= map.get("key").toString(); 
	        Page<PersonCheck> p = personCheckService.overview(map);
	        pageHelper.setResult(p.getContent());
	        pageHelper.setTotalPage(p.getTotalPages());
	        pageHelper.setTotal(p.getTotalElements());
	        return pageHelper;
	    }*/
	
	/**
	 * 人员实时比对查询
	 * @param startTime
	 * @param endTime
	 * @param sfzh
	 * @param names
	 * @param source
	 * @param ucode
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
	  @RequestMapping(value = "/findpersonchecklog",method = RequestMethod.GET)
	    public ResultMsg findPersonCheckLog(@RequestParam("startTime")String startTime, 
	    		@RequestParam("endTime")String endTime, 
	    		@RequestParam("sfzh")String sfzh, 
	    		@RequestParam("names")String names, 
	    		@RequestParam("source")String source,
	    		@RequestParam("ucode")String ucode,
	    		@RequestParam("tags")String tags,
	    		@RequestParam("tags2")String tags2,
	    		@RequestParam("policename")String policename,
	    		@RequestParam("policeno")String policeno,
	    		@RequestParam("checkaddress")String checkaddress,
	    		@RequestParam("personType")String personType,
	    		@RequestParam("personif")String personif,//
	    		@RequestParam("birthplace")String birthplace,
	    		@RequestParam(value="page", required=false) Integer page, 
				@RequestParam(value = "pageSize", required = false) Integer pageSize) {
	    	
		   //核录时间条件判断
	    	if ((startTime!=null&&!"".equals(startTime))&&(!validateTime(startTime) || !validateTime(endTime))) {
				return ResultMsg.error(TIME_ILLEGAR_MSG);
			} 
		
			//核录单位条件判断
			String ucode1 = null;
			if("".equals(ucode))
			{
				ucode = "%%";
			}else {
				log.info("ucode:::" + ucode);
				String[] codes = ucode.split("-");
				if (codes.length > 1) {
					String code = codes[0].trim().replaceAll("0*$", "");
			    		ucode1 = code+"%";
			    		ucode = "%"+codes[1].trim()+"%";
				}else
				{
					ucode = "%"+ucode.trim()+"%";
				}
			}
			
			PageH pageOfData = personCheckService.findPersonCheckLog(startTime, endTime,sfzh,names,source,ucode,ucode1,tags,tags2,policename,policeno,checkaddress,personType,personif,birthplace,
					page == null ? 0 : page, pageSize == null ? 10 : pageSize);
			return ResultMsg.success(pageOfData);
		}

	  /**
	   * 人员实时比对导出
	   * @param startTime
	   * @param endTime
	   * @param sfzh
	   * @param names
	   * @param source
	   * @param ucode
	   * @param tags
	   * @param tags2
	   * @param policename
	   * @param policeno
	   * @param checkaddress
	   * @param personType
	   * @param personif
	   * @param page
	   * @param pageSize
	   * @param response
	   * @throws Exception
	   */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/exportPersonCheckLog", method = RequestMethod.GET)
	public void exportExcel(String startTime, String endTime, String sfzh, String names, String source, String ucode,
			String tags, String tags2, String policename, String policeno, String checkaddress, String personType,
			String personif,String birthplace, Integer page, Integer pageSize, HttpServletResponse response) throws Exception {
		response.setHeader("Content-Disposition",
				"attachment; filename=" + UUID.randomUUID().toString().replace("-", "").toUpperCase() + ".xls");
		response.setContentType("application/vnd.ms-excel; charset=utf-8");
	
		//核录单位条件判断
		String ucode1 = null;
		if("".equals(ucode))
		{
			ucode = "%%";
		}else {
			log.info("ucode:::" + ucode);
			String[] codes = ucode.split("-");
			if (codes.length > 1) {
				String code = codes[0].trim().replaceAll("0*$", "");
		    		ucode1 = code+"%";
		    		ucode = "%"+codes[1].trim()+"%";
			}else
			{
				ucode = "%"+ucode.trim()+"%";
			}
		}

		OutputStream out = response.getOutputStream();
		ExcelOperations
				.writePersonCheckLogExcel(ryssbdTemplate,
						(List<PersonCheckLog>) personCheckService.findPersonCheckLog(startTime, endTime,sfzh,names,source,ucode,ucode1,tags,tags2,policename,policeno,checkaddress,personType,personif,birthplace,
								page == null ? 0 : page, pageSize == null ? 10000 : pageSize).getContent())
				.write(out);
		out.flush();
		out.close();
	}

	/**
	 * 分层统计接口
	 * 
	 * @return
	 */
	@RequestMapping(value = "/tjUcode", method = RequestMethod.GET)
	public List<PersonCarUcodeVo> tjUcode(String checkAddress, String beginTime, String endTime) {
		return personCheckService.tjUcode(checkAddress, beginTime, endTime);

	}
	
	@RequestMapping(value = "/tjUcodeCompare", method = RequestMethod.GET)
	public List<PersonCarUcodeVo> tjUcodeCompare(String checkAddress, String beginTime, String endTime) {
		return personCheckService.tjUcodeCompare(checkAddress, beginTime, endTime);

	}
		 
	 @RequestMapping(value = "findTag/{idcardNo}/{ryhcTag}", method = RequestMethod.GET)
		public List<PersonTagInfo> findByTag( @PathVariable String  idcardNo,
				                       @PathVariable String  ryhcTag) {
		 
		 return personCheckService.findBy(idcardNo,ryhcTag);
		    }
	 
	 
	 /**
	  * 	name  被核录人姓名
			idcardNo  身份证号
			national 民族
			beginTime  核录时间起
			endTime    核录时间止
			checkAddress   核录单位
			addressDetails 户籍地区划
			personneltype  人员类别 
			policeName     核录人
			checkPlace     核录地点
			checkReason  检查来源
	  * @param request
	  * @param response
	  * @return
	  */
	 @RequestMapping(value = "findpage", method = RequestMethod.POST)
		public PageHelper findPage(@RequestParam(required = false) String name,
				@RequestParam(required = false) String idcardNo,
				@RequestParam(required = false) String pcode,
				@RequestParam(required = false) String national,
				@RequestParam(required = false) String beginTime,
				@RequestParam(required = false) String endTime,
				@RequestParam(required = false) String ucode,
				@RequestParam(required = false) String addressDetails,
				@RequestParam(required = false) String personneltype,
				@RequestParam(required = false) String policeName,
				@RequestParam(required = false) String checkPlace,
				@RequestParam(required = false) String checkReason,
			@RequestParam(required = false) String checkAddress, @RequestParam(required = false) String checkSource,
				@RequestParam(required = false)  int pageno,
				@RequestParam(required = false) int size) {
		 	
	   return personCheckService.findPage(name, idcardNo, pcode,national, beginTime, endTime, ucode,
				addressDetails, personneltype, policeName, checkAddress, checkReason, checkSource, pageno, size);
		    }

	/**
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 *             人员核录信息查询： name 被核录人姓名 idcardNo 身份证号 national 民族 beginTime
	 *             核录时间起 endTime 核录时间止 ucode 核录单位 addressDetails 户籍地区划
	 *             personneltype 人员类别 policeName 核录人 checkPlace 核录地点 checkReason
	 *             检查来源
	 * 
	 */
	/*@RequestMapping(value = "/exportperson", method = RequestMethod.GET)
	public void exportExcel(String name, String idcardNo, String pcode, String national, String beginTime,
			String endTime,String ucode, String addressDetails, String personneltype, String policeName, String checkPlace,
			String checkReason, String checkAddress, String checkSource, HttpServletResponse response)
			throws Exception {
		response.setHeader("Content-Disposition",
				"attachment; filename=" + UUID.randomUUID().toString().replace("-", "").toUpperCase() + ".xls");
		response.setContentType("application/vnd.ms-excel; charset=utf-8");

		OutputStream out = response.getOutputStream();
		ExcelOperations.writePersonExcel(template,
				personCheckService.findByParamper(name, idcardNo, pcode, national,
						beginTime, endTime, ucode, addressDetails, personneltype, policeName, checkAddress, checkReason,
						checkSource))
				.write(out);
		out.flush();
		out.close();
	}*/
	
	@RequestMapping(value = "/export", method = RequestMethod.GET)
	public void exportExcel(String name, String idcardNo,String pcode,String national,String beginTime,String endTime, String ucode,
			String addressDetails,String personneltype,String policeName,String checkAddress,String checkReason, String checkSource, int pageno,int size, HttpServletResponse response)
			throws Exception {
		response.setHeader("Content-Disposition",
				"attachment; filename=" + UUID.randomUUID().toString().replace("-", "").toUpperCase() + ".xls");
		response.setContentType("application/vnd.ms-excel; charset=utf-8");

		OutputStream out = response.getOutputStream();
		ExcelOperations.writePersonExcel(template,
				personCheckService.findPage(name, idcardNo, pcode,national, beginTime, endTime, ucode,
						addressDetails, personneltype, policeName, checkAddress, checkReason, checkSource, pageno, size))
				.write(out);
		out.flush();
		out.close();
	}

	 /**
	  * 
	  * @param name
	  * @param idcardNo
	  * @param national
	  * @param beginTime
	  * @param endTime
	  * @param ucode
	  * @param addressDetails
	  * @param personneltype
	  * @param policeName
	  * @param checkPlace
	  * @param checkReason
	  * @param checkAddress
	  * @param ryhcTag
	  * @param pageno
	  * @param size
	  * @return
	  */
	 @RequestMapping(value = "findpageCompare", method = RequestMethod.POST)
		public PageHelper findPageCompare(@RequestParam(required = false) String name,
						@RequestParam(required = false) String idcardNo,
						@RequestParam(required = false) String pcode,
						@RequestParam(required = false) String national,
						@RequestParam(required = false) String beginTime,
						@RequestParam(required = false) String endTime,
						@RequestParam(required = false) String ucode,
						@RequestParam(required = false) String addressDetails,
						@RequestParam(required = false) String personneltype,
						@RequestParam(required = false) String policeName,
						@RequestParam(required = false) String checkPlace,
						@RequestParam(required = false) String checkReason,
						@RequestParam(required = false)  String checkAddress,
						@RequestParam(required = false)  String ryhcTag,
						@RequestParam(required = false)  String ryhcTag2,
						@RequestParam(required = false)  String personif,
						@RequestParam(required = false)  String checkSource,
						@RequestParam(required = false)  int pageno,
						@RequestParam(required = false) int size) {
		 
		   return personCheckService.findPageCompare(name, idcardNo,pcode, national, beginTime, endTime, ucode,
					 addressDetails, personneltype, policeName, checkPlace, checkReason,checkAddress,ryhcTag,ryhcTag2,personif,checkSource,pageno,size);
		    }
	 
	/**
	 * 人员比对预警导出
	 * 
	 * @param name
	 * @param idcardNo
	 * @param pcode
	 * @param national
	 * @param beginTime
	 * @param endTime
	 * @param ucode
	 * @param addressDetails
	 * @param personneltype
	 * @param policeName
	 * @param checkPlace
	 * @param checkReason
	 * @param checkAddress
	 * @param ryhcTag
	 * @param response
	 * @throws Exception
	 */

	@RequestMapping(value = "/exportCompare", method = RequestMethod.GET)
	public void exportExcelCompare(String name, String idcardNo, String pcode, String national, String beginTime,
			String endTime, String ucode, String addressDetails, String personneltype, String policeName,
			String checkPlace, String checkReason, String checkAddress, String ryhcTag, String ryhcTag2,String personif, String checkSource,int pageno,int size,HttpServletResponse response)
			throws Exception {
		response.setHeader("Content-Disposition",
				"attachment; filename=" + UUID.randomUUID().toString().replace("-", "").toUpperCase() + ".xls");
		response.setContentType("application/vnd.ms-excel; charset=utf-8");
		OutputStream out = response.getOutputStream();
		ExcelOperations
				.writeComparePersonExcel(compareTemplate,
						personCheckService.findPageCompare(name, idcardNo,pcode, national, beginTime, endTime, ucode,
								 addressDetails, personneltype, policeName, checkPlace, checkReason,checkAddress,ryhcTag,ryhcTag2,personif,checkSource,pageno,size))
				.write(out);
		out.flush();
		out.close();
	}

	 @RequestMapping(value = "findByIdcardNo/{idcardNo}", method = RequestMethod.GET)
	 public List<PersonCheck> findByIdcardNo(@PathVariable String  idcardNo)
	 {
		return personCheckService.findByIdcardNosql(idcardNo);
		 
	 }
	 
	 @RequestMapping(value = "findBySfzh/{idcardNo}", method = RequestMethod.GET)
	 public List<PersonCheckLog> findBySfzh(@PathVariable String  idcardNo)
	 {
		return personCheckService.findBySfzh(idcardNo);
		 
	 }
	 @RequestMapping(value = "findpersoncheck", method = RequestMethod.POST)
		public List<PersonCheck> findPersonCheck(HttpServletRequest request,HttpServletResponse response) {
		 Map<String, String[]> map = request.getParameterMap();
		 
		   return personCheckService.findPersonCheck(map);
		    }
	 
	 /**
	  * beginTime  核录时间起
		endTime    核录时间止
		ucode   核录单位
		policeName     核录人
	  * @param request
	  * @param response
	  * @return
	  */
	 @RequestMapping(value = "infofind", method = RequestMethod.POST)
		public List<List<PersonCarVo>> Infofind(String beginTime,String endTime,String ucode,String policeName, String domicile, String domicileChinese) {
		// Map<String, String[]> map = request.getParameterMap();
		 
		   return personCheckService.Infofind( beginTime, endTime, ucode, policeName, domicile, domicileChinese);
		    }
	 
	 @RequestMapping(value = "infofindByHjd", method = RequestMethod.POST)
		public List<PersonHjdTjVo> InfofindByHjd(String beginTime,String endTime,String ucode,String policeName, String domicile, String domicileChinese) {
		// Map<String, String[]> map = request.getParameterMap();
		 
		   return personCheckService.InfofindByHjd(beginTime, endTime, ucode, policeName, domicile, domicileChinese);
		    }
	 
	 /**
	  * beginTime  核录时间起
		endTime    核录时间止
	  * @param request
	  * @param response
	  * @return
	  */
	@RequestMapping(value = "domicileCount", method = RequestMethod.GET)
	public List<PersonCarVo> domicileCount(String beginTime, String endTime) {
		return personCheckService.domicileCount(beginTime, endTime);
	}

	/**
	 * beginTime 核录时间起 endTime 核录时间止
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "domicileCountByProvince", method = RequestMethod.GET)
	public List<PersonCarVo> domicileCountByProvince(String code, String beginTime, String endTime) {
		return personCheckService.domicileCountByProvince(code, beginTime, endTime);
	}

	/**
	 * beginTime 核录时间起 endTime 核录时间止
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "domicileCountByCity", method = RequestMethod.GET)
	public List<PersonCarVo> domicileCountByCity(String code, String beginTime, String endTime) {
		return personCheckService.domicileCountByCity(code, beginTime, endTime);
	}
	 
	 /**
	  * 保存
	  * @param request
	  * @param response
	  * @return
	  */
	 @RequestMapping(value = "/add",method = RequestMethod.POST)
	 @ResponseBody
	    public ResultMsg addPerson(@RequestBody PersonCheckVo personCheckVo){
	        try {
	        	
	        	PersonCheck personCheck =new PersonCheck();
	        	PersonCheckVo personCheckVo1 = new PersonCheckVo();
	        	personCheck = personCheckVo1.change(personCheckVo);
	        	
	            return ResultMsg.success(personCheckService.save(personCheck));
	        } catch (Exception e) {
	            return ResultMsg.error("login deny");
	        }
	    }
	 
	 
	 @RequestMapping(value = "/delete/{id}",method = RequestMethod.DELETE)
	    public ResultMsg delete(
//	            @ApiParam(required = true,name = "id",value = "任务id")
	            @PathVariable int id){
	        int result = 0;
	        try {
	        	result= personCheckService.deleteById(id);
	            if(result == 0){
	                return ResultMsg.error("未找到记录");
	            }else{
	                return ResultMsg.success("删除成功");
	            }
	        } catch (Exception e) {
	            return ResultMsg.error("login deny");
	        }
	 }
	 

	    @RequestMapping(value = "/check",method = RequestMethod.POST)
	    public ResultMsg check(
//	            @ApiParam(required = true,name = "file",value = "文件")
	            @RequestParam("file") MultipartFile file){
	        try {
	            List<String[]> lists = ExcelOperations.readRCExcelFile(file.getInputStream());
	           // List<String> list = null;
	            PersonCheck personCheck = null;
	            for(String[] st:lists)
	            {
	            		personCheck = new PersonCheck();
	            		personCheck.setPcode(st[0]);
	            		personCheck.setPoliceName(st[1]);
	            		personCheck.setPolicePhone(st[2]);
	            		personCheck.setUcode(st[3]);
	            		personCheck.setIdcardNo(st[4]);
	            		personCheck.setName(st[5]);
	            		personCheck.setSex(st[6]);
	            		personCheck.setNational(st[7]);
	            		personCheck.setAddressDetails(st[8]);
	            		personCheck.setDomicile(st[9]);
	            		personCheck.setPersonneltype(st[10]);
	            		personCheck.setCheckTime(st[11]);
	            		personCheck.setQueryType(st[12]);
	            		personCheck.setQueryPlace(st[13]);
	            		personCheck.setCheckAddress(st[14]);
	            		personCheck.setQgztry(st[15]);
	            		personCheck.setQgwffz(st[16]);
	            		personCheck.setQgxfd(st[17]);
	            		personCheck.setBdzdry(st[18]);
	            		personCheck.setCheckReason(st[19]);
	            		personCheck.setLocalFlag(st[20]);
	            		personCheck.setCheckLocation(st[21]);
	            		personCheck.setCheckPlace(st[22]);
	            		personCheck.setCheckFlag(st[23]);
	            		
	            		personCheckService.save(personCheck);
	            }
	            return ResultMsg.success("上传成功");
	        } catch (IOException e) {
	           // log.error("上传文件失败",e.getMessage());
	            return ResultMsg.error("文件上传失败");
	        }
	    }
	  	  

	    
	    /**
		  * beginTime  核录时间起
			endTime    核录时间止
			ucode   核录单位
			policeName     核录人
		  * @param request
		  * @param response
		  * @return
		  */
		 @RequestMapping(value = "exportInfofind", method = RequestMethod.GET)
		 public void infofindExport(String beginTime,String endTime,String ucode,String policeName, String domicile, String domicileChinese,
				 HttpServletResponse response) throws Exception  {
			 response.setHeader("Content-Disposition", "attachment; filename="+ UUID.randomUUID().toString().replace("-","").toUpperCase()+".xls");
		     response.setContentType("application/vnd.ms-excel; charset=utf-8") ;
		     OutputStream out = response.getOutputStream() ;

		     ExcelOperations.writePersonInfoFindExcel(personInfoTemplate,personCheckService.Infofind( beginTime, endTime, ucode, policeName, domicile, domicileChinese)).write(out);
		     out.flush();
		     out.close();
		 }

	/**
	 * beginTime 核录时间起 endTime 核录时间止 ucode 核录单位 policeName 核录人
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "exportDomicileCount", method = RequestMethod.GET)
	public void domicileCountExport(String beginTime, String endTime, HttpServletResponse response) throws Exception {
		response.setHeader("Content-Disposition",
				"attachment; filename=" + UUID.randomUUID().toString().replace("-", "").toUpperCase() + ".xls");
		response.setContentType("application/vnd.ms-excel; charset=utf-8");
		OutputStream out = response.getOutputStream();
		ExcelOperations
				.writeDomicileCountExcel(domicileCountTemplate, personCheckService.domicileCount(beginTime, endTime))
				.write(out);
		out.flush();
		out.close();
	}
	
	
	private boolean validateTime(String inputTime){
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	try {
			sdf.parse(inputTime);
		} catch (ParseException e) {
			log.error("time format error.", e);
			return false;
		}
    	return true;
    }
}
