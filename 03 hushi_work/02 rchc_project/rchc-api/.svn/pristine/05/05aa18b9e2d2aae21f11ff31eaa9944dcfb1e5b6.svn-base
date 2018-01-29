package com.minginglamp.action;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;
import com.minginglamp.common.PageH;
import com.minginglamp.common.PageHelper;
import com.minginglamp.model.CarCheck;
import com.minginglamp.model.PersonCheck;
import com.minginglamp.model.PlateCheckLog;
import com.minginglamp.model.PlateTagInfo;
import com.minginglamp.service.CarCheckService;
import com.minginglamp.service.DictionaryService;
import com.minginglamp.utils.ExcelOperations;
import com.minginglamp.utils.ResultMsg;
import com.minginglamp.vo.PersonCarUcodeVo;
import com.minginglamp.vo.PersonCarVo;

import lombok.extern.slf4j.Slf4j;

//@Api(value="车辆核查接口")
@RestController
@RequestMapping("/carcheck/info")
@Slf4j
public class CarCheckAction {
	
	private static final String TIME_ILLEGAR_MSG = "startTime or endTime format error.need yyyy-MM-dd HH:mm:ss format.";
	@Autowired
	private CarCheckService carCheckService; 
	@Autowired
	private ResourceLoader resourceLoader;
	
	@Value("${xls.carCompare}")
	private String compareTemplate;

	 @Value("${xls.carcheck}")
	 private String template;
	 
	 @Value("${xls.personInfoFind}")
	 private String personInfoTemplate;

	@Value("${xls.clssbd}")
	private String clssbdTemplate;
	
	@Autowired
	DictionaryService dictionaryService;

	/**
	 * @param request
	 * @param response
	 * @return
	 */
	/* @RequestMapping(value = "findpage", method = RequestMethod.POST)
		public PageHelper findPage(HttpServletRequest request,HttpServletResponse response) {
		 Map<String, String[]> map = request.getParameterMap();
		 
		   return carCheckService.findPage(map);
		    }*/
	
	
	 /**
	  * 
	  * @param request
	  * @param response
	  * @return
	  * carBrand   品牌种类
		plateNo   号牌号码
		ucode   核录单位
		beginTime  核录时间起
		endTime    核录时间止
		plateType  车辆类别
		policeName  核录人
		checkPlace     核录地点
	  */
	/* @ApiOperation(value="车辆核查条件查询分页", notes="根据所选条件分页查询核查车辆", httpMethod = "POST")
	 @ApiImplicitParams(value = {
				@ApiImplicitParam(name = "carBrand", value = "品牌种类",paramType = "query"),
				@ApiImplicitParam(name = "plateNo", value = "号牌号码",paramType = "query"),
				@ApiImplicitParam(name = "ucode", value = "核录单位",paramType = "query"),
				@ApiImplicitParam(name = "beginTime", value = "核录时间起",paramType = "query"),
				@ApiImplicitParam(name = "endTime", value = "核录时间止",paramType = "query"),
				@ApiImplicitParam(name = "plateType", value = "车辆类别",paramType = "query"),
				@ApiImplicitParam(name = "policeName", value = "核录人人",paramType = "query"),
				@ApiImplicitParam(name = "checkPlace", value = "核录地点",paramType = "query"),
				@ApiImplicitParam(name = "pageno", value = "页码",paramType = "query"),
				@ApiImplicitParam(name = "size", value = "每页显示数量",paramType = "query")
		})*/
	   @RequestMapping(value = "findpage", method = RequestMethod.POST)
		public PageHelper findPage(@RequestParam(required = false) String carBrand,
				                    @RequestParam(required = false) String plateNo, 
				                    @RequestParam(required = false) String pcode,
				                    @RequestParam(required = false) String ucode,  //ownerName
				                    @RequestParam(required = false) String ownerName,
				                    @RequestParam(required = false) String beginTime,
				                    @RequestParam(required = false) String endTime,
				                    @RequestParam(required = false) String plateType,
				                    @RequestParam(required = false) String policeName,
			                        @RequestParam(required = false) String checkAddress, 
			                        @RequestParam(required = false) String checkSource,
				                    @RequestParam(required = false) int pageno,
				        			@RequestParam(required = false) int size) {
		 
		   return carCheckService.findPage(carBrand, plateNo, pcode, ucode,ownerName, beginTime, endTime, plateType,
				policeName, checkAddress, checkSource, pageno, size);
		    }

	   
	   @RequestMapping(value = "/findplatechecklog",method = RequestMethod.GET)
	    public ResultMsg findPlateCheckLog(@RequestParam("name")String name,
	    		@RequestParam("startTime")String startTime, 
	    		@RequestParam("endTime")String endTime, 
	    		@RequestParam("source")String source,
	    		@RequestParam("ucode")String ucode,
	    		@RequestParam("tags")String tags,
	    		@RequestParam("tags2")String tags2,
	    		@RequestParam("policename")String policename,
	    		@RequestParam("policeno")String policeno,
	    		@RequestParam("plateNo")String plateNo,
	    		@RequestParam("checkaddress")String checkaddress,
	    		@RequestParam("plateType")String plateType,
	    		@RequestParam("personif")String personif,
	    		@RequestParam("birthplace")String birthplace,
	    		@RequestParam("sfzh")String sfzh,
	    		@RequestParam(value="page", required=false) Integer page, 
				@RequestParam(value = "pageSize", required = false) Integer pageSize) {
	    	
		   
		   PageH pageOfData = carCheckService.findPlateCheckLog(name,startTime, endTime,source,ucode,tags,tags2,policename,policeno,plateNo,checkaddress,plateType,personif,birthplace,sfzh,
					page == null ? 0 : page, pageSize == null ? 10 : pageSize);
			return ResultMsg.success(pageOfData);
		}
	   
