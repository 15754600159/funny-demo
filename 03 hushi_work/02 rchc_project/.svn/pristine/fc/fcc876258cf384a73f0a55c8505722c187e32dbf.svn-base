/*package com.minginglamp.sharding;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.minginglamp.utils.ResultMsg;

@RestController
@RequestMapping("/shardingtest")
public class ShardingTestAction {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@RequestMapping(value = "/users",method = RequestMethod.GET)
	public ResultMsg findUsers(){
		PageRequest pageReq = new PageRequest(0, 100);
		String columnsStr = "f_name,f_sex,sysdate";
		String lowerTime = "2017-06-01 00:00:00";
		String upperTime = "2017-08-01 01:06:50";
		String whereStr = "1=1";
		PageResponse queryResp = ShardingUtils.queryPage(jdbcTemplate, pageReq, columnsStr, lowerTime, upperTime, whereStr);
		
		return ResultMsg.success(queryResp);
	}

}
*/