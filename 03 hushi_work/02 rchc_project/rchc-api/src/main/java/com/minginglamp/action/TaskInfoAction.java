package com.minginglamp.action;

import com.google.common.collect.Maps;
import com.minginglamp.model.TaskInfo;
import com.minginglamp.service.TaskDataService;
import com.minginglamp.service.TaskInfoService;
import com.minginglamp.utils.ExcelOperations;
import com.minginglamp.utils.ResultMsg;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by lilongfei on 2017/5/20.
 */
@RestController
@RequestMapping("/task/info")
@Slf4j
public class TaskInfoAction {

    @Autowired
    private TaskInfoService taskInfoService;

    @Autowired
    private TaskDataService taskDataService;

//    @ApiOperation(value = "查询任务列表",response = ResultMsg.class,produces = "application/json")
    @RequestMapping(value = "/get/{id}",method = RequestMethod.GET)
    public ResultMsg findById(
//          @ApiParam(required=true, name="id", value="用户sessionid")
            @PathVariable String id){
        List<TaskInfo> infos = null;
        try {
            infos = taskInfoService.findById(id);
            Map<String,Object> result = Maps.newHashMap();
            result.put("count",infos.size());
            result.put("data",infos);
            return ResultMsg.success(result);
        } catch (Exception e) {
            return ResultMsg.error("login deny");
        }
    }

//    @ApiOperation(value = "删除单个任务",response = ResultMsg.class,produces = "application/json")
    @RequestMapping(value = "/delete/{id}/{userId}",method = RequestMethod.DELETE)
    public ResultMsg delete(
//            @ApiParam(required = true,name = "id",value = "任务id")
            @PathVariable int id,
//            @ApiParam(required = true,name = "userId",value = "用户sessionid")
            @PathVariable String userId){
        int result = 0;
        try {
            result = taskInfoService.deleteById(userId, id);
            if(result == 0){
                return ResultMsg.error("未找到记录");
            }else{
                return ResultMsg.success("删除成功");
            }
        } catch (Exception e) {
            return ResultMsg.error("login deny");
        }

    }

//  @ApiOperation(value = "上传excel",response = ResultMsg.class,produces = "application/json")
    @RequestMapping(value = "/check",method = RequestMethod.POST)
    public ResultMsg check(
//            @ApiParam(required = true,name = "file",value = "文件")
            @RequestParam("file") MultipartFile file){
        try {
            List<String> list = ExcelOperations.readExcelFile(file.getInputStream());
            System.out.println(list);
            Map<String,Object> map = ExcelOperations.parseIdCard(list);
            if(map.get("data") != null){
                String seq = taskInfoService.saveTaskData((List<String>) map.get("data"));
                map.put("data",seq);
            }
            return ResultMsg.success(map);
        } catch (IOException e) {
           // log.error("上传文件失败",e.getMessage());
            return ResultMsg.error("文件上传失败");
        }
    }

//    @ApiOperation(value = "新建任务",response = ResultMsg.class,produces = "application/json")
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    public ResultMsg createTask(
//            @ApiParam(value = "任务名称",name = "name")
                    String name,
//            @ApiParam(value="excel返回条数",name = "count")
                    int count,
//            @ApiParam(value = "用户sessionId",name = "sessionId")
                    String sessionId,
//                    @ApiParam(value = "序列号",name = "seq")
                    String seq){
        try {
            return ResultMsg.success(taskInfoService.save(name, count, sessionId,seq));
        } catch (Exception e) {
            return ResultMsg.error("login deny");
        }
    }

//    @ApiOperation(value = "查询单个身份证号",response = ResultMsg.class,produces = "application/json")
    @RequestMapping(value = "/one/{idCard}",method = RequestMethod.GET)
    public ResultMsg findOne(
//            @ApiParam(name = "idCard",value = "身份证")
            @PathVariable String idCard){
        return ResultMsg.success(taskDataService.getOne(idCard));
    }

//    @ApiOperation(value = "开始导入数据，进度条展示",response = ResultMsg.class,produces = "application/json")
    @RequestMapping(value = "/load/{jobId}/{seq}",method = RequestMethod.GET)
    public ResultMsg loadData(
//            @ApiParam(name = "seq",value = "序列号")
            @PathVariable String seq,
//            @ApiParam(name = "jobId",value = "任务id")
            @PathVariable int jobId){
        taskDataService.saveData(jobId, seq);
        return ResultMsg.success("load success");
    }

    @RequestMapping(value = "/name",method = RequestMethod.POST)
    public ResultMsg findByName(String userId,String name){
        try {
            return ResultMsg.success(taskInfoService.findByName(userId, name));
        } catch (Exception e) {
            return ResultMsg.error("login deny");
        }
    }
}
