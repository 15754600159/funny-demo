package com.minginglamp.action;

import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.minginglamp.common.PageHelper;
import com.minginglamp.service.CountPersonCheckJCZService;
import com.minginglamp.service.CountPersonCheckJJService;
import com.minginglamp.service.CountPersonCheckService;
import com.minginglamp.service.CountPersonCheckXFJService;
import com.minginglamp.service.CountPersonCheckZJService;
import com.minginglamp.utils.ExcelOperations;
import com.minginglamp.vo.CheckDeviceListVo;
import com.minginglamp.vo.CheckPersonListVo;
import com.minginglamp.vo.CountCheckLogVo;
import com.minginglamp.vo.CountpersonCheckLogDeptVo;
import com.minginglamp.vo.WarnSearchByCodeVo;

@RestController
@RequestMapping("/countPersonCheck")
public class CountPersonCheckAction {

	@Autowired
	private CountPersonCheckService countPersonCheckService;

	@Autowired
	private CountPersonCheckJJService countPersonCheckJJService;

	@Autowired
	private CountPersonCheckJCZService countPersonCheckJCZService;
	@Autowired
	private CountPersonCheckXFJService countPersonCheckXFJService;
	@Autowired
	private CountPersonCheckZJService countPersonCheckZJService;

	@Value("${xls.countCheck}")
	private String template;

	@Value("${xls.personWarn}")
	private String personWarnTemplate;
	
	@Value("${xls.personXfjWarn}")
	private String personXfjWarnTemplate;
	
	@Value("${xls.personXfj}")
	private String personXfjTemplate;

	/**
	 * 警务通统计
	 * 
	 * @param beginTime
	 * @param endTime
	 * @return
	 */
	@RequestMapping(value = "countDept", method = RequestMethod.GET)
	public List<CountpersonCheckLogDeptVo> countDept(String beginTime, String endTime, String source) {
		if (StringUtils.isNotBlank(source) && source.equals("jj")) {
			return countPersonCheckJJService.countPersonCheck(beginTime, endTime);
		} else if (StringUtils.isNotBlank(source) && source.equals("jcz")) {
			return countPersonCheckJCZService.countPersonCheck(beginTime, endTime, "jwt");
		} else if (StringUtils.isNotBlank(source) && source.equals("lte-jcz")) {
			return countPersonCheckJCZService.countPersonCheck(beginTime, endTime, "lte");
		} else if (StringUtils.isNotBlank(source) && source.equals("lte")) {
			return countPersonCheckService.countPersonCheckdept(beginTime, endTime, source);
		} else if (StringUtils.isNotBlank(source) && source.equals("zj")) {
			return countPersonCheckZJService.countPersonCheckdept(beginTime, endTime, source);
		} else if (StringUtils.isNotBlank(source) && source.equals("xfj")) {
			return countPersonCheckXFJService.countPersonCheck(beginTime, endTime);
		} else {
			return countPersonCheckService.countPersonCheckdept(beginTime, endTime, source);
		}
	}

	/**
	 * 核查数量统计
	 * 
	 * @param beginTime
	 * @param endTime
	 * @param code
	 * @param source
	 * @return
	 */
	@RequestMapping(value = "countCheckByCode", method = RequestMethod.GET)
	public List<CountCheckLogVo> countCheckByCode(String beginTime, String endTime, String code, String source) {
		return countPersonCheckService.countCheckByCode(beginTime, endTime, code, source);
	}

	/**
	 * 比中数量统计
	 * 
	 * @param beginTime
	 * @param endTime
	 * @param code
	 * @param source
	 * @return
	 */
	@RequestMapping(value = "countComparByCode", method = RequestMethod.GET)
	public List<CountCheckLogVo> countComparByCode(String beginTime, String endTime, String code, String source) {
		return countPersonCheckService.countComparByCode(beginTime, endTime, code, source);
	}

	/**
	 * 预警数量统计
	 * 
	 * @param beginTime
	 * @param endTime
	 * @param code
	 * @param source
	 * @return
	 */
	@RequestMapping(value = "countWarnByCode", method = RequestMethod.GET)
	public List<CountCheckLogVo> countWarnByCode(String beginTime, String endTime, String code, String source) {
		return countPersonCheckService.countWarnByCode(beginTime, endTime, code, source);
	}

