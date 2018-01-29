package com.minginglamp.utils;

import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.servlet.view.document.AbstractXlsView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Map;
import java.util.UUID;

/**
 * Created by lilongfei on 2017/5/23.
 */
public class ViewExcel extends AbstractXlsView {


    @Override
    protected void buildExcelDocument(Map<String, Object> map, Workbook workbook,
                                      HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {
        String filename = "任务导出-"+ UUID.randomUUID().toString()+".xls";//设置下载时客户端Excel的名称
        filename = URLEncoder.encode(filename,"utf-8");//处理中文文件名
        httpServletResponse.setContentType("application/vnd.ms-excel");
        httpServletResponse.setHeader("Content-disposition", "attachment;filename=" + filename);
        OutputStream outputStream = httpServletResponse.getOutputStream();
        workbook.write(outputStream);
        outputStream.flush();
        outputStream.close();
    }
}
