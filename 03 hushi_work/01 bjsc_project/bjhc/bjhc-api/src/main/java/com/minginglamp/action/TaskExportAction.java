package com.minginglamp.action;

import com.minginglamp.crud.TaskInfoCrud;
import com.minginglamp.model.TaskInfo;
import com.minginglamp.service.TaskDetailService;
import com.minginglamp.service.TaskInfoService;
import com.minginglamp.utils.ExcelOperations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.UUID;

/**
 * Created by lilongfei on 2017/5/23.
 */
@Controller
@RequestMapping("/task/export")
public class TaskExportAction {

    @Autowired
    private TaskDetailService taskDetailService;

    @Autowired
    private TaskInfoService taskInfoService;

    @Value("${xls.template}")
    private String template;

    @RequestMapping("/{id}/{userId}")
    public void exportExcel(@PathVariable int id,@PathVariable String userId, HttpServletResponse response) throws Exception {

        TaskInfo taskInfo = taskInfoService.findByUserIdAndId(id,userId);
        response.setHeader("Content-Disposition",
                "attachment; filename="+taskInfo.getName()+"-"+ UUID.randomUUID().toString().replace("-","").toUpperCase()+".xls");
        response.setContentType("application/vnd.ms-excel; charset=utf-8") ;
        OutputStream out = response.getOutputStream() ;
        ExcelOperations.writeExcel(template,taskDetailService.findAllByJobId(id)
                ,taskDetailService.findRelationByJobId(id)).write(out) ;
        out.flush();
        out.close();
    }
}
