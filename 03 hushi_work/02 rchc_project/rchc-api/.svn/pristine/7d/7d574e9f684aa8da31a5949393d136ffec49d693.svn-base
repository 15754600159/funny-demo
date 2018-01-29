package com.minginglamp.action;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.minginglamp.common.PageHelper;
import com.minginglamp.model.LocalConcernPersons;
import com.minginglamp.reflect.MapperService;
import com.minginglamp.reflect.MyMapper;
import com.minginglamp.service.LocalPersonService;
import com.minginglamp.service.SfLocalPersonService;
import com.minginglamp.utils.DateUtils;
import com.minginglamp.utils.ExcelOperations;
import com.minginglamp.utils.ResultMsg;
import com.minginglamp.vo.LocalPersonVo;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/localperson/info")
@Slf4j
public class LocalPersonAction {

	@Autowired
	private LocalPersonService localPersonService;
	
	@Autowired
	private MapperService mapperService;
	
	 @Value("${xls.localperson}")
	 private String template;
	
	 @RequestMapping(value = "/findall",method = RequestMethod.GET)
	    public List<LocalConcernPersons> findAll()
	    {
			return mapperService.getAllUser();
			
	    }
	 
	 @RequestMapping(value = "/findDataType",method = RequestMethod.GET)
	    public List<String> findDataType()
	    {
			return localPersonService.findDataType();
			
	    }
	 
	 @RequestMapping(value = "/findReason",method = RequestMethod.GET)
	    public List<String> findReason(@RequestParam("dataType") String dataType)
	    {
			return localPersonService.findReason(dataType);
			
	    }
		@RequestMapping(value = "/check",method = RequestMethod.POST)
	    public ResultMsg check(
//	            @ApiParam(required = true,name = "file",value = "文件")
	            @RequestParam("file") MultipartFile file,
	            @RequestParam("importNo") String importNo,
	            @RequestParam("importName") String importName){
	        try {
	            List<String[]> lists = ExcelOperations.readRCExcelFile(file.getInputStream());
	            LocalConcernPersons localConcernPerson = null;
	            for(String[] st:lists)
	            {
	            	localConcernPerson = new LocalConcernPersons();
	            	localConcernPerson.setId(UUID.randomUUID().toString());
					localConcernPerson.setDataType(st[0]);
					localConcernPerson.setName(st[1]);
					localConcernPerson.setIdcardNo(st[2]);
					localConcernPerson.setSex(st[3]);
					localConcernPerson.setNational(st[4]);
					localConcernPerson.setHjdqPlace(st[5]);
					localConcernPerson.setHjdqAddress(st[6]);
					localConcernPerson.setXzPlace(st[7]);
					localConcernPerson.setXzAddress(st[8]);
					localConcernPerson.setLgPlace(st[9]);
					localConcernPerson.setLgPerson(st[10]);
					localConcernPerson.setReason(st[11]);
					localConcernPerson.setDealRequest(st[12]);
	            	localConcernPerson.setBdEndtime(st[13]);
	            	localConcernPerson.setImportNo(importNo);
	            	localConcernPerson.setImportName(importName);
	            	localConcernPerson.setImportTime(DateUtils.formatDateTime(new Date()));
	            	localConcernPerson.setCxSign("0");
				if (localPersonService.count(localConcernPerson) == 0) {
					localPersonService.save(localConcernPerson);
				}

	            }
	            return ResultMsg.success("上传成功");
	        } catch (IOException e) {
	           // log.error("上传文件失败",e.getMessage());
	            return ResultMsg.error("文件上传失败");
	        }
	    }
		
		/**
		 * 
		 * @return
		 */
		
		 @RequestMapping(value = "findpage", method = RequestMethod.POST)
			public PageHelper findPage(@RequestParam(required = false) String names,
					@RequestParam(required = false) String idcardNo,
					@RequestParam(required = false) String sex,
					@RequestParam(required = false) String national,
					@RequestParam(required = false) String hjdqPlace,
					@RequestParam(required = false) String hjdqAddress,
					@RequestParam(required = false) String xzPlace,
					@RequestParam(required = false) String xzAddress,
					@RequestParam(required = false) String lgPlace,
					@RequestParam(required = false) String lgPerson,
					@RequestParam(required = false) String reason,
					@RequestParam(required = false) String dealRequest,
					@RequestParam(required = false) String beginTime,
					@RequestParam(required = false) String endTime,
					@RequestParam(required = false) String importNo,
					@RequestParam(required = false) String dataType,
					@RequestParam(required = false) int pageno,
					@RequestParam(required = false) int size,
					@RequestParam(required = false) String importName,
					@RequestParam(required = false) String currentUserNo) {
			// Map<String, String[]> map = request.getParameterMap();
			 
			   return localPersonService.findPage(pageno,size,names,idcardNo,sex,national,hjdqPlace,hjdqAddress,xzPlace,xzAddress,lgPlace,lgPerson,reason,dealRequest,beginTime,endTime,importNo,dataType,importName,currentUserNo);
			    }
		 