	   @RequestMapping(value = "findById/{id}", method = RequestMethod.GET)
		 public PlateCheckLog findPlateById(@PathVariable String  id)
		 {
			return carCheckService.findById(id);
			 
		 }

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/exportPlateCheckLog", method = RequestMethod.GET)
	public void exportExcel(String name,String startTime, String endTime, String source, String ucode, String tags, String tags2,String birthplace,
			String policename, String policeno, String plateNo, String checkaddress, String plateType, String personif,String sfzh,
			Integer page, Integer pageSize, HttpServletResponse response) throws Exception {
		response.setHeader("Content-Disposition",
				"attachment; filename=" + UUID.randomUUID().toString().replace("-", "").toUpperCase() + ".xls");
		response.setContentType("application/vnd.ms-excel; charset=utf-8");


		OutputStream out = response.getOutputStream();
		ExcelOperations.writePlateCheckLogExcel(clssbdTemplate, (List<PlateCheckLog>)carCheckService
				.findPlateCheckLog(name,startTime, endTime, source, ucode, tags, tags2, policename, policeno, plateNo,
						checkaddress, plateType, personif,birthplace, sfzh, page == null ? 0 : page, pageSize == null ? 10000 : pageSize)
				.getContent()).write(out);
		out.flush();
		out.close();
	}
	   
	@RequestMapping(value = "/export", method = RequestMethod.GET)
	public void exportExcel(String carBrand, String plateNo, String pcode, String ucode, String ownerName,String beginTime,
			String endTime, String plateType, String policeName, String checkAddress, String checkSource,
			HttpServletResponse response)
			throws Exception {
		// Map<String, String[]> map = request.getParameterMap();
		response.setHeader("Content-Disposition",
				"attachment; filename=" + UUID.randomUUID().toString().replace("-", "").toUpperCase() + ".xls");
		response.setContentType("application/vnd.ms-excel; charset=utf-8");
		// TODO
		OutputStream out = response.getOutputStream();
		// 只能导出10000条数据,超出10000条则不能导出
		ExcelOperations.writeCarExcel(template, carCheckService.findByParamper(carBrand, plateNo, pcode, ucode,ownerName,
				beginTime, endTime, plateType, policeName, checkAddress, checkSource)).write(out);
		out.flush();
		out.close();
	}
	 
	 
	 @RequestMapping(value = "findpageCompare", method = RequestMethod.POST)
		public PageHelper findPageCompare(@RequestParam(required = false) String carBrand,
				                    @RequestParam(required = false) String plateNo,
				                    @RequestParam(required = false) String pcode,
				                    @RequestParam(required = false) String ucode,
				                    @RequestParam(required = false) String beginTime,
				                    @RequestParam(required = false) String endTime,
				                    @RequestParam(required = false) String plateType,
				                    @RequestParam(required = false) String policeName,
				                    @RequestParam(required = false) String checkPlace,
				                    @RequestParam(required = false) String checkAddress,
				                    @RequestParam(required = false) String clchTag,
				                    @RequestParam(required = false) String clchTag2,
				                    @RequestParam(required = false) String personif,
				                    @RequestParam(required = false) String dataType,
				                    @RequestParam(required = false) String ownerName,//String 
				                    @RequestParam(required = false) String checkSource,
				                    @RequestParam(required = false) int pageno,
				        			@RequestParam(required = false) int size) {
		 
		   return carCheckService.findPageCompare(carBrand, plateNo, pcode, ucode, beginTime, endTime, plateType,
				                           policeName, checkPlace,checkAddress,clchTag,clchTag2,personif,dataType,ownerName,checkSource,pageno, size);
		    }
	 
