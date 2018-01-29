package com.minginglamp.action;

import java.io.OutputStream;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.minginglamp.common.PageH;
import com.minginglamp.model.XfPerson;
import com.minginglamp.model.ZaPerson;
import com.minginglamp.service.ZaPersonService;
import com.minginglamp.sharding.PageResponse;
import com.minginglamp.utils.ExcelOperations;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/zaPerson/info")
@Slf4j
public class ZaPersonAction {
	
	
	@Value("${xls.zaTemplate}")
	private String zaTemplate;
	
	@Autowired
	ZaPersonService zaPersonService;
	
	

	 @RequestMapping(value = "findpage", method = RequestMethod.POST)
		public PageH findPage(@RequestParam(required = false) String fname,//人员姓名
				                    @RequestParam(required = false) String fnation, //民族
				                    @RequestParam(required = false) String fcardtype,//证件类型
				                    @RequestParam(required = false) String fcardnum,  //证件号码
				                    @RequestParam(required = false) String fregion,//户籍地区
				                    @RequestParam(required = false) String faddress,//住址
				                    @RequestParam(required = false) String fregperson,//登记人
				                    @RequestParam(required = false) String beginTime,//登记起始时间
				                    @RequestParam(required = false) String endTime,//登记截止时间
				                    @RequestParam(required = false) String fcompanynum,//企业编号
				                    @RequestParam(required = false) String forgid,//组织机构
			                        @RequestParam(required = false) String fcollecttype, //采集类型（0：机读；1：手工）
			                        @RequestParam(required = false) String sjly,//数据来源（1：汽车站 3：火车站 4：飞机场）
			                        @RequestParam(required = false) String flibcode,
			                        @RequestParam(required = false) String jczbs,//进出站标识
				                    @RequestParam(required = false) int pageno,
				        			@RequestParam(required = false) int size) {
		 
		   return zaPersonService.findPage(fname, fnation, fcardtype, fcardnum,fregion, faddress, fregperson,beginTime,endTime, fcompanynum,
				   forgid, fcollecttype,sjly,flibcode, jczbs,pageno, size);
		    }
	

	 @RequestMapping(value = "findpagetable", method = RequestMethod.POST)
	 public PageH findPagetable(@RequestParam(required = false) String fname,//人员姓名
             @RequestParam(required = false) String fnation, //民族
             @RequestParam(required = false) String fcardtype,//证件类型
             @RequestParam(required = false) String fcardnum,  //证件号码
             @RequestParam(required = false) String fregion,//户籍地区
             @RequestParam(required = false) String faddress,//住址
             @RequestParam(required = false) String fregperson,//登记人
             @RequestParam(required = false) String beginTime,//登记起始时间
             @RequestParam(required = false) String endTime,//登记截止时间
             @RequestParam(required = false) String fcompanynum,//企业编号
             @RequestParam(required = false) String forgid,//组织机构
             @RequestParam(required = false) String fcollecttype, //采集类型（0：机读；1：手工）
             @RequestParam(required = false) String sjly,//数据来源（1：汽车站 3：火车站 4：飞机场）
             @RequestParam(required = false) String flibcode,
             @RequestParam(required = false) String jczbs,//进出站标识
             @RequestParam(required = false) int pageno,
 			@RequestParam(required = false) int size) {

	   return zaPersonService.findPagetable(fname, fnation, fcardtype, fcardnum,fregion, faddress, fregperson,beginTime,endTime, fcompanynum,
			   forgid, fcollecttype,sjly,flibcode, jczbs,pageno, size);
}
	 
	 
	 
	 @SuppressWarnings("unchecked")
	@RequestMapping(value = "/exportZaPerson", method = RequestMethod.GET)
		public void exportExcel(String fname, String fnation,String fcardtype,String fcardnum,String fregion,String faddress,String fregperson,String beginTime,String endTime,String fcompanynum,
				String forgid,String fcollecttype,String sjly,String flibcode,String jczbs, int pageno,int size, HttpServletResponse response) throws Exception {
			response.setHeader("Content-Disposition",
					"attachment; filename=" + UUID.randomUUID().toString().replace("-", "").toUpperCase() + ".xls");
			response.setContentType("application/vnd.ms-excel; charset=utf-8");
			OutputStream out = response.getOutputStream();
			ExcelOperations
					.writeZaPersonCheckExcel(zaTemplate,
							(List<ZaPerson>)zaPersonService.findPagetable
							(fname, fnation, fcardtype, fcardnum, fregion, faddress, fregperson, 
									beginTime, endTime, fcompanynum, forgid, fcollecttype, sjly, flibcode, jczbs, pageno, size)
							.getContent())
					.write(out);
			out.flush();
			out.close();
		}

}