	/**
	 * 设备列表统计
	 * 
	 * @param beginTime
	 * @param endTime
	 * @param code
	 * @param source
	 * @return
	 */
	@RequestMapping(value = "listDeviceByCode", method = RequestMethod.GET)
	public List<CheckDeviceListVo> listDeviceByCode(String beginTime, String endTime, String code, String source) {
		return countPersonCheckService.listDeviceByCode(beginTime, endTime, code, source);
	}

	/**
	 * 预警列表统计
	 * 
	 * @param beginTime
	 * @param endTime
	 * @param code
	 * @param source
	 * @return
	 */
	@RequestMapping(value = "countSubWarnByCode", method = RequestMethod.GET)
	public List<CountCheckLogVo> countSubWarnByCode(String beginTime, String endTime, String code, String type,
			String source) {
		return countPersonCheckService.countSubWarnByCode(beginTime, endTime, code, type, source);
	}

	/**
	 * 预警人员详情
	 * 
	 * @param beginTime
	 * @param endTime
	 * @param code
	 * @param source
	 * @return
	 */
	@RequestMapping(value = "listWarnByCode", method = RequestMethod.POST)
	public PageHelper listWarnByCode(@RequestBody WarnSearchByCodeVo warnSearchByCodeVo) {
		String source = warnSearchByCodeVo.getSource();
		return countPersonCheckService.listWarnByCode(warnSearchByCodeVo);
	}

	/**
	 * 其他类别人员详情
	 * 
	 * @param beginTime
	 * @param endTime
	 * @param code
	 * @param source
	 * @return
	 */
	@RequestMapping(value = "listDetailsByCode", method = RequestMethod.POST)
	public PageHelper listDetailsByCode(@RequestBody WarnSearchByCodeVo warnSearchByCodeVo) {
		String source = warnSearchByCodeVo.getSource();
		if (StringUtils.isNotBlank(source) && source.equals("jj")) {
			return countPersonCheckJJService.listDetailsByCode(warnSearchByCodeVo);
		} else if (StringUtils.isNotBlank(source) && source.equals("jcz")) {
			return countPersonCheckJCZService.listDetailsByCode(warnSearchByCodeVo);
		} else if (StringUtils.isNotBlank(source) && source.equals("xfj")) {
			return countPersonCheckXFJService.listDetailsByCode(warnSearchByCodeVo);
		} else if (StringUtils.isNotBlank(source) && source.equals("lte-jcz")) {
			return countPersonCheckJCZService.listDetailsByCode(warnSearchByCodeVo);
		} else if (StringUtils.isNotBlank(source) && source.equals("zj")) {
			return countPersonCheckZJService.listDetailsByCode(warnSearchByCodeVo);
		}
		return countPersonCheckService.listWarnByCode(warnSearchByCodeVo);
	}

	/**
	 * export
	 * 
	 * @param codes
	 * @param columNames
	 * @param beginTime
	 * @param endTime
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/export", method = RequestMethod.GET)
	public void exportExcel(String codes, String columNames, String beginTime, String endTime, String source,
			HttpServletResponse response) throws Exception {
		response.setHeader("Content-Disposition",
				"attachment; filename=" + UUID.randomUUID().toString().replace("-", "").toUpperCase() + ".xls");
		response.setContentType("application/vnd.ms-excel; charset=utf-8");
		List<CountpersonCheckLogDeptVo> list = new ArrayList<CountpersonCheckLogDeptVo>();
		
		/*if (StringUtils.isNotBlank(source) && source.equals("jj")) {
			list = countPersonCheckJJService.countPersonCheck(beginTime, endTime);
		} else if (StringUtils.isNotBlank(source) && source.equals("jcz")) {
			list = countPersonCheckJCZService.countPersonCheck(beginTime, endTime, source);
		} else if (StringUtils.isNotBlank(source) && source.equals("xfj")) {
			list = countPersonCheckXFJService.countPersonCheck(beginTime, endTime);
		} else if (StringUtils.isNotBlank(source) && source.equals("zj")) {
			list = countPersonCheckZJService.countPersonCheckdept(beginTime, endTime, source);
		} else {
			list = countPersonCheckService.countPersonCheckdept(beginTime, endTime, source);
		}*/
		