		   @RequestMapping(value = "/export",method = RequestMethod.GET)
		    public void exportExcel(int pageno,int size,String names,String idcardNo,String sex,String national,String hjdqPlace,String hjdqAddress,String xzPlace,String xzAddress,String lgPlace,String lgPerson,
		    		String reason,String dealRequest,String beginTime,String endTime,String importNo,String dataType,String importName,String currentUserNo,HttpServletResponse response) throws Exception {
		        response.setHeader("Content-Disposition",
		                "attachment; filename="+ UUID.randomUUID().toString().replace("-","").toUpperCase()+".xls");
		        response.setContentType("application/vnd.ms-excel; charset=utf-8") ;
		        
	            OutputStream out = response.getOutputStream() ;
		        ExcelOperations.writeLocalPersonExcel(template,localPersonService.findPage(pageno,size,names,idcardNo,sex,national,hjdqPlace,hjdqAddress,xzPlace,xzAddress,lgPlace,lgPerson,reason,dealRequest,
		        		beginTime,endTime,importNo,dataType,importName,currentUserNo)).write(out);
		        out.flush();
		        out.close();
		    }
		 
		 @RequestMapping(value = "update", method = RequestMethod.POST)
		 public ResultMsg update(@RequestParam(required = false) String id,
				                @RequestParam(required = false) String importNo,
				                @RequestParam(required = false) String importName,
				                @RequestParam(required = false) String currentUserNo,
				                @RequestParam(required = false) String currentUserName
				                
				                 )		 {
			return localPersonService.update(id,importNo,importName,currentUserNo,currentUserName);
			 
		 }
		 
		 @RequestMapping(value = "updateReset", method = RequestMethod.POST)
		 public ResultMsg updateReset(@RequestParam(required = false) String id,
									 @RequestParam(required = false) String importNo,
									 @RequestParam(required = false) String importName,
									 @RequestParam(required = false) String currentUserNo,
									 @RequestParam(required = false) String currentUserName)
			{
			 
			 return localPersonService.updateReset(id, importNo, importName, currentUserNo, currentUserName);
			}
		 
		 
		 @RequestMapping(value = "updatePerson", method = RequestMethod.POST)
		 public ResultMsg updatePerson(@RequestParam(required = false) String id,
				 @RequestParam(required = false) String name,
					@RequestParam(required = false) String idcardNo,
					@RequestParam(required = false) String sex,
					@RequestParam(required = false) String national,
					@RequestParam(required = false) String hjdqPlace,
					@RequestParam(required = false) String hjdqAddress,
					@RequestParam(required = false) String xzPlace,
					@RequestParam(required = false) String xzAddress,
					@RequestParam(required = false) String lgPlace,
					@RequestParam(required = false) String lgPerson,
					@RequestParam(required = false) String reason,
					@RequestParam(required = false) String dealRequest,
					@RequestParam(required = false) String bdEndtime,
					@RequestParam(required = false) String dataType)
			{
			 
			  return  localPersonService.updatePerson(id,name,idcardNo,sex,national,hjdqPlace,hjdqAddress,xzPlace,xzAddress,lgPlace,lgPerson,reason,
						                dealRequest,bdEndtime,dataType);
				 
				 
			 
			}

	/**
	 * 批量撤销
	 * 
	 * @param ids
	 * @param currentUserNo
	 * @return
	 */
	@PostMapping("/batchCancel")
	public ResultMsg batchUpdateReset(@RequestBody LocalPersonVo localPersonVo) {
		String cxSign = "1";// 撤销
		localPersonVo.setCxSign(cxSign);
		return localPersonService.batchUpdateReset(localPersonVo);
	}

	/**
	 * 批量恢复
	 * 
	 * @param ids
	 * @param currentUserNo
	 * @return
	 */
	@PostMapping("/batchReset")
	public ResultMsg batchUpdate(@RequestBody LocalPersonVo localPersonVo) {
		String cxSign = "0";// 默认
		localPersonVo.setCxSign(cxSign);
		return localPersonService.batchUpdateReset(localPersonVo);
	}

	/**
	 * 批量修改 比对止期
	 * 
	 * @param ids
	 * @param currentUserNo
	 * @return
	 */
	@PostMapping("/batchUpdateBdTime")
	public ResultMsg batchUpdateBdTime(@RequestBody LocalPersonVo localPersonVo) {
		return localPersonService.batchUpdateBdTime(localPersonVo);
	}
		 
}

