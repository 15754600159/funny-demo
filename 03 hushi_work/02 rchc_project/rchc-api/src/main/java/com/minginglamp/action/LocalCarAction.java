package com.minginglamp.action;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;
import com.minginglamp.common.PageHelper;
import com.minginglamp.model.LocalConcernCars;
import com.minginglamp.service.DictionaryService;
import com.minginglamp.service.LocalCarService;
import com.minginglamp.utils.DateUtils;
import com.minginglamp.utils.ExcelOperations;
import com.minginglamp.utils.ResultMsg;
import com.minginglamp.vo.LocalPersonVo;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/localcar/info")
@Slf4j
public class LocalCarAction {
	
	@Autowired
	LocalCarService localCarService;
	
	@Autowired
	DictionaryService dictionaryService;
	
	@Value("${xls.localcar}")
	private String template;

	
	 @RequestMapping(value = "/findDataType",method = RequestMethod.GET)
	    public List<String> findDataType()
	    {
			return localCarService.findDataType();
			
	    }
	
	@RequestMapping(value = "/findReason",method = RequestMethod.GET)
    public List<String> findReason(@RequestParam("dataType") String dataType)
    {
		return localCarService.findReason(dataType);
		
    }
	
	
	
	@RequestMapping(value = "/checkcl",method = RequestMethod.POST)
    public ResultMsg check(
//            @ApiParam(required = true,name = "file",value = "文件")
            @RequestParam("file") MultipartFile file,
            @RequestParam("importNo") String importNo,
            @RequestParam("importName") String importName){
        try {
            List<String[]> lists = ExcelOperations.readRCExcelFile(file.getInputStream());
            LocalConcernCars localConcernCar = null;
            for(String[] st:lists)
            {

            	localConcernCar = new LocalConcernCars();
            	localConcernCar.setId(UUID.randomUUID().toString());
				localConcernCar.setDataType(st[0]);
            	localConcernCar.setOwnerName(st[1]);
            	localConcernCar.setOwnerIdcardNo(st[2]);
            	localConcernCar.setOwnerPhone(st[3]);
            	localConcernCar.setPlateNo(st[4]);
            	localConcernCar.setPlateType(st[5]);
            	localConcernCar.setChinaCarBrand(st[6]);
            	localConcernCar.setHjdqPlace(st[7]);
            	localConcernCar.setReason(st[8]);
            	localConcernCar.setHjdqAddress(st[9]);
            	localConcernCar.setXzPlace(st[10]);
            	localConcernCar.setDealRequest(st[11]);
            	localConcernCar.setBdEndtime(st[12]);
            	localConcernCar.setImportNo(importNo);
            	localConcernCar.setImportName(importName);
            	localConcernCar.setImportTime(DateUtils.formatDateTime(new Date()));
            	localConcernCar.setCxSign("0");
            		
            	localCarService.save(localConcernCar);
            }
            return ResultMsg.success("上传成功");
        } catch (IOException e) {
           // log.error("上传文件失败",e.getMessage());
            return ResultMsg.error("文件上传失败");
        }
    }
	
	@RequestMapping(value = "/check",method = RequestMethod.POST)
    public ResultMsg checkcl(
//            @ApiParam(required = true,name = "file",value = "文件")
            @RequestParam("file") MultipartFile file,
            @RequestParam("importNo") String importNo,
            @RequestParam("importName") String importName){
        	String[] schemas ={"dataType","ownerName","ownerIdcardNo","ownerPhone","plateNo","plateType","chinaCarBrand","hjdqPlace","reason","hjdqAddress","xzPlace","dealRequest","bdEndtime"};
            List<LocalConcernCars> lists;
			try {
				lists = ExcelOperations.readrcExcel(schemas,LocalConcernCars.class,file.getInputStream(),0);
				for( LocalConcernCars localConcernCar:lists)
	            {
	            	localConcernCar.setId(UUID.randomUUID().toString());
	            	localConcernCar.setImportNo(importNo);
	            	localConcernCar.setImportName(importName);
	            	localConcernCar.setImportTime(DateUtils.formatDateTime(new Date()));
	            	localConcernCar.setCxSign("0");
	            	localCarService.save(localConcernCar);
	            }
	          
	            return ResultMsg.success("上传成功");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return ResultMsg.error("文件上传失败");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return ResultMsg.error("文件上传失败");
			}
            
    }
	
