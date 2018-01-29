package com.minginglamp.action;

import com.google.common.collect.Maps;
import com.minginglamp.model.TaskDetail;
import com.minginglamp.service.TaskDetailService;
import com.minginglamp.utils.ResultMsg;

import lombok.extern.java.Log;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Created by lilongfei on 2017/5/20.
 */
@Log
@RestController
@RequestMapping("/task/detail")
public class TaskDetailAction {
    @Autowired
    private TaskDetailService taskDetailService;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

//    @ApiOperation(value = "查询单个任务详情列表",response = ResultMsg.class,produces = "application/json")
    @RequestMapping(value = "/get/{id}",method = RequestMethod.GET)
    public ResultMsg findById(
//            @ApiParam(name = "id",value = "任务id")
            @PathVariable int id){
        List<TaskDetail> infos = taskDetailService.findByJobId(id);
        Map<String,Object> result = Maps.newHashMap();
        result.put("count",infos.size());
        result.put("data",infos);
        return ResultMsg.success(result);
    }

//    @ApiOperation(value = "筛选tag",response = ResultMsg.class,produces = "application/json")
    @RequestMapping(value = "/tag",method = RequestMethod.POST)
    public ResultMsg findByTag(
//            @ApiParam(name = "id",value = "任务id")
              int id,
//            @ApiParam(name = "tags",value = "标签用,分割")
              String tags){
        List<TaskDetail> infos = null;
        //log.info("tags:" + tags);
        if(StringUtils.isBlank(tags)){
            infos = taskDetailService.findByJobId(id);
        }else{
            infos = taskDetailService.findByTagAndJob(tags,id);
        }
        Map<String,Object> result = Maps.newHashMap();
        result.put("count",infos.size());
        result.put("data",infos);
        return ResultMsg.success(result);
    }

//    @ApiOperation(value = "查询单人详细信息",response = ResultMsg.class,produces = "application/json")
    @RequestMapping(value = "/card/{idCard}/{jobId}",method = RequestMethod.GET)
    public ResultMsg findDetail(
//            @ApiParam(name = "idCard",value = "身份证")
            @PathVariable String idCard,
//            @ApiParam(name = "jobId",value = "任务id")
            @PathVariable int jobId){
        return ResultMsg.success(taskDetailService.findByCard(jobId, idCard));
    }

    @RequestMapping(value = "/detail/{idCard}/{jobId}",method = RequestMethod.GET)
    public ResultMsg findByCardDetail(@PathVariable String idCard,@PathVariable int jobId){
        return ResultMsg.success(taskDetailService.findDetailsByCard(jobId, idCard));
    }

    @RequestMapping(value = "/test",method = RequestMethod.GET)
    public String testCookie(String code){
        return stringRedisTemplate.opsForValue().get(code);
    }
}
