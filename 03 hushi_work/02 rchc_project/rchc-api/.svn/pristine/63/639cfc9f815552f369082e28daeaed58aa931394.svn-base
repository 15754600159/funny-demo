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
import com.minginglamp.model.LocalConcernCars;
import com.minginglamp.model.SfLocalPerson;
import com.minginglamp.service.SfLocalPersonService;
import com.minginglamp.utils.DateUtils;
import com.minginglamp.utils.ExcelOperations;
import com.minginglamp.utils.ResultMsg;
import com.minginglamp.vo.LocalPersonVo;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/sflocalperson/info")
@Slf4j
public class SfLocalPersonAction {

	@Autowired
	SfLocalPersonService sfLocalPersonService;

	@Value("${xls.localperson}")
	 private String template;
	
	
	 @RequestMapping(value = "/findReason",method = RequestMethod.GET)
	    public List<String> findReason(@RequestParam("dataType") String dataType)
	    {
			return sfLocalPersonService.findReason(dataType);
			
	    }
	
	 @RequestMapping(value = "/findDataType",method = RequestMethod.GET)
	    public List<String> findDataType()
	    {
			return sfLocalPersonService.findDataType();
			
	    }
	 
	/*@RequestMapping(value = "/checkry",method = RequestMethod.POST)
    public ResultMsg check(
    //       @ApiParam(required = true,name = "file",value = "文件")
            @RequestParam("file") MultipartFile file,
            @RequestParam("importNo") String importNo,
            @RequestParam("importName") String importName){
        try {
            List<String[]> lists = ExcelOperations.readRCExcelFile(file.getInputStream());
            SfLocalPerson sfLocalPerson = null;
            for(String[] st:lists)
            {
            	sfLocalPerson = new SfLocalPerson();
            //	sfLocalPerson.setFid(UUID.randomUUID().toString());
				sfLocalPerson.setFdataType(st[0]);
				sfLocalPerson.setFxm(st[1]);
				sfLocalPerson.setFgmsfhm(st[2]);
				sfLocalPerson.setFxbdm(st[3]);
				sfLocalPerson.setFmzdm(st[4]);
				sfLocalPerson.setFhjdzSsxqdm(st[5]);
				sfLocalPerson.setFhjdzQhnxxdz(st[6]);
				sfLocalPerson.setFxzdq(st[7]);
				sfLocalPerson.setFxzdz(st[8]);
				sfLocalPerson.setFlgdw(st[9]);
				sfLocalPerson.setFlgr(st[10]);
				sfLocalPerson.setFssyj(st[11]);
				sfLocalPerson.setFdealtype(st[12]);
				sfLocalPerson.setFdeadline(st[13]);
				sfLocalPerson.setFinputNo(importNo);
				sfLocalPerson.setFinputperson(importName);
				sfLocalPerson.setFinputtime(DateUtils.formatDateTime(new Date()));
				sfLocalPerson.setFzxbs("0");
			if (sfLocalPersonService.count(sfLocalPerson) == 0) {
				sfLocalPersonService.save(sfLocalPerson);
			}

            }
            return ResultMsg.success("上传成功");
        } catch (IOException e) {
           // log.error("上传文件失败",e.getMessage());
            return ResultMsg.error("文件上传失败");
        }
    }*/
	
	
	@RequestMapping(value = "/check",method = RequestMethod.POST)
    public ResultMsg checkry(
//            @ApiParam(required = true,name = "file",value = "文件")
            @RequestParam("file") MultipartFile file,
            @RequestParam("importNo") String importNo,
            @RequestParam("importName") String importName){
        	String[] schemas ={"fdataType","fxm","fgmsfhm","fxbdm","fmzdm","fhjdzSsxqdm","fhjdzQhnxxdz","fxzdq","fxzdz","flgdw","flgr","fssyj","fdealtype","fdeadline"};
            List<SfLocalPerson> lists;
			try {
				lists = ExcelOperations.readrcExcel(schemas,SfLocalPerson.class,file.getInputStream(),0);
				for( SfLocalPerson sfLocalPerson:lists)
	            {
					//sfLocalPerson.setFid(UUID.randomUUID().toString());
					sfLocalPerson.setFinputno(importNo);
					sfLocalPerson.setFinputperson(importName);
					sfLocalPerson.setFinputtime(DateUtils.formatDateTime(new Date()));
					sfLocalPerson.setSysdate(DateUtils.formatDateTime(new Date()));
					sfLocalPerson.setFzxbs("0");
					sfLocalPersonService.save(sfLocalPerson);
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

	 
	   @RequestMapping(value = "/export",method = RequestMethod.GET)
	    public void exportExcel(int pageno,int size,String names,String idcardNo,String national,String reason,String beginTime,String endTime,String dataType,String importName,String currentUserNo,HttpServletResponse response) throws Exception {
	        response.setHeader("Content-Disposition",
	                "attachment; filename="+ UUID.randomUUID().toString().replace("-","").toUpperCase()+".xls");
	        response.setContentType("application/vnd.ms-excel; charset=utf-8") ;
	        
         OutputStream out = response.getOutputStream() ;
	        ExcelOperations.writeLocalPersonsExcel(template,sfLocalPersonService.findPage(pageno,size,names,idcardNo,national,reason,beginTime,
	        		endTime,dataType,importName,currentUserNo)).write(out);
	        out.flush();
	        out.close();
	    }
	
	 @RequestMapping(value = "findpage", method = RequestMethod.POST)
		public PageHelper findPage(@RequestParam(required = false) String names,
				@RequestParam(required = false) String idcardNo, 
				@RequestParam(required = false) String national,
				@RequestParam(required = false) String reason,
				@RequestParam(required = false) String beginTime,
				@RequestParam(required = false) String endTime,
				@RequestParam(required = false) String dataType,
				@RequestParam(required = false) int pageno,
				@RequestParam(required = false) int size,
				@RequestParam(required = false) String importName,
				@RequestParam(required = false) String currentUserNo) {
		// Map<String, String[]> map = request.getParameterMap();
		 
		   return sfLocalPersonService.findPage(pageno,size,names,idcardNo,national,reason,beginTime,endTime,dataType,importName,currentUserNo);
		    }
	 
	 
	 @RequestMapping(value = "update", method = RequestMethod.POST)
	 public ResultMsg update(@RequestParam(required = false) String id,
			                @RequestParam(required = false) String importNo,
			                @RequestParam(required = false) String importName,
			                @RequestParam(required = false) String currentUserNo,
			                @RequestParam(required = false) String currentUserName
			                
			                 )		 {
		return sfLocalPersonService.update(id,importNo,importName,currentUserNo,currentUserName);
		 
	 }
	 
	 @RequestMapping(value = "updateReset", method = RequestMethod.POST)
	 public ResultMsg updateReset(@RequestParam(required = false) String id,
								 @RequestParam(required = false) String importNo,
								 @RequestParam(required = false) String importName,
								 @RequestParam(required = false) String currentUserNo,
								 @RequestParam(required = false) String currentUserName)
		{
		 
		 return sfLocalPersonService.updateReset(id, importNo, importName, currentUserNo, currentUserName);
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
		 
		  return  sfLocalPersonService.updatePerson(id,name,idcardNo,sex,national,hjdqPlace,hjdqAddress,xzPlace,xzAddress,lgPlace,lgPerson,reason,
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
			return sfLocalPersonService.batchUpdateReset(localPersonVo);
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
			return sfLocalPersonService.batchUpdateReset(localPersonVo);
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
			return sfLocalPersonService.batchUpdateBdTime(localPersonVo);
		}
}