	 @RequestMapping(value = "findpage", method = RequestMethod.POST)
		public PageHelper findPage(@RequestParam(required = false) String names,
			//	@RequestParam(required = false) String ownerName,
				@RequestParam(required = false) String idcardNo,
				@RequestParam(required = false) String plateNo,
				@RequestParam(required = false) String plateType,
				@RequestParam(required = false) String chinaCarBrand,
				@RequestParam(required = false) String hjdqPlace,
				@RequestParam(required = false) String reason,
				@RequestParam(required = false) String hjdqAddress,
				@RequestParam(required = false) String xzPlace,
				@RequestParam(required = false) String dealRequest,
				@RequestParam(required = false) String beginTime,
				@RequestParam(required = false) String endTime,
				@RequestParam(required = false) String importNo,
				@RequestParam(required = false) String importName,
				@RequestParam(required = false) String dataType,
				@RequestParam(required = false) int pageno,
				@RequestParam(required = false) int size,
				@RequestParam(required = false) String currentUserNo) {
		// Map<String, String[]> map = request.getParameterMap();
		 
		   return localCarService.findPage(names,idcardNo,plateNo,plateType,chinaCarBrand,hjdqPlace,reason,hjdqAddress,xzPlace,
				                  dealRequest,beginTime,endTime,importNo,importName, dataType,pageno,size,currentUserNo);
		    }

	@RequestMapping(value = "/export", method = RequestMethod.GET)
	public void exportExcel(int pageno, int size, String names,String idcardNo,String plateNo,String plateType,String chinaCarBrand,String hjdqPlace,String reason,String hjdqAddress,String xzPlace,
			String dealRequest,String beginTime,String endTime,String importNo,String importName, String dataType,String currentUserNo,
			HttpServletResponse response) throws Exception {
		response.setHeader("Content-Disposition",
				"attachment; filename=" + UUID.randomUUID().toString().replace("-", "").toUpperCase() + ".xls");
		response.setContentType("application/vnd.ms-excel; charset=utf-8");

		OutputStream out = response.getOutputStream();
		ExcelOperations.writeLocalCarExcel(template,
				localCarService.findPage(names,idcardNo,plateNo,plateType,chinaCarBrand,hjdqPlace,reason,hjdqAddress,xzPlace,
		                  dealRequest,beginTime,endTime,importNo,importName, dataType,pageno,size,currentUserNo))
				.write(out);
		out.flush();
		out.close();
	}

	
	 @RequestMapping(value = "updateCar", method = RequestMethod.POST)
	 public ResultMsg updatePerson(@RequestParam(required = false) String id,
			 @RequestParam(required = false) String ownerName,
				@RequestParam(required = false) String ownerIdcardNo,
				@RequestParam(required = false) String ownerPhone,
				@RequestParam(required = false) String plateNo,
				@RequestParam(required = false) String plateType,
				@RequestParam(required = false) String chinaCarBrand,
				@RequestParam(required = false) String hjdqPlace,
				@RequestParam(required = false) String reason,
				@RequestParam(required = false) String hjdqAddress,
				@RequestParam(required = false) String xzPlace,
				@RequestParam(required = false) String dealRequest,
				@RequestParam(required = false) String bdEndtime,
				@RequestParam(required = false) String dataType)
		{
		 
		  return  localCarService.updateCar(id,ownerName,ownerIdcardNo,ownerPhone,plateNo,plateType,chinaCarBrand,hjdqPlace,reason,hjdqAddress,
				                               xzPlace,dealRequest,bdEndtime,dataType);
			 
			 
		 
		}
	 
	@RequestMapping(value = "update", method = RequestMethod.POST)
	public ResultMsg update(@RequestParam(required = false) String id, @RequestParam(required = false) String importNo,
			@RequestParam(required = false) String importName, @RequestParam(required = false) String currentUserNo,
			@RequestParam(required = false) String currentUserName) {
		String cxSign = "1";// 撤销
		return localCarService.update(id, importNo, importName, currentUserNo, currentUserName, cxSign);

	}

	@RequestMapping(value = "updateReset", method = RequestMethod.POST)
	public ResultMsg updateReset(@RequestParam(required = false) String id,
			@RequestParam(required = false) String importNo, @RequestParam(required = false) String importName,
			@RequestParam(required = false) String currentUserNo,
			@RequestParam(required = false) String currentUserName) {
		String cxSign = "0";// 默认
		return localCarService.update(id, importNo, importName, currentUserNo, currentUserName, cxSign);
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
		return localCarService.batchUpdateReset(localPersonVo);
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
		return localCarService.batchUpdateReset(localPersonVo);
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
		return localCarService.batchUpdateBdTime(localPersonVo);
	}

    @GetMapping("/listPlateType")
	 public JsonNode listPlateType() {
    	
		//	return localCarService.listPlateType();
    	return dictionaryService.getPlateType();
	 }
	
}