		if (StringUtils.isNotBlank(source) && source.equals("jj")) {
			list = countPersonCheckJJService.countPersonCheck(beginTime, endTime);
		} else if (StringUtils.isNotBlank(source) && source.equals("jcz")) {
			list = countPersonCheckJCZService.countPersonCheck(beginTime, endTime, "jwt");
		} else if (StringUtils.isNotBlank(source) && source.equals("lte-jcz")) {
			list = countPersonCheckJCZService.countPersonCheck(beginTime, endTime, "lte");
		} else if (StringUtils.isNotBlank(source) && source.equals("lte")) {
			list = countPersonCheckService.countPersonCheckdept(beginTime, endTime, source);
		} else if (StringUtils.isNotBlank(source) && source.equals("zj")) {
			list = countPersonCheckZJService.countPersonCheckdept(beginTime, endTime, source);
		} else if (StringUtils.isNotBlank(source) && source.equals("xfj")) {
			list = countPersonCheckXFJService.countPersonCheck(beginTime, endTime);
		} else {
			list = countPersonCheckService.countPersonCheckdept(beginTime, endTime, source);
		}

		OutputStream out = response.getOutputStream();
		ExcelOperations.writeCountCheckdeptExcel(template, list, codes, columNames, source).write(out);
		out.flush();
		out.close();
	}

	/**
	 * exportSubExcel
	 * 
	 * @param codes
	 * @param columNames
	 * @param beginTime
	 * @param endTime
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/exportSubExcel", method = RequestMethod.GET)
	public void exportSubExcel(String beginTime, String endTime, String code, String source, String type,
			HttpServletResponse response) throws Exception {
		response.setHeader("Content-Disposition",
				"attachment; filename=" + UUID.randomUUID().toString().replace("-", "").toUpperCase() + ".xls");
		response.setContentType("application/vnd.ms-excel; charset=utf-8");

		List<CountCheckLogVo> list = new ArrayList<CountCheckLogVo>();

		if (type.equals("checkCount")) {
			list = countPersonCheckService.countCheckByCode(beginTime, endTime, code, source);
		} else if (type.equals("comparCount")) {
			list = countPersonCheckService.countComparByCode(beginTime, endTime, code, source);
		} else if (type.equals("warnCount")) {
			list = countPersonCheckService.countWarnByCode(beginTime, endTime, code, source);
		} else {
			list = countPersonCheckService.countSubWarnByCode(beginTime, endTime, code, type, source);
		}

		OutputStream out = response.getOutputStream();
		ExcelOperations.writeCountCheckSubDeptExcel(template, list, type).write(out);
		out.flush();
		out.close();
	}

	/**
	 * exportDeviceExcel
	 * 
	 * @param codes
	 * @param columNames
	 * @param beginTime
	 * @param endTime
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/exportDeviceExcel", method = RequestMethod.GET)
	public void exportDeviceExcel(String beginTime, String endTime, String code, String source,
			HttpServletResponse response) throws Exception {
		response.setHeader("Content-Disposition",
				"attachment; filename=" + UUID.randomUUID().toString().replace("-", "").toUpperCase() + ".xls");
		response.setContentType("application/vnd.ms-excel; charset=utf-8");

		OutputStream out = response.getOutputStream();
		ExcelOperations.writeCountCheckDeviceExcel(template,
				countPersonCheckService.listDeviceByCode(beginTime, endTime, code, source)).write(out);
		out.flush();
		out.close();
	}

	/**
	 * exportDeviceExcel
	 * 
	 * @param codes
	 * @param columNames
	 * @param beginTime
	 * @param endTime
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/exportWarnDetailExcel", method = RequestMethod.GET)
	public void exportWarnDetailExcel(String beginTime, String endTime, String code, String source,
			HttpServletResponse response) throws Exception {
		response.setHeader("Content-Disposition",
				"attachment; filename=" + UUID.randomUUID().toString().replace("-", "").toUpperCase() + ".xls");
		response.setContentType("application/vnd.ms-excel; charset=utf-8");
		WarnSearchByCodeVo warnSearchByCodeVo = new WarnSearchByCodeVo();
		warnSearchByCodeVo.setBeginTime(beginTime);
		warnSearchByCodeVo.setEndTime(endTime);
		warnSearchByCodeVo.setCode(code);
		warnSearchByCodeVo.setSource(source);
		warnSearchByCodeVo.setType("warnCount");
		warnSearchByCodeVo.setPageno(1);
		warnSearchByCodeVo.setSize(10000);
		List<CheckPersonListVo> list = new ArrayList<CheckPersonListVo>();
		if (StringUtils.isNotBlank(source) && source.equals("jj")) {
			list = (List<CheckPersonListVo>) countPersonCheckJJService.listDetailsByCode(warnSearchByCodeVo)
					.getResult();
		} else if (StringUtils.isNotBlank(source) && source.equals("jcz")) {
			list = (List<CheckPersonListVo>) countPersonCheckJCZService.listDetailsByCode(warnSearchByCodeVo)
					.getResult();
		} else if (StringUtils.isNotBlank(source) && source.equals("xfj")) {
			list = (List<CheckPersonListVo>) countPersonCheckXFJService.listDetailsByCode(warnSearchByCodeVo)
					.getResult();
		} else {
			list = (List<CheckPersonListVo>) countPersonCheckService.listWarnByCode(warnSearchByCodeVo).getResult();
		}

		OutputStream out = response.getOutputStream();
		if(StringUtils.isNotBlank(source) && source.equals("xfj")){
			ExcelOperations.writePersonWarnDetailExcel(personXfjWarnTemplate, list, source).write(out);
		}else{
			ExcelOperations.writePersonWarnDetailExcel(personWarnTemplate, list, source).write(out);
		}
		
		
		out.flush();
		out.close();
	}

	/**
	 * exportDeviceExcel
	 * 
	 * @param codes
	 * @param columNames
	 * @param beginTime
	 * @param endTime
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/exportDetailExcel", method = RequestMethod.GET)
	public void exportDetailExcel(String beginTime, String endTime, String code, String source, String type,
			HttpServletResponse response) throws Exception {
		response.setHeader("Content-Disposition",
				"attachment; filename=" + UUID.randomUUID().toString().replace("-", "").toUpperCase() + ".xls");
		response.setContentType("application/vnd.ms-excel; charset=utf-8");
		WarnSearchByCodeVo warnSearchByCodeVo = new WarnSearchByCodeVo();
		warnSearchByCodeVo.setBeginTime(beginTime);
		warnSearchByCodeVo.setEndTime(endTime);
		warnSearchByCodeVo.setCode(code);
		warnSearchByCodeVo.setSource(source);
		warnSearchByCodeVo.setType(type);
		warnSearchByCodeVo.setPageno(1);
		warnSearchByCodeVo.setSize(10000);
		List<CheckPersonListVo> list = new ArrayList<CheckPersonListVo>();
		if (StringUtils.isNotBlank(source) && source.equals("jj")) {
			list = (List<CheckPersonListVo>) countPersonCheckJJService.listDetailsByCode(warnSearchByCodeVo)
					.getResult();
		} else if (StringUtils.isNotBlank(source) && source.equals("jcz")) {
			list = (List<CheckPersonListVo>) countPersonCheckJCZService.listDetailsByCode(warnSearchByCodeVo)
					.getResult();
		} else if (StringUtils.isNotBlank(source) && source.equals("xfj")) {
			list = (List<CheckPersonListVo>) countPersonCheckXFJService.listDetailsByCode(warnSearchByCodeVo)
					.getResult();
		} else if (StringUtils.isNotBlank(source) && source.equals("zj")) {
			list = (List<CheckPersonListVo>) countPersonCheckZJService.listDetailsByCode(warnSearchByCodeVo)
					.getResult();
		}

		OutputStream out = response.getOutputStream();
		if (StringUtils.isNotBlank(source) && source.equals("xfj")) {
			ExcelOperations.writePersonWarnDetailExcel(personXfjTemplate, list, source).write(out);
		} else {
			ExcelOperations.writePersonWarnDetailExcel(personWarnTemplate, list, source).write(out);
		}
		
		
		out.flush();
		out.close();
	}
}
