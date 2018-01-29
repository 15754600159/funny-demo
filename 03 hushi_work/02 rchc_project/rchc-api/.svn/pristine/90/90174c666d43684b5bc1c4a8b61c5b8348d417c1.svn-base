package com.minginglamp.action;

import java.io.OutputStream;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.minginglamp.common.PageH;
import com.minginglamp.model.PersonCheckLog;
import com.minginglamp.model.XfPerson;
import com.minginglamp.service.XfPersonService;
import com.minginglamp.utils.ExcelOperations;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/xfPerson/info")
@Slf4j
public class XfPersonAction {
	
	@Autowired
	XfPersonService xfPersonService;
	
	@Value("${xls.xfTemplate}")
	private String xfTemplate;
	
	 @RequestMapping(value = "findpage", method = RequestMethod.POST)
		public PageH findPage(@RequestParam(required = false) String name, //姓名
				                    @RequestParam(required = false) String sex, //性别
				                    @RequestParam(required = false) String nation,//民族
				                    @RequestParam(required = false) String dubious,  //重点人员可疑类型
				                    @RequestParam(required = false) String dubious2, 
				                    @RequestParam(required = false) String address,//住址
				                    @RequestParam(required = false) String cardno,//证件号码
				                    @RequestParam(required = false) String beginTime,//起始进入时间
				                    @RequestParam(required = false) String endTime,//截止进入时间
				                    @RequestParam(required = false) String stationid,//检查站ID
			                        @RequestParam(required = false) String stationname, //检查站名称
			                        @RequestParam(required = false) String areacode,//户籍地编码
				                    @RequestParam(required = false) int pageno,
				        			@RequestParam(required = false) int size) {
		 
		  return xfPersonService.findPage(name, sex, nation, dubious,dubious2,address, cardno, beginTime,endTime, stationid,
				   stationname, areacode, pageno, size);
		    }
	 @RequestMapping(value = "findById", method = RequestMethod.GET)
		 public XfPerson findByPersonId(@RequestParam(required = false) String personid)
		 {
			return xfPersonService.findByPersonId(personid);
			 
		 }
		@SuppressWarnings("unchecked")
		@RequestMapping(value = "/exportXfPerson", method = RequestMethod.GET)
		public void exportExcel(String name,String sex, String nation,String dubious,String dubious2,String address,String cardno,String beginTime,String endTime,String stationid,
				String  stationname,String areacode,int pageno,int size, HttpServletResponse response) throws Exception {
			response.setHeader("Content-Disposition",
					"attachment; filename=" + UUID.randomUUID().toString().replace("-", "").toUpperCase() + ".xls");
			response.setContentType("application/vnd.ms-excel; charset=utf-8");
			OutputStream out = response.getOutputStream();
			ExcelOperations
					.writeXfPersonCheckExcel(xfTemplate,
							(List<XfPerson>)xfPersonService.findPage(name, sex, nation, dubious,dubious2,address, cardno, beginTime,endTime, stationid,
									   stationname, areacode, pageno, size).getContent())
					.write(out);
			out.flush();
			out.close();
		}

}