	/**
	 * 导出
	 */
	@RequestMapping(value = "/exportCompare", method = RequestMethod.GET)
	public void exportExcelCompare(String carBrand, String plateNo, String pcode, String ucode, String beginTime,
			String endTime, String plateType, String policeName, String checkPlace, String checkAddress, String clchTag,String clchTag2,String personif,
			String dataType,String ownerName,String checkSource,int pageno,int size, HttpServletResponse response) throws Exception {
		response.setHeader("Content-Disposition",
				"attachment; filename=" + UUID.randomUUID().toString().replace("-", "").toUpperCase() + ".xls");
		response.setContentType("application/vnd.ms-excel; charset=utf-8");
		OutputStream out = response.getOutputStream();
		ExcelOperations
				.writeCompareCarExcel(compareTemplate,carCheckService.findPageCompare(carBrand, plateNo, pcode, ucode, beginTime, endTime, plateType,
                        policeName, checkPlace,checkAddress,clchTag,clchTag2,personif,dataType,ownerName, checkSource,pageno, size))
				.write(out);
		out.flush();
		out.close();
	}

	 @RequestMapping(value = "findByPlateNo/{plateNo}", method = RequestMethod.GET)
	 public List<CarCheck> findByPlateNo(@PathVariable String  plateNo)
	 {
		log.info("plateNo："+plateNo); 
		try {
			log.info("UTF-8  plateNo："+java.net.URLDecoder.decode(plateNo , "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return carCheckService.findByPlateNosql(plateNo);
		 
	 }
	 /**
	  * @param plateNo
	  * @param tag
	  * @param plateType
	  * @return
	  */
	
	 
	/* @ApiOperation(value="车辆核查标签详情", notes="根据所选条件查看标签详情", httpMethod = "GET")
	 @ApiImplicitParams(value = {
				@ApiImplicitParam(name = "plateNo", value = "车牌号",paramType = "path"),
				@ApiImplicitParam(name = "tag", value = "标签名",paramType = "path"),
				@ApiImplicitParam(name = "plateType", value = "车辆类型",paramType = "path")
				})*/
	 @GetMapping("findTag/{plateNo}/{tag}/{plateType}")
	 public List<PlateTagInfo> findByTag( @PathVariable String  plateNo,
				                             @PathVariable String  tag,
				                             @PathVariable String  plateType) {
		 JsonNode plateTypeJsonNode = dictionaryService.ungetPlateType();
		 
		 if (plateType != null && !plateType.equals("")) {
				if (plateTypeJsonNode.get(plateType) != null) {
					plateType = plateTypeJsonNode.get(plateType).asText();
				}
			}
		 
		 return carCheckService.findBy(plateNo,tag,plateType);
		    }
	 
	 /**
	  * 
		车辆核录统计：
		beginTime  核录时间起
		endTime    核录时间止
		ucode   核录单位
		policeName  核录人
	  * @param beginTime
	  * @param endTime
	  * @return
	  */
	 /*@ApiOperation(value="车辆核查统计", notes="根据所选条件进行车辆统计", httpMethod = "POST")
	 @ApiImplicitParams(value = {
				@ApiImplicitParam(name = "beginTime", value = "开始时间",paramType = "query"),
				@ApiImplicitParam(name = "endTime", value = "结束时间",paramType = "query"),
				@ApiImplicitParam(name = "ucode", value = "核录单位",paramType = "query"),
				@ApiImplicitParam(name = "policeName", value = "核录人",paramType = "query")
				})*/
	 @RequestMapping(value = "infofind", method = RequestMethod.POST)
		public List<List<PersonCarVo>> Infofind( @RequestParam(required = false) String  beginTime,
				                                 @RequestParam(required = false) String  endTime,
				                                 @RequestParam(required = false) String  ucode,
				                                 @RequestParam(required = false) String  policeName) {
		 
		   return carCheckService.Infofind(beginTime,endTime,ucode,policeName);
		    }
	 
	 
	 /**
	  * 导出
	  * @param request
	  * @param response
	  * @throws Exception
	  * String carBrand = "";
		String plateNo = "";
		String queryPlace = "";
		String beginTime = "";
		String endTime = "";
		String plateType = "";
		String checkAddress="";
		String policeName="";
	  */
	 /*@ApiOperation(value="车辆核查导出", notes="根据所选条件进行车辆导出", httpMethod = "GET")
	 @ApiImplicitParams(value = {
				@ApiImplicitParam(name = "beginTime", value = "开始时间",paramType = "query"),
				@ApiImplicitParam(name = "endTime", value = "结束时间",paramType = "query")
				})
	 @RequestMapping(value = "/export",method = RequestMethod.GET)
	    public void exportExcel(HttpServletRequest request,HttpServletResponse response) throws Exception {
	    	 Map<String, String[]> map = request.getParameterMap();
	        response.setHeader("Content-Disposition",
	                "attachment; filename="+ UUID.randomUUID().toString().replace("-","").toUpperCase()+".xls");
	        response.setContentType("application/vnd.ms-excel; charset=utf-8") ;
	        OutputStream out = response.getOutputStream() ;
	        ExcelOperations.writeCarExcel(template,carCheckService.findByParamper(map)).write(out);
	        out.flush();
	        out.close();
	    }*/

	/**
	 * 分层统计接口
	 * 
	 * @return
	 */
	@RequestMapping(value = "/tjUcode", method = RequestMethod.GET)
	public List<PersonCarUcodeVo> tjUcode(String checkAddress, String beginTime, String endTime) {
		return carCheckService.tjUcode(checkAddress, beginTime, endTime);

	}
	
	@RequestMapping(value = "/tjUcodeCompare", method = RequestMethod.GET)
	public List<PersonCarUcodeVo> tjUcodeCompare(String checkAddress, String beginTime, String endTime) {
		return carCheckService.tjUcodeCompare(checkAddress, beginTime, endTime);

	}
	 

	 
	 /**
	  * 导入
	  */

	    @RequestMapping(value = "/check",method = RequestMethod.POST)
	    public ResultMsg check(
//	            @ApiParam(required = true,name = "file",value = "文件")
	            @RequestParam("file") MultipartFile file){
	        try {
	            List<String[]> lists = ExcelOperations.readRCExcelFile(file.getInputStream());
	           // List<String> list = null;
	            CarCheck carCheck = null;
	            for(String[] st:lists)
	            {
	            	carCheck = new CarCheck();
	            	carCheck.setPlateNo(st[0]);
	            	carCheck.setBodyColor(st[1]);
	            	carCheck.setCarBrand(st[2]);
	            	carCheck.setPlateType(st[3]);
	            	carCheck.setRegisterAddress(st[4]);
	            	carCheck.setOwnerIdcardNo(st[5]);
	            	carCheck.setOwnerName(st[6]);
	            	carCheck.setOwnerPhone(st[7]);
	            		
	            		
	            	carCheckService.save(carCheck);
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
		 public void infofindExport(String beginTime,String endTime,String ucode,String policeName,HttpServletResponse response) throws Exception  {
			 response.setHeader("Content-Disposition", "attachment; filename="+ UUID.randomUUID().toString().replace("-","").toUpperCase()+".xls");
		     response.setContentType("application/vnd.ms-excel; charset=utf-8") ;
		     OutputStream out = response.getOutputStream() ;

		     ExcelOperations.writePersonInfoFindExcel(personInfoTemplate,carCheckService.Infofind(beginTime,endTime,ucode,policeName)).write(out);
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
